'use client'
import { useState } from 'react'
import { useCheckoutStore } from '@/store/useCheckoutStore'

export function CheckoutModal() {
  const isOpen = useCheckoutStore((s: any) => s.isOpen)
  const product = useCheckoutStore((s: any) => s.product) as any
  const bundle = useCheckoutStore((s: any) => s.bundle) as any
  const closeCheckout = useCheckoutStore((s: any) => s.closeCheckout) as any

  const [name, setName] = useState('')
  const [instagram, setInstagram] = useState('')
  const [receiptName, setReceiptName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen || !product) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!receiptName) {
      alert("Lütfen önce transfer dekontunuzun ekran görüntüsünü yükleyin patron!")
      return
    }

    setLoading(true)

    const newOrder = {
      id: `ORD-2026-${Math.floor(100 + Math.random() * 900)}`,
      customer: name,
      instagram: instagram.startsWith('@') ? instagram : `@${instagram}`,
      product: product.name,
      amount: bundle ? `${(bundle.price_cents / 100).toLocaleString('tr-TR')} ₼` : `${(product.price_cents / 100).toLocaleString('tr-TR')} ₼`,
      receipt: receiptName,
      status: "Beklemede",
      date: "Bugün - " + new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    }
    
    try {
      const existingOrders = JSON.parse(localStorage.getItem('hoodienza_orders') || '[]')
      localStorage.setItem('hoodienza_orders', JSON.stringify([newOrder, ...existingOrders]))
    } catch (err) {
      console.error(err)
    }

    setTimeout(() => {
      setLoading(false)
      setIsSuccess(true)
    }, 1200)
  }

  const handleClose = () => {
    setIsSuccess(false)
    setName('')
    setInstagram('')
    setReceiptName(null)
    closeCheckout()
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative text-black">
        
        <button 
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-black font-bold text-lg p-1 cursor-pointer z-10"
        >
          ✕
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-stone-900">SİPARİŞİ TAMAMLA</h2>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {product.name} · {bundle ? `${bundle.qty} Adet Paket` : '1 Adet'}
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1.5">
              <p className="text-xs text-stone-600 font-medium">
                Lütfen belirtilen tutarı bu IBAN adresine gönderin:
              </p>
              <p className="font-mono font-black text-xs tracking-wide text-stone-950 bg-white p-2.5 rounded-xl border border-stone-200 select-all text-center">
                TR99 0006 1000 0000 0000 0000 00
              </p>
              <p className="text-[9px] text-stone-400 font-bold uppercase text-center">
                Alıcı: ATON DIJITAL TEKNOLOJI LTD. ŞTİ.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-wider block">Adınız Soyadınız</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: Kanan Gurbanov"
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-[#A485FF] bg-stone-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-wider block">Instagram Kullanıcı Adınız</label>
              <input 
                type="text" 
                required
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Örn: qurbanoff1"
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-[#A485FF] bg-stone-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-wider block">Transfer Dekontu</label>
              
              {receiptName ? (
                <div className="border-2 border-dashed border-green-500 bg-green-50/40 p-4 rounded-2xl text-center flex justify-between items-center">
                  <span className="text-xs text-green-800 font-black truncate pr-2">
                    ✓ {receiptName}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setReceiptName(null)} 
                    className="text-[10px] text-red-600 font-black uppercase tracking-wider border border-red-200 bg-white px-2.5 py-1 rounded-lg shadow-sm hover:bg-red-50 cursor-pointer"
                  >
                    Değiştir
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-stone-300 bg-stone-50 p-5 rounded-2xl text-center block cursor-pointer hover:border-stone-400 transition-colors group">
                  <span className="text-xl block group-hover:scale-110 transition-transform">📄</span>
                  <span className="text-xs text-stone-600 font-black block mt-1 uppercase tracking-wide">Dekont Görseli Seç</span>
                  <input 
                    type="file" 
                    accept="image/*,application/pdf"
                    required
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setReceiptName(e.target.files[0].name)
                      }
                    }}
                  />
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] hover:bg-[#A485FF] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'İşleniyor...' : 'SİPARİŞI TAMAMLA'}
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-5 py-12">
            <div className="w-16 h-16 bg-green-100 text-green-600 text-3xl rounded-full flex items-center justify-center mx-auto shadow-sm">
              ✓
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-tight text-stone-900">SİPARİŞİNİZ ALINDI!</h2>
              <p className="text-xs text-stone-500 font-medium">Tebrikler, yeni bir sipariş başarıyla sisteme düştü.</p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider shadow-md transition-colors cursor-pointer"
            >
              Mağazaya Dön
            </button>
          </div>
        )}

      </div>
    </div>
  )
}