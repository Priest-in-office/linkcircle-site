import { privacyNote } from '../../content/forms'
import { legalLinks } from '../../content/site'
import { cx } from '../../lib/cx'
import styles from './PrivacyNote.module.css'

/** "We'll only use your details as described in our Privacy Policy." Shown under every form. */
export function PrivacyNote({ tone = 'default' }: { tone?: 'default' | 'onBrand' }) {
  return (
    <p className={cx(styles.note, styles[tone])}>
      {privacyNote}{' '}
      <a href={legalLinks.privacy.href} target="_blank" rel="noopener">
        {legalLinks.privacy.label}
      </a>
      .
    </p>
  )
}
