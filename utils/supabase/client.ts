import { createBrowserClient } from '@supabase/ssr'

import { getSupabaseConfig } from '@/utils/supabase/config'

export function createClient() {
  const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig()

  return createBrowserClient(supabaseUrl, supabasePublishableKey)
}
