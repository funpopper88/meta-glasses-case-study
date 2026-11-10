import Section from '../components/Section'
import { process } from '../data/content'

export default function Process() {
  return (
    <Section id="process" eyebrow="Process" title="How we got there">
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((p) => (
          <li key={p.step}>
            <span className="font-mono text-sm text-accent">{p.step}</span>
            <h3 className="mt-2 mb-2 text-lg font-semibold">{p.title}</h3>
            <p className="text-black/60">{p.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
