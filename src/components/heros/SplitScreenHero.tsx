'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '../../site.config'

export function SplitScreenHero() {
  return (
    <section className="grid lg:grid-cols-2 min-h-screen bg-[var(--color-background)]">
      {/* Sol Alan: Fotoğraf veya Görsel */}
      <div className="relative h-[50vh] lg:h-auto bg-stone-800 flex items-center justify-center text-white/50 font-bold uppercase tracking-widest">
        [ Ürün Görsel Alanı ]
      </div>
      
      {/* Sağ Alan: Yazılar */}
      <div className="flex items-center justify-center px-8 lg:px-16 py-16 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg"
        >
          <span className="inline-block text-[var(--color-accent)] text-xs font-bold tracking-widest uppercase mb-4">
            Yeni Sezon
          </span>
          <h1 className="text-[var(--color-primary)] text-4xl lg:text-5xl font-black mb-6 leading-tight uppercase italic">
            {siteConfig.brand.name} Koleksiyonu
          </h1>
          <p className="text-[var(--color-muted)] text-base leading-relaxed mb-8">
            Özel dokunmuş kumaş yapısı ve modern kesimiyle günün her anında premium konfor sunmak için tasarlandı.
          </p>
          <div className="flex gap-4">
            <Link
              href="#collection"
              className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:opacity-90 transition"
            >
              Şimdi İncele
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}