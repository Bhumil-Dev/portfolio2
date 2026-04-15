import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPortfolio, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../lib/api'
import toast from 'react-hot-toast'
import { HiPlus, HiPencil, HiTrash, HiX, HiExternalLink } from 'react-icons/hi'
import { FaFilm } from 'react-icons/fa'

const CATEGORIES = ['Motion Graphics', 'Product Edits', 'Client Work', 'Ads']

const CAT_COLOR = {
  'Motion Graphics': 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10',
  'Product Edits':   'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10',
  'Client Work':     'text-blue-600   dark:text-blue-400   bg-blue-50   dark:bg-blue-500/10',
  'Ads':             'text-green-600  dark:text-green-400  bg-green-50  dark:bg-green-500/10',
}

const EMPTY = { title:'', caption:'', category:'Motion Graphics', thumbnail:'', videoUrl:'', externalLink:'', featured:false }

export default function AdminPortfolio() {
  const qc = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editing,   setEditing]   = useState(null)
  const [form,      setForm]      = useState(EMPTY)
  const [filter,    setFilter]    = useState('All')

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['portfolio-admin'],
    queryFn: () => getPortfolio().then(r => r.data.data),
  })

  const createM = useMutation({
    mutationFn: createPortfolioItem,
    onSuccess: () => { qc.invalidateQueries(['portfolio-admin']); close(); toast.success('Item created!') },
    onError:   e  => toast.error(e.response?.data?.message || 'Error'),
  })
  const updateM = useMutation({
    mutationFn: ({ id, data }) => updatePortfolioItem(id, data),
    onSuccess: () => { qc.invalidateQueries(['portfolio-admin']); close(); toast.success('Updated!') },
    onError:   e  => toast.error(e.response?.data?.message || 'Error'),
  })
  const deleteM = useMutation({
    mutationFn: deletePortfolioItem,
    onSuccess: () => { qc.invalidateQueries(['portfolio-admin']); toast.success('Deleted') },
    onError:   e  => toast.error(e.response?.data?.message || 'Error'),
  })

  const openCreate = ()    => { setEditing(null); setForm(EMPTY); setShowModal(true) }
  const openEdit   = item  => { setEditing(item); setForm({ ...item }); setShowModal(true) }
  const close      = ()    => { setShowModal(false); setEditing(null); setForm(EMPTY) }

  const submit = e => {
    e.preventDefault()
    if (!form.title || !form.category) return toast.error('Title and category required')
    editing ? updateM.mutate({ id: editing._id, data: form }) : createM.mutate(form)
  }

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter)

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Portfolio</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{items.length} items</p>
        </div>
        <button onClick={openCreate} className="btn-primary gap-1.5 px-4 py-2 text-sm shrink-0">
          <HiPlus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === cat
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 dark:bg-white/[.05] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[.08]'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      {isLoading ? (
        <div className="flex justify-center py-16"><div className="spinner animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <FaFilm className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No items yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map(item => (
            <div key={item._id}
              className="flex items-center gap-3 p-4 rounded-2xl
                         bg-white dark:bg-[#111118]
                         border border-gray-100 dark:border-white/[.06]">

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10
                              flex items-center justify-center shrink-0">
                <FaFilm className="w-4 h-4 text-violet-500" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${CAT_COLOR[item.category] ?? 'text-gray-500 bg-gray-100 dark:bg-gray-500/10'}`}>
                    {item.category}
                  </span>
                  {item.externalLink && (
                    <a href={item.externalLink} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-[11px] text-violet-500 flex items-center gap-0.5 hover:underline">
                      <HiExternalLink className="w-3 h-3" /> Link
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(item)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                             hover:bg-violet-50 dark:hover:bg-violet-500/10
                             text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button onClick={() => { if (window.confirm('Delete?')) deleteM.mutate(item._id) }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                             hover:bg-red-50 dark:hover:bg-red-500/10
                             text-gray-400 hover:text-red-500 transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                        bg-black/50 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full sm:max-w-lg bg-white dark:bg-[#111118]
                          rounded-t-3xl sm:rounded-2xl
                          border-t border-gray-100 dark:border-white/[.06] sm:border
                          max-h-[92vh] overflow-y-auto">

            {/* Handle (mobile) */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/10" />
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[.06]">
              <h2 className="font-display font-bold text-base text-gray-900 dark:text-white">
                {editing ? 'Edit Item' : 'Add Portfolio Item'}
              </h2>
              <button onClick={close}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                           hover:bg-gray-100 dark:hover:bg-white/[.05] transition-colors">
                <HiX className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <form onSubmit={submit} className="p-5 space-y-4">
              <div>
                <label className="admin-label">Title *</label>
                <input className="admin-input" value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Video title" />
              </div>
              <div>
                <label className="admin-label">Caption</label>
                <input className="admin-input" value={form.caption}
                  onChange={e => setForm({ ...form, caption: e.target.value })}
                  placeholder="Short description" />
              </div>
              <div>
                <label className="admin-label">Category *</label>
                <select className="admin-input" value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="admin-label">External Link (YouTube / Drive)</label>
                <input className="admin-input" value={form.externalLink}
                  onChange={e => setForm({ ...form, externalLink: e.target.value })}
                  placeholder="https://youtube.com/..." />
              </div>
              <div>
                <label className="admin-label">Thumbnail URL (optional)</label>
                <input className="admin-input" value={form.thumbnail}
                  onChange={e => setForm({ ...form, thumbnail: e.target.value })}
                  placeholder="https://..." />
              </div>
              <div className="flex items-center gap-2.5">
                <input type="checkbox" id="feat" checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded accent-violet-500" />
                <label htmlFor="feat" className="text-sm text-gray-700 dark:text-gray-300">Featured item</label>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={close} className="btn-outline flex-1 py-3">Cancel</button>
                <button type="submit"
                  disabled={createM.isPending || updateM.isPending}
                  className="btn-primary flex-1 py-3 disabled:opacity-60">
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
