import { ArrowUp, Facebook, Instagram, Star, MapPin, Phone, Mail } from 'lucide-react';
import { Wordmark } from './Header';
import { Divider } from './Ornaments';
import { contact, navigation } from '../data/site';
import { useBooking } from './BookingContext';

const SOCIAL_ICONS = { Facebook, Instagram, Tripadvisor: Star };

export default function Footer() {
  const { open } = useBooking();
  return (
    <footer className="lattice relative bg-umber-950 text-ivory/80">
      <div className="dentil text-terracotta/60" aria-hidden="true" />
      <div className="container-site py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark light />
            <p className="mt-6 max-w-xs font-serif text-xl italic text-ivory/80">{contact.tagline}</p>
            <ul className="mt-8 flex gap-3">
              {contact.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Bandipur Village Inn on ${s.label} (opens in a new tab)`}
                      className="grid h-11 w-11 place-items-center border border-ivory/20 transition-colors hover:border-terracotta-400 hover:bg-terracotta hover:text-ivory-50"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-5">
            <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-terracotta-400">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="transition-colors hover:text-ivory-50">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-terracotta-400">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden="true" />
                <address className="not-italic">{contact.addressLines[0]}<br />{contact.addressLines[1]}</address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden="true" />
                <a href={contact.phoneHref} className="hover:text-ivory-50">{contact.phoneDisplay}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-400" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="break-words hover:text-ivory-50">{contact.email}</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-terracotta-400">Stay</h2>
            <p className="mt-5 text-sm">Between Kathmandu and Pokhara, 8 km above the Prithvi Highway.</p>
            <button type="button" onClick={() => open()} className="btn btn-primary mt-6 whitespace-nowrap !px-5">Book Your Stay</button>
          </div>
        </div>

        <Divider className="mt-16 text-sand/60" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-ivory/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Bandipur Village Inn. All rights reserved.</p>
          <a href="#top" className="flex items-center gap-2 uppercase tracking-[0.2em] hover:text-ivory-50">
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
