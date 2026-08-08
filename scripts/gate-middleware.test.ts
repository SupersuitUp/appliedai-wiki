// Tests for the identity gate in middleware.ts.
// Run: pnpm test   (Node >= 22.6, uses native type stripping)
//
// The load-bearing assertions are the dark-by-default guarantees: with
// GATE_IDENTITY unset, or the OAuth client missing, or the secret missing,
// the middleware behaves byte-identical to the bot-block-only file it
// replaced. Nothing else in this suite matters if those fail.

import assert from 'node:assert/strict';
import test from 'node:test';
import { createHmac } from 'node:crypto';

const { default: middleware, config } = await import('../middleware.ts');

const HOST = 'https://example-wiki.test';
const SECRET = 'test-secret';

const matcher = new RegExp(`^${config.matcher[0]}$`);
const matches = (pathname: string) => matcher.test(pathname);

const get = (pathname: string, headers: Record<string, string> = {}) =>
  new Request(`${HOST}${pathname}`, { headers });

const OAUTH_ENV = {
  GATE_IDENTITY: '1',
  GOOGLE_OAUTH_CLIENT_ID: 'test-client-id.apps.googleusercontent.com',
  GOOGLE_OAUTH_CLIENT_SECRET: 'test-client-secret',
  WIKI_GATE_SECRET: SECRET,
};

function withEnv<T>(vars: Record<string, string>, fn: () => Promise<T>): Promise<T> {
  const saved: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(vars)) {
    saved[k] = process.env[k];
    process.env[k] = v;
  }
  return fn().finally(() => {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });
}

type FetchCall = { url: string; init?: RequestInit };

function withFetchStub<T>(
  respond: (url: string, init?: RequestInit) => Response | Promise<Response>,
  fn: (calls: FetchCall[]) => Promise<T>,
): Promise<T> {
  const calls: FetchCall[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: any, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.url;
    calls.push({ url, init });
    return respond(url, init);
  }) as typeof fetch;
  return fn(calls).finally(() => {
    globalThis.fetch = original;
  });
}

function b64url(text: string): string {
  return Buffer.from(text).toString('base64url');
}

function signHmac(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('base64url');
}

function identityCookie(overrides: Partial<Record<string, unknown>> = {}): string {
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(
    JSON.stringify({ e: 'ada@example.com', n: 'Ada', st: 'active', iat: now, rv: now, ...overrides }),
  );
  return `wiki_id=v1.${payload}.${signHmac(`v1.${payload}`)}`;
}

function fakeIdToken(claims: Record<string, unknown> = {}): string {
  const payload = {
    iss: 'https://accounts.google.com',
    aud: OAUTH_ENV.GOOGLE_OAUTH_CLIENT_ID,
    exp: Math.floor(Date.now() / 1000) + 3600,
    email: 'ada@example.com',
    email_verified: true,
    name: 'Ada Lovelace',
    ...claims,
  };
  return `${b64url('{"alg":"RS256"}')}.${b64url(JSON.stringify(payload))}.${b64url('sig')}`;
}

// ---------------------------------------------------------------------------
// DARK BY DEFAULT. These are the tests that let this ship this weekend.

test('flag off: every page request passes straight through, untouched', async () => {
  for (const path of ['/', '/concepts/anything', '/auth/google/start', '/auth/invite/abc', '/perspectives/x']) {
    assert.equal(await middleware(get(path)), undefined, `${path} must pass through with the gate dark`);
  }
});

test('flag off: the bot block still bites, byte-identical to the old file', async () => {
  const res = await middleware(get('/', { 'user-agent': 'Mozilla/5.0 (compatible; GPTBot/1.0)' }));
  assert.ok(res);
  assert.equal(res.status, 403);
  assert.equal(
    await res.text(),
    'Forbidden: automated training and AI-search crawlers are not permitted on this site.',
  );
  assert.equal(res.headers.get('content-type'), 'text/plain; charset=utf-8');
});

