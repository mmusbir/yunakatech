# 🗺️ Deployment Process Flow

Visual guide untuk deployment workflow YunakaTech ke Vercel.

---

## 📊 Complete Deployment Timeline

```
START: Your Computer (Local)
│
├─ ✅ Prepare Project
│  ├─ Test locally: npm run dev
│  ├─ Check .env.local exists
│  └─ Create GitHub account
│
├─ 📤 STEP 1: Push to GitHub (~10 min)
│  ├─ Configure git (user.name, user.email)
│  ├─ Stage changes (git add .)
│  ├─ Commit (git commit -m "...")
│  ├─ Create GitHub repo
│  └─ Push (git push origin main)
│  └─ ✅ Code now on GitHub
│
├─ ☁️ STEP 2: Setup Vercel (~15 min)
│  ├─ Create Vercel account (via GitHub)
│  ├─ Import project from GitHub
│  ├─ Add 3 environment variables:
│  │  ├─ NEXT_PUBLIC_SUPABASE_URL
│  │  ├─ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
│  │  └─ SUPABASE_SERVICE_ROLE_KEY
│  ├─ Deploy
│  └─ ✅ Live on: yunakatech.vercel.app
│
├─ 🧪 STEP 3: Test & Verify (~5 min)
│  ├─ Check live URL accessible
│  ├─ Test admin login
│  ├─ Test portfolio upload
│  ├─ Check Vercel logs (if error)
│  └─ ✅ All working!
│
└─ 🔄 STEP 4: Future Updates (auto)
   ├─ Edit code locally
   ├─ Commit & push to GitHub
   ├─ Vercel auto-detects push
   ├─ Vercel auto-builds & deploys
   └─ ✅ Live in ~2-3 minutes

TOTAL TIME: ~30 minutes
```

---

## 🔄 Git to Vercel Connection

```
┌──────────────────────────────────────────────────┐
│  LOCAL DEVELOPMENT                               │
│  (Your Computer - d:\Laragon\www\yunakatech)     │
│                                                  │
│  $ npm run dev                                  │
│  ✓ localhost:3000                               │
└────────────┬─────────────────────────────────────┘
             │
             │ git push origin main
             │ (GITHUB_SETUP_GUIDE.md)
             ↓
┌──────────────────────────────────────────────────┐
│  GITHUB REPOSITORY                               │
│  (Code Storage - https://github.com/...)         │
│                                                  │
│  files pushed:                                   │
│  ✓ app/admin/components/                         │
│  ✓ app/lib/supabase-storage.ts                   │
│  ✓ next.config.ts (Supabase domain)              │
│  ✗ .env.local (NOT pushed - .gitignore)          │
└────────────┬─────────────────────────────────────┘
             │
             │ Vercel webhook detects push
             │ (DEPLOYMENT_VERCEL_GUIDE.md)
             ↓
┌──────────────────────────────────────────────────┐
│  VERCEL CI/CD PIPELINE                           │
│  (Build & Deploy - vercel.com)                   │
│                                                  │
│  1. Clone repo from GitHub                       │
│  2. Install dependencies (npm install)           │
│  3. Build project (npm run build)                │
│  4. Deploy to Vercel edge network                │
│                                                  │
│  Status: ✓ Building... → ✓ Deploying... →       │
│          ✓ Ready                                 │
└────────────┬─────────────────────────────────────┘
             │
             │ Vercel injects env variables
             │ (ENV_VARIABLES_REFERENCE.md)
             ↓
┌──────────────────────────────────────────────────┐
│  LIVE APPLICATION                                │
│  (Public Website - https://yunakatech.vercel.app)│
│                                                  │
│  ✓ Next.js production build                      │
│  ✓ Serverless functions                          │
│  ✓ Connected to Supabase via env vars            │
│  ✓ Images optimized by Vercel                    │
└────────────┬─────────────────────────────────────┘
             │
             │ API calls
             │ (Server actions, API routes)
             ↓
┌──────────────────────────────────────────────────┐
│  SUPABASE BACKEND                                │
│  (Database & Storage - supabase.com)             │
│                                                  │
│  ✓ PostgreSQL database                           │
│  ✓ Storage bucket (portfolio-images)             │
│  ✓ Real-time subscriptions                       │
│  ✓ Auth & security policies                      │
└──────────────────────────────────────────────────┘
```

