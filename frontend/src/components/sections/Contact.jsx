import React from 'react'
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import PERSONAL from '../../config/personal'
import useReveal from '../../hooks/useReveal'

const METHODS = [
  {
    Icon: FaWhatsapp, label: 'WhatsApp', value: PERSONAL.whatsappDisplay,
    href: `https://wa.me/${PERSONAL.whatsapp}?text=${encodeURIComponent(PERSONAL.whatsappMessage)}`,
    from: '#16a34a', to: '#059669', cta: 'Message Me Now',
  },
  {
    Icon: FaEnvelope, label: 'Email', value: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
    from: '#7c3aed', to: '#db2777', cta: 'Send Email',
  },
]

const SOCIALS = [
  { Icon: FaGithub,    href: PERSONAL.social.github,    label: 'GitHub' },
  { Icon: FaLinkedin,  href: PERSONAL.social.linkedin,  label: 'LinkedIn' },
  { Icon: FaInstagram, href: PERSONAL.social.instagram, label: 'Instagram' },
].filter(s => s.href)

export default function Contact() {
  const ref = useReveal()

  return (
    <section id="contact" className="section-wrap surface-2 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[500px] rounded-full pointer-events-none
                      bg-violet-500/[.05] blur-3xl" />

      <div ref={ref} className="container relative z-10 max-w-4xl">

        <div className="text-center mb-16 sr">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="heading-xl mt-3">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="body-muted text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Have a project in mind? Send me a message and let's create something amazing.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {METHODS.map((m, i) => (
            <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
              className={`sr sr-d${i + 1}
                          card p-8 text-center
                          hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40
                          transition-all duration-300 group relative overflow-hidden`}>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${m.from}12, transparent 60%)` }} />

              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center
                              group-hover:scale-110 transition-transform duration-300"
                style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}>
                <m.Icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1.5">
                {m.label}
              </h3>
              <p className="body-muted text-sm mb-5">{m.value}</p>
              <span className="inline-block px-5 py-2 rounded-full text-sm font-semibold text-white"
                style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}>
                {m.cta}
              </span>
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="sr text-center">
          <p className="text-[11px] body-muted uppercase tracking-widest mb-5">Find me on</p>
          <div className="flex justify-center gap-3">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 card rounded-xl flex items-center justify-center
                           body-muted hover:text-violet-500 dark:hover:text-violet-400
                           hover:border-violet-300 dark:hover:border-violet-500/30
                           hover:scale-110 transition-all duration-200">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sr mt-16 pt-8 border-t border-gray-100 dark:border-white/[.06] text-center">
          <p className="text-xs body-muted">{PERSONAL.footerNote}</p>
        </div>
      </div>
    </section>
  )
}
