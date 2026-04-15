import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'
import {
  HiViewGrid, HiPhotograph, HiCode, HiUsers, HiTag,
  HiLogout, HiMenuAlt3, HiX, HiSun, HiMoon, HiExternalLink
} from 'react-icons/hi'

const NAV = [
  { to: '/admin',            label: 'Dashboard',  Icon: HiViewGrid,   end: true },
  { to: '/admin/portfolio',  label: 'Portfolio',  Icon: HiPhotograph },
  { to: '/admin/projects',   label: 'Projects',   Icon: HiCode },
  { to: '/admin/clients',    label: 'Clients',    Icon: HiUsers },
  { to: '/admin/categories', label: 'Categories', Icon: HiTag },
]

export default function AdminLayout() {
  const { logout }          = useAuthStore()
  const { isDark, toggleTheme } = useThemeStore()
  const navigate            = useNavigate()
  const location            = useLocation()
  const [open, setOpen]     = useState(false)

  const handleLogout = () => { logout(); navigate('/admin/login') }

  // Current page title
  const current = NAV.find(n => n.end ? location.pathname === n.to : location.pathname.startsWith(n.to))

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#09090f]">

      {/* ── Sidebar (desktop) ─────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 flex flex-col
        bg-white dark:bg-[#111118]
        border-r border-gray-100 dark:border-white/[.06]
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 dark:border-white/[.06] shrink-0">
          <span className="font-display font-bold text-base gradient-text">Clip Crafters</span>
          <button onClick={() => setOpen(false)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg
                       hover:bg-gray-100 dark:hover:bg-white/[.05] transition-colors">
            <HiX className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[.04] hover:text-gray-900 dark:hover:text-white'
                }`
              }>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-gray-100 dark:border-white/[.06] space-y-0.5 shrink-0">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                       text-gray-600 dark:text-gray-400
                       hover:bg-gray-50 dark:hover:bg-white/[.04] hover:text-gray-900 dark:hover:text-white
                       transition-colors">
            <HiExternalLink className="w-4 h-4 shrink-0" />
            View Site
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                       text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <HiLogout className="w-4 h-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      {/* ── Main ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 sm:px-6
                           bg-white dark:bg-[#111118]
                           border-b border-gray-100 dark:border-white/[.06]">
          {/* Hamburger */}
          <button onClick={() => setOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl
                       bg-gray-100 dark:bg-white/[.05] hover:bg-gray-200 dark:hover:bg-white/[.08]
                       transition-colors shrink-0">
            <HiMenuAlt3 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Page title */}
          <h1 className="font-display font-bold text-base text-gray-900 dark:text-white flex-1 truncate">
            {current?.label ?? 'Admin'}
          </h1>

          {/* Theme toggle */}
          <button onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-xl
                       bg-gray-100 dark:bg-white/[.05] hover:bg-gray-200 dark:hover:bg-white/[.08]
                       transition-colors shrink-0">
            {isDark
              ? <HiSun  className="w-4 h-4 text-yellow-400" />
              : <HiMoon className="w-4 h-4 text-violet-600" />
            }
          </button>
        </header>

        {/* ── Bottom nav (mobile only) ── */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30
                        bg-white dark:bg-[#111118]
                        border-t border-gray-100 dark:border-white/[.06]
                        flex items-center justify-around px-2 py-2 safe-area-pb">
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-0 ${
                  isActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`
              }>
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[10px] font-medium truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
