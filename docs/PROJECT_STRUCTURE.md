<!-- PROJECT STRUCTURE & ARCHITECTURE -->

# 📁 YunakaTech - Project Structure & Architecture Guide

## 🏗️ Optimal Folder Structure

```
yunakatech/
├── app/                                    # Next.js App Router
│   ├── (auth)/                            # Auth layout group
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── actions.ts
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/                       # Dashboard layout group
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── lib.ts
│   │   │   ├── components/
│   │   │   │   ├── portfolio-image-upload.tsx
│   │   │   │   ├── settings-form.tsx
│   │   │   │   ├── project-form.tsx
│   │   │   │   └── index.ts                # Barrel export
│   │   │   ├── portfolio/
│   │   │   │   ├── actions.ts
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── edit/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── pricing/
│   │   │   │   ├── page.tsx
│   │   │   │   └── actions.ts
│   │   │   └── settings/
│   │   │       ├── page.tsx
│   │   │       └── actions.ts
│   │   └── layout.tsx
│   │
│   ├── api/                               # API Routes
│   │   ├── v1/                           # API versioning
│   │   │   ├── leads/
│   │   │   │   └── route.ts
│   │   │   └── portfolio/
│   │   │       └── route.ts               # Future API
│   │   └── health/
│   │       └── route.ts                   # Health check
│   │
│   ├── portfolio/                          # Public pages
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── portfolio.module.css
│   │
│   ├── components/                         # Shared components (root-level)
│   │   ├── public-site-shell.tsx
│   │   ├── auth/
│   │   │   ├── login-guard.tsx
│   │   │   └── logout-button.tsx
│   │   ├── ui/                            # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── loader.tsx
│   │   │   └── index.ts                   # Barrel export
│   │   └── index.ts                       # Barrel export
│   │
│   ├── lib/                               # Utilities & business logic
│   │   ├── api/                          # API client & utilities
│   │   │   ├── client.ts                 # API client instance
│   │   │   ├── endpoints.ts              # API endpoints map
│   │   │   ├── hooks.ts                  # Custom React hooks (useQuery, useMutation)
│   │   │   └── types.ts                  # API response types
│   │   ├── constants/
│   │   │   ├── api-config.ts             # API configuration
│   │   │   ├── layout-widths.ts
│   │   │   ├── ui-density.ts
│   │   │   └── index.ts
│   │   ├── hooks/                        # Custom React hooks (non-API)
│   │   │   ├── use-local-storage.ts
│   │   │   ├── use-debounce.ts
│   │   │   ├── use-form.ts
│   │   │   └── index.ts
│   │   ├── types/                        # Shared TypeScript types
│   │   │   ├── api.ts
│   │   │   ├── portfolio.ts
│   │   │   ├── user.ts
│   │   │   └── index.ts
│   │   ├── utils/                        # Pure functions & utilities
│   │   │   ├── format.ts                 # Formatting utilities
│   │   │   ├── parse.ts                  # Parsing utilities
│   │   │   ├── validation.ts             # Validation helpers
│   │   │   ├── path.ts                   # Path/URL utilities
│   │   │   └── index.ts
│   │   ├── lead-types.ts
│   │   ├── leads.ts
│   │   ├── portfolio-projects.ts
│   │   ├── pricing-settings.ts
│   │   ├── site-settings.ts
│   │   └── supabase.ts
│   │
│   ├── styles/                            # Global styles
│   │   ├── globals.css
│   │   ├── variables.css                 # CSS variables
│   │   └── animations.css
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── utils/                                 # Root utilities (optional)
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── config.ts
│   │   ├── middleware.ts
│   │   └── server.ts
│   └── index.ts
│
├── public/                                # Static assets
│   └── uploads/
│       └── site/
│
├── data/                                  # Static data files
│   ├── portfolio-projects.json
│   ├── pricing-plans.json
│   └── site-settings.json
│
├── database/                              # Database migrations & seeds
│   └── supabase-bootstrap.sql
│
├── config/                                # Configuration files
│   ├── site.config.ts                   # Site metadata & config
│   ├── api.config.ts                    # API endpoints & config
│   └── routes.ts                        # Route definitions
│
├── scripts/                               # Build & utility scripts
│   ├── seed-database.ts
│   └── check-env.ts
│
├── .env                                   # Environment variables (tracked)
├── .env.local                             # Local overrides (not tracked)
├── .env.example                           # Template for env vars
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── package.json
├── package-lock.json
├── README.md
└── docs/                                  # Documentation
    ├── PROJECT_STRUCTURE.md
    ├── API_GUIDE.md
    ├── ENVIRONMENT_VARIABLES.md
    └── DEPLOYMENT.md
```

