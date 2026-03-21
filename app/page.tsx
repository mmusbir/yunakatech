import Image from 'next/image'
import Link from 'next/link'

import PublicSiteShell from '@/app/components/public-site-shell'
import styles from '@/app/home.module.css'
import {
  PUBLIC_CONTENT_CLASS,
  PUBLIC_FRAME_CLASS,
} from '@/app/lib/layout-widths'
import { getPortfolioProjects } from '@/app/lib/portfolio-projects'
import { getPricingPlans } from '@/app/lib/pricing-settings'
import { buildWhatsappHref, getSiteSettings } from '@/app/lib/site-settings'

const services = [
  {
    icon: '[]',
    title: 'Company Profile',
    description:
      'Elevate your brand with a digital blueprint that screams authority and trust.',
    accent: 'bg-white text-black',
    iconClass: 'bg-black text-[#ffd600]',
    footerClass: 'group-hover:bg-[#ffd600]',
  },
  {
    icon: '[+]',
    title: 'Booking System',
    description:
      'Automate your schedule. No more manual chats. Just conversions while you sleep.',
    accent: 'bg-[#ffd600] text-black',
    iconClass: 'bg-black text-white',
    footerClass: 'bg-white',
  },
  {
    icon: '</>',
    title: 'Custom Website',
    description:
      'Unique problems require unique code. We build what others say is impossible.',
    accent: 'bg-white text-black',
    iconClass: 'bg-black text-[#ffd600]',
    footerClass: 'group-hover:bg-[#ffd600]',
  },
] as const

const testimonials = [
  {
    quote:
      'YUNAKA TECH GAK MAIN-MAIN. WEBSITE KITA NAIK 200% DALAM SEBULAN. GILA!',
    author: 'Budi S., CEO Creative Agency',
  },
  {
    quote:
      'THE DESIGN SYSTEM IS INSANE. BRUTAL, LOUD, AND EXACTLY WHAT WE NEEDED.',
    author: 'Sarah K., Marketing Director',
  },
  {
    quote:
      'BUILT FASTER. NO BULLSHIT. THE BEST TECH PARTNER IN INDONESIA.',
    author: 'Anto W., Startup Founder',
  },
] as const

