import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Services from '../components/sections/Services'
import Portfolio from '../components/sections/Portfolio'
import Projects from '../components/sections/Projects'
import Clients from '../components/sections/Clients'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Projects />
        <Clients />
        <Contact />
      </main>
    </div>
  )
}
