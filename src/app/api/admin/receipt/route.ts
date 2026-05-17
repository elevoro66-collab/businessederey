import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/admin'; // Zırhlı yeni fonksiyonumuz

export async function GET(req: NextRequest) {
  try {
    // Supabase bağlantısını istek anında kuruyoruz (Build sırasında çökmeyi önler)
    const supabase = getAdminClient();

    // Veri tabanından dekont/makbuz verilerini çekiyoruz
    const { data, error } = await supabase
      .from('receipts') 
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ errors: [error.message] }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ errors: [err.message] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getAdminClient();
    const body = await req.json();

    const { data, error } = await supabase
      .from('receipts')
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ errors: [error.message] }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ errors: [err.message] }, { status: 500 });
  }
}