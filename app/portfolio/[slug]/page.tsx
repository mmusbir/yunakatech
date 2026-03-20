import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import PublicSiteShell from '@/app/components/public-site-shell'
import {
  getPortfolioProject,
  portfolioProjects,
} from '@/app/portfolio/data'
import {
  buildWhatsappHref,
  getSiteSettings,
} from '@/app/lib/site-settings'
import styles from '@/app/portfolio/portfolio.module.css'

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata(
  props: PageProps<'/portfolio/[slug]'>
): Promise<Metadata> {
  const { slug } = await props.params
  const project = getPortfolioProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Yunaka Tech',
    }
  }

  return {
    title: `${project.title} | Yunaka Tech`,
    description: project.description,
  }
}

export default async function PortfolioDetailPage(
  props: PageProps<'/portfolio/[slug]'>
) {
  const { slug } = await props.params
  const project = getPortfolioProject(slug)

  if (!project) {
    notFound()
  }

  const settings = await getSiteSettings()
  const whatsappHref = buildWhatsappHref(settings.whatsappNumber)

  return (
    <PublicSiteShell pageClassName={styles.page} activeNav="portfolio">
      <main className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-8 md:py-16">
        <div className="mb-10">
          <Link
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-black/70 transition-colors hover:text-black"
            href="/portfolio"
          >
            {'<-'} Back to Portfolio
          </Link>
        </div>

        <section className="mb-14 grid grid-cols-1 gap-10 border-b-[3px] border-black pb-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-black/70">
              {project.eyebrow}
            </p>
            <h1 className="text-5xl font-black uppercase italic leading-[0.88] tracking-[-0.08em] text-black md:text-8xl">
              {project.title}
            </h1>
          </div>

          <div className="md:col-span-4">
            <p className="border-l-[3px] border-black pl-6 text-lg font-bold uppercase leading-tight">
              {project.description}
            </p>
          </div>
        </section>

        <section className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
          <div className={`${styles.neoCard} overflow-hidden bg-white`}>
            <div className="border-b-[3px] border-black">
              <Image
                alt={project.alt}
                className="h-auto w-full object-cover"
                height={1200}
                preload
                src={project.image}
                sizes="(max-width: 768px) 100vw, 66vw"
                width={1600}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border-l-[3px] border-[#ffd600] pl-4"
                >
                  <div className="text-3xl font-black tracking-[-0.06em]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-black/70">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className={`${styles.neoCard} h-fit bg-white p-8`}>
            <div className="mb-8">
              <div className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-black/60">
                Build Code
              </div>
              <div className="text-3xl font-black uppercase tracking-[-0.05em]">
                {project.code}
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-black/60">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-[3px] border-black px-3 py-1 text-xs font-bold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-black/60">
                Deliverables
              </div>
              <ul className="space-y-3">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="border-l-[3px] border-black pl-4 text-sm font-bold uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              className={`${styles.neoButton} w-full bg-[#ffd600] py-4 text-lg text-black`}
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Start Similar Project
            </a>
          </aside>
        </section>

        <section className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          <article className={`${styles.neoCard} bg-white p-8 md:col-span-1`}>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-black/60">
              Challenge
            </div>
            <p className="text-base font-medium leading-7 text-black/85">
              {project.challenge}
            </p>
          </article>

          <article className={`${styles.neoCard} bg-[#ffd600] p-8 text-black md:col-span-2`}>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-black/70">
              Solution
            </div>
            <p className="text-lg font-bold leading-8">{project.solution}</p>
          </article>
        </section>

        <section className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <article className={`${styles.neoCard} bg-black p-8 text-white`}>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#ffd600]">
              Outcomes
            </div>
            <ul className="space-y-4">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="border-l-[3px] border-[#ffd600] pl-4 text-sm font-bold uppercase leading-6"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.neoCard} bg-white p-8`}>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-black/60">
              Project Overview
            </div>
            <p className="text-base font-medium leading-7 text-black/85">
              {project.longDescription}
            </p>
          </article>
        </section>

        <section className={`${styles.neoCard} bg-white p-8 md:p-10`}>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-black/60">
                Next Move
              </div>
              <h2 className="text-4xl font-black uppercase tracking-[-0.06em] md:text-5xl">
                Want This Level Of Build Quality?
              </h2>
            </div>
            <Link
              className="text-sm font-black uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black"
              href="/portfolio"
            >
              Browse More Builds
            </Link>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              className={`${styles.neoButton} bg-[#ffd600] px-8 py-4 text-black`}
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Book Discovery Call
            </a>
            <Link
              className={`${styles.neoButton} bg-white px-8 py-4 text-black`}
              href="/portfolio"
            >
              Back To Portfolio
            </Link>
          </div>
        </section>
      </main>
    </PublicSiteShell>
  )
}
