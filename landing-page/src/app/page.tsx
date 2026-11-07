import { pageMetadata } from '../content/seo'
import { pages } from '../content/site'
import { HomePage } from '../views/HomePage'

export const metadata = pageMetadata(pages.home)

export default function Page() {
  return <HomePage />
}
