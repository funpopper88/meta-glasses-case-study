import { useState } from 'react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Glasses from '../components/Glasses'
import { ledStates, spotTips } from '../data/content'

const modes = [
  ['recording', 'Recording'],
  ['idle', 'Not recording'],
  ['covered', 'Light covered'],
]

export default function SpotIt() {
  const [mode, setMode] = useState('recording')
  const s = ledStates[mode]

  return (
    <Section
      id="spot"
      index="02"
      eyebrow="How to spot it"
      title="See the light."
      intro="Every pair of Meta glasses has a capture light on the front of the frame. Try it: switch between states below."
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="card relative overflow-hidden p-6 sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.25),transparent_70%)]" />
          <Glasses state={mode} className="relative w-full" />
          <div className="relative mt-8 flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Glasses state">
            {modes.map(([key, label]) => (
              <button
                key={key}
                role="radio"
                aria-checked={mode === key}
                onClick={() => setMode(key)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  mode === key
                    ? 'border-blue-400/60 bg-blue-500/20 text-white shadow-[0_0_24px_rgba(59,130,246,0.35)]'
                    : 'border-white/10 text-white/55 hover:border-white/25 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative mt-6 rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-sm" aria-live="polite">
            <span className={`font-semibold ${s.tone}`}>● {s.tag}</span>
            <p className="mt-1.5 text-white/65">{s.text}</p>
          </div>
        </Reveal>

        <ol className="space-y-4">
          {spotTips.map((t, i) => (
            <Reveal as="li" key={t.title} delay={i * 0.1} className="card p-6">
              <p className="font-mono text-xs text-blue-300/70">0{i + 1}</p>
              <h3 className="mt-1 text-lg font-semibold">{t.title}</h3>
              <p className="mt-1.5 text-white/60">{t.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
