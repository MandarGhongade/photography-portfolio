import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="min-h-[80vh] grid place-items-center text-center px-4 pt-24">
      <div>
        <p className="font-display text-[8rem] leading-none text-gold/30 italic">404</p>
        <h1 className="font-display text-4xl sm:text-5xl mt-4">This frame is out of focus</h1>
        <p className="mt-4 text-muted">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-10 inline-block border border-gold text-gold px-8 py-4 text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-ink transition">
          Back home
        </Link>
      </div>
    </section>
  )
}
