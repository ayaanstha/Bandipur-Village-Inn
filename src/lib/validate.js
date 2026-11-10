const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s()-]{6,20}$/;

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().slice(0, 10);
}

export function validateEnquiry(values, { booking = false } = {}) {
  const e = {};
  const name = values.name?.trim() ?? '';
  if (name.length < 2) e.name = 'Please enter your full name.';

  if (!values.email?.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email.trim())) e.email = 'Please enter a valid email address, e.g. name@example.com.';

  if (values.phone?.trim() && !PHONE_RE.test(values.phone.trim()))
    e.phone = 'Please enter a valid phone number, including country code.';

  if (booking) {
    const today = todayISO();
    if (!values.arrival) e.arrival = 'Please choose your arrival date.';
    else if (values.arrival < today) e.arrival = 'Arrival date cannot be in the past.';

    if (!values.departure) e.departure = 'Please choose your departure date.';
    else if (values.arrival && values.departure <= values.arrival)
      e.departure = 'Departure must be after your arrival date.';

    const guests = Number(values.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > 20) e.guests = 'Please enter the number of guests (1–20).';
  } else {
    const msg = values.message?.trim() ?? '';
    if (msg.length < 10) e.message = 'Please write a short message (at least 10 characters).';
  }

  if (values.message && values.message.length > 2000) e.message = 'Please keep your message under 2,000 characters.';
  return e;
}
