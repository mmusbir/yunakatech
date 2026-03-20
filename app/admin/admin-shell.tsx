import type { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import SignOutButton from '@/app/admin/sign-out-button'

const inter = Inter({
  subsets: ['latin'],
})

type AdminNavKey = 'dashboard' | 'portfolio' | 'pricing' | 'settings'

interface AdminShellProps {
  children: ReactNode
  activeNav: AdminNavKey
  email: string | undefined
}

function getAdminLabel(email: string | undefined) {
  if (!email) {
    return {
      name: 'Admin Session',
      role: 'Supabase Auth',
    }
  }

  const localPart = email.split('@')[0] ?? 'admin'
  const pieces = localPart
    .split(/[._-]+/)
    .filter(Boolean)
    .map((piece) => piece[0]?.toUpperCase() + piece.slice(1))

  return {
    name: pieces.join(' ') || 'Admin Session',
    role: 'Lead Architect',
  }
}

function getNavClass(active: boolean) {
  if (active) {
    return 'mx-2 my-1 flex items-center gap-3 border-[3px] border-black bg-[#ffd600] px-4 py-3 text-sm font-bold uppercase tracking-[-0.04em] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
  }

  return 'mx-2 my-1 flex items-center gap-3 border-[3px] border-transparent px-4 py-3 text-sm font-bold uppercase tracking-[-0.04em] text-black transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-gray-100'
}

export default function AdminShell({
  children,
  activeNav,
  email,
}: AdminShellProps) {
  const admin = getAdminLabel(email)

  return (
    <div className={`${inter.className} min-h-screen bg-[#f9f9f9] text-[#1a1c1c]`}>
      <aside className="hidden h-screen w-64 flex-col border-r-[3px] border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:fixed md:left-0 md:top-0 md:z-40 md:flex">
        <div className="border-b-[3px] border-black p-8">
          <h1 className="text-3xl font-black uppercase tracking-[-0.08em] text-black">
            YUNAKA
          </h1>
          <p className="text-xs font-bold uppercase tracking-[-0.05em] opacity-60">
            TECH ADMIN
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <Link className={getNavClass(activeNav === 'dashboard')} href="/admin">
            <span className="font-black">[D]</span>
            <span>Dashboard</span>
          </Link>
          <Link className={getNavClass(activeNav === 'portfolio')} href="/admin">
            <span className="font-black">[P]</span>
            <span>Portfolio</span>
          </Link>
          <Link
            className={getNavClass(activeNav === 'pricing')}
            href="/admin/pricing"
          >
            <span className="font-black">[$]</span>
            <span>Pricing</span>
          </Link>
          <Link
            className={getNavClass(activeNav === 'settings')}
            href="/admin/settings"
          >
            <span className="font-black">[S]</span>
            <span>Settings</span>
          </Link>
        </nav>

        <div className="space-y-4 border-t-[3px] border-black bg-[#eeeeee] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden border-[2px] border-black bg-[#705d00]">
              <Image
                alt="User Admin Avatar"
                className="h-full w-full object-cover"
                height={80}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr3QwdU0HZQGfwMIlaSueaRa6y1YPsL-xSV_Pl82VmyOU-WXiMXDqrtaBZ52TEtWcQ9SDwcxUwXpuee6-cRqYgcy6gSohXMLQMgpSPF92g334Izan3jjZSicdEdwKQQ4-wg_En1O2yPTpw4ZIXErAL_13VBjUOkMNP_WpTv51pdTVH1TQmeMUqU5zSEvvKSv9aoglV7x7HphLlRi9E2Pst16SHYEXPNOttpymyAcmMfuph0_cgINI4XVDjR_UhSjUEFyuxZN1bKHg"
                width={80}
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase">{admin.name}</p>
              <p className="text-[10px] font-bold uppercase text-black/60">
                {admin.role}
              </p>
            </div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/60">
            {email}
          </p>
          <SignOutButton />
        </div>
      </aside>

      <main className="min-h-screen px-5 pb-12 pt-6 md:ml-64 md:px-8 md:pb-12 md:pt-20">
        <header className="mb-8 border-[3px] border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:fixed md:left-64 md:right-0 md:top-0 md:z-30 md:mb-0 md:flex md:h-20 md:items-center md:justify-between md:border-x-0 md:border-t-0 md:px-8 md:py-0 md:shadow-none">
          <div className="flex items-center justify-between gap-6">
            <div className="text-right">
              <p className="text-sm font-black uppercase tracking-[-0.04em] leading-none">
                YUNAKA TECH
              </p>
              <p className="text-[10px] font-black uppercase text-[#705d00]">
                Internal System
              </p>
            </div>
            <div className="md:hidden">
              <SignOutButton />
            </div>
          </div>
        </header>

        <div className="mt-0 md:mt-8">{children}</div>
      </main>
    </div>
  )
}
