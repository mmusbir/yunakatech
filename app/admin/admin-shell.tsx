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
      <aside className="hidden h-screen w-56 flex-col border-r-[3px] border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] md:fixed md:left-0 md:top-0 md:z-40 md:flex">
        <div className="border-b-[3px] border-black p-6">
          <h1 className="text-2xl font-black uppercase tracking-[-0.08em] text-black">
            YUNAKA
          </h1>
          <p className="text-xs font-bold uppercase tracking-[-0.05em] opacity-60">
            TECH ADMIN
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
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

        <div className="space-y-3 border-t-[3px] border-black bg-[#eeeeee] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden border-[2px] border-black bg-[#705d00]">
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

      <main className="min-h-screen px-4 pb-8 pt-4 md:ml-56 md:px-6 md:pb-10 md:pt-6">
        <div className="mb-4 flex justify-end md:hidden">
          <SignOutButton />
        </div>

        <div>
          <div className="site-content">{children}</div>
        </div>
      </main>
    </div>
  )
}
