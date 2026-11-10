import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import Section from '../components/Section'
import { programs } from '../data/content'

export default function Programs() {
  const [tab, setTab] = useState(programs[0].id)
  const p = programs.find((x) => x.id === tab)

  return (
    <Section
      id="programs"
      index="05"
      eyebrow="Programs"
      title="Built for how you live."
      intro="Real experiences and trusted voices, not ads, showing how protection works in everyday life."
    >
      <div role="tablist" aria-label="Programs" className="mb-8 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
        {programs.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={tab === x.id}
            onClick={() => setTab(x.id)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
              tab === x.id ? 'text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {tab === x.id && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative">{x.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="card relative overflow-hidden p-8 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl" />
            <p className="relative font-mono text-xs uppercase tracking-widest text-blue-300/80">{p.audience}</p>
            <h3 className="relative mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{p.headline}</h3>
            <p className="relative mt-5 text-lg leading-relaxed text-white/65">{p.body}</p>
            <blockquote className="relative mt-8 border-l-2 border-blue-400 pl-4 text-white/85 italic">“{p.quote}”</blockquote>
          </div>
          <div className="card p-8 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">The program</p>
            <h4 className="mt-2 text-xl font-semibold">{p.program}</h4>
            <ul className="mt-6 space-y-5">
              {p.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                  <span className="leading-relaxed text-white/70">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
