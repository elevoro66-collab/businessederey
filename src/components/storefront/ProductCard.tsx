'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/types'

const fmt = (cents: number) =>
  (cents / 100).toLocaleString('tr-TR', {
    style: 'currency', currency: 'TRY', minimumFractionDigits: 2,
  })

export function ProductCard({ product }: { product: Product }) {
  const discount = product.old_price_cents
    ? Math.round(100 - (product.price_cents / product.old_price_cents) * 100)
    : null

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl bg-stone-100 aspect-[4/5] mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {discount && (
            <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
              %{discount} İNDİRİM
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="font-bold text-lg tracking-tight text-gray-900 mb-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-gray-900 font-semibold text-lg">
              {fmt(product.price_cents)}
            </span>
            {product.old_price_cents && (
              <span className="text-gray-400 line-through text-sm">
                {fmt(product.old_price_cents)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}