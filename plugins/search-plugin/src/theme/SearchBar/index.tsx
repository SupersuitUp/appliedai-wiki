import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styles from './styles.module.css';

const SearchModal = lazy(() => import('../SearchModal'));

function isInputTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (target.isContentEditable) return true;
  return false;
}

function isMacPlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
}

export default function SearchBar(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(isMacPlatform());
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isShortcut =
        (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey);
      if (isShortcut) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
      if (e.key === '/' && !isInputTarget(e.target) && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={open}
        aria-label="Search"
      >
        <svg
          className={styles.triggerIcon}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M14.386 14.386l4.0877 4.0877c.4101.4101.4101 1.0743 0 1.4844-.4101.4101-1.0743.4101-1.4844 0L12.901 15.87a8 8 0 111.485-1.485zM8 14a6 6 0 100-12 6 6 0 000 12z"
          />
        </svg>
        <span className={styles.triggerLabel}>Search</span>
        <span className={styles.triggerKbd} aria-hidden="true">
          {isMac ? '⌘' : 'Ctrl'} K
        </span>
      </button>
      {isOpen ? (
        <Suspense fallback={null}>
          <SearchModal onClose={close} />
        </Suspense>
      ) : null}
    </>
  );
}
