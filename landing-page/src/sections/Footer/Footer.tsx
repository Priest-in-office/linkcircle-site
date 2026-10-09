import { Icon } from '../../components/Icon/Icon'
import { Logo } from '../../components/Logo/Logo'
import { brand, isLive, legalLinks, socialLinks } from '../../content/site'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size="md" />
            <p className={styles.tagline}>{brand.tagline}</p>
          </div>
          <div className={styles.socials}>
            {socialLinks.filter(isLive).map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={`${brand.name} on ${s.label}`}
                className={styles.social}
                target="_blank"
                rel="noopener noreferrer"
              >
                {'icon' in s ? <Icon name={s.icon} size={s.icon === 'tiktok' ? 17 : 20} /> : s.text}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            {Object.values(legalLinks).filter(isLive).map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
          <span>
            © {brand.copyrightYear} {brand.name} · {brand.domain}
          </span>
        </div>
      </div>
    </footer>
  )
}
