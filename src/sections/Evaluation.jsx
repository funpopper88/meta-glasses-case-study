import { motion } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { keyStats, measures, objectives, timeline } from '../data/content'

function Meter({ label, from, to }) {
  return (
    <div>
      <div className="flex justify-between font-mono text-xs text-white/50">
        <span>{label}</span>
        <span><span className="text-white/40">{from}%</span> → <span className="text-blue-300">{to}%</span></span>
      </div>
      <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${to}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#13306e] to-blue-400"
        />
        <div className="absolute inset-y-0 left-0 rounded-full bg-white/30" style={{ width: `${from}%` }} />
      </div>
    </div>
  )
}

export default function Evaluation() {
  return (
    <Section id="evaluation" index="06" eyebrow="Evaluation · Stats & measurement" title="The numbers we start from, and how we'll prove the shift.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyStats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="card p-6">
            <p className="text-4xl font-extrabold tracking-tight"><CountUp value={s.value} suffix={s.suffix} /></p>
            <p className="mt-2 text-sm text-white/60">{s.label}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-white/30">Source: {s.source}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="card mt-4 space-y-6 p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-white/40">Baseline → target by October 2028</p>
        {objectives.map((o) => <Meter key={o.label} label={o.label} from={o.from} to={o.to} />)}
      </Reveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {measures.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.06} className="card p-6">
            <p className="font-mono text-xs text-blue-300">{m.target}</p>
            <h3 className="mt-2 font-semibold">{m.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/55">{m.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-white/40">Campaign phases</p>
        <ol className="relative grid gap-6 border-l border-white/10 pl-6 md:grid-cols-3 md:border-l-0 md:border-t md:pl-0 md:pt-6">
          {timeline.map((t) => (
            <li key={t.when} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-400 md:-top-[31px] md:left-0" />
              <p className="font-mono text-sm text-blue-300">{t.when}</p>
              <p className="mt-1 text-sm text-white/65">{t.what}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  )
}