test('flag set but OAuth client missing: fail open, never brick', async () => {
  await withEnv({ GATE_IDENTITY: '1', WIKI_GATE_SECRET: SECRET }, async () => {
    assert.equal(await middleware(get('/')), undefined);
  });
});

test('flag set but secret missing: fail open, never brick', async () => {
  await withEnv(
    {
      GATE_IDENTITY: '1',
      GOOGLE_OAUTH_CLIENT_ID: OAUTH_ENV.GOOGLE_OAUTH_CLIENT_ID,
      GOOGLE_OAUTH_CLIENT_SECRET: OAUTH_ENV.GOOGLE_OAUTH_CLIENT_SECRET,
    },
    async () => {
      assert.equal(await middleware(get('/')), undefined);
    },
  );
});

test('OAuth configured but flag not set to 1: still dark', async () => {
  await withEnv({ ...OAUTH_ENV, GATE_IDENTITY: '0' }, async () => {
    assert.equal(await middleware(get('/')), undefined);
  });
  await withEnv({ ...OAUTH_ENV, GATE_IDENTITY: 'true' }, async () => {
    assert.equal(await middleware(get('/')), undefined, 'only the literal "1" turns the gate on');
  });
});

// ---------------------------------------------------------------------------
// The matcher: unchanged from the bot-block-only file.

test('matcher covers HTML routes', () => {
  for (const path of ['/', '/concepts/the-craft', '/auth/google/start', '/llms.txt']) {
    assert.equal(matches(path), true, `${path} should reach the middleware`);
  }
});

test('matcher leaves assets and hosted agent files out entirely', () => {
  for (const path of [
    '/assets/js/main.abc123.js',
    '/img/logo.png',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/some/bundle.css',
    '/search/index.json',
  ]) {
    assert.equal(matches(path), false, `${path} must never pay a middleware invocation`);
  }
});

// ---------------------------------------------------------------------------
// Gate on: the machine layer and unfurlers stay open.

test('gate on: the machine layer passes through, agents cannot OAuth', async () => {
  await withEnv(OAUTH_ENV, async () => {
    for (const path of ['/llms.txt', '/llms-full.txt', '/tools/anything.md', '/audio/clip.mp3']) {
      assert.equal(await middleware(get(path)), undefined, `${path} must stay open`);
    }
  });
});

test('gate on: unfurl bots pass so shared links keep their cards', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/concepts/the-craft', { 'user-agent': 'Slackbot 1.0' }));
    assert.equal(res, undefined);
  });
});

test('gate on: the bot block still runs first', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/', { 'user-agent': 'ClaudeBot/1.0' }));
    assert.equal(res?.status, 403);
  });
});

// ---------------------------------------------------------------------------
// Gate on: the identity flow.

test('no identity: HTML gets the Continue with Google interstitial', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/concepts/the-craft'));
    assert.ok(res);
    assert.equal(res.status, 401);
    const html = await res.text();
    assert.match(html, /Continue with Google/);
    assert.match(html, /\/auth\/google\/start\?next=%2Fconcepts%2Fthe-craft/);
    assert.doesNotMatch(html, /\u2014/, 'no em dashes');
  });
});

test('a tampered identity cookie fails closed to the interstitial', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const now = Math.floor(Date.now() / 1000);
    const forgedPayload = b64url(
      JSON.stringify({ e: 'mallory@example.com', n: 'M', st: 'active', iat: now, rv: now }),
    );
    const good = identityCookie();
    const forged = [
      `wiki_id=v1.${forgedPayload}.deadbeef`,
      `wiki_id=v1.${forgedPayload}.${signHmac('v1.somethingelse')}`,
      `wiki_id=v1.${forgedPayload}.${good.split('.')[2]}`,
      'wiki_id=nonsense',
    ];
    for (const cookie of forged) {
      const res = await middleware(get('/concepts/the-craft', { cookie }));
      assert.equal(res?.status, 401, `forged identity must not pass: ${cookie.slice(0, 40)}`);
      assert.match(await res!.text(), /Continue with Google/);
    }
  });
});

