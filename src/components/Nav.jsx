import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/content'

// R.A.C.E. tabs show their first letter in blue so the acronym reads across the bar
function Label({ item }) {
  if (!item.race) return item.label
  return (
    <>
      <span className="font-semibold text-blue-300">{item.label[0]}</span>
      {item.label.slice(1)}
    </>
  )
}

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  // Hidden until the reader first scrolls past the glasses animation, then stays
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return
    const check = () => {
      const hero = document.getElementById('top')
      if (!hero || hero.getBoundingClientRect().bottom <= 64) setShown(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [shown])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    // The footer is too short to reach the middle of the screen; mark Credits at the bottom
    const atBottom = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive('credits')
    }
    window.addEventListener('scroll', atBottom, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', atBottom)
    }
  }, [])

  return (
    <header
      aria-hidden={!shown}
      inert={!shown}
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/60 backdrop-blur-xl transition-transform duration-500 ease-out ${
        shown ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-end px-4 sm:px-6 md:justify-center" aria-label="Sections">
        <ul className="hidden gap-1 md:flex">
          {nav.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === s.id ? 'bg-blue-500/15 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <Label item={s} />
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
                <Label item={s} />
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
