import { cta } from './site'

export const waitlist = {
  title: 'Find your circle.',
  lede: 'Join the waitlist and be first to know when LinkCircle opens.',
  fields: {
    email: { label: 'Email address', placeholder: 'you@example.co.uk' },
    firstName: { label: 'First name (optional)', placeholder: 'First name' },
  },
  consent: "I'd like to receive updates and marketing emails from LinkCircle. You can unsubscribe at any time.",
  privacyNote: "We'll only use your details as described in our",
  success: (name?: string) => (name ? `You're on the list, ${name}.` : "You're on the list."),
  successNote: "We'll email you as soon as LinkCircle is ready.",
}

export type FieldConfig = {
  name: string
  label: string
  kind?: 'input' | 'textarea' | 'select'
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  options?: readonly string[]
}

export type InterestFormKind = 'companion' | 'care'

export type InterestFormConfig = {
  eyebrow: string
  title: string
  submitLabel: string
  thanks: string
  fields: FieldConfig[]
}

/** The two "register interest" dialogs, driven entirely by this config. */
export const interestForms: Record<InterestFormKind, InterestFormConfig> = {
  companion: {
    eyebrow: cta.becomeCompanion,
    title: cta.registerInterest,
    submitLabel: cta.registerInterest,
    thanks: "We've received your details and will be in touch as we get closer to launch.",
    fields: [
      { name: 'name', label: 'Name', required: true, autoComplete: 'name' },
      { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
      { name: 'offer', label: 'What would you offer?', kind: 'textarea', placeholder: 'Conversation, a shared interest, a talent…' },
    ],
  },
  care: {
    eyebrow: cta.forCareOrgs,
    title: cta.requestConversation,
    submitLabel: cta.requestConversation,
    thanks: "We've received your request and will be in touch to arrange a conversation.",
    fields: [
      { name: 'org', label: 'Organisation name', required: true, autoComplete: 'organization' },
      { name: 'name', label: 'Contact name', required: true, autoComplete: 'name' },
      { name: 'email', label: 'Work email', type: 'email', required: true, autoComplete: 'work email' },
      {
        name: 'type',
        label: 'Organisation type',
        kind: 'select',
        required: true,
        options: ['Care home', 'Supported living', 'Housing association', 'Home care provider', 'Local authority', 'Charity', 'Other'],
      },
      { name: 'message', label: 'Message', kind: 'textarea' },
    ],
  },
}

export const formSuccessTitle = 'Thank you.'
