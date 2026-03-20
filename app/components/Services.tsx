'use client'

export default function Services() {
  const services = [
    { title: 'Web Development', description: 'Custom websites and web applications' },
    { title: 'Mobile Apps', description: 'iOS and Android app development' },
    { title: 'Cloud Solutions', description: 'Scalable cloud infrastructure' },
    { title: 'Consulting', description: 'Technical consulting and strategy' }
  ]

  return (
    <section className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-12 text-center shadow-brutal">
          OUR SERVICES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 border-4 border-black shadow-brutal">
              <h3 className="text-xl font-bold text-black mb-4">{service.title}</h3>
              <p className="text-black">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}