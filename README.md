# Aurelia Global Academy — Official School Website 🎓

A modern, responsive, and interactive website for **Aurelia Global Academy**, a premier CBSE-affiliated Senior Secondary School in Gurugram, Haryana (Affiliation No. 531849 | School Code: 41822).

Built with **React 19**, **Next.js 16 (App Router)**, **Tailwind CSS**, and **pure JavaScript (JSX/JS)**.

---

## 🌟 Key Features

1. **Brand Identity & Academic Crest:**
   - Custom inline SVG emblem with academic shield, open book, rising sun, and laurel branches in Deep Navy (`#0F2547`) and Warm Gold (`#D99B26`).
2. **Top Utility Strip & Navigation:**
   - Admissions 2027-28 announcement ticker, CBSE affiliation badge, helpline, email, and "Parent ERP Login" trigger.
   - Sticky navbar with smooth SPA view switching and responsive mobile drawer.
3. **Hero Section & Key Metrics:**
   - Architectural campus banner with navy gradient overlay, dual CTAs ("Start 2027-28 Application" & "Explore Campus"), and floating admissions card.
   - 4-column metrics: 28+ Years of Excellence, 15:1 Student-Teacher Ratio, 100% CBSE Pass Rate, and 18-Acre Green Campus.
4. **Principal’s Desk:**
   - Message and philosophy from Principal Dr. Meera Krishnan with credentials and cursive signature styling.
5. **Academic Wings Overview:**
   - Interactive 4-card curriculum breakdown: Foundational Pre-Primary, Primary Wing, Middle School, and Senior Secondary (Science, Commerce, Humanities).
6. **Live Notice Board & Events:**
   - Categorized circulars (All, Circulars, Exams, Holidays) with **Official School Circular modal viewer**.
   - Upcoming school events calendar with interactive "Add Reminder" toast notifications.
7. **Interactive Fee Estimator (₹ INR):**
   - Dynamic annual fee calculator: select Grade (Nursery through Grade XII) and optional Bus Transport zone to view tuition, development fee, and quarterly breakdown.
8. **Online Admission Enquiry:**
   - Validated multi-field form that generates dynamic Application Reference IDs (e.g. `AGA-2027-XXXX`) and an official printable slip modal.
9. **Campus & Filterable Photo Gallery:**
   - 5-category filterable photo grid with full-screen Lightbox modal, captions, and keyboard arrow navigation.
10. **CBSE Mandatory Public Disclosure (Appendix-IX):**
    - Statutory compliance tables with **simulated official certificate preview modals** (Affiliation Letter, Trust Registration, NOC, Fire Safety, Building Safety) and 3-year board exam results.
11. **Parent ERP Portal (Demo Mode):**
    - One-click demo credentials autofill + interactive student dashboard (attendance tracker, fee ledger with printable receipt preview, grades, teacher remarks).
12. **Admissions AI Assistant:**
    - Collapsible floating bottom-right chat widget with instant FAQ chips and free-form NLP query matching.
13. **Campus Tour Booking & Footer:**
    - Working tour scheduler with slot selection and confirmation toast.
    - 4-column footer with compliance links, route map card, and newsletter subscription.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS (Custom Color Palette & Typography)
- **Icons:** Lucide React
- **Language:** Strictly Pure JavaScript (ES Modules, JSX — No TypeScript)
- **Fonts:** Plus Jakarta Sans & Inter (via `next/font/google`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+ installed
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/DeveshYadav9107/School-Website.git

# Navigate into the project folder
cd School-Website

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server with hot reload
npm run dev

# Open in browser: http://localhost:3000
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
├── .gitignore
├── jsconfig.json          # Path alias configuration (@/* -> ./src/*)
├── next.config.mjs        # Next.js configuration (remote image patterns)
├── package.json           # Dependencies and scripts (ES Modules)
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind design system configuration
├── index.html             # Standalone single-file HTML preview
└── src/
    ├── app/
    │   ├── globals.css    # Global styles & print utilities
    │   ├── layout.jsx     # Root layout with fonts & ToastProvider
    │   └── page.jsx       # Main single-page application router
    ├── components/
    │   ├── AcademicWings.jsx
    │   ├── AdmissionEnquiryForm.jsx
    │   ├── AdmissionsChatbot.jsx
    │   ├── CampusGallery.jsx
    │   ├── CampusTourScheduler.jsx
    │   ├── Emblem.jsx
    │   ├── FacilitiesShowcase.jsx
    │   ├── FeeEstimator.jsx
    │   ├── Footer.jsx
    │   ├── Hero.jsx
    │   ├── MandatoryDisclosure.jsx
    │   ├── MetricsStrip.jsx
    │   ├── Navbar.jsx
    │   ├── NoticeBoardEvents.jsx
    │   ├── ParentErpModal.jsx
    │   ├── PrincipalWelcome.jsx
    │   └── TestimonialsCarousel.jsx
    ├── context/
    │   └── ToastContext.jsx
    └── data/
        └── academyData.js
```

---

## 🌐 Deployment

This project is fully configured and deployment-ready for top cloud platforms.

### 1. Deploy on Vercel (Recommended)
1. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
2. Select and import the GitHub repository: `DeveshYadav9107/School-Website`.
3. Vercel automatically detects **Next.js**:
   - **Framework Preset:** `Next.js`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
4. Click **Deploy**. Your website will be live in under 1 minute with automatic SSL and global CDN!

### 2. Deploy on Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Netlify will detect `@netlify/plugin-nextjs` or standard Next.js build.
3. Click **Deploy Site**.

### 3. Deploy via Docker or Node Server
```bash
npm run build
npm start
```

---

## 📜 License & Accreditation
Designed and developed for **Aurelia Global Academy**, Gurugram. Affiliated with the Central Board of Secondary Education (CBSE), New Delhi.
