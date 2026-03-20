import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { getSiteSettings } from '@/app/lib/site-settings'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: settings.siteTitle,
    description: settings.siteDescription,
    icons: settings.faviconPath
      ? {
          icon: settings.faviconPath,
          shortcut: settings.faviconPath,
          apple: settings.faviconPath,
        }
      : undefined,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
