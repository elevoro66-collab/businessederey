// src/components/conversion/StockCounter.tsx
'use client'
import { motion } from 'framer-motion'

export function StockCounter({ stock }: { stock: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-sm bg-amber-50 text-amber-800 px-4 py-3 border border-amber-200 rounded-xl"
    >
      <span className="font-semibold">⚠️ Son {stock} ürün — tükenmeden sipariş verin!</span>
    </motion.div>
  )
}