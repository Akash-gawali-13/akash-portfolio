import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { sound } from '../lib/sound';
import { EASE, Magnetic, SectionHeading } from './fx';

/**
 * CONTACT — the end of the series: how to start a project.
 * Messages go through Formspree when `profile.formspreeId` is set; otherwise the
 * form opens the visitor's email app with everything filled in.
 */
type Fields = { name: string; email: string; message: string };
const EMPTY: Fields = { name: '', email: '', message: '' };
const SUBJECT = 'Portfolio enquiry';

/** WhatsApp chat link with a ready-made first message ('' when no number is set). */
export function whatsappLink() {
  return profile.whatsapp
    ? `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Akash, I found your portfolio and I'd like to discuss a project.")}`
    : '';
}

export default function Contact() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'failed'>('idle');

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (f.name.trim().length < 2) errs.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errs.email = 'Enter a valid email address, like name@company.com.';
    if (f.message.trim().length < 10) errs.message = 'Add a few words about what you need.';
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }

    const payload = { name: f.name.trim(), email: f.email.trim(), message: f.message.trim() };

    if (!profile.formspreeId) {
      const body = Object.entries(payload)
        .map(([k, v]) => (k === 'message' ? `\n${v}` : `${k[0].toUpperCase()}${k.slice(1)}: ${v}`))
        .join('\n');
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`${SUBJECT} — ${payload.name}`)}&body=${encodeURIComponent(body)}`;
      setState('mailto');
      return;
    }

    setState('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `${SUBJECT} — ${payload.name}`, _replyto: payload.email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      setF(EMPTY);
      sound.lock();
    } catch {
      setState('failed');
    }
  }

  const wa = whatsappLink();

  return (
    <>
      <SectionHeading
        kicker="Let's work together"
        title="Contact"
        aside={<p className="max-w-xs text-sm text-mist">Tell me what you're trying to build. I reply within 24 hours, Monday to Saturday (IST).</p>}
      />

      <div className="gutter grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* left — direct ways to reach me */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h3 className="font-display text-[clamp(2.4rem,4.4vw,3.6rem)] leading-[0.92] tracking-wide text-bone">
            Have a project in mind?
            <br />
            <span className="text-crimson-2">Let&apos;s build it.</span>
          </h3>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bone/75">
            AI tools, dashboards, business websites or a training session for your team — share a few details and I&apos;ll come back with
            next steps, a timeline and a clear quote.
          </p>

          {wa && (
            <Magnetic className="mt-7 inline-block">
              <a
                href={wa}
                target="_blank"
                rel="noopener"
                className="flex min-h-12 items-center gap-3 rounded-full bg-[#25D366] px-6 text-sm font-bold text-[#062b14] shadow-[0_0_40px_rgba(37,211,102,0.35)] transition hover:brightness-110"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
            </Magnetic>
          )}

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            <Row k="Email">
              <a href={`mailto:${profile.email}`} className="font-semibold text-bone hover:text-crimson-2">
                {profile.email}
              </a>
            </Row>
            <Row k="LinkedIn">
              <a href={profile.links.linkedin} target="_blank" rel="noopener" className="font-semibold text-bone hover:text-crimson-2">
                {profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗
              </a>
            </Row>
            <Row k="GitHub">
              <a href={profile.links.github} target="_blank" rel="noopener" className="font-semibold text-bone hover:text-crimson-2">
                {profile.githubHandle} ↗
              </a>
            </Row>
            <Row k="Based in">
              <span className="font-semibold text-bone">{profile.location} · works worldwide</span>
            </Row>
          </ul>

          <p className="mt-6 flex items-center gap-2.5 text-sm text-mist">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#46e3a8] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#46e3a8]" />
            </span>
            Currently taking on a limited number of freelance projects
          </p>
        </motion.div>

        {/* right — enquiry form */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2/80 p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur sm:p-9"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-crimson/20 blur-3xl" />
          <AnimatePresence mode="wait">
            {state === 'sent' ? (
              <motion.div
                key="sent"
                role="status"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="relative flex min-h-[460px] flex-col items-start justify-center gap-4"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-crimson text-white shadow-[0_0_40px_rgba(229,19,43,0.5)]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="font-display text-4xl tracking-wide text-bone">Message sent</h3>
                <p className="max-w-sm text-bone/75">Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
                <button type="button" onClick={() => setState('idle')} className="mt-2 rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-bone hover:border-white">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="c-name" label="Your name" error={errors.name}>
                    <input id="c-name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} className={inputCls(errors.name)} />
                  </Field>
                  <Field id="c-email" label="Email" error={errors.email}>
                    <input id="c-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!errors.email} className={inputCls(errors.email)} />
                  </Field>
                </div>

                <Field id="c-message" label="Message" error={errors.message}>
                  <textarea
                    id="c-message"
                    rows={5}
                    value={f.message}
                    onChange={set('message')}
                    placeholder="What are you building, and what does done look like?"
                    aria-invalid={!!errors.message}
                    className={`${inputCls(errors.message)} min-h-[130px] resize-y`}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    data-cursor="play"
                    className="flex min-h-12 items-center gap-2 rounded-full bg-crimson px-7 text-sm font-bold tracking-[0.1em] text-white shadow-[0_0_40px_rgba(229,19,43,0.4)] transition hover:bg-crimson-2 disabled:opacity-60"
                  >
                    {state === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
                  </button>
                  <p role="status" aria-live="polite" className="text-sm text-bone/80">
                    {state === 'mailto' && 'Your email app should open with the message ready to send.'}
                    {state === 'failed' && `The message didn't go through. Email me directly at ${profile.email}.`}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

const inputCls = (err?: string) =>
  `w-full rounded-lg border bg-white/[0.04] px-3.5 py-3 text-[15px] text-bone placeholder:text-smoke transition focus:outline-none focus:bg-white/[0.07] [&>option]:bg-ink [&>option]:text-bone ${
    err ? 'border-[#ff8a7a]' : 'border-white/15 focus:border-crimson-2'
  }`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13.5px] font-medium text-bone/85">
        {label}
      </label>
      {children}
      {error && <span className="text-[13px] text-[#ffb3a8]">{error}</span>}
    </div>
  );
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 py-3.5 text-[14.5px]">
      <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-smoke">{k}</span>
      {children}
    </li>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3Z" />
    </svg>
  );
}
