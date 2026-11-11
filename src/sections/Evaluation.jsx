import { motion } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { alsoTracked, objectives } from '../data/content'

// Dumbbell chart: today -> goal per objective on one shared % axis.
// One hue, two shades (validated against the dark card surface).
const TODAY = '#4a5fae'
const GOAL = '#3a95f5'
const SURFACE = '#0d0f14'
const MAX = 50
const TICKS = [0, 10, 20, 30, 40, 50]
const pos = (v) => `${(v / MAX) * 100}%`

function Dot({ value, color, size, label, delay, strong }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group absolute top-[44%] -translate-x-1/2 -translate-y-1/2"
      style={{ left: pos(value) }}
    >
      {/* value label sits above the dot, in text ink */}
      <span className={`absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap text-sm ${strong ? 'font-bold text-white' : 'font-semibold text-white/65'}`}>
        {value}%
      </span>
      {/* hit target larger than the mark */}
      <span className="flex h-8 w-8 items-center justify-center">
        <span className="block rounded-full" style={{ width: size, height: size, background: color, boxShadow: `0 0 0 2px ${SURFACE}` }} />
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#11141b] px-2.5 py-1.5 text-xs text-white/80 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}: {value}%
      </span>
    </motion.div>
  )
}

function Row({ label, short, from, to, measure }) {
  return (
    <div className="grid gap-x-8 gap-y-2 md:grid-cols-[15rem_1fr] md:items-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-white/45">{label}</p>
        <p className="mt-1 text-white/85">{short}</p>
        <p className="mt-1 text-sm font-semibold text-white/60">+{to - from} percentage points</p>
      </div>
      <div className="relative h-24">
        {TICKS.map((t) => (
          <span key={t}>
            <span className="absolute bottom-6 top-3 w-px bg-white/[0.07]" style={{ left: pos(t) }} />
            <span className="absolute bottom-0 -translate-x-1/2 font-mono text-[11px] text-white/35" style={{ left: pos(t) }}>{t}%</span>
          </span>
        ))}
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${((to - from) / MAX) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="absolute top-[44%] h-[3px] -translate-y-1/2 rounded-full"
          style={{ left: pos(from), background: `linear-gradient(90deg, ${TODAY}, ${GOAL})` }}
        />
        <Dot value={from} color={TODAY} size={14} label="Today" delay={0} />
        <Dot value={to} color={GOAL} size={20} label="Goal by Oct. 2028" delay={0.9} strong />
      </div>
      <p className="text-sm text-white/50 md:col-start-2">
        <span className="text-white/75">Measured by:</span> {measure}
      </p>
    </div>
  )
}

export default function Evaluation() {
  return (
    <Section id="evaluation" index="E" eyebrow="Evaluation" title="How we'll measure success" intro="Where each objective stands today, and where it needs to be by October 2028.">
      <Reveal className="card p-6 sm:p-10">
        <div className="mb-10 flex flex-wrap gap-6 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: TODAY }} /> Today
          </span>
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full" style={{ background: GOAL }} /> Goal by October 2028
          </span>
        </div>

        <div className="space-y-12">
          {objectives.map((o) => <Row key={o.label} {...o} />)}
        </div>

        <table className="sr-only">
          <caption>Objective baselines and October 2028 targets</caption>
          <thead><tr><th>Objective</th><th>Today</th><th>Goal</th></tr></thead>
          <tbody>
            {objectives.map((o) => (
              <tr key={o.label}><td>{o.short}</td><td>{o.from}%</td><td>{o.to}%</td></tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Also tracked</p>
          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            {alsoTracked.map((m) => (
              <div key={m.title} className="text-sm">
                <dt className="inline font-semibold text-white/85">{m.title}: </dt>
                <dd className="inline text-white/55">{m.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  )
}
