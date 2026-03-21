# 🚀 Deployment Documentation Index

Complete guide untuk deploy YunakaTech project ke Vercel dengan Supabase.

---

## 📚 Documentation Files

### 1. **START HERE** → [`GITHUB_SETUP_GUIDE.md`](GITHUB_SETUP_GUIDE.md)
   - Setup Git locally
   - Create GitHub repository
   - Push code to GitHub
   - **Duration:** ~10 minutes

### 2. **Then Read** → [`DEPLOYMENT_VERCEL_GUIDE.md`](DEPLOYMENT_VERCEL_GUIDE.md)
   - Detailed Vercel deployment steps
   - Environment variables configuration
   - Testing & verification
   - Troubleshooting guide
   - **Duration:** ~20 minutes (including wait time)

### 3. **Quick Reference** → [`DEPLOYMENT_QUICK_START.md`](DEPLOYMENT_QUICK_START.md)
   - Step-by-step checklist
   - Command-by-command execution
   - Common troubleshooting fixes
   - **Duration:** ~5 minutes (reference)

### 4. **Technical Details** → [`ENV_VARIABLES_REFERENCE.md`](ENV_VARIABLES_REFERENCE.md)
   - Complete environment variables guide
   - Where to find each variable
   - Security best practices
   - Code usage examples
   - **Duration:** ~10 minutes

### 5. **Portfolio Feature** → [`PORTFOLIO_IMAGE_UPLOAD_SETUP.md`](PORTFOLIO_IMAGE_UPLOAD_SETUP.md)
   - Setup Supabase Storage bucket
   - Configure image upload feature
   - Drag-and-drop usage

---

## ⏱️ Total Timeline

```
GitHub Setup              ~10 min
├─ Config Git
├─ Create repo
└─ Push code

Vercel Deployment         ~15 min
├─ Create Vercel account
├─ Import from GitHub
├─ Add env variables
└─ Deploy

Testing & Verification    ~5 min
├─ Check live URL
├─ Test features
└─ Monitor logs

TOTAL TIME: ~30 minutes (+ waiting for builds)
```

---

## 🎯 Quick Start (TL;DR)

### If you just want to get started:

**Terminal commands:**
```bash
# 1. Navigate to project
cd d:\Laragon\www\yunakatech

# 2. Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 3. Stage & commit all changes
git add .
git commit -m "feat: add portfolio image upload and deployment setup"

# 4. Add GitHub remote (if not already done)
git remote add origin https://github.com/YOUR-USERNAME/yunakatech.git
git branch -M main

# 5. Push to GitHub
git push -u origin main
```

**Then on Vercel:**
1. Go to https://vercel.com (sign in with GitHub)
2. Click "Add New" → "Project"
3. Select `yunakatech` repository
4. Add 3 environment variables (from Supabase)
5. Click "Deploy"
6. Wait ~3-5 minutes
7. Click the live URL

**Done! 🎉**

For more details, read the documentation files above.

---

## 📊 Prerequisites Checklist

Before starting deployment:

