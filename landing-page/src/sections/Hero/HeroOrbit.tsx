import type { CSSProperties } from 'react'
import { Photo } from '../../components/Photo/Photo'
import { Reveal } from '../../components/Reveal/Reveal'
import { heroPortraits } from '../../content/media'
import { cx } from '../../lib/cx'
import styles from './HeroOrbit.module.css'

/**
 * Where each portrait sits on the hero's outer ring (r = 48% of the stage).
 * `angle` is clockwise from 12 o'clock; `size` is % of the stage width.
 * The first two are the ones kept on mobile.
 */
const slots = [
  { angle: 302, size: 15 },
  { angle: 128, size: 14 },
  { angle: 58, size: 11 },
  { angle: 236, size: 12 },
]

const RING_RADIUS = 48
const MOBILE_COUNT = 2
/** Start after the rings have mostly drawn in. */
const FIRST_DELAY_MS = 900
const STAGGER_MS = 160

const position = (angle: number) => {
  const rad = (angle * Math.PI) / 180
  return { left: `${50 + RING_RADIUS * Math.sin(rad)}%`, top: `${50 - RING_RADIUS * Math.cos(rad)}%` }
}

/** Faces placed on the brand rings around the hero phone. */
export function HeroOrbit() {
  return slots.slice(0, heroPortraits.length).map((slot, i) => (
    <Reveal
      key={i}
      aria-hidden="true"
      delay={FIRST_DELAY_MS + i * STAGGER_MS}
      className={cx(styles.slot, i >= MOBILE_COUNT && styles.desktopOnly)}
      style={{ ...position(slot.angle), '--size': `${slot.size}%` } as CSSProperties}
    >
      <div className={styles.float} style={{ '--float-delay': `${-i * 1.7}s` } as CSSProperties}>
        <Photo media={heroPortraits[i]} shape="circle" />
      </div>
    </Reveal>
  ))
}
