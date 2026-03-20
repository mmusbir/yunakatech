import Image from 'next/image'
import Link from 'next/link'

import AdminShell from '@/app/admin/admin-shell'
import { requireAdminUser } from '@/app/admin/lib'
import { portfolioProjects } from '@/app/portfolio/data'

const projectStatuses = ['ACTIVE', 'STAGING', 'INTERNAL', 'ACTIVE'] as const

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const user = await requireAdminUser()

  return (
    <AdminShell activeNav="portfolio" email={user.email}>
      <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black uppercase tracking-[-0.08em] leading-[0.85] text-black md:text-7xl">
            PORTFOLIO <br />
            MANAGEMENT
          </h2>
          <p className="mt-4 max-w-lg text-base font-bold uppercase text-black/60 md:text-lg">
            Manage the technical blueprint of our digital footprint. Add, edit,
            or purge project records from the global catalog.
          </p>
        </div>

        <Link
          href="/portfolio"
          className="border-[3px] border-black bg-[#ffd600] px-8 py-5 text-xl font-black uppercase tracking-[-0.05em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          ADD NEW PROJECT
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {portfolioProjects.map((project, index) => (
          <article
            key={project.slug}
            className="flex h-full flex-col border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="group relative mb-6 aspect-video w-full overflow-hidden border-[3px] border-black bg-[#eeeeee]">
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
              <p className="mb-6 text-sm font-bold leading-relaxed text-black/70">
                {project.description}
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
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

            <div className="flex gap-4">
              <Link
                href={`/portfolio/${project.slug}`}
                className="flex flex-1 items-center justify-center gap-2 border-[3px] border-black bg-white py-3 text-sm font-black uppercase tracking-[-0.04em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#e8e8e8] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>[E]</span>
                EDIT
              </Link>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 border-[3px] border-black bg-white py-3 text-sm font-black uppercase tracking-[-0.04em] text-[#c0000a] shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#ffcec7] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>[X]</span>
                DELETE
              </button>
            </div>
          </article>
        ))}

        <div className="flex min-h-[400px] flex-col items-center justify-center border-[3px] border-dashed border-black p-6 opacity-40">
          <div className="mb-4 text-5xl font-black">[+]</div>
          <p className="px-8 text-center text-xl font-black uppercase tracking-[-0.05em]">
            NEW BLUEPRINT ENTRY
          </p>
          <Link
            href="/portfolio"
            className="mt-6 border-[3px] border-black px-6 py-2 text-xs font-black uppercase transition-all hover:bg-black hover:text-white"
          >
            INITIALIZE
          </Link>
        </div>
      </div>

      <footer className="mt-20 flex flex-col gap-6 border-t-[3px] border-black pt-8 text-[10px] font-black uppercase tracking-[0.2em] md:flex-row md:items-center md:justify-between">
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
