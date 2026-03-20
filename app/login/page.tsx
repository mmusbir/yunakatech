import Link from 'next/link'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import LoginForm from '@/app/login/login-form'
import { createClient } from '@/utils/supabase/server'

const inter = Inter({
  subsets: ['latin'],
})

export default async function LoginPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <main
      className={`${inter.className} flex min-h-screen items-center justify-center bg-[#f9f9f9] px-6 py-12`}
    >
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden border-[3px] border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:grid-cols-[1.1fr_0.9fr]">
        <section className="border-b-[3px] border-black bg-black p-8 text-white md:border-b-0 md:border-r-[3px] md:p-12">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-[#ffd600]">
            Admin Access
          </p>
          <h1 className="mb-6 text-5xl font-black uppercase italic leading-[0.9] tracking-[-0.08em] md:text-7xl">
            LOGIN
            <br />
            CONTROL
          </h1>
          <p className="max-w-md border-l-[3px] border-[#ffd600] pl-5 text-sm font-bold uppercase leading-7 text-white/90 md:text-base">
            Sign in with your Supabase admin account to manage incoming leads,
            update pipeline status, and keep the dashboard synced.
          </p>
          <div className="mt-10 space-y-3 text-sm font-bold uppercase text-white/80">
            <p>Use a user from Supabase Auth.</p>
            <p>The session is kept fresh through the project proxy.</p>
            <Link
              href="/"
              className="inline-block text-[#ffd600] transition-colors hover:text-white"
            >
              Back To Homepage
            </Link>
          </div>
        </section>

        <section className="bg-[#f3f3f4] p-8 md:p-12">
          <div className="mb-8">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-black/60">
              Yunaka Tech
            </p>
            <h2 className="text-3xl font-black uppercase tracking-[-0.05em] text-black md:text-4xl">
              Sign In
            </h2>
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  )
}
