import { Plus } from 'lucide-react'
import Section from '../components/Section'
import { faq } from '../data/content'

export default function FAQ() {
  return (
    <Section id="faq" index="Q&amp;A" eyebrow="Questions" title="Common questions about smart glasses privacy">
      <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
        {faq.map((f) => (
          <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {f.q}
              <Plus className="h-5 w-5 shrink-0 text-blue-300 transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <div className="mt-3 max-w-2xl leading-relaxed text-white/65">
              <p>{f.a}</p>
              {f.points && (
                <ul className="mt-3 space-y-2">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-300" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        ))}
      </div>
    </Section>
  )
}
