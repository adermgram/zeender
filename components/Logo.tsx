import Image from 'next/image'

interface LogoProps {
  className?: string
  /** Height of the icon in Tailwind units, e.g. 'h-8'. Defaults to h-8 */
  size?: 'sm' | 'md' | 'lg'
  /** Invert colours for dark backgrounds */
  inverted?: boolean
}

const sizes = {
  sm: { icon: 'h-6', text: 'text-base' },
  md: { icon: 'h-8', text: 'text-lg' },
  lg: { icon: 'h-10', text: 'text-xl' },
}

export default function Logo({ size = 'md', inverted = false }: LogoProps) {
  const s = sizes[size]
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/zeender-logo.png"
        alt="Zeender"
        width={553}
        height={369}
        quality={100}
        className={`${s.icon} w-auto ${inverted ? 'brightness-0 invert' : ''}`}
        priority
      />
      <span
        className={`${s.text} font-bold tracking-tight ${inverted ? 'text-white' : 'text-slate-900'}`}
      >
        Zeender
      </span>
    </div>
  )
}
