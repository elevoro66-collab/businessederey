'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCheckoutStore } from '@/store/useCheckoutStore'

// 🚀 TAM 10 ADET SIFIR HATALI CYBER ELEKTRONİK ÜRÜN KÜTÜPHANESİ
const DEFAULT_SEED_PRODUCTS = [
  { id: 'cyberpet_1', slug: 'aton-cyber-display', name: 'Aton CyberPet™ Ekran', price_cents: 145000, old_price_cents: 225000, image: 'https://images.unsplash.com/photo-1552831388-6a0b35077328?auto=format&fit=crop&w=800&q=80', tagline: 'Masanızın yeni tatlı patronu.', description: 'Sıradan saatleri unutun. Pomodoro sayacı, hava durumu, bildirimler ve tatlı piksel animasyonlarıyla çalışma alanınıza ruh katar.' },
  { id: 'speaker_1', slug: 'pixel-speaker', name: 'Aton PixelSpeaker™', price_cents: 89000, old_price_cents: 120000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80', tagline: 'Müzik ve piksel sanatı bir arada.', description: 'Efsane ses kalitesi ve senkronize çalışan retro RGB led pikselleriyle odanıza bambaşka bir hava katacak kablosuz hoparlör.' },
  { id: 'clock_1', slug: 'cyber-clock', name: 'Aton CyberClock™', price_cents: 115000, old_price_cents: 180000, image: 'https://images.unsplash.com/photo-1584208124888-3a20b9c799e2?auto=format&fit=crop&w=800&q=80', tagline: 'Zamanı piksel piksel yaşayın.', description: '3D piksel göstergeli, alarm ve takvim destekli fütüristik masaüstü akıllı saat çözümü.' },
  { id: 'light_1', slug: 'neo-light', name: 'Aton NeoLight™', price_cents: 65000, old_price_cents: 95000, image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80', tagline: 'Odanızın atmosferini tamamen değiştirin.', description: 'Sese duyarlı ritim modu ve 16 milyon renk seçeneği sunan akıllı ortam aydınlatma çubuğu.' },
  { id: 'pad_1', slug: 'rgb-desk-pad', name: 'Aton RGB DeskPad™', price_cents: 45000, old_price_cents: 75000, image: 'https://images.unsplash.com/photo-1616788544464-9a67417537b0?auto=format&fit=crop&w=800&q=80', tagline: 'Oyun ve çalışma alanınıza renk katın.', description: 'Su geçirmez premium mikrofiber doku ve kenarlarından asil neon RGB aydınlatma şeritleri geçen dev masa matı.' },
  { id: 'flora_1', slug: 'cyber-flora', name: 'Aton CyberFlora™', price_cents: 125000, old_price_cents: 180000, image: 'https://images.unsplash.com/photo-1497215848552-3fb62292f7e0?auto=format&fit=crop&w=800&q=80', tagline: 'Masanızda havada süzülen botanik.', description: 'Manyetik kaldırma teknolojisiyle havada süzülerek dönen, çalışma masanıza fütüristik bir hava katan canlı saksı.' },
  { id: 'strip_1', slug: 'neon-glow', name: 'Aton NeonGlow™ 5M', price_cents: 55000, old_price_cents: 85000, image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', tagline: 'Sınırsız renk, akıllı kontrol.', description: 'Mobil uygulama kontrollü, müzik ritmine tam senkronize 5 metrelik akıllı neon led şerit.' },
  { id: 'projector_1', slug: 'cyber-projector', name: 'Aton CyberProjector™ Pro', price_cents: 295000, old_price_cents: 450000, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', tagline: 'Dev ekran keyfini her yerde yaşayın.', description: 'Dahili Android işletim sistemli, 4K destekli taşınabilir sinematik mini projeksiyon cihazı.' },
  { id: 'key_1', slug: 'mech-keyboard', name: 'Aton MechKey™ Wireless', price_cents: 165000, old_price_cents: 240000, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80', tagline: 'Kusursuz mekanik yazma deneyimi.', description: 'Hot-swappable mekanik anahtarlar, kablosuz bağlantı ve lüks şeffaf tuş tasarımı.' },
  { id: 'charger_1', slug: 'magglow-charger', name: 'Aton MagGlow™ Charger', price_cents: 79000, old_price_cents: 115000, image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=800&q=80', tagline: 'Şeffaf tasarımlı neon şarj standı.', description: 'Telefonunuzu mıknatısla kavrayıp şarj ederken siber ambiyansıyla odanıza zarafet katan hızlı Qi2 istasyonu.' }
]

export default function SingleProductFunnel() {
  const [products, setProducts] = useState<any[]>([])
  const [heroProduct, setHeroProduct] = useState<any>(null)
  const [selectedBundle, setSelectedBundle] = useState<any>(null)
  
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const openCheckout = useCheckoutStore((s: any) => s.openCheckout)

  useEffect(() => {
    let savedProducts = []
    try { savedProducts = JSON.parse(localStorage.getItem('hoodienza_products') || '[]') } 
    catch(e) { savedProducts = [] }

    if (savedProducts.length === 0) {
      localStorage.setItem('hoodienza_products', JSON.stringify(DEFAULT_SEED_PRODUCTS))
      savedProducts = JSON.parse(JSON.stringify(DEFAULT_SEED_PRODUCTS))
    }
    
    setProducts(savedProducts)

    if (savedProducts.length > 0) {
      const dbProduct = savedProducts[0]
      const dynamicBundles = [
        { qty: 1, price_cents: dbProduct.price_cents, label: 'Standart Paket', old_price: `${(dbProduct.old_price_cents / 100).toLocaleString('tr-TR')} ₼`, popular: false },
        { qty: 2, price_cents: Math.floor(dbProduct.price_cents * 2 * 0.85), label: '2 Adet (En Popüler Kombin)', old_price: `${((dbProduct.price_cents * 2) / 100).toLocaleString('tr-TR')} ₼`, popular: true },
      ]
      setHeroProduct({ ...dbProduct, bundles: dynamicBundles })
      setSelectedBundle(dynamicBundles[1])
    }
  }, [])

  const handleAddToCart = (productToAdd: any, bundleToAdd: any) => {
    const existingItemIdx = cartItems.findIndex((item) => item.id === productToAdd.id && item.bundle.qty === bundleToAdd.qty)
    if (existingItemIdx > -1) {
      const updated = [...cartItems]
      updated[existingItemIdx].quantity += 1
      setCartItems(updated)
    } else {
      setCartItems([...cartItems, { ...productToAdd, bundle: bundleToAdd, quantity: 1 }])
    }
    setIsCartOpen(true)
  }

  const updateCartQuantity = (index: number, change: number) => {
    const updated = [...cartItems]
    updated[index].quantity += change
    if (updated[index].quantity <= 0) updated.splice(index, 1)
    setCartItems(updated)
  }

  if (!heroProduct) return <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center font-black text-2xl text-[#A485FF]">Aton Cyber Yükleniyor...</div>

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#111111] font-sans selection:bg-[#A485FF] selection:text-white pb-24 lg:pb-0 overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 22s linear infinite; }
        .bento-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .bento-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px -10px rgba(164, 133, 255, 0.2); }
      `}} />

      {/* NAVBAR */}
      <div className="fixed top-6 left-0 right-0 z-40 px-6">
        <header className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl border-2 border-stone-100 rounded-full px-8 py-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <span className="text-[#A485FF]">👾</span> ATON
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-black text-stone-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-[#A485FF] transition-colors">Nasıl Çalışır</a>
            <a href="#collection" className="hover:text-[#A485FF] transition-colors">Siber Aile</a>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="bg-[#111111] hover:bg-[#A485FF] text-white px-6 py-2.5 rounded-full font-black text-sm transition-colors flex items-center gap-2 cursor-pointer">
            Sepet <span className="bg-white text-[#111111] px-2 py-0.5 rounded-full">{cartItems.reduce((t, i) => t + i.quantity, 0)}</span>
          </button>
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
          <div className="inline-block bg-[#F2EEFF] text-[#A485FF] font-black text-[11px] uppercase tracking-widest px-5 py-2 rounded-full border border-[#A485FF]/20">
            YENİ NESİL MASAÜSTÜ DOSTU
          </div>
          <h1 className="text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] text-[#111111]">
            Masanızın <br/><span className="text-[#A485FF]">Tatlı Tarafı.</span>
          </h1>
          <p className="text-xl text-stone-500 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
            {heroProduct.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
            <a href="#buy" className="w-full sm:w-auto bg-[#A485FF] text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#8D6BFF] transition-all hover:scale-105 shadow-2xl shadow-[#A485FF]/40 text-center">
              Ona Sahip Ol
            </a>
            <div className="flex items-center gap-2 text-sm font-black text-stone-600 bg-white px-6 py-4 rounded-full border border-stone-200 shadow-sm">
              <span className="text-amber-400 text-xl">★★★★★</span> 10K+ Mutlu Müşteri
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative w-full max-w-lg mx-auto aspect-square bg-[#F2EEFF] rounded-[4rem] flex items-center justify-center border-4 border-white shadow-2xl shadow-[#A485FF]/10 bento-card">
          <img src={heroProduct.image} alt={heroProduct.name} className="w-[80%] h-[80%] object-contain drop-shadow-2xl" />
          <div className="absolute -top-4 -right-4 bg-white border-2 border-stone-100 px-5 py-2.5 rounded-2xl shadow-xl font-black text-sm rotate-12">Pomodoro 🍅</div>
          <div className="absolute -bottom-4 -left-4 bg-[#111111] text-white px-5 py-2.5 rounded-2xl shadow-xl font-black text-sm -rotate-6">Piksel Art 👾</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#111111] text-[#A485FF] py-5 overflow-hidden flex whitespace-nowrap -rotate-2 scale-110 shadow-xl relative z-10 border-y-4 border-[#A485FF]">
        <div className="animate-marquee font-black uppercase text-xl tracking-widest">
          &nbsp;⚡ TÜM SİPARİŞLERDE ÜCRETSİZ KARGO ⚡ 30 GÜN İADE GARANTİSİ ⚡ 100% GÜVENLİ ALIŞVERİŞ ⚡ TİKTOK'TA VİRAL OLDU ⚡ TÜM SİPARİŞLERDE ÜCRETSİZ KARGO ⚡ 
        </div>
        <div className="animate-marquee font-black uppercase text-xl tracking-widest" aria-hidden="true">
          &nbsp;⚡ TÜM SİPARİŞLERDE ÜCRETSİZ KARGO ⚡ 30 GÜN İADE GARANTİSİ ⚡ 100% GÜVENLİ ALIŞVERİŞ ⚡ TİKTOK'TA VİRAL OLDU ⚡ TÜM SİPARİŞLERDE ÜCRETSİZ KARGO ⚡ 
        </div>
      </div>

      {/* BENTO GRID */}
      <section id="features" className="py-32 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black tracking-tight text-[#111111]">Nasıl Çalışır?</h2>
          <p className="text-stone-500 font-bold text-lg">Telefonunuzdan tek tıkla kontrol edin, masanız canlansın.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#111111] text-white rounded-[3rem] p-10 flex flex-col justify-center shadow-xl bento-card">
            <span className="text-5xl mb-6">⏰</span>
            <h3 className="text-2xl font-black mb-2">Odak Modu</h3>
            <p className="text-stone-400 font-medium">Pomodoro tekniği ile pürüzsüz çalışın. Dikkatiniz asla dağılmasın.</p>
          </div>

          <div className="md:col-span-2 bg-[#A485FF] text-white rounded-[3rem] p-10 flex flex-col sm:flex-row items-center gap-10 shadow-xl bento-card">
            <div className="space-y-4 flex-1">
              <h3 className="text-4xl font-black leading-none">Piksel Art <br/>Animasyonlar</h3>
              <p className="font-bold text-white/80">Binlerce hareketli GIF arasından tarzınızı seçin veya kendi piksel sanatınızı çizin.</p>
            </div>
            <div className="w-full sm:w-1/2 aspect-video bg-white/20 rounded-3xl overflow-hidden border border-white/30 p-2">
               <img src="https://images.unsplash.com/photo-1611462985358-60d3498e0364?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover rounded-2xl" alt=""/>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-stone-100 flex flex-col sm:flex-row items-center gap-10 bento-card">
            <div className="w-full sm:w-1/2 aspect-square bg-[#FDFDFD] rounded-3xl overflow-hidden relative">
              <img src={heroProduct.image} className="absolute inset-0 w-full h-full object-contain mix-blend-multiply scale-110" alt="" />
            </div>
            <div className="space-y-4 flex-1">
              <div className="inline-block bg-[#F2EEFF] text-[#A485FF] font-black text-xs px-3 py-1 rounded-full">BATARYA</div>
              <h3 className="text-3xl font-black">Kablo Kirliliğine Son</h3>
              <p className="text-stone-500 font-medium">Type-C şarj kablosuyla gelir. Dahili bataryası sayesinde kablo dağınıklığı olmadan masanızda özgürce durur.</p>
            </div>
          </div>

          <div className="bg-[#D1F264] text-[#111111] rounded-[3rem] p-10 flex flex-col justify-center shadow-xl bento-card">
            <span className="text-5xl mb-6">📱</span>
            <h3 className="text-2xl font-black mb-2">Anlık Bildirim</h3>
            <p className="font-bold opacity-80">Gelen mesajlar, aramalar ve hava durumu anında ekrana yansır.</p>
          </div>
        </div>
      </section>

      {/* BUY BUNDLE */}
      <section id="buy" className="py-24 bg-white px-6 border-t border-stone-100">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative bg-[#F2EEFF] rounded-[4rem] aspect-square p-12 border border-[#A485FF]/10 bento-card">
            <img src={heroProduct.image} alt={heroProduct.name} className="w-full h-full object-contain drop-shadow-2xl" />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-black tracking-tight">{heroProduct.name}</h2>
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-[#A485FF]">{(selectedBundle.price_cents / 100).toLocaleString('tr-TR')} ₼</span>
                <span className="text-2xl text-stone-400 line-through font-bold">{selectedBundle.old_price}</span>
              </div>
              <p className="text-lg text-stone-500 font-medium">{heroProduct.tagline}</p>
            </div>

            <div className="space-y-4 pt-4">
              {heroProduct.bundles.map((bundle: any, i: number) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedBundle(bundle)} 
                  className={`w-full relative flex items-center justify-between p-6 rounded-3xl border-4 transition-all cursor-pointer ${
                    selectedBundle.qty === bundle.qty 
                      ? 'border-[#A485FF] bg-[#F2EEFF] shadow-lg' 
                      : 'border-stone-100 hover:border-stone-300 bg-white'
                  }`}
                >
                  {bundle.popular && (
                    <span className="absolute -top-3 right-6 bg-[#111111] text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider">
                      En Popüler
                    </span>
                  )}
                  <div className="flex items-center gap-5">
                    <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${selectedBundle.qty === bundle.qty ? 'border-[#A485FF]' : 'border-stone-300'}`}>
                      {selectedBundle.qty === bundle.qty && <div className="w-3 h-3 rounded-full bg-[#A485FF]" />}
                    </div>
                    <div className="text-left">
                      <p className="font-black text-lg text-stone-900">{bundle.label}</p>
                      <p className="text-sm text-stone-500 font-bold">{(bundle.price_cents / 100).toLocaleString('tr-TR')} ₼</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => handleAddToCart(heroProduct, selectedBundle)} className="w-full bg-[#111111] text-white py-6 rounded-full font-black uppercase tracking-widest text-lg hover:bg-[#A485FF] transition-colors shadow-2xl hover:shadow-[#A485FF]/40 cursor-pointer">
              ŞİMDİ SEPETE EKLE 🛒
            </button>
          </div>
        </div>
      </section>

      {/* 🌟 REKOR DOLU KATALOG ALANI */}
      <section id="collection" className="py-24 bg-[#FDFDFD] px-6 border-t border-stone-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-[#111111]">Cyber Ailesiyle Tanışın</h2>
            <p className="text-stone-500 font-bold text-lg">Çalışma alanınızı tamamen dijital bir stüdyoya çevirecek diğer imza ürünlerimiz.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
            {products.slice(1).map((prod) => (
              <Link href={`/products/${prod.slug}`} key={prod.id} className="bg-white border-2 border-stone-100 rounded-[2.5rem] p-5 text-center bento-card cursor-pointer flex flex-col">
                <div className="bg-[#F2EEFF] rounded-[2rem] p-4 aspect-square mb-4 overflow-hidden flex items-center justify-center">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover rounded-xl shadow-inner" />
                </div>
                <h3 className="font-black text-sm mb-1 text-[#111111] line-clamp-1 uppercase">{prod.name}</h3>
                <p className="text-stone-400 font-bold text-[10px] mb-3 line-clamp-1">{prod.tagline}</p>
                <div className="mt-auto pt-3 border-t border-stone-100 flex justify-center items-baseline gap-2">
                  <span className="font-black text-lg text-[#A485FF]">{(prod.price_cents / 100).toLocaleString('tr-TR')} ₼</span>
                  {prod.old_price_cents > prod.price_cents && (
                    <span className="text-[11px] text-stone-300 line-through">{(prod.old_price_cents / 100).toLocaleString('tr-TR')} ₼</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEPET MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-stone-900/60 z-50 flex justify-end backdrop-blur-sm">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col text-[#111111] shadow-2xl">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h2 className="font-black text-xl tracking-tight">Sepetiniz 🛒</h2>
              <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 bg-stone-100 rounded-full font-bold flex items-center justify-center hover:bg-stone-200 transition-colors cursor-pointer">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center pt-20 text-stone-400 font-bold">Sepetiniz şu an boş.</div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-3xl bg-stone-50 border border-stone-100 animate-fade-in">
                    <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden p-1 shadow-sm"><img src={item.image} alt="" className="w-full h-full object-cover rounded-xl" /></div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] bg-[#F2EEFF] text-[#A485FF] font-black px-2.5 py-1 rounded-md inline-block uppercase tracking-wider">{item.bundle.label}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-black text-base text-[#111111]">{(item.bundle.price_cents * item.quantity / 100).toLocaleString('tr-TR')} ₼</p>
                        <button onClick={() => updateCartQuantity(idx, -item.quantity)} className="text-[10px] text-stone-400 hover:text-red-500 font-black uppercase underline cursor-pointer">Kaldır</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-stone-100 space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Ara Toplam:</span>
                  <span className="text-3xl font-black text-[#A485FF]">{(cartItems.reduce((t, i) => t + (i.bundle.price_cents * i.quantity), 0) / 100).toLocaleString('tr-TR')} ₼</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); openCheckout(heroProduct, selectedBundle); }} className="w-full bg-[#111111] text-white py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#A48FF] transition-colors bg-[#111111] cursor-pointer">
                  Güvenli Ödeme Yap 🔒
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}