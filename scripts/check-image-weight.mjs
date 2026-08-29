#!/usr/bin/env node
// Image weight gate. Runs in prebuild, beside check-admonitions and check-links.
//
// THE CONTRACT: every illustration under static/img is webp, at most MAX_W px wide, and
// under MAX_BYTES. Icons are exempt (a favicon must stay .ico/.png).
//
// WHY THIS EXISTS. An image model writes PNG, and a PNG straight out of gpt-image-2 is
// 2-4 MB where the same picture as webp is 200-400 KB. Nothing about that looks wrong:
// the page renders, the build passes, the image is correct. The cost lands somewhere
// nobody is looking. On faithwalk.garysheng.com it reached 2.1 GB of images and Vercel
// spent 2m18s of every 4m build cloning the repo; across Gary's wiki fleet it reached
// 1.6 GB. Every reader pays it too, on every page view, on their phone.
//
// So the defect is invisible to every signal a build normally gives you, which is exactly
// why it needs a signal of its own. Same reasoning as check-admonitions and check-links.
//
// Deliberately dependency-free: it reads magic bytes and image headers itself. A gate that
// forces a native image library into every wiki's install would cost more build time than
// it saves. The paired converter (scripts/optimize-images.py) runs on a laptop, not here.
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, resolve, relative } from "path";

const ROOT = resolve(process.argv[2] || ".");
const MAX_W = 1536;        // what the image skills generate; articles render ~860px wide
const MAX_BYTES = 1_000_000;
const IMAGE_EXT = /\.(webp|png|jpe?g|gif)$/i;
// Two exemptions from the FORMAT rule, both deliberate. Icons must stay .ico/.png or the
// browser will not use them. Share cards must stay png/jpg because several unfurl
// consumers still do not render webp, and a share image that does not unfurl defeats its
// own purpose. Both still have to obey the size cap.
const FORMAT_EXEMPT = /(favicon|apple-touch-icon|android-chrome|mstile|safari-pinned|icon-\d|social-card|share-card|og-image)/i;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (IMAGE_EXT.test(e.name)) out.push(p);
  }
  return out;
}

// True format and pixel width from the file header. Extensions lie; headers do not.
function probe(file) {
  const h = readFileSync(file, { length: 64 }).subarray(0, 64);
  if (h.length >= 24 && h.readUInt32BE(0) === 0x89504e47) return { fmt: "png", w: h.readUInt32BE(16) };
  if (h.subarray(0, 4).toString() === "RIFF" && h.subarray(8, 12).toString() === "WEBP") {
    const chunk = h.subarray(12, 16).toString();
    if (chunk === "VP8X") return { fmt: "webp", w: 1 + (h[24] | (h[25] << 8) | (h[26] << 16)) };
    if (chunk === "VP8L") return { fmt: "webp", w: 1 + (h.readUInt16LE(21) & 0x3fff) };
    if (chunk === "VP8 ") return { fmt: "webp", w: h.readUInt16LE(26) & 0x3fff };
    return { fmt: "webp", w: 0 };
  }
  if (h[0] === 0xff && h[1] === 0xd8) return { fmt: "jpeg", w: 0 };
  if (h.subarray(0, 3).toString() === "GIF") return { fmt: "gif", w: 0 };
  return { fmt: "unknown", w: 0 };
}

const offenders = [];
let totalBytes = 0;
for (const file of walk(join(ROOT, "static"))) {
  const size = statSync(file).size;
  totalBytes += size;
  const { fmt, w } = probe(file);
  const exempt = FORMAT_EXEMPT.test(file);
  const why = [];
  if (fmt !== "webp" && !exempt) why.push(`is ${fmt}, not webp`);
  if (w > MAX_W && !exempt) why.push(`is ${w}px wide (max ${MAX_W})`);
  if (size > MAX_BYTES) why.push(`is ${(size / 1048576).toFixed(1)} MB (max ${MAX_BYTES / 1e6} MB)`);
  if (why.length) offenders.push({ file: relative(ROOT, file), size, why });
}

if (!offenders.length) {
  console.log(`[image-weight] ok (${(totalBytes / 1048576).toFixed(1)} MB of images)`);
  process.exit(0);
}
const wasted = offenders.reduce((n, o) => n + o.size, 0);
console.error(`\n[image-weight] ${offenders.length} image(s) fail the contract (${(wasted / 1048576).toFixed(1)} MB):\n`);
for (const o of offenders.slice(0, 25)) console.error(`  ${o.file} — ${o.why.join("; ")}`);
if (offenders.length > 25) console.error(`  ...and ${offenders.length - 25} more`);
console.error(`
Every one of these is cloned on every Vercel build and downloaded by every reader.

Fix:  npm run optimize:images       (converts, renames, and rewrites every reference)
`);
process.exit(1);
