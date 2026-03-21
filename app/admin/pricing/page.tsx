import Link from 'next/link'

import AdminShell from '@/app/admin/admin-shell'
import { requireAdminUser } from '@/app/admin/lib'
import { savePricingAction } from '@/app/admin/pricing/actions'
import {
  getPricingPlans,
  getPricingSyncStatus,
  type PricingPlan,
} from '@/app/lib/pricing-settings'

export const dynamic = 'force-dynamic'

function getFlashFromSearchParams(
  status: string | string[] | undefined,
  message: string | string[] | undefined
) {
  return {
    status:
      typeof status === 'string' && (status === 'success' || status === 'error')
        ? status
        : 'idle',
    message: typeof message === 'string' ? message : '',
  } as const
}

function getFeatureSlots(plan: PricingPlan) {
  return Array.from({ length: 4 }, (_, index) => plan.features[index] ?? '')
}

export default async function AdminPricingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const user = await requireAdminUser()
  const plans = await getPricingPlans()
  const syncStatus = await getPricingSyncStatus()
  const resolvedSearchParams = await searchParams
  const flash = getFlashFromSearchParams(
    resolvedSearchParams.status,
    resolvedSearchParams.message
  )

  return (
    <AdminShell activeNav="pricing" email={user.email}>
      <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="type-display-compact mb-2 text-black">
            PRICING MANAGEMENT
          </h2>
          <div className="h-2 w-36 border-[3px] border-black bg-[#ffd600]" />
        </div>

        <button
          form="pricing-management-form"
          type="submit"
          className="w-full border-[3px] border-black bg-[#ffd600] px-6 py-3 text-base font-black uppercase tracking-[-0.05em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:w-auto"
        >
          UPDATE PRICES
        </button>
      </section>

      {!syncStatus.ready ? (
        <div className="mb-6 border-[3px] border-black bg-[#ffdad6] p-4 text-xs font-black uppercase tracking-[0.06em] text-[#93000a]">
          {syncStatus.reason === 'missing_table'
            ? 'Table public.pricing_plans belum ada di Supabase. Pricing tetap tersimpan lokal, tapi untuk sinkronisasi database kamu perlu jalankan SQL di database/supabase-bootstrap.sql.'
            : 'Supabase sync untuk pricing belum aktif penuh. Perubahan tetap tersimpan lokal sampai koneksi server-side siap.'}
        </div>
      ) : null}

      {flash.message ? (
        <div
          className={`mb-6 border-[3px] p-3 text-xs font-black uppercase tracking-[0.08em] ${
            flash.status === 'success'
              ? 'border-black bg-[#ffd600] text-black'
              : 'border-black bg-[#ffdad6] text-[#93000a]'
          }`}
        >
          {flash.message}
        </div>
      ) : null}

      <form
        id="pricing-management-form"
        action={savePricingAction}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.id}
              className={`relative flex flex-col gap-5 overflow-hidden border-[3px] border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${
                plan.highlighted ? 'bg-[#ffd600]' : 'bg-white'
              }`}
            >
              {plan.highlighted ? (
                <div className="absolute left-0 top-0 h-2 w-full bg-black" />
              ) : null}

              <div className="absolute -right-6 -top-1 rotate-12 bg-black px-6 py-4 text-[10px] font-black uppercase text-white">
                {`TIER 0${index + 1}`}
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-black/70">
                  PACKAGE NAME
                </label>
                <input
                  className="w-full border-[3px] border-black bg-white p-3 text-xl font-black uppercase tracking-[-0.05em] outline-none transition-colors focus:bg-[#ffe170]"
                  defaultValue={plan.name}
                  name={`${plan.id}_name`}
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-black/70">
                  PRICE
                </label>
                <input
                  className="w-full border-[3px] border-black bg-white p-3 text-2xl font-black tracking-[-0.05em] outline-none transition-colors focus:bg-[#ffe170]"
                  defaultValue={plan.price}
                  name={`${plan.id}_price`}
                  type="text"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-black/70">
                  FEATURES LIST
                </label>
                <div className="space-y-3">
                  {getFeatureSlots(plan).map((feature, featureIndex) => (
                    <input
                      key={`${plan.id}-${featureIndex}`}
                      className="w-full border-[3px] border-black bg-white p-2.5 text-xs font-bold uppercase outline-none transition-colors focus:bg-[#ffe170]"
                      defaultValue={feature}
                      name={`${plan.id}_feature_${featureIndex}`}
                      placeholder={`Feature ${featureIndex + 1}`}
                      type="text"
                    />
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-black/60">
                  Kosongkan baris feature untuk menghapus item yang tidak perlu.
                </p>
              </div>
            </article>
          ))}
        </div>
      </form>

      <footer className="mt-12 flex flex-col gap-4 border-t-[3px] border-black pt-6 text-[10px] font-black uppercase tracking-[0.18em] md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#705d00]" />
            PRICE MATRIX ARMED
          </div>
          <div className="flex items-center gap-2 opacity-50">
            <span className="h-2 w-2 bg-black" />
            SYNC READY: 12:44:01 GMT
          </div>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-8">
          <Link href="/admin" className="hover:underline">
            PORTFOLIO GRID
          </Link>
          <Link href="/portfolio" className="hover:underline">
            PUBLIC PRICING
          </Link>
          <Link href="/login" className="hover:underline">
            SECURITY LOGS
          </Link>
        </div>
      </footer>
    </AdminShell>
  )
}
