import React, { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import ShareButton from '@site/src/components/ShareButton';

type Props = WrapperProps<typeof ContentType>;

// Injects a Share button under the article's H1 via a portal slot.
export default function ContentWrapper(props: Props): ReactNode {
  const [shareSlot, setShareSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const h1 =
      document.querySelector('article header h1') ||
      document.querySelector('article h1') ||
      document.querySelector('.markdown h1');
    if (!h1) return;

    const existing = h1.parentElement?.querySelector('.share-link-slot');
    if (existing) existing.remove();

    const slot = document.createElement('div');
    slot.className = 'share-link-slot';
    slot.style.cssText = 'margin-top: 0.5rem; margin-bottom: 1rem;';

    h1.insertAdjacentElement('afterend', slot);
    setShareSlot(slot);

    return () => {
      slot.remove();
      setShareSlot(null);
    };
  }, []);

  return (
    <>
      <Content {...props} />
      {shareSlot ? createPortal(<ShareButton />, shareSlot) : null}
    </>
  );
}
