import type { CSSProperties } from 'react'
import type { Media } from '../../content/media'

type PhotoProps = {
  media?: Media
  /** Shown when there is no image (e.g. initials for an avatar). */
  fallback?: string
  shape?: 'rect' | 'circle'
  objectPosition?: string
  style?: CSSProperties
}

/** Fills its container with a cover-fit image, or a soft placeholder when none is set. */
export function Photo({ media, fallback, shape = 'rect', objectPosition = '50% 50%', style }: PhotoProps) {
  const base: CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: shape === 'circle' ? '50%' : undefined,
    ...style,
  }

  if (media?.src) {
    return (
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
        style={{ ...base, objectFit: 'cover', objectPosition }}
      />
    )
  }

  return (
    <div
      role={media?.alt ? 'img' : undefined}
      aria-label={media?.alt || undefined}
      aria-hidden={media?.alt ? undefined : true}
      style={{
        ...base,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--color-surface-sunken), var(--color-ink-subtle))',
        color: 'var(--color-brand)',
        fontWeight: 700,
        containerType: 'inline-size',
      }}
    >
      {fallback && <span style={{ fontSize: '40cqi' }}>{fallback}</span>}
    </div>
  )
}
