'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit to API
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      alert('Message sent!')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }
  }

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-12 text-center shadow-brutal">
          CONTACT US
        </h2>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-8 border-4 border-black shadow-brutal">
          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border-2 border-black bg-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border-2 border-black bg-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 border-2 border-black bg-white"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black font-bold mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-3 border-2 border-black bg-white h-32"
              required
            />
          </div>
          <button type="submit" className="w-full bg-red-500 text-white py-4 font-bold border-4 border-black shadow-brutal">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  )
}