test('a valid active identity with a fresh stamp passes, and the visit is tracked', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie();
    await withFetchStub(
      () => new Response(null, { status: 204 }),
      async (calls) => {
        const waited: Promise<unknown>[] = [];
        const res = await middleware(get('/concepts/the-craft', { cookie }), {
          waitUntil: (p: Promise<unknown>) => waited.push(p),
        });
        assert.equal(res?.headers.get('x-middleware-next'), '1');
        assert.match(res?.headers.get('set-cookie') ?? '', /wiki_hello=Ada/);
        const again = await middleware(get('/concepts/the-craft', { cookie: `${cookie}; wiki_hello=Ada` }), {
          waitUntil: (p: Promise<unknown>) => waited.push(p),
        });
        assert.equal(again, undefined, 'second view with the hello cookie is a bare pass-through');
        await Promise.all(waited);
        assert.equal(calls.length, 2, 'one telemetry call per tracked view');
        assert.match(calls[0].url, /\/api\/gate\?op=track$/);
        const body = JSON.parse(String(calls[0].init?.body));
        assert.equal(body.email, 'ada@example.com');
        assert.equal(body.path, '/concepts/the-craft');
        assert.equal(
          (calls[0].init?.headers as Record<string, string>)['x-gate-sig'],
          signHmac(String(calls[0].init?.body)),
          'telemetry is HMAC-signed so the function only trusts the edge',
        );
      },
    );
  });
});

test('a stale stamp triggers a member check; revoked means the locked page', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const now = Math.floor(Date.now() / 1000);
    const cookie = identityCookie({ rv: now - 700 });
    await withFetchStub(
      (url) =>
        url.includes('op=session')
          ? new Response(JSON.stringify({ status: 'revoked' }), { status: 200 })
          : new Response(null, { status: 204 }),
      async () => {
        const res = await middleware(get('/concepts/the-craft', { cookie }));
        assert.equal(res?.status, 403);
        assert.match(await res!.text(), /closed for you right now/);
        assert.match(res!.headers.get('set-cookie') ?? '', /^wiki_id=v1\./, 'the revoked verdict is restamped');
      },
    );
  });
});

test('a stale stamp with the member still active restamps and passes through', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const now = Math.floor(Date.now() / 1000);
    const cookie = identityCookie({ rv: now - 700 });
    await withFetchStub(
      (url) =>
        url.includes('op=session')
          ? new Response(JSON.stringify({ status: 'active' }), { status: 200 })
          : new Response(null, { status: 204 }),
      async () => {
        const res = await middleware(get('/concepts/the-craft', { cookie }));
        assert.ok(res);
        assert.equal(res.headers.get('x-middleware-next'), '1');
        assert.match(res.headers.get('set-cookie') ?? '', /^wiki_id=v1\./);
      },
    );
  });
});

test('a member-store outage waves a known active visitor through instead of bricking the wiki', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const now = Math.floor(Date.now() / 1000);
    const cookie = identityCookie({ rv: now - 700 });
    await withFetchStub(
      () => {
        throw new Error('function is down');
      },
      async () => {
        const res = await middleware(get('/concepts/the-craft', { cookie }));
        assert.ok(res, 'still a pass-through response, with a retry stamp');
        assert.equal(res.headers.get('x-middleware-next'), '1');
      },
    );
  });
});

test('a signed-in stranger (status none) is sent to the request page', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie({ st: 'none' });
    const res = await middleware(get('/concepts/the-craft', { cookie }));
    assert.equal(res?.status, 303);
    assert.match(res!.headers.get('location') ?? '', /^\/auth\/request\?next=/);
  });
});

test('a pending visitor re-checks every load: still pending waits, approved opens', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie({ st: 'pending' });
    await withFetchStub(
      () => new Response(JSON.stringify({ status: 'pending' }), { status: 200 }),
      async () => {
        const res = await middleware(get('/concepts/the-craft', { cookie }));
        assert.equal(res?.status, 403);
        assert.match(await res!.text(), /Your request is in/);
      },
    );
    await withFetchStub(
      () => new Response(JSON.stringify({ status: 'active' }), { status: 200 }),
      async () => {
        const res = await middleware(get('/concepts/the-craft', { cookie }));
        assert.equal(res?.status, 303, 'approval opens the door on the next load');
        assert.equal(res!.headers.get('location'), '/concepts/the-craft');
        assert.match(res!.headers.get('set-cookie') ?? '', /^wiki_id=v1\./);
      },
    );
  });
});

