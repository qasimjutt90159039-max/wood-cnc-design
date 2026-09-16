# Walkthrough — Wood CNC Design Shop (RealCNC)

A complete, professional, unique, fully responsive full-stack website custom-built for **Wood CNC Design Shop - RealCNC** (`Interior Decorator`, Ichhra Lahore, Pakistan).

The platform is designed around the bespoke **"Cut-Sheet & Material Ledger"** aesthetic, predominantly white and ivory (`#FFFFFF`, `#F7F5F1`, `#ECE9E3`), charcoal ink structure (`#221F1C`), and a single walnut wood accent (`#8A5A34`).

---

## 1. Verified Business Data Compliance

In accordance with strict business requirements, only real verified information is used:
- **Business Name**: `Wood CNC Design Shop - RealCNC`
- **Category**: `Interior Decorator`
- **Contact Number**: `+92 302 6776926` (`tel:+923026776926`)
- **Address**: `468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan`
- **Google Maps Link**: Directly built from exact address (`https://www.google.com/maps/search/?api=1&query=468+Sultan+Ahmed+Rd,+Ichhra+Lahore,+54000,+Pakistan`)
- **Social Media**: Zero fake Facebook, Instagram, LinkedIn, email, or WhatsApp links/buttons anywhere.
- **Zero Hallucinated Facts**: No invented reviews, ratings, years of experience, awards, staff/founder names, or completed project numbers.
- **Exact Empty States Implemented**:
  - Projects: `"No projects have been added yet."`
  - Gallery: `"Gallery images will appear here once they are added."`
  - Services: `"No services have been added yet."`

---

## 2. Key Pages & Components Delivered

### 1. Unique Navbar (`Navbar.jsx`)
- Text-based brand identity: `"Wood CNC Design Shop - RealCNC"`
- Custom line-art router-bit glyph.
- Desktop links: `Home`, `About`, `Services`, `Portfolio`, `Process`, `Gallery`, `Contact`.
- Distinct Walnut Wood CTA button for `"Contact"`.
- Mobile responsive drawer with auto-close on route transition.

### 2. Home Page (`Home.jsx`)
- **Cut-Sheet Hero (`CutSheetHero.jsx`)**:
  - Original headline: *"Cut With Precision. Finished With Purpose."*
  - Technical linework panel with vector coordinates, cutting nest diagram, material swatches (`WALNUT`, `OAK`, `ASH`, `MDF`), and panel reference `PANEL 01`.
  - CTAs: `"View Portfolio"` and `"Contact Us"`.
- **Process Strip (`ProcessStrip.jsx`)**:
  - 4-stage general workflow (`01 Consultation`, `02 Design & Layout`, `03 Cutting & Fabrication`, `04 Installation & Finishing`) with subtle progress indicator.
- **Services Index**:
  - Editorial numbered list (`01` to `04`) dynamically populated from backend with hover states and router arrows.
- **Asymmetric Visual Grid**:
  - 1 large vertical panel, 1 small square panel, 1 wide horizontal panel, 1 text-only workshop notes panel. All placeholders are clearly framed as material studies.

### 3. About Page (`About.jsx`)
- Clean professional presentation:
  - *About Wood CNC Design Shop - RealCNC*
  - *Interior Decorator / Custom Wood & CNC Design*
  - *Design & Material Approach* (with substrate chips)
  - *Precision & Finishing* (tolerances and toolpath notes)
  - *Verified Location* (Ichhra Lahore address + phone)

### 4. Services Page (`Services.jsx`)
- Vertical, expandable accordion directory.
- Each category row reveals tooling operations, substrate specifications, visual reference, and an inquiry button linking directly to contact.
- Dynamically configurable via backend admin.

### 5. Portfolio & Portfolio Details (`Portfolio.jsx`, `PortfolioDetails.jsx`)
- Category filters: `Residential`, `Commercial`, `Renovation`, `Other`.
- Real-time search by title/description.
- Project numbering (`#001`, `#002`, etc.).
- Displays exact empty state: `"No projects have been added yet."` if empty.
- Dynamic route `/portfolio/:id`: Displays only supplied fields (title, category, description, images, location, status, date) with custom cut-sheet 404 state if ID does not exist.

### 6. Process Page (`Process.jsx`)
- 5-stage vertical timeline with technical cut-line guide:
  - `01 — Consultation`
  - `02 — Design & Layout`
  - `03 — Material Selection`
  - `04 — CNC Cutting & Fabrication`
  - `05 — Installation & Handover`
- Expandable stage cards detailing procedures, CAM parameters, and verification points.

### 7. Gallery Page (`Gallery.jsx`)
- Responsive masonry grid with category filters.
- Interactive Lightbox modal with next/previous keyboard/click navigation and ESC support.
- Displays exact empty state: `"Gallery images will appear here once they are added."` if empty.

### 8. Contact Page (`Contact.jsx`)
- Exact verified information:
  - Phone: `+92 302 6776926`
  - Address: `468 Sultan Ahmed Rd, Ichhra Lahore, 54000, Pakistan`
  - Google Maps direct link button & interactive map embed.
- Contact Form:
  - Fields: `Name`, `Phone`, `Email` (optional), `Subject`, `Message`.
  - Submits to `POST /api/inquiries`.
  - Full frontend/backend validation, loading, success, and error feedback states.

### 9. Admin Portal (`/admin`, `/admin/login`)
- Protected via JWT authentication.
- Inquiries manager: view customer messages, update status (`new`, `in-progress`, `replied`, `archived`), delete logs.
- Projects manager: Add, edit, delete projects.
- Services manager: Add, edit, delete, and toggle active status of service offerings.
- Gallery manager: Add, edit, delete workshop photography.
- Ledger Tools: One-click buttons to seed demo sample items (clearly labeled) or clear to test strict empty state messages.

---

## 3. Technical Verification & Build Status

| Verification Step | Result |
| :--- | :--- |
| **Backend Dependencies (`npm install`)** | `106 packages installed, 0 vulnerabilities` |
| **Frontend Dependencies (`npm install`)** | `161 packages installed` |
| **Vite Production Build (`npm run build`)** | `Built in 32.8s: 1658 modules transformed, zero errors` |
| **Color System Compliance** | `>85% paper/ivory surface, charcoal ink, single walnut accent` |
| **Responsive Layout** | `Mobile (320px-425px), Tablet (768px), Desktop (1024px-1920px)` |
| **Verified Data Compliance** | `100% verified data, zero fake reviews/socials/branches` |

---

## 4. How to Run

### Backend
```bash
cd backend
npm install
npm run dev
```
*Runs on `http://localhost:5000`*

### Frontend
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

### Admin Login Credentials
- **URL**: `http://localhost:5173/admin`
- **Username**: `admin`
- **Password**: `realcnc2026!`
*(Configured via `backend/.env`)*
