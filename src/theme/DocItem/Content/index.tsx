import React, { type ReactNode } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/DocItem/Content';
import DocMetaRow, { DocMetaPlacementContext } from '@theme/DocMetaRow';

// theme-classic's DocItem/Content, ejected (it is fifteen lines) so the meta
// row renders in the tree directly under the H1 instead of being portalled in
// after hydration. Everything theme-classic does here is kept: the synthetic
// title when frontmatter titles the page, and both cases under one
// div.markdown block (facebook/docusaurus#4882).
//
// Ejected rather than wrapped because a wrapper can only put the row before or
// after Content, and the H1 lives INSIDE Content. An instance that swizzles
// DocItem/Content keeps using @theme-original and gets this one.

// ThemeClassNames.docs.docMarkdown, written out so this file pulls in no second copy of
// theme-common; it is a string constant and the class is public API.
const DOC_MARKDOWN_CLASS = 'theme-doc-markdown';

function useSyntheticTitle(): string | null {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) return null;
  return metadata.title;
}

export default function DocItemContent({ children }: Props): ReactNode {
  const syntheticTitle = useSyntheticTitle();
  const placement = syntheticTitle ? 'after-synthetic-title' : 'after-content-h1';
  return (
    <div className={`${DOC_MARKDOWN_CLASS} markdown`}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          <DocMetaRow />
        </header>
      )}
      <DocMetaPlacementContext.Provider value={placement}>
        <MDXContent>{children}</MDXContent>
      </DocMetaPlacementContext.Provider>
    </div>
  );
}
