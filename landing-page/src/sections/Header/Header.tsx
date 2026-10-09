import { useCallback, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Logo } from '../../components/Logo/Logo'
import { brand, cta, href, navLinks, sectionIds } from '../../content/site'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { cx } from '../../lib/cx'
import styles from './Header.module.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useEscapeKey(closeMenu, menuOpen)

  return (
    <header className={styles.header}>
      <nav aria-label="Main" className={styles.nav}>
        <a href={href(sectionIds.top)} aria-label={`${brand.name} home`}>
          <Logo />
        </a>

        <div className={styles.desktop}>
          <div className={styles.links}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.link}>
                {link.label}
              </a>
            ))}
          </div>
          <Button href={href(sectionIds.join)} size="sm">
            {cta.joinWaitlist}
          </Button>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      <div id="mobile-menu" className={cx(styles.mobileMenu, menuOpen && styles.open)}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.mobileLink} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <Button href={href(sectionIds.join)} block className={styles.mobileCta} onClick={closeMenu}>
          {cta.joinWaitlist}
        </Button>
      </div>
    </header>
  )
}
