import { Footer } from '../sections/Footer/Footer'
import { Header } from '../sections/Header/Header'
import { PrivacyPolicy } from '../sections/PrivacyPolicy/PrivacyPolicy'

export function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  )
}
