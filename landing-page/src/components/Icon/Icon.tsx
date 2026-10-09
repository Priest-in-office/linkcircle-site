import type { CSSProperties, ReactNode } from 'react'

/** Stroked line icons (24×24 grid). */
const lineIcons = {
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2" />
      <path d="M15 10l6-3v10l-6-3z" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  minus: <path d="M6 12h12" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
    </>
  ),
} satisfies Record<string, ReactNode>

/** Filled brand marks. */
const solidIcons = {
  apple: (
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  ),
  googlePlay: (
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof lineIcons | keyof typeof solidIcons

type IconProps = {
  name: IconName
  size?: number | string
  strokeWidth?: number
  className?: string
  style?: CSSProperties
}

export function Icon({ name, size = 24, strokeWidth = 1.6, className, style }: IconProps) {
  const dims = { width: size, height: size, flex: 'none', ...style }

  if (name in solidIcons) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className} style={dims}>
        {solidIcons[name as keyof typeof solidIcons]}
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={dims}
    >
      {lineIcons[name as keyof typeof lineIcons]}
    </svg>
  )
}

/** Material Symbols ligature icon (font loaded in index.html). */
export function SymbolIcon({ name, size = 26 }: { name: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: 'var(--font-icons)',
        fontSize: size,
        fontWeight: 300,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        fontFeatureSettings: "'liga'",
        fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
      }}
    >
      {name}
    </span>
  )
}
