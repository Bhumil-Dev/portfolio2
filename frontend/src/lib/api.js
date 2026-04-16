import axios from 'axios'

/**
 * API Base URL logic:
 *
 * LOCAL DEV  → VITE_API_URL is empty → uses '/api' → Vite proxy forwards to localhost:5000/api
 * PRODUCTION → VITE_API_URL = 'https://your-backend.onrender.com'
 *              → API_BASE becomes 'https://your-backend.onrender.com/api'
 *              → calls resolve to https://your-backend.onrender.com/api/auth/login ✅
 *
 * Route paths stay clean (no /api prefix needed in each call):
 *   api.post('/auth/login')  →  baseURL + /auth/login
 */
const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// ── Request interceptor — attach JWT token ─────────────────────
api.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem('auth-storage')
      if (stored) {
        const { state } = JSON.parse(stored)
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`
        }
      }
    } catch {
      // Ignore JSON parse errors
    }
    return config
  },
  (err) => Promise.reject(err)
)

// ── Response interceptor — handle 401 ─────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('auth-storage')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

// ── Auth ───────────────────────────────────────────────────────
export const login   = (data) => api.post('/auth/login', data)
export const getMe   = ()     => api.get('/auth/me')

// ── Portfolio ──────────────────────────────────────────────────
export const getPortfolio        = (params) => api.get('/portfolio', { params })
export const createPortfolioItem = (data)   => api.post('/portfolio', data)
export const updatePortfolioItem = (id, data) => api.put(`/portfolio/${id}`, data)
export const deletePortfolioItem = (id)     => api.delete(`/portfolio/${id}`)

// ── Projects ───────────────────────────────────────────────────
export const getProjects   = ()           => api.get('/projects')
export const createProject = (data)       => api.post('/projects', data)
export const updateProject = (id, data)   => api.put(`/projects/${id}`, data)
export const deleteProject = (id)         => api.delete(`/projects/${id}`)

// ── Clients ────────────────────────────────────────────────────
export const getClients   = ()           => api.get('/clients')
export const createClient = (data)       => api.post('/clients', data)
export const updateClient = (id, data)   => api.put(`/clients/${id}`, data)
export const deleteClient = (id)         => api.delete(`/clients/${id}`)
export const updateStats  = (data)       => api.put('/clients/stats/update', data)

// ── Categories ─────────────────────────────────────────────────
export const getCategories    = ()           => api.get('/categories')
export const createCategory   = (data)       => api.post('/categories', data)
export const updateCategory   = (id, data)   => api.put(`/categories/${id}`, data)
export const deleteCategory   = (id)         => api.delete(`/categories/${id}`)

// ── Dashboard ──────────────────────────────────────────────────
export const getDashboardStats = () => api.get('/stats/dashboard')

export default api
