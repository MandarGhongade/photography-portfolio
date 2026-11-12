import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Buttery smooth scrolling (desktop + touch keep native feel). */
export function initSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  let id = 0
  const raf = (t: number) => {
    lenis?.raf(t)
    id = requestAnimationFrame(raf)
  }
  id = requestAnimationFrame(raf)
  return () => {
    cancelAnimationFrame(id)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

let locks = 0
export function lockScroll() {
  locks++
  document.body.style.overflow = 'hidden'
  lenis?.stop()
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1)
  if (locks) return
  document.body.style.overflow = ''
  lenis?.start()
}
