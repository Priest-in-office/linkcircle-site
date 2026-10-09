import type { ReactNode } from 'react'
import type { FieldConfig } from '../../content/forms'
import { cx } from '../../lib/cx'
import styles from './Field.module.css'

type FieldProps = FieldConfig & {
  tone?: 'default' | 'onBrand'
}

/** Labelled input, textarea or select, rendered from a FieldConfig. */
export function Field({ name, label, kind = 'input', type = 'text', required, autoComplete, placeholder, options, tone = 'default' }: FieldProps) {
  const common = { name, required, autoComplete, placeholder, className: styles.control }

  return (
    <label className={cx(styles.label, styles[tone])}>
      {label}
      {kind === 'textarea' && <textarea rows={4} {...common} />}
      {kind === 'select' && (
        <select {...common} defaultValue="">
          <option value="">Select…</option>
          {options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
      {kind === 'input' && <input type={type} {...common} />}
    </label>
  )
}

export function Checkbox({ name, children }: { name: string; children: ReactNode }) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" name={name} />
      <span>{children}</span>
    </label>
  )
}
