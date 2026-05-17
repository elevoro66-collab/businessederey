import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CheckoutModal } from '@/components/checkout/CheckoutModal'
import Link from 'next/link'

export const metadata = {
  title: 'Hoodienza | Premium Comfort Essentials',
  description: 'Silence the World, Embrace Comfort',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-white text-black antialiased">
        <ThemeProvider>
          {/* Üst Duyuru Barı */}
          <div className="bg-stone-100 text-stone-800 text-center py-2 text-[10px] font-bold tracking-widest uppercase border-b border-stone-200">
            Bugüne Özel Tüm Siparişlerde Ücretsiz Kargo
          </div>

          {/* Lüks Navigasyon Menüsü */}
          <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-black tracking-tight uppercase">
                Hoodienza<span className="text-stone-400 font-normal text-xs">™</span>
              </Link>
              
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-600">
                <Link href="/" className="hover:text-black transition">
                  Koleksiyon
                </Link>
              </div>
            </div>
          </nav>

          {children}

          <CheckoutModal />

          <footer className="border-t border-stone-100 bg-stone-50 py-12 px-6 mt-24">
            <div className="max-w-6xl mx-auto text-center space-y-2">
              <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                VOGUE · GQ · HYPEBEAST · ESQUIRE
              </p>
              <p className="text-[10px] text-stone-400">
                © 2026 Hoodienza™. Tüm hakları saklıdır.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}