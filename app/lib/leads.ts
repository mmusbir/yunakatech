import 'server-only'

import { leadStatuses, type Lead, type LeadStatus } from '@/app/lib/lead-types'
import { getSupabase } from '@/app/lib/supabase'

interface CreateLeadInput {
  name: string
  email: string
  phone?: string
  message?: string
}

function toLeadQueryError(error: { message: string; code?: string }) {
  const tableMissing =
    error.code === 'PGRST205' ||
    error.message.includes("Could not find the table 'public.leads'")

  if (tableMissing) {
    return new Error(
      'The connected Supabase project does not have the public.leads table yet. Run database/supabase-bootstrap.sql in the Supabase SQL Editor, then refresh the page.'
    )
  }

  return new Error(error.message)
}

export function isLeadStatus(value: string): value is LeadStatus {
  return leadStatuses.includes(value as LeadStatus)
}

export async function getLeads() {
  const supabase = getSupabase()

  const { data, error } = await supabase
    .from('leads')
    .select('id, name, email, phone, message, status, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw toLeadQueryError(error)
  }

  return (data ?? []) as Lead[]
}

export async function createLead(input: CreateLeadInput) {
  const supabase = getSupabase()

  const { error } = await supabase.from('leads').insert([
    {
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      message: input.message || null,
    },
  ])

  if (error) {
    throw toLeadQueryError(error)
  }
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = getSupabase()

  const { error } = await supabase.from('leads').update({ status }).eq('id', id)

  if (error) {
    throw toLeadQueryError(error)
  }
}
