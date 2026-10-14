import { useState, type FormEvent } from 'react'
import { Button } from '../../components/Button/Button'
import { Checkbox, Field } from '../../components/Field/Field'
import { Honeypot } from '../../components/Honeypot/Honeypot'
import { Reveal, RevealLine } from '../../components/Reveal/Reveal'
import { Section } from '../../components/Section/Section'
import { SuccessMark } from '../../components/SuccessMark/SuccessMark'
import { formError, formSending, waitlist } from '../../content/forms'
import { cta, sectionIds } from '../../content/site'
import { useInView } from '../../hooks/useInView'
import { submitForm } from '../../lib/submitForm'
import { PrivacyNote } from '../PrivacyNote/PrivacyNote'
import styles from './JoinCta.module.css'

/** Closing call to action with the waitlist sign-up form. */
export function JoinCta() {
  const [markRef, markInView] = useInView<HTMLDivElement>()
  const [joinedName, setJoinedName] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const joined = joinedName !== null

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    const data = new FormData(e.currentTarget)
    setSending(true)
    setFailed(false)
    try {
      await submitForm('waitlist', data)
      setJoinedName(String(data.get('firstName') ?? '').trim())
    } catch (err) {
      console.error(err)
      setFailed(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <Section id={sectionIds.join} tone="brand" className={styles.join}>
      <div className={styles.inner}>
        <div ref={markRef}>
          <SuccessMark
            state={joined ? 'complete' : markInView ? 'partial' : 'empty'}
            size={112}
            trackColor="rgba(255,255,255,0.18)"
            checkColor="var(--color-white)"
          />
        </div>

        <h2 className={styles.title}>
          <RevealLine>{waitlist.title}</RevealLine>
        </h2>

        {joined ? (
          <div role="status" className={styles.success}>
            <p className={styles.successTitle}>{waitlist.success(joinedName || undefined)}</p>
            <p className={styles.successNote}>{waitlist.successNote}</p>
          </div>
        ) : (
          <>
            <Reveal as="p" delay={120} className={styles.lede}>
              {waitlist.lede}
            </Reveal>
            <form className={styles.form} onSubmit={onSubmit} aria-busy={sending}>
              <Honeypot />
              <div className={styles.fields}>
                <Field tone="onBrand" name="email" type="email" required autoComplete="email" {...waitlist.fields.email} />
                <Field tone="onBrand" name="firstName" autoComplete="given-name" {...waitlist.fields.firstName} />
              </div>
              <div className={styles.consent}>
                <Checkbox name="consent">{waitlist.consent}</Checkbox>
              </div>
              {failed && (
                <p role="alert" className={styles.error}>
                  {formError}
                </p>
              )}
              <Button type="submit" variant="accent" magnetic className={styles.submit} disabled={sending}>
                {sending ? formSending : cta.joinWaitlist}
              </Button>
              <PrivacyNote tone="onBrand" />
            </form>
          </>
        )}
      </div>
    </Section>
  )
}
