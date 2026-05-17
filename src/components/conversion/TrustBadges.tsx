// src/components/conversion/TrustBadges.tsx
export function TrustBadges() {
  return (
    <div className="grid grid-cols-3 gap-2 py-6 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-t border-stone-200 text-center">
      <div className="flex flex-col items-center gap-1">
        <span>🚚 Ücretsiz Kargo</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span>🔄 30 Gün İade</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span>🔒 Güvenli Ödeme</span>
      </div>
    </div>
  )
}