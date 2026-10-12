import { BrandRings } from '../../components/BrandRings/BrandRings'
import { SymbolIcon } from '../../components/Icon/Icon'
import { Logo } from '../../components/Logo/Logo'
import { Reveal } from '../../components/Reveal/Reveal'
import { Eyebrow, Section, SectionTitle } from '../../components/Section/Section'
import { about } from '../../content/about'
import { hero } from '../../content/hero'
import { brand, sectionIds } from '../../content/site'
import { cx } from '../../lib/cx'
import styles from './About.module.css'

const COLUMN_STAGGER_MS = 80
const COLUMNS = 3

type Statement = (typeof about)['mission']

function StatementCard({ statement, tone, delay }: { statement: Statement; tone: 'mission' | 'vision'; delay: number }) {
  return (
    <Reveal as="article" delay={delay} className={cx(styles.statement, styles[tone])}>
      {tone === 'vision' && (
        <BrandRings
          outer={{ r: 96, color: 'var(--color-brand-muted)' }}
          inner={{ r: 80, color: 'var(--color-accent)' }}
          strokeWidth={1.4}
          className={styles.statementRings}
        />
      )}
      <h3 className={styles.statementLabel}>
        <span className={styles.iconRing}>
          <SymbolIcon name={statement.icon} size={24} />
        </span>
        {statement.label}
      </h3>
      <p className={styles.statementText}>{statement.statement}</p>
    </Reveal>
  )
}

/** Mission, vision, core values and the brand sign-off. */
export function About() {
  return (
    <Section id={sectionIds.about} tone="surface">
      <div className={styles.intro}>
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <SectionTitle size="xl">{about.title}</SectionTitle>
      </div>

      <div className={styles.statements}>
        <StatementCard statement={about.mission} tone="mission" delay={0} />
        <StatementCard statement={about.vision} tone="vision" delay={COLUMN_STAGGER_MS} />
      </div>

      <Reveal as="h3" className={styles.valuesTitle}>
        {about.valuesTitle}
      </Reveal>
      <ul className={styles.values}>
        {about.values.map((value, i) => (
          <Reveal as="li" key={value.title} delay={(i % COLUMNS) * COLUMN_STAGGER_MS} className={styles.value}>
            <span className={styles.iconRing}>
              <SymbolIcon name={value.icon} size={24} />
            </span>
            <div>
              <h4 className={styles.valueTitle}>{value.title}</h4>
              <p className={styles.valueBody}>{value.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.signoff}>
        <Logo size="md" />
        <p className={styles.signoffText}>
          {hero.titleLines.join(' ')} <span className={styles.signoffAccent}>{brand.tagline}.</span>
        </p>
      </Reveal>
    </Section>
  )
}
