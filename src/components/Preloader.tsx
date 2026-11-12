import { useEffect, useState } from 'react'
import { site } from '../content/site'
import { lockScroll, unlockScroll } from '../lib/smooth'

const KEY = 'seen-intro'

function seen() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

const showIntro = !seen()
/** Hero animations wait for the intro curtain to lift. */
export const introDelay = showIntro ? 2200 : 0

/** Short cinematic intro on the first visit of a session. */
export default function Preloader() {
  const [stage, setStage] = useState<'show' | 'leave' | 'done'>(showIntro ? 'show' : 'done')
  const active = stage !== 'done'

  useEffect(() => {
    if (!active) return
    lockScroll()
    return () => unlockScroll()
  }, [active])

  useEffect(() => {
    if (!showIntro) return
    const t1 = setTimeout(() => setStage('leave'), 1900)
    const t2 = setTimeout(() => {
      setStage('done')
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* storage blocked — intro will just show again next time */
      }
    }, 2900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (!active) return null

  return (
    <div
      className={`fixed inset-0 z-[90] bg-ink flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        stage === 'leave' ? '-translate-y-full' : ''
      }`}
    >
      <div className="text-center px-4">
        <div className="overflow-hidden pb-2">
          <p className="font-display text-5xl sm:text-7xl tracking-[0.12em] line-up">{site.name}</p>
        </div>
        <div className="mx-auto mt-6 h-px w-40 bg-ivory/10 overflow-hidden">
          <div className="h-full bg-gold load-bar" />
        </div>
        <p className="eyebrow mt-6 fade-in" style={{ animationDelay: '600ms' }}>
          {site.tagline}
        </p>
      </div>
    </div>
  )
}
