import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { linkForPage, mintAndCopy } from '@site/src/share/mintAndCopy';

const SHARE_PARAM = 'key';

/**
 * Copies the one-page share address for this page when the edge mints one
 * (wiki-template v1.1.0: /s/<sig>/<route>, the page alone, no password and no
 * sign-in for the holder). LOCAL VARIATION kept on purpose: when the edge does
 * not answer, the fallback is this wiki's older whole-wiki link with ?key=
 * attached, built on the clean path so a /listen resume position or any other
 * query never rides along to a friend. The clipboard is opened before the mint
 * request because iOS Safari expires the tap across an await.
 */
export default function ShareButton(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const shareValue = String(siteConfig.customFields?.wikiPassword ?? '');
  const [label, setLabel] = useState<'idle' | 'minting' | 'copied' | 'copied-page'>('idle');

  const wholeWikiLink = (url: string): string => {
    const u = new URL(url);
    if (shareValue) u.searchParams.set(SHARE_PARAM, shareValue);
    return u.toString();
  };

  const handleClick = async () => {
    if (typeof window === 'undefined') return;
    setLabel('minting');
    let focused = false;
    let result: { url: string; copied: boolean };
    try {
      result = await mintAndCopy({
        mint: async () => {
          const link = await linkForPage(window.location.href);
          focused = link.focused;
          return link.focused ? link.url : wholeWikiLink(link.url);
        },
        clipboard: navigator.clipboard,
      });
    } catch {
      result = { url: wholeWikiLink(window.location.origin + window.location.pathname), copied: false };
    }
    if (result.copied) {
      setLabel(focused ? 'copied' : 'copied-page');
      setTimeout(() => setLabel('idle'), 2200);
    } else {
      setLabel('idle');
      window.prompt('Copy this link:', result.url);
    }
  };
  const text = label === 'minting' ? 'minting…' : label === 'copied' ? 'copied · this page only' : label === 'copied-page' ? 'copied · whole wiki' : 'copy link';

  return (
    <button
      onClick={handleClick}
      style={{
        margin: 0,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.35rem 0.7rem',
        fontFamily: 'var(--ifm-font-family-monospace)',
        fontSize: '0.8rem',
        background: 'transparent',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '4px',
        color: 'var(--ifm-color-emphasis-700)',
        cursor: 'pointer',
      }}
      aria-label="Copy link to this page"
    >
      {text}
    </button>
  );
}
