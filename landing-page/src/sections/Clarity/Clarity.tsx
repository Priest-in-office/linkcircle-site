import { BrandRings } from '../../components/BrandRings/BrandRings'
import { Reveal } from '../../components/Reveal/Reveal'
import { AccentRule, Section } from '../../components/Section/Section'
import { clarity } from '../../content/story'
import styles from './Clarity.module.css'

/** Statement of what LinkCircle is (and is not). */
export function Clarity() {
  return (
    <Section tone="ink" className={styles.clarity}>
      <BrandRings
        outer={{ r: 96, color: 'var(--color-brand-muted)' }}
        strokeWidth={0.35}
        roundCaps={false}
        className={styles.rings}
      />
      <div className={styles.content}>
        <Reveal>
          <AccentRule />
        </Reveal>
        <Reveal as="p" delay={120} className={styles.statement}>
          {clarity.statement} <span className={styles.muted}>{clarity.disclaimer}</span>
        </Reveal>
      </div>
    </Section>
  )
}
