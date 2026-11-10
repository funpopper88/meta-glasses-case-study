import { motion } from 'motion/react'

export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </M>
  )
}
