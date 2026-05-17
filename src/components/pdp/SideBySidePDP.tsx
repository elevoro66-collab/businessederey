// src/components/pdp/SideBySidePDP.tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useCheckoutStore } from '../../store/useCheckoutStore'
import { siteConfig } from '../../site.config'
import { StockCounter } from '../conversion/StockCounter'
import { TrustBadges } from '../conversion/TrustBadges'
import { RecentPurchases } from '../conversion/RecentPurchases'

export function SideBySidePDP({ product }: { product: any }) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedBundle, setSelectedBundle] = useState(0)
  const openCheckout = useCheckoutStore((s) => s.openCheckout)

  const activePrice = product.bundles?.[selectedBundle]?.price_cents ?? product.price_cents

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-black">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* SOL: Fotoğraf Galerisi */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={activeImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                {product.images?.[activeImage] && (
                  <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" priority />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.images?.map((img: string, i: number) => (
              <button key={i} onClick={() => setActiveImage(i)} className={`relative aspect-square bg-stone-100 overflow-hidden border-2 rounded-xl transition-all ${activeImage === i ? 'border-black scale-95' : 'border-transparent'}`}>
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* SAĞ: Ürün Bilgileri ve Satın Alma */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-3">{product.name}</h1>
            <p className="text-stone-500 text-lg leading-relaxed">{product.description || 'Premium comfort essentials.'}</p>
          </div>

          <div className="text-3xl font-black">
            {(activePrice / 100).toLocaleString('tr-TR')} TL
          </div>

          {/* Stok Sayacı */}
          {product.stock < 10 && <StockCounter stock={product.stock} />}

          {/* Adet / Paket Seçici */}
          {product.bundles && product.bundles.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Avantajlı Paket Seçin</p>
              {product.bundles.map((bundle: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedBundle(i)}
                  className={`w-full flex justify-between items-center p-5 border-2 transition-all rounded-2xl ${selectedBundle === i ? 'border-black bg-stone-50' : 'border-stone-200'}`}
                >
                  <div className="text-left">
                    <p className="font-bold text-sm">{bundle.qty} Adet {bundle.label && <span className="ml-2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full">{bundle.label}</span>}</p>
                  </div>
                  <p className="font-black text-lg">{(bundle.price_cents / 100).toLocaleString('tr-TR')} TL</p>
                </button>
              ))}
            </div>
          )}

          {/* Sepete Ekle Butonu */}
          <motion.button
            onClick={() => openCheckout(product, product.bundles?.[selectedBundle] ?? { qty: 1, price_cents: product.price_cents })}
            className="w-full bg-black text-white py-5 font-bold uppercase tracking-widest text-sm rounded-full hover:opacity-90"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Sipariş Ver
          </motion.button>

          <TrustBadges />
        </div>
      </div>

      <RecentPurchases productId={product.id} />
    </div>
  )
}