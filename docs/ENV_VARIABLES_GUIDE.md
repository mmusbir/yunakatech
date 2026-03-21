# 🔐 Environment Variables & API Configuration Guide

Complete guide untuk menggunakan environment variables secara aman di Next.js, React, dan Tailwind.

---

## 📋 Overview

Dalam aplikasi Next.js:
- **Client-side environment variables** dimulai dengan `NEXT_PUBLIC_`
- **Server-side environment variables** tidak punya prefix (NEVER exposed to browser)
- **Hardcoding API keys** adalah security risk

---

## 🔑 Environment Variables Setup

### 1. Create `.env.local` File

Di root project (`d:\Laragon\www\yunakatech\`):

```env
# ============================================================================
# PUBLIC API CONFIGURATION (Safe to be in browser)
# ============================================================================

# Next.js App URL
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Supabase (public keys)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Third-party public keys
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your-google-maps-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_DEBUG_MODE=false

# ============================================================================
# SECRET SERVER-SIDE VARIABLES (NEVER in NEXT_PUBLIC_)
# ============================================================================

# Database connection (server-only)
DATABASE_URL=postgresql://user:password@localhost/dbname
POSTGRES_URL=postgresql://...

# Stripe secret key (server-only)
STRIPE_SECRET_KEY=sk_live_...

# Supabase service role key (server-only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Custom API keys
API_SECRET_KEY=your-secret-key

# Auth tokens
AUTH_SECRET=your-auth-secret-key
JWT_SECRET=your-jwt-secret

# Third-party secrets
SENDGRID_API_KEY=SG.xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# ============================================================================
# DEPLOYMENT & ENVIRONMENT
# ============================================================================

NODE_ENV=development
# In production: NODE_ENV=production
```

### 2. Create `.env.example` Template

```env
# Copy this file to .env.local and fill in your values
# DO NOT commit .env.local to Git!

# Public API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-key-here

# Server-only secrets
SUPABASE_SERVICE_ROLE_KEY=your-secret-key-here
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
```

---

## ✅ Best Practices

### **DO:**

✅ **Use environment variables for all configuration**
```typescript
// app/lib/api/config.ts
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY, // Server-only
}
```

✅ **Prefix public variables with `NEXT_PUBLIC_`**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
```

✅ **Use server-only keys in API routes and server actions**
```typescript
// app/api/route.ts (server-side)
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY // ✅ Safe on server
  // Use secret safely
}
```

✅ **Validate environment variables on app startup**
```typescript
// app/lib/api/config.ts
export function validateApiConfig() {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('Missing NEXT_PUBLIC_API_URL')
  }
}
```

