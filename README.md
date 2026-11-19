# UNIQUE — Luxury Community & Social Service Event Management Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.3.0-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-7.9.0-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.7.26-orange?style=for-the-badge)](https://www.better-auth.com/)
[![JWT](https://img.shields.io/badge/JWT-Protected_APIs-purple?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)

A modern, full-stack event management platform purpose-built for grassroots volunteerism, environmental cleanups, winter relief drives, tree plantations, and civic welfare campaigns. Designed with a luxury visual identity featuring champagne gold (`#D9A441`), deep teal (`#0f766e`), charcoal (`#101010`), and soft ivory (`#FAF8F5`).

---

## Table of Contents
- [Key Features](#key-features)
- [Challenge Requirements Implemented](#challenge-requirements-implemented)
- [Tech Stack](#tech-stack)
- [Architecture & Database Design](#architecture--database-design)
- [API Endpoints Reference](#api-endpoints-reference)
- [Getting Started & Local Setup](#getting-started--local-setup)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
- [Environment Variables](#environment-variables)
- [Theme System](#theme-system)
- [Responsive Layout & Performance](#responsive-layout--performance)

---

## Key Features

1. **Chronological Scheduling & Smart Sorting**:
   - Nearest upcoming initiatives are sorted ascending by date (coming date first).
   - Past initiatives are automatically filtered out from active calendars and archived cleanly into a transparent history gallery.
2. **Category & Keyword Filtering**:
   - Interactive category pills (`All`, `Donation`, `Cleanup`, `Plantation`, `Winter Relief`, `Food Drive`, `Health Camp`, `Education`).
   - Instant multi-field client-side search across title, venue location, and description.
3. **Volunteer Participation & Drive Enrollment**:
   - One-click volunteer registration on event details pages with duplicate participation prevention.
   - Live registered volunteer counter syncing directly with MongoDB Atlas.
4. **Organizer Management Portal**:
   - Organizers can view all events they created, inspect volunteer counts, update details via a dedicated modal, or safely delete events with confirmation.
5. **User Profile & Activity Hub**:
   - Dedicated `/profile` route with stats (Drives Created, Drives Joined, Community Badge).
   - Profile update form allowing users to update their **Display Name** and **Profile Picture** (supporting direct device photo upload with client-side canvas downsampling to Base64 JPEG or image URL).
6. **Photographic Impact Gallery & Newsletter**:
   - Interactive photo lightbox featuring verified past community initiatives.
   - Responsive newsletter subscription module with feedback validation.

---

## Challenge Requirements Implemented

### 1. Form Validation
- **Create & Update Event Forms**:
  - **Event Title**: Required, minimum 5 characters.
  - **Event Category**: Required, valid initiative category selection.
  - **Event Date**: Required, strictly future-dated (past and today dates rejected).
  - **Venue Location**: Required, minimum 3 characters.
  - **Event Description**: Required, minimum 20 characters.
  - Dual-layer validation: real-time client feedback + strict backend route enforcement.
- **Authentication Forms (`/signin`, `/signup`)**:
  - **Full Name**: Required, minimum 2 characters.
  - **Email**: Strict RFC-compliant regex validation.
  - **Password**: Minimum 6 characters with live visual criteria checklist (minimum length, uppercase letter, lowercase letter, number/special character).
  - Password show/hide toggles and toast notifications.

### 2. Full System Theme Customization (Light / Dark)
- Seamless theme toggling via `ThemeToggle.jsx` located in both desktop and mobile navigation.
- Persistent state saved to `localStorage` and synchronized across all open tabs via custom `theme-changed` window events.
- Zero-flash hydration utilizing early `<Script strategy="beforeInteractive">` injection in `RootLayout`.
- Strict contrast compliance across both modes:
  - **Navbar**: Adapts between a transparent overlay on the Home page hero to a solid blurred header on scroll or internal pages (`bg-white/95 text-gray-900` vs. `dark:bg-[#101010]/95 dark:text-[#F5F1E8]`).
  - **Cards, Modals & Dropdowns**: Fully styled with `dark:bg-[#181818]`, `dark:border-white/10`, and dark-mode text variants.

### 3. JWT Authentication & API Protection
- Dedicated `/jwt` endpoint generates cryptographically signed tokens containing user claims (`email`, `name`, `id`).
- Custom `requireJwtAuth` middleware guards all write/modify operations:
  - `POST /events` (Create Event)
  - `PUT /events/:id` (Update Event)
  - `DELETE /events/:id` (Delete Event)
  - `POST /events/:id/join` (Join Event)
  - `GET /events/user/:email` (Manage User Events)
  - `GET /user/joined-events` (Joined Events)
  - `GET /user/profile` & `PUT /user/profile` (Profile Operations)
- Client-side token caching in `sessionStorage` with automated retrieval via `getAuthHeaders()`.

### 4. Custom Loading Skeletons
- Responsive loading skeletons matching real component layouts:
  - `EventCardSkeleton.jsx`: Image banner, category pill, title, location, and button skeletons.
  - `EventDetailsSkeleton.jsx`: Hero photo, stats metrics bar, description block, guidelines card, and action button skeletons.
  - `ManageEventSkeleton.jsx`: Dashboard cards with action buttons skeletons.
- Route-level Next.js App Router Suspense loading screens (`loading.jsx`) in:
  - `src/app/upcoming-events/loading.jsx`
  - `src/app/events/[id]/loading.jsx`
  - `src/app/events/joined/loading.jsx`
  - `src/app/events/manage/loading.jsx`
  - `src/app/profile/loading.jsx`

---

## Tech Stack

### Frontend
- **Framework**: [Next.js 16.4.6](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.3.0](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), DaisyUI v5, HeroUI
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication Client**: [Better Auth](https://www.better-auth.com/) + OAuth Providers (Google, GitHub)
- **Dates**: `date-fns` & Native Intl Formatter

### Backend
- **Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express.js 5.3.0](https://expressjs.com/) (ES Modules)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) with native `mongodb` 7.9.0 driver
- **Security & Tokens**: JWT (HMAC-SHA256 signature and verification)
- **CORS & Environment**: `cors`, `dotenv`

---

## Architecture & Database Design

### MongoDB Database: `EventManagement`

1. **`event` Collection**:
   ```json
   {
     "_id": "ObjectId",
     "eventTitle": "Clean Dhaka Community Drive",
     "eventType": "Cleanup",
     "eventDate": "2026-12-15",
     "location": "Dhanmondi Lake, Dhaka",
     "thumbnailImageUrl": "https://... or data:image/jpeg;base64,...",
     "eventDescription": "Community volunteer drive focused on lake shoreline restoration...",
     "organizerEmail": "organizer@example.com",
     "organizerName": "Organizer Name",
     "joinedCount": 24,
     "createdAt": "2026-11-19T10:00:00.000Z"
   }
   ```

2. **`joinedEvents` Collection**:
   ```json
   {
     "_id": "ObjectId",
     "eventId": "65b...",
     "eventTitle": "Clean Dhaka Community Drive",
     "eventType": "Cleanup",
     "eventDate": "2026-12-15",
     "location": "Dhanmondi Lake, Dhaka",
     "thumbnailImageUrl": "https://...",
     "eventDescription": "...",
     "userId": "usr_...",
     "userName": "Volunteer Name",
     "userEmail": "volunteer@example.com",
     "joinedAt": "2026-11-19T12:00:00.000Z"
   }
   ```

3. **Better Auth Collections**:
   - `user`: User profiles, display names, emails, avatar URLs.
   - `session`: Active authenticated user sessions.
   - `account`: Federated credentials and OAuth connections (Google, GitHub).

---

## API Endpoints Reference

### Public Routes
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API Health Check |
| `GET` | `/events` | Get all events (supports `?timeframe=upcoming\|past&eventType=...&limit=6`) |
| `GET` | `/events/upcoming` | Get upcoming events sorted ascending by date (nearest first) |
| `GET` | `/events/past` | Get past events sorted descending by date |
| `GET` | `/events/:id` | Get single event details with live volunteer count |

### Authentication & JWT
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/jwt` | Generate a signed JWT token from user email/claims |

### Protected Routes (Requires `Authorization: Bearer <JWT>`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/events` | Create a new community event (strict validation enforced) |
| `PUT` | `/events/:id` | Update an existing event (creator only) |
| `DELETE` | `/events/:id` | Delete an existing event (creator only) |
| `POST` | `/events/:id/join` | Join an event as a volunteer (double-join prevention) |
| `GET` | `/events/user/:email` | Get all events organized by a specific user |
| `GET` | `/user/joined-events` | Get all events joined by the authenticated user |
| `GET` | `/user/profile` | Get user profile info, created count, and joined count |
| `PUT` | `/user/profile` | Update user display name and profile picture |

---

## Getting Started & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) (version 9.x or higher)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection string

---

### 1. Backend Setup

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd event-management-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `event-management-backend` directory with your database credentials:
   ```env
   PORT=5000
   MONGO_USERNAME=your_mongo_username
   MONGO_PASSWORD=your_mongo_password
   JWT_SECRET=your_jwt_secret_key_here
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

---

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd event-maagement-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `event-maagement-frontend` directory:
   ```env
   BETTER_AUTH_SECRET=your_better_auth_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000

   MONGODB_URL=mongodb://your_mongo_username:your_mongo_password@your_cluster.../EventManagement?ssl=true&authSource=admin

   # Optional: Google & GitHub OAuth Credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Theme System

The application provides a theme toggle button in the navbar allowing users to switch between **Light Mode** and **Dark Mode**:

- **Light Mode Palette**:
  - Background: Crisp White (`#FFFFFF`) & Soft Ivory (`#FAF8F5`)
  - Primary Accents: Champagne Gold (`#D9A441`) & Deep Teal (`#0f766e`)
  - Typography: Charcoal (`#101010`) & Muted Slate (`#666666`)
  - Borders: Warm Linen (`#E8E2D5`)
- **Dark Mode Palette**:
  - Background: Deep Charcoal (`#101010`) & Surface Dark (`#181818`)
  - Accents: Champagne Gold (`#D9A441`) & Emerald Teal (`#14b8a6`)
  - Typography: Ivory White (`#F5F1E8`) & Soft Gray (`#9ca3af`)
  - Borders: Translucent White (`border-white/10`)

---

## Responsive Layout & Performance

- **Mobile First**: All pages, forms, tables, cards, and modals adapt across extra small screens (`<640px`), tablets (`768px - 1024px`), and large desktop displays (`1280px+`).
- **Next.js Image Optimization**: Responsive images utilize Next.js `<Image fill sizes="..." priority />` with container aspect ratios to avoid layout shift (CLS).
- **Client-Side Photo Resizing**: Profile avatar uploads automatically utilize an HTML5 canvas downsampling utility, ensuring photos are resized to an optimized 800px JPEG to protect database payloads.
- **Zero Cascading Renders**: Fully compliant with React 19 standards and clean state synchronization.

---

## Author & License
- **Author**: Riyad Khandakar
- **Project**: Assignment 9 — Social Service & Community Event Management
- **License**: ISC
