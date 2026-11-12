import { NavLink, useParams } from 'react-router-dom'
import { categories } from '../content/site'
import { categoryCovers, pools, type PoolKey } from '../content/photos'
import { CtaBand, PageHero } from '../components/Blocks'
import Gallery from '../components/Gallery'
import Reveal from '../components/Reveal'
import { usePageTitle } from '../lib/usePageTitle'
import NotFound from './NotFound'

const GALLERY_SIZE = 25

/** 25 photos for a category, or a mix of all categories for "All work". */
function galleryFor(slug?: PoolKey) {
  if (slug) return pools[slug].slice(0, GALLERY_SIZE)
  const keys = Object.keys(pools) as PoolKey[]
  const mixed: string[] = []
  for (let i = 0; mixed.length < GALLERY_SIZE; i++) {
    const id = pools[keys[i % keys.length]][Math.floor(i / keys.length)]
    if (id && !mixed.includes(id)) mixed.push(id)
  }
  return mixed
}

export default function Portfolio() {
  const { category } = useParams()
  const cat = categories.find((c) => c.slug === category)
  usePageTitle(cat ? cat.name : 'Portfolio')

  if (category && !cat) return <NotFound />

  const tabs = [{ slug: '', name: 'All work' }, ...categories]

  return (
    <>
      <PageHero
        eyebrow={cat ? 'Portfolio' : 'Selected work'}
        title={cat ? cat.name : 'Portfolio'}
        text={cat ? cat.description : 'Love stories, editorials and events — each one told the way it was felt.'}
        photo={cat ? categoryCovers[cat.slug] : '1595407753234-0882f1e77954'}
      />

      <div className="sticky top-[73px] z-30 bg-ink/85 backdrop-blur-md border-b border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex gap-10 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <NavLink
              key={t.slug}
              to={t.slug ? `/portfolio/${t.slug}` : '/portfolio'}
              end
              className={({ isActive }) =>
                `whitespace-nowrap py-5 text-[0.7rem] uppercase tracking-[0.25em] border-b transition duration-500 ${
                  isActive ? 'border-gold text-gold' : 'border-transparent text-ivory/60 hover:text-ivory'
                }`
              }
            >
              {t.name}
            </NavLink>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-8 py-24 sm:py-28">
        <Reveal className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="font-display text-5xl sm:text-6xl">{cat ? cat.highlights : 'Highlights'}</h2>
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-muted">{GALLERY_SIZE} photographs · tap to view</p>
        </Reveal>
        <Gallery key={cat?.slug ?? 'all'} photos={galleryFor(cat?.slug)} title={cat?.name ?? 'Portfolio'} />
      </section>

      <CtaBand />
    </>
  )
}
