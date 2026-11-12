import { Link } from 'react-router-dom'
import { whatsappLink } from '../content/site'
import { ctaPhoto } from '../content/photos'
import { ArrowIcon, WhatsAppIcon } from './Icons'
import { Photo } from './Media'
import Reveal from './Reveal'

/** Cinematic header band used on inner pages. */
export function PageHero({ eyebrow, title, text, photo }: { eyebrow: string; title: string; text?: string; photo: string }) {
  return (
    <section className="relative h-[72vh] min-h-[480px] flex items-end overflow-hidden">
      <Photo key={photo} id={photo} priority sizes="100vw" zoom={false} parallax={0.25} className="!absolute inset-0" imgClassName="kenburns" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/40" />
      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-8 pb-14 sm:pb-20">
        <p className="eyebrow mb-5 rise">{eyebrow}</p>
        <div className="overflow-hidden pb-2">
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl leading-[0.92] line-up" style={{ animationDelay: '150ms' }}>
            {title}
          </h1>
        </div>
        {text && (
          <p className="mt-7 max-w-xl text-ivory/80 leading-relaxed text-[1.05rem] rise" style={{ animationDelay: '450ms' }}>
            {text}
          </p>
        )}
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <Photo id={ctaPhoto} sizes="100vw" zoom={false} parallax={0.2} className="!absolute inset-0" />
      <div className="absolute inset-0 bg-ink/75" />
      <Reveal className="relative mx-auto max-w-4xl px-4 sm:px-8 py-32 sm:py-44 text-center">
        <p className="eyebrow mb-6">Now booking 2026 – 2027</p>
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl leading-[1]">
          Let's tell <em className="text-gold-2">your</em> story
        </h2>
        <p className="mt-8 text-ivory/75 max-w-xl mx-auto leading-relaxed">
          Dates fill up fast during wedding season. Share your date and city — we usually reply within a few hours.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-gold text-ink px-9 py-4 text-[0.7rem] uppercase tracking-[0.28em] hover:bg-gold-2 transition"
          >
            <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 border border-ivory/40 px-9 py-4 text-[0.7rem] uppercase tracking-[0.28em] hover:border-gold hover:text-gold transition"
          >
            Send an enquiry <ArrowIcon />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
