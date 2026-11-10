import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { angle, goal, objectives } from '../data/content'

export default function Objectives() {
  return (
    <Section id="objectives" index="02" eyebrow="Action · Goal & objectives" title="Close the trust gap.">
      <Reveal className="card mb-4 p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-white/40">Goal</p>
        <p className="mt-3 text-xl leading-relaxed text-white/85 sm:text-2xl">{goal}</p>
        <p className="mt-6 font-mono text-sm text-blue-300">Strategic angle: “{angle}”</p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {objectives.map((o, i) => (
          <Reveal key={o.label} delay={i * 0.1} className="card p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-blue-300/80">{o.label}</p>
            <p className="mt-4 text-5xl font-extrabold tracking-tight">
              <span className="text-white/40">{o.from}%</span> <span className="text-blue-300">→</span> {o.to}%
            </p>
            <p className="mt-4 text-white/70">{o.text}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white/40">By {o.by}</p>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/40">{o.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