// ---------------------------------------------------------------------------
// The auth routes.

test('/auth/google/start redirects to Google with the right client and callback', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/auth/google/start?next=%2Fconcepts%2Fthe-craft'));
    assert.equal(res?.status, 302);
    const location = new URL(res!.headers.get('location')!);
    assert.equal(location.origin, 'https://accounts.google.com');
    assert.equal(location.searchParams.get('client_id'), OAUTH_ENV.GOOGLE_OAUTH_CLIENT_ID);
    assert.equal(location.searchParams.get('redirect_uri'), `${HOST}/auth/google/callback`);
    assert.equal(location.searchParams.get('response_type'), 'code');
    assert.ok(location.searchParams.get('state'));
  });
});

test('the next parameter can never leave the site', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/auth/google/start?next=https%3A%2F%2Fevil.example'));
    const state = new URL(res!.headers.get('location')!).searchParams.get('state')!;
    const decoded = JSON.parse(Buffer.from(state.split('.')[0], 'base64url').toString());
    assert.equal(decoded.next, '/');
  });
});

test('a known active member sails from the callback straight to the page they wanted', async () => {
  await withEnv(OAUTH_ENV, async () => {
    await withFetchStub(
      (url) => {
        if (url === 'https://oauth2.googleapis.com/token') {
          return new Response(JSON.stringify({ id_token: fakeIdToken() }), { status: 200 });
        }
        if (url.includes('op=session')) {
          return new Response(JSON.stringify({ status: 'active' }), { status: 200 });
        }
        return new Response(null, { status: 404 });
      },
      async () => {
        const start = await middleware(get('/auth/google/start?next=%2Fconcepts%2Fthe-craft'));
        const state = new URL(start!.headers.get('location')!).searchParams.get('state')!;
        const res = await middleware(get(`/auth/google/callback?code=good&state=${encodeURIComponent(state)}`));
        assert.equal(res?.status, 303);
        assert.equal(res!.headers.get('location'), '/concepts/the-craft');
        const cookie = res!.headers.get('set-cookie') ?? '';
        assert.match(cookie, /^wiki_id=v1\./);
        assert.match(cookie, /HttpOnly/);
      },
    );
  });
});

test('a first-time Google account gets a status-none cookie and lands on the request page next', async () => {
  await withEnv(OAUTH_ENV, async () => {
    await withFetchStub(
      (url) => {
        if (url === 'https://oauth2.googleapis.com/token') {
          return new Response(JSON.stringify({ id_token: fakeIdToken() }), { status: 200 });
        }
        if (url.includes('op=session')) {
          return new Response(JSON.stringify({ status: 'none' }), { status: 200 });
        }
        return new Response(null, { status: 404 });
      },
      async () => {
        const start = await middleware(get('/auth/google/start?next=%2Fconcepts%2Fthe-craft'));
        const state = new URL(start!.headers.get('location')!).searchParams.get('state')!;
        const res = await middleware(get(`/auth/google/callback?code=good&state=${encodeURIComponent(state)}`));
        assert.equal(res?.status, 303);
        const cookie = res!.headers.get('set-cookie') ?? '';
        const payload = JSON.parse(Buffer.from(cookie.split('=')[1].split('.')[1], 'base64url').toString());
        assert.equal(payload.st, 'none');
        assert.equal(payload.e, 'ada@example.com');
      },
    );
  });
});

test('an unverified email is refused at the callback', async () => {
  await withEnv(OAUTH_ENV, async () => {
    await withFetchStub(
      () =>
        new Response(JSON.stringify({ id_token: fakeIdToken({ email_verified: false }) }), { status: 200 }),
      async () => {
        const start = await middleware(get('/auth/google/start?next=%2F'));
        const state = new URL(start!.headers.get('location')!).searchParams.get('state')!;
        const res = await middleware(get(`/auth/google/callback?code=good&state=${encodeURIComponent(state)}`));
        assert.equal(res?.status, 401);
      },
    );
  });
});

