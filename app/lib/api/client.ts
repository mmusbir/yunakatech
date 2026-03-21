// API Client with safe environment variable handling

'use client'

import { apiConfig, createApiRequest, ApiResponse, ApiRequestError, sanitizeUrlForLogging } from './config'

// ============================================================================
// 1. API CLIENT CLASS
// ============================================================================

export class ApiClient {
  private baseURL: string
  private timeout: number
  
  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL || apiConfig.baseURL
    this.timeout = timeout || apiConfig.timeout
  }
  
  /**
   * Generic fetch method with error handling
   */
  async request<T>(
    endpoint: string,
    options: RequestInit & { params?: Record<string, any> } = {}
  ): Promise<T> {
    try {
      const request = await createApiRequest(endpoint, options)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)
      
      const response = await fetch(request, {
        ...options,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      // Log response
      if (apiConfig.isDevelopment) {
        console.log('📥 API Response:', {
          status: response.status,
          url: sanitizeUrlForLogging(response.url),
          contentLength: response.headers.get('content-length'),
        })
      }
      
      if (!response.ok) {
        throw new ApiRequestError(
          response.status,
          `HTTP_${response.status}`,
          `${response.statusText}`
        )
      }
      
      const data = await response.json() as T
      return data
    } catch (error) {
      if (error instanceof ApiRequestError) {
        throw error
      }
      
      if (error instanceof Error && error.message === 'AbortError') {
        throw new ApiRequestError(
          408,
          'REQUEST_TIMEOUT',
          `Request timeout after ${this.timeout}ms`
        )
      }
      
      throw new ApiRequestError(
        500,
        'UNKNOWN_ERROR',
        error instanceof Error ? error.message : 'Unknown error occurred'
      )
    }
  }
  
  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      params,
    })
  }
  
  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }
  
  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }
  
  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }
  
  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    })
  }
}

// ============================================================================
// 2. SINGLETON INSTANCE
// ============================================================================

/**
 * Global API client instance
 * Safe - all sensitive data comes from process.env
 */
export const apiClient = new ApiClient(
  apiConfig.baseURL,
  apiConfig.timeout
)

// ============================================================================
// 3. USAGE EXAMPLES
// ============================================================================

/*

// Example 1: Simple GET request
const portfolios = await apiClient.get('/api/v1/portfolio')

// Example 2: GET with query parameters
const leads = await apiClient.get('/api/v1/leads', {
  limit: 10,
  offset: 0,
  sort: 'date'
})

// Example 3: POST request with data
const newLead = await apiClient.post('/api/v1/leads', {
  name: 'John Doe',
  email: 'john@example.com'
})

// Example 4: Error handling
try {
  const result = await apiClient.get('/api/v1/portfolio/nonexistent')
} catch (error) {
  if (error instanceof ApiRequestError) {
    console.error(`API Error ${error.status}: ${error.message}`)
  }
}

// Example 5: With types
interface Portfolio {
  id: string
  title: string
  description: string
}

const portfolio = await apiClient.get<Portfolio>('/api/v1/portfolio/project-1')

*/
