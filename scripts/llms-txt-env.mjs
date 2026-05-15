#!/usr/bin/env node
// Bridge: read wiki.config.json, set env vars, exec generate-llms-txt.sh.
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const wiki = JSON.parse(
  readFileSync(resolve(__dirname, '..', 'wiki.config.json'), 'utf8'),
);

const result = spawnSync('bash', [resolve(__dirname, 'generate-llms-txt.sh')], {
  stdio: 'inherit',
  env: {
    ...process.env,
    WIKI_TITLE: wiki.title,
    WIKI_DESCRIPTION: wiki.description,
    BASE_URL: wiki.url,
  },
});

process.exit(result.status ?? 0);
