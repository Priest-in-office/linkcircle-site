import { useEffect, useState, type CSSProperties, type ElementType, type HTMLAttributes, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { cx } from '../../lib/cx'
import styles from './Reveal.module.css'

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  /** Stagger delay in ms. */
  delay?: number
  href?: string
}

const SETTLE_AFTER_MS = 900

/** Wraps content that fades up when it scrolls into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = window.setTimeout(() => setSettled(true), SETTLE_AFTER_MS + delay)
    return () => window.clearTimeout(t)
  }, [inView, delay])

  return (
    <Tag
      ref={ref}
      className={cx(styles.reveal, inView && styles.visible, settled && styles.settled, className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    />
  )
}

type RevealLineProps = {
  children: ReactNode
  delay?: number
  className?: string
}

/** One line of a large heading that slides up from behind a mask. */
export function RevealLine({ children, delay = 0, className }: RevealLineProps) {
  const [ref, inView] = useInView<HTMLSpanElement>()

  return (
    <span ref={ref} className={styles.lineMask}>
      <span
        className={cx(styles.line, inView && styles.lineVisible, className)}
        style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      >
        {children}
      </span>
    </span>
  )
}
