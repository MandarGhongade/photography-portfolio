import { useState } from 'react'
import { categories, films } from '../content/site'
import { CtaBand, PageHero } from '../components/Blocks'
import Lightbox, { type LightboxItem } from '../components/Lightbox'
import { VideoThumb } from '../components/Media'
import Reveal from '../components/Reveal'
import { usePageTitle } from '../lib/usePageTitle'

export default function Films() {
  usePageTitle('Films')
  const [open, setOpen] = useState<number | null>(null)
  const items: LightboxItem[] = films.map((f, i) => ({ kind: 'video', id: f.poster, label: `Video ${i + 1} · ${f.title}` }))
  const [first, ...rest] = films

  return (
    <>
      <PageHero
        eyebrow="Cinematography"
        title="Films"
        text="Wedding films, pre-wedding stories, fashion BTS and event recaps — shot in 4K and edited like cinema."
        photo={first.poster}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-24">
        <Reveal>
          <button onClick={() => setOpen(0)} className="group block w-full text-left">
            <VideoThumb poster={first.poster} label="Video 1 · Featured film" duration={first.duration} large className="aspect-video lg:aspect-[21/9]" />
            <div className="mt-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 className="font-display text-4xl sm:text-5xl group-hover:text-gold-2 transition">{first.title}</h2>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-muted">{first.subtitle}</p>
            </div>
          </button>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-16 mt-24">
          {rest.map((f, k) => {
            const i = k + 1
            return (
              <Reveal key={f.title} delay={(k % 2) * 120} className={k % 2 ? 'sm:mt-20' : ''}>
                <button onClick={() => setOpen(i)} className="group block w-full text-left">
                  <VideoThumb poster={f.poster} label={`Video ${i + 1}`} duration={f.duration} className="aspect-video" />
                  <div className="mt-6 flex items-baseline gap-4">
                    <span className="font-display italic text-gold text-lg">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-display text-3xl group-hover:text-gold-2 transition">{f.title}</h3>
                      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted mt-2">
                        {categories.find((c) => c.slug === f.category)?.name} · {f.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaBand />
      <Lightbox items={items} index={open} onChange={setOpen} />
    </>
  )
}
