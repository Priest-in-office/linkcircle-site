/**
 * Every image on the site, keyed by the role it plays. Swap a photo here and it
 * updates everywhere that role is used. Leave `src` undefined to show a placeholder.
 */
import emblem from '../assets/images/emblem.png'
import wordmark from '../assets/images/wordmark.png'
import founder from '../assets/images/founder.jpg'
import companion from '../assets/images/companion.webp'
import care from '../assets/images/care.webp'

export type Media = { src?: string; alt: string }

export const logo = { emblem, wordmark }

export const media = {
  founder: { src: founder, alt: 'Emmanuel Uzodinmah, founder of LinkCircle' },
  companion: { src: companion, alt: 'Companion on a relaxed audio call at home' },
  care: { src: care, alt: 'Older adult on a video call at home' },

  /* Phone mock-ups (decorative) */
  heroRemote: { src: companion, alt: '' },
  heroSelf: { src: care, alt: '' },
  heroAudio: { src: companion, alt: '' },
  connectRemote: { src: companion, alt: '' },
} satisfies Record<string, Media>
