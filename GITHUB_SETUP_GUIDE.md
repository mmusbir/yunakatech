# 📤 GitHub Setup & Push Guide

Panduan step-by-step untuk push project ke GitHub.

---

## 📋 Prerequisites

✅ GitHub account (https://github.com)  
✅ Git installed di komputer  
✅ Project directory: `d:\Laragon\www\yunakatech`  
✅ Project sudah initialized dengan git (`.git` folder ada)

---

## 🔑 Step 1: Configure Git (First Time Only)

Jalankan command ini di terminal (PowerShell/CMD):

```bash
# Set global git username
git config --global user.name "Your Name"

# Set global git email
git config --global user.email "your-email@gmail.com"
```

**Verify configuration:**

```bash
git config --global --list
```

Expected output:
```
user.name=Your Name
user.email=your-email@gmail.com
...
```

---

## 🔐 Step 2: Setup GitHub Authentication

### Option A: HTTPS (Recommended for beginners)

```bash
# GitHub akan prompt untuk login first time
# Atau generate Personal Access Token (PAT):
# https://github.com/settings/tokens
```

### Option B: SSH (Advanced)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@gmail.com"

# Add to SSH agent
ssh-add ~/.ssh/id_ed25519

# Add public key to GitHub:
# https://github.com/settings/keys
```

**For simplicity, gunakan HTTPS (Option A)**

---

## ✅ Step 3: Check Git Status

Navigate ke project folder:

```bash
cd d:\Laragon\www\yunakatech
```

Check current git status:

```bash
git status
```

**Expected output:**
```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   next.config.ts
  new file:   app/admin/components/portfolio-image-upload.tsx
  new file:   app/lib/supabase-storage.ts
  new file:   DEPLOYMENT_VERCEL_GUIDE.md
  ... (more files)

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        DEPLOYMENT_QUICK_START.md
        ENV_VARIABLES_REFERENCE.md
        ... (more files)
```

---

## 📤 Step 4: Stage All Changes

Add semua file yang berubah:

```bash
git add .
```

**Verify staged changes:**

```bash
git status
```

Expected output:
```
On branch main
Changes to be committed:
  modified:   next.config.ts
  new file:   app/admin/components/portfolio-image-upload.tsx
  ... (semua file status berubah jadi "new file" atau "modified")
```

---

## 💬 Step 5: Commit Changes

Commit dengan message yang deskriptif:

```bash
git commit -m "feat: add portfolio image upload with Supabase Storage and drag-drop UI"
```

**Alternative commit messages (pilih salah satu):**

```bash
# Lebih detail
git commit -m "feat: implement drag-and-drop portfolio image upload

- Add PortfolioImageUpload client component with drag-drop support
- Implement Supabase Storage utilities for cloud image hosting
- Update ProjectForm to use new upload component
- Add live preview and real-time validation
- Include comprehensive deployment guides"

# Lebih simple
git commit -m "feat: portfolio image upload and deployment setup"

# Multiple commits (untuk logical grouping)
git add app/admin/components/portfolio-image-upload.tsx
git commit -m "feat: add portfolio image upload component"

git add app/lib/supabase-storage.ts
git commit -m "feat: add Supabase Storage utilities"

git add DEPLOYMENT*.md ENV_VARIABLES_REFERENCE.md
git commit -m "docs: add comprehensive deployment guides"

git add next.config.ts
git commit -m "config: add Supabase domain to image remotePatterns"
```

**View commit history:**

```bash
git log --oneline -n 5
```

---

## 🌐 Step 6: Create GitHub Repository

Jika belum ada remote repository:

### 6a: Create New Repo on GitHub

1. **Login ke GitHub:** https://github.com
2. **Create New Repository:**
   - Top-right corner → "+" → "New repository"
   - Repository name: `yunakatech`
   - Description: "YunakaTech - Admin portfolio with portfolio image upload"
   - Visibility: **Public** (agar Vercel bisa access)
   - ⚠️ **DON'T** initialize with README (repo kosong)
   - Click "Create repository"

### 6b: Add Remote Locally

Setelah repo dibuat, copy HTTPS URL dan jalankan:

```bash
# Contoh: https://github.com/YOUR-USERNAME/yunakatech.git

git remote add origin https://github.com/YOUR-USERNAME/yunakatech.git
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` dengan username GitHub Anda!**

---

## 🚀 Step 7: Push to GitHub

```bash
git push origin main
```

**First time push, mungkin akan prompt untuk login:**

```
Enumerating objects: 45, done.
Counting objects: 100% (45/45), done.
Delta compression using up to 8 threads
Compressing objects: 100% (38/38), done.
Writing objects: 100% (45/45), X bytes, done.
Total X (delta Y), reused 0 (delta 0), pack-reused 0
To https://github.com/YOUR-USERNAME/yunakatech.git
 * [new branch]      main -> main
Branch 'main' is set up to track 'origin/main'.
```

✅ **Push successful!**

---

## ✅ Step 8: Verify on GitHub

1. **Open GitHub repo:** https://github.com/YOUR-USERNAME/yunakatech
2. **Verify files ada:**
   - `next.config.ts` ada & updated
   - `app/admin/components/portfolio-image-upload.tsx` ada
   - `app/lib/supabase-storage.ts` ada
   - `DEPLOYMENT_VERCEL_GUIDE.md` ada
   - `package.json` ada
   - ... semua files ada

3. **Check `.env.local` NOT ada** (good security!)
   - `.gitignore` file ada (contains `.env*`)

---

## 🔄 Future Pushes (Easy)

Setelah initial push, workflow untuk future changes:

```bash
# 1. Make changes locally
# 2. Edit files di VS Code

# 3. Stage & commit
git add .
git commit -m "fix: description of changes"

# 4. Push
git push origin main

# 5. Auto-deploy (Vercel otomatis redeploy)
```

---

## 🌳 Git Branches (Optional)

Untuk development workflow yang lebih baik:

```bash
# Create development branch
git checkout -b develop

# Make changes & commit
git add .
git commit -m "wip: new feature"

# Push to GitHub
git push origin develop

# Create Pull Request di GitHub for review
# Merge ke main setelah approved

# Delete branch setelah merge
git branch -d develop
git push origin --delete develop
```

---

## 🆘 Troubleshooting Git

### Error: "fatal: not a git repository"

**Fix:**
```bash
# Check if .git folder exists
ls -la .git

# If not, initialize git
git init

# Add remote
git remote add origin https://github.com/YOUR-USERNAME/yunakatech.git
```

### Error: "Permission denied (publickey)"

**Fix (SSH only):**
```bash
# Use HTTPS instead of SSH
# Or setup SSH keys following GitHub docs
```

### Error: "remote origin already exists"

**Fix:**
```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR-USERNAME/yunakatech.git
```

### Error: "Your branch is ahead of 'origin/main'"

**Cause:** Local changes not pushed  
**Fix:**
```bash
# Push changes
git push origin main
```

### Error: "everything up-to-date"

**Cause:** No changes to commit  
**Fix:**
```bash
# Make & stage changes first
# Then commit & push
```

---

## 📝 Commit Message Best Practices

**Good commit messages follow this format:**

```
<type>: <subject>

<description (optional)>
```

**Types:**
- `feat:` - Fitur baru (feature)
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style (formatting, etc)
- `refactor:` - Refactoring code
- `test:` - Adding/updating tests
- `chore:` - Build, dependencies, etc
- `perf:` - Performance improvements

**Examples:**
```bash
git commit -m "feat: add portfolio image upload component"
git commit -m "fix: resolve image preview not displaying"
git commit -m "docs: add deployment guide"
git commit -m "style: format code with prettier"
git commit -m "refactor: extract upload logic to separate utility"
```

---

## 🔒 Security Notes

✅ **DO:**
- Keep `.env.local` local (never push)
- Use `.gitignore` untuk sensitive files
- Use HTTPS atau SSH authentication
- Keep GitHub repo accessible untuk Vercel

❌ **DON'T:**
- Commit `.env*` files
- Commit API keys atau secrets
- Commit node_modules/ (too large)
- Share GitHub credentials

---

## ✨ GitHub Features to Use

### 1. README.md

Already exists! Shows project info on GitHub landing page.

### 2. Releases

Tag important versions:
```bash
git tag -a v1.0.0 -m "First production release"
git push origin v1.0.0
```

### 3. GitHub Issues

Track bugs & feature requests:
- Issues tab → New issue

### 4. GitHub Actions

Auto-run tests on every push:
- Actions tab → Create workflow

---

## 📚 Useful Git Commands

```bash
# Check status
git status

# View changes
git diff

# View commit history
git log --oneline -n 10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View remote URL
git remote -v

# Switch branch
git checkout branch-name

# Create branch
git branch new-branch-name

# Delete branch
git branch -d branch-name
```

---

## 🎯 Checklist

- [ ] GitHub account created
- [ ] Git configured locally (`user.name` & `user.email`)
- [ ] GitHub authentication setup (HTTPS/SSH)
- [ ] Project git status clean (no untracked files)
- [ ] All changes staged (`git add .`)
- [ ] Commit made with descriptive message
- [ ] GitHub repository created (empty, no README init)
- [ ] Remote origin added
- [ ] Changes pushed (`git push origin main`)
- [ ] Repository accessible on GitHub
- [ ] `.env.local` NOT in GitHub (verified via gitignore)
- [ ] All project files visible on GitHub

---

## 🚀 Next Steps

Once pushed to GitHub:
1. Create Vercel account (sign up with GitHub)
2. Import project from GitHub to Vercel
3. Add environment variables in Vercel
4. Deploy!

See **DEPLOYMENT_VERCEL_GUIDE.md** for next steps.

---

**Good luck! 🎉**
