import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getClients } from '../../lib/api'
import { FaStar, FaUsers, FaProjectDiagram, FaClock, FaSmile } from 'react-icons/fa'
import useReveal from '../../hooks/useReveal'

function Counter({ end, started }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!started || end === 0) return
    let v = 0
    const step = Math.max(1, Math.ceil(end / 55))
    const t = setInterval(() => {
      v = Math.min(v + step, end)
      setN(v)
      if (v >= end) clearInterval(t)
    }, 18)
    return () => clearInterval(t)
  }, [started, end])
  return <>{n}+</>
}

const STAT_ITEMS = [
  { Icon: FaUsers,          key: 'totalClients',    label: 'Total Clients',    color: 'text-violet-500' },
  { Icon: FaProjectDiagram, key: 'totalProjects',   label: 'Projects Done',    color: 'text-fuchsia-500' },
  { Icon: FaClock,          key: 'experienceYears', label: 'Years Experience', color: 'text-cyan-500' },
  { Icon: FaSmile,          key: 'happyClients',    label: 'Happy Clients',    color: 'text-yellow-500' },
]

export default function Clients() {
  const [started, setStarted] = useState(false)

  const { data } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients().then(r => r.data.data),
    retry: 1,
  })

  const clients = (Array.isArray(data?.clients) && data.clients.length > 0) ? data.clients : []
  const stats   = data?.stats ?? { totalClients: 0, totalProjects: 0, experienceYears: 0, happyClients: 0 }

  // Re-observe after data loads
  const ref = useReveal(clients.length)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="clients" className="section-wrap surface-1 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none
                      bg-gradient-to-br from-violet-500/[.04] via-transparent to-fuchsia-500/[.04]" />

      <div ref={ref} className="container relative z-10">

        {/* Header */}
        <div className="text-center mb-16 sr">
          <span className="eyebrow">Trust & Results</span>
          <h2 className="heading-xl mt-3">
            Happy <span className="gradient-text">Clients</span>
          </h2>
          <p className="body-muted text-base sm:text-lg mt-4 max-w-xl mx-auto">
            Trusted by businesses and creators worldwide
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {STAT_ITEMS.map(({ Icon, key, label, color }, i) => (
            <div
              key={key}
              className={`sr sr-d${i + 1} card p-6 text-center
                          hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40
                          transition-all duration-300`}
            >
              <Icon className={`w-6 h-6 ${color} mx-auto mb-3`} />
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">
                <Counter end={stats?.[key] ?? 0} started={started} />
              </div>
              <p className="text-xs body-muted">{label}</p>
            </div>
          ))}
        </div>

        {/* Client grid — only shown if clients exist */}
        {clients.length > 0 ? (
          <div className="sr card p-6 sm:p-8">
            <h3 className="text-center font-display font-bold text-gray-900 dark:text-white text-base mb-8">
              Clients I've Worked With
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {clients.map(c => (
                <div
                  key={c._id}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl
                             hover:bg-gray-50 dark:hover:bg-white/[.03] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500
                                  flex items-center justify-center text-white font-bold text-base
                                  group-hover:scale-110 transition-transform">
                    {c.name.charAt(0)}
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight truncate w-full">
                    {c.name}
                  </p>
                  {c.company && (
                    <p className="text-[11px] body-muted truncate w-full text-center">{c.company}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="sr card p-8 text-center">
            <p className="body-muted text-sm">
              Client names will appear here once added from the admin panel.
            </p>
          </div>
        )}

        {/* Rating */}
        <div className="sr mt-10 flex justify-center">
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full
                          border border-yellow-200 dark:border-yellow-500/15">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-3.5 h-3.5 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              5.0 average rating from all clients
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
