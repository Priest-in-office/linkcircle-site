import { useEffect, type RefObject } from 'react'
import { onScrollFrame, prefersReducedMotion } from '../lib/motion'

/**
 * Shifts an element vertically relative to its parent as the parent crosses the
 * viewport centre. `factor` is the fraction of the offset applied (e.g. 0.06).
 */
export function useParallax(ref: RefObject<HTMLElement | null>, factor: number) {
  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent || prefersReducedMotion()) return

    return onScrollFrame(() => {
      const r = parent.getBoundingClientRect()
      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -factor
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    })
  }, [ref, factor])
}
