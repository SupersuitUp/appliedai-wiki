// Minting the share link and getting it onto the clipboard, as a pure module so the
// browser-only failure mode reproduces under `node --test` instead of on a phone.
//
// The failure this exists to fix (found on FaithWalk OS, mobile, 2026-08-12): the clipboard
// write used to run AFTER `await fetch(...)`. iOS Safari expires the click's transient user
// activation across that await and rejects the write, so the button fell back to showing the
// link for a long-press, which is not what anyone tapping "copy link" wants.
//
// The fix is the WebKit-sanctioned pattern: hand `clipboard.write` a ClipboardItem whose value
// is a PROMISE, synchronously inside the click, before any await. The activation is still live
// at that moment, and Safari holds the clipboard open until the promise settles. `writeText`
// after the await stays as the fallback for engines that allow it.

export interface ShareClipboard {
  write?: (items: unknown[]) => Promise<void>;
  writeText?: (text: string) => Promise<void>;
}

export interface MintDeps {
  /** Produces the link. Rejects when it cannot; the caller then falls back to the page URL. */
  mint: () => Promise<string>;
  clipboard?: ShareClipboard;
  /** Injected so tests run without a DOM. Omit to use the global. */
  ClipboardItemCtor?: new (data: Record<string, unknown>) => unknown;
  BlobCtor?: typeof Blob;
}

export interface MintResult {
  url: string;
  /** False means the caller must show the link, since nothing reached the clipboard. */
  copied: boolean;
}

const TEXT = 'text/plain';

/** Mints the link and copies it, preferring the path that survives mobile Safari. Throws only
 *  when MINTING fails; a clipboard that refuses is reported as `copied: false` beside a usable
 *  url, because the link exists either way. */
export async function mintAndCopy(deps: MintDeps): Promise<MintResult> {
  const clipboard = deps.clipboard;
  const ClipboardItemCtor =
    deps.ClipboardItemCtor ?? (typeof ClipboardItem !== 'undefined' ? ClipboardItem : undefined);
  const BlobCtor = deps.BlobCtor ?? (typeof Blob !== 'undefined' ? Blob : undefined);

  // Step one, still inside the user activation: open the clipboard on a promise we have not
  // resolved yet. Nothing is awaited before this line.
  let settle: ((blob: Blob) => void) | undefined;
  let fail: ((err: unknown) => void) | undefined;
  let eagerWrite: Promise<void> | undefined;

  if (clipboard?.write && ClipboardItemCtor && BlobCtor) {
    const pending = new Promise<Blob>((resolve, reject) => {
      settle = resolve;
      fail = reject;
    });
    try {
      eagerWrite = clipboard.write([new ClipboardItemCtor({ [TEXT]: pending })]);
      // A rejection here is expected on engines without promise support. Swallow it at the
      // source so it never surfaces as an unhandled rejection.
      eagerWrite.catch(() => {});
    } catch {
      eagerWrite = undefined;
      fail?.(new Error('clipboard.write unavailable'));
      settle = undefined;
      fail = undefined;
    }
  }

  let url: string;
  try {
    url = await deps.mint();
  } catch (err) {
    fail?.(err);
    throw err;
  }

  settle?.(new BlobCtor!([url], { type: TEXT }));

  if (eagerWrite) {
    try {
      await eagerWrite;
      return { url, copied: true };
    } catch {
      // Fall through to writeText.
    }
  }

  if (clipboard?.writeText) {
    try {
      await clipboard.writeText(url);
      return { url, copied: true };
    } catch {
      // Fall through to the reveal path.
    }
  }

  return { url, copied: false };
}

/** The link the copy button hands out for the current page: the focused share address when
 *  the wiki's edge mints one, else the page's own URL. Never throws; the page URL is always a
 *  link, even when it is the wrong size. */
export async function linkForPage(
  href: string,
  fetchImpl: (input: string, init?: RequestInit) => Promise<Response> = fetch,
): Promise<{ url: string; focused: boolean }> {
  const page = new URL(href);
  const fallback = { url: page.origin + page.pathname, focused: false };
  try {
    const res = await fetchImpl(`/s/mint?path=${encodeURIComponent(page.pathname)}`, {
      credentials: 'same-origin',
      headers: { accept: 'application/json' },
    });
    if (!res.ok) return fallback;
    const body = (await res.json()) as { url?: unknown; focused?: unknown };
    if (typeof body.url !== 'string' || !/^https?:\/\//.test(body.url)) return fallback;
    return { url: body.url, focused: body.focused === true };
  } catch {
    return fallback;
  }
}
