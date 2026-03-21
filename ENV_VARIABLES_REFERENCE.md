# 🔐 Environment Variables Setup Guide

Complete reference untuk semua environment variables yang dibutuhkan.

---

## 📌 Overview

```
┌─ LOCAL MACHINE (.env.local) ─────────────┐
│  ✓ NEXT_PUBLIC_SUPABASE_URL              │
│  ✓ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  │
│  ✓ SUPABASE_SERVICE_ROLE_KEY             │
└──────────────────────────────────────────┘
                    ↓
        (DO NOT push to GitHub)
        (.gitignore includes .env*)
                    ↓
┌─ VERCEL DASHBOARD ───────────────────────┐
│  ✓ NEXT_PUBLIC_SUPABASE_URL              │
│  ✓ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY  │
│  ✓ SUPABASE_SERVICE_ROLE_KEY             │
└──────────────────────────────────────────┘
                    ↓
           (Used by Vercel builds)
```

---

## 🔍 Variable Details

### 1. NEXT_PUBLIC_SUPABASE_URL

**Type:** Public (visible in browser)  
**Prefix:** `NEXT_PUBLIC_` = Client & Server accessible  
**Required:** Yes  
**Value Format:** `https://xxxxxxxxxxxx.supabase.co`

**Where to find:**
1. Login ke Supabase Dashboard
2. Pilih project
3. Click **Settings** (gear icon)
4. Go to **"General"** tab
5. Copy: **Project URL**

**Example:**
```
https://jxyz1234abcd.supabase.co
```

**Usage in code:**
```typescript
// Next.js akan auto-load dari process.env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
```

---

### 2. NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

**Type:** Public (visible in browser)  
**Prefix:** `NEXT_PUBLIC_` = Client & Server accessible  
**Required:** Yes  
**Value Format:** JWT token (panjang)

**Where to find:**
1. Supabase Dashboard → Settings
2. Go to **"API"** tab
3. Section: **"Project API keys"**
4. Copy: **"anon public"** key (bukan service_role!)

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHl6..."
```

**Usage in code:**
```typescript
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
```

---

### 3. SUPABASE_SERVICE_ROLE_KEY

**Type:** Secret (NOT visible in browser)  
**Prefix:** NO prefix = Server-only  
**Required:** Yes  
**Value Format:** JWT token (panjang)  
**Sensitivity:** ⚠️ **HIGH** - Jangan share!

**Where to find:**
1. Supabase Dashboard → Settings → **"API"** tab
2. Section: **"Project API keys"**
3. Copy: **"service_role secret"** key
4. ⚠️ Scroll down, ada tombol "Reveal"

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHl6..."
```

**Security notes:**
- ✅ Safe di `.env.local` (tidak di-version control)
- ✅ Safe di Vercel env var (encrypted)
- ❌ Tidak boleh di `.env.public.local`
- ❌ Tidak boleh di GitHub
- ❌ Tidak boleh di-share

**Usage in code:**
```typescript
// Server-side only (getSupabase() atau API routes)
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
```

---

## 🔑 How to Get All Keys from Supabase

### Step-by-step:

1. **Login ke https://app.supabase.com**
   
2. **Select your project** (yunakatech-related)

3. **Click Settings** (⚙️ icon di sisi kiri)

4. **Go to "General" tab:**
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`

5. **Go to "API" tab:**
   - Find section **"Project API keys"**
   
   **Two keys:**
   ```
   anon public: eyJhbGc...  ← NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
   service_role: eyJhbGc... ← SUPABASE_SERVICE_ROLE_KEY
   ```

6. **Copy exact values** (jangan edit!)

---

## 💾 Local Setup (.env.local)

### Create file `.env.local` di root project:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Verify setup:

```bash
# Check if .env.local exists
ls -la .env.local

# Check if variables loaded (dev server)
npm run dev

