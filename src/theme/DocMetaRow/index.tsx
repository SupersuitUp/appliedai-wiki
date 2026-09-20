import React, { createContext, useContext } from 'react';
import PageDates from '@site/src/components/PageDates';
import ShareButton from '@site/src/components/ShareButton';

// The article meta row: Created / Updated dates and the share button, directly
// under the H1. It is rendered IN THE TREE, never portalled into the DOM after
// hydration, because the row has to be in the static HTML: the chrome-less
// share mirror (/s/<sig>/<route>) is derived from that HTML and has no
// scripts, and until 2026-09-20 it therefore showed no dates on any page.
//
// Where the row goes depends on where the H1 is. A page titled by frontmatter
// gets a synthetic <header><h1/> from DocItem/Content, and the row follows it
// there. A page that writes its own `# Title` in markdown has its H1 rendered
// by the MDX `h1` component, so DocItem/Content tells that component, through
// this context, to render the row after the first H1 it draws.
export type DocMetaPlacement = 'after-synthetic-title' | 'after-content-h1';

export const DocMetaPlacementContext = createContext<DocMetaPlacement | null>(null);

export function useDocMetaPlacement(): DocMetaPlacement | null {
  return useContext(DocMetaPlacementContext);
}

export default function DocMetaRow(): React.JSX.Element {
  return (
    <div
      className="doc-meta-slot"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        // Spacing belongs to the row, not to the button inside it.
        margin: '0.25rem 0 1.5rem',
      }}
    >
      <PageDates />
      <ShareButton />
    </div>
  );
}
