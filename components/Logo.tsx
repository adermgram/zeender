interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  inverted?: boolean
}

const sizes = {
  sm: { badge: 'text-xs px-1.5 py-0.5', text: 'text-base' },
  md: { badge: 'text-sm px-2 py-0.5', text: 'text-lg' },
  lg: { badge: 'text-sm px-2 py-1', text: 'text-xl' },
}

export default function Logo({ size = 'md', inverted = false }: LogoProps) {
  const s = sizes[size]
  return (
    <div className="flex items-center gap-1.5">
      {/* CV badge */}
      <span
        className={`${s.badge} font-extrabold rounded-lg leading-none ${
          inverted
            ? 'bg-white/20 text-white'
            : 'bg-brand-600 text-white'
        }`}
      >
        CV
      </span>
      {/* wordmark */}
      <span
        className={`${s.text} font-extrabold tracking-tight ${
          inverted ? 'text-white' : 'text-slate-900'
        }`}
      >
        Max
        <span className={inverted ? 'text-gold-300' : 'text-gold-500'}>
          Ghana
        </span>
      </span>
    </div>
  )
}
