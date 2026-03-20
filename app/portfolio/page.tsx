import Image from 'next/image'
import Link from 'next/link'

import PublicSiteShell from '@/app/components/public-site-shell'
import { portfolioProjects, portfolioStats } from '@/app/portfolio/data'
import styles from '@/app/portfolio/portfolio.module.css'

export default function PortfolioPage() {
  return (
    <PublicSiteShell pageClassName={styles.page} activeNav="portfolio">
      <main className="mx-auto w-full max-w-[1440px] px-6 md:px-8">
        <section className="mb-16 border-b-[3px] border-black py-20 md:py-24">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <h1 className="mb-8 text-6xl font-black uppercase italic leading-[0.85] tracking-[-0.08em] text-black md:text-9xl">
                TECH <br />
                <span className="text-[#ffd600] [text-shadow:3px_0_0_#000,-3px_0_0_#000,0_3px_0_#000,0_-3px_0_#000]">
                  REDEFINED.
                </span>
              </h1>
            </div>
            <div className="md:col-span-4 md:pb-4">
              <p className="border-l-[3px] border-black pl-6 text-lg font-bold uppercase leading-tight md:text-xl">
                WE BUILD DIGITAL ARCHITECTURE THAT COMMANDS ATTENTION. NO SOFT
                GRADIENTS. NO BULLSHIT. JUST RAW TECHNICAL POWER.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-12 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black uppercase tracking-[-0.06em] md:text-4xl">
              SELECTED_BUILDS
            </h2>
            <div className="hidden h-[3px] flex-grow bg-black md:block" />
            <div className="flex gap-4">
              <span className="flex h-12 w-12 items-center justify-center border-[3px] border-black text-2xl font-black">
                {'<'}
              </span>
              <span className="flex h-12 w-12 items-center justify-center border-[3px] border-black text-2xl font-black">
                {'>'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {portfolioProjects.map((project) => (
              <article
                key={project.slug}
                id={project.slug}
                className={`${styles.neoCard} group flex flex-col bg-white`}
              >
                <div className="h-80 overflow-hidden border-b-[3px] border-black grayscale transition-all group-hover:grayscale-0">
                  <Image
                    alt={project.alt}
                    className="h-full w-full object-cover"
                    height={960}
                    src={project.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={1280}
                  />
                </div>

                <div className="p-8">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-3xl font-black uppercase tracking-[-0.05em]">
                      {project.title}
                    </h3>
                    <span className="bg-black px-3 py-1 text-sm font-bold text-white">
                      {project.code}
                    </span>
                  </div>

                  <p className="mb-8 text-lg font-medium leading-snug">
                    {project.description}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-2">
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
                    className={`${styles.neoButton} w-full bg-[#ffd600] py-4 text-xl text-black`}
                    href={`/portfolio/${project.slug}`}
                  >
                    Lihat Detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-24 grid grid-cols-2 gap-8 bg-black p-8 text-white md:grid-cols-4 md:p-12">
          {portfolioStats.map((stat) => (
            <div key={stat.label} className="border-l-[3px] border-[#ffd600] pl-6">
              <div className="mb-2 text-4xl font-black md:text-5xl">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffd600] md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </section>
      </main>

    </PublicSiteShell>
  )
}
