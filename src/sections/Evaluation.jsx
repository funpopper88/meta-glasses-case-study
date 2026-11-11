import { motion } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { alsoTracked, objectives } from '../data/content'

// Paired columns: today vs. goal for each objective on one 0–50% scale.
// One hue, two shades (validated against the dark card surface).
const TODAY = '#4a5fae'
const GOAL = '#3a95f5'
const MAX = 50
const TICKS = [0, 10, 20, 30, 40, 50]
const H = 240 // plot height in px

function Column({ value, color, label, delay }) {
  return (
    <div className="group relative flex w-12 flex-col items-center justify-end sm:w-16" style={{ height: H }}>
      <span className="mb-1.5 text-sm font-semibold text-white">{value}%</span>
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: (value / MAX) * H }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay }}
        className="w-full rounded-t"
        style={{ background: color }}
      />
      {/* hover detail */}
      <span className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-white/10 bg-[#11141b] px-2.5 py-1.5 text-xs text-white/80 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}: {value}%
      </span>
    </div>
  )
}

export default function Evaluation() {
  return (
    <Section id="evaluation" index="E" eyebrow="Evaluation" title="How we'll measure success" intro="Where each objective stands today, and where it needs to be by October 2028.">
      <Reveal className="card p-6 sm:p-10">
        <div className="mb-8 flex flex-wrap gap-6 text-sm text-white/70">
          <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: TODAY }} /> Today</span>
          <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: GOAL }} /> Goal by October 2028</span>
        </div>

        {/* plot: gridlines with % labels, then the column pairs */}
        <div className="relative" style={{ height: H }}>
          {TICKS.map((t) => (
            <div key={t} className="absolute inset-x-0 flex h-0 items-center gap-3" style={{ bottom: (t / MAX) * H }}>
              <span className="w-9 text-right font-mono text-[11px] text-white/35">{t}%</span>
              <span className="h-px flex-1 bg-white/[0.07]" />
            </div>
          ))}
          <div className="absolute bottom-0 left-12 right-0 flex justify-around">
            {objectives.map((o, i) => (
              <div key={o.label} className="flex items-end gap-2">
                <Column value={o.from} color={TODAY} label="Today" delay={i * 0.15} />
                <Column value={o.to} color={GOAL} label="Goal by Oct. 2028" delay={i * 0.15 + 0.2} />
              </div>
            ))}
          </div>
        </div>

        {/* category labels under each pair */}
        <div className="ml-12 mt-4 flex justify-around gap-4">
          {objectives.map((o) => (
            <div key={o.label} className="max-w-[16rem] text-center">
              <p className="text-sm font-semibold text-white/85">{o.label}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-white/50">{o.short}</p>
            </div>
          ))}
        </div>

        {/* tables ignore sr-only sizing, so the wrapper does the hiding */}
        <div className="sr-only">
          <table>
            <caption>Objective baselines and October 2028 targets</caption>
            <thead><tr><th>Objective</th><th>Today</th><th>Goal</th></tr></thead>
            <tbody>
              {objectives.map((o) => (
                <tr key={o.label}><td>{o.short}</td><td>{o.from}%</td><td>{o.to}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/10 pt-6 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">Measured by</p>
            <dl className="mt-3 space-y-2 text-sm">
              {objectives.map((o) => (
                <div key={o.label}>
                  <dt className="inline font-semibold text-white/85">{o.label}: </dt>
                  <dd className="inline text-white/55">{o.measure}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">Also tracked</p>
            <dl className="mt-3 space-y-2 text-sm">
              {alsoTracked.map((m) => (
                <div key={m.title}>
                  <dt className="inline font-semibold text-white/85">{m.title}: </dt>
                  <dd className="inline text-white/55">{m.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
