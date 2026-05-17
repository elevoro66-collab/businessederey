import { NextRequest, NextResponse } from 'next/server'
import { adminClient } from '@/lib/admin'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const customerName    = formData.get('customerName') as string
    const instagramHandle = formData.get('instagramHandle') as string
    const productId       = formData.get('productId') as string
    const productSnapshot = JSON.parse(formData.get('productSnapshot') as string)
    const bundleQty       = Number(formData.get('bundleQty'))
    const amountCents     = Number(formData.get('amountCents'))
    const receipt         = formData.get('receipt') as File | null

    // Validate required fields
    if (!customerName || !instagramHandle || !productId || !amountCents) {
      return NextResponse.json(
        { error: 'Missing required fields' }, { status: 400 }
      )
    }

    let receiptPath: string | null = null

    // 1. Upload receipt if provided
    if (receipt && receipt.size > 0) {
      if (receipt.size > 5 * 1024 * 1024) {  // 5 MB limit
        return NextResponse.json({ error: 'Receipt must be under 5MB' }, { status: 400 })
      }

      const ext = receipt.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'pdf']
      if (!allowedExts.includes(ext)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
      }

      const year = new Date().getFullYear()
      const fileName = `${year}/${randomUUID()}.${ext}`

      const { error: uploadError } = await adminClient.storage
        .from('receipts')
        .upload(fileName, receipt, {
          contentType: receipt.type,
          upsert: false,
        })

      if (uploadError) throw uploadError
      receiptPath = fileName
    }

    // 2. Insert the order row into the database
    const { data: order, error: insertError } = await adminClient
      .from('orders')
      .insert({
        customer_name:    customerName,
        instagram_handle: instagramHandle,
        product_id:       productId,
        product_snapshot: productSnapshot,
        bundle_qty:       bundleQty,
        amount_cents:     amountCents,
        receipt_path:     receiptPath,
        status:           'pending_review',
      })
      .select('id')
      .single()

    if (insertError) throw insertError

    return NextResponse.json({ success: true, orderId: order.id })

  } catch (err) {
    console.error('[order/POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}