export default async function Home() {
  const settings = await getSiteSettings()
  const portfolioProjects = await getPortfolioProjects()
  const pricingPlans = await getPricingPlans()
  const whatsappHref = buildWhatsappHref(settings.whatsappNumber)
  const featuredWorks = portfolioProjects.slice(0, 2)

  return (
    <PublicSiteShell pageClassName={styles.page} activeNav="services">
      <main className="flex-grow">
        <section className={`${PUBLIC_FRAME_CLASS} section-space`}>
          <div
            className={`${PUBLIC_CONTENT_CLASS} flex flex-col gap-8 md:flex-row md:items-center md:gap-10`}
          >
            <div className="flex-1 space-y-8">
              <h1 className="type-display text-black">
                WE BUILD <br />
                <span className="inline-block bg-[#ffd600] px-2">WEBSITES</span>{' '}
                <br />
                THAT SELL
              </h1>

              <p className="type-lead max-w-xl border-l-8 border-black pl-6 italic">
                Website bukan cuma tampilan, tapi alat jualan.
                <span className="ml-2 bg-black px-1 text-[#ffd600]">
                  Engineering performance for business growth.
                </span>
              </p>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4">
                <Link
                  className={`${styles.neoButton} justify-center bg-white px-6 py-3 text-base text-black md:text-lg`}
                  href="/portfolio"
                >
                  Lihat Portfolio
                </Link>
                <a
                  className={`${styles.neoButton} justify-center bg-[#ffd600] px-6 py-3 text-base text-black md:text-lg`}
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Konsultasi Sekarang
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div className={`${styles.neoBox} rotate-2 bg-white p-3`}>
                <Image
                  alt="Technical website architecture and analytics dashboard UI"
                  className="h-auto w-full grayscale contrast-125"
                  height={960}
                  preload
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3iglZ-pHIP9Cho-JpE8_Uq8Js_DGVHOI3zKZ1QjbtM734zmxO0VEZn3DQBws_r54CxmNMqeoGTsVlSfcvwq6Vrru7TAiZHNSeRM5bv8TXFxZSPDFU2rFugL4882Npi6cH5eSSXwzNBDI7t79wt4pDvU0C2aN8zgb0hJB05MdqvvIP2Pnccbs4VdyJp1FMxZ6sdoOIvoBYcuoT6u1q3s8fHtus9zdnMSJF3ERE4CadBdi63E9Fj63igijNe0lGz7uG4rGBqs0Rph8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={1280}
                />
                <div className="mt-4 flex items-center justify-between border-t-[3px] border-black pt-4 text-xs font-black uppercase sm:text-sm">
                  <span>[SYSTEM_STATUS: ACTIVE]</span>
                  <span>2026_RELEASE_V1</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space bg-black text-white" id="services">
          <div className={`${PUBLIC_FRAME_CLASS}`}>
            <div className={PUBLIC_CONTENT_CLASS}>
              <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
                <h2 className="type-section-title italic">
                  OUR SERVICES // core_functions
                </h2>
                <span className="text-lg font-black text-[#ffd600]">
                  [01-03]
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
                {services.map((service) => (
                  <article
                    key={service.title}
                    className={`${styles.neoBox} group p-6 ${service.accent}`}
                  >
                    <span
                      className={`mb-6 block w-fit p-2 text-4xl font-black leading-none ${service.iconClass}`}
                    >
                      {service.icon}
                    </span>
                    <h3 className="mb-3 text-2xl font-black uppercase tracking-[-0.05em]">
                      {service.title}
                    </h3>
                    <p className="mb-6 text-base font-bold opacity-70">
                      {service.description}
                    </p>
                    <div
                      className={`cursor-pointer border-t-[3px] border-black p-2 pt-4 text-sm font-black uppercase transition-colors ${service.footerClass}`}
                    >
                      Learn More -&gt;
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${PUBLIC_FRAME_CLASS} section-space`} id="portfolio">
          <div className={PUBLIC_CONTENT_CLASS}>
            <div className="mb-8 border-l-[10px] border-black pl-5 md:mb-10 md:pl-6">
              <h2 className="type-section-title">
                FEATURED_WORK
              </h2>
              <p className="type-lead opacity-60">
                Real results for real businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {featuredWorks.map((work, index) => (
                <article
                  key={work.slug}
                  className={`space-y-4 ${index % 2 === 1 ? 'md:mt-12' : ''}`}
                >
                  <Link
                    href={`/portfolio/${work.slug}`}
                    className="block"
                  >
                    <div
                      className={`${styles.neoBox} group relative overflow-hidden`}
                    >
                      <Image
                        alt={work.alt}
                        className="h-auto w-full grayscale transition-all duration-500 group-hover:grayscale-0"
                        height={900}
                        src={work.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        width={1200}
                      />
                      <div className="absolute left-3 top-3 bg-black px-3 py-1 text-xs font-black uppercase text-white">
                        {work.code}
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <Link
                      href={`/portfolio/${work.slug}`}
                      className="text-2xl font-black uppercase tracking-[-0.05em] transition-colors hover:text-black/70"
                    >
                      {work.title}
                    </Link>
                    <span className="w-fit border-[3px] border-black bg-[#ffd600] px-3 py-1 text-sm font-bold uppercase">
                      {work.category}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section-space overflow-hidden border-y-[3px] border-black bg-[#ffd600]"
          id="testimonials"
        >
          <div className={`${PUBLIC_FRAME_CLASS}`}>
            <div className={`${PUBLIC_CONTENT_CLASS} overflow-hidden`}>
              <div className={styles.marqueeTrack}>
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`${testimonial.author}-${index}`}
                    className={`${styles.neoBox} inline-block max-w-sm shrink-0 whitespace-normal bg-white p-6`}
                  >
                    <p className="mb-4 text-lg font-black italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <span className="block text-sm font-black uppercase">
                      - {testimonial.author}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${PUBLIC_FRAME_CLASS} section-space`} id="pricing">
          <div className={PUBLIC_CONTENT_CLASS}>
            <div className="mb-8 text-center md:mb-10">
              <h2 className="type-section-title mb-4 italic underline decoration-[#ffd600] decoration-8 underline-offset-8">
                CHOOSE_YOUR_PLAN
              </h2>
              <p className="type-lead opacity-60">
                Clear pricing. Zero hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`${styles.neoBox} relative flex h-full flex-col bg-white p-6 ${
                    plan.highlighted
                      ? 'scale-100 border-[#ffd600] shadow-[8px_8px_0px_0px_rgba(255,214,0,1)] md:scale-[1.01]'
                      : ''
                  }`}
                >
                  {plan.highlighted ? (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border-[3px] border-black bg-black px-5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#ffd600]">
                      Recommended
                    </div>
                  ) : null}

                  <div className="mb-6">
                    <h3 className="mb-2 text-xl font-black uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-4xl font-black tracking-[-0.08em] text-black">
                      {plan.price}
                    </p>
                  </div>

                  <ul className="mb-8 flex-grow space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-xs font-bold uppercase"
                      >
                        <span className="flex h-6 w-6 items-center justify-center bg-black text-base font-black text-[#ffd600]">
                          +
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    className={`${styles.neoButton} w-full justify-center py-2.5 text-sm text-black ${plan.accent}`}
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {plan.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space-loose relative overflow-hidden border-y-[3px] border-black bg-[#ffd600]">
          <div className={`${PUBLIC_FRAME_CLASS} relative z-10`}>
            <div className={`${PUBLIC_CONTENT_CLASS} text-center`}>
              <h2 className="type-display mb-8 italic md:mb-10">
                SIAP NAIKIN <br /> BISNIS LO?
              </h2>
              <a
                className={`${styles.neoButton} group mx-auto inline-flex items-center gap-3 bg-black px-6 py-4 text-lg text-[#ffd600] md:px-9 md:py-4 md:text-2xl`}
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp Kami
                <span className="text-3xl font-black transition-transform group-hover:translate-x-2">
                  -&gt;
                </span>
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute right-4 top-6 text-5xl font-black uppercase opacity-10 md:right-10 md:top-10 md:text-8xl">
            BUILD_NOW
          </div>
          <div className="pointer-events-none absolute bottom-6 left-4 text-5xl font-black uppercase italic opacity-10 md:bottom-10 md:left-10 md:text-8xl">
            SELL_FAST
          </div>
        </section>
      </main>

    </PublicSiteShell>
  )
}
