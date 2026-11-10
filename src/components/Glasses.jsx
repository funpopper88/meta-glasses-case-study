import { useId } from 'react'

// Front-facing generic smart glasses. state: 'recording' | 'idle' | 'covered'
const LENS =
  'M95 95 C95 70 110 62 140 62 L355 62 C385 62 398 72 395 100 L385 215 C380 262 350 280 300 280 L190 280 C140 280 112 262 104 220 Z'
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
          <stop offset="0" stopColor="#3b4252" />
          <stop offset=".45" stopColor="#161a23" />
          <stop offset="1" stopColor="#07090d" />
        </linearGradient>
        <linearGradient id={ref('rim')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0" />
          <stop offset=".5" stopColor="#93c5fd" stopOpacity=".85" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ref('lens')} cx=".45" cy=".35" r=".85">
          <stop offset="0" stopColor="#1d4ed8" stopOpacity=".55" />
          <stop offset=".55" stopColor="#0b1633" stopOpacity=".9" />
          <stop offset="1" stopColor="#02040a" stopOpacity=".97" />
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
      <path d="M100 90 L28 82" stroke={url('frame')} strokeWidth="24" strokeLinecap="round" />
      <path d="M800 90 L872 82" stroke={url('frame')} strokeWidth="24" strokeLinecap="round" />

      {/* lenses */}
      <use href={`#${ref('shape')}`} fill={url('lens')} />
      <use href={`#${ref('shape')}`} fill={url('lens')} transform={MIRROR} />
      <g clipPath={url('clip')}>
        <path d="M60 40 L300 40 L120 300 L60 300 Z" fill={url('glare')} />
        <path d="M505 40 L745 40 L565 300 L505 300 Z" fill={url('glare')} />
      </g>

      {/* frame */}
      <use href={`#${ref('shape')}`} fill="none" stroke={url('frame')} strokeWidth="26" strokeLinejoin="round" />
      <use href={`#${ref('shape')}`} fill="none" stroke={url('frame')} strokeWidth="26" strokeLinejoin="round" transform={MIRROR} />
      <path d="M390 104 Q450 74 510 104" fill="none" stroke={url('frame')} strokeWidth="22" strokeLinecap="round" />

      {/* blue rim light */}
      <use href={`#${ref('shape')}`} fill="none" stroke={url('rim')} strokeWidth="1.5" transform="translate(0 -13)" />
      <use href={`#${ref('shape')}`} fill="none" stroke={url('rim')} strokeWidth="1.5" transform={`${MIRROR} translate(0 -13)`} />

      {/* camera (viewer's left) */}
      <circle cx="104" cy="74" r="11" fill="#05070b" stroke="#4b5568" strokeWidth="2" />
      <circle cx="104" cy="74" r="5.5" fill="#12234a" />
      <circle cx="101.5" cy="71.5" r="1.8" fill="#bfdbfe" />

      {/* capture LED (viewer's right) */}
      {recording && <circle cx="796" cy="74" r="30" fill={url('led')} className="animate-rec" />}
      <circle cx="796" cy="74" r="6.5" fill={recording ? '#ff3b3b' : '#1f2430'} stroke="#4b5568" strokeWidth="1.5" className={recording ? 'animate-rec' : ''} />
      {covered && <rect x="778" y="60" width="38" height="28" rx="8" fill="#8b8f99" stroke="#c7cad1" strokeWidth="1.5" transform="rotate(-12 797 74)" />}
    </svg>
  )
}
