import { Hand, Lightbulb, Mic, Power, ShieldAlert, Smartphone } from 'lucide-react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { protections } from '../data/content'

const icons = { Hand, Lightbulb, Mic, Power, ShieldAlert, Smartphone }

export default function Protections() {
  return (
    <Section
      id="protections"
      index="03"
      eyebrow="Built-in protections"
      title="Privacy by design, for wearers and bystanders."
      intro="Protection isn't a setting you have to find. It's built into the hardware, and into how your data is handled."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {protections.map((p, i) => {
          const Icon = icons[p.icon]
          return (
            <Reveal key={p.title} delay={(i % 3) * 0.08} className="card group p-7">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-900/20 ring-1 ring-blue-400/30 transition-shadow group-hover:shadow-[0_0_24px_rgba(59,130,246,0.4)]">
                <Icon className="h-5 w-5 text-blue-200" />
              </div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-white/60">{p.body}</p>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
