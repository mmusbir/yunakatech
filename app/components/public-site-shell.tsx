import type { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import {
  PUBLIC_CONTENT_CLASS,
  PUBLIC_FRAME_CLASS,
} from '@/app/lib/layout-widths'
import PublicNavbar from '@/app/components/public-navbar'
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

export default async function PublicSiteShell({
  children,
  pageClassName = '',
  activeNav,
}: PublicSiteShellProps) {
  const settings = await getSiteSettings()
  const whatsappHref = buildWhatsappHref(settings.whatsappNumber)
  const brandLabel = settings.logoText || settings.siteTitle
  const textBrandClassName = [
    'text-xl font-black uppercase tracking-[-0.08em] text-black md:text-2xl',
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
        <nav className={`${PUBLIC_FRAME_CLASS} py-3 md:py-4`}>
          <div
            className={`${PUBLIC_CONTENT_CLASS} flex w-full items-center justify-between`}
          >
            <Link
              className="flex min-h-8 items-center md:min-h-10"
              href="/"
            >
              {settings.logoImagePath ? (
                <Image
                  alt={brandLabel}
                  className="h-8 w-auto object-contain md:h-10"
                  height={48}
                  src={settings.logoImagePath}
                  width={180}
                />
              ) : (
                <span className={textBrandClassName}>{brandLabel}</span>
              )}
            </Link>

            <PublicNavbar activeNav={activeNav ?? 'services'} isHome={activeNav === 'services'} />

            <a
              className="hidden border-[3px] border-black bg-white px-5 py-2 text-xs font-black uppercase tracking-[-0.02em] text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-[#ffd600] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:inline-flex"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {children}

      <footer className="mt-auto border-t-[3px] border-black bg-white">
        <div className={`${PUBLIC_FRAME_CLASS} py-8 md:py-10`}>
          <div
            className={`${PUBLIC_CONTENT_CLASS} flex flex-col items-center justify-between gap-8 md:flex-row`}
          >
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="text-xl font-black text-black">
                {settings.logoImagePath ? (
                  <Image
                    alt={brandLabel}
                    className="mx-auto h-8 w-auto object-contain md:mx-0"
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
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/60">
                {settings.siteDescription}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                className="text-xs font-bold uppercase tracking-[0.16em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
                href="/#services"
              >
                Services
              </Link>
              <Link
                className="text-xs font-bold uppercase tracking-[0.16em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
                href="/portfolio"
              >
                Portfolio
              </Link>
              <a
                className="text-xs font-bold uppercase tracking-[0.16em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                Contact Us
              </a>
              <Link
                className="text-xs font-bold uppercase tracking-[0.16em] text-black transition-transform hover:scale-105 hover:underline hover:decoration-[3px] hover:decoration-[#ffd600]"
                href="/#pricing"
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
