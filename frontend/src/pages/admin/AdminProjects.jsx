import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProjects, createProject, updateProject, deleteProject } from '../../lib/api'
import toast from 'react-hot-toast'
import { HiPlus, HiPencil, HiTrash, HiX, HiExternalLink } from 'react-icons/hi'
import { FaGithub, FaCode } from 'react-icons/fa'

const EMPTY = { title:'', description:'', githubLink:'', liveLink:'', technologies:'', featured:false }

export default function AdminProjects() {
  const qc = useQueryClient()
  const [show, setShow]       = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm]       = useState(EMPTY)

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects-admin'],
    queryFn: () => getProjects().then(r => r.data.data),
  })

  const createM = useMutation({
    mutationFn: d => createProject({ ...d, technologies: d.technologies.split(',').map(t=>t.trim()).filter(Boolean) }),
    onSuccess: () => { qc.invalidateQueries(['projects-admin']); close(); toast.success('Project created!') },
    onError: e => toast.error(e.response?.data?.message || 'Error'),
  })
  const updateM = useMutation({
    mutationFn: ({ id, data }) => updateProject(id, { ...data, technologies: typeof data.technologies === 'string' ? data.technologies.split(',').map(t=>t.trim()).filter(Boolean) : data.technologies }),
    onSuccess: () => { qc.invalidateQueries(['projects-admin']); close(); toast.success('Updated!') },
    onError: e => toast.error(e.response?.data?.message || 'Error'),
  })
  const deleteM = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => { qc.invalidateQueries(['projects-admin']); toast.success('Deleted') },
    onError: e => toast.error(e.response?.data?.message || 'Error'),
  })

  const openCreate = ()   => { setEditing(null); setForm(EMPTY); setShow(true) }
  const openEdit   = p   => { setEditing(p); setForm({ ...p, technologies: Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies || '' }); setShow(true) }
  const close      = ()  => { setShow(false); setEditing(null); setForm(EMPTY) }

  const submit = e => {
    e.preventDefault()
    if (!form.title || !form.githubLink) return toast.error('Title and GitHub link required')
    editing ? updateM.mutate({ id: editing._id, data: form }) : createM.mutate(form)
  }

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Projects</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{projects.length} projects</p>
        </div>
        <button onClick={openCreate} className="btn-primary gap-1.5 px-4 py-2 text-sm shrink-0">
          <HiPlus className="w-4 h-4" /> Add
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><div className="spinner animate-spin" /></div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <FaCode className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No projects yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {projects.map(p => (
            <div key={p._id}
              className="flex items-start gap-3 p-4 rounded-2xl
                         bg-white dark:bg-[#111118]
                         border border-gray-100 dark:border-white/[.06]">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[.06]
                              flex items-center justify-center shrink-0 mt-0.5">
                <FaGithub className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{p.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(p.technologies || []).slice(0,4).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-medium
                                             bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <a href={p.githubLink} target="_blank" rel="noopener noreferrer"
                    className="text-[11px] text-violet-500 flex items-center gap-0.5 hover:underline">
                    <FaGithub className="w-3 h-3" /> GitHub
                  </a>
                  {p.liveLink && (
                    <a href={p.liveLink} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] text-fuchsia-500 flex items-center gap-0.5 hover:underline">
                      <HiExternalLink className="w-3 h-3" /> Live
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={() => openEdit(p)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg
                             hover:bg-violet-50 dark:hover:bg-violet-500/10
                             text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button onClick={() => { if (window.confirm('Delete?')) deleteM.mutate(p._id) }}
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

      {show && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full sm:max-w-lg bg-white dark:bg-[#111118]
                          rounded-t-3xl sm:rounded-2xl border-t border-gray-100 dark:border-white/[.06] sm:border
                          max-h-[92vh] overflow-y-auto">
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-white/10" />
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-white/[.06]">
              <h2 className="font-display font-bold text-base text-gray-900 dark:text-white">
                {editing ? 'Edit Project' : 'Add Project'}
              </h2>
              <button onClick={close} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/[.05]">
                <HiX className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <form onSubmit={submit} className="p-5 space-y-4">
              <div><label className="admin-label">Title *</label>
                <input className="admin-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Project name" /></div>
              <div><label className="admin-label">Description *</label>
                <textarea className="admin-input resize-none" rows={3} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" /></div>
              <div><label className="admin-label">GitHub Link *</label>
                <input className="admin-input" value={form.githubLink} onChange={e=>setForm({...form,githubLink:e.target.value})} placeholder="https://github.com/..." /></div>
              <div><label className="admin-label">Live Link</label>
                <input className="admin-input" value={form.liveLink} onChange={e=>setForm({...form,liveLink:e.target.value})} placeholder="https://..." /></div>
              <div><label className="admin-label">Technologies (comma separated)</label>
                <input className="admin-input" value={form.technologies} onChange={e=>setForm({...form,technologies:e.target.value})} placeholder="React, Node.js, MongoDB" /></div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={close} className="btn-outline flex-1 py-3">Cancel</button>
                <button type="submit" disabled={createM.isPending||updateM.isPending} className="btn-primary flex-1 py-3 disabled:opacity-60">
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
