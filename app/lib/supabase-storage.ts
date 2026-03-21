import 'server-only'

import { getSupabase } from '@/app/lib/supabase'

const PORTFOLIO_BUCKET = 'portfolio-images'
const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4MB

export async function uploadPortfolioImageToSupabase(
  file: File | null,
  previousPath: string | null
): Promise<string | null> {
  if (!file || file.size === 0) {
    return previousPath
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Image project maksimal 4MB.')
  }

  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    throw new Error('Image project harus berformat PNG, JPG, atau WEBP.')
  }

  try {
    const supabase = getSupabase()

    // Hapus previous image jika ada
    if (previousPath) {
      await deletePortfolioImageFromSupabase(previousPath)
    }

    // Generate unique filename
    const ext = file.type === 'image/png' ? 'png' : 
                file.type === 'image/webp' ? 'webp' : 'jpg'
    const fileName = `portfolio-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from(PORTFOLIO_BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Supabase upload error:', error)
      throw new Error(`Upload gagal: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(PORTFOLIO_BUCKET)
      .getPublicUrl(fileName)

    return urlData?.publicUrl || null
  } catch (error) {
    console.error('Portfolio image upload error:', error)
    throw error instanceof Error 
      ? error 
      : new Error('Upload image project gagal diproses.')
  }
}

export async function deletePortfolioImageFromSupabase(
  imageUrl: string | null
) {
  if (!imageUrl || !imageUrl.includes(PORTFOLIO_BUCKET)) {
    return
  }

  try {
    const supabase = getSupabase()
    
    // Extract filename from public URL
    const urlParts = imageUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]

    if (!fileName) return

    const { error } = await supabase.storage
      .from(PORTFOLIO_BUCKET)
      .remove([fileName])

    if (error) {
      console.error('Supabase delete error:', error)
      // Jangan throw error, cukup log
    }
  } catch (error) {
    console.error('Portfolio image delete error:', error)
    // Jangan throw error, cukup log
  }
}

export function getPortfolioImageUrl(fileName: string): string {
  const supabase = getSupabase()
  const { data } = supabase.storage
    .from(PORTFOLIO_BUCKET)
    .getPublicUrl(fileName)

  return data?.publicUrl || ''
}

export async function ensurePortfolioBucketExists() {
  try {
    const supabase = getSupabase()
    
    // Check if bucket exists by trying to list files
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return
    }

    const bucketExists = buckets?.some(b => b.name === PORTFOLIO_BUCKET)
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket(PORTFOLIO_BUCKET, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
        fileSizeLimit: MAX_FILE_SIZE,
      })

      if (createError) {
        console.error('Error creating portfolio bucket:', createError)
      }
    }
  } catch (error) {
    console.error('Portfolio bucket setup error:', error)
  }
}
