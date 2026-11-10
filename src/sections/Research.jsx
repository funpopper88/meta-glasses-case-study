import Section from '../components/Section'
import { research } from '../data/content'

export default function Research() {
  return (
    <Section id="research" eyebrow="Research" title="What we learned">
      <div className="grid gap-6 sm:grid-cols-3">
        {research.map((r) => (
          <article key={r.title} className="rounded-2xl border border-black/10 bg-white p-6">
            <h3 className="mb-2 font-semibold">{r.title}</h3>
            <p className="text-black/60">{r.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
