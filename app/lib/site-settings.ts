import 'server-only'

import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { unstable_noStore as noStore } from 'next/cache'

import { getSupabase } from '@/app/lib/supabase'

export interface SiteSettings {
  siteTitle: string
  siteDescription: string
  whatsappNumber: string
  logoText: string
  logoTextItalic: boolean
  hideLogoText: boolean
  logoImagePath: string | null
  faviconPath: string | null
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: 'Yunaka Tech - Full Product & Technical Solutions',
  siteDescription:
    'Leading provider of innovative tech solutions, portfolio management, and expert services.',
  whatsappNumber: '6281234567890',
  logoText: 'YUNAKA TECH',
  logoTextItalic: false,
  hideLogoText: false,
  logoImagePath: null,
  faviconPath: null,
}

const siteSettingsFilePath = path.join(
  process.cwd(),
  'data',
  'site-settings.json'
)
const siteUploadsDir = path.join(process.cwd(), 'public', 'uploads', 'site')

function isMissingTableError(error: { code?: string; message?: string }) {
  return (
    error.code === 'PGRST205' ||
    error.message?.includes("public.site_settings") === true
  )
}

export function normalizeWhatsappNumber(value: string) {
  return value.replace(/\D/g, '')
}

export function buildWhatsappHref(whatsappNumber: string) {
  return `https://wa.me/${normalizeWhatsappNumber(whatsappNumber)}`
}

export async function readSiteSettingsFile(): Promise<SiteSettings> {
  try {
    const fileContents = await readFile(siteSettingsFilePath, 'utf8')
    const parsed = JSON.parse(fileContents) as Partial<SiteSettings>

    return {
      siteTitle: parsed.siteTitle || DEFAULT_SITE_SETTINGS.siteTitle,
      siteDescription:
        parsed.siteDescription || DEFAULT_SITE_SETTINGS.siteDescription,
      whatsappNumber:
        parsed.whatsappNumber || DEFAULT_SITE_SETTINGS.whatsappNumber,
      logoText: parsed.logoText || DEFAULT_SITE_SETTINGS.logoText,
      logoTextItalic:
        typeof parsed.logoTextItalic === 'boolean'
          ? parsed.logoTextItalic
          : DEFAULT_SITE_SETTINGS.logoTextItalic,
      hideLogoText:
        typeof parsed.hideLogoText === 'boolean'
          ? parsed.hideLogoText
          : DEFAULT_SITE_SETTINGS.hideLogoText,
      logoImagePath:
        typeof parsed.logoImagePath === 'string' ? parsed.logoImagePath : null,
      faviconPath:
        typeof parsed.faviconPath === 'string' ? parsed.faviconPath : null,
    }
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}

export async function writeSiteSettingsFile(settings: SiteSettings) {
  await mkdir(path.dirname(siteSettingsFilePath), { recursive: true })
  await writeFile(siteSettingsFilePath, JSON.stringify(settings, null, 2))
}

function getPublicAssetPath(fileName: string) {
  return `/uploads/site/${fileName}`
}

function getAbsoluteAssetPath(publicPath: string) {
  return path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''))
}

async function deleteAssetIfPresent(publicPath: string | null) {
  if (!publicPath?.startsWith('/uploads/site/')) {
    return
  }

  try {
    await unlink(getAbsoluteAssetPath(publicPath))
  } catch {
    // Ignore missing files.
  }
}

export async function saveUploadedAsset(
  file: File | null,
  kind: 'logo' | 'favicon',
  previousPath: string | null
) {
  if (!file || file.size === 0) {
    return previousPath
  }

  const maxSize = kind === 'favicon' ? 1024 * 1024 : 2 * 1024 * 1024
  if (file.size > maxSize) {
    throw new Error(
      kind === 'favicon'
        ? 'Favicon maksimal 1MB.'
        : 'Logo image maksimal 2MB.'
    )
  }

  const allowedTypes =
    kind === 'favicon'
      ? ['image/png', 'image/x-icon', 'image/vnd.microsoft.icon']
      : ['image/png', 'image/jpeg']

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      kind === 'favicon'
        ? 'Favicon harus berformat PNG atau ICO.'
        : 'Logo harus berformat PNG atau JPG.'
    )
  }

  const extension =
    file.type === 'image/png'
      ? 'png'
      : file.type === 'image/jpeg'
        ? 'jpg'
        : 'ico'

  await mkdir(siteUploadsDir, { recursive: true })
  await deleteAssetIfPresent(previousPath)

  const fileName = `${kind}-${Date.now()}.${extension}`
  const publicPath = getPublicAssetPath(fileName)
  const absolutePath = getAbsoluteAssetPath(publicPath)
  const buffer = Buffer.from(await file.arrayBuffer())

  await writeFile(absolutePath, buffer)

  return publicPath
}

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore()

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('site_settings')
    .select(
      'site_title, site_description, whatsapp_number, logo_text, logo_text_italic, hide_logo_text, logo_image_path, favicon_path'
    )
    .eq('id', 1)
    .maybeSingle()

  if (error) {
    if (!isMissingTableError(error)) {
      console.error('Supabase getSiteSettings error:', error.message)
    }

    return readSiteSettingsFile()
  }

  return {
    siteTitle: data?.site_title || DEFAULT_SITE_SETTINGS.siteTitle,
    siteDescription:
      data?.site_description || DEFAULT_SITE_SETTINGS.siteDescription,
    whatsappNumber:
      data?.whatsapp_number || DEFAULT_SITE_SETTINGS.whatsappNumber,
    logoText: data?.logo_text || DEFAULT_SITE_SETTINGS.logoText,
    logoTextItalic:
      data?.logo_text_italic ?? DEFAULT_SITE_SETTINGS.logoTextItalic,
    hideLogoText: data?.hide_logo_text ?? DEFAULT_SITE_SETTINGS.hideLogoText,
    logoImagePath: data?.logo_image_path || null,
    faviconPath: data?.favicon_path || null,
  }
}

export async function getSiteSettingsSyncStatus() {
  noStore()

  try {
    const supabase = getSupabase()
    const { error } = await supabase.from('site_settings').select('id').limit(1)

    if (error) {
      return {
        ready: false,
        reason: isMissingTableError(error)
          ? 'missing_table'
          : 'supabase_unavailable',
      } as const
    }

    return {
      ready: true,
      reason: 'ok',
    } as const
  } catch {
    return {
      ready: false,
      reason: 'missing_env',
    } as const
  }
}
