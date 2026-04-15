import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getClients, createClient, updateClient, deleteClient, updateStats } from '../../lib/api'
import toast from 'react-hot-toast'
import { HiPlus, HiPencil, HiTrash, HiX, HiSave, HiUsers } from 'react-icons/hi'

const EMPTY_CLIENT = { name:'', company:'', testimonial:'', featured:true }
const EMPTY_STATS  = { totalClients:0, totalProjects:0, experienceYears:0, happyClients:0 }

export default function AdminClients() {
  const qc = useQueryClient()
  const [show, setShow]           = useState(false)
  const [editing, setEditing]     = useState(null)
  const [form, setForm]           = useState(EMPTY_CLIENT)
  const [stats, setStats]         = useState(EMPTY_STATS)
  const [editStats, setEditStats] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['clients-admin'],
    queryFn: () => getClients().then(r => {
      const d = r.data.data
      if (d.stats) setStats({ ...EMPTY_STATS, ...d.stats })
      return d
    }),
  })
  const clients = data?.clients || []

  const createM = useMutation({ mutationFn: createClient,
    onSuccess: () => { qc.invalidateQueries(['clients-admin']); close(); toast.success('Client added!') },
    onError: e => toast.error(e.response?.data?.message || 'Error') })
  const updateM = useMutation({ mutationFn: ({ id, data }) => updateClient(id, data),
    onSuccess: () => { qc.invalidateQueries(['clients-admin']); close(); toast.success('Updated!') },
    onError: e => toast.error(e.response?.data?.message || 'Error') })
  const deleteM = useMutation({ mutationFn: deleteClient,
    onSuccess: () => { qc.invalidateQueries(['clients-admin']); toast.success('Deleted') },
    onError: e => toast.error(e.response?.data?.message || 'Error') })
  const statsM  = useMutation({ mutationFn: updateStats,
    onSuccess: () => { qc.invalidateQueries(['clients-admin']); setEditStats(false); toast.success('Stats saved!') },
    onError: e => toast.error(e.response?.data?.message || 'Error') })

  const openCreate = ()  => { setEditing(null); setForm(EMPTY_CLIENT); setShow(true) }
  const openEdit   = c  => { setEditing(c); setForm({ ...c }); setShow(true) }
  const close      = () => { setShow(false); setEditing(null); setForm(EMPTY_CLIENT) }

  const submit = e => {
    e.preventDefault()
    if (!form.name) return toast.error('Name required')
    editing ? updateM.mutate({ id: editing._id, data: form }) : createM.mutate(form)
  }

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Clients</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{clients.length} clients</p>
        </div>
        <button onClick={openCreate} className="btn-primary gap-1.5 px-4 py-2 text-sm shrink-0">
          <HiPlus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Stats card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/[.06]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">Portfolio Stats</h3>
          {!editStats
            ? <button onClick={() => setEditStats(true)} className="text-xs text-violet-500 font-semibold flex items-center gap-1">
                <HiPencil className="w-3.5 h-3.5" /> Edit
              </button>
            : <div className="flex gap-2">
                <button onClick={() => setEditStats(false)} className="text-xs text-gray-500 font-semibold">Cancel</button>
                <button onClick={() => statsM.mutate(stats)} className="text-xs text-violet-500 font-semibold flex items-center gap-1">
                  <HiSave className="w-3.5 h-3.5" /> Save
                </button>
              </div>
          }
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key:'totalClients',    label:'Total Clients' },
            { key:'totalProjects',   label:'Total Projects' },
            { key:'experienceYears', label:'Years Exp.' },
            { key:'happyClients',    label:'Happy Clients' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="admin-label">{label}</label>
              <input type="number" className="admin-input" value={stats[key]}
                onChange={e => setStats({ ...stats, [key]: Number(e.target.value) })}
                disabled={!editStats} />
            </div>
          ))}
        </div>
      </div>

      {/* Clients list */}
      {isLoading ? (
        <div className="flex justify-center py-16"><div className="spinner animate-spin" /></div>
      ) : clients.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <HiUsers className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No clients yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {clients.map(c => (
            <div key={c._id}
              className="flex items-center gap-3 p-4 rounded-2xl
                         bg-white dark:bg-[#111118]
                         border border-gray-100 dark:border-white/[.06]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500
                              flex items-center justify-center text-white font-bold text-base shrink-0">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{c.name}</p>
                {c.company && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{c.company}</p>}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold mt-1 inline-block
                                  ${c.featured ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-500/10 text-gray-500'}`}>
                  {c.featured ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(c)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-50 dark:hover:bg-violet-500/10 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button onClick={() => { if (window.confirm('Delete?')) deleteM.mutate(c._id) }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {show && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full sm:max-w-md bg-white dark:bg-[#111118]
                          rounded-t-3xl sm:rounded-2xl border-t border-gray-100 dark:border-white/[.06] sm:border
                          max-h-[92vh] overflow-y-auto">
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/10" />
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[.06]">
              <h2 className="font-display font-bold text-base text-gray-900 dark:text-white">
                {editing ? 'Edit Client' : 'Add Client'}
              </h2>
              <button onClick={close} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/[.05]">
                <HiX className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <form onSubmit={submit} className="p-5 space-y-4">
              <div><label className="admin-label">Name *</label>
                <input className="admin-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Client name" /></div>
              <div><label className="admin-label">Company</label>
                <input className="admin-input" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="Company name" /></div>
              <div><label className="admin-label">Testimonial</label>
                <textarea className="admin-input resize-none" rows={3} value={form.testimonial} onChange={e=>setForm({...form,testimonial:e.target.value})} placeholder="Client testimonial..." /></div>
              <div className="flex items-center gap-2.5">
                <input type="checkbox" id="feat-c" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} className="w-4 h-4 rounded accent-violet-500" />
                <label htmlFor="feat-c" className="text-sm text-gray-700 dark:text-gray-300">Show on website</label>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={close} className="btn-outline flex-1 py-3">Cancel</button>
                <button type="submit" disabled={createM.isPending||updateM.isPending} className="btn-primary flex-1 py-3 disabled:opacity-60">
                  {editing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
