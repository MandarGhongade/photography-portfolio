import { useEffect, useRef, useState } from 'react'
import { img, srcSet } from '../content/photos'
import { PlayIcon } from './Icons'
import { useParallax } from '../lib/useParallax'

type PhotoProps = {
  id: string
  alt?: string
  className?: string
  imgClassName?: string
  sizes?: string
  zoom?: boolean
  priority?: boolean
  parallax?: number
}

/** Responsive, lazy-loaded photo that fades in from a soft blur. */
export function Photo({
  id,
  alt = '',
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  zoom = true,
  priority = false,
  parallax = 0,
}: PhotoProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const pRef = useParallax<HTMLDivElement>(parallax)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <div
      className={`${/(^|\s)!?absolute/.test(className) ? '' : 'relative'} overflow-hidden bg-ink-3 ${loaded ? '' : 'shimmer'} ${className}`}
    >
      <div ref={parallax ? pRef : undefined} className={`absolute inset-0 ${parallax ? '-top-[12%] -bottom-[12%]' : ''}`}>
        <img
          ref={imgRef}
          src={img(id, 1200)}
          srcSet={srcSet(id)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover select-none transition-[opacity,filter] duration-[1400ms] ease-out ${
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'
          } ${zoom ? 'zoom-img' : ''} ${imgClassName}`}
        />
      </div>
    </div>
  )
}

type VideoProps = {
  poster: string
  title?: string
  label?: string
  duration?: string
  className?: string
  large?: boolean
}

/** Film thumbnail — poster + play button. Becomes a YouTube/Vimeo embed later. */
export function VideoThumb({ poster, title, label, duration, className = '', large = false }: VideoProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Photo id={poster} alt={title} className="absolute inset-0" sizes={large ? '100vw' : '(min-width: 640px) 50vw, 100vw'} />
      <div className="absolute inset-0 bg-ink/35 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/20 transition duration-700 group-hover:bg-ink/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-ivory">
        <span
          className={`grid place-items-center rounded-full border border-ivory/60 backdrop-blur-md bg-ivory/10 transition duration-700 group-hover:scale-110 group-hover:bg-gold group-hover:border-gold group-hover:text-ink ${
            large ? 'w-24 h-24' : 'w-16 h-16'
          }`}
        >
          <PlayIcon className={`${large ? 'w-8 h-8' : 'w-6 h-6'} translate-x-0.5`} />
        </span>
        {label && <span className="eyebrow !text-ivory/80">{label}</span>}
      </div>
      {duration && (
        <span className="absolute bottom-4 right-4 text-[0.7rem] tracking-[0.2em] bg-ink/50 backdrop-blur px-3 py-1.5">
          {duration}
        </span>
      )}
    </div>
  )
}
