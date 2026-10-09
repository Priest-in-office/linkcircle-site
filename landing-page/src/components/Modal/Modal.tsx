import { useEffect, useRef, type ReactNode } from 'react'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import styles from './Modal.module.css'

type ModalProps = {
  children: ReactNode
  labelledBy: string
  onClose: () => void
}

/** Centred dialog over a blurred backdrop. Closes on backdrop click, × or Escape. */
export function Modal({ children, labelledBy, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useEscapeKey(onClose)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()
    return () => previous?.focus()
  }, [])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" aria-label="Close" className={styles.close} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
