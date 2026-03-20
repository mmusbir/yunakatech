'use client'

import { useActionState } from 'react'

import { signInAction } from '@/app/login/actions'

export default function LoginForm() {
  const [error, formAction, isSubmitting] = useActionState(signInAction, null)

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-black uppercase tracking-[0.2em]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full border-[3px] border-black bg-white px-4 py-4 text-base font-medium outline-none"
          placeholder="admin@company.com"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-black uppercase tracking-[0.2em]"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full border-[3px] border-black bg-white px-4 py-4 text-base font-medium outline-none"
          placeholder="Your admin password"
          required
        />
      </div>

      {error ? (
        <div className="border-[3px] border-red-600 bg-white px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full border-[3px] border-black bg-[#ffd600] px-6 py-4 text-lg font-black uppercase tracking-[-0.04em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Signing In...' : 'Login To Admin'}
      </button>
    </form>
  )
}
