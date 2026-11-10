import { useMemo, useState } from 'react';
import { Expand } from 'lucide-react';
import Img from '../components/Img';
import SectionHeading from '../components/SectionHeading';
import Lightbox from '../components/Lightbox';
import { galleryCategories, galleryImages } from '../data/gallery';

const PAGE = 12;

export default function Gallery() {
  const [category, setCategory] = useState('all');
  const [visible, setVisible] = useState(PAGE);
  const [lightbox, setLightbox] = useState(null);

  const items = useMemo(
    () => (category === 'all' ? galleryImages : galleryImages.filter((i) => i.category === category)),
    [category],
  );
  const shown = items.slice(0, visible);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory-200 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeading
          id="gallery-title"
          align="center"
          eyebrow="Gallery"
          title={<>Brick, timber <em className="text-terracotta">&amp; snow peaks</em></>}
        />

        <div className="no-scrollbar -mx-5 mt-12 overflow-x-auto px-5">
          <div role="group" aria-label="Filter photographs" className="mx-auto flex w-max gap-2">
            {galleryCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => {
                  setCategory(c.id);
                  setVisible(PAGE);
                }}
                className={`whitespace-nowrap border px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  category === c.id ? 'border-umber bg-umber text-ivory-50' : 'border-umber/25 text-umber-700 hover:border-umber'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {shown.map((item, i) => (
            <li key={`${category}-${item.slug}`} className="break-inside-avoid animate-fade-up" style={{ animationDelay: `${(i % PAGE) * 40}ms` }}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden bg-sand"
                aria-label={`View larger: ${item.alt}`}
              >
                <Img
                  slug={item.slug}
                  alt=""
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="w-full transition duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-umber/75 via-transparent to-transparent p-4 text-left text-sm text-ivory-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-serif text-lg italic leading-tight">{item.alt}</span>
                  <Expand className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {visible < items.length && (
          <div className="mt-12 text-center">
            <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn btn-dark">
              Show more photographs
            </button>
            <p className="mt-3 text-xs text-umber-600">
              Showing {shown.length} of {items.length}
            </p>
          </div>
        )}
      </div>

      <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </section>
  );
}
