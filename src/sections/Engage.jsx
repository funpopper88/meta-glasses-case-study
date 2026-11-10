import { Lock } from 'lucide-react'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { engagement } from '../data/content'

export default function Engage() {
  return (
    <Section id="engage" index="07" eyebrow="Work with us" title={engagement.title} intro={engagement.body}>
      <Reveal className="card relative overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0d2257]/80 blur-3xl" />
        <ul className="relative grid gap-4 sm:grid-cols-2">
          {engagement.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-white/75">
              <Lock className="mt-1 h-4 w-4 shrink-0 text-blue-300" />
              {d}
            </li>
          ))}
        </ul>
        <p className="relative mt-10 text-2xl font-bold tracking-tight sm:text-3xl">Let's close the trust gap, together.</p>
        <p className="relative mt-2 text-white/50">Group 4</p>
      </Reveal>
    </Section>
  )
}
