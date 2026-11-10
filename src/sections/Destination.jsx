import { useState } from 'react';
import { Landmark, Mountain, Waves, Footprints } from 'lucide-react';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Lightbox from '../components/Lightbox';
import { archive } from '../data/gallery';
import { journeys } from '../data/site';

const highlights = [
  {
    icon: Landmark,
    title: 'Newari streets & architecture',
    text: 'Pagoda roofs, wooden lattice windows and carved doorways line the old bazaar, built by Newar merchants who came here after the late 18th century.',
  },
  {
    icon: Mountain,
    title: 'A Himalayan panorama',
    text: 'The entire Annapurna range with Dhaulagiri, Manaslu, Langtang and Ganesh Himal — seen from a single hill crest.',
  },
  {
    icon: Waves,
    title: 'The Marshyangdi Valley',
    text: 'Look down over the Marshyangdi Valley, often filled with a soft sea of morning cloud.',
  },
  {
    icon: Footprints,
    title: 'Village walks',
    text: 'Day hikes to surrounding villages, the historic merchants’ trail and, in late spring and summer, hillsides bright with orchids.',
  },
];

export default function Destination() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="bandipur" aria-labelledby="bandipur-title" className="lattice relative bg-umber text-ivory-50">
      {/* Panorama */}
      <div className="relative h-[52vh] min-h-[320px] overflow-hidden sm:h-[68vh]">
        <Img
          slug="bandipur-mountains-02"
          alt="Snow peaks of the central Himalaya lit gold at sunrise, seen from Bandipur"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-umber/20 via-transparent to-umber" />
      </div>

      <div className="container-site relative -mt-24 pb-24 sm:-mt-32 sm:pb-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              id="bandipur-title"
              tone="light"
              eyebrow="The Destination"
              title={
                <>
                  Bandipur — a Newar town <em className="text-sand">outside the valley</em>
                </>
              }
              intro="A charming, historic hilltop town midway between Kathmandu and Pokhara, only 8 km above the Prithvi Highway. Once a thriving trading post on the route between the hills and the Terai, Bandipur has kept its ethnic charm while welcoming travellers once more."
            />
          </div>

          {/* Journey card */}
          <Reveal className="self-end lg:col-span-5 lg:col-start-8" delay={150}>
            <div className="border border-ivory/15 bg-umber-800/70 p-7 backdrop-blur-sm sm:p-9">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-terracotta-400">How to reach</p>
              <div className="mt-6 flex items-center gap-3 text-sm" aria-hidden="true">
                <span className="font-serif text-lg">Kathmandu</span>
                <span className="h-px flex-1 border-t border-dashed border-ivory/40" />
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terracotta font-serif text-ivory-50">B</span>
                <span className="h-px flex-1 border-t border-dashed border-ivory/40" />
                <span className="font-serif text-lg">Pokhara</span>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {journeys.map((j) => (
                  <li key={j.from} className="border-t border-ivory/15 pt-4">
                    <p className="font-serif text-3xl">{j.distance}</p>
                    <p className="mt-1 text-sm text-ivory/70">
                      {j.time} — {j.direction} from {j.from}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Highlights */}
        <ul className="mt-20 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 90} className="bg-umber p-7 sm:p-8">
              <Icon className="h-7 w-7 text-terracotta-400" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="mt-6 text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/70">{text}</p>
            </Reveal>
          ))}
        </ul>

        {/* History + archive */}
        <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow !text-terracotta-400">From the archive</p>
            <h3 className="mt-5 text-3xl sm:text-4xl">A merchant town, lovingly restored</h3>
            <p className="mt-5 text-sm leading-relaxed text-ivory/75">
              Bandipur Bazaar flourished as a centre of commerce during the Rana period (1846–1951). When the Prithvi
              Highway bypassed the hill in 1973, the town fell quiet for many years. Today its Newar houses are being
              restored by the community, and Bandipur offers a rare look at Newar cultural life outside the Kathmandu Valley.
            </p>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-ivory/50">Archival photographs of old Bandipur</p>
          </Reveal>

          <div className="min-w-0 lg:col-span-8">
            <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0" aria-label="Archival photographs of Bandipur">
              {archive.map((item, i) => (
                <li key={item.slug} className="w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-[38%]">
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className="group block w-full overflow-hidden bg-umber-800 p-2"
                    aria-label={`View larger: ${item.alt}`}
                  >
                    <Img
                      slug={item.slug}
                      alt=""
                      sizes="(min-width: 1024px) 26vw, 60vw"
                      className="aspect-[4/3] w-full object-cover sepia-[.25] transition duration-700 group-hover:scale-[1.03] group-hover:sepia-0"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Lightbox items={archive} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </section>
  );
}
