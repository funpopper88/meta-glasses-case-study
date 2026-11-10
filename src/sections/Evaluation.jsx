import { motion } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { measures, objectives } from '../data/content'

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
    <Section id="evaluation" index="E" eyebrow="Evaluation" title="How we'll measure success" intro="Progress is tracked against both objectives through October 2028.">
      <Reveal className="card space-y-6 p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-white/40">Baseline → target</p>
        {objectives.map((o) => <Meter key={o.label} label={o.label} from={o.from} to={o.to} />)}
      </Reveal>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {measures.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.06} className="card p-6">
            <h3 className="font-semibold">{m.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/55">{m.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
