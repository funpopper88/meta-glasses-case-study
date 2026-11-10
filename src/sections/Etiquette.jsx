import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { code } from '../data/content'

export default function Etiquette() {
  return (
    <Section
      id="etiquette"
      index="04"
      eyebrow="The wearer's code"
      title="Live it, don't film it."
      intro="Great tech needs good manners. Here's how to wear smart glasses so everyone around you stays comfortable."
    >
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {code.map((c, i) => (
          <Reveal as="li" key={c.title} delay={(i % 3) * 0.06} className="bg-ink p-7 transition-colors hover:bg-blue-950/30">
            <span className="font-mono text-3xl font-bold text-blue-400/40">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
            <p className="mt-1.5 text-white/55">{c.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
