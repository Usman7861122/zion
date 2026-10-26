import { useState, type FormEvent } from 'react';

type Props = { endpoint: string; locations: string[] };
type State = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'mt-2 block min-h-12 w-full rounded-lg border border-forest-900/25 bg-cream-50 px-4 py-3 text-forest-900 transition-colors placeholder:text-ink-muted/60 focus:border-forest-900';

export default function ContactForm({ endpoint, locations }: Props) {
  const [state, setState] = useState<State>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? '')) next.email = 'Please enter a valid email, like name@example.com.';
    if (!data.message?.trim()) next.message = 'Please tell us how we can help.';
    setErrors(next);
    if (Object.keys(next).length) return;

    if (!endpoint) {
      setState('error');
      return;
    }
    setState('sending');
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('bad status');
      setState('sent');
      form.reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" className="border border-gold-500 bg-cream-50 p-10 text-center">
        <p className="text-3xl font-light">Thank you.</p>
        <p className="mt-3 text-ink-muted">We received your message and will contact you very soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor="cf-name" className="text-sm font-semibold">Name</label>
        <input id="cf-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
        {errors.name && <p id="cf-name-err" className="mt-2 text-sm text-[#9b2c2c]">{errors.name}</p>}
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="cf-phone" className="text-sm font-semibold">Phone number</label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="cf-email" className="text-sm font-semibold">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
        {errors.email && <p id="cf-email-err" className="mt-2 text-sm text-[#9b2c2c]">{errors.email}</p>}
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="cf-loc" className="text-sm font-semibold">Preferred location</label>
        <select id="cf-loc" name="location" className={field} defaultValue="">
          <option value="">Any location or telehealth</option>
          {locations.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-msg" className="text-sm font-semibold">Message</label>
        <textarea id="cf-msg" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-msg-err' : undefined} />
        {errors.message && <p id="cf-msg-err" className="mt-2 text-sm text-[#9b2c2c]">{errors.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === 'sending'} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {state === 'error' && (
          <p role="alert" className="mt-4 text-sm text-[#9b2c2c]">
            We could not send your message just now. Please call us at (212) 353-8693 and we will help right away.
          </p>
        )}
      </div>
    </form>
  );
}
