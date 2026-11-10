import { meta } from '../data/content'

export default function Hero() {
  const details = [
    ['Role', meta.role],
    ['Timeline', meta.timeline],
    ['Team', meta.team],
    ['Tools', meta.tools.join(', ')],
  ]
  return (
    <section id="top" className="mx-auto max-w-5xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">Case Study</p>
      <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">{meta.title}</h1>
      <p className="mt-6 max-w-2xl text-xl text-black/60">{meta.subtitle}</p>
      <div className="mt-12 aspect-video w-full rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300" aria-label="Hero image placeholder" />
      <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {details.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs uppercase tracking-widest text-black/40">{k}</dt>
            <dd className="mt-1 font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
