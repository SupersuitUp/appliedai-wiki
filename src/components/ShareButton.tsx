import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const SHARE_PARAM = 'key';

export default function ShareButton(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const shareValue = String(siteConfig.customFields?.wikiPassword ?? '');
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (shareValue) {
      url.searchParams.set(SHARE_PARAM, shareValue);
    }
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link:', url.toString());
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
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
      {copied ? 'copied' : 'copy link'}
    </button>
  );
}
