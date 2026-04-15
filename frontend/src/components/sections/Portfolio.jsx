import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPortfolio } from '../../lib/api'
import { FaPlay, FaExternalLinkAlt, FaFilm } from 'react-icons/fa'
import useReveal from '../../hooks/useReveal'

const CATS = ['All', 'Motion Graphics', 'Product Edits', 'Client Work', 'Ads']

const CAT_STYLE = {
  'Motion Graphics': {
    badge: 'text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
    bg:    'from-purple-500/15 to-pink-500/15 dark:from-purple-500/10 dark:to-pink-500/10',
    icon:  'text-purple-400 dark:text-purple-500',
    label: 'text-purple-600 dark:text-purple-300',
  },
  'Product Edits': {
    badge: 'text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20',
    bg:    'from-orange-500/15 to-red-500/15 dark:from-orange-500/10 dark:to-red-500/10',
    icon:  'text-orange-400 dark:text-orange-500',
    label: 'text-orange-600 dark:text-orange-300',
  },
  'Client Work': {
    badge: 'text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    bg:    'from-blue-500/15 to-cyan-500/15 dark:from-blue-500/10 dark:to-cyan-500/10',
    icon:  'text-blue-400 dark:text-blue-500',
    label: 'text-blue-600 dark:text-blue-300',
  },
  'Ads': {
    badge: 'text-green-600 dark:text-green-300 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20',
    bg:    'from-green-500/15 to-teal-500/15 dark:from-green-500/10 dark:to-teal-500/10',
    icon:  'text-green-400 dark:text-green-500',
    label: 'text-green-600 dark:text-green-300',
  },
}

const DEFAULT_STYLE = {
  badge: 'text-gray-500 bg-gray-100 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20',
  bg:    'from-gray-200 to-gray-300 dark:from-gray-700/30 dark:to-gray-600/30',
  icon:  'text-gray-400',
  label: 'text-gray-500',
}

function Card({ item }) {
  const style = CAT_STYLE[item.category] ?? DEFAULT_STYLE
  const url   = item.externalLink || item.videoUrl || ''

  // Whole card is clickable if there's a link
  const handleCardClick = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      onClick={handleCardClick}
      className={`card overflow-hidden group
                  hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40
                  transition-all duration-300
                  ${url ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* Thumbnail / placeholder */}
      <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${style.bg}`}>

        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 select-none">
            <FaFilm className={`w-8 h-8 ${style.icon} opacity-50`} />
            <span className={`text-lg font-display font-bold ${style.label} text-center px-4 leading-tight`}>
              {item.category}
            </span>
          </div>
        )}

        {/* Hover overlay — desktop */}
        {url && (
          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100
                          transition-opacity duration-300 flex items-center justify-center gap-3">
            <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm
                             flex items-center justify-center">
              <FaPlay className="w-4 h-4 text-white ml-0.5" />
            </span>
            <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm
                             flex items-center justify-center">
              <FaExternalLinkAlt className="w-3.5 h-3.5 text-white" />
            </span>
          </div>
        )}

        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-[11px] px-2.5 py-1 rounded-full border font-semibold ${style.badge}`}>
          {item.category}
        </span>

        {/* Link indicator — always visible on mobile */}
        {url && (
          <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm
                           flex items-center justify-center sm:hidden">
            <FaExternalLinkAlt className="w-3 h-3 text-white" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className={`font-semibold text-sm text-gray-900 dark:text-white mb-0.5 transition-colors
                        ${url ? 'group-hover:text-violet-500' : ''}`}>
          {item.title}
        </h3>
        {item.caption && <p className="text-xs body-muted">{item.caption}</p>}
        {/* Mobile tap hint */}
        {url && (
          <p className="text-[11px] text-violet-500 dark:text-violet-400 mt-1.5 font-medium sm:hidden">
            Tap to watch →
          </p>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('All')

  const { data, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => getPortfolio().then(r => r.data.data),
    retry: 1,
  })

  const items    = (Array.isArray(data) && data.length > 0) ? data : []
  const filtered = active === 'All' ? items : items.filter(i => i.category === active)

  // Re-observe after data loads
  const ref = useReveal(items.length)

  return (
    <section id="portfolio" className="section-wrap surface-1 relative overflow-hidden">
      <div ref={ref} className="container">

        <div className="text-center mb-12 sr">
          <span className="eyebrow">My Work</span>
          <h2 className="heading-xl mt-3">
            Portfolio <span className="gradient-text">Showcase</span>
          </h2>
          <p className="body-muted text-base sm:text-lg mt-4 max-w-xl mx-auto">
            A collection of my best video editing and creative work
          </p>
        </div>

        <div className="sr flex flex-wrap justify-center gap-2 mb-10">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === cat
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20'
                  : 'bg-gray-100 dark:bg-white/[.04] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[.07] hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="spinner animate-spin" /></div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => <Card key={item._id} item={item} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/[.04] flex items-center justify-center">
              <FaFilm className="w-7 h-7 text-gray-300 dark:text-gray-600" />
            </div>
            <p className="font-semibold text-gray-500 dark:text-gray-400">No portfolio items yet</p>
            <p className="text-sm body-muted">Add items from the admin panel to display them here.</p>
          </div>
        )}
      </div>
    </section>
  )
}
