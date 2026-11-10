import images from '../data/images.json';

/** Build a srcset string for an optimised image slug. */
export function srcSetFor(slug) {
  const meta = images[slug];
  if (!meta) return undefined;
  return meta.widths.map((w) => `/images/${slug}-${w}.webp ${w}w`).join(', ');
}

/** URL of the largest rendition at or below `max` pixels wide. */
export function srcFor(slug, max = 960) {
  const meta = images[slug];
  if (!meta) return '';
  const w = [...meta.widths].reverse().find((x) => x <= max) ?? meta.widths[0];
  return `/images/${slug}-${w}.webp`;
}

/**
 * Responsive, lazy-loaded WebP image with intrinsic dimensions
 * (prevents layout shift). Pass `priority` for above-the-fold images.
 */
export default function Img({ slug, alt, sizes = '100vw', priority = false, className = '', ...rest }) {
  const meta = images[slug];
  if (!meta) {
    if (import.meta.env.DEV) console.warn(`Unknown image slug: ${slug}`);
    return null;
  }
  return (
    <img
      src={srcFor(slug, 960)}
      srcSet={srcSetFor(slug)}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      className={className}
      {...rest}
    />
  );
}
