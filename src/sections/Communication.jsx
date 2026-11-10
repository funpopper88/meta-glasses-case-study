import { Suspense, lazy, useState } from 'react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { audiences, ledStates, strategy } from '../data/content'

const GlassesCanvas = lazy(() => import('../three/Scene'))
const DEMO_POSE = { rotY: -0.06, rotX: 0.03, y: 0, minZ: 3.4, fit: 3.3 }

const modes = [
  ['recording', 'Recording'],
  ['idle', 'Not recording'],
  ['covered', 'Light covered'],
]

export default function Communication() {
  const [mode, setMode] = useState('recording')
  const s = ledStates[mode]

  return (
    <Section id="communication" index="C" eyebrow="Communication" title="Audiences and approach" intro={strategy}>
      <div className="grid gap-4 md:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.08} className="card flex flex-col p-7">
            <p className="font-mono text-xs text-white/40">Ages {a.age}</p>
            <h3 className="mt-2 text-xl font-semibold">{a.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{a.who}</p>
            <p className="mt-auto border-t border-white/10 pt-4 text-sm leading-relaxed text-white/80">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-blue-300/70">Approach</span>
              {a.direction}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal className="card relative mt-4 overflow-hidden p-6 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,34,87,0.7),transparent_70%)]" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="aspect-[16/8] w-full">
            <Suspense fallback={null}>
              <GlassesCanvas state={mode} pose={DEMO_POSE} className="h-full w-full" />
            </Suspense>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">Core message</p>
            <p className="mt-2 text-lg text-white/80">Every channel teaches people how to tell when glasses are recording.</p>
            <div className="mt-6 flex flex-wrap gap-2" role="radiogroup" aria-label="Glasses state">
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
            <p className="mt-4 text-sm text-white/60" aria-live="polite">
              <span className={`font-mono font-semibold ${s.tone}`}>● {s.tag}</span>
              <span className="mt-1 block">{s.text}</span>
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
