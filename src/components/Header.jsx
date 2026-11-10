import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { navigation, contact } from '../data/site';
import useActiveSection from '../hooks/useActiveSection';
import { useBooking } from './BookingContext';
import { Emblem } from './Ornaments';

const IDS = navigation.map((n) => n.id);

export function Wordmark({ light }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="Bandipur Village Inn — back to top">
      <Emblem className={`h-9 w-9 transition-colors ${light ? 'text-terracotta-400' : 'text-terracotta'}`} />
      <span className="whitespace-nowrap leading-none">
        <span className={`block font-serif text-[1.45rem] font-medium tracking-tight ${light ? 'text-ivory-50' : 'text-umber'}`}>
          Bandipur Village Inn
        </span>
        <span className={`mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.32em] ${light ? 'text-ivory/70' : 'text-umber-600'}`}>
          Traditional Comfort
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(IDS);
  const { open } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,padding] duration-500 ${
        solid ? 'bg-ivory-50/95 py-3 shadow-[0_1px_0_rgba(42,28,19,.08)] backdrop-blur-md' : 'py-5 lg:py-7'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ivory-50 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="container-site flex items-center justify-between gap-6">
        <Wordmark light={!solid} />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative whitespace-nowrap py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform hover:after:scale-x-100 aria-[current]:after:scale-x-100 ${
                    solid ? 'text-umber hover:text-terracotta' : 'text-ivory-50/90 hover:text-ivory-50'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => open()} className="btn btn-primary hidden whitespace-nowrap !px-6 !py-3 sm:inline-flex">
            Book Your Stay
          </button>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center xl:hidden ${solid ? 'text-umber' : 'text-ivory-50'}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu — kept outside <header>: its backdrop-filter would otherwise trap this fixed panel */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="lattice fixed inset-x-0 bottom-0 top-[68px] z-30 overflow-y-auto bg-umber px-6 pb-10 pt-8 text-ivory-50 xl:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {navigation.map((item, i) => (
              <li key={item.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 border-b border-ivory/10 py-4 font-serif text-3xl"
                >
                  <span className="font-sans text-xs text-terracotta-400">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            open();
          }}
          className="btn btn-primary mt-10 w-full"
        >
          Book Your Stay
        </button>
        <a href={contact.phoneHref} className="mt-6 flex items-center justify-center gap-2 text-sm text-ivory/80">
          <Phone className="h-4 w-4" aria-hidden="true" /> {contact.phoneDisplay}
        </a>
      </div>
    </>
  );
}
