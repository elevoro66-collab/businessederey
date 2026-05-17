import { create } from 'zustand'

export const useCheckoutStore = create((set) => ({
  isOpen: false,
  product: null,
  bundle: null,
  openCheckout: (product: any, bundle: any) => set({ isOpen: true, product, bundle }),
  closeCheckout: () => set({ isOpen: false, product: null, bundle: null }),
}))