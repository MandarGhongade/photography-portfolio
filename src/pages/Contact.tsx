import { useState, type FormEvent } from 'react'
import { categories, site, whatsappLink } from '../content/site'
import { PageHero } from '../components/Blocks'
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '../components/Icons'
import Reveal from '../components/Reveal'
import { usePageTitle } from '../lib/usePageTitle'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition'

export default function Contact() {
  usePageTitle('Contact')
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    if (data.botcheck) return // honeypot

    // No email service configured yet → send the enquiry straight to WhatsApp.
    if (!WEB3FORMS_KEY) {
      const msg = [
        `Hi! New enquiry from the website:`,
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        data.email && `Email: ${data.email}`,
        `Event: ${data.event}`,
        data.date && `Date: ${data.date}`,
        data.location && `Location: ${data.location}`,
        data.message && `Message: ${data.message}`,
      ]
        .filter(Boolean)
        .join('\n')
      window.open(whatsappLink(msg), '_blank')
      setStatus('sent')
      form.reset()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `New enquiry — ${data.event}`, from_name: site.name, ...data }),
      })
      const json = await res.json()
      setStatus(json.success ? 'sent' : 'error')
      if (json.success) form.reset()
    } catch {
      setStatus('error')
    }
  }

  const contacts = [
    { icon: <WhatsAppIcon />, label: 'WhatsApp', value: site.phone, href: whatsappLink(), ext: true },
    { icon: <PhoneIcon />, label: 'Call', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
    { icon: <MailIcon />, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: <InstagramIcon />, label: 'Instagram', value: site.instagramHandle, href: site.instagram, ext: true },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        text="Tell us about your day, your idea or your event. We reply to every enquiry — usually within a few hours."
        photo="1532712938310-34cb3982ef74"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-24 grid lg:grid-cols-5 gap-16">
        {/* Direct contacts */}
        <div className="lg:col-span-2 space-y-4">
          {contacts.map((c, i) => (
            <Reveal key={c.label} delay={i * 80}>
              <a
                href={c.href}
                target={c.ext ? '_blank' : undefined}
                rel={c.ext ? 'noreferrer' : undefined}
                className="group flex items-center gap-5 border border-ivory/10 p-5 hover:border-gold/60 hover:bg-ink-2 transition"
              >
                <span className="grid place-items-center w-12 h-12 rounded-full bg-ink-3 text-gold group-hover:bg-gold group-hover:text-ink transition">
                  {c.icon}
                </span>
                <span>
                  <span className="block eyebrow !text-[0.62rem]">{c.label}</span>
                  <span className="block mt-1 text-ivory">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
          <Reveal delay={350} className="border border-ivory/10 p-5 flex gap-5">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-ink-3 text-gold shrink-0">
              <PinIcon />
            </span>
            <span>
              <span className="block eyebrow !text-[0.62rem]">Studio</span>
              <span className="block mt-1 text-ivory">{site.address}</span>
              <span className="block mt-1 text-sm text-muted">{site.hours}</span>
            </span>
          </Reveal>
        </div>

        {/* Enquiry form */}
        <Reveal delay={150} className="lg:col-span-3 bg-ink-2 p-6 sm:p-12">
          <p className="eyebrow mb-3">Enquiry form</p>
          <h2 className="font-display text-4xl sm:text-5xl">Check availability</h2>

          {status === 'sent' ? (
            <div className="fade-in py-16 text-center">
              <p className="font-display text-4xl text-gold-2 italic">Thank you!</p>
              <p className="mt-4 text-muted">We've received your enquiry and will get back to you shortly.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-xs uppercase tracking-[0.25em] text-gold border-b border-gold/40 pb-1">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-8">
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <label className="block">
                <span className="eyebrow !text-[0.6rem] !text-muted">Your name *</span>
                <input name="name" required className={field} placeholder="Full name" />
              </label>
              <label className="block">
                <span className="eyebrow !text-[0.6rem] !text-muted">Phone / WhatsApp *</span>
                <input name="phone" required type="tel" pattern="[0-9+\s-]{8,}" className={field} placeholder="+91" />
              </label>
              <label className="block">
                <span className="eyebrow !text-[0.6rem] !text-muted">Email</span>
                <input name="email" type="email" className={field} placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="eyebrow !text-[0.6rem] !text-muted">Type of shoot *</span>
                <select name="event" required defaultValue="" className={`${field} [&>option]:bg-ink`}>
                  <option value="" disabled>Select…</option>
                  {categories.map((c) => (
                    <option key={c.slug}>{c.name}</option>
                  ))}
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="eyebrow !text-[0.6rem] !text-muted">Event date</span>
                <input name="date" type="date" className={field} />
              </label>
              <label className="block">
                <span className="eyebrow !text-[0.6rem] !text-muted">City / Venue</span>
                <input name="location" className={field} placeholder="e.g. Udaipur" />
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow !text-[0.6rem] !text-muted">Tell us more</span>
                <textarea name="message" rows={4} className={`${field} resize-none`} placeholder="Number of days, guest count, ideas…" />
              </label>
              <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-5">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-3 bg-gold text-ink px-10 py-4 text-xs uppercase tracking-[0.25em] hover:bg-gold-2 transition disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                </button>
                {status === 'error' && <p className="text-sm text-red-300">Something went wrong — please reach us on WhatsApp.</p>}
              </div>
            </form>
          )}
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8 pb-24">
        <Reveal className="overflow-hidden border border-ivory/10">
          <iframe
            title="Studio location"
            src={site.mapEmbed}
            className="w-full h-[380px] grayscale invert-[0.9] contrast-[0.9]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>
    </>
  )
}
