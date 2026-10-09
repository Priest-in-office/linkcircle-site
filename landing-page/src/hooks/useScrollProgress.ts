import { useEffect, useRef, type RefObject } from 'react'
import { onScrollFrame } from '../lib/motion'

/**
 * Reports how far a tall (sticky-scroll) section has been scrolled through,
 * from 0 when its top meets the viewport top to 1 when its bottom meets the viewport bottom.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
) {
  const callback = useRef(onProgress)

  useEffect(() => {
    callback.current = onProgress
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    return onScrollFrame(() => {
      const r = el.getBoundingClientRect()
      const scrollable = r.height - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -r.top / scrollable)) : 0
      callback.current(progress)
    })
  }, [ref])
}
