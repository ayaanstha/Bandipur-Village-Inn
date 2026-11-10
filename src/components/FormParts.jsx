import { CheckCircle2, AlertCircle, Mail, Phone } from 'lucide-react';
import { contact } from '../data/site';

export function Field({ label, htmlFor, error, errorId, optional, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {optional && <span className="ml-1 font-normal normal-case tracking-normal text-umber/50">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen field that bots fill in and people never see. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SentMessage({ method, onReset, tone = 'light' }) {
  const muted = tone === 'light' ? 'text-umber-700' : 'text-ivory/75';
  return (
    <div role="status" className="py-6 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-forest" strokeWidth={1.25} aria-hidden="true" />
      <h3 className="mt-4 text-3xl">{method === 'email' ? 'Almost there' : 'Thank you'}</h3>
      <p className={`mx-auto mt-3 max-w-sm ${muted}`}>
        {method === 'email' ? (
          <>
            Your email app should now be open with your enquiry ready to send. If it didn’t open, write to us at{' '}
            <a className="link-underline text-terracotta" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </>
        ) : (
          'Your enquiry has reached us. Our team will reply to you by email as soon as possible.'
        )}
      </p>
      <button type="button" onClick={onReset} className="btn btn-dark mt-8">
        Send another enquiry
      </button>
    </div>
  );
}

export function ErrorNotice() {
  return (
    <div role="alert" className="flex gap-3 border border-brick/40 bg-brick/5 p-4 text-sm text-brick">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>
        Sorry, we couldn’t send your enquiry just now. Please try again, or reach us directly at{' '}
        <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a> or{' '}
        <a className="underline" href={contact.phoneHref}>{contact.phoneDisplay}</a>.
      </p>
    </div>
  );
}

export function DirectContact({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-2 text-sm text-umber-700 ${className}`}>
      <a href={contact.phoneHref} className="link-underline">
        <Phone className="h-4 w-4 text-terracotta" aria-hidden="true" /> {contact.phoneDisplay}
      </a>
      <a href={`mailto:${contact.email}`} className="link-underline">
        <Mail className="h-4 w-4 text-terracotta" aria-hidden="true" /> {contact.email}
      </a>
    </div>
  );
}
