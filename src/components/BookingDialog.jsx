import { useEffect, useRef } from 'react';
import { X, Loader2, CalendarDays } from 'lucide-react';
import { useBooking } from './BookingContext';
import useEnquiryForm from '../hooks/useEnquiryForm';
import { todayISO } from '../lib/validate';
import { rooms } from '../data/site';
import { Field, Honeypot, SentMessage, ErrorNotice, DirectContact } from './FormParts';
import Img from './Img';

const INITIAL = { name: '', email: '', phone: '', arrival: '', departure: '', guests: '2', room: '', message: '' };

export default function BookingDialog() {
  const { isOpen, close, room } = useBooking();
  const dialogRef = useRef(null);
  const { values, setValues, errors, status, formRef, onSubmit, field, reset } = useEnquiryForm('booking', INITIAL);

  // Sync the native <dialog> with React state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      if (status.state === 'sent') reset();
      if (room) setValues((v) => ({ ...v, room }));
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, room]);

  const onClose = () => {
    document.documentElement.style.overflow = '';
    close();
  };

  const minDeparture = values.arrival ? nextDay(values.arrival) : todayISO(1);
  const err = (name) => ({ error: errors[name], errorId: `booking-${name}-error`, htmlFor: `booking-${name}` });

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
      aria-labelledby="booking-title"
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 sm:m-auto sm:h-auto sm:max-h-[92vh] sm:max-w-5xl"
    >
      <div className="grid h-full bg-ivory-50 sm:h-auto sm:max-h-[92vh] md:h-[min(92vh,820px)] md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative hidden overflow-hidden md:block">
          <Img slug="our-exterior-05" alt="" sizes="400px" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-umber/90 via-umber/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-ivory-50">
            <p className="eyebrow !text-terracotta-400">Reservations</p>
            <p className="mt-4 font-serif text-3xl leading-tight">Experience the peace and tranquillity of timelessness.</p>
          </div>
        </div>

        <div className="relative overflow-y-auto p-6 sm:max-h-[92vh] sm:p-10 md:max-h-none">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center text-umber transition-colors hover:text-terracotta"
            aria-label="Close booking enquiry"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {status.state === 'sent' ? (
            <SentMessage method={status.method} onReset={reset} />
          ) : (
            <>
              <p className="eyebrow">Book your stay</p>
              <h2 id="booking-title" className="mt-4 pr-10 text-4xl">Reservation enquiry</h2>
              <p className="mt-3 text-sm text-umber-700">
                Tell us your dates and we will confirm availability and rates with you personally.
              </p>

              <form ref={formRef} onSubmit={onSubmit} noValidate className="relative mt-8 grid gap-5 sm:grid-cols-2">
                <Honeypot />
                <Field label="Full name" {...err('name')} className="sm:col-span-2">
                  <input className="field" type="text" autoComplete="name" required {...field('name')} />
                </Field>
                <Field label="Email address" {...err('email')}>
                  <input className="field" type="email" autoComplete="email" required {...field('email')} />
                </Field>
                <Field label="Phone number" optional {...err('phone')}>
                  <input className="field" type="tel" autoComplete="tel" placeholder="+977…" {...field('phone')} />
                </Field>
                <Field label="Arrival" {...err('arrival')}>
                  <input className="field" type="date" min={todayISO()} required {...field('arrival')} />
                </Field>
                <Field label="Departure" {...err('departure')}>
                  <input className="field" type="date" min={minDeparture} required {...field('departure')} />
                </Field>
                <Field label="Guests" {...err('guests')}>
                  <input className="field" type="number" inputMode="numeric" min="1" max="20" required {...field('guests')} />
                </Field>
                <Field label="Room preference" htmlFor="booking-room">
                  <select className="field appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat" style={{ backgroundImage: CHEVRON }} {...field('room')}>
                    <option value="">No preference</option>
                    {rooms.map((r) => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Special requests" optional {...err('message')} className="sm:col-span-2">
                  <textarea className="field min-h-[96px] resize-y" rows={3} {...field('message')} />
                </Field>

                {status.state === 'error' && <div className="sm:col-span-2"><ErrorNotice /></div>}

                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status.state === 'sending'}>
                    {status.state === 'sending' ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    )}
                    {status.state === 'sending' ? 'Sending…' : 'Send enquiry'}
                  </button>
                  <DirectContact />
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}

function nextDay(iso) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%232A1C13' stroke-width='1.5'/%3E%3C/svg%3E\")";
