'use client'

export default function CTA() {
  return (
    <section className="bg-black py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-6 shadow-brutal">
          READY TO START YOUR PROJECT?
        </h2>
        <p className="text-xl text-white mb-8">
          Let's build something amazing together.
        </p>
        <button className="bg-red-500 text-white px-8 py-4 text-xl font-bold border-4 border-white shadow-brutal hover:shadow-brutal-lg transition-shadow">
          CONTACT US NOW
        </button>
      </div>
    </section>
  )
}