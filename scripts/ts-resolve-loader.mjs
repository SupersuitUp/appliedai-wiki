import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const EXTENSIONS = ['.ts', '.tsx', '.mts'];

export async function resolve(specifier, context, next) {
  const relative = specifier.startsWith('./') || specifier.startsWith('../');
  const bare = !/\.[a-z0-9]+$/i.test(specifier);
  if (relative && bare && context.parentURL) {
    const base = new URL(specifier, context.parentURL);
    for (const ext of EXTENSIONS) {
      if (existsSync(fileURLToPath(base) + ext)) return next(base.href + ext, context);
    }
  }
  return next(specifier, context);
}
