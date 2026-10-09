import { useState } from 'react'
import type { InterestFormKind } from './content/forms'
import { sectionIds } from './content/site'
import { Clarity } from './sections/Clarity/Clarity'
import { Features } from './sections/Features/Features'
import { Footer } from './sections/Footer/Footer'
import { Founder } from './sections/Founder/Founder'
import { Header } from './sections/Header/Header'
import { Hero } from './sections/Hero/Hero'
import { Highlights } from './sections/Highlights/Highlights'
import { HowItWorks } from './sections/HowItWorks/HowItWorks'
import { InterestModal } from './sections/InterestModal/InterestModal'
import { JoinCta } from './sections/JoinCta/JoinCta'
import { CarePitch } from './sections/Pitch/CarePitch'
import { CompanionPitch } from './sections/Pitch/CompanionPitch'

/** Page composition: section order lives here and nowhere else. */
export default function App() {
  const [openForm, setOpenForm] = useState<InterestFormKind | null>(null)

  return (
    <>
      <Header />
      <main id={sectionIds.top}>
        <Hero />
        <Highlights />
        <Features />
        <HowItWorks />
        <Clarity />
        <Founder />
        <CompanionPitch onRegister={() => setOpenForm('companion')} />
        <CarePitch onRequest={() => setOpenForm('care')} />
        <JoinCta />
      </main>
      <Footer />
      {openForm && <InterestModal key={openForm} kind={openForm} onClose={() => setOpenForm(null)} />}
    </>
  )
}
