import { useRef, useState } from 'react'
import { Phone } from '../../components/Phone/Phone'
import { SectionTitle, StaticEyebrow } from '../../components/Section/Section'
import { howItWorks } from '../../content/howItWorks'
import { sectionIds } from '../../content/site'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { cx } from '../../lib/cx'
import { BookScreen, ConnectScreen, ExploreScreen } from './AppScreens'
import styles from './HowItWorks.module.css'

/** One phone screen per step, in step order. */
const screens = [ExploreScreen, BookScreen, ConnectScreen]

const stepForProgress = (p: number) => Math.min(howItWorks.steps.length - 1, Math.floor(p * howItWorks.steps.length))

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)

  useScrollProgress(sectionRef, (progress) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    setStep(stepForProgress(progress))
  })

  const current = howItWorks.steps[step]

  return (
    <section ref={sectionRef} id={sectionIds.how} className={styles.how}>
      <div className={styles.sticky}>
        <div className={styles.grid}>
          <div>
            <StaticEyebrow>{howItWorks.eyebrow}</StaticEyebrow>
            <SectionTitle size="xl" animate={false}>
              {howItWorks.title}
            </SectionTitle>
            <div className={styles.track}>
              <div ref={barRef} className={styles.bar} />
            </div>

            <ol className={styles.steps}>
              {howItWorks.steps.map((s, i) => (
                <li key={s.title} className={cx(styles.step, i === step && styles.stepActive)}>
                  <span className={styles.number}>{i + 1}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.compact} aria-live="polite">
              <span className={styles.number}>{step + 1}</span>
              <div>
                <h3 className={styles.stepTitle}>{current.title}</h3>
                <p className={styles.stepBody}>{current.body}</p>
              </div>
            </div>
          </div>

          <div className={styles.phoneWrap}>
            <Phone className={styles.phone} screenColor="var(--color-surface)">
              {screens.map((Screen, i) => (
                <div
                  key={i}
                  aria-hidden={i !== step}
                  className={cx(styles.screenLayer, i < step && styles.screenPast, i === step && styles.screenCurrent)}
                >
                  <Screen />
                </div>
              ))}
            </Phone>
          </div>
        </div>
      </div>
    </section>
  )
}
