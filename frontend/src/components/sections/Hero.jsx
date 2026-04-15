import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FaWhatsapp, FaPlay, FaChevronDown } from 'react-icons/fa'
import PERSONAL from '../../config/personal'

const STATS = [
  { v: PERSONAL.stats.videosEdited,    l: 'Videos Edited' },
  { v: PERSONAL.stats.projectsBuilt,   l: 'Projects Built' },
  { v: PERSONAL.stats.yearsExperience, l: 'Years Exp.' },
  { v: PERSONAL.stats.happyClients,    l: 'Happy Clients' },
]

export default function Hero() {
  const wrap = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-h]',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: .65, stagger: .1, ease: 'power2.out', delay: .2, clearProps: 'all' }
      )
    }, wrap)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ─── Background ─────────────────────────────────────── */}

      {/* Base: dark in dark mode, very light gray in light mode */}
      <div className="absolute inset-0 bg-[#fafafa] dark:bg-[#09090f]" />

      {/* Dot grid — barely visible, just adds texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Soft violet glow — center only, very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(139,92,246,.07) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none
                      bg-gradient-to-t from-[#fafafa] dark:from-[#09090f] to-transparent" />

      {/* ─── Content ────────────────────────────────────────── */}
      <div
        ref={wrap}
        className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 text-center pt-28 pb-20"
      >

        {/* Available badge */}
        <div
          data-h
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8
                     bg-emerald-500/10 border border-emerald-500/20
                     text-emerald-600 dark:text-emerald-400
                     text-xs font-bold uppercase tracking-widest"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Available for Work
        </div>

        {/* Name */}
        <h1
          data-h
          className="font-display font-extrabold tracking-tight leading-[1.06] mb-5
                     text-gray-900 dark:text-white"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
        >
          Hi, I'm{' '}
          <span className="gradient-text">{PERSONAL.name}</span>
        </h1>

        {/* Role pills */}
        <div data-h className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { t: '🎬 Video Editor',        c: 'text-violet-600 dark:text-violet-300 bg-violet-500/8 dark:bg-violet-500/10 border-violet-300/50 dark:border-violet-500/20' },
            { t: '💻 Web Developer',       c: 'text-fuchsia-600 dark:text-fuchsia-300 bg-fuchsia-500/8 dark:bg-fuchsia-500/10 border-fuchsia-300/50 dark:border-fuchsia-500/20' },
            { t: `✨ ${PERSONAL.company}`, c: 'text-cyan-600 dark:text-cyan-300 bg-cyan-500/8 dark:bg-cyan-500/10 border-cyan-300/50 dark:border-cyan-500/20' },
          ].map(p => (
            <span key={p.t} className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${p.c}`}>
              {p.t}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p
          data-h
          className="text-gray-500 dark:text-gray-400 text-base sm:text-lg
                     max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {PERSONAL.bioShort}
        </p>

        {/* CTAs */}
        <div data-h className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent(PERSONAL.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base"
          >
            <FaWhatsapp className="w-5 h-5 shrink-0" />
            Contact Me
          </a>
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline w-full sm:w-auto px-8 py-3.5 text-base"
          >
            <FaPlay className="w-3.5 h-3.5 shrink-0" />
            View My Work
          </button>
        </div>

        {/* Stats strip */}
        <div
          data-h
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden
                     border border-gray-200/70 dark:border-white/[.06]
                     bg-white/60 dark:bg-white/[.02] backdrop-blur-sm"
        >
          {STATS.map((s, i) => (
            <div
              key={s.l}
              className={`flex flex-col items-center py-5 px-4
                ${i < STATS.length - 1
                  ? 'border-r border-gray-200/70 dark:border-white/[.06]'
                  : ''}`}
            >
              <span className="font-display font-extrabold text-2xl sm:text-3xl gradient-text">{s.v}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10
                      text-gray-300 dark:text-gray-700 animate-bounce">
        <FaChevronDown className="w-4 h-4" />
      </div>
    </section>
  )
}
