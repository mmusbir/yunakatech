// Custom React hooks for API calls

'use client'

import { useState, useCallback, useEffect } from 'react'
import { apiClient } from './client'
import { ApiRequestError } from './config'

// ============================================================================
// 1. TYPES
// ============================================================================

type LoadingState = 'idle' | 'loading' | 'success' | 'error'

interface UseFetchState<T> {
  data: T | null
  error: Error | null
  loading: boolean
  status: LoadingState
}

interface UseQueryOptions {
  skip?: boolean
  depends?: any[]
}

interface UseMutationOptions {
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

// ============================================================================
// 2. useQuery - For GET requests
// ============================================================================

export function useQuery<T = any>(
  endpoint: string,
  options: UseQueryOptions = {}
) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    loading: !options.skip,
    status: 'idle',
  })
  
  const fetchData = useCallback(async () => {
    if (options.skip) return
    
    setState(prev => ({ ...prev, loading: true, status: 'loading' }))
    
    try {
      const data = await apiClient.get<T>(endpoint)
      setState({
        data,
        error: null,
        loading: false,
        status: 'success',
      })
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState({
        data: null,
        error: err,
        loading: false,
        status: 'error',
      })
    }
  }, [endpoint, options.skip])
  
  useEffect(() => {
    fetchData()
  }, [fetchData, options.depends])
  
  return {
    ...state,
    refetch: fetchData,
  }
}

// ============================================================================
// 3. useMutation - For POST/PUT/PATCH/DELETE
// ============================================================================

export function useMutation<T = any, D = any>(
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options: UseMutationOptions = {}
) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    loading: false,
    status: 'idle',
  })
  
  const mutate = useCallback(
    async (endpoint: string, data?: D) => {
      setState(prev => ({ ...prev, loading: true, status: 'loading' }))
      
      try {
        let result: T
        
        switch (method) {
          case 'POST':
            result = await apiClient.post<T>(endpoint, data)
            break
          case 'PUT':
            result = await apiClient.put<T>(endpoint, data)
            break
          case 'PATCH':
            result = await apiClient.patch<T>(endpoint, data)
            break
          case 'DELETE':
            result = await apiClient.delete<T>(endpoint)
            break
        }
        
        setState({
          data: result,
          error: null,
          loading: false,
          status: 'success',
        })
        
        options.onSuccess?.(result)
        return result
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error')
        setState({
          data: null,
          error: err,
          loading: false,
          status: 'error',
        })
        
        options.onError?.(err)
        throw err
      } finally {
        options.onSettled?.()
      }
    },
    [method, options]
  )
  
  return {
    ...state,
    mutate,
  }
}

// ============================================================================
// 4. USAGE EXAMPLES
// ============================================================================

/*

// Example 1: Fetch portfolio list
function PortfolioPage() {
  const { data, loading, error, refetch } = useQuery<Portfolio[]>(
    '/api/v1/portfolio'
  )
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}

// Example 2: Create new lead with mutation
function CreateLeadForm() {
  const { mutate, loading, error } = useMutation<Lead, CreateLeadData>(
    'POST',
    {
      onSuccess: (data) => {
        console.log('Lead created:', data)
        // Redirect or refetch
      },
      onError: (error) => {
        console.error('Failed:', error.message)
      }
    }
  )
  
  const handleSubmit = async (formData: CreateLeadData) => {
    try {
      await mutate('/api/v1/leads', formData)
    } catch (error) {
      // Error handled by hook
    }
  }
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit({ /* form data */ })
    }}>
      {/* form fields */}
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
      {error && <div>{error.message}</div>}
    </form>
  )
}

// Example 3: Conditional query (skip if not ready)
function UserDetail({ userId }: { userId?: string }) {
  const { data, loading } = useQuery(
    `/api/v1/users/${userId}`,
    {
      skip: !userId  // Don't fetch if userId is not available
    }
  )
  
  if (!userId) return <div>Select a user</div>
  if (loading) return <div>Loading...</div>
  
  return <div>{data?.name}</div>
}

// Example 4: Dependent queries
function Dashboard() {
  const { data: user } = useQuery('/api/v1/user')
  
  // Only fetch portfolio after user is loaded
  const { data: portfolio } = useQuery(
    `/api/v1/portfolio/${user?.id}`,
    {
      skip: !user?.id,
      depends: [user?.id]
    }
  )
  
  return (
    <div>
      <h1>{user?.name}'s Portfolio</h1>
      {/* Display portfolio */}
    </div>
  )
}

// Example 5: Update mutation
function EditLead({ leadId }: { leadId: string }) {
  const { mutate: update, loading } = useMutation<Lead, Partial<Lead>>(
    'PUT',
    {
      onSuccess: () => alert('Updated!')
    }
  )
  
  return (
    <button onClick={() => update(`/api/v1/leads/${leadId}`, { name: 'New Name' })}>
      {loading ? 'Saving...' : 'Update'}
    </button>
  )
}

*/

// ============================================================================
// 5. TYPES FOR REFERENCE
// ============================================================================

export interface Portfolio {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  alt: string
  category: string
  eyebrow: string
  code: string
  tags: string[]
  challenge: string
  solution: string
  outcomes: string[]
  metrics: Array<{ label: string; value: string }>
  deliverables: string[]
}

export interface Lead {
  id: string
  name: string
  email: string
  message?: string
  createdAt: string
}

export interface CreateLeadData {
  name: string
  email: string
  message?: string
}

export interface User {
  id: string
  name: string
  email: string
}