✅ **Use `.env.local` for local development**
```env
# .env.local (NOT committed to Git)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### **DON'T:**

❌ **NEVER hardcode API keys**
```typescript
// ❌ WRONG
const API_KEY = 'sk-prod-12345'
const response = await fetch('...', {
  headers: { Authorization: `Bearer sk-prod-12345` }
})
```

❌ **NEVER commit `.env.local` to Git**
```bash
# .env.local is in .gitignore
# but .env.example is committed for documentation
```

❌ **NEVER expose server-only keys in browser**
```typescript
// ❌ WRONG (This will be exposed in browser JavaScript!)
const response = fetch('/api/payment', {
  headers: {
    Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` // EXPOSED!
  }
})
```

❌ **NEVER log sensitive data**
```typescript
// ❌ WRONG
console.log('API Key:', process.env.NEXT_PUBLIC_API_KEY)

// ✅ CORRECT - Log sanitized version
console.log('API Key:', apiConfig.apiKey.substring(0, 10) + '...')
```

---

## 🏗️ API Implementation Pattern

### Step 1: Create Configuration File

**`app/lib/api/config.ts`** (Already created!)

```typescript
export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  // Other configs
}
```

### Step 2: Create API Client

**`app/lib/api/client.ts`** (Already created!)

```typescript
export const apiClient = new ApiClient(
  apiConfig.baseURL,
  apiConfig.timeout
)
```

### Step 3: Create Custom Hooks

**`app/lib/api/hooks.ts`** (Already created!)

```typescript
export function useQuery<T>(endpoint: string) {
  // Uses apiClient internally (which uses apiConfig)
}
```

### Step 4: Use in Components

```typescript
// app/components/portfolio-list.tsx
import { useQuery } from '@/app/lib/api'

export function PortfolioList() {
  const { data, loading, error } = useQuery('/portfolio')
  
  // Component logic
}
```

---

## 🔄 In Different Environments

### Local Development

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_KEY=dev-key-12345
```

### Production (Vercel)

Set in Vercel Dashboard → Settings → Environment Variables:

```
Name: NEXT_PUBLIC_API_URL
Value: https://api.yourdomain.com

Name: NEXT_PUBLIC_API_KEY
Value: your-production-key

Name: STRIPE_SECRET_KEY (Secret)
Value: sk_live_...
```

---

## 📚 Usage Examples

### Example 1: Basic API Call

```typescript
// app/components/portfolio-page.tsx
'use client'

import { useQuery } from '@/app/lib/api'

export function PortfolioPage() {
  // No API key needed in component - managed via config
  const { data: portfolios, loading, error } = useQuery('/portfolio')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {portfolios?.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}
```

### Example 2: API Route with Secret Key

```typescript
// app/api/webhook/stripe/route.ts (Server-side)
export async function POST(request: Request) {
  // Secret key is safe on server - never exposed to browser
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!
  
  // Verify webhook with secret
  // ...
}
```

### Example 3: Server Action with Auth

```typescript
// app/admin/portfolio/actions.ts (Server-side)
'use server'

export async function savePortfolioAction(data: FormData) {
  // Server-only secret is accessible here
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  // Create Supabase client with server key
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey  // ✅ Safe - only executes on server
  )
  
  // Perform database operations
  // ...
}
```

### Example 4: Error Handling

```typescript
// app/components/form.tsx
'use client'

import { useMutation } from '@/app/lib/api'

export function CreateLeadForm() {
  const { mutate, loading, error } = useMutation('POST', {
    onSuccess: () => alert('Success!'),
    onError: (error) => {
      console.error('API Error:', error.message)
      // Don't log sensitive info!
    }
  })
  
  const handleSubmit = async (data: any) => {
    try {
      await mutate('/api/v1/leads', data)
    } catch (error) {
      // Error already handled by hook
    }
  }
  
  return (
    // Form JSX
    <>
      {error && <div className="error">{error.message}</div>}
      <button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </>
  )
}
```

---

## 🛡️ Security Checklist

- [ ] All API keys in `.env.local` (not in code)
- [ ] Server-only keys don't have `NEXT_PUBLIC_` prefix
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` exists for documentation
- [ ] API configuration centralized in `app/lib/api/config.ts`
- [ ] No hardcoded URLs or keys in components
- [ ] Error messages don't expose sensitive data
- [ ] Logs don't print API keys or secrets
- [ ] Environment variables validated on startup
- [ ] CORS properly configured if needed

---

## 🔍 Debugging & Troubleshooting

### Check Environment Variables are Loaded

```typescript
// app/lib/api/config.ts at top of file
if (typeof window === 'undefined') {
  // Server-side
  console.log('✓ API URL:', process.env.NEXT_PUBLIC_API_URL)
  console.log('✓ Has service key:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
} else {
  // Client-side
  console.log('✓ Public API URL:', process.env.NEXT_PUBLIC_API_URL)
  console.log('✗ Service key (should not be available):', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
}
```

### Validate on Startup

```typescript
// app/layout.tsx
import { validateApiConfig } from '@/app/lib/api/config'

export default function RootLayout() {
  // Validate environment variables exist
  if (typeof window === 'undefined') {
    validateApiConfig()
  }
  
  return (
    // Layout JSX
  )
}
```

---

## 📖 File Structure Reference

```
yunakatech/
├── .env                      # Tracked: Example values
├── .env.local               # NOT tracked: Your actual secrets
├── .env.example             # Tracked: Template for team
├── .gitignore               # Contains: .env.local, .env.*.local
├── app/
│   ├── lib/
│   │   └── api/
│   │       ├── config.ts    # ✅ Centralized configuration
│   │       ├── client.ts    # ✅ API client instance
│   │       ├── hooks.ts     # ✅ React hooks
│   │       └── index.ts     # ✅ Barrel exports
│   └── ...
└── docs/
    └── ENV_VARIABLES.md     # This file
```

---

## 🚀 Deployment to Vercel

### Add Environment Variables

1. Go to Vercel Dashboard → yunakatech → Settings
2. Click "Environment Variables"
3. Add all `NEXT_PUBLIC_*` and secret variables
4. Select: Production, Preview, Development

### Example Vercel Setup

```
NEXT_PUBLIC_API_URL
├─ Production: https://api.yourdomain.com
├─ Preview: https://api-preview.yourdomain.com
└─ Development: http://localhost:3000/api

STRIPE_SECRET_KEY (Secret)
├─ Production: sk_live_...
├─ Preview: sk_test_...
└─ Development: sk_test_...

SUPABASE_SERVICE_ROLE_KEY (Secret)
├─ Production: eyJxxx (production key)
├─ Preview: eyJxxx (preview key)
└─ Development: eyJxxx (dev key)
```

---

## 💡 Pro Tips

1. **Use separate keys for dev/staging/production**
   ```env
   NEXT_PUBLIC_API_URL=https://api-production.com  # Production
   # But in development:
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

2. **Rotate keys regularly**
   - Change API keys every 3-6 months
   - Immediately change if exposed

3. **Use strong secrets**
   - Generate with `openssl rand -hex 32`
   - At least 32 characters

4. **Document what each variable is for**
   - Add comments in `.env.example`
   - Update `docs/ENV_VARIABLES.md`

5. **Version control `.env.example`**
   ```bash
   git add .env.example
   git add docs/ENV_VARIABLES.md
   git add .gitignore
   
   # But NOT:
   git add .env.local  # Will fail due to .gitignore ✓
   ```

---

## 📞 Quick Reference

| File | Purpose | Committed? |
|------|---------|-----------|
| `.env` | Default values | ✅ Yes (no secrets) |
| `.env.local` | Your local secrets | ❌ No (.gitignore) |
| `.env.example` | Template for team | ✅ Yes (no values) |
| `app/lib/api/config.ts` | Centralized config | ✅ Yes |
| `app/lib/api/client.ts` | API client | ✅ Yes |
| `app/lib/api/hooks.ts` | React hooks | ✅ Yes |

---

**See `PROJECT_STRUCTURE.md` for folder organization and tree-shaking setup!**
