export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-black/10 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        )}
        {title && <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>}
        {children}
      </div>
    </section>
  )
}
