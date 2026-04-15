# 🎬 Clip Crafters — Bhumil Prajapati Portfolio

A premium full-stack MERN portfolio with Three.js 3D animations, GSAP transitions, and a secure admin panel.

**Owner:** Bhumil Prajapati  
**Company:** Clip Crafters  
**Contact:** bhumilprajapati4@gmail.com | +91 85118 72920

---

## 🚀 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS |
| Animations | Three.js, GSAP, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| State | Zustand, React Query |

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org) v18+ 
- [MongoDB](https://www.mongodb.com/try/download/community) (local) OR MongoDB Atlas (cloud)

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

**Backend** — `backend/.env` is already created with defaults.  
For production, update `MONGODB_URI` to your MongoDB Atlas connection string.

**Frontend** — `frontend/.env` is already created.

### 3. Run Development Servers

```bash
# Terminal 1 — Backend (runs on port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (runs on port 5173)
cd frontend
npm run dev
```

Open: **http://localhost:5173**

---

## 🔐 Admin Panel

URL: `http://localhost:5173/admin/login`

| Field | Value |
|-------|-------|
| Email | bhumilprajapati4@gmail.com |
| Password | 3004 |

### Admin Features:
- ✅ Dashboard with analytics
- ✅ Portfolio CRUD (add/edit/delete items with video links)
- ✅ GitHub Projects CRUD
- ✅ Clients management + stats editor
- ✅ Categories management

---

## 🎨 Personalization (Single File)

All personal details are in **one file**:

```
frontend/src/config/personal.js
```

Edit this file to update:
- Name, company, tagline, bio
- WhatsApp number, email
- Social links (GitHub, LinkedIn, Instagram)
- Logo (set `logoType: 'image'` and place `logo.png` in `frontend/public/`)
- Stats numbers
- SEO title & description

---

## 🖼️ Adding Your Logo

1. Place your logo file at `frontend/public/logo.png`
2. Open `frontend/src/config/personal.js`
3. Change `logoType: 'text'` → `logoType: 'image'`
4. The logo will appear in the Navbar and About section automatically

---

## 🌐 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set root directory: `frontend`
4. Add env variable: `VITE_API_URL=https://your-backend.onrender.com/api`

### Backend → Render
1. Import repo on [render.com](https://render.com)
2. Set root directory: `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add all env variables from `backend/.env`

### Database → MongoDB Atlas
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create database user
3. Whitelist all IPs: `0.0.0.0/0`
4. Copy connection string → set as `MONGODB_URI` in Render

---

## 📝 API Endpoints

```
POST   /api/auth/login              Admin login
GET    /api/auth/me                 Get current user

GET    /api/portfolio               List portfolio items (public)
POST   /api/portfolio               Create item (admin)
PUT    /api/portfolio/:id           Update item (admin)
DELETE /api/portfolio/:id           Delete item (admin)

GET    /api/projects                List projects (public)
POST   /api/projects                Create project (admin)
PUT    /api/projects/:id            Update project (admin)
DELETE /api/projects/:id            Delete project (admin)

GET    /api/clients                 List clients + stats (public)
POST   /api/clients                 Add client (admin)
PUT    /api/clients/stats/update    Update stats (admin)

GET    /api/categories              List categories (public)
POST   /api/categories              Create category (admin)

GET    /api/stats/dashboard         Dashboard analytics (admin)
```
