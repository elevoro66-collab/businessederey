// @ts-ignore
import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  brand: {
    name: 'Hoodienza',
    tagline: 'Premium comfort essentials',
    preset: 'minimal-luxury',
  },

  features: {
    reviews: true,
    recentPurchases: true,
    stockCounter: true,
    bundleBuilder: false,
    subscriptions: false,
    giftCards: true,
    wishlist: true,
  },

  checkout: {
    guestCheckout: true,
    expressCheckout: ['apple_pay', 'google_pay'],
    paymentMethods: ['card', 'bank_transfer'],
    shippingThreshold: 7500,
  },

  conversion: {
    exitIntent: true,
    cartAbandonment: true,
    emailCapture: 'scroll-50%',
    urgency: {
      stockCounter: { enabled: true, threshold: 10 },
      recentPurchases: { enabled: true, interval: 25000 },
    },
  },

  integrations: {
    analytics: 'google',
    reviews: 'okendo',
    email: 'klaviyo',
  },
}