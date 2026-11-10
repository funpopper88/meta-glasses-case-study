import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Section from '../components/Section'
import { programs } from '../data/content'

export default function Programs() {
  const [tab, setTab] = useState(programs[0].id)
  const p = programs.find((x) => x.id === tab)

  return (
    <Section id="programs" index="05" eyebrow="Programs" title="Built for how you live.">
      <div role="tablist" aria-label="Programs" className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
        {programs.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={tab === x.id}
            onClick={() => setTab(x.id)}
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${tab === x.id ? 'text-white' : 'text-white/50 hover:text-white'}`}
          >
            {tab === x.id && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-[#13306e]" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
            <span className="relative">{x.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="card max-w-3xl p-8 sm:p-10"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-blue-300/70">{p.audience}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight">{p.headline}</h3>
          <p className="mt-4 text-lg text-white/65">{p.body}</p>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/45">{p.program}</p>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
