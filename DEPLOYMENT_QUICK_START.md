# 🚀 Quick Deployment Checklist

Copy-paste format untuk memudahkan tracking deployment progress.

---

## ✅ Pre-Deployment Checks

- [ ] `.env.local` exists dengan credentials Supabase
- [ ] `git status` shows all files ready
- [ ] No sensitive data in code to be committed
- [ ] `npm run build` succeeds locally
- [ ] All tests pass (if any)

---

## 📤 Step 1: Push ke GitHub

### Команда-by-command

```bash
# Open terminal di project folder
cd d:\Laragon\www\yunakatech

# Check current status
git status

# Stage all files
git add .

# Commit dengan message yang deskriptif
git commit -m "feat: add portfolio image upload and deploy setup"

# Push ke GitHub
git push origin main
```

**Output yang diharapkan:**
```
To https://github.com/YOUR-USERNAME/yunakatech.git
   abc1234..def5678  main -> main
```

✅ **Verifikasi:** https://github.com/YOUR-USERNAME/yunakatech

---

## 🌐 Step 2: Create Vercel Project

### Via Vercel Website:

1. **Login ke [vercel.com](https://vercel.com)** dengan GitHub account
   
2. Click **"Add New" → "Project"**

3. **Select Repository:**
   - Choose your GitHub account
   - Search: `yunakatech`
   - Click "Import"

4. **Configure Project** (biarkan defaults):
   ```
   Project Name: yunakatech
   Framework: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   ```

5. **Environment Variables:**
   
   Tambah 3 variabel berikut (dari Supabase Settings → API):

   ```
   NEXT_PUBLIC_SUPABASE_URL
   Value: https://your-project.supabase.co
   
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   SUPABASE_SERVICE_ROLE_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   ⚠️ Pastikan value-nya **point yang benar dari Supabase!**

6. Click **"Deploy"** dan tunggu selesai (~3-5 menit)

✅ **Verifikasi:** Check dashboard status → green check

---

## 🧪 Step 3: Test Deployment

### Cek URL yang di-berikan Vercel:
```
https://yunakatech.vercel.app
```

### Test functonality:

```
URL Home Page:      https://yunakatech.vercel.app ✓ ?
URL Login:          https://yunakatech.vercel.app/login ✓ ?
URL Admin:          https://yunakatech.vercel.app/admin ✓ ?
URL Portfolio New:  https://yunakatech.vercel.app/admin/portfolio/new ✓ ?

Admin Upload Test:
- [ ] Can access form
- [ ] Can drag-drop image
- [ ] Can see preview
- [ ] Form submits successfully
- [ ] Image appears in Supabase Storage

Check Logs (jika error):
- Vercel Dashboard → Deployments → Latest → "Logs"
```

---

## 🔄 Step 4: Auto-Deployment Setup

**Already enabled by default!**

Test dengan simple change:

```bash
# 1. Local edit (contoh: typo fix)
# 2. Commit & push
git add .
git commit -m "fix: minor typo"
git push origin main

# 3. Check Vercel dashboard → should auto-deploy
# 4. Deployment selesai dalam ~2-3 menit
```

✅ **Verifikasi:** Automatic redeploy setelah push

---

## 📋 Environment Variables Mapping

**Where to find values:**

| Variable | Source | Example |
|----------|--------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → General → Project URL | `https://jxyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Supabase Dashboard → Settings → API → anon public | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role secret | `eyJhbGc...` |

**⚠️ COPY exactly, don't edit values!**

---

## 🆘 Troubleshooting Quick Fixes

### Build Failed on Vercel

**Solution:**
1. Check Vercel logs for error
2. Fix issue locally
3. `git push` again

### Images not loading

**Solution:**
1. Verify Supabase Storage bucket exists: `portfolio-images`
2. Bucket visibility: Public
3. Check `next.config.ts` has Supabase domain

### Connection Error to Supabase

**Solution:**
1. Verify env variables di Vercel dashboard
2. Copy-paste exact values again
3. Wait 5 minutes for deploy to refresh
4. Refresh browser

### Portfolio bucket error

**Solution:**
```bash
# Run locally to create bucket:
npm run dev

# Try upload once locally (creates bucket if missing)
# Then deploy to Vercel
git push origin main
```

---

## 📞 Emergency Contacts

| Issue | Where to Check | Action |
|-------|----------------|--------|
| Build error | Vercel → Deployments → Logs | Check error message, fix local, push again |
| Env variable wrong | Vercel → Settings → Environment Variables | Copy-paste correct value from Supabase |
| Supabase down | Supabase status page | Wait for recovery |
| Domain issues | Vercel → Settings → Domains | Check DNS configuration |

---

## 🎉 Success Criteria

✅ **Deployment successful when:**

- [ ] Green check di Vercel dashboard
- [ ] Live URL accessible
- [ ] Homepage loads without errors
- [ ] Admin login works
- [ ] Portfolio upload form accessible
- [ ] Image upload ke Supabase works
- [ ] Auto-deploy on git push confirmed

---

## 📝 Important URLs to Save

```
GitHub:  https://github.com/YOUR-USERNAME/yunakatech
Vercel:  https://vercel.com/dashboard (projects/yunakatech)
Live:    https://yunakatech.vercel.app
Supabase: https://app.supabase.com (your-project)
```

---

**Next step: Go to DEPLOYMENT_VERCEL_GUIDE.md for detailed instructions!**
