import Link from 'next/link'

import AdminShell from '@/app/admin/admin-shell'
import { requireAdminUser } from '@/app/admin/lib'
import ProjectForm from '@/app/admin/portfolio/project-form'

export const dynamic = 'force-dynamic'

export default async function NewPortfolioProjectPage() {
  const user = await requireAdminUser()

  return (
    <AdminShell activeNav="portfolio" email={user.email}>
      <div className="mb-8 flex flex-col gap-3">
        <Link
          href="/admin"
          className="text-xs font-black uppercase tracking-[0.18em] text-black/60 transition-colors hover:text-black"
        >
          {'<-'} Back To Portfolio Admin
        </Link>
        <div>
          <h2 className="type-display-compact text-black">
            ADD NEW <br />
            PROJECT
          </h2>
          <p className="type-lead mt-3 max-w-2xl text-black/60">
            Isi blueprint project baru agar langsung tampil di halaman utama,
            listing portfolio, dan detail project.
          </p>
        </div>
      </div>

      <div className="border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        <ProjectForm />
      </div>
    </AdminShell>
  )
}
