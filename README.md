# Wood CNC Design Shop - RealCNC
**Interior Decorator — Custom Wood & CNC Design**  
*468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan*  
*Contact Number: +92 302 6776926*

---

## 1. Project Overview
A complete, unique, responsive full-stack platform custom-built for **Wood CNC Design Shop - RealCNC**. Designed around an architectural **"Cut-Sheet & Material Ledger"** design philosophy with a predominantly Paper White / Ivory palette (`#FFFFFF`, `#F7F5F1`, `#ECE9E3`), Charcoal Ink text & structural linework (`#221F1C`), and single Walnut Wood accents (`#8A5A34`).

### Strict Verified Data Compliance
This application strictly adheres to verified business information only:
- **No invented reviews, star ratings, or testimonials**
- **No fake founding years, employee counts, or awards**
- **No unsupplied email addresses, WhatsApp numbers, or fake social media channels**
- **Exact empty state messaging:**
  - Projects: `"No projects have been added yet."`
  - Gallery: `"Gallery images will appear here once they are added."`
  - Services: `"No services have been added yet."`

---

## 2. Directory Architecture

```
wood-cnc-design/
├── backend/                  # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── config/db.js      # Resilient MongoDB connection
│   │   ├── models/           # Project, Service, Gallery, Inquiry, User
│   │   ├── controllers/      # Handlers for CRUD & auth
│   │   ├── routes/           # REST endpoints
│   │   ├── middleware/       # JWT protection & central error handler
│   │   ├── seeds/seedData.js # Admin account & default service templates
│   │   └── server.js         # Server entry point
│   ├── .env                  # Environment configuration
│   └── package.json
│
└── frontend/                 # React 18 + Vite + Tailwind CSS + React Router
    ├── src/
    │   ├── components/       # Cut-sheet hero, process strip, swatches, lightbox, SEO
    │   ├── pages/            # Home, About, Services, Portfolio, Details, Process, Gallery, Contact, Admin
    │   ├── services/api.js   # Axios API client
    │   ├── styles/index.css  # Cut-grid toolpaths, hairline borders, palette tokens
    │   ├── App.jsx           # Full React Router hierarchy
    │   └── main.jsx
    ├── index.html            # Verified SEO meta & typography
    ├── tailwind.config.js    # Custom white/ivory/walnut tokens
    ├── vite.config.js        # Vite build & /api proxy
    └── package.json
```

---

## 3. Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB (optional local daemon at `mongodb://127.0.0.1:27017/realcnc` — backend includes graceful resilient fallback so it will run even if local MongoDB service is offline)

### Step 1: Start Backend API
```bash
cd backend
npm install
npm run dev
```
*API runs on `http://localhost:5000`*

### Step 2: Start Frontend Application
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 4. Admin Portal Access

- **URL**: `http://localhost:5173/admin`
- **Default Username**: `admin`
- **Default Password**: `realcnc2026!`
*(Configured securely via `backend/.env`)*

### Admin Capabilities:
1. **Inquiries**: View inquiries submitted by customers through the contact form, update statuses (`new`, `in-progress`, `replied`, `archived`), and remove completed logs.
2. **Projects Archive**: Add real project photography, categories (`Residential`, `Commercial`, `Renovation`, `Other`), dimensions, and status.
3. **Services Ledger**: Update service names, order, descriptions, and toggle visibility on the live site.
4. **Gallery**: Upload and categorize authentic workshop photos with lightbox inspection.
5. **Ledger Tools**: One-click utilities to seed demo samples (clearly labeled) or clear to test strict empty state messages.

---

## 5. Verified Contact & Location
- **Business Name**: Wood CNC Design Shop - RealCNC
- **Category**: Interior Decorator
- **Phone**: `+92 302 6776926`
- **Address**: `468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan`
- **Google Maps**: Built directly from verified address with no invented coordinates.
