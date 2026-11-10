/**
 * Converts the original photographs in assets-source/originals into
 * responsive WebP renditions in public/images and writes a manifest
 * (src/data/images.json) with intrinsic dimensions and available widths.
 *
 * Run with: npm run images
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'assets-source/originals');
const OUT = path.join(root, 'public/images');
const MANIFEST = path.join(root, 'src/data/images.json');
const WIDTHS = [480, 960, 1600];
const SKIP = new Set(['BVI-Logo.jpg', 'cropped-BVI-favicon.jpg']);

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f) && !SKIP.has(f)).sort();
const manifest = {};

for (const file of files) {
  const slug = file.replace(/\.jpe?g$/i, '').toLowerCase();
  const input = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await input.metadata();
  const widths = WIDTHS.filter((w) => w < width);
  if (!widths.length || widths[widths.length - 1] < width) widths.push(Math.min(width, 1700));

  for (const w of widths) {
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 74, effort: 5 })
      .toFile(path.join(OUT, `${slug}-${w}.webp`));
  }
  manifest[slug] = { w: width, h: height, widths };
  console.log(`✓ ${slug} → ${widths.join(', ')}`);
}

// Social sharing image (1200×630 JPEG)
await sharp(path.join(SRC, 'Slide-2.jpg'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'));

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${files.length} images processed. Manifest written to src/data/images.json`);
