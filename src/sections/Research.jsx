import Section from '../components/Section'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { keyStats, research } from '../data/content'

function StateCard({ title, items, dot }) {
  return (
    <div className="card h-full p-7">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50">
        <span className={`h-2 w-2 rounded-full ${dot}`} /> {title}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((t) => <li key={t} className="leading-relaxed text-white/70">{t}</li>)}
      </ul>
    </div>
  )
}

export default function Research() {
  return (
    <Section id="research" index="R" eyebrow="Research" title="The situation" intro={research.intro}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="card p-6">
            <p className="text-4xl font-extrabold tracking-tight"><CountUp value={s.value} suffix={s.suffix} /></p>
            <p className="mt-2 text-sm text-white/60">{s.label}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/30">Source: {s.source}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal><StateCard title="Current state" items={research.current} dot="bg-rec" /></Reveal>
        <Reveal delay={0.1}><StateCard title="Ideal state" items={research.ideal} dot="bg-blue-400" /></Reveal>
      </div>
    </Section>
  )
}
