import { useId } from 'react'

// Front-facing smart glasses. state: 'recording' | 'idle' | 'covered'
// variant 'adventurer': Meta Adventurer — rectangular classic-black frame, brown lenses.
// variant 'kylie': Meta Starfire Kylie Edition — slim oval classic-black frame,
//   black lenses, small gem on the lens.
export const VARIANTS = {
  adventurer: {
    lens: 'M92 80 C92 66 102 60 120 60 L372 60 C390 60 399 68 397 86 L389 220 C387 252 371 266 340 266 L152 266 C120 266 104 252 100 220 Z',
    frameWidth: 30,
    bridge: { d: 'M394 92 Q450 80 506 92', w: 24 },
    temple: { d: 'M96 82 L26 76', w: 24 },
    lensStops: ['#8a5a34', '#3d2414', '#140b06'],
    camera: [102, 70],
    led: [798, 70],
    rimOffset: -15,
  },
  kylie: {
    lens: 'M108 160 C108 102 166 76 248 76 C330 76 388 102 388 160 C388 218 334 250 248 250 C162 250 108 218 108 160 Z',
    frameWidth: 16,
    bridge: { d: 'M386 140 Q450 116 514 140', w: 13 },
    temple: { d: 'M116 120 L34 112', w: 14 },
    lensStops: ['#3a3a42', '#121216', '#030304'],
    camera: [126, 112],
    led: [774, 112],
    rimOffset: -8,
    gem: [168, 210],
  },
}

const MIRROR = 'translate(900 0) scale(-1 1)'

export default function Glasses({ state = 'recording', variant = 'adventurer', className = '' }) {
  const v = VARIANTS[variant]
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const ref = (n) => `${n}-${id}`
  const url = (n) => `url(#${ref(n)})`
  const recording = state === 'recording'
  const covered = state === 'covered'
  const [cx, cy] = v.camera
  const [lx, ly] = v.led

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
          <stop offset="0" stopColor={v.lensStops[0]} stopOpacity=".75" />
          <stop offset=".55" stopColor={v.lensStops[1]} stopOpacity=".92" />
          <stop offset="1" stopColor={v.lensStops[2]} stopOpacity=".97" />
        </radialGradient>
        <linearGradient id={ref('glare')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".2" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={ref('led')}>
          <stop offset="0" stopColor="#ff3b3b" stopOpacity=".85" />
          <stop offset="1" stopColor="#ff3b3b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ref('gem')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".5" stopColor="#c7d2fe" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <path id={ref('shape')} d={v.lens} />
        <clipPath id={ref('clip')}>
          <use href={`#${ref('shape')}`} />
          <use href={`#${ref('shape')}`} transform={MIRROR} />
        </clipPath>
      </defs>

      {/* temple stubs */}
      <path d={v.temple.d} stroke={url('frame')} strokeWidth={v.temple.w} strokeLinecap="round" />
      <path d={v.temple.d} stroke={url('frame')} strokeWidth={v.temple.w} strokeLinecap="round" transform={MIRROR} />

      {/* lenses */}
      <use href={`#${ref('shape')}`} fill={url('lens')} />
      <use href={`#${ref('shape')}`} fill={url('lens')} transform={MIRROR} />
      <g clipPath={url('clip')}>
        <path d="M60 40 L300 40 L120 300 L60 300 Z" fill={url('glare')} />
        <path d="M505 40 L745 40 L565 300 L505 300 Z" fill={url('glare')} />
      </g>

      {/* frame */}
      <use href={`#${ref('shape')}`} fill="none" stroke={url('frame')} strokeWidth={v.frameWidth} strokeLinejoin="round" />
      <use href={`#${ref('shape')}`} fill="none" stroke={url('frame')} strokeWidth={v.frameWidth} strokeLinejoin="round" transform={MIRROR} />
      <path d={v.bridge.d} fill="none" stroke={url('frame')} strokeWidth={v.bridge.w} strokeLinecap="round" />

      {/* rim highlight */}
      <use href={`#${ref('shape')}`} fill="none" stroke={url('rim')} strokeWidth="1.5" transform={`translate(0 ${v.rimOffset})`} />
      <use href={`#${ref('shape')}`} fill="none" stroke={url('rim')} strokeWidth="1.5" transform={`${MIRROR} translate(0 ${v.rimOffset})`} />

      {/* gem accent (Kylie Edition) */}
      {v.gem && (
        <g>
          {[v.gem, [900 - v.gem[0], v.gem[1]]].map(([gx, gy]) => (
            <path key={gx} d={`M${gx} ${gy - 7} L${gx + 5} ${gy} L${gx} ${gy + 7} L${gx - 5} ${gy} Z`} fill={url('gem')} opacity=".9" />
          ))}
        </g>
      )}

      {/* camera (viewer's left) */}
      <circle cx={cx} cy={cy} r={variant === 'kylie' ? 8 : 10} fill="#05070b" stroke="#4b5568" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={variant === 'kylie' ? 4 : 5} fill="#12234a" />
      <circle cx={cx - 2} cy={cy - 2} r="1.6" fill="#bfdbfe" />

      {/* capture LED (viewer's right) */}
      {recording && <circle cx={lx} cy={ly} r="30" fill={url('led')} className="animate-rec" />}
      <circle cx={lx} cy={ly} r="6" fill={recording ? '#ff3b3b' : '#1f2430'} stroke="#4b5568" strokeWidth="1.5" className={recording ? 'animate-rec' : ''} />
      {covered && <rect x={lx - 19} y={ly - 14} width="38" height="28" rx="8" fill="#8b8f99" stroke="#c7cad1" strokeWidth="1.5" transform={`rotate(-12 ${lx} ${ly})`} />}
    </svg>
  )
}
