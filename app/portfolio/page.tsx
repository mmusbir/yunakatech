import Image from 'next/image'
import Link from 'next/link'

import {
  PUBLIC_CONTENT_CLASS,
  PUBLIC_FRAME_CLASS,
} from '@/app/lib/layout-widths'
import PublicSiteShell from '@/app/components/public-site-shell'
import {
  getPortfolioProjects,
  portfolioStats,
} from '@/app/lib/portfolio-projects'
import styles from '@/app/portfolio/portfolio.module.css'

export const dynamic = 'force-dynamic'

export default async function PortfolioPage() {
  const portfolioProjects = await getPortfolioProjects()

  return (
    <PublicSiteShell pageClassName={styles.page} activeNav="portfolio">
      <main className={`${PUBLIC_FRAME_CLASS}`}>
        <section className="section-space border-b-[3px] border-black">
          <div
            className={`${PUBLIC_CONTENT_CLASS} grid grid-cols-1 items-end gap-8 md:grid-cols-12`}
          >
            <div className="md:col-span-8">
              <h1 className="type-display mb-8 italic text-black">
                TECH <br />
                <span className="text-[#ffd600] [text-shadow:3px_0_0_#000,-3px_0_0_#000,0_3px_0_#000,0_-3px_0_#000]">
                  REDEFINED.
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="type-lead border-l-[3px] border-black pl-6 leading-tight">
                WE BUILD DIGITAL ARCHITECTURE THAT COMMANDS ATTENTION. NO SOFT
                GRADIENTS. NO BULLSHIT. JUST RAW TECHNICAL POWER.
              </p>
            </div>
          </div>
        </section>

        <section className="section-space-tight">
          <div className={PUBLIC_CONTENT_CLASS}>
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="type-section-title">
                SELECTED_BUILDS
              </h2>
              <div className="hidden h-[3px] flex-grow bg-black md:block" />
              <div className="flex gap-4">
                <span className="flex h-10 w-10 items-center justify-center border-[3px] border-black text-xl font-black">
                  {'<'}
                </span>
                <span className="flex h-10 w-10 items-center justify-center border-[3px] border-black text-xl font-black">
                  {'>'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {portfolioProjects.map((project) => (
                <article
                  key={project.slug}
                  id={project.slug}
                  className={`${styles.neoCard} group flex flex-col bg-white`}
                >
                  <div className="h-64 overflow-hidden border-b-[3px] border-black grayscale transition-all group-hover:grayscale-0">
                    <Image
                      alt={project.alt}
                      className="h-full w-full object-cover"
                      height={960}
                      src={project.image}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      width={1280}
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {project.title}
                      </h3>
                      <span className="bg-black px-3 py-1 text-xs font-bold text-white">
                        {project.code}
                      </span>
                    </div>

                    <p className="mb-6 text-base font-medium leading-snug">
                      {project.description}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border-[3px] border-black px-3 py-1 text-xs font-bold uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      className={`${styles.neoButton} w-full bg-[#ffd600] py-3 text-base text-black`}
                      href={`/portfolio/${project.slug}`}
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space-tight pt-0">
          <div
            className={`${PUBLIC_CONTENT_CLASS} grid grid-cols-2 gap-6 bg-black p-6 text-white md:grid-cols-4 md:p-8`}
          >
            {portfolioStats.map((stat) => (
              <div
                key={stat.label}
                className="border-l-[3px] border-[#ffd600] pl-6"
              >
                <div className="mb-2 text-3xl font-black md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffd600] md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PublicSiteShell>
  )
}
