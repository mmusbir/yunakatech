import Image from 'next/image'
import Link from 'next/link'

import AdminShell from '@/app/admin/admin-shell'
import { requireAdminUser } from '@/app/admin/lib'
import { deletePortfolioProjectAction } from '@/app/admin/portfolio/actions'
import {
  getPortfolioProjects,
  getPortfolioSyncStatus,
} from '@/app/lib/portfolio-projects'

const projectStatuses = ['ACTIVE', 'STAGING', 'INTERNAL', 'ACTIVE'] as const

export const dynamic = 'force-dynamic'

function getFlashFromSearchParams(
  status: string | string[] | undefined,
  message: string | string[] | undefined
) {
  return {
    status:
      typeof status === 'string' && (status === 'success' || status === 'error')
        ? status
        : 'idle',
    message: typeof message === 'string' ? message : '',
  } as const
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const user = await requireAdminUser()
  const projects = await getPortfolioProjects()
  const syncStatus = await getPortfolioSyncStatus()
  const resolvedSearchParams = await searchParams
  const flash = getFlashFromSearchParams(
    resolvedSearchParams.status,
    resolvedSearchParams.message
  )

  return (
    <AdminShell activeNav="portfolio" email={user.email}>
      <div className="mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <div className="max-w-xl">
          <h2 className="type-display-compact text-black">
            PORTFOLIO <br />
            MANAGEMENT
          </h2>
          <p className="type-lead mt-3 max-w-lg text-black/60">
            Manage the technical blueprint of our digital footprint. Add, edit,
            or purge project records from the global catalog.
          </p>
        </div>

        <Link
          href="/admin/portfolio/new"
          className="border-[3px] border-black bg-[#ffd600] px-6 py-3 text-base font-black uppercase tracking-[-0.05em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          ADD NEW PROJECT
        </Link>
      </div>

      {!syncStatus.ready ? (
        <div className="mb-6 border-[3px] border-black bg-[#ffdad6] p-4 text-xs font-black uppercase tracking-[0.06em] text-[#93000a]">
          {syncStatus.reason === 'missing_table'
            ? 'Table public.portfolio_projects belum ada di Supabase. Portfolio tetap tersimpan lokal, tapi untuk sinkronisasi database kamu perlu jalankan SQL di database/supabase-bootstrap.sql.'
            : 'Supabase sync untuk portfolio belum aktif penuh. Perubahan tetap tersimpan lokal sampai koneksi server-side siap.'}
        </div>
      ) : null}

      {flash.message ? (
        <div
          className={`mb-6 border-[3px] p-3 text-xs font-black uppercase tracking-[0.08em] ${
            flash.status === 'success'
              ? 'border-black bg-[#ffd600] text-black'
              : 'border-black bg-[#ffdad6] text-[#93000a]'
          }`}
        >
          {flash.message}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="flex h-full flex-col border-[3px] border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="group relative mb-5 aspect-video w-full overflow-hidden border-[3px] border-black bg-[#eeeeee]">
              <Image
                alt={project.alt}
                className="h-full w-full object-cover"
                height={720}
                src={project.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                width={1280}
              />
              <div className="absolute inset-0 bg-[#ffd600] opacity-0 transition-opacity group-hover:opacity-20" />
              <div className="absolute left-4 top-4 bg-black px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-white">
                {projectStatuses[index % projectStatuses.length]}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="mb-2 text-2xl font-black uppercase tracking-[-0.05em]">
                {project.title}
              </h3>
              <p className="mb-5 text-sm font-bold leading-relaxed text-black/70">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-[2px] border-black bg-[#e2e2e2] px-2 py-1 text-[10px] font-black uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/admin/portfolio/${project.slug}/edit`}
                className="flex flex-1 items-center justify-center gap-2 border-[3px] border-black bg-white py-2.5 text-xs font-black uppercase tracking-[-0.04em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#e8e8e8] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>[E]</span>
                EDIT
              </Link>
              <form action={deletePortfolioProjectAction} className="flex-1">
                <input type="hidden" name="slug" value={project.slug} />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 border-[3px] border-black bg-white py-2.5 text-xs font-black uppercase tracking-[-0.04em] text-[#c0000a] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#ffcec7] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span>[X]</span>
                  DELETE
                </button>
              </form>
            </div>
          </article>
        ))}

        <div className="flex min-h-[300px] flex-col items-center justify-center border-[3px] border-dashed border-black p-5 opacity-40">
          <div className="mb-3 text-4xl font-black">[+]</div>
          <p className="px-6 text-center text-lg font-black uppercase tracking-[-0.05em]">
            NEW BLUEPRINT ENTRY
          </p>
          <Link
            href="/admin/portfolio/new"
            className="mt-5 border-[3px] border-black px-5 py-2 text-[10px] font-black uppercase transition-all hover:bg-black hover:text-white"
          >
            INITIALIZE
          </Link>
        </div>
      </div>

      <footer className="mt-12 flex flex-col gap-4 border-t-[3px] border-black pt-6 text-[10px] font-black uppercase tracking-[0.18em] md:mt-14 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#705d00]" />
            SYSTEMS NOMINAL
          </div>
          <div className="flex items-center gap-2 opacity-50">
            <span className="h-2 w-2 bg-black" />
            SYNCED: 12:44:01 GMT
          </div>
        </div>
        <div className="flex flex-wrap gap-6 md:gap-8">
          <Link href="/portfolio" className="hover:underline">
            DOCUMENTATION
          </Link>
          <Link href="/admin" className="hover:underline">
            API STATUS
          </Link>
          <Link href="/login" className="hover:underline">
            SECURITY LOGS
          </Link>
        </div>
      </footer>
    </AdminShell>
  )
}
