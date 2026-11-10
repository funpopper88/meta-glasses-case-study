import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { audiences } from '../data/content'

export default function Audiences() {
  return (
    <Section id="audiences" index="03" eyebrow="Target audiences" title="Three audiences, one concern: trust." intro="Wearers and the people they see. Win over the most skeptical group and the rest follows.">
      <div className="grid gap-4 md:grid-cols-3">
        {audiences.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.08} className="card flex flex-col p-7">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-blue-300/80">{a.tag}</p>
              <p className="font-mono text-xs text-white/40">Ages {a.age}</p>
            </div>
            <h3 className="mt-3 text-xl font-semibold">{a.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{a.who}</p>
            <p className="mt-6 border-t border-white/10 pt-4 text-white/85">“{a.message}”</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
