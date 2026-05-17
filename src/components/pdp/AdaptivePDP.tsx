// src/components/pdp/AdaptivePDP.tsx
'use client'
import { SideBySidePDP } from './SideBySidePDP'

export function AdaptivePDP({ product }: { product: any }) {
  // Gelecekte buraya farklı şablonlar eklenebilir, şu an ana lüks şablonu döndürüyoruz
  return <SideBySidePDP product={product} />
}