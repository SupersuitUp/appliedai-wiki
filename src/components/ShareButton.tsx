import React, { useState } from 'react';

export default function ShareButton(): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // silently fail
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
        marginTop: '0.5rem',
        marginBottom: '1.5rem',
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
