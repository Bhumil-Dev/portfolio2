import React from 'react'
import { FaFilm, FaShoppingBag, FaUsers, FaBullhorn, FaCode, FaMobile } from 'react-icons/fa'
import useReveal from '../../hooks/useReveal'

const SERVICES = [
  { Icon: FaFilm,        title: 'Motion Graphics',  from: '#7c3aed', to: '#db2777',
    desc: 'Eye-catching animated graphics, intros, outros, and visual effects.',
    tags: ['Logo Animations', 'Title Sequences', 'Visual Effects', 'Transitions'] },
  { Icon: FaShoppingBag, title: 'Product Editing',  from: '#ea580c', to: '#dc2626',
    desc: 'Professional product showcase videos that highlight features and drive conversions.',
    tags: ['Product Demos', 'Unboxing Videos', 'Review Edits', 'E-commerce Content'] },
  { Icon: FaUsers,       title: 'Client Projects',  from: '#2563eb', to: '#0891b2',
    desc: 'Custom video and web solutions tailored to your brand and business goals.',
    tags: ['Brand Videos', 'Corporate Content', 'Event Coverage', 'Testimonials'] },
  { Icon: FaBullhorn,    title: 'Ads / Commercial', from: '#16a34a', to: '#0d9488',
    desc: 'High-converting ad creatives for social media that capture attention.',
    tags: ['Social Media Ads', 'YouTube Ads', 'Reels & TikToks', 'Campaign Videos'] },
  { Icon: FaCode,        title: 'Web Development',  from: '#7c3aed', to: '#9333ea',
    desc: 'Full-stack web applications built with modern technologies for performance.',
    tags: ['React Apps', 'REST APIs', 'Database Design', 'Deployment'] },
  { Icon: FaMobile,      title: 'UI/UX Design',     from: '#db2777', to: '#e11d48',
    desc: 'Beautiful, intuitive interfaces designed with user experience at the forefront.',
    tags: ['Wireframing', 'Prototyping', 'Responsive Design', 'Brand Identity'] },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className="section-wrap surface-2 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px
                      bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div ref={ref} className="container">

        <div className="text-center mb-16 sr">
          <span className="eyebrow">What I Offer</span>
          <h2 className="heading-xl mt-3">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="body-muted text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            From creative video production to full-stack development — I've got you covered
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <div key={s.title}
              className={`sr sr-d${(i % 3) + 1}
                          card p-6 flex flex-col gap-4
                          hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40
                          transition-all duration-300 group relative overflow-hidden`}>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${s.from}14, transparent 60%)` }} />

              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                <s.Icon className="w-5 h-5 text-white" />
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-gray-900 dark:text-white mb-1.5">
                  {s.title}
                </h3>
                <p className="body-muted text-sm leading-relaxed">{s.desc}</p>
              </div>

              <ul className="mt-auto space-y-1.5">
                {s.tags.map(t => (
                  <li key={t} className="flex items-center gap-2 text-xs body-muted">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: s.from }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
