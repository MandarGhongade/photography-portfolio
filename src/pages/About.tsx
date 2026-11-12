import { process, services, site } from '../content/site'
import { gearPhoto, portraitPhoto, pools, teamPhotos } from '../content/photos'
import { CtaBand, PageHero } from '../components/Blocks'
import { Photo } from '../components/Media'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { usePageTitle } from '../lib/usePageTitle'

const gear = ['Sony α1 & α7S III', 'Prime lenses 24 · 35 · 50 · 85 mm', 'DJI Inspire & Mavic drones', 'Cinema gimbals & lighting']
const team = [
  { name: 'Team Member 1', role: 'Lead Photographer' },
  { name: 'Team Member 2', role: 'Cinematographer' },
  { name: 'Team Member 3', role: 'Editor & Colourist' },
]

export default function About() {
  usePageTitle('About')
  return (
    <>
      <PageHero eyebrow="About" title="Behind the lens" photo={gearPhoto} />

      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-28 grid lg:grid-cols-12 gap-16 items-start">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
          <Photo id={portraitPhoto} alt={site.owner} className="aspect-[3/4] reveal-img" zoom={false} parallax={0.06} />
          <p className="mt-5 font-display italic text-2xl text-ivory/80">{site.owner}</p>
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-muted mt-1">Founder & Lead Photographer</p>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="eyebrow mb-6">Hello, I'm {site.owner}</p>
            <h2 className="font-display text-5xl sm:text-6xl leading-[1.04]">
              Ten years. Hundreds of stories. <em className="text-gold-2">Still in love with light.</em>
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-12 space-y-6 text-muted leading-[1.85] text-[1.07rem]">
            <p>
              <span className="float-left font-display text-7xl leading-[0.8] mr-3 mt-1 text-gold-2">I</span>t started with a
              borrowed camera at a cousin's wedding. Today, {site.name} is a small, passionate team of photographers and
              filmmakers based in {site.city}, travelling wherever the story takes us.
            </p>
            <p>
              We believe the best photographs happen when nobody is posing. So we keep it relaxed, we keep it real, and we
              pay attention to the little things — a father's glance, a nervous laugh, the light falling just right.
            </p>
            <p>
              Whether it's a five-day wedding, a fashion editorial or a corporate summit, you get the same thing: calm
              professionals, beautiful work and timely delivery.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-16 grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {services.map((s, k) => (
              <div key={s.title} className="border-t border-ivory/10 pt-6">
                <p className="font-display italic text-gold">0{k + 1}</p>
                <h3 className="font-display text-2xl mt-1">{s.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-16">
            <p className="eyebrow mb-6">In the bag</p>
            <ul className="flex flex-wrap gap-3">
              {gear.map((g) => (
                <li key={g} className="border border-ivory/15 rounded-full px-5 py-2.5 text-sm text-ivory/80 hover:border-gold/60 transition">{g}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={250} className="mt-16 grid grid-cols-2 gap-4">
            <Photo id={pools.weddings[8]} className="aspect-[3/4]" />
            <Photo id={pools.fashion[3]} className="aspect-[3/4] mt-12" />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ivory/10 bg-ink-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-20 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="text-center">
              <p className="font-display text-6xl sm:text-7xl text-gold-2 font-light">{s.value}</p>
              <p className="mt-4 text-[0.65rem] uppercase tracking-[0.3em] text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-28">
        <SectionHeading eyebrow="The team" title="The people behind every frame" />
        <div className="grid sm:grid-cols-3 gap-8">
          {team.map((m, i) => (
            <Reveal key={m.role} delay={i * 120} className={`group ${i === 1 ? 'sm:mt-16' : ''}`}>
              <Photo id={teamPhotos[i]} alt={m.name} className="aspect-[4/5]" imgClassName="grayscale group-hover:grayscale-0" />
              <h3 className="font-display text-3xl mt-6">{m.name}</h3>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-muted mt-2">{m.role}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-8 pb-28">
        <SectionHeading eyebrow="How it works" title="Simple, from start to finish" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/10 border border-ivory/10">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 100} className="group bg-ink p-9 h-full hover:bg-ink-2 transition duration-500">
              <p className="font-display text-7xl text-outline italic group-hover:text-gold/40 transition duration-500">{p.step}</p>
              <h3 className="font-display text-3xl mt-8">{p.title}</h3>
              <p className="text-sm text-muted mt-3 leading-relaxed">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
