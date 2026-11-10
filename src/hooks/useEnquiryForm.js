import { useRef, useState } from 'react';
import { sendEnquiry } from '../lib/enquiry';
import { validateEnquiry } from '../lib/validate';

/**
 * Shared state machine for the booking and contact forms:
 * controlled values, validation on submit (then live), focus on the
 * first invalid field, honeypot spam check and submission status.
 */
export default function useEnquiryForm(kind, initial) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({ state: 'idle' }); // idle | sending | sent | error
  const formRef = useRef(null);
  const booking = kind === 'booking';

  const onChange = (event) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (submitted) setErrors(validateEnquiry(next, { booking }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const found = validateEnquiry(values, { booking });
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Honeypot: real visitors never fill this hidden field.
    if (formRef.current?.querySelector('[name="company_website"]')?.value) {
      setStatus({ state: 'sent', method: 'endpoint' });
      return;
    }
    setStatus({ state: 'sending' });
    try {
      const clean = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, String(v).trim()]));
      const { method } = await sendEnquiry(kind, clean);
      setStatus({ state: 'sent', method });
    } catch {
      setStatus({ state: 'error' });
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setSubmitted(false);
    setStatus({ state: 'idle' });
  };

  /** Props for an input bound to `name`, including ARIA wiring. */
  const field = (name) => ({
    id: `${kind}-${name}`,
    name,
    value: values[name] ?? '',
    onChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${kind}-${name}-error` : undefined,
  });

  return { values, setValues, errors, status, formRef, onSubmit, field, reset };
}
