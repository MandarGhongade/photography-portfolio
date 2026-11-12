import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: string
  text?: string
  align?: 'center' | 'left'
}

export default function SectionHeading({ eyebrow, title, text, align = 'center' }: Props) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-14 ${center ? 'text-center mx-auto max-w-2xl' : 'max-w-xl'}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] font-normal">{title}</h2>
      <div className={`h-px w-16 bg-gold/60 mt-6 ${center ? 'mx-auto' : ''}`} />
      {text && <p className="mt-6 text-muted leading-relaxed">{text}</p>}
    </Reveal>
  )
}
