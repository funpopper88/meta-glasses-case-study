import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { stats } from '../data/content'

function CountUp({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

export default function TrustGap() {
  return (
    <Section id="why" index="01" eyebrow="Why it matters" title="We hear you." intro="People aren't worried about how smart glasses look. They're worried about being recorded without knowing it.">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="card p-6">
            <p className="text-5xl font-extrabold tracking-tight text-white"><CountUp value={s.value} suffix={s.suffix} /></p>
            <p className="mt-3 text-white/60">{s.label}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white/30">{s.source}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