# Should see in logs: ✓ Ready in xxx
```

---

## ☁️ Vercel Setup (Environment Variables)

### After importing project to Vercel:

1. **Go to Project Settings**
   - Vercel Dashboard → yunakatech → Settings

2. **Navigate to "Environment Variables"**
   - Left sidebar → Environment Variables

3. **Add 3 variables:**

**Variable 1:**
```
Name:  NEXT_PUBLIC_SUPABASE_URL
Value: https://jxyz1234.supabase.co
Select: Production, Preview, Development
```

**Variable 2:**
```
Name:  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Select: Production, Preview, Development
```

**Variable 3:**
```
Name:  SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Select: Production, Preview, Development
```

4. **Click "Add Environment Variable"** untuk setiap variable

5. **Redeploy** project agar change terpakai

---

## ✅ Verify Variables Work

### Local:

```bash
npm run dev

# Akses http://localhost:3000/admin
# Coba login → kalau redirect to Supabase, berarti variables ok
```

### Vercel:

```bash
# After setting env vars, redeploy:
# Vercel dashboard → Deployments → "Redeploy" latest
# Tunggu ~3 menit

# Test live URL:
# https://yunakatech.vercel.app/admin
# Coba login
```

---

## 🔄 Updating Variables

### Local changes:

1. Edit `.env.local`
2. Save & restart dev server (`npm run dev`)

### Vercel changes:

1. **Vercel dashboard** → Settings → Environment Variables
2. Edit value
3. **Redeploy latest deployment** untuk apply changes
4. Wait ~3-5 menit

---

## 🛡️ Security Checklist

- [ ] `.env.local` exists locally (never committed)
- [ ] `.gitignore` includes `.env*`
- [ ] No credentials in code/comments
- [ ] Environment variables set di Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` marked as Secret di Vercel
- [ ] No credentials shared publicly
- [ ] Regular rotation of keys (if needed)

---

## 🆘 Troubleshooting

### Error: "Missing Supabase environment variables"

**Cause:** Env variables not loaded  
**Fix:**
1. Check `.env.local` exists & has correct values
2. Restart dev server: `npm run dev`
3. Check variable names are EXACT (case-sensitive)

### Error: "Cannot connect to Supabase" (on Vercel)

**Cause:** Env variables tidak ada di Vercel  
**Fix:**
1. Go to Vercel Settings → Environment Variables
2. Verify all 3 variables ada & value correct
3. Redeploy project

### "Service role key" error

**Cause:** Menggunakan anon key di server-side  
**Fix:**
1. Pastikan menggunakan `SUPABASE_SERVICE_ROLE_KEY` di server-side
2. Pastikan variable ada di Vercel
3. Redeploy

### Image URLs not working

**Cause:** Supabase domain tidak di-whitelist  
**Fix:**
1. Check `next.config.ts` has:
   ```typescript
   {
     protocol: "https",
     hostname: "*.supabase.co",
     pathname: "/**",
   }
   ```
2. Redeploy

---

## 📚 Variable Usage in Code

### Getting variables:

```typescript
// Client-side (React components)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

// Server-side (API routes, server actions)
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Checking in code
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}
```

### Example usage:

```typescript
// app/lib/supabase.ts
export function createSupabaseClient() {
  return new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  )
}

// app/lib/supabase-server.ts
export function getSupabase() {
  return new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}
```

---

## 📋 Variable Checklist

### Before deploying to Vercel:

- [ ] `.env.local` file created locally
- [ ] All 3 variables in `.env.local` with correct values
- [ ] `.gitignore` includes `.env*`
- [ ] `npm run dev` works without errors
- [ ] Can access `/admin` page (login redirect = Supabase ok)

### On Vercel Dashboard:

- [ ] Project imported from GitHub
- [ ] All 3 environment variables added
- [ ] Values copied EXACTLY from Supabase (no edits)
- [ ] Production/Preview/Development all selected
- [ ] Deployment completed successfully
- [ ] Live URL works (check /admin page)

---

**Reference:** See DEPLOYMENT_VERCEL_GUIDE.md untuk complete deployment steps
