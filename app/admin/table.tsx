'use client'

import { startTransition, useState } from 'react'

import { leadStatuses, type Lead, type LeadStatus } from '@/app/lib/lead-types'

interface AdminLeadTableProps {
  initialLeads: Lead[]
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Unexpected error'
}

export default function AdminLeadTable({
  initialLeads,
}: AdminLeadTableProps) {
  const [leads, setLeads] = useState(initialLeads)
  const [error, setError] = useState<string | null>(null)
  const [pendingLeadId, setPendingLeadId] = useState<string | null>(null)

  async function updateStatus(id: string, status: LeadStatus) {
    const previousLeads = leads

    setError(null)
    setPendingLeadId(id)
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      )
    )

    startTransition(async () => {
      try {
        const response = await fetch('/api/leads', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, status }),
        })

        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null

        if (!response.ok) {
          throw new Error(payload?.error ?? 'Failed to update lead status')
        }
      } catch (caughtError) {
        setLeads(previousLeads)
        setError(getErrorMessage(caughtError))
        console.error('AdminLeadTable updateStatus error:', caughtError)
      } finally {
        setPendingLeadId((currentLeadId) =>
          currentLeadId === id ? null : currentLeadId
        )
      }
    })
  }

  return (
    <div className="bg-white border-4 border-black p-6 shadow-brutal">
      {error ? <div className="mb-4 text-red-500">{error}</div> : null}

      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-gray-300">
              <td className="p-2">{lead.name}</td>
              <td className="p-2">{lead.email}</td>
              <td className="p-2">{lead.status}</td>
              <td className="p-2">
                <select
                  value={lead.status}
                  onChange={(event) =>
                    updateStatus(lead.id, event.target.value as LeadStatus)
                  }
                  disabled={pendingLeadId === lead.id}
                  className="border-2 border-black p-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {leadStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