- [ ] GitHub account created (https://github.com)
- [ ] Vercel account created (https://vercel.com) 
- [ ] Git installed on computer
- [ ] Supabase project setup & credentials available
- [ ] `.env.local` file with all 3 Supabase keys
- [ ] Project tested locally (`npm run dev` works)
- [ ] All new files staged (`git status` shows changes)

---

## 🔐 Environment Variables Needed

Get these from Supabase before starting:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

See [`ENV_VARIABLES_REFERENCE.md`](ENV_VARIABLES_REFERENCE.md) for detailed instructions.

---

## 🔄 Workflow Overview

```
┌─────────────────────────────┐
│   LOCAL DEVELOPMENT         │
│   (Your Computer)           │
│   npm run dev               │
└──────────┬──────────────────┘
           │
           ↓ git push
┌─────────────────────────────┐
│   GITHUB REPOSITORY         │
│   (Code Storage)            │
│   github.com/username/repo  │
└──────────┬──────────────────┘
           │
           ↓ auto-import & build
┌─────────────────────────────┐
│   VERCEL DEPLOYMENT         │
│   (Live Website)            │
│   yunakatech.vercel.app     │
└──────────┬──────────────────┘
           │
           ↓ connect
┌─────────────────────────────┐
│   SUPABASE DATABASE         │
│   (Data & Storage)          │
│   supabase.co               │
└─────────────────────────────┘
```

---

## 📁 Project Structure for Deployment

```
yunakatech/
├── app/                          # Next.js app directory
│   ├── admin/
│   │   ├── components/
│   │   │   └── portfolio-image-upload.tsx   ✨ NEW
│   │   └── portfolio/
│   │       ├── actions.ts        ✏️ UPDATED
│   │       └── project-form.tsx  ✏️ UPDATED
│   └── lib/
│       ├── supabase-storage.ts   ✨ NEW
│       └── ... other libs
├── GITHUB_SETUP_GUIDE.md         ← Start here
├── DEPLOYMENT_VERCEL_GUIDE.md    ← Full guide
├── DEPLOYMENT_QUICK_START.md     ← Checklist
├── ENV_VARIABLES_REFERENCE.md    ← Env vars
├── package.json                  ✏️ UPDATED (image pattern)
├── next.config.ts                ✏️ UPDATED (Supabase domain)
├── .env.local                    (NOT committed, local only)
├── .gitignore                    (Contains .env*)
└── ... other files
```

---

## ❓ FAQ

### Q: Do I need to pay for Vercel or GitHub?
**A:** Both have free tiers. GitHub is free. Vercel is free for hobby projects.

### Q: Can I deploy without GitHub?
**A:** No, Vercel requires GitHub connection for auto-deployment.

### Q: What if I'm not comfortable with Git/GitHub?
**A:** Follow [`GITHUB_SETUP_GUIDE.md`](GITHUB_SETUP_GUIDE.md) step-by-step. It's beginner-friendly.

### Q: How often does Vercel redeploy?
**A:** Every time you push to GitHub (automatic).

### Q: Can I rollback if something breaks?
**A:** Yes, Vercel keeps deployment history. Click "Redeploy" on a previous version.

### Q: Why so many env variables?
**A:** Supabase needs separate keys for client (public) and server (secret) operations.

### Q: Is `.env.local` secure?
**A:** Yes, because `.gitignore` prevents it from being committed to GitHub.

### Q: Can I use a custom domain?
**A:** Yes, but that's optional. Default `yunakatech.vercel.app` works fine.

---

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Build failed on Vercel" | Check Vercel logs, fix issue locally, push again |
| "Can't connect to Supabase" | Verify env variables in Vercel Settings |
| "Images not loading" | Check Supabase bucket exists & is public |
| "GitHub auth fails" | Logout & login again, or use Personal Access Token |
| "Port already in use (3000)" | Kill process: `lsof -i :3000` then `kill -9 <PID>` |

More details in [`DEPLOYMENT_VERCEL_GUIDE.md`](DEPLOYMENT_VERCEL_GUIDE.md#-troubleshooting)

---

## 📞 Support

**Official Documentation:**
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- GitHub: https://help.github.com

**Community:**
- Vercel Discussions: https://github.com/vercel/next.js/discussions
- Supabase Discord: https://discord.supabase.io

---

## ✅ Success Indicators

Your deployment is successful when:

✅ GitHub repo has all project files  
✅ Vercel dashboard shows green deployment status  
✅ Live URL (yunakatech.vercel.app) is accessible  
✅ Admin panel loads without errors  
✅ Portfolio upload form works  
✅ Drag-drop image upload to Supabase functions  
✅ Can login and create/edit projects  

---

## 🎯 Next Steps After Deployment

1. **Share Live URL** with team/clients
   ```
   https://yunakatech.vercel.app
   ```

2. **Monitor Deployments**
   - Visit Vercel dashboard regularly
   - Check auto-deployments after each push

3. **Update Code**
   - Make changes locally
   - Commit & push to GitHub
   - Vercel auto-redeploys (~2-3 min)

4. **Performance Monitoring**
   - Vercel Analytics tab
   - Check database usage on Supabase

5. **Future Enhancements**
   - Custom domain setup
   - Email notifications setup
   - Database backups strategy

---

## 📋 File Reading Order

**For first-time deployment:**
1. This file (overview)
2. [`GITHUB_SETUP_GUIDE.md`](GITHUB_SETUP_GUIDE.md) - Setup Git & GitHub
3. [`ENV_VARIABLES_REFERENCE.md`](ENV_VARIABLES_REFERENCE.md) - Understand env vars
4. [`DEPLOYMENT_VERCEL_GUIDE.md`](DEPLOYMENT_VERCEL_GUIDE.md) - Deploy to Vercel
5. [`DEPLOYMENT_QUICK_START.md`](DEPLOYMENT_QUICK_START.md) - Quick reference

---

## 🚀 Ready to Deploy?

**→ Start with [`GITHUB_SETUP_GUIDE.md`](GITHUB_SETUP_GUIDE.md)** and follow the step-by-step instructions.

Good luck! 🎉