test('the callback survives a bad code with a polite retry page, never a 500', async () => {
  await withEnv(OAUTH_ENV, async () => {
    await withFetchStub(
      () => new Response(JSON.stringify({ error: 'invalid_grant' }), { status: 400 }),
      async () => {
        const start = await middleware(get('/auth/google/start?next=%2F'));
        const state = new URL(start!.headers.get('location')!).searchParams.get('state')!;
        const res = await middleware(get(`/auth/google/callback?code=bad&state=${encodeURIComponent(state)}`));
        assert.equal(res?.status, 401);
        assert.match(await res!.text(), /did not complete/);
      },
    );
  });
});

test('the request form requires both answers, then parks the visitor as pending', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie({ st: 'none' });

    await withFetchStub(
      (url) =>
        url.includes('op=session')
          ? new Response(JSON.stringify({ status: 'none' }), { status: 200 })
          : new Response(null, { status: 404 }),
      async () => {
        const page = await middleware(get('/auth/request?next=%2Fconcepts%2Fthe-craft', { cookie }));
        assert.equal(page?.status, 200);
        const html = await page!.text();
        assert.match(html, /ada@example\.com/);
        assert.match(html, /Request access/);
      },
    );

    const bad = await middleware(
      new Request(`${HOST}/auth/request`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded', cookie },
        body: new URLSearchParams({ next: '/', inviter: 'a friend', story: '' }).toString(),
      }),
    );
    assert.equal(bad?.status, 400);
    assert.match(await bad!.text(), /Both answers are required/);

    await withFetchStub(
      (url) =>
        url.includes('op=request-access')
          ? new Response(JSON.stringify({ status: 'pending' }), { status: 200 })
          : new Response(null, { status: 404 }),
      async (calls) => {
        const res = await middleware(
          new Request(`${HOST}/auth/request`, {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded', cookie },
            body: new URLSearchParams({
              next: '/concepts/the-craft',
              inviter: 'met a member at a meetup',
              story: 'want to learn the craft',
            }).toString(),
          }),
        );
        assert.equal(res?.status, 200);
        assert.match(await res!.text(), /Your request is in/);
        const stamped = res!.headers.get('set-cookie') ?? '';
        const payload = JSON.parse(Buffer.from(stamped.split('=')[1].split('.')[1], 'base64url').toString());
        assert.equal(payload.st, 'pending');
        assert.equal(calls.length, 1);
        const sent = JSON.parse(String(calls[0].init?.body));
        assert.equal(sent.inviter, 'met a member at a meetup');
      },
    );
  });
});

test('request page without an identity bounces to sign-in, not a form for nobody', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/auth/request?next=%2F'));
    assert.equal(res?.status, 303);
    assert.match(res!.headers.get('location') ?? '', /^\/auth\/google\/start/);
  });
});

// ---------------------------------------------------------------------------
// Invite links: provenance by invitation.

test('an invite link without a session sends the visitor through Google and back to the link', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/auth/invite/tok_abc123'));
    assert.equal(res?.status, 303);
    assert.equal(res!.headers.get('location'), '/auth/google/start?next=%2Fauth%2Finvite%2Ftok_abc123');
  });
});

test('a signed-in stranger claiming a live invite becomes active and lands on the wiki', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie({ st: 'none' });
    await withFetchStub(
      (url) =>
        url.includes('op=invite-claim')
          ? new Response(JSON.stringify({ status: 'active' }), { status: 200 })
          : new Response(null, { status: 404 }),
      async (calls) => {
        const res = await middleware(get('/auth/invite/tok_abc123', { cookie }));
        assert.equal(res?.status, 303);
        assert.equal(res!.headers.get('location'), '/');
        const stamped = res!.headers.get('set-cookie') ?? '';
        const payload = JSON.parse(Buffer.from(stamped.split('=')[1].split('.')[1], 'base64url').toString());
        assert.equal(payload.st, 'active');
        const sent = JSON.parse(String(calls[0].init?.body));
        assert.equal(sent.token, 'tok_abc123');
        assert.equal(sent.email, 'ada@example.com');
      },
    );
  });
});

