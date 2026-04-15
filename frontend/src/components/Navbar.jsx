import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useThemeStore } from '../store/themeStore'
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi'
import PERSONAL from '../config/personal'

const LINKS = [
  { label: 'Home',      href: '#hero' },
  { label: 'About',     href: '#about' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Clients',   href: '#clients' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useThemeStore()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('hero')
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: .7, ease: 'power3.out', delay: .2 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const ids = LINKS.map(l => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 110) { setActive(ids[i]); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goto = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#07070e]/90 backdrop-blur-xl border-b border-gray-100 dark:border-white/[.06] shadow-sm'
          : 'bg-transparent'
      }`}>
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#hero" onClick={e => goto(e, '#hero')}
            className="flex items-center gap-2 shrink-0">
            {PERSONAL.logoType === 'image' && (
              <img src={PERSONAL.logoImage} alt={PERSONAL.company}
                className="h-7 w-auto object-contain"
                onError={e => { e.target.style.display = 'none' }} />
            )}
            <span className="font-display font-bold text-base gradient-text">
              {PERSONAL.company}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {LINKS.map(link => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a href={link.href} onClick={e => goto(e, link.href)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'text-violet-600 dark:text-violet-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}>
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full
                                       bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-xl
                         bg-gray-100 dark:bg-white/[.05]
                         border border-gray-200 dark:border-white/[.07]
                         hover:bg-gray-200 dark:hover:bg-white/[.09]
                         transition-colors">
              {isDark
                ? <HiSun  className="w-4 h-4 text-yellow-400" />
                : <HiMoon className="w-4 h-4 text-violet-600" />
              }
            </button>

            <a href={`https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent(PERSONAL.whatsappMessage)}`}
              target="_blank" rel="noopener noreferrer"
              className="hidden lg:inline-flex btn-primary px-4 py-2 text-sm">
              Hire Me
            </a>

            <button onClick={() => setOpen(o => !o)} aria-label="Menu"
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl
                         bg-gray-100 dark:bg-white/[.05]
                         border border-gray-200 dark:border-white/[.07]
                         transition-colors">
              {open
                ? <HiX        className="w-5 h-5 text-gray-700 dark:text-white" />
                : <HiMenuAlt3 className="w-5 h-5 text-gray-700 dark:text-white" />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mb-3 rounded-2xl overflow-hidden
                          bg-white dark:bg-[#111120]
                          border border-gray-100 dark:border-white/[.07]
                          shadow-xl dark:shadow-none">
            <ul className="py-2">
              {LINKS.map(link => {
                const isActive = active === link.href.slice(1)
                return (
                  <li key={link.href}>
                    <a href={link.href} onClick={e => goto(e, link.href)}
                      className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/[.08]'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/[.04]'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive ? 'bg-violet-500' : 'bg-transparent'
                      }`} />
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-white/[.06]">
              <a href={`https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent(PERSONAL.whatsappMessage)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full py-3 text-sm">
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
