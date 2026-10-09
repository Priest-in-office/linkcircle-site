import { BrandRings } from '../../components/BrandRings/BrandRings'
import { CallControls, StatusBar } from '../../components/Phone/Phone'
import { Photo } from '../../components/Photo/Photo'
import { media } from '../../content/media'
import styles from './CallScreen.module.css'

type CallScreenProps = {
  mode: 'video' | 'audio'
  name: string
  duration: string
}

/** In-call phone screen shown in the hero. */
export function CallScreen({ mode, name, duration }: CallScreenProps) {
  if (mode === 'audio') {
    return (
      <>
        <div className={styles.audio}>
          <div className={styles.portrait}>
            <BrandRings
              still
              roundCaps={false}
              strokeWidth={2}
              outer={{ r: 96, color: 'var(--color-brand-soft)' }}
              inner={{ r: 84, color: 'var(--color-accent)' }}
              className={styles.portraitRings}
            />
            <Photo media={media.heroAudio} shape="circle" fallback={name[0]} />
          </div>
          <span className={styles.audioName}>{name}</span>
          <span className={styles.audioMeta}>Audio call · {duration}</span>
        </div>
        <CallControls translucent={false} controls={[{ icon: 'mic' }, { icon: 'minus', hangUp: true }]} />
      </>
    )
  }

  return (
    <>
      <div className={styles.fill}>
        <Photo media={media.heroRemote} />
      </div>
      <div className={styles.scrim} />
      <StatusBar overlay />
      <div className={styles.caller}>
        <span className={styles.callerName}>{name}</span>
        <span className={styles.callerMeta}>Video call · {duration}</span>
      </div>
      <div className={styles.selfView}>
        <Photo media={media.heroSelf} />
      </div>
      <CallControls controls={[{ icon: 'mic' }, { icon: 'video' }, { icon: 'minus', hangUp: true }]} />
    </>
  )
}
