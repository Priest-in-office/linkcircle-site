import { useState, type FormEvent } from 'react'
import { Button } from '../../components/Button/Button'
import { Field } from '../../components/Field/Field'
import { Modal } from '../../components/Modal/Modal'
import { SuccessMark } from '../../components/SuccessMark/SuccessMark'
import { formSuccessTitle, interestForms, type InterestFormKind } from '../../content/forms'
import { submitForm } from '../../lib/submitForm'
import styles from './InterestModal.module.css'

const TITLE_ID = 'interest-modal-title'

/** Companion / care organisation interest form, rendered from content/forms.ts. */
export function InterestModal({ kind, onClose }: { kind: InterestFormKind; onClose: () => void }) {
  const form = interestForms[kind]
  const [sent, setSent] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await submitForm(kind, new FormData(e.currentTarget))
    setSent(true)
  }

  return (
    <Modal labelledBy={TITLE_ID} onClose={onClose}>
      {sent ? (
        <div role="status" className={styles.sent}>
          <SuccessMark state="complete" size={104} trackColor="var(--color-surface-sunken)" checkColor="var(--color-brand)" />
          <h3 id={TITLE_ID} className={styles.sentTitle}>
            {formSuccessTitle}
          </h3>
          <p className={styles.sentBody}>{form.thanks}</p>
          <Button variant="secondary" size="md" className={styles.close} onClick={onClose}>
            Close
          </Button>
        </div>
      ) : (
        <>
          <p className={styles.eyebrow}>{form.eyebrow}</p>
          <h3 id={TITLE_ID} className={styles.title}>
            {form.title}
          </h3>
          <form className={styles.form} onSubmit={onSubmit}>
            {form.fields.map((field) => (
              <Field key={field.name} {...field} />
            ))}
            <Button type="submit" block className={styles.submit}>
              {form.submitLabel}
            </Button>
          </form>
        </>
      )}
    </Modal>
  )
}
