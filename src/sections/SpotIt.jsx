import { useState } from 'react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Glasses from '../components/Glasses'
import { ledStates } from '../data/content'

const modes = [
  ['recording', 'Recording'],
  ['idle', 'Not recording'],
  ['covered', 'Light covered'],
]

export default function SpotIt() {
  const [mode, setMode] = useState('recording')
  const s = ledStates[mode]

  return (
    <Section id="spot" index="02" eyebrow="How to spot it" title="See the light." intro="Every pair has a capture light on the front. Try it.">
      <Reveal className="card relative mx-auto max-w-3xl overflow-hidden p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,34,87,0.7),transparent_70%)]" />
        <Glasses state={mode} className="relative w-full" />
        <div className="relative mt-8 flex flex-wrap justify-center gap-2" role="radiogroup" aria-label="Glasses state">
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
        <p className="relative mt-6 text-center font-mono text-sm" aria-live="polite">
          <span className={`font-semibold ${s.tone}`}>● {s.tag}</span>
          <span className="mt-1 block text-white/60">{s.text}</span>
        </p>
      </Reveal>
    </Section>
  )
}
