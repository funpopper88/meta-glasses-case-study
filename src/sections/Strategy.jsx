import { useState } from 'react'
import { Lightbulb, Power, ShieldAlert, Smartphone } from 'lucide-react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Glasses from '../components/Glasses'
import { code, ledStates, protections, strategy } from '../data/content'

const icons = { Lightbulb, Power, ShieldAlert, Smartphone }
const modes = [
  ['recording', 'Recording'],
  ['idle', 'Not recording'],
  ['covered', 'Light covered'],
]

export default function Strategy() {
  const [mode, setMode] = useState('recording')
  const s = ledStates[mode]

  return (
    <Section id="strategy" index="04" eyebrow="Strategy · Key message" title={strategy.title} intro={strategy.body}>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="card relative overflow-hidden p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,34,87,0.7),transparent_70%)]" />
          <p className="relative font-mono text-xs uppercase tracking-widest text-white/40">The proof point: see the light</p>
          <Glasses state={mode} className="relative mt-4 w-full" />
          <div className="relative mt-6 flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Glasses state">
            {modes.map(([key, label]) => (
              <button
                key={key}
                role="radio"
                aria-checked={mode === key}
                onClick={() => setMode(key)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  mode === key ? 'border-blue-300/50 bg-[#13306e] text-white' : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="relative mt-5 text-center font-mono text-sm" aria-live="polite">
            <span className={`font-semibold ${s.tone}`}>● {s.tag}</span>
            <span className="mt-1 block text-white/60">{s.text}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="card p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">What every kit, guide and post teaches</p>
          <ul className="mt-5 space-y-4">
            {protections.map((p) => {
              const Icon = icons[p.icon]
              return (
                <li key={p.title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                  <span><span className="font-semibold">{p.title}.</span> <span className="text-white/60">{p.body}</span></span>
                </li>
              )
            })}
          </ul>
          <p className="mt-7 font-mono text-xs uppercase tracking-widest text-white/40">Plus the wearer's code</p>
          <ol className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {code.map((c, i) => (
              <li key={c} className="rounded-lg border border-white/10 px-3 py-2 text-white/70">
                <span className="mr-1.5 font-mono text-blue-300/60">{i + 1}</span>{c}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
