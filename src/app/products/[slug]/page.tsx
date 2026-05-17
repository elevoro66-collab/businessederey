'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCheckoutStore } from '@/store/useCheckoutStore'

const DEFAULT_SEED_PRODUCTS = [
  { id: 'cyberpet_1', slug: 'aton-cyber-display', name: 'Aton CyberPet™ Ekran', price_cents: 145000, old_price_cents: 225000, image: 'https://images.unsplash.com/photo-1552831388-6a0b35077328?auto=format&fit=crop&w=800&q=80', tagline: 'Masanızın yeni tatlı patronu.', description: 'Sıradan saatleri unutun. Pomodoro sayacı, hava durumu, bildirimler ve tatlı piksel animasyonlarıyla çalışma alanınıza ruh katar.' },
  { id: 'speaker_1', slug: 'pixel-speaker', name: 'Aton PixelSpeaker™', price_cents: 89000, old_price_cents: 120000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80', tagline: 'Müzik ve piksel sanatı bir arada.', description: 'Efsane ses kalitesi ve senkronize çalışan retro RGB led pikselleriyle odanıza bambaşka bir hava katacak kablosuz hoparlör.' },
  { id: 'clock_1', slug: 'cyber-clock', name: 'Aton CyberClock™', price_cents: 115000, old_price_cents: 180000, image: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?auto=format&fit=crop&w=800&q=80', tagline: 'Zamanı piksel piksel yaşayın.', description: '3D piksel göstergeli, alarm ve takvim destekli fütüristik masaüstü akıllı saat çözümü.' },
  { id: 'light_1', slug: 'neo-light', name: 'Aton NeoLight™', price_cents: 65000, old_price_cents: 95000, image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80', tagline: 'Odanızın atmosferini tamamen değiştirin.', description: 'Sese duyarlı ritim modu ve 16 milyon renk seçeneği sunan akıllı ortam aydınlatma çubuğu.' },
  { id: 'pad_1', slug: 'rgb-desk-pad', name: 'Aton RGB DeskPad™', price_cents: 45000, old_price_cents: 75000, image: 'https://images.unsplash.com/photo-1616788544464-9a67417537b0?auto=format&fit=crop&w=800&q=80', tagline: 'Oyun ve çalışma alanınıza renk katın.', description: 'Su geçirmez premium mikrofiber doku ve kenarlarından asil neon RGB aydınlatma şeritleri geçen dev masa matı.' },
  { id: 'flora_1', slug: 'cyber-flora', name: 'Aton CyberFlora™', price_cents: 125000, old_price_cents: 180000, image: 'https://images.unsplash.com/photo-1497215848552-3fb62292f7e0?auto=format&fit=crop&w=800&q=80', tagline: 'Masanızda havada süzülen botanik.', description: 'Manyetik kaldırma teknolojisiyle havada süzülerek dönen, çalışma masanıza fütüristik bir hava katan canlı saksı.' },
  { id: 'strip_1', slug: 'neon-glow', name: 'Aton NeonGlow™ 5M', price_cents: 55000, old_price_cents: 85000, image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', tagline: 'Sınırsız renk, akıllı kontrol.', description: 'Mobil uygulama kontrollü, müzik ritmine tam senkronize 5 metrelik akıllı neon led şerit.' },
  { id: 'projector_1', slug: 'cyber-projector', name: 'Aton CyberProjector™ Pro', price_cents: 295000, old_price_cents: 450000, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', tagline: 'Dev ekran keyfini her yerde yaşayın.', description: 'Dahili Android işletim sistemli, 4K destekli taşınabilir sinematik mini projeksiyon cihazı.' },
  { id: 'key_1', slug: 'mech-keyboard', name: 'Aton MechKey™ Wireless', price_cents: 165000, old_price_cents: 240000, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80', tagline: 'Kusursuz mekanik yazma deneyimi.', description: 'Hot-swappable mekanik anahtarlar, kablosuz bağlantı ve lüks şeffaf bento tuş tasarımı.' },
  { id: 'charger_1', slug: 'magglow-charger', name: 'Aton MagGlow™ Charger', price_cents: 79000, old_price_cents: 115000, image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=800&q=80', tagline: 'Şeffaf tasarımlı neon şarj standı.', description: 'Telefonunuzu mıknatısla kavrayıp şarj ederken siber ambiyansıyla odanıza zarafet katan hızlı Qi2 istasyonu.' }
]

export default function ProductPage({ params }: { params: any }) {
  const [slug, setSlug] = useState<string>("")
  const [product, setProduct] = useState<any>(null)
  const [selectedBundle, setSelectedBundle] = useState<any>(null)
  const openCheckout = useCheckoutStore((s: any) => s.openCheckout)

  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [openTab, setOpenTab] = useState<string | null>(null)

  // 🛡️ KRAL ÇÖZÜM: Next.js 14 ve 15 versiyonlarının ikisinde de çökmeyen akıllı dönüştürücü
  useEffect(() => {
    if (!params) return
    if (typeof params.then === 'function') {
      params.then((resolved: any) => { if (resolved && resolved.slug) setSlug(resolved.slug) })
    } else if (params.slug) {
      setSlug(params.slug)
    }
  }, [params])

  useEffect(() => {
    if (!slug) return
    let savedProducts = []
    try { savedProducts = JSON.parse(localStorage.getItem('hoodienza_products') || '[]') } 
    catch(e) { savedProducts = [] }

    if (savedProducts.length === 0) {
      localStorage.setItem('hoodienza_products', JSON.stringify(DEFAULT_SEED_PRODUCTS))
      savedProducts = JSON.parse(JSON.stringify(DEFAULT_SEED_PRODUCTS))
    }

    const foundProduct = savedProducts.find((p: any) => p.slug === slug)

    if (foundProduct) {
      const cleanProduct = JSON.parse(JSON.stringify(foundProduct))
      const verifiedOldPriceCents = cleanProduct.old_price_cents && cleanProduct.old_price_cents > cleanProduct.price_cents
        ? cleanProduct.old_price_cents
        : Math.floor(cleanProduct.price_cents * 1.65)

      const generatedBundles = [
        { qty: 1, price_cents: cleanProduct.price_cents, label: 'Standart Paket', old_price: `${(verifiedOldPriceCents / 100).toLocaleString('tr-TR')} TL` },
        { qty: 2, price_cents: Math.floor(cleanProduct.price_cents * 2 * 0.9), label: 'Çiftli Kombin / %10 İndirim', old_price: `${((cleanProduct.price_cents * 2) / 100).toLocaleString('tr-TR')} TL` }
      ]
      
      setProduct({ ...cleanProduct, bundles: generatedBundles })
      setSelectedBundle(generatedBundles[0])
    }
  }, [slug])

  const handleAddToCart = () => {
    if (!product || !selectedBundle) return
    const existingItemIdx = cartItems.findIndex((item) => item.id === product.id && item.bundle.qty === selectedBundle.qty)
    if (existingItemIdx > -1) {
      const updated = [...cartItems]
      updated[existingItemIdx].quantity += 1
      setCartItems(updated)
    } else {
      setCartItems([...cartItems, { ...product, bundle: selectedBundle, quantity: 1 }])
    }
    setIsCartOpen(true)
  }

  const updateCartQuantity = (index: number, change: number) => {
    const updated = [...cartItems]
    updated[index].quantity += change
    if (updated[index].quantity <= 0) updated.splice(index, 1)
    setCartItems(updated)
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center bg-white text-black font-bold">Mağaza Yükleniyor...</div>

  return (
    <div className="min-h-screen bg-slate-50 text-black antialiased relative selection:bg-stone-900 selection:text-white">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 px-4 py-3 flex justify-between items-center max-w-md mx-auto w-full shadow-sm">
        <Link href="/" className="text-xs font-bold uppercase tracking-wider text-stone-500">← Vitrin</Link>
        <div className="text-lg font-black tracking-tight uppercase">Aton</div>
        <button onClick={() => setIsCartOpen(true)} className="relative text-xl p-1 cursor-pointer">
          🛒 {cartItems.reduce((t, i) => t + i.quantity, 0) > 0 && <span className="absolute -top-1 -right-1.5 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartItems.reduce((t, i) => t + i.quantity, 0)}</span>}
        </button>
      </header>

      <div className="max-w-md mx-auto bg-white min-h-screen shadow-md pb-32">
        <div className="relative aspect-square w-full bg-stone-100 overflow-hidden border-b border-stone-200">
          <img src={product.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-4 space-y-2">
          <h1 className="text-2xl font-black text-stone-900 leading-tight uppercase">{product.name}</h1>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">{product.description || product.tagline}</p>
        </div>
        <div className="px-4 py-2 flex items-baseline gap-3">
          <span className="text-3xl font-black text-blue-600">{((selectedBundle?.price_cents || product.price_cents) / 100).toLocaleString('tr-TR')} TL</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            {product.bundles?.map((bundle: any, i: number) => (
              <button key={i} onClick={() => setSelectedBundle(bundle)} className={`w-full flex justify-between items-center p-4 border-2 rounded-xl cursor-pointer ${selectedBundle?.qty === bundle.qty ? 'border-blue-600 bg-blue-50/50 font-bold' : 'border-stone-200'}`}>
                <span className="text-xs font-bold">{bundle.qty} Adet {bundle.label}</span>
                <span className="font-black text-xs">{(bundle.price_cents / 100).toLocaleString('tr-TR')} TL</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <button onClick={handleAddToCart} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-xs cursor-pointer shadow-lg">Sepete Ekle</button>
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex justify-end backdrop-blur-sm">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col text-black shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-stone-50"><h2 className="font-black text-base uppercase">Sepetiniz 🛒</h2><button onClick={() => setIsCartOpen(false)} className="font-bold text-lg p-1 cursor-pointer">✕</button></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-3 border rounded-xl bg-stone-50/50">
                  <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0"><img src={item.image} alt="" className="w-full h-full object-cover" /></div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div><p className="text-[10px] bg-stone-200 font-black px-2 py-0.5 rounded inline-block mt-1 uppercase">{item.bundle.label}</p></div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-black text-xs text-blue-600">{((item.bundle.price_cents * item.quantity) / 100).toLocaleString('tr-TR')} TL</p>
                      <button onClick={() => updateCartQuantity(idx, -item.quantity)} className="text-[10px] text-stone-400 hover:text-red-500 font-bold uppercase underline cursor-pointer">Kaldır</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}