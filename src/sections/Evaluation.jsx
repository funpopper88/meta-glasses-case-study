import { motion } from 'motion/react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { alsoTracked, objectives } from '../data/content'

const TODAY = 'bg-blue-700'
const GOAL = 'bg-gradient-to-r from-sky-500 to-sky-300'

function Meter({ label, short, from, to, measure }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-sky-300/80">{label}</p>
          <p className="mt-1 text-lg text-white/85">{short}</p>
        </div>
        <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          <span className="text-blue-400">{from}%</span>
          <span className="mx-2 text-white/30">→</span>
          <span className="text-sky-300">{to}%</span>
        </p>
      </div>

      <div className="relative mt-4 h-5 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${to}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`absolute inset-y-0 left-0 rounded-full ${GOAL} shadow-[0_0_20px_rgba(56,189,248,0.45)]`}
        />
        <div className={`absolute inset-y-0 left-0 rounded-full ${TODAY} ring-1 ring-blue-400/50`} style={{ width: `${from}%` }} />
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-white/30">
        {[0, 25, 50, 75, 100].map((t) => <span key={t}>{t}%</span>)}
      </div>

      <p className="mt-3 text-sm text-white/55"><span className="text-white/80">Measured by:</span> {measure}</p>
    </div>
  )
}

export default function Evaluation() {
  return (
    <Section id="evaluation" index="E" eyebrow="Evaluation" title="How we'll measure success" intro="Progress is tracked against both objectives through October 2028.">
      <Reveal className="card p-8 sm:p-10">
        <div className="mb-8 flex flex-wrap gap-5 text-sm text-white/60">
          <span className="flex items-center gap-2"><span className={`h-3 w-6 rounded-full ${TODAY}`} /> Today</span>
          <span className="flex items-center gap-2"><span className={`h-3 w-6 rounded-full ${GOAL}`} /> Goal by October 2028</span>
        </div>
        <div className="space-y-10">
          {objectives.map((o) => <Meter key={o.label} {...o} />)}
        </div>
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
