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
      className={`${inter.className} site-frame section-space flex min-h-screen items-center justify-center`}
    >
      <div className="site-content grid w-full max-w-5xl grid-cols-1 overflow-hidden border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:grid-cols-[1.05fr_0.95fr]">
        <section className="border-b-[3px] border-black bg-black p-6 text-white md:border-b-0 md:border-r-[3px] md:p-8">
          <p className="type-kicker mb-4 text-[#ffd600]">
            Admin Access
          </p>
          <h1 className="type-display mb-6 italic text-white">
            LOGIN
            <br />
            CONTROL
          </h1>
          <p className="type-lead max-w-md border-l-[3px] border-[#ffd600] pl-5 text-white/90">
            Sign in with your Supabase admin account to manage incoming leads,
            update pipeline status, and keep the dashboard synced.
          </p>
          <div className="mt-8 space-y-2 text-xs font-bold uppercase text-white/80">
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

        <section className="bg-[#f3f3f4] p-6 md:p-8">
          <div className="mb-6">
            <p className="type-kicker mb-3 text-black/60">
              Yunaka Tech
            </p>
            <h2 className="type-section-title text-black">
              Sign In
            </h2>
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  )
}
