import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site, whatsappLink } from '../content/site'
import { ArrowIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from './Icons'
import { lockScroll, unlockScroll } from '../lib/smooth'
import { instagramLink } from '../lib/comingSoon'

const links = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/films', label: 'Films' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex flex-col leading-none ${className}`} aria-label={`${site.name} home`}>
      <span className="font-display text-2xl sm:text-[1.7rem] tracking-[0.08em]">{site.name}</span>
      <span className="eyebrow !text-[0.55rem] !tracking-[0.45em] mt-1">{site.tagline}</span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          open
            ? 'bg-transparent py-5'
            : scrolled
              ? 'bg-ink/85 backdrop-blur-md border-b border-ivory/5 py-3'
              : 'bg-gradient-to-b from-ink/70 to-transparent py-5'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between">
          <Logo />

          <ul className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative text-[0.78rem] uppercase tracking-[0.22em] transition-colors hover:text-gold ${
                      isActive ? 'text-gold' : 'text-ivory/85'
                    } after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-500 ${
                      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-5">
            <a {...instagramLink} aria-label="Instagram" className="text-ivory/80 hover:text-gold transition">
              <InstagramIcon />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-gold/70 text-gold px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.22em] hover:bg-gold hover:text-ink transition-colors duration-300"
            >
              <WhatsAppIcon className="w-4 h-4" /> Book a date
            </a>
          </div>

          <button
            className="lg:hidden relative w-11 h-11 grid place-items-center rounded-full border border-ivory/20 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`absolute h-px w-5 bg-ivory transition-all duration-500 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
            <span className={`absolute h-px bg-ivory transition-all duration-500 ${open ? 'w-5 -rotate-45' : 'w-3 translate-y-[4px] translate-x-[4px]'}`} />
          </button>
        </nav>
      </header>

      {/* Mobile menu — a sibling of <header> so it truly covers the whole screen */}
      <div
        className={`lg:hidden fixed inset-0 z-[45] bg-ink transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_100%_0%,rgba(200,169,126,0.12),transparent_60%)]" />
        <div className="relative h-full flex flex-col px-6 pt-28 pb-8 overflow-y-auto">
          <p className="eyebrow mb-6">Menu</p>
          <ul className="border-t border-ivory/10">
            {links.map((l, i) => (
              <li
                key={l.to}
                className={`border-b border-ivory/10 transition-all duration-700 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: open ? `${200 + i * 70}ms` : '0ms' }}
              >
                <NavLink to={l.to} end={l.to === '/'} className="group flex items-center gap-5 py-4">
                  {({ isActive }) => (
                    <>
                      <span className="font-display italic text-sm text-gold w-6">0{i + 1}</span>
                      <span className={`font-display text-[2.4rem] leading-none flex-1 ${isActive ? 'text-gold-2 italic' : 'text-ivory'}`}>
                        {l.label}
                      </span>
                      <ArrowIcon className={`w-5 h-5 transition ${isActive ? 'text-gold' : 'text-ivory/30'}`} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div
            className={`mt-auto pt-10 transition-all duration-700 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: open ? '600ms' : '0ms' }}
          >
            <p className="eyebrow mb-4">Get in touch</p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 text-[0.7rem] uppercase tracking-[0.2em]"
              >
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
              </a>
              <a
                {...instagramLink}
                className="flex items-center justify-center gap-2 border border-ivory/25 py-3.5 text-[0.7rem] uppercase tracking-[0.2em]"
              >
                <InstagramIcon className="w-4 h-4" /> Instagram
              </a>
            </div>
            <a href={`tel:+${site.whatsapp}`} className="mt-5 flex items-center gap-3 text-sm text-ivory/80">
              <PhoneIcon className="w-4 h-4 text-gold" /> {site.whatsappDisplay}
            </a>
            <p className="mt-2 text-xs text-muted">{site.city}</p>
          </div>
        </div>
      </div>
    </>
  )
}
