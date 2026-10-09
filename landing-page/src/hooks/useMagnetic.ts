import { useEffect, type RefObject } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../lib/motion'

const PULL_X = 0.18
const PULL_Y = 0.3

/** Makes an element drift toward the cursor while hovered (fine pointers only). */
export function useMagnetic(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || prefersReducedMotion() || !hasFinePointer()) return

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      el.style.transform = `translate(${x * PULL_X}px, ${y * PULL_Y}px)`
    }
    const leave = () => {
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [ref, enabled])
}
