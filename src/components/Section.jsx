import { motion } from 'motion/react'

export default function Section({ id, index, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-blue-300/80">
            <span className="text-white/30">{index} /</span> {eyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          {intro && <p className="mt-5 text-lg leading-relaxed text-white/60">{intro}</p>}
        </motion.header>
        {children}
      </div>
    </section>
  )
}
