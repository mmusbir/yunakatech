function isPlaceholderValue(value: string) {
  return /dummy|your_|example|placeholder/i.test(value)
}

export function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabasePublishableKey =
    process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      'Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY in .env.local.'
    )
  }

  if (isPlaceholderValue(supabaseUrl)) {
    throw new Error(
      'Supabase URL is still using a placeholder value. Replace it in .env.local with your real Supabase project URL.'
    )
  }

  if (isPlaceholderValue(supabasePublishableKey)) {
    throw new Error(
      'Supabase publishable key is still using a placeholder value. Replace it in .env.local with your real Supabase project key.'
    )
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(supabaseUrl)
  } catch {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is not a valid URL. Expected a value like https://your-project.supabase.co'
    )
  }

  if (parsedUrl.protocol !== 'https:') {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must use https://')
  }

  if (!parsedUrl.hostname.endsWith('.supabase.co')) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL must point to your Supabase project host, for example https://your-project.supabase.co'
    )
  }

  return { supabaseUrl, supabasePublishableKey }
}
