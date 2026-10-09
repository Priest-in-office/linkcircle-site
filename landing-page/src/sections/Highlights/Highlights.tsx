import { Icon } from '../../components/Icon/Icon'
import { Reveal } from '../../components/Reveal/Reveal'
import { highlights } from '../../content/hero'
import styles from './Highlights.module.css'

/** Thin strip of product highlights beneath the hero. */
export function Highlights() {
  return (
    <section aria-label="Highlights" className={styles.strip}>
      <Reveal as="ul" className={styles.list}>
        {highlights.map((item) => (
          <li key={item.label} className={styles.item}>
            <Icon name={item.icon} size={22} className={styles.icon} />
            {item.label}
          </li>
        ))}
      </Reveal>
    </section>
  )
}
