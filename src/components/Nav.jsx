import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/content'

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-rec rounded-full bg-rec" />
          </span>
          Meta Glasses <span className="font-normal text-white/40">/ Trust &amp; Safety</span>
        </a>
        <ul className="hidden gap-1 md:flex">
          {nav.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === s.id ? 'bg-blue-500/15 text-blue-200' : 'text-white/55 hover:text-white'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-white/5 px-4 pb-4 md:hidden">
          {nav.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} onClick={() => setOpen(false)} className="block py-2.5 text-white/70">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
