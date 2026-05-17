'use client'
import Image from 'next/image'
import Link from 'next/link'

export function DenseGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.slug}`} className="group relative block">
          <div className="relative aspect-square bg-stone-200 overflow-hidden">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:opacity-80 transition-opacity duration-200"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <span className="text-white font-black text-xs uppercase tracking-widest">Ürünü İncele</span>
            </div>
          </div>
          <div className="mt-2">
            <h3 className="font-black text-xs uppercase tracking-wide truncate">{product.name}</h3>
            <p className="text-sm font-bold mt-1">{(product.price_cents / 100).toLocaleString()} TL</p>
          </div>
        </Link>
      ))}
    </div>
  )
}