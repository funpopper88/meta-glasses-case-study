import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Glasses from '../components/Glasses'

function RecTimer() {
  const [s, setS] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setS((v) => v + 1), 1000)
    return () => clearInterval(t)
  }, [])
  const pad = (n) => String(n).padStart(2, '0')
  return <span>{`00:${pad(Math.floor(s / 60))}:${pad(s % 60)}`}</span>
}

const corner = 'absolute h-8 w-8 border-blue-400/50'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const scale = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 10])
  const glassesOpacity = useTransform(scrollYProgress, [0, 0.45, 0.72], [1, 1, 0])
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const introY = useTransform(scrollYProgress, [0, 0.15], [0, -40])
  const hudOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const lineOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1])
  const lineScale = useTransform(scrollYProgress, [0.62, 1], [0.92, 1])

  return (
    <section ref={ref} id="top" className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-4">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/25 blur-[100px]" />

        {/* viewfinder HUD */}
        <motion.div style={{ opacity: hudOpacity }} className="pointer-events-none absolute inset-4 top-20 sm:inset-8 sm:top-24" aria-hidden>
          <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
          <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
          <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
          <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
          <div className="absolute right-4 top-3 flex items-center gap-2 font-mono text-xs tracking-widest text-white/80">
            <span className="h-2 w-2 animate-rec rounded-full bg-rec shadow-[0_0_10px_#ff3b3b]" />
            REC <RecTimer />
          </div>
          <div className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest text-blue-300/60">
            CAPTURE LED · VISIBLE
          </div>
        </motion.div>

        <motion.div
          style={{ scale, opacity: glassesOpacity, transformOrigin: '27% 52%' }}
          className="relative w-full max-w-4xl will-change-transform"
        >
          <Glasses state="recording" className="w-full drop-shadow-[0_30px_60px_rgba(37,99,235,0.35)]" />
        </motion.div>

        <motion.div style={{ opacity: introOpacity, y: introY }} className="relative mt-6 max-w-2xl text-center sm:mt-10">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-blue-300/80">Meta Glasses · Trust &amp; Safety</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span className="text-gradient">You'll always know.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">
            Your privacy and protection come first. See exactly how Meta glasses keep wearers, and everyone around them, in the loop.
          </p>
          <ChevronDown className="mx-auto mt-8 h-6 w-6 animate-bounce text-blue-300/70" aria-hidden />
        </motion.div>

        <motion.div
          style={{ opacity: lineOpacity, scale: lineScale }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <p className="text-3xl font-bold tracking-tight sm:text-5xl">
            Trust isn't told.
            <br />
            <span className="text-gradient">It's shown.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
