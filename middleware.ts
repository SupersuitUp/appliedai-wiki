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
  matcher: [
    '/((?!assets/|img/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:js|css|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|map|json|xml)$).*)',
  ],
  runtime: 'edge',
};
