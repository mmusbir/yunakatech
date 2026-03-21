'use server'

import { redirect } from 'next/navigation'

import { requireAdminUser } from '@/app/admin/lib'
import {
  buildPricingCta,
  DEFAULT_PRICING_PLANS,
  type PricingPlan,
  type PricingPlanId,
  writePricingPlansFile,
} from '@/app/lib/pricing-settings'
import { getSupabase } from '@/app/lib/supabase'

function isMissingPricingTableError(error: { code?: string; message?: string }) {
  return (
    error.code === 'PGRST205' ||
    error.message?.includes('public.pricing_plans') === true
  )
}

function getFeatureValues(formData: FormData, planId: PricingPlanId) {
  return Array.from({ length: 4 }, (_, index) =>
    String(formData.get(`${planId}_feature_${index}`) ?? '').trim()
  ).filter(Boolean)
}

function buildPlanFromFormData(formData: FormData, planId: PricingPlanId): PricingPlan {
  const defaults =
    DEFAULT_PRICING_PLANS.find((plan) => plan.id === planId) ??
    DEFAULT_PRICING_PLANS[0]
  const name = String(formData.get(`${planId}_name`) ?? '').trim() || defaults.name
  const price =
    String(formData.get(`${planId}_price`) ?? '').trim() || defaults.price
  const features = getFeatureValues(formData, planId)

  return {
    ...defaults,
    name,
    price,
    cta: buildPricingCta(planId, name),
    features: features.length > 0 ? features : defaults.features,
  }
}

export async function savePricingAction(formData: FormData): Promise<void> {
  await requireAdminUser()

  const plans = (['basic', 'standard', 'premium'] as PricingPlanId[]).map((id) =>
    buildPlanFromFormData(formData, id)
  )

  if (plans.some((plan) => !plan.name.trim())) {
    redirect('/admin/pricing?status=error&message=Nama%20paket%20wajib%20diisi.')
  }

  if (plans.some((plan) => !plan.price.trim())) {
    redirect('/admin/pricing?status=error&message=Harga%20paket%20wajib%20diisi.')
  }

  try {
    await writePricingPlansFile(plans)
  } catch (error) {
    console.error('Local pricing plans file write error:', error)
    redirect(
      '/admin/pricing?status=error&message=Gagal%20menyimpan%20pricing%20ke%20file%20lokal.'
    )
  }

  const supabase = getSupabase()

  const { error } = await supabase.from('pricing_plans').upsert(
    plans.map((plan) => ({
      plan_key: plan.id,
      name: plan.name,
      price: plan.price,
      cta: plan.cta,
      features: plan.features,
      highlighted: plan.highlighted,
      display_order: plan.order,
      updated_at: new Date().toISOString(),
    })),
    {
      onConflict: 'plan_key',
    }
  )

  if (error) {
    if (isMissingPricingTableError(error)) {
      redirect(
        '/admin/pricing?status=success&message=Pricing%20disimpan%20ke%20file%20lokal.%20Jalankan%20SQL%20bootstrap%20terbaru%20untuk%20sinkronisasi%20Supabase.'
      )
    }

    console.error('Supabase pricing_plans upsert error:', error.message)
    redirect(
      '/admin/pricing?status=success&message=Pricing%20disimpan%20ke%20file%20lokal.%20Supabase%20belum%20berhasil%20sinkron.'
    )
  }

  redirect(
    '/admin/pricing?status=success&message=Pricing%20berhasil%20disimpan%20dan%20langsung%20dipakai%20di%20halaman%20depan.'
  )
}
