import { NextRequest, NextResponse } from 'next/server'
import { submitContactForm } from '@/lib/firestore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await submitContactForm({ name, email, subject, message })
    
    if (result.success) {
      return NextResponse.json({ success: true, id: result.id })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('API contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}