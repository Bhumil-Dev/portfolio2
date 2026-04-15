import axios from 'axios'

// Empty string → use Vite proxy (/api) — works for both localhost AND mobile on same WiFi
// Set VITE_API_URL in .env only for production deployments
const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Attach token
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('auth-storage')
  if (stored) {
    const { state } = JSON.parse(stored)
    if (state?.token) {
      config.headers.Authorization = `Bearer ${state.token}`
    }
  }
  return config
})

// Handle 401
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

// Auth
export const login = (data) => api.post('/auth/login', data)
export const getMe = () => api.get('/auth/me')

// Portfolio
export const getPortfolio = (params) => api.get('/portfolio', { params })
export const createPortfolioItem = (data) => api.post('/portfolio', data)
export const updatePortfolioItem = (id, data) => api.put(`/portfolio/${id}`, data)
export const deletePortfolioItem = (id) => api.delete(`/portfolio/${id}`)

// Projects
export const getProjects = () => api.get('/projects')
export const createProject = (data) => api.post('/projects', data)
export const updateProject = (id, data) => api.put(`/projects/${id}`, data)
export const deleteProject = (id) => api.delete(`/projects/${id}`)

// Clients
export const getClients = () => api.get('/clients')
export const createClient = (data) => api.post('/clients', data)
export const updateClient = (id, data) => api.put(`/clients/${id}`, data)
export const deleteClient = (id) => api.delete(`/clients/${id}`)
export const updateStats = (data) => api.put('/clients/stats/update', data)

// Categories
export const getCategories = () => api.get('/categories')
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

// Dashboard stats
export const getDashboardStats = () => api.get('/stats/dashboard')

export default api
