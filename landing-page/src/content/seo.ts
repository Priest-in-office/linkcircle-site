/**
 * Page titles, descriptions and social-share (Open Graph / Twitter) metadata.
 * Each route in src/app exports `metadata = pageMetadata(pages.x)`; the root layout
 * adds the site-wide parts (metadataBase, favicon, theme colour).
 */
import type { Metadata } from 'next'
import { pages } from './site'

/** Canonical origin. Share images, canonical and og:url resolve against it. */
export const siteUrl = 'https://www.linkcircle.co.uk'

export const defaultMeta = {
  siteName: 'LinkCircle',
  locale: 'en_GB',
  themeColor: '#0057C1',
  /** 1200×630, served from public/. */
  image: { path: '/og-image.png', width: 1200, height: 630, alt: 'LinkCircle — Real People. Real Conversations.' },
}

export type PagePath = (typeof pages)[keyof typeof pages]
export type PageMeta = { title: string; description: string }

/** Keyed by page path. Adding a path to `pages` without an entry here is a type error. */
export const pageMeta: Record<PagePath, PageMeta> = {
  [pages.home]: {
    title: 'LinkCircle — Real People. Real Conversations.',
    description:
      'Meaningful conversation and companionship through video or audio calls — whenever you need someone to talk to. Launching soon across the UK.',
  },
  [pages.privacy]: {
    title: 'Privacy Policy — LinkCircle',
    description: 'How LinkCircle collects, uses and protects your personal information.',
  },
}

/**
 * Full metadata for one page. Next.js replaces (rather than merges) a parent's
 * `openGraph` / `twitter` objects, so every page gets the complete set here.
 */
export function pageMetadata(path: PagePath): Metadata {
  const { title, description } = pageMeta[path]
  const image = {
    url: defaultMeta.image.path,
    width: defaultMeta.image.width,
    height: defaultMeta.image.height,
    alt: defaultMeta.image.alt,
  }

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: defaultMeta.siteName,
      locale: defaultMeta.locale,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  }
}
