import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import WhatWeDo from './components/WhatWeDo'
import WhatWeOffer from './components/WhatWeOffer'
import TechStack from './components/TechStack'
import Process from './components/Process'
import AIPowered from './components/AIPowered'
import Projects from './components/Projects'
import Security from './components/Security'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Header onContactClick={() => setShowModal(true)} />
      <main>
        <Hero onContactClick={() => setShowModal(true)} />
        <WhatWeDo />
        <WhatWeOffer />
        <TechStack />
        <Process />
        <AIPowered />
        <Projects />
        <Security />
        <CTA onContactClick={() => setShowModal(true)} />
      </main>
      <Footer />
      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </>
  )
}
