import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Lock } from 'lucide-react'
import Section from '../components/Section'
import { tactics } from '../data/content'

export default function Tactics() {
  const [tab, setTab] = useState(tactics[0].id)
  const t = tactics.find((x) => x.id === tab)

  return (
    <Section id="tactics" index="05" eyebrow="Communication · Tactics" title="Real experiences. Credible voices." intro="One tactic per audience, each answering that audience's biggest concern. The full playbook is part of the engagement.">
      <div role="tablist" aria-label="Tactics" className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
        {tactics.map((x) => (
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
          key={t.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="card grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.4fr]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-blue-300/70">{t.audience}</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight">{t.headline}</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{t.teaser}</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-white/40">Measured by</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.kpis.map((k) => (
                <span key={k} className="rounded-full border border-blue-300/20 bg-[#0d2257]/40 px-3 py-1 text-xs text-blue-100/80">{k}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-white/15 bg-black/30 p-6">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50">
              <Lock className="h-3.5 w-3.5" /> Included in the full playbook
            </p>
            <ul className="mt-5 space-y-4">
              {t.locked.map((it) => (
                <li key={it} className="flex items-center gap-3 text-white/60">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300/60" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
