'use client'

export default function Hero() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-black mb-6 shadow-brutal">
          YUNAKA TECH
        </h1>
        <p className="text-2xl text-black mb-8 max-w-2xl mx-auto">
          Full Product & Technical Solutions for Your Business
        </p>
        <button className="bg-red-500 text-white px-8 py-4 text-xl font-bold border-4 border-black shadow-brutal hover:shadow-brutal-lg transition-shadow">
          GET STARTED
        </button>
      </div>
    </section>
  )
}