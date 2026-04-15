import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDashboardStats } from '../../lib/api'
import { Link } from 'react-router-dom'
import { HiPhotograph, HiCode, HiUsers, HiTag, HiChevronRight } from 'react-icons/hi'

const CARDS = [
  { key:'portfolio',  label:'Portfolio',  Icon:HiPhotograph, from:'#7c3aed', to:'#db2777', link:'/admin/portfolio' },
  { key:'projects',   label:'Projects',   Icon:HiCode,       from:'#2563eb', to:'#0891b2', link:'/admin/projects' },
  { key:'clients',    label:'Clients',    Icon:HiUsers,      from:'#16a34a', to:'#0d9488', link:'/admin/clients' },
  { key:'categories', label:'Categories', Icon:HiTag,        from:'#ea580c', to:'#dc2626', link:'/admin/categories' },
]

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => getDashboardStats().then(r => r.data.data),
  })

  return (
    <div className="space-y-6">

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {CARDS.map(({ key, label, Icon, from, to, link }) => (
          <Link key={key} to={link}
            className="flex flex-col gap-3 p-4 rounded-2xl
                       bg-white dark:bg-[#111118]
                       border border-gray-100 dark:border-white/[.06]
                       hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40
                       transition-all duration-200 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-display">
                {isLoading ? '—' : (data?.counts?.[key] ?? 0)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between mt-0.5">
                {label}
                <HiChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Portfolio by category */}
      {(data?.portfolioByCategory?.length > 0) && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/[.06]">
          <h2 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-4">
            Portfolio by Category
          </h2>
          <div className="space-y-3">
            {data.portfolioByCategory.map(({ _id, count }) => {
              const pct = Math.round((count / (data.counts.portfolio || 1)) * 100)
              return (
                <div key={_id}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{_id}</span>
                    <span className="text-gray-400">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-white/[.06] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-700"
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/[.06]">
        <h2 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2">
          {CARDS.map(({ label, Icon, from, to, link }) => (
            <Link key={label} to={link}
              className="flex items-center gap-2.5 p-3 rounded-xl
                         border border-gray-100 dark:border-white/[.06]
                         hover:border-violet-300 dark:hover:border-violet-500/30
                         hover:bg-violet-50 dark:hover:bg-violet-500/[.05]
                         transition-all duration-200">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
