// src/components/conversion/RecentPurchases.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function RecentPurchases({ productId }: { productId: string }) {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('Ahmet')

  useEffect(() => {
    const names = ['Ahmet', 'Mehmet', 'Can', 'Burak', 'Ege', 'Yiğit', 'Volkan']
    const interval = setInterval(() => {
      setName(names[Math.floor(Math.random() * names.length)])
      setShow(true)
      setTimeout(() => setShow(false), 4000)
    }, 15000)

    return () => clearInterval(interval)
  }, [productId])

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white shadow-2xl border border-stone-200 p-4 flex items-center gap-3 rounded-2xl text-black"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="text-sm">
              <p className="font-bold">{name} az önce bu ürünü satın aldı!</p>
              <p className="text-xs text-stone-400">1 dakika önce</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}