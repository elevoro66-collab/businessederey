// src/components/global/TrustBar.tsx
'use client'

export function TrustBar() {
  return (
    <div className="bg-[#FAF0E6] border-b border-stone-200 py-2 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-center items-center gap-4 md:gap-10 text-[10px] md:text-xs font-bold tracking-widest uppercase text-stone-700">
        <span className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          30-Gün İade
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          Ücretsiz Kargo
        </span>
        <span className="hidden md:flex items-center gap-1.5">
          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          7/24 Destek
        </span>
        <span className="flex items-center gap-1.5 text-stone-900">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          Güvenli Ödeme
        </span>
      </div>
    </div>
  )
}