/**
 * Every image on the site, keyed by the role it plays. Swap a photo here and it
 * updates everywhere that role is used. Leave `src` undefined to show a placeholder.
 */
import emblem from '../assets/images/emblem.png'
import wordmark from '../assets/images/wordmark.png'
import founder from '../assets/images/founder.jpg'
import companion from '../assets/images/companion.webp'
import care from '../assets/images/care.webp'
import image1 from '../assets/images/image1.jpeg'
import image2 from '../assets/images/image2.jpeg'
import image3 from '../assets/images/image3.jpeg'
import image4 from '../assets/images/image4.jpeg'

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

/**
 * Portraits orbiting the hero phone (decorative, so alt stays empty). Up to four are shown on
 * desktop and the first two on mobile. Use square, head-and-shoulders crops of at least 400px.
 * No names or labels: before launch these must not read as real companions.
 */
export const heroPortraits: Media[] = [
  { src: image1, alt: '' },
  { src: image2, alt: '' },
  { src: image3, alt: '' },
  { src: image4, alt: '' },
]
