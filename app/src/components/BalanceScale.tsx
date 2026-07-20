// Hand-authored decorative UI for sit_with_it_card — not a payload asset.
// interaction_layout for this card type is a frontend-hardcoded constant
// ("balanced_scale"), per payload/HANDOFF-REPORT.md §3.3.
export default function BalanceScale({ active }: { active: 'left' | 'right' | null }) {
  const rotation = active === 'left' ? -8 : active === 'right' ? 8 : 0
  const colorLeft = active === 'left' ? '#D97706' : '#A8A29E'
  const colorRight = active === 'right' ? '#0D9488' : '#A8A29E'

  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 overflow-visible">
      <path d="M100,100 L90,120 L110,120 Z" fill="#1A1A1A" />
      <line x1="100" y1="40" x2="100" y2="100" stroke="#1A1A1A" strokeWidth="4" />
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: '100px 40px',
          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <line x1="40" y1="40" x2="160" y2="40" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
        <g transform="translate(40, 40)">
          <line x1="0" y1="0" x2="-15" y2="30" stroke={colorLeft} strokeWidth="1.5" />
          <line x1="0" y1="0" x2="15" y2="30" stroke={colorLeft} strokeWidth="1.5" />
          <path d="M-20,30 Q0,45 20,30 Z" fill={colorLeft} opacity="0.2" stroke={colorLeft} strokeWidth="2" />
          <circle cx="0" cy="25" r="6" fill={colorLeft} />
        </g>
        <g transform="translate(160, 40)">
          <line x1="0" y1="0" x2="-15" y2="30" stroke={colorRight} strokeWidth="1.5" />
          <line x1="0" y1="0" x2="15" y2="30" stroke={colorRight} strokeWidth="1.5" />
          <path d="M-20,30 Q0,45 20,30 Z" fill={colorRight} opacity="0.2" stroke={colorRight} strokeWidth="2" />
          <rect x="-6" y="19" width="12" height="12" fill={colorRight} />
        </g>
      </g>
    </svg>
  )
}
