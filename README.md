# Yunaka Tech

Neobrutalist company site and admin panel built with Next.js 16, Supabase Auth, and server-driven site settings.

## What Is Included

- Public landing page with shared navbar and footer
- Portfolio listing and project detail pages
- Admin login with Supabase Auth
- Admin portfolio, pricing, and settings panels
- Editable site settings for:
  - site title
  - site description
  - WhatsApp number
  - logo text
  - logo text italic / hide toggles
  - logo image upload
  - favicon upload
- Local fallback for settings storage when `public.site_settings` is not ready in Supabase

## Tech Stack

- Next.js 16 App Router
- React 19
- Supabase Auth and PostgREST
- Tailwind CSS

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
WHATSAPP_NUMBER=6281234567890
```

3. Start the dev server:

```bash
npm run dev
```

4. Open:

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/login`
- Admin settings: `http://localhost:3000/admin/settings`

## Supabase Setup

Run the SQL in [database/supabase-bootstrap.sql](/database/supabase-bootstrap.sql) inside the Supabase SQL Editor.

That bootstrap creates the tables used by the project, including:

- `public.leads`
- `public.site_settings`
- `public.portfolio`
- `public.services`
- `public.testimonials`

If `public.site_settings` has not been created yet, the admin settings page still works by saving to [data/site-settings.json](/data/site-settings.json) and storing uploaded assets under `public/uploads/site/`.

## Important Notes

- `.env` and `.env.local` are ignored by git.
- Site settings prefer Supabase sync, but gracefully fall back to local file storage.
- Uploaded logo and favicon files are stored in `public/uploads/site/`.

## Useful Commands

```bash
npm run dev
npm run build
npx tsc --noEmit
npx eslint .
```
