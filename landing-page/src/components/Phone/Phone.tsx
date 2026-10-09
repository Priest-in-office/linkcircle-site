import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Icon, type IconName } from '../Icon/Icon'
import styles from './Phone.module.css'

type PhoneProps = {
  children: ReactNode
  screenColor?: string
  className?: string
  style?: CSSProperties
}

/** Device frame. Children render inside a container-query screen (use `cqw` units). */
export function Phone({ children, screenColor = 'var(--color-ink)', className, style }: PhoneProps) {
  return (
    <div className={cx(styles.phone, className)} style={style}>
      <div className={styles.frame}>
        <div className={styles.screen} style={{ background: screenColor }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/** "9:41 · notch · signal" bar. `overlay` positions it over full-bleed media in white. */
export function StatusBar({ overlay = false }: { overlay?: boolean }) {
  return (
    <div className={cx(styles.statusBar, overlay && styles.statusOverlay)}>
      <span>9:41</span>
      <span className={styles.notch} />
      <span>●●●</span>
    </div>
  )
}

type Control = { icon: IconName; hangUp?: boolean }

/** Row of round call buttons along the bottom of a call screen. */
export function CallControls({ controls, translucent = true }: { controls: Control[]; translucent?: boolean }) {
  return (
    <div className={styles.controls}>
      {controls.map(({ icon, hangUp }, i) => (
        <span
          key={i}
          className={cx(styles.control, hangUp && styles.hangUp)}
          style={!hangUp && !translucent ? { background: 'rgba(255,255,255,0.14)', backdropFilter: 'none' } : undefined}
        >
          <Icon name={icon} size="6.5cqw" strokeWidth={hangUp ? 2 : 1.8} />
        </span>
      ))}
    </div>
  )
}
