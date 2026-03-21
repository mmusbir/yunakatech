# 🚀 Deployment Guide: YunakaTech ke Vercel

Panduan lengkap untuk deploy project Next.js ke Vercel dengan Supabase configuration.

---

## 📋 Prasyarat

✅ GitHub account ([github.com](https://github.com))  
✅ Vercel account ([vercel.com](https://vercel.com)) - bisa sign up via GitHub  
✅ Supabase project (sudah ada)  
✅ Git installed locally  
✅ Project sudah ada `.git` folder (git initialized)

---

## 🔑 Part 1: Siapkan Environment Variables

Sebelum push ke GitHub, pastikan `.env.local` **tidak** di-push. Vercel akan gunakan environment variables dari dashboard.

### Check `.env.local` (sudah ada, jangan di-push)

File `.env.local` di local machine:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

✅ `.gitignore` udah include `.env*` → **tidak akan ter-push**

### Siapkan Environment Variables untuk Vercel

Kumpulkan nilai-nilai ini dari Supabase:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Supabase Dashboard → Settings → General
   - Copy: Project URL

2. **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY**
   - Supabase Dashboard → Settings → API
   - Copy: `anon` public key

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Supabase Dashboard → Settings → API
   - Copy: `service_role` secret key
   - ⚠️ **JANGAN share ini, hanya untuk Vercel!**

---

## 📤 Part 2: Push ke GitHub

### Step 1: Login ke Git (jika belum)

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Step 2: Check Git Status

```bash
cd d:\Laragon\www\yunakatech
git status
```

Expected output:
```
On branch main
Your branch is up to date...

Changes not staged for commit:
  (modified files...)

Untracked files:
  (new files like portfolio-image-upload.tsx)
```

### Step 3: Stage Semua File

```bash
git add .
```

### Step 4: Commit Changes

```bash
git commit -m "feat: add portfolio image upload with Supabase Storage and drag-drop UI"
```

Contoh commit messages yang baik:
- `feat: add portfolio image upload to Supabase`
- `feat: implement drag-and-drop image upload`
- `setup: add Supabase Storage utilities`

### Step 5: Push ke GitHub

```bash
git push origin main
```

Atau jika belum ada remote GitHub:

```bash
# 1. Buka GitHub → buat repository baru (nama: yunakatech)
# 2. Jangan initialize dengan README (biar kosong)
# 3. Lalu jalankan:

git remote add origin https://github.com/YOUR-USERNAME/yunakatech.git
git branch -M main
git push -u origin main
```

✅ Push selesai! Project sekarang di GitHub.

---

## 🌐 Part 3: Connect Vercel & Deploy

### Step 1: Login ke Vercel

Buka [vercel.com](https://vercel.com)
- Klik "Sign Up"
- Pilih "Continue with GitHub"
- Authorize Vercel to access GitHub account Anda

### Step 2: Create New Project

1. Dashboard Vercel → **"Add New..." → "Project"**
2. **Select GitHub Account** (pilih username Anda)
3. **Search Repository** → ketik "yunakatech"
4. Klik **"Import"**

### Step 3: Configure Project

Form yang muncul:

| Setting | Value | Keterangan |
|---------|-------|-----------|
| Project Name | `yunakatech` | Default, bisa ubah |
| Framework | `Next.js` | Auto-detect |
| Root Directory | `./` | Default |
| Build Command | `npm run build` | Default |
| Output Directory | `.next` | Default |
| Install Command | `npm install` | Default |

**JANGAN UBAH**, semuanya sudah benar.

### Step 4: Add Environment Variables

Di halaman sebelum deploy, ada section **"Environment Variables"**

**Add 3 environment variables:**

| Name | Value | Type |
|------|-------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Public |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `eyJxxx...` | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJxxx...` | Secret |

**Copy-paste dari Supabase settings!**

### Step 5: Deploy

Klik tombol **"Deploy"**

⏳ Tunggu ~3-5 menit...

🎉 Selesai! Project deployed ke Vercel!

---

## ✅ Part 4: Verify Deployment

### Check Deployment Status

1. **Vercel Dashboard** → Projects → yunakatech
2. Lihat status:
   - ✅ Green = Deployment Success
   - 🔴 Red = Build Failed (check logs)

### Test Live URL

Vercel akan memberikan URL seperti:
```
https://yunakatech.vercel.app
```

**Test fitur-fitur:**
- [ ] Halaman publik buka normaldapat?
- [ ] Login form bekerja?
- [ ] Admin panel accessible?
- [ ] Portfolio image upload berfungsi?
- [ ] Drag-drop upload ke Supabase jalan?

### Check Logs jika Ada Error

Klik **"Deployments"** → pilih deployment terbaru → **"Logs"**

Error yang umum:
- Missing env variables → Add di Vercel settings
- Build error → Check console output
- Supabase connection error → Verify URL & keys

---

## 🔄 Part 5: Continuous Deployment Setup

### Auto-Deploy pada Push ke GitHub

Already enabled by default di Vercel! 

**Workflow:**
```
1. Edit file lokal
2. git commit & git push origin main
3. Vercel auto-detect → build & deploy
4. ~2-3 menit → live di Vercel
```

### Monitor Deployments

Setiap push ke GitHub → Vercel otomatis deploy:
- Cek status di: **Deployments** tab
- Notifikasi email jika deploy gagal
- Production vs Preview deployments

---

## 🛠️ Part 6: Update Environment Variables

Jika perlu ubah Supabase keys atau tambah env var baru:

### Di Vercel Dashboard:

1. Project Settings → **"Environment Variables"**
2. Edit/tambah variables
3. Redeploy latest production
4. Atau tunggu push berikutnya ke main branch

### Auto-Redeploy:

```bash
# Setelah update env variables, force redeploy:
# Di Vercel → Deployments → "Redeploy" tombol di latest
```

---

## 📝 Checklist Deployment

- [ ] Project initialized dengan git
- [ ] Semua file staged & committed
- [ ] Pushed ke GitHub main branch
- [ ] GitHub repository public/accessible
- [ ] Vercel account created & linked
- [ ] Project imported dari GitHub
- [ ] 3 environment variables added
- [ ] Deployment completed (green status)
- [ ] Portfolio bucket created di Supabase
- [ ] Live URL tested (halaman buka, fitur jalan)
- [ ] Auto-deploy verified (push → langsung deploy)

---

## 🎯 Post-Deployment Tasks

### 1. Setup Custom Domain (Optional)

Vercel → Project Settings → **Domains**
- Add custom domain (contoh: yourdomain.com)
- Follow DNS instructions

### 2. Monitor Performance

Vercel → **Analytics** tab
- Track visits, performance
- Check error rates

### 3. Setup Alerts (Optional)

Vercel → **Settings → Alerts**
- Notifikasi jika deploy gagal
- Notifikasi jika error rate tinggi

### 4. Backup Database

Supabase regular backups:
- Automatic daily backups
- Atau manual via Supabase Dashboard

---

## 🆘 Troubleshooting

### Error: "Build failed"

**Check logs untuk detail error:**
1. Vercel dashboard → Deployments → pilih failed deploy
2. Click "View" → lihat full logs
3. Common issues:
   - TypeScript error → fix lokal, push lagi
   - Missing package → update package.json
   - Env variable missing → add di Vercel

### Error: "Cannot connect to Supabase"

**Check:**
1. Environment variables di Vercel correct?
2. Supabase URL valid & reachable?
3. Service role key di Supabase masih active?

### Error: "Portfolio bucket not found"

**Setup:**
1. Login Supabase dashboard
2. Storage → create bucket "portfolio-images"
3. Set to Public
4. Run function `ensurePortfolioBucketExists()` (ada di code)

### Deployment Failed: Node Version

**Fix di Vercel:**
1. Project Settings → **Node.js Version**
2. Set ke Node 18 atau 20
3. Redeploy

---

## 📚 Useful Commands

```bash
# Local development
npm run dev              # Start dev server
npm run build           # Test build locally
npm run lint            # Check code quality

# Git commands
git status              # Check changes
git add .               # Stage all files
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub
git log                 # View commit history

# Check Node/npm version
node --version
npm --version
```

---

## 🔒 Security Notes

⚠️ **NEVER:**
- Commit `.env.local` ke GitHub
- Share SUPABASE_SERVICE_ROLE_KEY publicly
- Use production keys di development

✅ **DO:**
- Keep credentials in `.env.local` (local only)
- Add sensible variables in Vercel dashboard
- Rotate keys periodically
- Use separate Supabase projects for dev/prod

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Help**: https://help.github.com

---

## ✨ Setelah Deploy Berhasil

🎉 **Project live di**: `https://yunakatech.vercel.app`

### Sharing dengan Tim/Client:

1. **Production URL**: `https://yunakatech.vercel.app`
2. **GitHub Repo**: `https://github.com/YOUR-USERNAME/yunakatech`
3. **Admin login**: Sudah configured di Supabase

### Maintenance:

- Monitor Vercel analytics
- Check Supabase storage usage
- Regular database backups
- Update dependencies (monthly)

---

**Good luck! 🚀**
