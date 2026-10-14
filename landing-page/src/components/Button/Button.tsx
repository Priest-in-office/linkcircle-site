import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'
import { cx } from '../../lib/cx'
import styles from './Button.module.css'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  /** Renders an anchor when set. */
  href?: string
  /** Brand drop shadow. */
  elevated?: boolean
  /** Drifts toward the cursor on hover. */
  magnetic?: boolean
  block?: boolean
  className?: string
  onClick?: () => void
  disabled?: boolean
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  href,
  elevated,
  magnetic,
  block,
  className,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  useMagnetic(ref, magnetic)

  const classes = cx(
    styles.button,
    styles[variant],
    styles[size],
    elevated && styles.elevated,
    block && styles.block,
    className,
  )

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
