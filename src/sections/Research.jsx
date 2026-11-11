import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { keyStats, research } from '../data/content'

function StateCard({ title, items, accent, tone }) {
  return (
    <div className="card h-full p-7">
      <span className={`block h-1 w-12 rounded-full ${accent}`} />
      <h3 className={`mt-4 text-2xl font-semibold tracking-tight ${tone}`}>{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((t) => <li key={t} className="leading-relaxed text-white/70">{t}</li>)}
      </ul>
    </div>
  )
}

export default function Research() {
  return (
    <Section id="research" index="R" eyebrow="Research" title="The situation" intro={research.intro}>
      <div className="grid gap-4 md:grid-cols-3">
        {keyStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="card flex flex-col p-8">
            <p className="text-6xl font-extrabold tracking-tight">{s.value}{s.suffix}</p>
            <p className="mt-3 flex-1 leading-relaxed text-white/65">{s.label}</p>
            <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-widest text-white/30">Source: {s.source}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Reveal><StateCard title="Current state" items={research.current} accent="bg-slate-400/50" tone="text-slate-200" /></Reveal>
        <Reveal delay={0.1}><StateCard title="Ideal state" items={research.ideal} accent="bg-gradient-to-r from-blue-500 to-sky-300" tone="text-blue-100" /></Reveal>
      </div>
    </Section>
  )
}
