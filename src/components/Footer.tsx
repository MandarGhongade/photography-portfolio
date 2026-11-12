import { Link } from 'react-router-dom'
import { categories, site, whatsappLink } from '../content/site'
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon, YoutubeIcon } from './Icons'
import { Logo } from './Navbar'

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-ink-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-6 text-sm text-muted leading-relaxed max-w-xs">
            Wedding, pre-wedding, fashion and corporate photography & films. Based in {site.city} — available
            worldwide.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { href: site.instagram, icon: <InstagramIcon className="w-4 h-4" />, label: 'Instagram' },
              { href: whatsappLink(), icon: <WhatsAppIcon className="w-4 h-4" />, label: 'WhatsApp' },
              { href: site.youtube, icon: <YoutubeIcon className="w-4 h-4" />, label: 'YouTube' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-10 h-10 grid place-items-center rounded-full border border-ivory/15 text-ivory/80 hover:border-gold hover:text-gold transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Portfolio</h4>
          <ul className="space-y-3 text-sm text-ivory/80">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/portfolio/${c.slug}`} className="hover:text-gold transition">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/films" className="hover:text-gold transition">Films</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Studio</h4>
          <ul className="space-y-3 text-sm text-ivory/80">
            <li><Link to="/about" className="hover:text-gold transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition">Enquire</Link></li>
            <li className="text-muted">{site.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5">Get in touch</h4>
          <ul className="space-y-4 text-sm text-ivory/80">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-gold transition">
                <PhoneIcon className="w-4 h-4 text-gold" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-gold transition">
                <MailIcon className="w-4 h-4 text-gold" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold transition">
                <InstagramIcon className="w-4 h-4 text-gold" /> {site.instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="w-4 h-4 text-gold shrink-0 mt-0.5" /> {site.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-6 flex flex-col sm:flex-row gap-2 justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>All images are copyrighted. Please do not reuse without permission.</p>
        </div>
      </div>
    </footer>
  )
}
