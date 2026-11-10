import Section from '../components/Section'
import { solution } from '../data/content'

export default function Solution() {
  return (
    <Section id="solution" eyebrow="Solution" title="The design">
      <p className="mb-10 max-w-3xl text-lg leading-relaxed text-black/70">{solution}</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="aspect-[4/3] rounded-2xl bg-neutral-200" aria-label="Screen placeholder" />
        <div className="aspect-[4/3] rounded-2xl bg-neutral-200" aria-label="Screen placeholder" />
      </div>
    </Section>
  )
}
