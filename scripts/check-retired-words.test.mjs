#!/usr/bin/env node
// The retired-words gate. A word Gary retires (Jarvis, 2026-09-02; worklife, 2026-09-19) used to be
// retired by hand and survived wherever the sweep matched the compound and not the bare word.
// The NEGATIVES matter as much: "work and life", "where the work lives" and an exempt corpus must
// pass, or the gate is switched off within a week.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, mkdirSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {findRetiredWords, scanTree, resolveConfig, globToRe} from './check-retired-words.mjs';

const WORDS = [{name: 'worklife', pattern: '\\bwork[- ]?life\\b|\\bwork/life\\b|\\bworklives\\b', since: '2026-09-19', use: 'life infrastructure'}];

test('hits every spelling of the retired word', () => {
  for (const s of ['worklife', 'Worklife', 'work life', 'work-life balance', 'work/life', 'their worklives'])
    assert.equal(findRetiredWords(s, WORDS).length, 1, s);
});

test('passes the phrases that only look like it', () => {
  for (const s of ['work and life', 'where the work lives', 'a working life', 'lifework', 'network life'])
    assert.equal(findRetiredWords(s, WORDS).length, 0, s);
});

test('scans docs, plain and src/data, skips exempt globs, reports file and line', () => {
  const root = mkdtempSync(join(tmpdir(), 'retired-'));
  mkdirSync(join(root, 'docs'), {recursive: true});
  mkdirSync(join(root, 'reference-corpus'), {recursive: true});
  writeFileSync(join(root, 'docs', 'a.md'), '# A\n\nfine\n\nyour worklife\n');
  writeFileSync(join(root, 'reference-corpus', 'book.txt'), 'work-life balance\n');
  const hits = scanTree(root, {words: WORDS, exempt: ['reference-corpus/**']});
  assert.equal(hits.length, 1);
  assert.equal(hits[0].file, 'docs/a.md');
  assert.equal(hits[0].line, 5);
  assert.equal(hits[0].name, 'worklife');
});

test('** in a glob matches zero or more path segments, not one or more', () => {
  const re = globToRe('static/**/*.recipe.json');
  assert.ok(re.test('static/a.recipe.json'), 'zero directories between static/ and the file');
  assert.ok(re.test('static/img/comics/x.recipe.json'), 'two directories between static/ and the file');
  assert.equal(re.test('docs/a.recipe.json'), false, 'a different top-level dir is still scanned');
});

test('config comes from wiki.config.json first, then scripts/retired-words.json, else nothing', () => {
  const root = mkdtempSync(join(tmpdir(), 'retired-cfg-'));
  assert.equal(resolveConfig(root), null);
  mkdirSync(join(root, 'scripts'));
  writeFileSync(join(root, 'scripts', 'retired-words.json'), JSON.stringify({words: WORDS, exempt: []}));
  assert.equal(resolveConfig(root).words[0].name, 'worklife');
  writeFileSync(join(root, 'wiki.config.json'), JSON.stringify({retired_words: {words: [{name: 'x', pattern: 'x', since: '2026-01-01', use: 'y'}], exempt: []}}));
  assert.equal(resolveConfig(root).words[0].name, 'x');
});
