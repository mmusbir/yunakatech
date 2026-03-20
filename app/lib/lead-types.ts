export const leadStatuses = ['new', 'contacted', 'qualified', 'closed'] as const

export type LeadStatus = (typeof leadStatuses)[number]

export interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  status: LeadStatus
  created_at: string
}
