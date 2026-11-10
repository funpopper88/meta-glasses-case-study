import Section from '../components/Section'
import { outcomes } from '../data/content'

export default function Outcomes() {
  return (
    <Section id="outcomes" eyebrow="Outcomes" title="Impact">
      <div className="grid gap-6 sm:grid-cols-3">
        {outcomes.map((o) => (
          <div key={o.label} className="rounded-2xl bg-ink p-8 text-paper">
            <p className="text-4xl font-bold">{o.metric}</p>
            <p className="mt-2 text-white/60">{o.label}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
