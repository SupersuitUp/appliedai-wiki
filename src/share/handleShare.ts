// The share layer of the edge middleware, as one call the host middleware makes AFTER its
// bot-block 403 and BEFORE its gate refuses. It answers two addresses and nothing else:
//
//   GET /s/mint?path=<route>     an AUTHORIZED reader asks for the share link of one page and
//                                gets {url}. Nobody else gets one: the answer is 401. A wiki
//                                with no gate answers with the page's own URL, because an open
//                                page needs no other address.
//   GET /s/<sig>/<route>         a share address. Genuine and the visitor is anonymous: serve
//                                the chrome-less mirror by rewrite. Genuine and the visitor is
//                                authorized: redirect to the canonical page. Not genuine: fall
//                                through, so the gate refuses it exactly as it refuses any
//                                other unknown path.
//
// Order matters and it is the host's responsibility: a training crawler must never reach a
// share address (the bot block comes first), and a share recipient must never meet the
// password door (this comes before the gate's own 401).
//
// The rewrite serves static HTML with every <script> stripped (see share-view-plugin), so it
// does not matter whether the host gates /assets/js: nothing hydrates, the client router never
// runs, and no other page's content rides along in a chunk. Images and CSS DO have to be
// reachable by an anonymous visitor for the mirror to render; every wiki in this family already
// excludes /img/ and /assets/ from its matcher.

import { MINT_PATH, canonicalRoute, sharePath, shareViewPath, verifySharePath } from './signedRoute';

export interface ShareRequest {
  url: URL;
  /** The host gate's own verdict on this request. On a wiki with no gate, always true. */
  authorized: boolean;
  /** The signing secret. Empty disables sharing: mint answers 503, share addresses fall through. */
  secret: string;
  /** Whether a gate is live at all. Off: mint hands back the canonical URL, since the page is
   *  already open to anyone and a share address would only redirect there. */
  gated: boolean;
}

function json(status: number, body: unknown, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });
}

/** Returns a Response when the request is the share layer's to answer, else undefined so the
 *  host gate carries on. */
export async function handleShare(req: ShareRequest): Promise<Response | undefined> {
  const { url, authorized, secret, gated } = req;

  if (url.pathname === MINT_PATH || url.pathname === MINT_PATH + '/') {
    const route = canonicalRoute(url.searchParams.get('path') ?? '');
    if (route === null) return json(400, { error: 'bad_path' });
    if (!authorized) return json(401, { error: 'not_authorized' });
    if (!gated) return json(200, { url: new URL(route, url.origin).toString(), focused: false });
    if (!secret) return json(503, { error: 'sharing_disabled', why: 'no WIKI_SHARE_SECRET or WIKI_GATE_SECRET on this deployment' });
    const path = await sharePath(secret, route);
    if (!path) return json(400, { error: 'bad_path' });
    return json(200, { url: new URL(path, url.origin).toString(), focused: true });
  }

  const route = await verifySharePath(secret, url.pathname);
  if (route === null) return undefined;

  if (authorized || !gated) {
    return Response.redirect(new URL(route, url.origin), 302);
  }
  return new Response(null, {
    headers: {
      'x-middleware-rewrite': new URL(shareViewPath(route), url.origin).toString(),
      // A shared page is for the person it was sent to, never for an index.
      'x-robots-tag': 'noindex, nofollow',
    },
  });
}
