import { useEffect, useState } from 'react'
import { SOON_EVENT } from '../lib/comingSoon'
import { CloseIcon, InstagramIcon } from './Icons'

/** Small elegant notice that slides up from the bottom. */
export default function Toast() {
  const [message, setMessage] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let hide: ReturnType<typeof setTimeout>
    const onSoon = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail)
      setVisible(true)
      clearTimeout(hide)
      hide = setTimeout(() => setVisible(false), 4000)
    }
    window.addEventListener(SOON_EVENT, onSoon)
    return () => {
      clearTimeout(hide)
      window.removeEventListener(SOON_EVENT, onSoon)
    }
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-1/2 top-24 sm:top-auto sm:bottom-6 z-[96] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 sm:translate-y-6 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-4 bg-ink-2/95 backdrop-blur-md border border-gold/30 shadow-2xl shadow-black/60 px-5 py-4">
        <span className="grid place-items-center w-11 h-11 shrink-0 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
          <InstagramIcon className="w-5 h-5" />
        </span>
        <div className="flex-1">
          <p className="eyebrow !text-[0.6rem]">Coming soon</p>
          <p className="text-sm text-ivory/90 mt-1 leading-snug">{message}</p>
        </div>
        <button onClick={() => setVisible(false)} aria-label="Dismiss" className="p-1 text-ivory/60 hover:text-gold transition">
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
