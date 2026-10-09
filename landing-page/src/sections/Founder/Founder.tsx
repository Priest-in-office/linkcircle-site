import { BrandRings } from '../../components/BrandRings/BrandRings'
import { ParallaxMedia } from '../../components/ParallaxMedia/ParallaxMedia'
import { Reveal } from '../../components/Reveal/Reveal'
import { AccentRule, Eyebrow, Section, Split } from '../../components/Section/Section'
import { media } from '../../content/media'
import { sectionIds } from '../../content/site'
import { founder } from '../../content/story'
import styles from './Founder.module.css'

export function Founder() {
  return (
    <Section id={sectionIds.founder} tone="white">
      <Split minColumn={400}>
        <div className={styles.portrait}>
          <Reveal className={styles.fill}>
            <ParallaxMedia media={media.founder} factor={0.05} objectPosition="50% 20%" />
          </Reveal>
          <BrandRings
            outer={{ r: 90, color: 'var(--color-brand)' }}
            inner={{ r: 68, color: 'var(--color-accent)' }}
            strokeWidth={5}
            className={styles.rings}
          />
        </div>

        <figure className={styles.figure}>
          <Eyebrow>{founder.eyebrow}</Eyebrow>
          <Reveal as="blockquote" delay={100} className={styles.quote}>
            “{founder.quote}”
          </Reveal>
          <Reveal as="figcaption" delay={200} className={styles.caption}>
            <AccentRule />
            <span className={styles.person}>
              <span className={styles.name}>{founder.name}</span>
              <span className={styles.role}>{founder.role}</span>
            </span>
          </Reveal>
        </figure>
      </Split>
    </Section>
  )
}
