import Section from '../components/Section'
import { overview, problem } from '../data/content'

export function Overview() {
  return (
    <Section id="overview" eyebrow="Overview" title="The project">
      <p className="max-w-3xl text-lg leading-relaxed text-black/70">{overview}</p>
    </Section>
  )
}

export function Problem() {
  return (
    <Section id="problem" eyebrow="Problem" title="The challenge">
      <p className="max-w-3xl text-lg leading-relaxed text-black/70">{problem}</p>
    </Section>
  )
}