---

## 🎯 Folder Organization Principles

### **1. Layout Groups (Parentheses in Next.js 13+)**

Groups files by layout context without affecting URL:

```typescript
(auth)/login       → /login
(dashboard)/admin → /admin

// Benefit: Separate layout contexts in same route level
```

### **2. Barrel Exports (index.ts)**

```typescript
// app/components/ui/index.ts
export { Button } from './button'
export { Input } from './input'
export { Modal } from './modal'

// Usage
import { Button, Input } from '@/app/components/ui'
```

### **3. API Organization**

```
api/v1/          # Version 1 endpoints
├── leads/route.ts    → /api/v1/leads
├── portfolio/route.ts → /api/v1/portfolio
└── ...

api/health/route.ts   → /api/health
```

### **4. lib Structure (Business Logic)**

- `api/` - API client & hooks
- `constants/` - Fixed configuration values
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions
- `utils/` - Pure utility functions

---

## 📦 Import Alias Configuration

**In `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/app/*": ["./app/*"],
      "@/lib/*": ["./app/lib/*"],
      "@/components/*": ["./app/components/*"],
      "@/types/*": ["./app/lib/types/*"],
      "@/utils/*": ["./app/lib/utils/*"],
      "@/hooks/*": ["./app/lib/hooks/*"],
      "@/api/*": ["./app/lib/api/*"],
      "@/constants/*": ["./app/lib/constants/*"]
    }
  }
}
```

**Benefits:**
- ✅ No relative paths (`../../../`)
- ✅ Auto-completion in IDE
- ✅ Easy refactoring
- ✅ Cleaner imports

---

## 🌳 Tree Shaking Strategy

### **1. ESM Exports (Automatic)**

```typescript
// ❌ Avoid: CommonJS
module.exports = { Button, Input, Modal }

// ✅ Use: ES Modules
export { Button } from './button'
export { Input } from './input'
export { Modal } from './modal'
```

### **2. Side-Effect Free Code**

```typescript
// package.json
{
  "sideEffects": false  // Tell bundler: safe to remove unused code
}
```

### **3. Named Exports**

```typescript
// ❌ Avoid: Default export (harder to tree-shake)
export default function Button() {}

// ✅ Use: Named exports (easier to tree-shake)
export function Button() {}
export function Input() {}
```

### **4. Barrel Exports Best Practices**

```typescript
// ✅ GOOD: Selective barrel exports
export { Button } from './button'
export { Input } from './input'
// This allows bundler to eliminate ./modal if not used

// ❌ AVOID: Re-export everything
export * from './button'
export * from './input'
export * from './modal'
// Bundler can't tree-shake unopened modules
```

---

## ⚡ Next.js Optimization Config

**`next.config.ts` (Already optimized):**

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,          // Use SWC for faster minification
  productionBrowserSourceMaps: false,  // Disable in production
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ]
  },
  compress: true,           // Enable gzip compression
  poweredByHeader: false,   // Remove X-Powered-By
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  }
}
```

---

## 📊 File Size Optimization Checklist

- [ ] Use ESM (ES modules) for all exports
- [ ] Set `"sideEffects": false` in package.json
- [ ] Use named exports (not default)
- [ ] Use barrel exports selectively
- [ ] Remove unused dependencies
- [ ] Enable CSS-in-JS tree shaking (Tailwind CSS ✓)
- [ ] Use `dynamic()` for code splitting
- [ ] Optimize images with Next.js Image
- [ ] Disable sourcemaps in production
- [ ] Use SWC minification

---

## 🔄 Migration Guide (If Refactoring)

**From flat structure → Organized structure:**

1. Create new folder hierarchy
2. Move files while updating imports
3. Update constants/configs
4. Add barrel exports
5. Test imports in browser console
6. Commit & deploy

---

## ✅ Current Project Status

Your project **already follows good practices:**

✅ Organized by feature (app/admin/portfolio/)  
✅ Separated concerns (lib/, api/, components/)  
✅ Using Next.js App Router  
✅ TypeScript configured  
✅ Tailwind CSS (tree-shakeable by default)  
✅ Image optimization enabled  

**Recommended next steps:**
- Add more API utilities (`lib/api/client.ts`)
- Create barrel exports for component groups
- Add custom hooks in `lib/hooks/`
- Document API patterns
