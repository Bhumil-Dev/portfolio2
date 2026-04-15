import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../../lib/api'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'
import useReveal from '../../hooks/useReveal'

const TECH_CLS = {
  'React':      'text-cyan-600   dark:text-cyan-400   bg-cyan-50   dark:bg-cyan-500/10',
  'Node.js':    'text-green-600  dark:text-green-400  bg-green-50  dark:bg-green-500/10',
  'MongoDB':    'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10',
  'Tailwind':   'text-sky-600    dark:text-sky-400    bg-sky-50    dark:bg-sky-500/10',
  'GSAP':       'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10',
  'Express':    'text-gray-600   dark:text-gray-400   bg-gray-100  dark:bg-gray-500/10',
  'MySQL':      'text-blue-600   dark:text-blue-400   bg-blue-50   dark:bg-blue-500/10',
  'Cloudinary': 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10',
}

export default function Projects() {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects().then(r => r.data.data),
    retry: 1,
  })

  // No dummy data — only real data from DB
  const projects = (Array.isArray(data) && data.length > 0) ? data : []

  // Pass projects.length so useReveal re-observes after data arrives
  const ref = useReveal(projects.length)

  return (
    <section id="projects" className="section-wrap surface-2 relative overflow-hidden">
      <div ref={ref} className="container">

        {/* Header */}
        <div className="text-center mb-16 sr">
          <span className="eyebrow">Open Source</span>
          <h2 className="heading-xl mt-3">
            GitHub <span className="gradient-text">Projects</span>
          </h2>
          <p className="body-muted text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Web development projects showcasing my technical skills
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="spinner animate-spin" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <div
                key={p._id}
                className={`sr sr-d${(i % 3) + 1}
                            card p-6 flex flex-col gap-4
                            hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40
                            transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Top accent on hover */}
                <div className="absolute top-0 inset-x-0 h-0.5
                                bg-gradient-to-r from-violet-500 to-fuchsia-500
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* GitHub icon */}
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[.06]
                                flex items-center justify-center shrink-0">
                  <FaGithub className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>

                {/* Title + desc */}
                <div className="flex-1">
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-base mb-2
                                 group-hover:text-violet-500 transition-colors">
                    {p.title}
                  </h3>
                  <p className="body-muted text-sm leading-relaxed">{p.description}</p>
                </div>

                {/* Tech badges */}
                {p.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.map(t => (
                      <span
                        key={t}
                        className={`text-[11px] px-2.5 py-1 rounded-full font-semibold
                                    ${TECH_CLS[t] ?? 'text-gray-500 bg-gray-100 dark:bg-gray-500/10'}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-4 pt-3
                                border-t border-gray-100 dark:border-white/[.06]">
                  <a
                    href={p.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold
                               body-muted hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold
                                 body-muted hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/[.04]
                            flex items-center justify-center">
              <FaCode className="w-7 h-7 text-gray-300 dark:text-gray-600" />
            </div>
            <p className="font-semibold text-gray-500 dark:text-gray-400">No projects yet</p>
            <p className="text-sm body-muted">Add projects from the admin panel to display them here.</p>
          </div>
        )}
      </div>
    </section>
  )
}
