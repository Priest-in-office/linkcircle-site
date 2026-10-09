/** Site-wide copy and navigation. Anything shown in more than one section lives here. */

export const brand = {
  name: 'LinkCircle',
  tagline: 'Find your circle today',
  domain: 'www.LinkCircle.co.uk',
  copyrightYear: 2026,
} as const

/** Anchor ids shared by navigation links and the sections they point to. */
export const sectionIds = {
  top: 'top',
  how: 'how',
  founder: 'founder',
  companion: 'companion',
  care: 'care',
  join: 'join',
} as const

export const href = (id: string) => `#${id}`

/** Call-to-action labels reused across header, hero, sections and forms. */
export const cta = {
  joinWaitlist: 'Join the Waitlist',
  becomeCompanion: 'Become a Companion',
  forCareOrgs: 'For Care Organisations',
  registerInterest: 'Register your interest',
  requestConversation: 'Request a conversation',
} as const

export const navLinks = [
  { label: 'How it works', href: href(sectionIds.how) },
  { label: cta.becomeCompanion, href: href(sectionIds.companion) },
  { label: cta.forCareOrgs, href: href(sectionIds.care) },
] as const

export const storeBadges = [
  { store: 'App Store', icon: 'apple', status: 'Coming soon' },
  { store: 'Google Play', icon: 'googlePlay', status: 'Coming soon' },
] as const

export const socialLinks = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'Facebook', href: '#', text: 'f' },
  { label: 'LinkedIn', href: '#', text: 'in' },
] as const

export const legalLinks = {
  privacy: { label: 'Privacy Policy', href: '#' },
  terms: { label: 'Terms', href: '#' },
  cookies: { label: 'Cookie Policy', href: '#' },
  accessibility: { label: 'Accessibility', href: '#' },
  contact: { label: 'Contact', href: '#' },
} as const
