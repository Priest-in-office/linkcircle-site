import { BrandRings } from '../../components/BrandRings/BrandRings'
import { ParallaxMedia } from '../../components/ParallaxMedia/ParallaxMedia'
import { Section, Split } from '../../components/Section/Section'
import { media } from '../../content/media'
import { cta, sectionIds } from '../../content/site'
import { companionPitch } from '../../content/story'
import { PitchCopy } from './PitchCopy'
import styles from './Pitch.module.css'

export function CompanionPitch({ onRegister }: { onRegister: () => void }) {
  return (
    <Section id={sectionIds.companion} tone="surface">
      <Split>
        <div className={styles.circleStage}>
          <BrandRings outer={{ r: 98, color: 'var(--color-brand)' }} strokeWidth={1.2} className={styles.circleRings} />
          <ParallaxMedia media={media.companion} radius="50%" inset="7%" />
          <span className={styles.accentDot} />
        </div>
        <PitchCopy
          eyebrow={cta.becomeCompanion}
          title={companionPitch.title}
          body={companionPitch.body}
          actionLabel={cta.registerInterest}
          onAction={onRegister}
        />
      </Split>
    </Section>
  )
}
