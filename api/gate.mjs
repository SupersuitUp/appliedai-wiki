// The single serverless function behind the identity gate: /api/gate?op=...
//
// DARK BY DEFAULT. Without the Firestore service account and the gate secret
// in the environment, every request answers 404, indistinguishable from the
// route not existing, which is exactly what this deployment looked like
// before the gate shipped. The function stays usable with GATE_IDENTITY off
// once those env vars exist, so the whitelist can be seeded BEFORE the flag
// ever flips.
//
// Vercel invokes this legacy-style as (req, res). The raw body is read
// defensively: with the platform body helpers on, req.body is already
// consumed, so it is re-serialized (JSON.stringify(JSON.parse(s)) === s for
// bodies the edge produced with JSON.stringify); with helpers off, the stream
// is read directly.

import { createGateHandler, pickStore, gateSecret } from './_lib/gate-core.mjs';

async function rawBody(req) {
  if (typeof req.body === 'string') return req.body;
  if (req.body && Buffer.isBuffer(req.body)) return req.body.toString('utf8');
  if (req.body !== undefined && req.body !== null) return JSON.stringify(req.body);
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req, res) {
  const env = process.env;
  const store = pickStore(env);
  if (!store || !gateSecret(env)) {
    res.statusCode = 404;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }

  const url = new URL(req.url ?? '/', 'http://internal');
  const op = url.searchParams.get('op') ?? '';
  const method = (req.method ?? 'GET').toUpperCase();
  const body = method === 'POST' ? await rawBody(req) : '';
  const headers = {
    'x-gate-sig': req.headers['x-gate-sig'],
    'x-admin-key': req.headers['x-admin-key'],
    'x-email': req.headers['x-email'],
    cookie: req.headers.cookie,
  };

  try {
    const result = await createGateHandler(env, store)(op, method, body, headers);
    res.statusCode = result.status;
    if (result.body === null) {
      res.end();
      return;
    }
    res.setHeader('content-type', 'application/json');
    res.setHeader('cache-control', 'no-store');
    res.end(JSON.stringify(result.body));
  } catch (e) {
    res.statusCode = 502;
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ error: e?.message ?? 'gate failed' }));
  }
}
