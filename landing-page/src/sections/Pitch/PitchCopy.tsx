import { Button } from '../../components/Button/Button'
import { Reveal } from '../../components/Reveal/Reveal'
import { Eyebrow, SectionBody, SectionTitle } from '../../components/Section/Section'

type PitchCopyProps = {
  eyebrow: string
  title: string
  body: string
  actionLabel: string
  actionVariant?: 'primary' | 'secondary'
  onAction: () => void
}

/** Eyebrow, headline, paragraph and button — the text column shared by audience pitch sections. */
export function PitchCopy({ eyebrow, title, body, actionLabel, actionVariant = 'primary', onAction }: PitchCopyProps) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionTitle>{title}</SectionTitle>
      <SectionBody>{body}</SectionBody>
      <Reveal delay={240} style={{ marginTop: 40 }}>
        <Button variant={actionVariant} elevated={actionVariant === 'primary'} magnetic onClick={onAction}>
          {actionLabel}
        </Button>
      </Reveal>
    </div>
  )
}
