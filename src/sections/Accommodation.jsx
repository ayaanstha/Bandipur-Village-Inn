import { useState } from 'react';
import { Wifi, Tv, Coffee, Mountain, ChevronLeft, ChevronRight, ArrowRight, BedDouble } from 'lucide-react';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { useBooking } from '../components/BookingContext';
import { amenities, rooms } from '../data/site';

const ICONS = { wifi: Wifi, tv: Tv, coffee: Coffee, mountain: Mountain };

function RoomGallery({ room }) {
  const [i, setI] = useState(0);
  const n = room.images.length;
  const go = (d) => setI((x) => (x + d + n) % n);
  return (
    <div className="group relative overflow-hidden bg-sand" aria-roledescription="carousel" aria-label={`${room.name} photos`}>
      <div className="flex transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
        {room.images.map((img, idx) => (
          <div key={img.slug} className="w-full shrink-0" aria-hidden={idx !== i}>
            <Img slug={img.slug} alt={img.alt} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-umber/70 to-transparent p-3 pt-10">
        <div className="flex gap-1.5 pl-2" aria-hidden="true">
          {room.images.map((img, idx) => (
            <span key={img.slug} className={`h-1 rounded-full transition-all ${idx === i ? 'w-6 bg-ivory-50' : 'w-2 bg-ivory/50'}`} />
          ))}
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center bg-ivory-50/90 text-umber transition hover:bg-ivory-50" aria-label={`Previous ${room.name} photo`}>
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button type="button" onClick={() => go(1)} className="grid h-10 w-10 place-items-center bg-ivory-50/90 text-umber transition hover:bg-ivory-50" aria-label={`Next ${room.name} photo`}>
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Photo {i + 1} of {n}: {room.images[i].alt}
      </p>
    </div>
  );
}

export default function Accommodation() {
  const { open } = useBooking();
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="relative bg-ivory-200 py-24 sm:py-32">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="rooms-title"
            eyebrow="Accommodation"
            title={<>Rooms with a <em className="text-terracotta">Newari soul</em></>}
            intro="Bright, spacious rooms where modern yet traditional décor combines luxury with comfort — carved timber, exposed brick and warm terracotta, with charming balconies and stunning views."
          />
          <Reveal delay={120} className="lg:max-w-sm">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-umber-600">In every room</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
              {amenities.map((a) => {
                const Icon = ICONS[a.icon];
                return (
                  <li key={a.label} className="flex items-start gap-3 text-sm text-umber-800">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.4} aria-hidden="true" />
                    {a.label}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, idx) => (
            <Reveal as="li" key={room.id} delay={idx * 120} className="flex flex-col bg-ivory-50 shadow-[0_20px_50px_-35px_rgba(42,28,19,.5)]">
              <RoomGallery room={room} />
              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-umber-600">
                  <BedDouble className="h-3.5 w-3.5 text-terracotta" aria-hidden="true" /> {room.beds}
                </p>
                <h3 className="mt-3 text-[2.1rem]">{room.name}</h3>
                <p className="mt-4 flex-1 text-[0.95rem] text-umber-700">{room.summary}</p>
                {room.note && <p className="mt-4 border-l-2 border-terracotta pl-3 text-sm italic text-umber-800">{room.note}</p>}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-sand pt-6">
                  <button type="button" onClick={() => open(room.name)} className="link-underline whitespace-nowrap text-[0.72rem] uppercase tracking-[0.2em] text-terracotta">
                    Enquire &amp; book <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="whitespace-nowrap text-xs text-umber-600">Rates on request</span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
