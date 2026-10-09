/**
 * Page titles, descriptions and social-share (Open Graph / Twitter) metadata.
 * Injected into each HTML page at build time by the plugin in vite.config.ts,
 * so this file must stay plain data (no asset imports, no DOM).
 */

/** Canonical origin. Share images and og:url must be absolute. */
export const siteUrl = 'https://www.linkcircle.co.uk'

export const defaultMeta = {
  siteName: 'LinkCircle',
  locale: 'en_GB',
  themeColor: '#0057C1',
  /** 1200×630, served from public/. */
  image: { path: '/og-image.png', width: 1200, height: 630, alt: 'LinkCircle — Real People. Real Conversations.' },
}

export type PageMeta = { path: string; title: string; description: string }

/** Keyed by HTML entry file (relative to the project root). */
export const pageMeta: Record<string, PageMeta> = {
  'index.html': {
    path: '/',
    title: 'LinkCircle — Real People. Real Conversations.',
    description:
      'Meaningful conversation and companionship through video or audio calls — whenever you need someone to talk to. Launching soon across the UK.',
  },
  'privacy/index.html': {
    path: '/privacy/',
    title: 'Privacy Policy — LinkCircle',
    description: 'How LinkCircle collects, uses and protects your personal information.',
  },
}