---

## 📋 File Reference Map

### Which file to read for what:

```
Want to UNDERSTAND the process?
└─► DEPLOYMENT_README.md (this gives overview)

Want to PUSH to GitHub?
└─► GITHUB_SETUP_GUIDE.md
    ├─ Configuration
    ├─ Staging & committing
    ├─ Creating GitHub repository
    └─ Pushing code

Want to DEPLOY to Vercel?
└─► DEPLOYMENT_VERCEL_GUIDE.md
    ├─ Creating Vercel project
    ├─ Adding environment variables
    ├─ Deployment process
    ├─ Testing & verification
    └─ Troubleshooting

Want QUICK STEPS?
└─► DEPLOYMENT_QUICK_START.md
    ├─ Pre-deployment checklist
    ├─ Step-by-step commands
    ├─ Quick fixes
    └─ Success criteria

Want ENV VAR DETAILS?
└─► ENV_VARIABLES_REFERENCE.md
    ├─ Where to find each variable
    ├─ Security best practices
    ├─ Local vs Vercel setup
    └─ Code usage examples

Want PORTFOLIO IMAGE SETUP?
└─► PORTFOLIO_IMAGE_UPLOAD_SETUP.md
    ├─ Supabase bucket creation
    ├─ Testing feature
    └─ Migration notes
```

---

## 🎯 Decision Tree

```
START
│
├─ Have you pushed to GitHub yet?
│  ├─ NO → Read GITHUB_SETUP_GUIDE.md
│  │       └─ Then come back here
│  │
│  └─ YES (code on GitHub)
│     │
│     ├─ Have Vercel account?
│     │  ├─ NO → Create at vercel.com
│     │  │      (Sign up with GitHub)
│     │  │
│     │  └─ YES
│     │     │
│     │     ├─ Project imported to Vercel?
│     │     │  ├─ NO → Read DEPLOYMENT_VERCEL_GUIDE.md
│     │     │  │       (Step 2: Create Vercel Project)
│     │     │  │
│     │     │  └─ YES
│     │     │     │
│     │     │     ├─ Env variables added?
│     │     │     │  ├─ NO → Read ENV_VARIABLES_REFERENCE.md
│     │     │     │  │       Get values from Supabase
│     │     │     │  │       Add to Vercel
│     │     │     │  │
│     │     │     │  └─ YES (deployment should be live!)
│     │     │     │     │
│     │     │     │     ├─ Verify live URL working
│     │     │     │     ├─ Test features
│     │     │     │     └─ ✅ SUCCESS!
│     │     │     │
│     │     │     ├─ Having issues?
│     │     │     │  └─ Check DEPLOYMENT_QUICK_START.md
│     │     │     │     Troubleshooting section
│     │     │     │
│     │     │     └─ Want to update code?
│     │     │        └─ Create feature branch
│     │     │           Push to GitHub
│     │     │           Vercel auto-deploys ✅

DONE! 🎉
```

---

## 🔐 Security Boundaries

