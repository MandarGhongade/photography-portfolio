import { site, whatsappLink } from '../content/site'
import { comingSoon, INSTAGRAM_SOON } from '../lib/comingSoon'
import { InstagramIcon, WhatsAppIcon } from './Icons'

const label =
  'hidden sm:block opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300 bg-ivory text-ink text-xs tracking-wider px-4 py-2 rounded-full shadow-lg whitespace-nowrap'

/** Floating Instagram + WhatsApp buttons (bottom-right). */
export default function WhatsAppFab() {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-3">
      <button
        onClick={() => comingSoon(INSTAGRAM_SOON)}
        aria-label="Instagram"
        className="group flex items-center gap-3"
      >
        <span className={label}>Instagram</span>
        <span className="grid place-items-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-xl shadow-black/40 transition group-hover:scale-105">
          <InstagramIcon className="w-6 h-6" />
        </span>
      </button>

      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={`Chat on WhatsApp ${site.whatsappDisplay}`}
        className="group flex items-center gap-3"
      >
        <span className={label}>WhatsApp · {site.whatsappDisplay}</span>
        <span className="pulse-ring grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/40 transition group-hover:scale-105">
          <WhatsAppIcon className="w-7 h-7" />
        </span>
      </a>
    </div>
  )
}
