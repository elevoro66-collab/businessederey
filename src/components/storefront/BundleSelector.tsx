// src/components/storefront/BundleSelector.tsx
'use client'
import { useState } from 'react'
import { useCheckoutStore } from '../../store/useCheckoutStore'

export function BundleSelector({ product }: { product: any }) {
  const [selected, setSelected] = useState(product.bundles?.[0] || null)
  const openCheckout = useCheckoutStore((s) => s.openCheckout)

  const handleCheckout = () => {
    // Sepete ekle butonuna basıldığında mağazanın ana kasasını hatasız tetikler
    const targetBundle = selected || { qty: 1, price_cents: product.price_cents }
    openCheckout(product, targetBundle)
  }

  return (
    <div className="border-t border-stone-200 pt-6 space-y-4">
      {product.bundles && product.bundles.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Avantajlı Paket Seçin</p>
          <div className="grid gap-2">
            {product.bundles.map((bundle: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelected(bundle)}
                className={`flex justify-between items-center p-4 border text-left rounded-xl transition-all ${
                  selected === bundle ? 'border-black bg-stone-50 font-bold' : 'border-stone-200'
                }`}
              >
                <span>{bundle.qty} Adet {bundle.label && `(${bundle.label})`}</span>
                <span>{(bundle.price_cents / 100).toLocaleString('tr-TR')} TL</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleCheckout}
        className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
      >
        Siparişi Tamamla
      </button>
    </div>
  )
}