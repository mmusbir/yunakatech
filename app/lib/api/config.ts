// API Configuration & Environment Variables

import type { z } from 'zod'

// ============================================================================
// 1. API CONFIGURATION (Safe with environment variables)
// ============================================================================

export const apiConfig = {
  // Base URL dari environment variable
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  
  // API Key dari environment variable
  // ❌ NEVER hardcode: const API_KEY = 'sk-prod-12345'
  // ✅ ALWAYS use env: process.env.NEXT_PUBLIC_API_KEY
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  
  // Service-specific keys
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  
  // Internal backend key (server-only, never in browser)
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  
  // Third-party API keys (example)
  googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  stripePublishable: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  
  // Server-only sensitive keys (never in NEXT_PUBLIC_)
  stripeSecret: process.env.STRIPE_SECRET_KEY,
  databaseUrl: process.env.DATABASE_URL,
  
  // Feature flags & configuration
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API version
  version: 'v1',
  
  // Timeout configuration
  timeout: parseInt(process.env.API_TIMEOUT || '30000', 10),
} as const

// ============================================================================
// 2. API ENDPOINTS MAP
// ============================================================================

export const apiEndpoints = {
  // Portfolio endpoints
  portfolio: {
    list: '/portfolio',
    detail: (slug: string) => `/portfolio/${slug}`,
    create: '/portfolio',
    update: (slug: string) => `/portfolio/${slug}`,
    delete: (slug: string) => `/portfolio/${slug}`,
  },
  
  // Leads endpoints
  leads: {
    create: '/leads',
    list: '/leads',
    detail: (id: string) => `/leads/${id}`,
  },
  
  // Settings endpoints
  settings: {
    get: '/settings',
    update: '/settings',
  },
  
  // Health check
  health: '/health',
} as const

// ============================================================================
// 3. VALIDATION - Ensure environment variables exist
// ============================================================================

export function validateApiConfig() {
  const required = {
    'NEXT_PUBLIC_API_URL': apiConfig.baseURL,
    'NEXT_PUBLIC_SUPABASE_URL': apiConfig.supabaseUrl,
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY': apiConfig.supabaseKey,
  }
  
  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key)
  
  if (missing.length > 0) {
    console.warn(
      `⚠️ Missing environment variables: ${missing.join(', ')}\n` +
      'Some features may not work. Check your .env.local file.'
    )
  }
  
  return missing.length === 0
}

// ============================================================================
// 4. API RESPONSE TYPES
// ============================================================================

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type ApiError = {
  code: string
  message: string
  status: number
}

// ============================================================================
// 5. ERROR HANDLING
// ============================================================================

export class ApiRequestError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

export async function handleApiError(response: Response): Promise<never> {
  let data: unknown = {}
  try {
    data = await response.json()
  } catch {
    // Response body is not JSON
  }
  
  const parsedError =
    data && typeof data === 'object' && data !== null && 'code' in data && 'message' in data
      ? (data as { code?: string; message?: string })
      : {}

  const error = new ApiRequestError(
    response.status,
    parsedError.code || 'UNKNOWN_ERROR',
    parsedError.message || response.statusText || 'Unknown error'
  )
  
  throw error
}

// ============================================================================
// 6. LOG CONFIGURATION (Hide sensitive data)
// ============================================================================

export function sanitizeUrlForLogging(url: string): string {
  try {
    const urlObj = new URL(url, apiConfig.baseURL)
    
    // Hide API key in logs
    if (urlObj.searchParams.has('apiKey')) {
      urlObj.searchParams.set('apiKey', '***HIDDEN***')
    }
    
    // Hide auth token
    if (urlObj.searchParams.has('token')) {
      urlObj.searchParams.set('token', '***HIDDEN***')
    }
    
    return urlObj.toString()
  } catch {
    return url
  }
}

// ============================================================================
// 7. REQUEST INTERCEPTOR EXAMPLE
// ============================================================================

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>
}

export async function createApiRequest(
  endpoint: string,
  config: RequestConfig = {}
): Promise<Request> {
  const { params, headers = {} } = config
  
  const url = new URL(endpoint, apiConfig.baseURL)
  
  // Add query parameters
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }
  
  // Add default headers
  const finalHeaders = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add API key if configured
    ...(apiConfig.apiKey && { 'Authorization': `Bearer ${apiConfig.apiKey}` }),
    ...headers,
  })
  
  const request = new Request(url, {
    ...config,
    headers: finalHeaders,
  })
  
  // Log request (without sensitive data)
  if (apiConfig.isDevelopment) {
    console.log('📤 API Request:', {
      method: request.method,
      url: sanitizeUrlForLogging(request.url),
      headers: Object.fromEntries(
        [...finalHeaders.entries()].map(([k, v]) => [
          k,
          k.toLowerCase().includes('auth') ? '***' : v
        ])
      ),
    })
  }
  
  return request
}

// ============================================================================
// 8. USAGE EXAMPLES
// ============================================================================

/*
// Example 1: Basic API call with environment variables
import { createApiRequest, apiEndpoints } from '@/app/lib/api/client'

const request = await createApiRequest(
  apiEndpoints.portfolio.list,
  { method: 'GET' }
)
const response = await fetch(request)
const data = await response.json()

// Example 2: POST with auth header
const request = await createApiRequest(
  apiEndpoints.leads.create,
  {
    method: 'POST',
    body: JSON.stringify({ name: 'John', email: 'john@example.com' })
  }
)

// Example 3: Custom headers
const request = await createApiRequest(
  apiEndpoints.settings.update,
  {
    method: 'PUT',
    body: JSON.stringify(settingsData),
    headers: {
      'X-Custom-Header': 'value'
    }
  }
)

// Example 4: Server actions with secrets
// pages/api/route.ts (server-side only)
const serviceKey = process.env.STRIPE_SECRET_KEY // ✅ Safe on server
const dbUrl = process.env.DATABASE_URL // ✅ Safe on server

// Never do this:
// const apiKey = process.env.API_KEY // ❌ Will be exposed in browser
*/

export default apiConfig
