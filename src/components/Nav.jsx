import { meta, sections } from '../data/content'

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-paper/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-bold tracking-tight">{meta.title}</a>
        <ul className="hidden gap-6 text-sm text-black/60 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="transition-colors hover:text-ink">{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
