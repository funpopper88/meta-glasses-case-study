import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { headlines, stats } from '../data/content'

function CountUp({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export default function TrustGap() {
  return (
    <Section
      id="why"
      index="01"
      eyebrow="Why it matters"
      title="We hear you."
      intro="People aren't rejecting smart glasses because of how they look or work. They're worried about being recorded without knowing it, and about what happens to that footage."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="card p-6">
            <p className="text-5xl font-extrabold tracking-tight text-gradient">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{s.label}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/30">{s.source}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-white/40">In the headlines</p>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {headlines.map((h) => (
            <div key={h.text} className="bg-ink p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-blue-300/70">{h.outlet}</p>
              <p className="mt-2 font-medium text-white/85">{h.text}</p>
              <p className="mt-3 text-xs text-white/30">{h.source}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12 text-center">
        <p className="mx-auto max-w-2xl text-xl font-medium text-white/80 sm:text-2xl">
          Trust can't be bought with an ad. So instead of promising privacy, <span className="text-gradient">we'll prove it.</span>
        </p>
      </Reveal>
    </Section>
  )
}
