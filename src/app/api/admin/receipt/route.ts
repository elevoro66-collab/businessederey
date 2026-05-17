import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/server'
import { adminClient } from '@/lib/admin'

export async function GET(req: NextRequest) {
  // 1. Verify admin session
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // 2. Generate a 60-second signed URL
  const path = req.nextUrl.searchParams.get('path')
  if (!path) return NextResponse.json({ error: 'Missing path' }, { status: 400 })

  const { data, error } = await adminClient.storage
    .from('receipts')
    .createSignedUrl(path, 60)  // 60 seconds — view-once

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ url: data.signedUrl })
}