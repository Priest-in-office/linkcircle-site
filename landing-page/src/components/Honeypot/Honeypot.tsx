import { HONEYPOT_FIELD } from '../../lib/submitForm'
import styles from './Honeypot.module.css'

/**
 * Spam trap: an input real visitors never see or reach by keyboard.
 * Simple bots fill every field, and submitForm discards anything where this one has a value.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className={styles.trap}>
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
