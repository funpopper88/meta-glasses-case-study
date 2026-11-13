import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { team } from '../data/content'
import { IS_MOBILE } from '../device'
import glassesStill from '../assets/glasses-recording.webp'

// 3D scene is code-split so the page text paints before three.js loads
const GlassesCanvas = lazy(() => import('../three/Scene'))

const cornerBase = 'absolute h-8 w-8 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
const corner = `${cornerBase} border-blue-300/40`

function DesktopHero() {
  const ref = useRef(null)
  const prevHeight = useRef(0)
  const reduce = useReducedMotion()
  // The zoom plays once; after the hero has fully left the screen it collapses
  // to a static, single-screen version (done off-screen so nothing visibly jumps).
  const [played, setPlayed] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // One smoothed progress drives the camera, fades and text so they stay in sync
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.35, restDelta: 0.0005 })

  useEffect(() => {
    if (played) return
    const check = () => {
      const el = ref.current
      if (el && el.getBoundingClientRect().bottom <= 0) {
        prevHeight.current = el.offsetHeight
        setPlayed(true)
      }
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [played])

  useLayoutEffect(() => {
    if (!played || !prevHeight.current) return
    const diff = prevHeight.current - ref.current.offsetHeight
    window.scrollTo({ top: window.scrollY - diff, behavior: 'instant' })
  }, [played])

  const canvasOpacity = useTransform(smooth, [0, 0.55, 0.75], [1, 1, 0])
  const introOpacity = useTransform(smooth, [0, 0.12], [1, 0])
  const hudOpacity = useTransform(smooth, [0, 0.3], [1, 0])
  const lineOpacity = useTransform(smooth, [0.68, 0.84], [0, 1])
  const lineY = useTransform(smooth, [0.62, 1], [16, 0])

  const animate = !played && !reduce

  // Hold the mouse over the capture light for a full second and the
  // "camera" reacts as if the light were covered: warning corners, REC stops.
  const [covered, setCovered] = useState(false)
  const holdTimer = useRef(null)
  const onLedHover = useCallback((over) => {
    clearTimeout(holdTimer.current)
    if (over) holdTimer.current = setTimeout(() => setCovered(true), 1000)
    else setCovered(false)
  }, [])
  useEffect(() => () => clearTimeout(holdTimer.current), [])

  // Warning: corners grow a little, thicken (via scale) and pulse yellow to red
  const cornerTone = covered ? 'animate-warn scale-[1.4]' : 'border-blue-300/40'

  return (
    <section ref={ref} id="top" className={`relative ${played ? 'h-svh' : 'h-[280vh]'}`}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d2257]/70 blur-[110px]" />

        <motion.div style={{ opacity: animate ? canvasOpacity : 1 }} className="absolute inset-0 will-change-[opacity]">
          <Suspense fallback={null}>
            <GlassesCanvas progress={animate ? smooth : undefined} onLedHover={onLedHover} className="h-full w-full" />
          </Suspense>
        </motion.div>

        <motion.div style={{ opacity: animate ? hudOpacity : 1 }} className={`pointer-events-none absolute inset-4 transition-[top] duration-500 sm:inset-8 ${played ? 'top-20 sm:top-24' : ''}`} aria-hidden>
          <span className={`${cornerBase} ${cornerTone} origin-top-left left-0 top-0 border-l-2 border-t-2`} />
          <span className={`${cornerBase} ${cornerTone} origin-top-right right-0 top-0 border-r-2 border-t-2`} />
          <span className={`${cornerBase} ${cornerTone} origin-bottom-left bottom-0 left-0 border-b-2 border-l-2`} />
          <span className={`${cornerBase} ${cornerTone} origin-bottom-right bottom-0 right-0 border-b-2 border-r-2`} />
          <div className={`absolute right-4 top-3 flex items-center gap-2 font-mono text-xs tracking-widest transition-colors ${covered ? 'text-amber-300' : 'text-white/80'}`}>
            <span className={`h-2 w-2 rounded-full ${covered ? 'bg-white/30' : 'animate-rec bg-rec shadow-[0_0_10px_#ff3b3b]'}`} />
            {covered ? 'LIGHT COVERED' : 'REC'}
          </div>
        </motion.div>

        <motion.div style={{ opacity: animate ? introOpacity : 1 }} className="pointer-events-none absolute inset-x-0 bottom-[12vh] px-4 text-center">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-white sm:text-4xl">META GLASSES • R.A.C.E. CAMPAIGN</h1>
          <p className="mt-4 text-sm text-white/50 sm:text-base">{team.join(', ')}</p>
          <ChevronDown className="mx-auto mt-8 h-6 w-6 animate-bounce text-white/40" aria-hidden />
        </motion.div>

        {animate && (
          <motion.p
            style={{ opacity: lineOpacity, y: lineY }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Trust isn't told. It's shown.
          </motion.p>
        )}
      </div>
    </section>
  )
}

// Phones: glasses shown as a still image at the top, no 3D or scroll zoom
function MobileHero() {
  return (
    <section id="top" className="relative h-svh overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-[38%] h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d2257]/70 blur-[90px]" />
      <div className="pointer-events-none absolute inset-4" aria-hidden>
        <span className={`${corner} left-0 top-0 border-l-2 border-t-2`} />
        <span className={`${corner} right-0 top-0 border-r-2 border-t-2`} />
        <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
        <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />
        <div className="absolute right-4 top-3 flex items-center gap-2 font-mono text-xs tracking-widest text-white/80">
          <span className="h-2 w-2 animate-rec rounded-full bg-rec shadow-[0_0_10px_#ff3b3b]" />
          REC
        </div>
      </div>
      <img
        src={glassesStill}
        alt="Starfire Kylie-style smart glasses with the white capture light on"
        width="1200"
        height="520"
        fetchPriority="high"
        className="absolute left-1/2 top-[38%] w-[125%] max-w-none -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute inset-x-0 bottom-[12vh] px-4 text-center">
        <h1 className="text-2xl font-bold tracking-[0.2em] text-white">META GLASSES • R.A.C.E. CAMPAIGN</h1>
        <p className="mt-4 text-sm text-white/50">{team.join(', ')}</p>
        <ChevronDown className="mx-auto mt-8 h-6 w-6 animate-bounce text-white/40" aria-hidden />
      </div>
    </section>
  )
}

export default function Hero() {
  return IS_MOBILE ? <MobileHero /> : <DesktopHero />
}
