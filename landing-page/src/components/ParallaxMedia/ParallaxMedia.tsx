import { useRef, type CSSProperties } from 'react'
import type { Media } from '../../content/media'
import { useParallax } from '../../hooks/useParallax'
import { Photo } from '../Photo/Photo'

type ParallaxMediaProps = {
  media: Media
  /** Clipping frame shape. */
  radius?: CSSProperties['borderRadius']
  inset?: CSSProperties['inset']
  /** Fraction of scroll offset applied to the image. */
  factor?: number
  objectPosition?: string
}

/** A clipped photo frame whose image drifts gently as the page scrolls. */
export function ParallaxMedia({ media, radius = 'var(--radius-media)', inset = 0, factor = 0.06, objectPosition }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null)
  useParallax(ref, factor)
  const bleed = `${Math.round(factor * 130)}%`

  return (
    <div style={{ position: 'absolute', inset, borderRadius: radius, overflow: 'hidden', background: 'var(--color-surface-sunken)' }}>
      <div ref={ref} style={{ position: 'absolute', left: 0, right: 0, top: `-${bleed}`, bottom: `-${bleed}` }}>
        <Photo media={media} objectPosition={objectPosition} />
      </div>
    </div>
  )
}
