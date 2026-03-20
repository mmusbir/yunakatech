'use client'

export default function Pricing() {
  const packages = [
    { name: 'Basic', price: '$999', features: ['Website', 'Basic Support', '1 Month Maintenance'] },
    { name: 'Pro', price: '$2499', features: ['Full App', 'Priority Support', '3 Months Maintenance'] },
    { name: 'Enterprise', price: 'Custom', features: ['Everything', 'Dedicated Team', 'Ongoing Support'] }
  ]

  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-12 text-center shadow-brutal">
          PRICING
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-white p-6 border-4 border-black shadow-brutal text-center">
              <h3 className="text-2xl font-bold text-black mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-red-500 mb-6">{pkg.price}</p>
              <ul className="text-black mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="mb-2">{feature}</li>
                ))}
              </ul>
              <button className="bg-black text-white px-6 py-3 font-bold border-2 border-black shadow-brutal">
                CHOOSE PLAN
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}