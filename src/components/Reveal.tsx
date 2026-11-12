import { useEffect, useRef, type ReactNode, type ElementType } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

/** Fades/slides children in when they scroll into view. */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}
