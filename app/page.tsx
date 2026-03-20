import Image from 'next/image'
import Link from 'next/link'

import PublicSiteShell from '@/app/components/public-site-shell'
import styles from '@/app/home.module.css'
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

const featuredWorks = [
  {
    name: 'Vanguard Commerce',
    label: 'RETAIL_PRO',
    category: 'Web Design',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkI_G8k7OVJ__Jw7RUWIlQumE8CcojdO52CNw88NOh2gRv4ypI94Nv_GQhuq0d-aAQT8njrJgUQ7ouEApMYfAbiexDZgwSfPo--4ZjHx_kXhEorfOQTz-vpebNj_oKZeXRfXqUOfxjWmCvjXCCSVaU9n_5F7iHeFFyw5qwMCPXvcmAwrCJOIZ5giUy2Fo3vHTIEAmRPTCFGmKOfmillF7hcJKhX1sONLnaWM4W8wUMcq20HGYkOc0q-n77O-YnHHbQAbAtyhL3EoY',
    alt: 'Bold black and yellow e-commerce interface design',
    offset: false,
  },
  {
    name: 'Nexus CRM System',
    label: 'SAAS_TECH',
    category: 'Development',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfSXf6jzFAnVHfFOs7Hf-4nE6ubhwH_p1OXbGfztaLHas-wBOLz_IES4luo3kVcHeF6mFstwat2qrnkpidhGhN43NBHGWL0fTSFl-e-7c3-mWoBIL7MU0ghhyQVI0HKYfWq9eaFB1m2xCK-pP2CiT-O4nDNyrBHgxMLQ-s3AmVOcviDg6qaIbfkGT5n2fxg8o5TvWdDqsf9Ak9Kv_dEQ0QfcrimUheRN4RpOnhaGyY5lxpnTqAP5rbkBqKnmldk7uZ0FnDNp08slY',
    alt: 'Futuristic software landing page with code elements',
    offset: true,
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

const pricingPlans = [
  {
    name: 'Basic',
    price: 'Rp 5.9M',
    cta: 'Get Basic',
    accent: 'bg-white',
    highlighted: false,
    features: ['5 Pages Design', 'Mobile Responsive', 'Basic SEO Setup'],
  },
  {
    name: 'Standard',
    price: 'Rp 12.5M',
    cta: 'Get Standard',
    accent: 'bg-[#ffd600]',
    highlighted: true,
    features: [
      'Unlimited Pages',
      'CMS Integration',
      'Advanced SEO',
      'Custom Animations',
    ],
  },
  {
    name: 'Premium',
    price: 'Rp 25M+',
    cta: 'Get Custom',
    accent: 'bg-white',
    highlighted: false,
    features: [
      'Custom Software Dev',
      'E-commerce Engine',
      '24/7 Priority Support',
    ],
  },
] as const

export default async function Home() {
  const settings = await getSiteSettings()
  const whatsappHref = buildWhatsappHref(settings.whatsappNumber)

  return (
    <PublicSiteShell pageClassName={styles.page} activeNav="services">
      <main className="flex-grow">
        <section className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 py-20 md:flex-row md:items-center md:gap-16 md:px-8 md:py-24">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-black sm:text-6xl md:text-8xl">
              WE BUILD <br />
              <span className="inline-block bg-[#ffd600] px-2">WEBSITES</span>{' '}
              <br />
              THAT SELL
            </h1>

            <p className="max-w-xl border-l-8 border-black pl-6 text-lg font-bold uppercase italic md:text-2xl">
              Website bukan cuma tampilan, tapi alat jualan.
              <span className="ml-2 bg-black px-1 text-[#ffd600]">
                Engineering performance for business growth.
              </span>
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:gap-6">
              <Link
                className={`${styles.neoButton} justify-center bg-white px-8 py-4 text-lg text-black md:text-xl`}
                href="/portfolio"
              >
                Lihat Portfolio
              </Link>
              <a
                className={`${styles.neoButton} justify-center bg-[#ffd600] px-8 py-4 text-lg text-black md:text-xl`}
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                Konsultasi Sekarang
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className={`${styles.neoBox} rotate-2 bg-white p-4`}>
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
        </section>

        <section className="bg-black py-20 text-white md:py-24" id="services">
          <div className="mx-auto max-w-[1440px] px-6 md:px-8">
            <div className="mb-14 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
              <h2 className="text-4xl font-black uppercase italic tracking-[-0.08em] md:text-5xl">
                OUR SERVICES // core_functions
              </h2>
              <span className="text-lg font-black text-[#ffd600]">[01-03]</span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
              {services.map((service) => (
                <article
                  key={service.title}
                  className={`${styles.neoBox} group p-8 ${service.accent}`}
                >
                  <span
                    className={`mb-6 block w-fit p-2 text-4xl font-black leading-none ${service.iconClass}`}
                  >
                    {service.icon}
                  </span>
                  <h3 className="mb-4 text-3xl font-black uppercase tracking-[-0.05em]">
                    {service.title}
                  </h3>
                  <p className="mb-8 text-lg font-bold opacity-70">
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
        </section>

        <section
          className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-24"
          id="portfolio"
        >
          <div className="mb-14 border-l-[12px] border-black pl-6 md:mb-16 md:pl-8">
            <h2 className="text-5xl font-black uppercase tracking-[-0.08em] md:text-6xl">
              FEATURED_WORK
            </h2>
            <p className="text-xl font-bold uppercase opacity-60 md:text-2xl">
              Real results for real businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {featuredWorks.map((work) => (
              <article
                key={work.name}
                className={`space-y-6 ${work.offset ? 'md:mt-24' : ''}`}
              >
                <div className={`${styles.neoBox} group relative overflow-hidden`}>
                  <Image
                    alt={work.alt}
                    className="h-auto w-full grayscale transition-all duration-500 group-hover:grayscale-0"
                    height={900}
                    src={work.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    width={1200}
                  />
                  <div className="absolute left-4 top-4 bg-black px-4 py-1 text-sm font-black uppercase text-white">
                    {work.label}
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <h4 className="text-3xl font-black uppercase tracking-[-0.05em]">
                    {work.name}
                  </h4>
                  <span className="w-fit border-[3px] border-black bg-[#ffd600] px-3 py-1 text-lg font-bold uppercase">
                    {work.category}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="overflow-hidden border-y-[3px] border-black bg-[#ffd600] py-20 md:py-24"
          id="testimonials"
        >
          <div className="mx-auto max-w-[1440px] px-6 md:px-8">
            <div className={styles.marqueeTrack}>
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.author}-${index}`}
                  className={`${styles.neoBox} inline-block max-w-md shrink-0 whitespace-normal bg-white p-8`}
                >
                  <p className="mb-6 text-xl font-black italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <span className="block text-sm font-black uppercase">
                    - {testimonial.author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mx-auto max-w-[1440px] px-6 py-20 md:px-8 md:py-24"
          id="pricing"
        >
          <div className="mb-14 text-center md:mb-16">
            <h2 className="mb-4 text-5xl font-black uppercase italic tracking-[-0.08em] underline decoration-[#ffd600] decoration-8 underline-offset-8 md:text-6xl">
              CHOOSE_YOUR_PLAN
            </h2>
            <p className="text-xl font-bold uppercase opacity-60">
              Clear pricing. Zero hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`${styles.neoBox} relative flex h-full flex-col bg-white p-8 ${
                  plan.highlighted
                    ? 'scale-100 border-[#ffd600] shadow-[8px_8px_0px_0px_rgba(255,214,0,1)] md:scale-105'
                    : ''
                }`}
              >
                {plan.highlighted ? (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 border-[3px] border-black bg-black px-6 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#ffd600]">
                    Recommended
                  </div>
                ) : null}

                <div className="mb-8">
                  <h3 className="mb-2 text-2xl font-black uppercase">
                    {plan.name}
                  </h3>
                  <p className="text-5xl font-black tracking-[-0.08em] text-black">
                    {plan.price}
                  </p>
                </div>

                <ul className="mb-12 flex-grow space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm font-bold uppercase"
                    >
                      <span className="flex h-6 w-6 items-center justify-center bg-black text-base font-black text-[#ffd600]">
                        +
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  className={`${styles.neoButton} w-full justify-center py-3 text-black ${plan.accent}`}
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y-[3px] border-black bg-[#ffd600] py-24 md:py-32">
          <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-8">
            <h2 className="mb-10 text-5xl font-black uppercase italic leading-none tracking-[-0.08em] md:mb-12 md:text-9xl">
              SIAP NAIKIN <br /> BISNIS LO?
            </h2>
            <a
              className={`${styles.neoButton} group mx-auto inline-flex items-center gap-4 bg-black px-8 py-5 text-2xl text-[#ffd600] md:px-12 md:py-6 md:text-3xl`}
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
