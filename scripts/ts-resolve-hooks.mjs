// Lets `node --test` run the TypeScript under src/ and plugins/ as written.
//
// Node strips types natively but resolves ESM specifiers literally, so `./signedRoute` finds
// nothing. Every other consumer of these files (Vercel's edge bundler for middleware.ts,
// Docusaurus for the plugin, tsc) resolves that specifier to signedRoute.ts on its own, and
// Vercel REFUSES the explicit form: a middleware importing `./src/share/handleShare.ts` fails
// its build with "referencing unsupported modules" (reallife.wiki, 2026-09-12). So the source
// stays extensionless and this hook, loaded only for tests, tries the TypeScript extensions
// on a bare relative specifier.
//
//   node --import ./scripts/ts-resolve-hooks.mjs --test src/share/*.test.ts
import { register } from 'node:module';
register('./ts-resolve-loader.mjs', import.meta.url);
