import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

/**
 * Progress ring that completes and draws a tick. Used for the waitlist teaser
 * (`partial`) and every form-success state (`complete`).
 */

type SuccessMarkProps = {
  state: 'empty' | 'partial' | 'complete'
  size: number
  trackColor: string
  checkColor: string
}

const PARTIAL = 72

export function SuccessMark({ state, size, trackColor, checkColor }: SuccessMarkProps) {
  // Mount at empty, then animate to the requested state on the next frame.
  const [shown, setShown] = useState<SuccessMarkProps['state']>(prefersReducedMotion() ? state : 'empty')

  useEffect(() => {
    const t = window.setTimeout(() => setShown(state), 60)
    return () => window.clearTimeout(t)
  }, [state])

  const ring = shown === 'complete' ? 100 : shown === 'partial' ? PARTIAL : 0
  const tick = shown === 'complete' ? 100 : 0
  const cap = (n: number) => (n > 0 ? 'round' : 'butt')

  return (
    <div aria-hidden="true" style={{ position: 'relative', width: size, height: size }}>
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="90" fill="none" stroke={trackColor} strokeWidth="6" />
        <circle
          cx="100"
          cy="100"
          r="90"
          pathLength={100}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap={cap(ring)}
          style={{ strokeDasharray: `${ring} 200`, transition: 'stroke-dasharray 1200ms var(--ease-out)' }}
        />
      </svg>
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0 }}>
        <path
          d="M66 102l24 24 46-50"
          pathLength={100}
          fill="none"
          stroke={checkColor}
          strokeWidth="9"
          strokeLinecap={cap(tick)}
          strokeLinejoin="round"
          style={{ strokeDasharray: `${tick} 200`, transition: 'stroke-dasharray 600ms var(--ease-out) 850ms' }}
        />
      </svg>
    </div>
  )
}
