# Yunaka Tech

Full Product & Technical Solutions Website

## Features

- Landing Page with Hero, Services, Portfolio, Pricing, CTA sections
- Lead form with database integration and WhatsApp notifications
- Admin panel with login, dashboard, and CRUD operations for leads
- Lead tracking with status updates
- Responsive design (mobile friendly)
- Neobrutalism UI design

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + API)
- **Deployment**: Vercel (Frontend), Supabase (Database)

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL schema from `database/schema.sql`
   - If you want an idempotent setup script for a fresh project, use `database/supabase-bootstrap.sql`
   - Copy your project URL and anon key to `.env.local`
4. Run the development server: `npm run dev`

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_real_supabase_publishable_key
WHATSAPP_NUMBER=your_whatsapp_number
```

`dummy` or `your_*` placeholder values will not work. The app reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` by default, and still supports the older anon-key names as a fallback.

## Database Schema

Tables:
- users (admin authentication)
- services
- portfolio
- leads
- testimonials

## Deployment

- **Frontend**: Deploy to Vercel
- **Database**: Supabase

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
