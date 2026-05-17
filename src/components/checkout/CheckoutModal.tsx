'use client'
import { useState } from 'react'

export default function CheckoutModal({ isOpen, onClose, cartItems, clearCart }: any) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !city || !address) {
      alert('Lütfen tüm alanları doldurun patron!')
      return
    }

    setIsSubmitting(true)

    // Sepetteki ilk ürünü ana ürün olarak alıyoruz (veya sepet özetini çıkartıyoruz)
    const mainItem = cartItems[0]
    const totalPriceCents = cartItems.reduce((t: number, item: any) => t + (item.bundle?.price_cents || item.price_cents) * item.quantity, 0)

    const orderData = {
      customer_name: name,
      customer_phone: phone,
      city: city,
      address: address,
      product_name: mainItem ? `${mainItem.name} (${mainItem.bundle?.label || 'Standart'})` : 'Mağaza Ürünü',
      price_cents: totalPriceCents,
      status: 'BEKLEYEN', // İlk başta aktif sipariş havuzuna düşmesi için
    }

    try {
      // 🌍 LOCAL STORAGE YERİNE GERÇEK İNTERNET API'MİZE POST ATIYORUZ
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      if (res.ok) {
        setIsSuccess(true)
        clearCart() // Sepeti temizle
      } else {
        alert('Sipariş gönderilirken bir hata oluştu, lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error('Sipariş hatası:', error)
      alert('Bağlantı hatası oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-stone-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-stone-100 text-black">
        
        {!isSuccess ? (
          <>
            <h2 className="text-lg font-black uppercase tracking-tight text-stone-900 border-b pb-3 mb-4">Siparişi Onayla 📦</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Adınız Soyadınız</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3 text-xs bg-stone-50 focus:outline-none focus:border-blue-600" placeholder="Ahmet Yılmaz" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Telefon Numaranız</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3 text-xs bg-stone-50 focus:outline-none focus:border-blue-600" placeholder="0555 XXX XX XX" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Şehir</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3 text-xs bg-stone-50 focus:outline-none focus:border-blue-600" placeholder="İstanbul" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-stone-400 mb-1">Adres Detayı</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border border-stone-200 rounded-xl p-3 text-xs bg-stone-50 focus:outline-none focus:border-blue-600" placeholder="Mahalle, Sokak No..." />
                </div>
              </div>
              
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={onClose} className="w-1/3 border border-stone-200 py-3 rounded-xl font-bold text-xs cursor-pointer">İptal</button>
                <button type="submit" disabled={isSubmitting} className="w-2/3 bg-blue-600 text-white py-3 rounded-xl font-black uppercase text-xs cursor-pointer shadow-lg disabled:opacity-50">
                  {isSubmitting ? 'Gönderiliyor...' : 'Kapıda Ödemeli Siparişi Tamamla'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="text-4xl">🎉</div>
            <h2 className="text-xl font-black uppercase text-green-600">Sipariş Alındı!</h2>
            <p className="text-stone-500 text-xs px-4">Siber dükkanımızdan verdiğiniz sipariş başarıyla bulut merkezine ulaştı patron.</p>
            <button onClick={onClose} className="mt-4 bg-stone-900 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer">Kapat</button>
          </div>
        )}
      </div>
    </div>
  )
}