import type { CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'

/**
 * The LinkCircle emblem motif: an outer ring split into two arcs and an inner
 * ring with a single gap. Arcs draw themselves in when scrolled into view.
 * Geometry is on a 200×200 viewBox; arc lengths are percentages of circumference.
 */

type Ring = { r: number; color: string }

type BrandRingsProps = {
  outer?: Ring
  inner?: Ring
  strokeWidth: number
  /** First arc delay (ms); each subsequent arc adds `stagger`. */
  delay?: number
  stagger?: number
  /** Draw immediately with no animation. */
  still?: boolean
  roundCaps?: boolean
  className?: string
  style?: CSSProperties
}

const OUTER_ARC = 47
const INNER_ARC = 78
const arcs = {
  outerA: { length: OUTER_ARC, offset: -1.5 },
  outerB: { length: OUTER_ARC, offset: -51.5 },
  inner: { length: INNER_ARC, offset: -11 },
}

export function BrandRings({
  outer,
  inner,
  strokeWidth,
  delay = 0,
  stagger = 200,
  still = false,
  roundCaps = true,
  className,
  style,
}: BrandRingsProps) {
  const [ref, inView] = useInView<SVGSVGElement>()
  const drawn = still || inView

  const segments = [
    outer && { ...arcs.outerA, ...outer },
    outer && { ...arcs.outerB, ...outer },
    inner && { ...arcs.inner, ...inner },
  ].filter((s) => !!s)

  return (
    <svg ref={ref} viewBox="0 0 200 200" aria-hidden="true" className={className} style={style}>
      {segments.map((s, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={s.r}
          pathLength={100}
          fill="none"
          stroke={s.color}
          strokeWidth={strokeWidth}
          strokeLinecap={roundCaps ? 'round' : 'butt'}
          strokeDashoffset={s.offset}
          style={{
            strokeDasharray: drawn ? `${s.length} 200` : '0 200',
            strokeOpacity: drawn ? 1 : 0,
            transition: still
              ? 'none'
              : `stroke-dasharray var(--duration-arc) var(--ease-in-out) ${delay + i * stagger}ms`,
          }}
        />
      ))}
    </svg>
  )
}
