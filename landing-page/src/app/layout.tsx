import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import { defaultMeta, siteUrl } from '../content/seo'
import '../styles/global.css'

/** Site-wide metadata. Per-page title, description and share tags come from pageMetadata(). */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: { url: '/favicon.png', type: 'image/png' } },
}

export const viewport: Viewport = {
  themeColor: defaultMeta.themeColor,
}

/**
 * Self-hosted at build time (no request to Google, no layout shift).
 * Exposed as --font-jakarta, which --font-sans in styles/tokens.css points at.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
})

/** Icon font stays on Google Fonts: next/font can't serve its variable axes reliably. */
const iconFontStylesheet =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={jakarta.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={iconFontStylesheet} />
      </head>
      <body>{children}</body>
    </html>
  )
}
