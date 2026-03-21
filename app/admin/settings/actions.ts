'use server'

import { redirect } from 'next/navigation'

import {
  getSiteSettings,
  normalizeUiDensity,
  normalizeWhatsappNumber,
  saveUploadedAsset,
  writeSiteSettingsFile,
} from '@/app/lib/site-settings'
import { getSupabase } from '@/app/lib/supabase'
import { requireAdminUser } from '@/app/admin/lib'

export interface SettingsActionState {
  status: 'idle' | 'success' | 'error'
  message: string
}

function isMissingTableError(error: { code?: string; message?: string }) {
  return (
    error.code === 'PGRST205' ||
    error.message?.includes("public.site_settings") === true ||
    error.message?.includes('ui_density') === true
  )
}

export async function saveSettingsAction(
  formData: FormData
): Promise<void> {
  await requireAdminUser()
  const currentSettings = await getSiteSettings()

  const siteTitle = String(formData.get('siteTitle') ?? '').trim()
  const siteDescription = String(formData.get('siteDescription') ?? '').trim()
  const logoText = String(formData.get('logoText') ?? '').trim()
  const logoTextItalic = formData.get('logoTextItalic') === 'on'
  const hideLogoText = formData.get('hideLogoText') === 'on'
  const uiDensity = normalizeUiDensity(String(formData.get('uiDensity') ?? ''))
  const whatsappNumber = normalizeWhatsappNumber(
    String(formData.get('whatsappNumber') ?? '')
  )
  const logoImage = formData.get('logoImage')
  const favicon = formData.get('favicon')

  if (!siteTitle) {
    redirect('/admin/settings?status=error&message=Site%20title%20wajib%20diisi.')
  }

  if (!siteDescription) {
    redirect(
      '/admin/settings?status=error&message=Site%20description%20wajib%20diisi.'
    )
  }

  if (!whatsappNumber) {
    redirect(
      '/admin/settings?status=error&message=WhatsApp%20number%20wajib%20diisi.'
    )
  }

  if (!logoText) {
    redirect('/admin/settings?status=error&message=Logo%20text%20wajib%20diisi.')
  }

  let logoImagePath = currentSettings.logoImagePath
  let faviconPath = currentSettings.faviconPath

  try {
    logoImagePath = await saveUploadedAsset(
      logoImage instanceof File ? logoImage : null,
      'logo',
      currentSettings.logoImagePath
    )
    faviconPath = await saveUploadedAsset(
      favicon instanceof File ? favicon : null,
      'favicon',
      currentSettings.faviconPath
    )
  } catch (uploadError) {
    const message =
      uploadError instanceof Error
        ? uploadError.message
        : 'Upload asset gagal diproses.'

    redirect(
      `/admin/settings?status=error&message=${encodeURIComponent(message)}`
    )
  }

  const nextSettings = {
    siteTitle,
    siteDescription,
    whatsappNumber,
    uiDensity,
    logoText,
    logoTextItalic,
    hideLogoText,
    logoImagePath,
    faviconPath,
  }

  try {
    await writeSiteSettingsFile(nextSettings)
  } catch (fileError) {
    console.error('Local site settings file write error:', fileError)
    redirect(
      '/admin/settings?status=error&message=Gagal%20menyimpan%20pengaturan%20ke%20file%20lokal.'
    )
  }

  const supabase = getSupabase()

  const { error } = await supabase.from('site_settings').upsert(
    {
      id: 1,
      site_title: nextSettings.siteTitle,
      site_description: nextSettings.siteDescription,
      whatsapp_number: nextSettings.whatsappNumber,
      ui_density: nextSettings.uiDensity,
      logo_text: nextSettings.logoText,
      logo_text_italic: nextSettings.logoTextItalic,
      hide_logo_text: nextSettings.hideLogoText,
      logo_image_path: nextSettings.logoImagePath,
      favicon_path: nextSettings.faviconPath,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'id',
    }
  )

  if (error) {
    if (isMissingTableError(error)) {
      const message = isMissingTableError(error)
        ? 'Pengaturan disimpan ke file lokal. Jalankan SQL bootstrap terbaru bila ingin memindahkannya ke Supabase.'
        : 'Supabase belum merespons, jadi pengaturan disimpan ke file lokal untuk sementara.'

      redirect(
        `/admin/settings?status=success&message=${encodeURIComponent(message)}`
      )
    }

    console.error('Supabase site_settings upsert error:', error.message)

    redirect(
      '/admin/settings?status=success&message=Pengaturan%20disimpan%20ke%20file%20lokal.%20Supabase%20belum%20berhasil%20sinkron.'
    )
  }

  redirect(
    '/admin/settings?status=success&message=Pengaturan%20berhasil%20disimpan%20dan%20langsung%20dipakai%20oleh%20situs.'
  )
}
