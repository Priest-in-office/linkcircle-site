/**
 * Shared motion primitives. One IntersectionObserver and one scroll listener
 * serve the whole page, so adding animated elements costs no extra listeners.
 */

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

/* ---------- Enter-viewport (fires once per element) ---------- */

type InViewCallback = () => void

const inViewCallbacks = new Map<Element, InViewCallback>()
let observer: IntersectionObserver | null = null

const getObserver = (): IntersectionObserver => {
  observer ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        inViewCallbacks.get(entry.target)?.()
        unobserveInView(entry.target)
      }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  return observer
}

export const observeInView = (el: Element, callback: InViewCallback): (() => void) => {
  inViewCallbacks.set(el, callback)
  getObserver().observe(el)
  return () => unobserveInView(el)
}

function unobserveInView(el: Element) {
  inViewCallbacks.delete(el)
  observer?.unobserve(el)
}

/* ---------- Scroll frame (rAF-throttled, shared) ---------- */

type FrameCallback = () => void

const frameCallbacks = new Set<FrameCallback>()
let frameRequested = false

const runFrame = () => {
  frameRequested = false
  frameCallbacks.forEach((cb) => cb())
}

const requestFrame = () => {
  if (frameRequested) return
  frameRequested = true
  requestAnimationFrame(runFrame)
}

export const onScrollFrame = (callback: FrameCallback): (() => void) => {
  if (frameCallbacks.size === 0) {
    window.addEventListener('scroll', requestFrame, { passive: true })
    window.addEventListener('resize', requestFrame)
  }
  frameCallbacks.add(callback)
  callback()
  return () => {
    frameCallbacks.delete(callback)
    if (frameCallbacks.size === 0) {
      window.removeEventListener('scroll', requestFrame)
      window.removeEventListener('resize', requestFrame)
    }
  }
}
