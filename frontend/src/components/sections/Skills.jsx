import React from 'react'
import {
  SiCanva, SiMongodb, SiNodedotjs, SiExpress,
  SiReact, SiMysql, SiHtml5, SiCss, SiTailwindcss
} from 'react-icons/si'
import { FaCut } from 'react-icons/fa'
import { MdVideoSettings } from 'react-icons/md'
import useReveal from '../../hooks/useReveal'

const CATS = [
  {
    title: 'Video Editing',
    accent: 'text-purple-500 dark:text-purple-400',
    line: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'CapCut',          Icon: FaCut,           ic: '#fff', bg: '#18181b' },
      { name: 'DaVinci Resolve', Icon: MdVideoSettings, ic: '#fff', bg: '#e85d26' },
      { name: 'Canva',           Icon: SiCanva,         ic: '#fff', bg: '#00c4cc' },
    ],
  },
  {
    title: 'Backend',
    accent: 'text-emerald-500 dark:text-emerald-400',
    line: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'Node.js',    Icon: SiNodedotjs, ic: '#fff', bg: '#2d6a2d' },
      { name: 'Express.js', Icon: SiExpress,   ic: '#fff', bg: '#3a3a3a' },
      { name: 'MongoDB',    Icon: SiMongodb,   ic: '#fff', bg: '#3a7a3a' },
      { name: 'MySQL',      Icon: SiMysql,     ic: '#fff', bg: '#2a5a8a' },
    ],
  },
  {
    title: 'Frontend',
    accent: 'text-blue-500 dark:text-blue-400',
    line: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React.js',    Icon: SiReact,       ic: '#61dafb', bg: '#1a1d23' },
      { name: 'HTML5',       Icon: SiHtml5,       ic: '#fff',    bg: '#c0391a' },
      { name: 'CSS3',        Icon: SiCss,         ic: '#fff',    bg: '#1155a0' },
      { name: 'Tailwind CSS',Icon: SiTailwindcss, ic: '#fff',    bg: '#0891b2' },
    ],
  },
]

const TOOLS = ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman', 'Vercel', 'Netlify', 'Cloudinary']

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="section-wrap surface-1 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full pointer-events-none
                      bg-violet-500/[.06] dark:bg-violet-500/[.08] blur-3xl" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full pointer-events-none
                      bg-fuchsia-500/[.06] dark:bg-fuchsia-500/[.08] blur-3xl" />

      <div ref={ref} className="container relative z-10">

        <div className="text-center mb-16 sr">
          <span className="eyebrow">My Expertise</span>
          <h2 className="heading-xl mt-3">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="body-muted text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Tools I use to bring creative visions to life
          </p>
        </div>

        <div className="space-y-12">
          {CATS.map(cat => (
            <div key={cat.title}>
              {/* Divider */}
              <div className="sr flex items-center gap-4 mb-7">
                <div className={`h-px flex-1 bg-gradient-to-r ${cat.line} opacity-20`} />
                <span className={`text-[11px] font-bold uppercase tracking-[.18em] ${cat.accent}`}>
                  {cat.title}
                </span>
                <div className={`h-px flex-1 bg-gradient-to-l ${cat.line} opacity-20`} />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {cat.skills.map((s, i) => (
                  <div key={s.name}
                    className={`sr-scale sr-d${i + 1}
                                flex flex-col items-center gap-2.5 p-4 rounded-2xl
                                bg-gray-50 dark:bg-white/[.03]
                                border border-gray-100 dark:border-white/[.06]
                                hover:border-violet-300 dark:hover:border-violet-500/30
                                hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10
                                transition-all duration-300 cursor-default`}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                      style={{ backgroundColor: s.bg }}>
                      <s.Icon className="w-6 h-6" style={{ color: s.ic }} />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400
                                     text-center leading-tight">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="sr mt-14 text-center">
          <p className="text-[11px] body-muted uppercase tracking-widest mb-5">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TOOLS.map(t => (
              <span key={t}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium
                           text-gray-600 dark:text-gray-400
                           border border-gray-200 dark:border-white/[.08]
                           hover:border-violet-400 dark:hover:border-violet-500/40
                           hover:text-violet-600 dark:hover:text-violet-400
                           transition-colors cursor-default">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
