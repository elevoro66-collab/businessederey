export type BundleOption = {
  qty: number
  price_cents: number
  label?: string
  badge?: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  images: string[]
  price_cents: number
  old_price_cents: number | null
  bundles: BundleOption[]
  stock: number
  is_active: boolean
  created_at: string
  variants?: ProductVariant[]
  media?: ProductMedia[]
}

export type ProductVariant = {
  id: string
  name: string
  sku: string
  stock: number
}

export type ProductMedia = {
  type: 'image' | 'video'
  url: string
  alt?: string
  poster?: string
}

export type Order = {
  id: string
  created_at: string
  customer_name: string
  instagram_handle: string
  product_id: string | null
  product_snapshot: { name: string; price_cents: number }
  bundle_qty: number
  amount_cents: number
  receipt_path: string | null
  status: 'pending_review' | 'approved' | 'rejected' | 'shipped'
  admin_notes: string | null
}

export type ThemePreset = 'minimal-luxury' | 'bold-hype' | 'clean-dtc' | 'editorial-mag'

export type SiteConfig = {
  brand: {
    name: string
    tagline: string
    preset: ThemePreset
  }
  features: {
    reviews: boolean
    recentPurchases: boolean
    stockCounter: boolean
    bundleBuilder: boolean
    subscriptions: boolean
    giftCards: boolean
    wishlist: boolean
  }
  checkout: {
    guestCheckout: boolean
    expressCheckout: string[]
    paymentMethods: string[]
    shippingThreshold: number
  }
  conversion: {
    exitIntent: boolean
    cartAbandonment: boolean
    emailCapture: string
    urgency: {
      stockCounter: { enabled: boolean; threshold: number }
      recentPurchases: { enabled: boolean; interval: number }
    }
  }
  integrations: {
    analytics: string
    reviews: string
    email: string
  }
}