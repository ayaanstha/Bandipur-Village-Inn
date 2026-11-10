import { Phone } from 'lucide-react';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import { useBooking } from '../components/BookingContext';
import { contact } from '../data/site';

export default function BookingBand() {
  const { open } = useBooking();
  return (
    <section aria-labelledby="band-title" className="relative overflow-hidden bg-forest-900 py-24 text-ivory-50 sm:py-32">
      <Img slug="slide-1" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/80 to-forest-900/30" />
      <Reveal className="container-site relative">
        <div className="max-w-2xl">
          <p className="eyebrow !text-sand">Your stay awaits</p>
          <h2 id="band-title" className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Wake above the clouds, <em className="text-sand">in a town that time forgot</em>
          </h2>
          <p className="mt-6 max-w-lg text-ivory/80">
            Send us your dates and our team will confirm availability and rates personally — or call us directly.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => open()} className="btn btn-primary">
              Book Your Stay
            </button>
            <a href={contact.phoneHref} className="btn btn-light">
              <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
