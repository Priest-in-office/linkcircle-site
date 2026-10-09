import { BrandRings } from '../../components/BrandRings/BrandRings'
import { Button } from '../../components/Button/Button'
import { Icon } from '../../components/Icon/Icon'
import { Phone } from '../../components/Phone/Phone'
import { Reveal, RevealLine } from '../../components/Reveal/Reveal'
import { Section } from '../../components/Section/Section'
import { hero } from '../../content/hero'
import { cta, href, sectionIds, storeBadges } from '../../content/site'
import { CallScreen } from './CallScreen'
import styles from './Hero.module.css'

export function Hero() {
  const [firstLine, secondLine] = hero.titleLines

  return (
    <Section tone="surface" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <Reveal className={styles.badge}>
            <span className={styles.dot} />
            {hero.badge}
          </Reveal>

          <h1 className={styles.title}>
            <RevealLine delay={120}>{firstLine}</RevealLine>
            <RevealLine delay={260} className={styles.titleAccent}>
              {secondLine}
            </RevealLine>
          </h1>

          <Reveal as="p" delay={420} className={styles.lede}>
            {hero.lede}
          </Reveal>

          <Reveal delay={540} className={styles.actions}>
            <Button href={href(sectionIds.join)} elevated magnetic>
              {cta.joinWaitlist}
            </Button>
            <Button href={href(sectionIds.companion)} variant="secondary" magnetic>
              {cta.becomeCompanion}
            </Button>
          </Reveal>

          <Reveal as="a" delay={620} href={href(sectionIds.care)} className={styles.careLink}>
            {cta.forCareOrgs} <span aria-hidden="true">→</span>
          </Reveal>

          <Reveal delay={720} className={styles.stores}>
            {storeBadges.map((badge) => (
              <div key={badge.store} className={styles.store} aria-label={`${badge.store}, ${badge.status.toLowerCase()}`}>
                <Icon name={badge.icon} size={24} />
                <span className={styles.storeText}>
                  <span className={styles.storeStatus}>{badge.status}</span>
                  <span className={styles.storeName}>{badge.store}</span>
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className={styles.visual}>
          <div className={styles.stage}>
            <BrandRings
              outer={{ r: 96, color: 'var(--color-brand)' }}
              inner={{ r: 84, color: 'var(--color-accent)' }}
              strokeWidth={1.4}
              delay={200}
              stagger={250}
              className={styles.rings}
            />
            <Reveal delay={500} className={styles.phone}>
              <Phone style={{ height: '100%' }}>
                <CallScreen mode={hero.callMode} {...hero.call} />
              </Phone>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
