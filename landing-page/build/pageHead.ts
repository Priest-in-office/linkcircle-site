import { relative } from 'node:path'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { defaultMeta, pageMeta, siteUrl } from '../src/content/seo.ts'

const fontStylesheets = [
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block',
]

/** Shared <head> for every HTML entry: favicon, fonts, and per-page SEO / Open Graph / Twitter tags. */
export function pageHead(): Plugin {
  let root = process.cwd()

  return {
    name: 'linkcircle-page-head',
    configResolved(config) {
      root = config.root
    },
    transformIndexHtml(_html, ctx) {
      const key = relative(root, ctx.filename).split('\\').join('/')
      const page = pageMeta[key]
      if (!page) throw new Error(`[pageHead] No entry in src/content/seo.ts for "${key}"`)

      const link = (attrs: Record<string, string | boolean>): HtmlTagDescriptor => ({ tag: 'link', attrs, injectTo: 'head' })
      const shared = [
        link({ rel: 'icon', type: 'image/png', href: '/favicon.png' }),
        link({ rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
        link({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }),
        ...fontStylesheets.map((href) => link({ rel: 'stylesheet', href })),
      ]

      const url = new URL(page.path, siteUrl).href
      const image = new URL(defaultMeta.image.path, siteUrl).href
      const meta = (attr: 'name' | 'property', key: string, content: string | number): HtmlTagDescriptor => ({
        tag: 'meta',
        attrs: { [attr]: key, content: String(content) },
        injectTo: 'head',
      })

      return [
        { tag: 'title', children: page.title, injectTo: 'head' },
        meta('name', 'description', page.description),
        meta('name', 'theme-color', defaultMeta.themeColor),
        link({ rel: 'canonical', href: url }),

        meta('property', 'og:type', 'website'),
        meta('property', 'og:site_name', defaultMeta.siteName),
        meta('property', 'og:locale', defaultMeta.locale),
        meta('property', 'og:url', url),
        meta('property', 'og:title', page.title),
        meta('property', 'og:description', page.description),
        meta('property', 'og:image', image),
        meta('property', 'og:image:width', defaultMeta.image.width),
        meta('property', 'og:image:height', defaultMeta.image.height),
        meta('property', 'og:image:alt', defaultMeta.image.alt),

        meta('name', 'twitter:card', 'summary_large_image'),
        meta('name', 'twitter:title', page.title),
        meta('name', 'twitter:description', page.description),
        meta('name', 'twitter:image', image),
        ...shared,
      ]
    },
  }
}
