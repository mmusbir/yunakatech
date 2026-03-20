import { NextRequest, NextResponse } from 'next/server'

import {
  createLead,
  getLeads,
  isLeadStatus,
  updateLeadStatus,
} from '@/app/lib/leads'

export const dynamic = 'force-dynamic'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Unexpected error'
}

export async function GET() {
  try {
    const data = await getLeads()
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch leads: ${getErrorMessage(error)}` },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    await createLead({ name, email, phone, message })

    // Send WhatsApp message (placeholder)
    // In production, integrate with WhatsApp API
    console.log(`New lead: ${name} - ${email} - ${phone ?? ''}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: `Failed to submit lead: ${getErrorMessage(error)}` },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Lead id is required' }, { status: 400 })
    }

    if (!status || typeof status !== 'string' || !isLeadStatus(status)) {
      return NextResponse.json(
        { error: 'Invalid lead status' },
        { status: 400 }
      )
    }

    await updateLeadStatus(id, status)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: `Failed to update lead status: ${getErrorMessage(error)}` },
      { status: 500 }
    )
  }
}
