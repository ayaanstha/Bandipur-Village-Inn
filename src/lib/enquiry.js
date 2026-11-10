import { contact } from '../data/site';

const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT?.trim();

const LABELS = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  arrival: 'Arrival',
  departure: 'Departure',
  guests: 'Guests',
  room: 'Room preference',
  message: 'Message',
};

function formatBody(data) {
  return Object.entries(LABELS)
    .filter(([key]) => data[key])
    .map(([key, label]) => `${label}: ${data[key]}`)
    .join('\n');
}

/**
 * Sends an enquiry.
 * - If VITE_ENQUIRY_ENDPOINT is configured, POSTs JSON to it (Formspree, Basin, own API…).
 * - Otherwise opens the visitor's email app with the enquiry addressed to the hotel.
 * Resolves to { method: 'endpoint' | 'email' }.
 */
export async function sendEnquiry(kind, data) {
  const subject =
    kind === 'booking'
      ? `Booking enquiry: ${data.arrival} to ${data.departure} – ${data.name}`
      : `Website enquiry – ${data.name}`;

  if (ENDPOINT) {
    // Human-readable keys so the notification email in the inbox reads cleanly.
    const labelled = Object.fromEntries(
      Object.entries(LABELS)
        .filter(([key]) => data[key] && key !== 'email')
        .map(([key, label]) => [label, data[key]]),
    );
    const payload = {
      _subject: subject,
      _replyto: data.email, // lets staff reply straight to the guest
      email: data.email,
      'Enquiry type': kind === 'booking' ? 'Reservation enquiry' : 'General enquiry',
      ...labelled,
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
    } finally {
      clearTimeout(timer);
    }
    return { method: 'endpoint' };
  }

  const body = `${formatBody(data)}\n\n— Sent from bandipurvillageinn.com`;
  const href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  return { method: 'email' };
}
