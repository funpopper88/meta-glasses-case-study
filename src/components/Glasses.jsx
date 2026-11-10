import { useId } from 'react'

// Front-facing smart glasses styled after the Meta Adventurer:
// rectangular classic-black frame, warm brown-tinted lenses. state: 'recording' | 'idle' | 'covered'
const LENS =
  'M92 80 C92 66 102 60 120 60 L372 60 C390 60 399 68 397 86 L389 220 C387 252 371 266 340 266 L152 266 C120 266 104 252 100 220 Z'
const MIRROR = 'translate(900 0) scale(-1 1)'

export default function Glasses({ state = 'recording', className = '' }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const ref = (n) => `${n}-${id}`
  const url = (n) => `url(#${ref(n)})`
  const recording = state === 'recording'
  const covered = state === 'covered'

  return (
    <svg
      viewBox="0 0 900 340"
      className={className}
      role="img"
      aria-label={`Smart glasses, front view. Capture light ${recording ? 'on' : covered ? 'covered' : 'off'}.`}
    >
      <defs>
        <linearGradient id={ref('frame')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a3f" />
          <stop offset=".18" stopColor="#141416" />
          <stop offset="1" stopColor="#050506" />
        </linearGradient>
        <linearGradient id={ref('rim')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".5" stopColor="#ffffff" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ref('lens')} cx=".45" cy=".35" r=".85">
          <stop offset="0" stopColor="#8a5a34" stopOpacity=".75" />
          <stop offset=".55" stopColor="#3d2414" stopOpacity=".92" />
          <stop offset="1" stopColor="#140b06" stopOpacity=".97" />
        </radialGradient>
        <linearGradient id={ref('glare')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".2" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ref('led')}>
          <stop offset="0" stopColor="#ff3b3b" stopOpacity=".85" />
          <stop offset="1" stopColor="#ff3b3b" stopOpacity="0" />
        </radialGradient>
        <path id={ref('shape')} d={LENS} />
        <clipPath id={ref('clip')}>
          <use href={`#${ref('shape')}`} />
          <use href={`#${ref('shape')}`} transform={MIRROR} />
        </clipPath>
      </defs>

      {/* temple stubs */}
      <path d="M96 82 L26 76" stroke={url('frame')} strokeWidth="24" strokeLinecap="round" />
      <path d="M804 82 L874 76" stroke={url('frame')} strokeWidth="24" strokeLinecap="round" />

      {/* lenses */}
      <use href={`#${ref('shape')}`} fill={url('lens')} />
      <use href={`#${ref('shape')}`} fill={url('lens')} transform={MIRROR} />
      <g clipPath={url('clip')}>
        <path d="M60 40 L300 40 L120 300 L60 300 Z" fill={url('glare')} />
        <path d="M505 40 L745 40 L565 300 L505 300 Z" fill={url('glare')} />
      </g>

      {/* frame */}
      <use href={`#${ref('shape')}`} fill="none" stroke={url('frame')} strokeWidth="30" strokeLinejoin="round" />
      <use href={`#${ref('shape')}`} fill="none" stroke={url('frame')} strokeWidth="30" strokeLinejoin="round" transform={MIRROR} />
      <path d="M394 92 Q450 80 506 92" fill="none" stroke={url('frame')} strokeWidth="24" strokeLinecap="round" />

      {/* blue rim light */}
      <use href={`#${ref('shape')}`} fill="none" stroke={url('rim')} strokeWidth="1.5" transform="translate(0 -15)" />
      <use href={`#${ref('shape')}`} fill="none" stroke={url('rim')} strokeWidth="1.5" transform={`${MIRROR} translate(0 -15)`} />

      {/* camera (viewer's left) */}
      <circle cx="102" cy="70" r="10" fill="#05070b" stroke="#4b5568" strokeWidth="2" />
      <circle cx="102" cy="70" r="5" fill="#12234a" />
      <circle cx="99.8" cy="67.8" r="1.8" fill="#bfdbfe" />

      {/* capture LED (viewer's right) */}
      {recording && <circle cx="798" cy="70" r="30" fill={url('led')} className="animate-rec" />}
      <circle cx="798" cy="70" r="6.5" fill={recording ? '#ff3b3b' : '#1f2430'} stroke="#4b5568" strokeWidth="1.5" className={recording ? 'animate-rec' : ''} />
      {covered && <rect x="779" y="56" width="38" height="28" rx="8" fill="#8b8f99" stroke="#c7cad1" strokeWidth="1.5" transform="rotate(-12 798 70)" />}
    </svg>
  )
}
