import React from 'react'
import { FaCode, FaFilm, FaAward, FaUsers } from 'react-icons/fa'
import { HiCheckCircle } from 'react-icons/hi'
import PERSONAL from '../../config/personal'
import useReveal from '../../hooks/useReveal'

const STATS = [
  { icon: FaFilm,  label: 'Videos Edited',  value: PERSONAL.stats.videosEdited },
  { icon: FaCode,  label: 'Projects Built',  value: PERSONAL.stats.projectsBuilt },
  { icon: FaAward, label: 'Years Exp.',      value: PERSONAL.stats.yearsExperience },
  { icon: FaUsers, label: 'Happy Clients',   value: PERSONAL.stats.happyClients },
]

const HIGHLIGHTS = [
  { label: 'Video Editing',   detail: 'CapCut · DaVinci Resolve · Motion Graphics · Color Grading' },
  { label: 'Web Development', detail: 'React · Node.js · MongoDB · Express · Tailwind CSS' },
  { label: 'Design',          detail: 'Canva · UI/UX · Brand Identity · Social Media Content' },
]

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section-wrap surface-2 relative overflow-hidden">
      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.03] dark:opacity-[.035]"
        style={{ backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      <div ref={ref} className="container relative z-10">

        {/* Header */}
        <div className="text-center mb-16 sr">
          <span className="eyebrow">About Me</span>
          <h2 className="heading-xl mt-3">
            Creative Mind,{' '}
            <span className="gradient-text">Technical Skills</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Avatar card */}
          <div className="sr-left flex justify-center">
            <div className="relative w-full max-w-[300px]">
              <div className="card p-8 text-center shadow-xl dark:shadow-none">
                <div className="relative inline-block mb-5">
                  <div className="w-24 h-24 rounded-full mx-auto overflow-hidden
                                  bg-gradient-to-br from-violet-500 to-fuchsia-500
                                  flex items-center justify-center
                                  text-white text-3xl font-extrabold
                                  ring-4 ring-violet-500/15">
                    {PERSONAL.logoType === 'image'
                      ? <img src={PERSONAL.logoImage} alt="avatar"
                             className="w-full h-full object-cover"
                             onError={e => { e.target.style.display = 'none' }} />
                      : PERSONAL.name.split(' ').map(n => n[0]).join('')
                    }
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full
                                   bg-emerald-400 border-2 border-white dark:border-[#111120]" />
                </div>

                <p className="font-display font-bold text-base text-gray-900 dark:text-white mb-0.5">
                  {PERSONAL.name}
                </p>
                <p className="text-violet-500 dark:text-violet-400 text-xs font-semibold mb-5">
                  {PERSONAL.tagline}
                </p>

                <div className="space-y-2.5 text-left">
                  {[
                    { e: '📍', t: PERSONAL.location },
                    { e: '🏢', t: PERSONAL.company },
                    { e: '✅', t: 'Available for freelance' },
                  ].map(r => (
                    <div key={r.t} className="flex items-center gap-2.5 text-sm body-muted">
                      <span className="w-5 text-center shrink-0 text-base">{r.e}</span>
                      {r.t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-3 -right-3 glass px-3 py-1.5 rounded-full float
                              text-xs font-semibold text-violet-600 dark:text-violet-300
                              border border-violet-200 dark:border-violet-500/25">
                🎬 Video Pro
              </div>
              <div className="absolute -bottom-3 -left-3 glass px-3 py-1.5 rounded-full float2
                              text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-300
                              border border-fuchsia-200 dark:border-fuchsia-500/25">
                💻 Full Stack
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <p className="sr body-muted text-base sm:text-lg">
              I'm a passionate{' '}
              <span className="text-violet-500 font-semibold">Video Editor</span> and{' '}
              <span className="text-fuchsia-500 font-semibold">Web Developer</span> at{' '}
              <span className="gradient-text font-bold">{PERSONAL.company}</span> — crafting
              compelling visual stories and building robust digital products.
            </p>

            <ul className="space-y-2.5">
              {HIGHLIGHTS.map((h, i) => (
                <li key={h.label}
                  className={`sr sr-d${i + 1} flex gap-3 p-4 rounded-xl
                              bg-gray-50 dark:bg-white/[.03]
                              border border-gray-100 dark:border-white/[.06]`}>
                  <HiCheckCircle className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">{h.label}: </span>
                    <span className="body-muted">{h.detail}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="sr grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {STATS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-4 text-center
                                            hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10
                                            transition-all duration-300">
                  <Icon className="w-4 h-4 text-violet-500 mx-auto mb-2" />
                  <div className="text-xl font-extrabold gradient-text">{value}</div>
                  <div className="text-[11px] body-muted mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
