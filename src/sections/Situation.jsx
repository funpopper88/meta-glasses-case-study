import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { headlines, situation } from '../data/content'

function StateCard({ title, items, dot }) {
  return (
    <div className="card h-full p-7">
      <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50">
        <span className={`h-2 w-2 rounded-full ${dot}`} /> {title}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((t) => (
          <li key={t} className="leading-relaxed text-white/70">{t}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Situation() {
  return (
    <Section id="situation" index="01" eyebrow="Research · The situation" title="Meta wins the market but is losing trust." intro={situation.insight}>
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal><StateCard title="Current state" items={situation.current} dot="bg-rec" /></Reveal>
        <Reveal delay={0.1}><StateCard title="Ideal state" items={situation.ideal} dot="bg-blue-400" /></Reveal>
      </div>

      <Reveal className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {headlines.map((h) => (
          <div key={h.text} className="bg-ink p-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-blue-300/70">{h.outlet} · {h.source}</p>
            <p className="mt-2 text-sm text-white/75">{h.text}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-10 border-l-2 border-blue-400 pl-5">
        <p className="max-w-3xl text-lg text-white/80">{situation.whyPR}</p>
      </Reveal>
    </Section>
  )
}
