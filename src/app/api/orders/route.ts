import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/admin'; // Yeni fonksiyonumuzu çağırıyoruz

export async function GET() {
  try {
    // Supabase bağlantısını tam şu an (istek anında) kuruyoruz, derleme anında değil!
    const supabase = getAdminClient();
    
    // Burası senin mevcut sipariş çekme kodların olarak kalacak (Örnek):
    const { data, error } = await supabase.from('orders').select('*');
    if (error) return NextResponse.json({ errors: [error.message] }, { status: 500 });
    
    return NextResponse.json(data || []);
  } catch (err: any) {
    // Eğer env varlar yoksa canlı sitede kontrollü hata fırlatacak, build'i baltalamayacak
    return NextResponse.json({ errors: [err.message] }, { status: 500 });
  }
}

// Eğer POST fonksiyonun da varsa onun da içine "const supabase = getAdminClient();" ekleyebilirsin.