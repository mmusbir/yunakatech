import 'server-only'

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { unstable_noStore as noStore } from 'next/cache'

import { getSupabase } from '@/app/lib/supabase'

export type PricingPlanId = 'basic' | 'standard' | 'premium'

export interface PricingPlan {
  id: PricingPlanId
  name: string
  price: string
  cta: string
  accent: 'bg-white' | 'bg-[#ffd600]'
  highlighted: boolean
  features: string[]
  order: number
}

const pricingPlansFilePath = path.join(
  process.cwd(),
  'data',
  'pricing-plans.json'
)

export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Rp 5.9M',
    cta: 'Get Basic',
    accent: 'bg-white',
    highlighted: false,
    features: ['5 Pages Design', 'Mobile Responsive', 'Basic SEO Setup'],
    order: 0,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 'Rp 12.5M',
    cta: 'Get Standard',
    accent: 'bg-[#ffd600]',
    highlighted: true,
    features: [
      'Unlimited Pages',
      'CMS Integration',
      'Advanced SEO',
      'Custom Animations',
    ],
    order: 1,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'Rp 25M+',
    cta: 'Get Custom',
    accent: 'bg-white',
    highlighted: false,
    features: [
      'Custom Software Dev',
      'E-commerce Engine',
      '24/7 Priority Support',
    ],
    order: 2,
  },
]

function isMissingPricingTableError(error: { code?: string; message?: string }) {
  return (
    error.code === 'PGRST205' ||
    error.message?.includes('public.pricing_plans') === true
  )
}

function getPlanMeta(id: PricingPlanId) {
  if (id === 'standard') {
    return {
      accent: 'bg-[#ffd600]' as const,
      highlighted: true,
      order: 1,
    }
  }

  return {
    accent: 'bg-white' as const,
    highlighted: false,
    order: id === 'basic' ? 0 : 2,
  }
}

export function buildPricingCta(id: PricingPlanId, name: string) {
  if (id === 'premium') {
    return 'Get Custom'
  }

  return `Get ${name.trim() || (id === 'basic' ? 'Basic' : 'Standard')}`
}

function normalizePricingPlan(input: Partial<PricingPlan> & { id: PricingPlanId }) {
  const defaults =
    DEFAULT_PRICING_PLANS.find((plan) => plan.id === input.id) ??
    DEFAULT_PRICING_PLANS[0]
  const meta = getPlanMeta(input.id)
  const name = input.name?.trim() || defaults.name
  const features = (input.features ?? defaults.features)
    .map((feature) => feature.trim())
    .filter(Boolean)

  return {
    id: input.id,
    name,
    price: input.price?.trim() || defaults.price,
    cta: input.cta?.trim() || buildPricingCta(input.id, name),
    accent: meta.accent,
    highlighted: meta.highlighted,
    order: meta.order,
    features: features.length > 0 ? features : defaults.features,
  } satisfies PricingPlan
}

export async function readPricingPlansFile(): Promise<PricingPlan[]> {
  try {
    const fileContents = await readFile(pricingPlansFilePath, 'utf8')
    const parsed = JSON.parse(fileContents) as Array<Partial<PricingPlan>>

    return DEFAULT_PRICING_PLANS.map((plan) =>
      normalizePricingPlan({
        id: plan.id,
        ...parsed.find((entry) => entry.id === plan.id),
      })
    )
  } catch {
    return DEFAULT_PRICING_PLANS
  }
}

export async function writePricingPlansFile(plans: PricingPlan[]) {
  await mkdir(path.dirname(pricingPlansFilePath), { recursive: true })
  await writeFile(pricingPlansFilePath, JSON.stringify(plans, null, 2))
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  noStore()

  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('plan_key, name, price, cta, features, highlighted, display_order')
      .order('display_order', { ascending: true })

    if (error) {
      if (!isMissingPricingTableError(error)) {
        console.error('Supabase getPricingPlans error:', error.message)
      }

      return readPricingPlansFile()
    }

    return DEFAULT_PRICING_PLANS.map((plan) => {
      const row = data?.find((entry) => entry.plan_key === plan.id)

      return normalizePricingPlan({
        id: plan.id,
        name: row?.name,
        price: row?.price,
        cta: row?.cta,
        features: Array.isArray(row?.features) ? row.features : undefined,
      })
    })
  } catch {
    return readPricingPlansFile()
  }
}

export async function getPricingSyncStatus() {
  noStore()

  try {
    const supabase = getSupabase()
    const { error } = await supabase
      .from('pricing_plans')
      .select('plan_key')
      .limit(1)

    if (error) {
      return {
        ready: false,
        reason: isMissingPricingTableError(error)
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
