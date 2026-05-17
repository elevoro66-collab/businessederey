// src/components/heros/FullBleedHero.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '../../site.config'

export function FullBleedHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-stone-900" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
          <p className="text-stone-300 text-xs tracking-[0.3em] uppercase mb-6 font-medium">{siteConfig.brand.tagline}</p>
          <h1 className="text-white mb-8 font-light leading-[1.1] text-5xl md:text-7xl">Silence the World,<br /><span className="italic font-normal">Embrace Comfort</span></h1>
          <Link href="#collection" className="inline-block bg-white text-black px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-widest hover:scale-105 transition-all">Explore Collection</Link>
        </motion.div>
      </div>
    </section>
  )
}