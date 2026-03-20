import AdminShell from '@/app/admin/admin-shell'
import { requireAdminUser } from '@/app/admin/lib'
import type { SettingsActionState } from '@/app/admin/settings/actions'
import SettingsForm from '@/app/admin/settings/settings-form'
import {
  getSiteSettings,
  getSiteSettingsSyncStatus,
} from '@/app/lib/site-settings'

export const dynamic = 'force-dynamic'

function getFlashFromSearchParams(
  status: string | string[] | undefined,
  message: string | string[] | undefined
): SettingsActionState {
  const normalizedStatus =
    typeof status === 'string' && (status === 'success' || status === 'error')
      ? status
      : 'idle'
  const normalizedMessage = typeof message === 'string' ? message : ''

  return {
    status: normalizedStatus,
    message: normalizedMessage,
  }
}

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const user = await requireAdminUser()
  const settings = await getSiteSettings()
  const syncStatus = await getSiteSettingsSyncStatus()
  const resolvedSearchParams = await searchParams
  const flash = getFlashFromSearchParams(
    resolvedSearchParams.status,
    resolvedSearchParams.message
  )

  return (
    <AdminShell activeNav="settings" email={user.email}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="mb-2 text-5xl font-black uppercase tracking-[-0.08em] leading-none md:text-6xl">
            GENERAL SETTINGS
          </h2>
          <div className="h-2 w-32 border-[3px] border-black bg-[#ffd600]" />
        </div>

        {!syncStatus.ready ? (
          <div className="mb-8 border-[3px] border-black bg-[#ffdad6] p-5 text-sm font-black uppercase tracking-[0.08em] text-[#93000a]">
            {syncStatus.reason === 'missing_table'
              ? 'Table public.site_settings belum ada di Supabase. Settings tetap tersimpan lokal, tapi untuk mengaktifkan sinkronisasi database kamu perlu jalankan SQL di `database/supabase-bootstrap.sql` lewat Supabase SQL Editor.'
              : 'Supabase sync belum aktif penuh. Settings tetap tersimpan lokal sampai koneksi server-side ke Supabase siap.'}
          </div>
        ) : null}

        <SettingsForm initialSettings={settings} flash={flash} />

        <div className="mt-20 grid grid-cols-1 gap-4 border-t-[3px] border-black pt-8 opacity-30 md:grid-cols-4 md:gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.2em]">
            SYSTEM_REF: 882-00X
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em]">
            DEPLOYMENT: CLOUD_STABLE
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] md:text-center">
            CORE_VERSION: 4.2.0
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] md:text-right">
            LOC: US-EAST-1
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
