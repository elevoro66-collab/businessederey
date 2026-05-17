'use client'
import { useState, useEffect } from 'react'

const DEFAULT_SEED_PRODUCTS = [
  { id: 'watch_1', slug: 'premium-leather-watch', name: 'Hoodienza™ Premium Leather Watch', price_cents: 125000, old_price_cents: 245000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80', tagline: 'Zamansız lüks, hakiki deri işçilik.', description: 'Uzman saat yapımcıları tarafından onaylanmış zamansız başyapıt.' },
  { id: 'wallet_1', slug: 'minimalist-wallet', name: 'Hoodienza™ Minimalist Card Wallet', price_cents: 45000, old_price_cents: 85000, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', tagline: 'Cebinizdeki hafiflik, premium his.', description: 'Hakiki deri ve RFID korumalı modern mekanizmalı cüzdan.' },
  { id: 'throw_1', slug: 'cashmere-throw', name: 'Hoodienza™ Cashmere Throw', price_cents: 260000, old_price_cents: 380000, image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&w=800&q=80', tagline: 'Evde veya yolda saf kaşmir konforu.', description: '%100 saf kaşmirden üretilen bu imza battaniye lüks bir konfor sunar.' },
  { id: 'diffuser_1', slug: 'travel-diffuser', name: 'Hoodienza™ Travel Diffuser', price_cents: 85000, old_price_cents: 135000, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', tagline: 'Seyahatiniz için dingin aromalar.', description: 'Gittiğiniz her odasını kendi lüks sığınağınıza dönüştürün.' },
  { id: 'hoodie_1', slug: 'premium-hoodie', name: 'Hoodienza™ Premium Hoodie', price_cents: 185000, old_price_cents: 295000, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80', tagline: 'Kusursuz kalıp, ağır gramajlı lüks kumaş.', description: 'Ağır gramajlı premium pamuk kumaşıyla sokak modasını lüks konforla birleştiren imza hoodie.' },
  { id: 'glasses_1', slug: 'onyx-sunglasses', name: 'Hoodienza™ Onyx Sunglasses', price_cents: 145000, old_price_cents: 195000, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', tagline: 'Göz alıcı mat siyah çerçeve.', description: 'UV400 korumalı premium camlar ve asil mat siyah çerçeve.' },
  { id: 'mug_1', slug: 'ceramic-coffee-mug', name: 'Hoodienza™ Ceramic Coffee Mug', price_cents: 32000, old_price_cents: 58000, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', tagline: 'Ofiste ve masanızda kusursuz duruş.', description: 'Özel mat seramik yapısıyla kahve ritüellerinizi lüks bir boyuta taşıyın.' },
  { id: 'tech_1', slug: 'essential-tech-case', name: 'Hoodienza™ Essential Tech Case', price_cents: 89000, old_price_cents: 145000, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80', tagline: 'Kablolar ve aksesuarlar için lüks düzen.', description: 'Tüm şarj cihazlarınız, kablolarınız ve aksesuarlarınız için su geçirmez premium düzenleyici çanta.' }
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders')
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [editingProduct, setEditingProduct] = useState<any | null>(null)

  const [newProd, setNewProd] = useState({
    name: '', slug: '', price: '', old_price: '', tagline: '', description: '', image: ''
  })

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('hoodienza_orders') || '[]')
    setOrders(savedOrders)

    let savedProducts = localStorage.getItem('hoodienza_products')
    if (!savedProducts) {
      localStorage.setItem('hoodienza_products', JSON.stringify(DEFAULT_SEED_PRODUCTS))
      setProducts(DEFAULT_SEED_PRODUCTS)
    } else {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  const handleOrderStatus = (id: string, newStatus: string) => {
    const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o)
    setOrders(updated)
    localStorage.setItem('hoodienza_orders', JSON.stringify(updated))
  }

  const handleOrderDelete = (id: string) => {
    if (!window.confirm("Siparişi silmek istiyor musunuz?")) return
    const updated = orders.filter(o => o.id !== id)
    setOrders(updated)
    localStorage.setItem('hoodienza_orders', JSON.stringify(updated))
  }

  const handleClearAll = () => {
    if (!window.confirm("Bütün siparişleri temizlemek istediğine emin misin?")) return
    setOrders([])
    localStorage.removeItem('hoodienza_orders')
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProd.name || !newProd.slug || !newProd.price) return

    const productToAdd = {
      id: `PROD-${Date.now()}`,
      name: newProd.name,
      slug: newProd.slug.toLowerCase().replace(/ /g, '-'),
      price_cents: parseFloat(newProd.price) * 100,
      old_price_cents: newProd.old_price ? parseFloat(newProd.old_price) * 100 : parseFloat(newProd.price) * 165,
      tagline: newProd.tagline || 'Hoodienza Parçası.',
      description: newProd.description || 'Premium el işçiliği.',
      image: newProd.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    }

    const updatedProds = [productToAdd, ...products]
    setProducts(updatedProds)
    localStorage.setItem('hoodienza_products', JSON.stringify(updatedProds))
    setNewProd({ name: '', slug: '', price: '', old_price: '', tagline: '', description: '', image: '' })
    alert("Ürün başarıyla vitrine uçuruldu!")
  }

  const handleDeleteProduct = (id: string) => {
    if (!window.confirm("Ürünü silmek istiyor musunuz?")) return
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    localStorage.setItem('hoodienza_products', JSON.stringify(updated))
  }

  const handleSaveProductSettings = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    const updated = products.map(p => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          name: editingProduct.name,
          price_cents: parseFloat(editingProduct.price) * 100,
          old_price_cents: editingProduct.old_price ? parseFloat(editingProduct.old_price) * 100 : parseFloat(editingProduct.price) * 165,
          tagline: editingProduct.tagline,
          description: editingProduct.description,
          image: editingProduct.image
        }
      }
      return p
    })

    setProducts(updated)
    localStorage.setItem('hoodienza_products', JSON.stringify(updated))
    setEditingProduct(null)
    alert("Ürün ayarları başarıyla kaydedildi kanka!")
  }

  // 🎯 KESİN FİLTRELEME: BU SEFER MAP DÖNGÜLERİNE DOĞRUDAN BAĞLANDILAR!
  const pendingOrders = orders.filter(o => o.status === 'Beklemede' || !o.status)
  const archivedOrders = orders.filter(o => o.status && o.status !== 'Beklemede')

  return (
    <div className="min-h-screen bg-stone-100 text-black p-6 font-sans pb-24 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Üst Sekme Seçimi */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight">Hoodienza™ Kontrol Merkezi</h1>
            <p className="text-xs text-stone-400 font-medium">Sipariş ve Ürün Yapılandırma Masası</p>
          </div>
          <div className="flex bg-stone-100 p-1.5 rounded-xl border border-stone-200">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-white shadow-sm text-black' : 'text-stone-400'}`}>
              🛒 Siparişler ({pendingOrders.length})
            </button>
            <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${activeTab === 'products' ? 'bg-white shadow-sm text-black' : 'text-stone-400'}`}>
              📦 Ürün Ayarları ({products.length})
            </button>
          </div>
        </div>

        {/* SİPARİŞ AKIŞI SEKME İÇERİĞİ */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* ⚡ YALNIZCA AKTİF BEKLEYENLER (Döngü pendingOrders ile dönüyor, asla kaçış yok) */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
              <div className="p-4 bg-amber-50/60 font-black text-xs uppercase text-amber-800 flex justify-between items-center">
                <span>⚡ Aktif Bekleyen Siparişler ({pendingOrders.length})</span>
                {orders.length > 0 && (
                  <button onClick={handleClearAll} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded font-bold border border-red-200 cursor-pointer">
                    清理🧹 Tümünü Sıfırla
                  </button>
                )}
              </div>
              
              {pendingOrders.length === 0 ? (
                <div className="p-8 text-center text-stone-400 text-sm font-medium">Bekleyen yeni sipariş bulunmuyor patron.</div>
              ) : (
                pendingOrders.map((order) => (
                  <div key={order.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded">{order.id}</span>
                        <span className="text-[10px] text-stone-400 font-bold">{order.date}</span>
                      </div>
                      <h4 className="font-black text-base">{order.customer}</h4>
                      <p className="text-xs text-blue-600 font-bold">{order.instagram}</p>
                      <p className="text-xs text-stone-500">{order.product} <span className="text-[10px] text-stone-400">({order.receipt})</span></p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                      <div className="text-right">
                        <p className="text-lg font-black">{order.amount}</p>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">{order.status}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button type="button" onClick={() => handleOrderStatus(order.id, 'Onaylandı')} className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">Onayla</button>
                        <button type="button" onClick={() => handleOrderStatus(order.id, 'Reddedildi')} className="border border-stone-200 text-stone-600 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">Reddet</button>
                        <button type="button" onClick={() => handleOrderDelete(order.id)} className="bg-red-50 text-red-600 text-xs p-2 rounded-lg cursor-pointer">🗑️</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 📂 İŞLEM GÖRMÜŞ GEÇMİŞ ARŞİV KUTUSU */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100 opacity-85">
              <div className="p-4 bg-stone-50 font-black text-xs uppercase text-stone-500">📂 İşlenmiş Geçmiş Arşiv ({archivedOrders.length})</div>
              {archivedOrders.length === 0 ? (
                <div className="p-6 text-center text-stone-400 text-xs font-medium">Arşivlenmiş geçmiş sipariş bulunmuyor.</div>
              ) : (
                archivedOrders.map((order) => (
                  <div key={order.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-stone-50/40">
                    <div>
                      <p className="text-[11px] font-mono text-stone-400">{order.id} · {order.customer} ({order.instagram})</p>
                      <p className="text-xs text-stone-600 font-bold">{order.product} - {order.amount}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${order.status === 'Onaylandı' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{order.status}</span>
                      <button onClick={() => handleOrderDelete(order.id)} className="text-stone-400 hover:text-red-600 text-xs cursor-pointer">🗑️ Kalıcı Sil</button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* ÜRÜN AYARLARI SEKME İÇERİĞİ */}
        {activeTab === 'products' && (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Sol Form */}
            <form onSubmit={handleAddProduct} className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-stone-200 space-y-4 h-fit">
              <h3 className="font-black text-xs uppercase tracking-wider text-stone-500 border-b pb-2">✨ Yeni Ürün Ekle</h3>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-stone-400 uppercase">Ürün Adı</label>
                <input type="text" required value={newProd.name} onChange={e=>setNewProd({...newProd, name: e.target.value})} placeholder="Örn: Aton" className="w-full p-2.5 border border-stone-200 rounded-xl text-xs bg-stone-50 focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-stone-400 uppercase">Slug (Adres Adı)</label>
                <input type="text" required value={newProd.slug} onChange={e=>setNewProd({...newProd, slug: e.target.value})} placeholder="Örn: premium-aton" className="w-full p-2.5 border border-stone-200 rounded-xl text-xs bg-stone-50 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-stone-400 uppercase">Satış Fiyatı (TL)</label>
                  <input type="number" required value={newProd.price} onChange={e=>setNewProd({...newProd, price: e.target.value})} placeholder="1500" className="w-full p-2.5 border border-stone-200 rounded-xl text-xs bg-stone-50 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-stone-400 uppercase">Eski Fiyatı (TL)</label>
                  <input type="number" value={newProd.old_price} onChange={e=>setNewProd({...newProd, old_price: e.target.value})} placeholder="2450" className="w-full p-2.5 border border-stone-200 rounded-xl text-xs bg-stone-50 focus:outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-stone-400 uppercase">Görsel Linki</label>
                <input type="text" value={newProd.image} onChange={e=>setNewProd({...newProd, image: e.target.value})} placeholder="https://..." className="w-full p-2.5 border border-stone-200 rounded-xl text-xs bg-stone-50 focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-blue-700 cursor-pointer">Vitrine Gönder 🚀</button>
            </form>

            {/* Sağ Liste */}
            <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden divide-y divide-stone-100">
              <div className="p-4 bg-stone-50 font-black text-xs uppercase text-stone-500">Mağazadaki Mevcut Ürünler ({products.length})</div>
              {products.map((prod) => (
                <div key={prod.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-12 h-12 relative bg-stone-100 rounded-xl overflow-hidden flex-shrink-0"><img src={prod.image} alt="" className="w-full h-full object-cover" /></div>
                    <div className="truncate">
                      <h4 className="font-black text-xs uppercase text-stone-900 truncate">{prod.name}</h4>
                      <p className="text-[10px] text-stone-400 font-mono">{(prod.price_cents / 100).toLocaleString('tr-TR')} TL <span className="line-through">{(prod.old_price_cents / 100).toLocaleString('tr-TR')} TL</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setEditingProduct({
                        id: prod.id, name: prod.name, price: prod.price_cents / 100, old_price: prod.old_price_cents / 100, tagline: prod.tagline, description: prod.description, image: prod.image
                      })}
                      className="bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-[11px] font-black px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                    >
                      ⚙️ Ayarlar
                    </button>
                    <button onClick={() => handleDeleteProduct(prod.id)} className="bg-red-50 text-red-500 border border-red-100 p-1.5 rounded-lg text-xs cursor-pointer">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* DÜZENLEME PENCERESİ */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative text-black">
            <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 text-stone-400 font-bold text-lg cursor-pointer">✕</button>
            <h3 className="font-black text-base uppercase">🛠️ Ürün Yapılandırma</h3>
            <form onSubmit={handleSaveProductSettings} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-400 uppercase text-[10px]">Ürün Adı</label>
                <input type="text" value={editingProduct.name} onChange={e=>setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-stone-400 uppercase text-[10px]">Satış Fiyatı (TL)</label>
                  <input type="number" value={editingProduct.price} onChange={e=>setEditingProduct({...editingProduct, price: e.target.value})} className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-400 uppercase text-[10px]">İndirimsiz Eski Fiyat (TL)</label>
                  <input type="number" value={editingProduct.old_price} onChange={e=>setEditingProduct({...editingProduct, old_price: e.target.value})} className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-stone-400 uppercase text-[10px]">Görsel Linki</label>
                <input type="text" value={editingProduct.image} onChange={e=>setEditingProduct({...editingProduct, image: e.target.value})} className="w-full p-2.5 border border-stone-200 rounded-xl bg-stone-50" />
              </div>
              <button type="submit" className="w-full bg-black text-white font-black uppercase py-3 rounded-xl text-xs mt-2 cursor-pointer">Ayarları Kaydet ✓</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}