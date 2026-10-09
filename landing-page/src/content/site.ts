/** Site-wide copy and navigation. Anything shown in more than one section lives here. */

export const brand = {
  name: 'LinkCircle',
  tagline: 'Find your circle today',
  domain: 'www.LinkCircle.co.uk',
  email: 'info@linkcircle.co.uk',
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

/** Page paths. Keep in sync with the HTML entries in vite.config.ts. */
export const pages = {
  home: '/',
  privacy: '/privacy/',
} as const

/** Link to a home-page section. Root-relative so it also works from other pages. */
export const href = (id: string) => `${pages.home}#${id}`

/** Links with no real destination yet are left empty and hidden until filled in. */
export const isLive = (link: { href: string }) => link.href !== '' && link.href !== '#'

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
  { label: 'Instagram', href: 'https://instagram.com/linkcircle_?srtk=c29kenVvajNqczkw', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1HtxhpJ4qf/', text: 'f' },
  { label: 'LinkedIn', href: '#', text: 'in' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@linkcircle_?_r=1&_t=ZN-9APSVVYXMRy', icon: 'tiktok' },
] as const

export const legalLinks = {
  privacy: { label: 'Privacy Policy', href: pages.privacy },
  terms: { label: 'Terms', href: '#' },
  cookies: { label: 'Cookie Policy', href: '#' },
  accessibility: { label: 'Accessibility', href: '#' },
  contact: { label: 'Contact', href: `mailto:${brand.email}` },
} as const
