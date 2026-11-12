import { useCallback, useEffect, useRef } from 'react'
import { img } from '../content/photos'
import { ChevronIcon, CloseIcon } from './Icons'
import { VideoThumb } from './Media'
import { lockScroll, unlockScroll } from '../lib/smooth'

export type LightboxItem = { kind: 'photo' | 'video'; id: string; label: string }

type Props = {
  items: LightboxItem[]
  index: number | null
  onChange: (i: number | null) => void
}

/** Full-screen viewer with keyboard, swipe and thumbnail navigation. */
export default function Lightbox({ items, index, onChange }: Props) {
  const touchX = useRef<number | null>(null)
  const strip = useRef<HTMLDivElement>(null)
  const open = index !== null

  const go = useCallback(
    (dir: number) => {
      if (index === null) return
      onChange((index + dir + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    lockScroll()
    return () => unlockScroll()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go, onChange])

  useEffect(() => {
    if (index === null) return
    strip.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [index])

  if (index === null) return null
  const item = items[index]

  return (
    <div
      className="fade-in fixed inset-0 z-[95] bg-ink/[0.97] backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 text-sm">
        <span className="font-display text-xl italic text-ivory/80">
          {String(index + 1).padStart(2, '0')} <span className="text-muted">/ {String(items.length).padStart(2, '0')}</span>
        </span>
        <span className="hidden sm:block eyebrow !text-muted">{item.label}</span>
        <button onClick={() => onChange(null)} aria-label="Close" className="p-2 text-ivory hover:text-gold hover:rotate-90 transition duration-500">
          <CloseIcon />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-24" onClick={() => onChange(null)}>
        <div key={index} className="fade-in h-full w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          {item.kind === 'photo' ? (
            <img
              src={img(item.id, 2000)}
              alt={item.label}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="max-h-full max-w-full object-contain shadow-2xl shadow-black/60"
            />
          ) : (
            <VideoThumb poster={item.id} label={item.label} large className="group aspect-video w-full max-w-5xl max-h-full" />
          )}
        </div>

        {(['left', 'right'] as const).map((d) => (
          <button
            key={d}
            onClick={(e) => {
              e.stopPropagation()
              go(d === 'left' ? -1 : 1)
            }}
            aria-label={d === 'left' ? 'Previous' : 'Next'}
            className={`hidden sm:grid absolute ${d === 'left' ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 w-14 h-14 place-items-center rounded-full border border-ivory/20 hover:border-gold hover:text-gold transition`}
          >
            <ChevronIcon dir={d} />
          </button>
        ))}
      </div>

      <div ref={strip} className="flex gap-2 overflow-x-auto no-scrollbar px-4 sm:px-8 py-4 justify-start sm:justify-center">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            aria-label={`Show ${it.label}`}
            className={`relative shrink-0 w-16 h-12 overflow-hidden transition duration-300 ${
              i === index ? 'ring-1 ring-gold opacity-100' : 'opacity-40 hover:opacity-80'
            }`}
          >
            <img src={img(it.id, 160)} alt="" loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
