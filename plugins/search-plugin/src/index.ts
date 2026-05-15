import path from 'path';
import fs from 'fs/promises';
import type { LoadContext, Plugin } from '@docusaurus/types';
import { buildSearchIndex } from './build-index';

const INDEX_OUTPUT_RELATIVE = 'static/search-index.json';

export default function searchPlugin(context: LoadContext): Plugin {
  const { siteDir } = context;
  const docsDir = path.resolve(siteDir, 'docs');
  const outputPath = path.resolve(siteDir, INDEX_OUTPUT_RELATIVE);

  return {
    name: 'docusaurus-plugin-search',

    getThemePath() {
      return path.resolve(__dirname, './theme');
    },

    async loadContent() {
      const entries = await buildSearchIndex(docsDir);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(
        outputPath,
        JSON.stringify(entries),
        'utf8',
      );
      return entries;
    },

    getPathsToWatch() {
      return [path.join(docsDir, '**/*.md'), path.join(docsDir, '**/*.mdx')];
    },
  };
}
