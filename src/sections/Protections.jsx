import { Lightbulb, Power, ShieldAlert, Smartphone } from 'lucide-react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { protections } from '../data/content'

const icons = { Lightbulb, Power, ShieldAlert, Smartphone }

export default function Protections() {
  return (
    <Section id="protections" index="03" eyebrow="Built-in protections" title="Privacy by design.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {protections.map((p, i) => {
          const Icon = icons[p.icon]
          return (
            <Reveal key={p.title} delay={i * 0.08} className="card p-6">
              <Icon className="h-6 w-6 text-blue-300" />
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">{p.body}</p>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
