// Vercel Routing Middleware (platform-level, runs before the cache).
// Blocks known LLM training and AI-search crawlers by User-Agent.
// Compliant crawlers that do not honor robots.txt still get hard-stopped here.
// Bot-block only — no auth, no password logic.

const BLOCKED_BOT_PATTERN =
  /\b(GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-Web|anthropic-ai|CCBot|Google-Extended|GoogleOther|Applebot-Extended|FacebookBot|Meta-ExternalAgent|meta-externalagent|Bytespider|PerplexityBot|Perplexity-User|Amazonbot|AI2Bot|cohere-ai|Diffbot|Omgili|ImagesiftBot|YouBot|DuckAssistBot|peer39_crawler|TimpiBot|Webzio-Extended|Kangaroo|Cotoyogi)\b/i;

export default function middleware(request: Request): Response | undefined {
  const ua = request.headers.get('user-agent') ?? '';
  if (BLOCKED_BOT_PATTERN.test(ua)) {
    return new Response(
      'Forbidden: automated training and AI-search crawlers are not permitted on this site.',
      {
        status: 403,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      },
    );
  }
  // Implicit undefined return lets the request continue to the static site.
}

export const config = {
  // Run on HTML routes only. Skip static assets so we do not pay function
  // invocations on every CSS, JS, image, or font fetch.
  //
  // `skills/` and `generators/` are intentionally excluded too: this wiki hosts
  // canonical agent SKILL.md and GENERATE.md files under static/skills/<name>/SKILL.md
  // and static/generators/<name>/GENERATE.md, served openly so agents (including
  // blocked-UA crawlers) can fetch and run them while the rest of the wiki stays
  // sealed. Without this, an agent told to fetch a hosted recipe gets a 403 and
  // the recipe is undeliverable, which is exactly what happened before 2026-07-29.
  // Note the `.md` extension is NOT in the asset list below, so these paths would
  // otherwise be matched and blocked. Do not remove these two exclusions.
  matcher: [
    '/((?!assets/|img/|skills/|generators/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:js|css|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|map|json|xml)$).*)',
  ],
  runtime: 'edge',
};
