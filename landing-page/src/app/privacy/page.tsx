import { pageMetadata } from '../../content/seo'
import { pages } from '../../content/site'
import { PrivacyPage } from '../../views/PrivacyPage'

export const metadata = pageMetadata(pages.privacy)

export default function Page() {
  return <PrivacyPage />
}
