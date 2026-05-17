import { createClient } from '@supabase/supabase-js';

export function getAdminClient() {
  // Eğer Netlify derleme yapıyorsa ve env varlar yoksa site çökmesin diye sahte/dummy adresler tanımlıyoruz
  const url = process.env.SUPABASE_URL || 'https://dummy-project-placeholder.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key-placeholder';

  return createClient(url, key);
}