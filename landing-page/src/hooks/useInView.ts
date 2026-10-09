import { useEffect, useRef, useState } from 'react'
import { observeInView, prefersReducedMotion } from '../lib/motion'

/** Returns a ref and whether that element has entered the viewport (latches true). */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    return observeInView(el, () => setInView(true))
  }, [inView])

  return [ref, inView] as const
}
