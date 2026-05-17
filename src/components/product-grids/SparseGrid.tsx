'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function SparseGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <Link href={`/products/${product.slug}`} className="group block">
            <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden mb-6" style={{ borderRadius: 'var(--radius-lg)' }}>
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg tracking-tight text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition">
                {product.name}
              </h3>
              <p className="font-semibold text-base text-[var(--color-primary)]">
                {(product.price_cents / 100).toLocaleString('tr-TR')} TL
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}