```
┌─────────────────────────────────────────┐
│  .env.local (LOCAL ONLY)                │
│  - SUPABASE_SERVICE_ROLE_KEY            │
│  - SUPABASE_URL                         │
│  - SUPABASE_PUBLISHABLE_KEY             │
│  ✓ In .gitignore                        │
│  ✗ Never committed to GitHub            │
└─────────────────────────────────────────┘
                  │
              (never copied)
                  │
        ┌─────────┴──────────┐
        │                    │
        ↓                    ↓
   ┌─────────┐         ┌──────────┐
   │ GitHub  │         │ Vercel   │
   │(public) │         │ Dashboard│
   │         │         │(secure)  │
   │ No env  │         │ Env vars │
   │ vars    │         │ encrypted│
   └─────────┘         └──────────┘
        │                    │
        └─────────┬──────────┘
                  │
                  ↓
         (Vercel injects on deploy)
                  │
                  ↓
        ┌──────────────────────┐
        │ Vercel Build Process │
        │ - Clone from GitHub  │
        │ - Run: npm install   │
        │ - Run: npm build     │
        │ - ENV vars injected  │
        │ - Deploy built app   │
        └──────────────────────┘
                  │
                  ↓
        ┌──────────────────────┐
        │ Production Server    │
        │ (Live app)           │
        │ - Use env vars       │
        │ - Call Supabase      │
        │ - Serve to users     │
        └──────────────────────┘
```

---

## 📊 Deployment Status Levels

```
Level 1: Local Only ❌
  - Code only on your computer
  - npm run dev works
  - Not accessible to others
  
  Action: Push to GitHub!

Level 2: GitHub Only 🟡
  - Code on GitHub repository
  - Others can see your code
  - Not publicly accessible as website
  
  Action: Deploy to Vercel!

Level 3: Vercel Deployed ✅
  - Website live on Vercel
  - Accessible via URL
  - Connected to Supabase
  - Auto-deploys on push
  
  Action: Share URL with team!

Level 4: Production Ready 🚀
  - Custom domain setup
  - Monitoring enabled
  - Database backups
  - Team access
  
  Action: Monitor & maintain!
```

---

## ⏰ Estimated Time Breakdown

```
STEP 1: GitHub Setup
├─ Git configuration        ~2 min
├─ Staging changes          ~1 min
├─ Creating GitHub repo     ~3 min
└─ Pushing code            ~5 min
  TOTAL STEP 1:            ~11 min ✓ Code on GitHub

STEP 2: Vercel Setup
├─ Vercel account setup     ~3 min
├─ Import project          ~2 min
├─ Getting env variables   ~5 min
├─ Adding env variables    ~2 min
└─ Deploying              ~10 min (waiting)
  TOTAL STEP 2:            ~22 min ✓ Website live

STEP 3: Verification
├─ Testing live URL        ~2 min
├─ Testing admin features  ~3 min
└─ Checking logs           ~2 min
  TOTAL STEP 3:            ~7 min ✓ Verified

GRAND TOTAL:               ~40 min (including waits)
```

---

## 🚀 Go From First Push to Live

```
You are here: 💻 LOCAL MACHINE WITH CODE

1️⃣  GITHUB (~10 min)
    Terminal:
    git add .
    git commit -m "feat: portfolio upload"
    git push origin main
    
    Now: 📦 CODE ON GITHUB

2️⃣  VERCEL (~15 min)
    Browser:
    Visit vercel.com
    Import from GitHub → yunakatech
    Add 3 env variables
    Click Deploy
    
    Now: 🌐 LIVE ON VERCEL!

3️⃣  VERIFY (~5 min)
    Browser:
    Go to https://yunakatech.vercel.app
    Test features
    Check analytics
    
    RESULT: ✅ SUCCESS!

Total effort: ~30 min of your time
Total wait: ~10 min for builds
```

---

## 📞 Need Help?

**By Stage:**

| Stage | Problem | Solution |
|-------|---------|----------|
| GitHub | Git commands fail | Read GITHUB_SETUP_GUIDE.md |
| Vercel | Can't import repo | Check GitHub is public, re-authenticate |
| Vercel | Build fails | Check Vercel logs, fix locally, push again |
| Vercel | Env vars wrong | Review ENV_VARIABLES_REFERENCE.md |
| Vercel | Website broken | Check browser console, Vercel logs |

**Documentation:**
- DEPLOYMENT_QUICK_START.md → Troubleshooting section
- DEPLOYMENT_VERCEL_GUIDE.md → Troubleshooting section

---

**Ready? Start with GITHUB_SETUP_GUIDE.md! 🚀**
