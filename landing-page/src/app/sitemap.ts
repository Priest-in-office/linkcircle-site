import type { MetadataRoute } from 'next'
import { siteUrl } from '../content/seo'
import { pages } from '../content/site'

// Required for `output: 'export'`: generate the file once at build time.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((path) => ({ url: new URL(path, siteUrl).href }))
}
