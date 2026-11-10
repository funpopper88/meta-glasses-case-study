import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { code } from '../data/content'

export default function Etiquette() {
  return (
    <Section id="etiquette" index="04" eyebrow="The wearer's code" title="Live it, don't film it.">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {code.map((c, i) => (
          <Reveal as="li" key={c} delay={i * 0.06} className="card p-6">
            <span className="font-mono text-sm text-blue-300/60">{String(i + 1).padStart(2, '0')}</span>
            <p className="mt-2 font-semibold">{c}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
