import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site, whatsappLink } from '../content/site'
import { InstagramIcon, WhatsAppIcon } from './Icons'
import { lockScroll, unlockScroll } from '../lib/smooth'

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
    return () => unlockScroll()
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-ink/85 backdrop-blur-md border-b border-ivory/5 py-3' : 'bg-gradient-to-b from-ink/70 to-transparent py-5'
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
          <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-ivory/80 hover:text-gold transition">
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
          className="lg:hidden relative w-10 h-10 grid place-items-center"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`absolute h-px w-7 bg-ivory transition-all duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-px w-7 bg-ivory transition-all duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[64px] bg-ink transition-all duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-7 h-[70%]">
          {links.map((l, i) => (
            <li key={l.to} className={open ? 'rise' : ''} style={{ animationDelay: `${i * 70}ms` }}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `font-display text-4xl ${isActive ? 'text-gold italic' : 'text-ivory'}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-4 px-4">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gold text-ink px-6 py-3 text-xs uppercase tracking-[0.2em]">
            <WhatsAppIcon className="w-4 h-4" /> WhatsApp
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-ivory/30 px-6 py-3 text-xs uppercase tracking-[0.2em]">
            <InstagramIcon className="w-4 h-4" /> Instagram
          </a>
        </div>
      </div>
    </header>
  )
}
