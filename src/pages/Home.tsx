import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { albums, categories, films, process, services, site, testimonials, type CategorySlug } from '../content/site'
import { categoryCovers, heroSlides, instagramPhotos, portraitPhoto, quotePhoto, pools } from '../content/photos'
import { CtaBand } from '../components/Blocks'
import { ArrowIcon, InstagramIcon, PlayIcon, WhatsAppIcon } from '../components/Icons'
import { Photo, VideoThumb } from '../components/Media'
import { introDelay } from '../components/Preloader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { usePageTitle } from '../lib/usePageTitle'

const SLIDE_MS = 6500

function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % heroSlides.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [])
  const d = (ms: number) => ({ animationDelay: `${introDelay + ms}ms` })

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      {heroSlides.map((s, k) => (
        <div key={s.id} className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${k === i ? 'opacity-100' : 'opacity-0'}`}>
          <Photo id={s.id} priority={k === 0} sizes="100vw" zoom={false} className="!absolute inset-0" imgClassName="drift" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/25 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />

      {/* Vertical socials */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 text-ivory/60 rise" style={d(900)}>
        <span className="w-px h-16 bg-ivory/30" />
        <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold transition"><InstagramIcon className="w-4 h-4" /></a>
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-gold transition"><WhatsAppIcon className="w-4 h-4" /></a>
        <span className="w-px h-16 bg-ivory/30" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[0.6rem] uppercase tracking-[0.4em]">Est. 2016</span>
      </div>

      <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-8 lg:pl-24 flex flex-col justify-center">
        <p className="eyebrow rise" style={d(0)}>Wedding · Pre-Wedding · Fashion · Corporate</p>
        <h1 className="font-display mt-7 text-[3.6rem] leading-[0.92] sm:text-8xl md:text-[8.5rem] lg:text-[10rem] tracking-[-0.01em]">
          <span className="block overflow-hidden pb-2"><span className="block line-up" style={d(100)}>Stories</span></span>
          <span className="block overflow-hidden pb-3"><span className="block line-up italic text-gold-2 sm:pl-[12%]" style={d(250)}>told in light</span></span>
        </h1>
        <p className="mt-8 max-w-md text-ivory/80 leading-relaxed text-[1.05rem] rise" style={d(500)}>
          Candid photographs and cinematic films for the moments you'll want to live again — and again.
        </p>
        <div className="mt-11 flex flex-col sm:flex-row gap-4 rise" style={d(650)}>
          <Link to="/portfolio" className="group inline-flex items-center justify-center gap-3 bg-ivory text-ink px-9 py-4 text-[0.7rem] uppercase tracking-[0.28em] hover:bg-gold transition">
            View portfolio <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link to="/films" className="inline-flex items-center justify-center gap-3 border border-ivory/40 backdrop-blur-sm px-9 py-4 text-[0.7rem] uppercase tracking-[0.28em] hover:border-gold hover:text-gold transition">
            <PlayIcon className="w-3.5 h-3.5" /> Watch the showreel
          </Link>
        </div>
      </div>

      {/* Slide indicator */}
      <div className="absolute bottom-8 inset-x-0 mx-auto max-w-7xl px-4 sm:px-8 lg:pl-24 flex items-end justify-between gap-6 rise" style={d(800)}>
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl italic">{String(i + 1).padStart(2, '0')}</span>
          <div className="flex gap-2">
            {heroSlides.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className="relative h-px w-10 sm:w-14 bg-ivory/25 overflow-hidden py-0">
                {k === i && <span key={i} className="progress absolute inset-0 bg-gold" style={{ animationDuration: `${SLIDE_MS}ms` }} />}
              </button>
            ))}
          </div>
          <span className="font-display text-lg italic text-ivory/40">{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
        <p key={i} className="hidden sm:block fade-in text-[0.65rem] uppercase tracking-[0.35em] text-ivory/70">{heroSlides[i].caption}</p>
        <div className="hidden md:flex flex-col items-center gap-3 text-[0.55rem] uppercase tracking-[0.45em] text-ivory/50">
          Scroll
          <span className="block w-px h-12 bg-gold scroll-line" />
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['Weddings', 'Pre-Wedding', 'Fashion', 'Corporate Events', 'Cinematic Films', 'Drone', 'Heirloom Albums']
  const row = [...words, ...words]
  return (
    <div className="border-y border-ivory/10 py-7 overflow-hidden bg-ink">
      <div className="marquee flex w-max gap-14 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className={`font-display text-4xl sm:text-5xl flex items-center gap-14 ${i % 2 ? 'italic text-ivory/70' : 'text-outline'}`}>
            {w} <span className="text-gold text-lg not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8 py-28 sm:py-40 grid lg:grid-cols-12 gap-16 lg:gap-10 items-center">
      <div className="relative lg:col-span-6 pb-16">
        <Reveal>
          <Photo id={portraitPhoto} alt={`${site.owner} at work`} className="aspect-[4/5] w-[82%] reveal-img" parallax={0.08} zoom={false} />
        </Reveal>
        <Reveal delay={250} className="absolute bottom-0 right-0 w-[48%]">
          <Photo id={pools.weddings[3]} alt="Bride portrait" className="aspect-[3/4] border-[10px] border-ink reveal-img" zoom={false} />
        </Reveal>
        <div className="absolute -top-8 -left-4 sm:-left-8 font-display italic text-[7rem] sm:text-[9rem] leading-none text-gold/10 select-none pointer-events-none">10</div>
      </div>
      <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
        <p className="eyebrow mb-6">Hello, I'm {site.owner}</p>
        <h2 className="font-display text-5xl sm:text-6xl leading-[1.02]">
          I don't just take pictures. <em className="text-gold-2">I keep feelings.</em>
        </h2>
        <p className="mt-8 text-muted leading-relaxed text-[1.05rem]">
          For over a decade I've been documenting love stories, fashion and brands across India. My approach is simple —
          be invisible, be ready, and let real moments unfold. The result is a collection of images that feel exactly
          like the day felt.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ivory/10 pt-10">
          {services.map((s, k) => (
            <div key={s.title}>
              <p className="font-display italic text-gold text-lg">0{k + 1}</p>
              <h3 className="font-display text-2xl mt-1">{s.title}</h3>
              <p className="text-sm text-muted mt-2 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <Link to="/about" className="mt-12 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold link-line pb-1">
          More about me <ArrowIcon />
        </Link>
      </Reveal>
    </section>
  )
}

/** Desktop: large editorial list with an image that follows the cursor. Mobile: image tiles. */
function Categories() {
  const [active, setActive] = useState<number | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const follower = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 })

  useEffect(() => {
    let frame = 0
    const loop = () => {
      const p = pos.current
      p.cx += (p.x - p.cx) * 0.12
      p.cy += (p.y - p.cy) * 0.12
      if (follower.current) follower.current.style.transform = `translate3d(${p.cx}px, ${p.cy}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section className="py-28 sm:py-36 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionHeading eyebrow="What I shoot" title="Four ways to tell a story" />

        {/* Desktop list */}
        <div
          ref={box}
          className="relative hidden lg:block border-t border-ivory/10"
          onMouseMove={(e) => {
            const r = box.current!.getBoundingClientRect()
            pos.current.x = e.clientX - r.left
            pos.current.y = e.clientY - r.top
          }}
          onMouseLeave={() => setActive(null)}
        >
          <div ref={follower} className="pointer-events-none absolute left-0 top-0 z-10 w-[300px] h-[400px]">
            {categories.map((c, k) => (
              <div key={c.slug} className={`absolute inset-0 transition-all duration-700 ease-out ${active === k ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <Photo id={categoryCovers[c.slug]} className="h-full w-full shadow-2xl shadow-black/50" zoom={false} sizes="300px" />
              </div>
            ))}
          </div>
          {categories.map((c, k) => (
            <Link
              key={c.slug}
              to={`/portfolio/${c.slug}`}
              onMouseEnter={() => setActive(k)}
              className="group relative grid grid-cols-12 items-center gap-6 border-b border-ivory/10 py-9 transition-colors"
            >
              <span className="col-span-1 font-display italic text-gold text-xl">0{k + 1}</span>
              <span className={`col-span-7 font-display text-6xl xl:text-7xl leading-none whitespace-nowrap transition-all duration-700 ${active === null || active === k ? 'text-ivory' : 'text-ivory/20'} group-hover:italic group-hover:translate-x-4`}>
                {c.name}
              </span>
              <span className={`col-span-3 text-sm text-muted leading-relaxed transition-opacity duration-500 ${active === null || active === k ? 'opacity-100' : 'opacity-30'}`}>{c.blurb}</span>
              <span className="col-span-1 justify-self-end grid place-items-center w-12 h-12 rounded-full border border-ivory/20 group-hover:bg-gold group-hover:border-gold group-hover:text-ink transition duration-500">
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile / tablet tiles */}
        <div className="grid sm:grid-cols-2 gap-4 lg:hidden">
          {categories.map((c, k) => (
            <Reveal key={c.slug} delay={k * 100}>
              <Link to={`/portfolio/${c.slug}`} className="group relative block overflow-hidden">
                <Photo id={categoryCovers[c.slug]} alt={c.name} className="aspect-[4/5]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="font-display italic text-gold">0{k + 1}</p>
                  <h3 className="font-display text-4xl mt-1">{c.name}</h3>
                  <p className="text-sm text-ivory/70 mt-2">{c.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Mosaic of recent frames — each tile opens that category's highlights gallery. */
function Featured() {
  const tiles: { id: string; slug: CategorySlug; span: string }[] = [
    { id: pools.weddings[2], slug: 'weddings', span: 'col-span-2 row-span-2' },
    { id: pools.fashion[0], slug: 'fashion', span: 'row-span-2' },
    { id: pools['pre-wedding'][0], slug: 'pre-wedding', span: '' },
    { id: pools.corporate[0], slug: 'corporate', span: '' },
    { id: pools.weddings[20], slug: 'weddings', span: '' },
    { id: pools['pre-wedding'][14], slug: 'pre-wedding', span: 'col-span-2' },
    { id: pools.fashion[16], slug: 'fashion', span: '' },
  ]
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow="Selected frames" title="Recent work" />
          <Reveal className="mb-14">
            <Link to="/portfolio" className="inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-gold link-line pb-1">
              View portfolio <ArrowIcon />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[240px] gap-3 sm:gap-4">
          {tiles.map((t, i) => {
            const cat = categories.find((c) => c.slug === t.slug)!
            return (
              <Reveal key={t.id + i} delay={(i % 4) * 90} className={`${t.span} h-full`}>
                <Link to={`/portfolio/${t.slug}`} className="group relative block h-full overflow-hidden">
                  <Photo id={t.id} alt={cat.name} className="h-full" sizes="(min-width: 768px) 50vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-500">
                    {cat.highlights} <ArrowIcon className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden flex items-center">
      <Photo id={quotePhoto} sizes="100vw" zoom={false} parallax={0.3} className="!absolute inset-0" />
      <div className="absolute inset-0 bg-ink/60" />
      <Reveal className="relative mx-auto max-w-5xl px-4 sm:px-8 text-center">
        <span className="font-display text-9xl leading-[0.5] text-gold/60">“</span>
        <p className="font-display italic text-4xl sm:text-6xl leading-[1.15] mt-4">
          We take photographs as a return ticket to a moment otherwise gone.
        </p>
        <p className="eyebrow mt-10 !text-ivory/70">— Katie Thurmer</p>
      </Reveal>
    </section>
  )
}

function FilmsTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8 py-28 sm:py-36">
      <SectionHeading eyebrow="Motion" title="Films that feel like memories" text="Every frame graded, every beat timed to your story." />
      <Reveal>
        <Link to="/films" className="group block">
          <VideoThumb poster={films[0].poster} label="Video 1 · Featured film" duration={films[0].duration} large className="aspect-video lg:aspect-[21/9] w-full" />
          <div className="mt-6 flex items-baseline justify-between">
            <h3 className="font-display text-3xl sm:text-4xl group-hover:text-gold-2 transition">{films[0].title}</h3>
            <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">{films[0].subtitle}</span>
          </div>
        </Link>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-6 mt-12">
        {films.slice(1, 3).map((f, i) => (
          <Reveal key={f.title} delay={i * 120}>
            <Link to="/films" className="group block">
              <VideoThumb poster={f.poster} label={`Video ${i + 2}`} duration={f.duration} className="aspect-video" />
              <h3 className="font-display text-2xl mt-5 group-hover:text-gold-2 transition">{f.title}</h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-ivory/10 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className={`text-center py-16 ${i % 2 ? '' : 'border-r'} ${i < 2 ? 'border-b lg:border-b-0' : ''} lg:border-r border-ivory/10 last:border-r-0`}>
            <p className="font-display text-6xl sm:text-7xl text-gold-2 font-light">{s.value}</p>
            <p className="mt-4 text-[0.65rem] uppercase tracking-[0.3em] text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8 py-28 sm:py-36">
      <SectionHeading eyebrow="How it works" title="From hello to heirloom" />
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
  )
}

function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7000)
    return () => clearInterval(t)
  }, [])
  const t = testimonials[i]
  const photos = [albums[0].cover, albums[3].cover, albums[7].cover]
  return (
    <section className="bg-ink-2 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 grid lg:grid-cols-12 gap-14 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            {photos.map((p, k) => (
              <div key={p} className={`absolute inset-0 transition-opacity duration-1000 ${k === i ? 'opacity-100' : 'opacity-0'}`}>
                <Photo id={p} className="h-full" zoom={false} />
              </div>
            ))}
          </div>
        </Reveal>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6">Kind words</p>
          <span className="font-display text-9xl leading-[0.5] text-gold/50 block">“</span>
          <div key={i} className="fade-in min-h-[260px] sm:min-h-[220px]">
            <blockquote className="font-display italic text-3xl sm:text-[2.6rem] leading-[1.2] mt-2">{t.quote}</blockquote>
            <p className="mt-10 text-sm uppercase tracking-[0.28em]">{t.name}</p>
            <p className="text-xs text-muted mt-2">{t.meta}</p>
          </div>
          <div className="flex gap-3 mt-10">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className="py-3">
                <span className={`block h-px transition-all duration-500 ${k === i ? 'w-14 bg-gold' : 'w-7 bg-ivory/30'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function InstagramStrip() {
  return (
    <section className="pt-28 sm:pt-36">
      <Reveal className="text-center mb-12 px-4">
        <p className="eyebrow mb-4">Follow the journey</p>
        <a href={site.instagram} target="_blank" rel="noreferrer" className="font-display text-4xl sm:text-5xl hover:text-gold-2 transition inline-flex items-center gap-4">
          <InstagramIcon className="w-8 h-8" /> {site.instagramHandle}
        </a>
      </Reveal>
      <div className="grid grid-cols-3 md:grid-cols-6">
        {instagramPhotos.map((p, i) => (
          <a key={i} href={site.instagram} target="_blank" rel="noreferrer" className="group relative block" aria-label="Open Instagram">
            <Photo id={p} className="aspect-square" sizes="(min-width: 768px) 17vw, 33vw" />
            <span className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 group-hover:opacity-100 transition duration-500">
              <InstagramIcon className="w-7 h-7 text-gold" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <Categories />
      <Featured />
      <Quote />
      <FilmsTeaser />
      <Stats />
      <Process />
      <Testimonials />
      <InstagramStrip />
      <CtaBand />
    </>
  )
}
