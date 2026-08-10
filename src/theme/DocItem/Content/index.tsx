import React, { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import ShareButton from '@site/src/components/ShareButton';
import PageDates from '@site/src/components/PageDates';

type Props = WrapperProps<typeof ContentType>;

// Injects the article meta row — Created / Updated dates and a Share button —
// under the article's H1 via a portal slot.
export default function ContentWrapper(props: Props): ReactNode {
  const [metaSlot, setMetaSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const h1 =
      document.querySelector('article header h1') ||
      document.querySelector('article h1') ||
      document.querySelector('.markdown h1');
    if (!h1) return;

    // `.share-link-slot` is the slot's old name; clear either so a hot reload
    // or a client-side nav never leaves two rows stacked under the title.
    for (const stale of h1.parentElement?.querySelectorAll(
      '.doc-meta-slot, .share-link-slot',
    ) ?? []) {
      stale.remove();
    }

    const slot = document.createElement('div');
    slot.className = 'doc-meta-slot';
    slot.style.cssText = 'margin-top: 0.5rem; margin-bottom: 1rem;';

    h1.insertAdjacentElement('afterend', slot);
    setMetaSlot(slot);

    return () => {
      slot.remove();
      setMetaSlot(null);
    };
  }, []);

  const metaRow = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}
    >
      <PageDates />
      <ShareButton />
    </div>
  );

  return (
    <>
      <Content {...props} />
      {metaSlot ? createPortal(metaRow, metaSlot) : null}
    </>
  );
}
