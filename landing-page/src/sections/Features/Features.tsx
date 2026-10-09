import { SymbolIcon } from '../../components/Icon/Icon'
import { Reveal, RevealLine } from '../../components/Reveal/Reveal'
import { Eyebrow, Section, SectionTitle } from '../../components/Section/Section'
import { features } from '../../content/features'
import styles from './Features.module.css'

const COLUMN_STAGGER_MS = 80
const COLUMNS = 3

export function Features() {
  const [firstLine, secondLine] = features.titleLines

  return (
    <Section tone="surface">
      <div className={styles.intro}>
        <Eyebrow>{features.eyebrow}</Eyebrow>
        <SectionTitle size="xl" animate={false}>
          <RevealLine delay={80}>{firstLine}</RevealLine>
          <RevealLine delay={200} className={styles.muted}>
            {secondLine}
          </RevealLine>
        </SectionTitle>
      </div>

      <div className={styles.grid}>
        {features.items.map((item, i) => (
          <Reveal as="article" key={item.title} delay={(i % COLUMNS) * COLUMN_STAGGER_MS} className={styles.card}>
            <span className={styles.iconRing}>
              <SymbolIcon name={item.icon} />
            </span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardBody}>{item.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
