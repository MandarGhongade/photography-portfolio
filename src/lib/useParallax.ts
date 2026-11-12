import { useEffect, useRef } from 'react'

/**
 * Moves an element vertically as the page scrolls.
 * speed 0.1–0.3 is subtle; negative values move the opposite way.
 */
export function useParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.parentElement!.getBoundingClientRect()
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return ref
}
