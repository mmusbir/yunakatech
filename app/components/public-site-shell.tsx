import type { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import {
  buildWhatsappHref,
  getSiteSettings,
} from '@/app/lib/site-settings'

const inter = Inter({
  subsets: ['latin'],
})

type PublicNavKey = 'services' | 'portfolio' | 'testimonials' | 'pricing'

interface PublicSiteShellProps {
  children: ReactNode
  pageClassName?: string
  activeNav?: PublicNavKey
}

const navItems: Array<{
  key: PublicNavKey
  label: string
  homeHref: string
  href: string
}> = [
  {
    key: 'services',
    label: 'Services',
    homeHref: '#services',
    href: '/#services',
  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    homeHref: '/portfolio',
    href: '/portfolio',
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    homeHref: '#testimonials',
    href: '/#testimonials',
  },
  {
    key: 'pricing',
    label: 'Pricing',
    homeHref: '#pricing',
    href: '/#pricing',
  },
]

function getNavClass(active: boolean) {
  if (active) {
    return 'border-b-[3px] border-[#ffd600] pb-1 text-sm font-black uppercase tracking-[-0.03em] text-black'
  }

  return 'text-sm font-black uppercase tracking-[-0.03em] text-black/60 transition-colors hover:text-black'
}

export default async function PublicSiteShell({
  children,
  pageClassName = '',
  activeNav,
}: PublicSiteShellProps) {
  const settings = await getSiteSettings()
  const whatsappHref = buildWhatsappHref(settings.whatsappNumber)
  const brandLabel = settings.logoText || settings.siteTitle
  const textBrandClassName = [
    'text-2xl font-black uppercase tracking-[-0.08em] text-black md:text-3xl',
    settings.logoTextItalic ? 'italic' : '',
    settings.hideLogoText ? 'sr-only' : '',
  ]
    .filter(Boolean)
    .join(' ')
  const shellClassName =
    `${inter.className} flex min-h-screen flex-col ${pageClassName}`.trim()

  return (
    <div className={shellClassName}>
      <header className="sticky top-0 z-50 border-b-[3px] border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
        <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 md:px-8">
          <Link
            className="flex min-h-10 items-center md:min-h-12"
            href="/"
          >
            {settings.logoImagePath ? (
              <Image
                alt={brandLabel}
                className="h-10 w-auto object-contain md:h-12"
                height={48}
                src={settings.logoImagePath}
                width={180}
              />
            ) : (
              <span className={textBrandClassName}>{brandLabel}</span>
            )}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const href = activeNav === 'services' ? item.homeHref : item.href

              return (
                <Link
                  key={item.key}
                  className={getNavClass(activeNav === item.key)}
                  href={href}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <a
            className="hidden border-[3px] border-black bg-white px-6 py-2 text-sm font-black uppercase tracking-[-0.02em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#ffd600] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:inline-flex"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
          >
            Get Started
          </a>
        </nav>
      </header>

      {children}

      <footer className="mt-auto border-t-[3px] border-black bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row md:px-12 md:py-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div className="text-2xl font-black text-black">
              {settings.logoImagePath ? (
                <Image
                  alt={brandLabel}
                  className="mx-auto h-10 w-auto object-contain md:mx-0"
                  height={40}
                  src={settings.logoImagePath}
                  width={160}
                />
              ) : (
                <span
                  className={[
                    settings.logoTextItalic ? 'italic' : '',
                    settings.hideLogoText ? 'sr-only' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {brandLabel}
                </span>
              )}
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/60">
              {settings.siteDescription}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link
              className="text-sm font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
              href="/#services"
            >
              Services
            </Link>
            <Link
              className="text-sm font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
              href="/portfolio"
            >
              Portfolio
            </Link>
            <a
              className="text-sm font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Contact Us
            </a>
            <Link
              className="text-sm font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
              href="/#pricing"
            >
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
