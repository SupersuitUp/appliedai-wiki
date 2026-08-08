#!/usr/bin/env node
// Admin CLI for the identity gate. Talks to the deployed /api/gate function
// with the FUNNEL_ADMIN_KEY, so it works from any machine that holds the key.
// This is the whole admin surface: the wikis deliberately ship no admin page.
//
// Usage:
//   GATE_URL=https://appliedai.wiki FUNNEL_ADMIN_KEY=... node scripts/gate-admin.mjs <command> [args]
//
// Commands:
//   members                       list every member with status and provenance
//   invites                       list every invite link and who minted it
//   add <email> [name] [note]     whitelist an address (or approve a pending request)
//   revoke <email>                revoke one person
//   revoke-subtree <email>        revoke a person and everyone they invited, transitively
//   reinstate <email>             restore one person
//   revoke-invite <token>         kill one invite link
//   mint <email>                  mint an invite link on behalf of an active member
//   trail <email>                 recent page views for one person

const base = process.env.GATE_URL;
const key = process.env.FUNNEL_ADMIN_KEY;
const secret = process.env.WIKI_GATE_SECRET;

if (!base || !key) {
  console.error('Set GATE_URL (e.g. https://appliedai.wiki) and FUNNEL_ADMIN_KEY.');
  process.exit(1);
}

const [command, ...args] = process.argv.slice(2);

async function call(op, method, body, extraHeaders = {}) {
  const res = await fetch(`${base}/api/gate?op=${op}`, {
    method,
    headers: {
      'x-admin-key': key,
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`${op}: ${res.status} ${text}`);
    process.exit(1);
  }
  return text ? JSON.parse(text) : null;
}

async function signedCall(op, body) {
  if (!secret) {
    console.error(`${op} needs WIKI_GATE_SECRET set (it is an edge-signed op).`);
    process.exit(1);
  }
  const { createHmac } = await import('node:crypto');
  const raw = JSON.stringify(body);
  const res = await fetch(`${base}/api/gate?op=${op}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-gate-sig': createHmac('sha256', secret).update(raw).digest('base64url'),
    },
    body: raw,
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`${op}: ${res.status} ${text}`);
    process.exit(1);
  }
  return JSON.parse(text);
}

function show(value) {
  console.log(JSON.stringify(value, null, 2));
}

switch (command) {
  case 'members': {
    const data = await call('funnel-members', 'GET');
    for (const m of data.members) {
      const chain = m.inviteChain.length ? ` chain: ${m.inviteChain.join(' > ')}` : '';
      const prov = m.provenance ? ` via "${m.provenance.inviter}"` : '';
      console.log(`${m.status.padEnd(8)} ${m.email}  ${m.name}${prov}${chain}`);
    }
    console.log(`${data.members.length} member(s)`);
    break;
  }
  case 'invites': {
    const data = await call('funnel-invites', 'GET');
    for (const i of data.invites) {
      console.log(
        `${i.revoked ? 'DEAD ' : 'live '} ${i.token}  by ${i.createdBy}  uses: ${i.uses}  ${new Date(i.createdAt).toISOString()}`,
      );
    }
    break;
  }
  case 'add':
    show(await call('funnel-add', 'POST', { email: args[0], name: args[1] ?? '', note: args[2] ?? '' }));
    break;
  case 'revoke':
    show(await call('funnel-revoke', 'POST', { email: args[0] }));
    break;
  case 'revoke-subtree':
    show(await call('funnel-revoke', 'POST', { email: args[0], subtree: true }));
    break;
  case 'reinstate':
    show(await call('funnel-reinstate', 'POST', { email: args[0] }));
    break;
  case 'revoke-invite':
    show(await call('funnel-revoke-invite', 'POST', { token: args[0] }));
    break;
  case 'mint': {
    const data = await signedCall('invite-create', { createdBy: args[0] });
    console.log(`${base}/auth/invite/${data.token}`);
    break;
  }
  case 'trail':
    show(await call('funnel-trail', 'GET', null, { 'x-email': args[0] ?? '' }));
    break;
  default:
    console.error('Unknown command. See the header of this file for usage.');
    process.exit(1);
}
