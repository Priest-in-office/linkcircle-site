import { BrandRings } from '../../components/BrandRings/BrandRings'
import { ParallaxMedia } from '../../components/ParallaxMedia/ParallaxMedia'
import { Section } from '../../components/Section/Section'
import { media } from '../../content/media'
import { cta, sectionIds } from '../../content/site'
import { carePitch } from '../../content/story'
import { PitchCopy } from './PitchCopy'
import styles from './Pitch.module.css'

export function CarePitch({ onRequest }: { onRequest: () => void }) {
  return (
    <Section id={sectionIds.care} tone="white">
      <div className={styles.careLayout}>
        <div className={styles.careCopy}>
          <PitchCopy
            eyebrow={cta.forCareOrgs}
            title={carePitch.title}
            body={carePitch.body}
            actionLabel={cta.requestConversation}
            actionVariant="secondary"
            onAction={onRequest}
          />
        </div>
        <div className={styles.careVisual}>
          <div className={styles.portraitStage}>
            <ParallaxMedia media={media.care} />
            <BrandRings inner={{ r: 90, color: 'var(--color-accent)' }} strokeWidth={6} className={styles.cornerRing} />
          </div>
        </div>
      </div>
    </Section>
  )
}