test('a dead invite shows the dead-link page with a path to request access', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie({ st: 'none' });
    await withFetchStub(
      () => new Response(JSON.stringify({ status: 'invalid' }), { status: 200 }),
      async () => {
        const res = await middleware(get('/auth/invite/tok_dead', { cookie }));
        assert.equal(res?.status, 410);
        assert.match(await res!.text(), /no longer live/);
      },
    );
  });
});

test('an active member minting an invite sees the link, HMAC-signed call and all', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie();
    const page = await middleware(get('/auth/invite', { cookie }));
    assert.equal(page?.status, 200);
    assert.match(await page!.text(), /Mint an invite link/);

    await withFetchStub(
      (url) =>
        url.includes('op=invite-create')
          ? new Response(JSON.stringify({ token: 'tok_new1' }), { status: 200 })
          : new Response(null, { status: 404 }),
      async (calls) => {
        const res = await middleware(
          new Request(`${HOST}/auth/invite`, { method: 'POST', headers: { cookie } }),
        );
        assert.equal(res?.status, 200);
        assert.match(await res!.text(), /\/auth\/invite\/tok_new1/);
        assert.equal(
          (calls[0].init?.headers as Record<string, string>)['x-gate-sig'],
          signHmac(String(calls[0].init?.body)),
        );
        const sent = JSON.parse(String(calls[0].init?.body));
        assert.equal(sent.createdBy, 'ada@example.com');
      },
    );
  });
});

test('a non-member cannot see the mint page', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const cookie = identityCookie({ st: 'none' });
    const res = await middleware(get('/auth/invite', { cookie }));
    assert.equal(res?.status, 303, 'strangers are routed away from the mint page');
  });
});

test('signout clears the identity and greeting cookies', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/auth/signout', { cookie: identityCookie() }));
    assert.equal(res?.status, 303);
    const cookies = res!.headers.getSetCookie();
    assert.ok(cookies.some((c) => c.startsWith('wiki_id=;') && c.includes('Max-Age=0')));
    assert.ok(cookies.some((c) => c.startsWith('wiki_hello=;') && c.includes('Max-Age=0')));
  });
});

// ---------------------------------------------------------------------------
// The optional password stage, off by default.

test('with WIKI_PASSWORD set, the password page comes before identity', async () => {
  await withEnv({ ...OAUTH_ENV, WIKI_PASSWORD: 'open-sesame' }, async () => {
    const res = await middleware(get('/concepts/the-craft'));
    assert.equal(res?.status, 401);
    const html = await res!.text();
    assert.match(html, /password/i);
    assert.doesNotMatch(html, /open-sesame/, 'the gate page must never print the password');
  });
});

test('the right password sets a ticket; identity is still demanded after it', async () => {
  await withEnv({ ...OAUTH_ENV, WIKI_PASSWORD: 'open-sesame' }, async () => {
    const answer = await middleware(
      new Request(`${HOST}/concepts/the-craft`, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ password: ' Open-Sesame ' }).toString(),
      }),
    );
    assert.equal(answer?.status, 303);
    const ticket = (answer!.headers.get('set-cookie') ?? '').split(';')[0];
    assert.match(ticket, /^wiki_gate=v1\./);
    const res = await middleware(get('/concepts/the-craft', { cookie: ticket }));
    assert.equal(res?.status, 401);
    assert.match(await res!.text(), /Continue with Google/);
  });
});

test('without WIKI_PASSWORD, no password page ever renders', async () => {
  await withEnv(OAUTH_ENV, async () => {
    const res = await middleware(get('/concepts/the-craft'));
    assert.equal(res?.status, 401);
    assert.match(await res!.text(), /Continue with Google/);
  });
});
