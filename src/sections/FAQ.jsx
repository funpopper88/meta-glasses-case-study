import { Plus } from 'lucide-react'
import Section from '../components/Section'
import { faq } from '../data/content'

export default function FAQ() {
  return (
    <Section id="faq" index="07" eyebrow="Message toolkit · FAQ" title="Straight answers, on every channel." intro="The questions our audiences ask most, and the answers every guide, kit and post will give.">
      <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
        {faq.map((f) => (
          <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {f.q}
              <Plus className="h-5 w-5 shrink-0 text-blue-300 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="mt-3 leading-relaxed text-white/60">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
