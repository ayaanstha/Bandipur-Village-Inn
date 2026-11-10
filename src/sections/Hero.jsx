import { ArrowDown, MapPin } from 'lucide-react';
import Img from '../components/Img';
import { useBooking } from '../components/BookingContext';

export default function Hero() {
  const { open } = useBooking();
  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-end overflow-hidden bg-umber text-ivory-50">
      <div className="absolute inset-0">
        <Img
          slug="slide-2"
          alt="Traditional houses of Bandipur beneath the snow-capped Himalaya"
          priority
          className="h-full w-full animate-hero-zoom object-cover object-[60%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-umber-950/90 via-umber-950/35 to-umber-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-umber-950/55 via-transparent to-transparent" />
      </div>

      <div className="container-site relative pb-16 pt-40 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-up !text-ivory/85 [animation-delay:200ms]">
            Boutique heritage hotel · Bandipur, Nepal
          </p>
          <h1
            id="hero-title"
            className="mt-6 animate-fade-up text-[3.4rem] leading-[0.95] sm:text-7xl lg:text-[6.5rem] [animation-delay:350ms]"
          >
            Bandipur
            <br />
            <span className="italic text-sand">Village Inn</span>
          </h1>
          <p className="mt-7 animate-fade-up font-serif text-2xl italic text-ivory/95 sm:text-[1.9rem] [animation-delay:500ms]">
            Experience the peace and tranquillity of timelessness.
          </p>
          <p className="mt-5 max-w-xl animate-fade-up text-[1.02rem] leading-relaxed text-ivory/80 [animation-delay:650ms]">
            A tribute to Newari architecture and craftsmanship, set in the heart of a historic hilltop town — with
            the Annapurna, Dhaulagiri and Ganesh Himal ranges on the horizon.
          </p>
          <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row [animation-delay:800ms]">
            <button type="button" onClick={() => open()} className="btn btn-primary">
              Book Your Stay
            </button>
            <a href="#about" className="btn btn-light">
              Explore the Inn
            </a>
          </div>
        </div>

        <div className="mt-14 flex items-end justify-between gap-6 border-t border-ivory/20 pt-6 text-xs text-ivory/75">
          <p className="flex items-center gap-2 uppercase tracking-[0.2em]">
            <MapPin className="h-3.5 w-3.5 text-terracotta-400" aria-hidden="true" />
            Tudikhel, Bandipur — between Kathmandu &amp; Pokhara
          </p>
          <a href="#about" className="hidden items-center gap-2 uppercase tracking-[0.2em] hover:text-ivory-50 sm:flex">
            Scroll <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
