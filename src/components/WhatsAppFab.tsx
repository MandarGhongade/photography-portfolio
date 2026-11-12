import { whatsappLink } from '../content/site'
import { WhatsAppIcon } from './Icons'

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-3"
    >
      <span className="hidden sm:block opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300 bg-ivory text-ink text-xs tracking-wider px-4 py-2 rounded-full shadow-lg">
        Chat with us
      </span>
      <span className="pulse-ring grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/40 transition group-hover:scale-105">
        <WhatsAppIcon className="w-7 h-7" />
      </span>
    </a>
  )
}
