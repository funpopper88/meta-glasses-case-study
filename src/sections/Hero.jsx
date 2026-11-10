import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Glasses, { VARIANTS } from '../components/Glasses'
import { team } from '../data/content'

const corner = 'absolute h-8 w-8 border-blue-300/40'
const VARIANT = 'kylie' // 'kylie' | 'adventurer'
// LED position within the 900x340 glasses viewBox
const LED_X = VARIANTS[VARIANT].led[0] / 900
const LED_Y = VARIANTS[VARIANT].led[1] / 340

function Hud({ style }) {
  return (
    <motion.div style={style} className="pointer-events-none absolute inset-4 top-20 sm:inset-8 sm:top-24" aria-hidden>
      <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
      <div className="absolute right-4 top-3 flex items-center gap-2 font-mono text-xs tracking-widest text-white/80">
        <span className="h-2 w-2 animate-rec rounded-full bg-rec shadow-[0_0_10px_#ff3b3b]" />
        REC
      </div>
    </motion.div>
  )
}

function Title({ style }) {
  return (
    <motion.div style={style} className="relative mt-8 text-center sm:mt-12">
      <h1 className="text-2xl font-bold tracking-[0.2em] text-white sm:text-4xl">META GLASSES • R.A.C.E. CAMPAIGN</h1>
      <p className="mt-4 text-sm text-white/50 sm:text-base">{team.join(', ')}</p>
      <ChevronDown className="mx-auto mt-8 h-6 w-6 animate-bounce text-white/40" aria-hidden />
    </motion.div>
  )
}

const glow = <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d2257]/70 blur-[110px]" />
const glassesClass = 'w-full drop-shadow-[0_30px_60px_rgba(13,34,87,0.6)]'

export default function Hero() {
  const ref = useRef(null)
  const prevHeight = useRef(0)
  const reduce = useReducedMotion()
  // The zoom plays once; after the first pass the hero becomes static.
  const [played, setPlayed] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v >= 1 && !played) {
      prevHeight.current = ref.current.offsetHeight
      setPlayed(true)
    }
  })

  // Collapsing the tall scroll track would jump the page; compensate.
  useLayoutEffect(() => {
    if (!played || !prevHeight.current) return
    const diff = prevHeight.current - ref.current.offsetHeight
    window.scrollTo({ top: window.scrollY - diff, behavior: 'instant' })
  }, [played])

  // Scale around the LED while sliding it to the center of the screen
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 28])
  const x = useTransform(scrollYProgress, [0, 0.4], ['0%', `${(0.5 - LED_X) * 100}%`])
  const y = useTransform(scrollYProgress, [0, 0.4], ['0%', `${(0.5 - LED_Y) * 100}%`])
  const glassesOpacity = useTransform(scrollYProgress, [0, 0.55, 0.75], [1, 1, 0])
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const hudOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const lineOpacity = useTransform(scrollYProgress, [0.65, 0.82], [0, 1])

  if (played) {
    return (
      <section ref={ref} id="top" className="relative flex h-svh flex-col items-center justify-center overflow-hidden px-4">
        {glow}
        <Hud />
        <div className="relative w-full max-w-4xl">
          <Glasses state="recording" variant={VARIANT} className={glassesClass} />
        </div>
        <Title />
      </section>
    )
  }

  return (
    <section ref={ref} id="top" className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-4">
        {glow}
        <Hud style={{ opacity: hudOpacity }} />
        <motion.div
          style={{ scale, x, y, opacity: glassesOpacity, transformOrigin: `${LED_X * 100}% ${LED_Y * 100}%` }}
          className="relative w-full max-w-4xl will-change-transform"
        >
          <Glasses state="recording" variant={VARIANT} className={glassesClass} />
        </motion.div>
        <Title style={{ opacity: introOpacity }} />
        <motion.p
          style={{ opacity: lineOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-3xl font-bold tracking-tight sm:text-5xl"
        >
          Trust isn't told. It's shown.
        </motion.p>
      </div>
    </section>
  )
}
