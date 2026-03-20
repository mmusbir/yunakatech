import Link from 'next/link'

import AdminShell from '@/app/admin/admin-shell'
import { requireAdminUser } from '@/app/admin/lib'

const pricingTiers = [
  {
    id: 'TIER 01',
    name: 'BASIC',
    price: '29.00',
    accent: 'bg-white',
    labelClass: 'text-gray-500',
    inputClass:
      'w-full border-[3px] border-black p-4 font-black uppercase tracking-[-0.05em] text-2xl outline-none transition-colors focus:bg-[#ffd600]',
    priceInputClass:
      'w-full border-[3px] border-black p-4 pl-10 font-black text-3xl outline-none transition-colors focus:bg-[#ffd600]',
    featureInputClass:
      'flex-1 border-[3px] border-black p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]',
    buttonClass:
      'w-full border-2 border-dashed border-black p-3 text-xs font-bold uppercase transition-colors hover:bg-gray-50',
    deleteClass: 'text-[#c0000a]',
    features: [
      '5 Users Included',
      'Basic Analytics',
      'Community Support',
    ],
  },
  {
    id: 'TIER 02',
    name: 'STANDARD',
    price: '79.00',
    accent: 'bg-[#ffd600]',
    labelClass: 'text-black',
    inputClass:
      'w-full border-[3px] border-black bg-white p-4 font-black uppercase tracking-[-0.05em] text-2xl outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,0,0,1)]',
    priceInputClass:
      'w-full border-[3px] border-black bg-white p-4 pl-10 font-black text-3xl outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,0,0,1)]',
    featureInputClass:
      'flex-1 border-[3px] border-black bg-white p-3 text-sm font-bold outline-none transition-shadow focus:shadow-[0_0_0_4px_rgba(0,0,0,1)]',
    buttonClass:
      'w-full border-2 border-dashed border-black p-3 text-xs font-bold uppercase transition-colors hover:bg-white/50',
    deleteClass: 'text-black',
    features: [
      '25 Users Included',
      'Advanced Analytics',
      'Priority Support',
      'Custom API Access',
    ],
  },
  {
    id: 'TIER 03',
    name: 'PREMIUM',
    price: '199.00',
    accent: 'bg-white',
    labelClass: 'text-gray-500',
    inputClass:
      'w-full border-[3px] border-black p-4 font-black uppercase tracking-[-0.05em] text-2xl outline-none transition-colors focus:bg-[#ffd600]',
    priceInputClass:
      'w-full border-[3px] border-black p-4 pl-10 font-black text-3xl outline-none transition-colors focus:bg-[#ffd600]',
    featureInputClass:
      'flex-1 border-[3px] border-black p-3 text-sm font-bold outline-none transition-colors focus:bg-[#ffd600]',
    buttonClass:
      'w-full border-2 border-dashed border-black p-3 text-xs font-bold uppercase transition-colors hover:bg-gray-50',
    deleteClass: 'text-[#c0000a]',
    features: [
      'Unlimited Users',
      'Predictive AI Tools',
      'Dedicated Account Manager',
      'Enterprise SLA',
    ],
  },
] as const

export const dynamic = 'force-dynamic'

export default async function AdminPricingPage() {
  const user = await requireAdminUser()

  return (
    <AdminShell activeNav="pricing" email={user.email}>
      <section className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="mb-2 text-5xl font-black uppercase tracking-[-0.08em] leading-none md:text-6xl">
            PRICING MANAGEMENT
          </h2>
          <div className="h-2 w-48 border-[3px] border-black bg-[#ffd600]" />
        </div>

        <button
          type="button"
          className="w-full border-[3px] border-black bg-[#ffd600] px-8 py-4 text-xl font-black uppercase tracking-[-0.05em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:w-auto"
        >
          UPDATE PRICES
        </button>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <article
            key={tier.id}
            className={`relative flex flex-col gap-6 overflow-hidden border-[3px] border-black p-8 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] ${tier.accent}`}
          >
            {index === 1 ? (
              <div className="absolute left-0 top-0 h-2 w-full bg-black" />
            ) : null}

            <div className="absolute -right-6 -top-1 rotate-12 bg-black px-8 py-6 text-xs font-black uppercase text-white">
              {tier.id}
            </div>

            <div className="space-y-2">
              <label
                className={`block text-xs font-black uppercase tracking-[0.25em] ${tier.labelClass}`}
              >
                PACKAGE NAME
              </label>
              <input
                className={tier.inputClass}
                defaultValue={tier.name}
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label
                className={`block text-xs font-black uppercase tracking-[0.25em] ${tier.labelClass}`}
              >
                MONTHLY PRICE ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black">
                  $
                </span>
                <input
                  className={tier.priceInputClass}
                  defaultValue={tier.price}
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <label
                className={`block text-xs font-black uppercase tracking-[0.25em] ${tier.labelClass}`}
              >
                FEATURES LIST
              </label>
              <div className="space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <input
                      className={tier.featureInputClass}
                      defaultValue={feature}
                      type="text"
                    />
                    <button
                      type="button"
                      className={`text-sm font-black uppercase ${tier.deleteClass}`}
                    >
                      DELETE
                    </button>
                  </div>
                ))}

                <button type="button" className={tier.buttonClass}>
                  + ADD FEATURE
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-20 flex flex-col gap-6 border-t-[3px] border-black pt-8 text-[10px] font-black uppercase tracking-[0.2em] md:flex-row md:items-center md:justify-between">
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

      <button
        type="button"
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center border-[3px] border-black bg-black text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        SY
      </button>
    </AdminShell>
  )
}
