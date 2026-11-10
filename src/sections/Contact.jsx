import { useState } from 'react';
import { MapPin, Phone, Mail, Navigation, Loader2, Send, Car, Star } from 'lucide-react';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import useEnquiryForm from '../hooks/useEnquiryForm';
import { useBooking } from '../components/BookingContext';
import { Field, Honeypot, SentMessage, ErrorNotice } from '../components/FormParts';
import { contact, journeys } from '../data/site';

function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-[380px] overflow-hidden bg-sand sm:h-[460px]">
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center text-sm text-umber-600" aria-hidden="true">
          Loading map…
        </div>
      )}
      <iframe
        title="Map showing Bandipur Village Inn on Tudikhel Road, Bandipur"
        src={contact.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className="relative h-full w-full border-0 grayscale-[35%] sepia-[15%]"
        allowFullScreen
      />
    </div>
  );
}

export default function Contact() {
  const { open: openBooking } = useBooking();
  const { errors, status, formRef, onSubmit, field, reset } = useEnquiryForm('contact', {
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const err = (name) => ({ error: errors[name], errorId: `contact-${name}-error`, htmlFor: `contact-${name}` });

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ivory pt-24 sm:pt-32">
      <div className="container-site grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Details */}
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact & Location"
            title={<>We look forward to <em className="text-terracotta">welcoming you</em></>}
          />
          <Reveal delay={100}>
            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
                <address className="not-italic">
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-umber-600">Address</span>
                  <span className="mt-1 block font-serif text-xl">
                    {contact.addressLines[0]}
                    <br />
                    {contact.addressLines[1]}
                  </span>
                </address>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-umber-600">Telephone</span>
                  <a href={contact.phoneHref} className="link-underline mt-1 font-serif text-xl !font-normal">{contact.phoneDisplay}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-umber-600">Email</span>
                  <a href={`mailto:${contact.email}`} className="link-underline mt-1 break-all font-serif text-xl !font-normal">{contact.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Car className="mt-1 h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-umber-600">How to reach</span>
                  <ul className="mt-1 space-y-1 text-umber-800">
                    {journeys.map((j) => (
                      <li key={j.from}>
                        {j.time.replace('About ', '')} ({j.distance}) {j.direction} from {j.from}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={contact.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                <Navigation className="h-4 w-4" aria-hidden="true" /> Get directions
              </a>
              <a href={contact.social[2].href} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                <Star className="h-4 w-4" aria-hidden="true" /> Guest reviews
              </a>
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
          <div className="relative border border-sand-300 bg-ivory-50 p-6 sm:p-10">
            <div className="dentil absolute inset-x-6 -top-[5px] text-terracotta sm:inset-x-10" aria-hidden="true" />
            {status.state === 'sent' ? (
              <SentMessage method={status.method} onReset={reset} />
            ) : (
              <>
                <h3 className="text-3xl">Send us an enquiry</h3>
                <p className="mt-2 text-sm text-umber-700">
                  Questions about your visit, groups or getting here? We reply by email. For reservations, use{' '}
                  <button type="button" onClick={() => openBooking()} className="text-terracotta underline underline-offset-2">
                    Book Your Stay
                  </button>.
                </p>
                <form ref={formRef} onSubmit={onSubmit} noValidate className="relative mt-8 grid gap-5 sm:grid-cols-2">
                  <Honeypot />
                  <Field label="Full name" {...err('name')}>
                    <input className="field" type="text" autoComplete="name" required {...field('name')} />
                  </Field>
                  <Field label="Email address" {...err('email')}>
                    <input className="field" type="email" autoComplete="email" required {...field('email')} />
                  </Field>
                  <Field label="Phone number" optional {...err('phone')} className="sm:col-span-2">
                    <input className="field" type="tel" autoComplete="tel" {...field('phone')} />
                  </Field>
                  <Field label="Your message" {...err('message')} className="sm:col-span-2">
                    <textarea className="field min-h-[150px] resize-y" rows={5} required {...field('message')} />
                  </Field>
                  {status.state === 'error' && <div className="sm:col-span-2"><ErrorNotice /></div>}
                  <div className="sm:col-span-2">
                    <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status.state === 'sending'}>
                      {status.state === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                      {status.state === 'sending' ? 'Sending…' : 'Send message'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </div>

      <div className="mt-24">
        <MapEmbed />
      </div>
    </section>
  );
}
