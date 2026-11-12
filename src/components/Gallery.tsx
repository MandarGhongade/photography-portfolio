import { useState } from 'react'
import Lightbox from './Lightbox'
import { Photo } from './Media'
import Reveal from './Reveal'

// Varied shapes so the masonry feels like a real edited gallery.
const ratios = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-[2/3]', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/2]']

/** Masonry photo grid that opens a full-screen viewer on click. */
export default function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const items = photos.map((id, i) => ({ kind: 'photo' as const, id, label: `Photo ${i + 1}` }))

  return (
    <>
      <div className="masonry columns-2 lg:columns-3 xl:columns-4">
        {items.map((it, i) => (
          <Reveal key={`${it.id}-${i}`} delay={(i % 4) * 70}>
            <button onClick={() => setOpen(i)} className="group block w-full cursor-zoom-in" aria-label={`Open ${it.label}`}>
              <Photo id={it.id} alt={`${title} — ${it.label}`} className={ratios[i % ratios.length]} sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw" />
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox items={items} index={open} onChange={setOpen} />
    </>
  )
}
