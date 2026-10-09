import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../lib/cx'
import { Reveal } from '../Reveal/Reveal'
import styles from './Section.module.css'

type Tone = 'surface' | 'white' | 'ink' | 'brand'

type SectionProps = {
  children: ReactNode
  id?: string
  tone?: Tone
  ariaLabel?: string
  className?: string
  containerClassName?: string
  style?: CSSProperties
}

/** Full-bleed page band with a centred, max-width container. */
export function Section({ children, id, tone = 'white', ariaLabel, className, containerClassName, style }: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={cx(styles.section, styles[tone], className)} style={style}>
      <div className={cx(styles.container, containerClassName)}>{children}</div>
    </section>
  )
}

/** Media + copy columns. `minColumn` is the width at which columns stack. */
export function Split({ children, minColumn = 440, className }: { children: ReactNode; minColumn?: number; className?: string }) {
  return (
    <div className={cx(styles.split, className)} style={{ '--split-min': `${minColumn}px` } as CSSProperties}>
      {children}
    </div>
  )
}

export function Eyebrow({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal as="p" delay={delay} className={styles.eyebrow}>
      {children}
    </Reveal>
  )
}

/** Unanimated eyebrow, for sticky panels that are always on screen. */
export function StaticEyebrow({ children }: { children: ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>
}

type SectionTitleProps = {
  children: ReactNode
  delay?: number
  size?: 'lg' | 'xl'
  /** Set false when the children animate themselves (e.g. RevealLine) or the title is always on screen. */
  animate?: boolean
}

export function SectionTitle({ children, delay = 80, size = 'lg', animate = true }: SectionTitleProps) {
  const className = cx(styles.title, size === 'xl' && styles.titleXl)
  if (!animate) return <h2 className={className}>{children}</h2>
  return (
    <Reveal as="h2" delay={delay} className={className}>
      {children}
    </Reveal>
  )
}

export function SectionBody({ children, delay = 160 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal as="p" delay={delay} className={styles.body}>
      {children}
    </Reveal>
  )
}

/** Short yellow underline used as a decorative divider. */
export function AccentRule({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cx(styles.accentRule, className)} />
}
