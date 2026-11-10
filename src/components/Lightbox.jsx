import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { srcFor, srcSetFor } from './Img';

/** Accessible full-screen image viewer with keyboard and swipe navigation. */
export default function Lightbox({ items, index, onClose, onChange }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const isOpen = index !== null && index !== undefined;
  const item = isOpen ? items[index] : null;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const go = (delta) => onChange((index + delta + items.length) % items.length);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    // Preload neighbours for instant navigation.
    [1, -1].forEach((d) => {
      const n = items[(index + d + items.length) % items.length];
      if (n) new Image().src = srcFor(n.slug, 1600);
    });
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index, items]);

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        document.documentElement.style.overflow = '';
        onClose();
      }}
      aria-label="Image viewer"
      className="m-0 h-full max-h-none w-full max-w-none bg-umber-950/95 p-0 text-ivory-50 backdrop:bg-umber-950/80"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {item && (
        <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}>
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ivory/60" aria-live="polite">
              {index + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current.close()}
              className="grid h-11 w-11 place-items-center text-ivory/80 hover:text-ivory-50"
              aria-label="Close image viewer"
              autoFocus
            >
              <X className="h-7 w-7" strokeWidth={1.25} />
            </button>
          </div>

          <figure
            className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-6 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && dialogRef.current.close()}
          >
            <img
              key={item.slug}
              src={srcFor(item.slug, 1600)}
              srcSet={srcSetFor(item.slug)}
              sizes="(min-width: 1024px) 85vw, 100vw"
              alt={item.alt}
              className="max-h-full min-h-0 w-auto max-w-full animate-fade-up object-contain shadow-2xl"
            />
            <figcaption className="mt-4 max-w-2xl text-center font-serif text-lg italic text-ivory/80">{item.alt}</figcaption>
          </figure>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center text-ivory/70 transition-colors hover:text-ivory-50 sm:grid"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-9 w-9" strokeWidth={1} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center text-ivory/70 transition-colors hover:text-ivory-50 sm:grid"
                aria-label="Next image"
              >
                <ChevronRight className="h-9 w-9" strokeWidth={1} />
              </button>
              <div className="flex justify-center gap-10 pb-5 sm:hidden">
                <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center" aria-label="Previous image">
                  <ChevronLeft className="h-7 w-7" strokeWidth={1.25} />
                </button>
                <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center" aria-label="Next image">
                  <ChevronRight className="h-7 w-7" strokeWidth={1.25} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
