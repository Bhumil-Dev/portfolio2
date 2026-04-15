import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../lib/api'
import toast from 'react-hot-toast'
import { HiPlus, HiPencil, HiTrash, HiX, HiTag } from 'react-icons/hi'

const EMPTY = { name:'', description:'', color:'#7c3aed', order:0 }

export default function AdminCategories() {
  const qc = useQueryClient()
  const [show, setShow]       = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm]       = useState(EMPTY)

  const { data: cats = [], isLoading } = useQuery({
    queryKey: ['categories-admin'],
    queryFn: () => getCategories().then(r => r.data.data),
  })

  const createM = useMutation({ mutationFn: createCategory,
    onSuccess: () => { qc.invalidateQueries(['categories-admin']); close(); toast.success('Created!') },
    onError: e => toast.error(e.response?.data?.message || 'Error') })
  const updateM = useMutation({ mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => { qc.invalidateQueries(['categories-admin']); close(); toast.success('Updated!') },
    onError: e => toast.error(e.response?.data?.message || 'Error') })
  const deleteM = useMutation({ mutationFn: deleteCategory,
    onSuccess: () => { qc.invalidateQueries(['categories-admin']); toast.success('Deleted') },
    onError: e => toast.error(e.response?.data?.message || 'Error') })

  const openCreate = ()  => { setEditing(null); setForm(EMPTY); setShow(true) }
  const openEdit   = c  => { setEditing(c); setForm({ ...c }); setShow(true) }
  const close      = () => { setShow(false); setEditing(null); setForm(EMPTY) }

  const submit = e => {
    e.preventDefault()
    if (!form.name) return toast.error('Name required')
    editing ? updateM.mutate({ id: editing._id, data: form }) : createM.mutate(form)
  }

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Categories</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cats.length} categories</p>
        </div>
        <button onClick={openCreate} className="btn-primary gap-1.5 px-4 py-2 text-sm shrink-0">
          <HiPlus className="w-4 h-4" /> Add
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><div className="spinner animate-spin" /></div>
      ) : cats.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3">
          <HiTag className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-500 dark:text-gray-400">No categories yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {cats.map(cat => (
            <div key={cat._id}
              className="flex items-center gap-3 p-4 rounded-2xl
                         bg-white dark:bg-[#111118]
                         border border-gray-100 dark:border-white/[.06]">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${cat.color}20`, border: `2px solid ${cat.color}50` }}>
                <div className="w-4 h-4 rounded-full" style={{ background: cat.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{cat.name}</p>
                {cat.description && <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{cat.description}</p>}
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">{cat.slug}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(cat)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-violet-50 dark:hover:bg-violet-500/10 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button onClick={() => { if (window.confirm('Delete?')) deleteM.mutate(cat._id) }}
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
                {editing ? 'Edit Category' : 'Add Category'}
              </h2>
              <button onClick={close} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-white/[.05]">
                <HiX className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <form onSubmit={submit} className="p-5 space-y-4">
              <div><label className="admin-label">Name *</label>
                <input className="admin-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Category name" /></div>
              <div><label className="admin-label">Description</label>
                <input className="admin-input" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Short description" /></div>
              <div><label className="admin-label">Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})}
                    className="w-12 h-10 rounded-xl cursor-pointer border-0 bg-transparent" />
                  <input className="admin-input flex-1" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} placeholder="#7c3aed" />
                </div>
              </div>
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
