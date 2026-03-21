'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type PublicNavKey = 'services' | 'portfolio' | 'testimonials' | 'pricing'

interface NavItem {
  key: PublicNavKey
  label: string
  homeHref: string
  href: string
}

const navItems: NavItem[] = [
  { key: 'services', label: 'Services', homeHref: '#services', href: '/#services' },
  { key: 'portfolio', label: 'Portfolio', homeHref: '/portfolio', href: '/portfolio' },
  { key: 'testimonials', label: 'Testimonials', homeHref: '#testimonials', href: '/#testimonials' },
  { key: 'pricing', label: 'Pricing', homeHref: '#pricing', href: '/#pricing' },
]

function getNavClass(active: boolean) {
  if (active) {
    return 'border-b-[3px] border-[#ffd600] pb-1 text-sm font-black uppercase tracking-[-0.03em] text-black'
  }

  return 'text-sm font-black uppercase tracking-[-0.03em] text-black/60 transition-colors hover:text-black'
}

interface PublicNavbarProps {
  activeNav: PublicNavKey
  isHome: boolean
}

export default function PublicNavbar({ activeNav, isHome }: PublicNavbarProps) {
  const [currentNav, setCurrentNav] = useState<PublicNavKey>(activeNav)

  const resolveFromHash = useCallback(() => {
    if (!isHome || typeof window === 'undefined') return

    const hash = window.location.hash.replace('#', '') as PublicNavKey | ''
    if (hash && ['services', 'testimonials', 'pricing'].includes(hash)) {
      setCurrentNav(hash as PublicNavKey)
    }
  }, [isHome])

  useEffect(() => {
    if (!isHome) return

    resolveFromHash()

    const sectionIds: Array<PublicNavKey> = ['services', 'testimonials', 'pricing']
    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((entry) => entry.el != null)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))

        if (visibleEntries.length > 0) {
          const topSection = visibleEntries[0].target.id as PublicNavKey
          setCurrentNav(topSection)
        }
      },
      {
        root: null,
        rootMargin: '-50% 0px -40% 0px',
        threshold: [0.15, 0.5, 0.85],
      }
    )

    elements.forEach((entry) => observer.observe(entry.el!))

    window.addEventListener('hashchange', resolveFromHash)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', resolveFromHash)
    }
  }, [isHome, resolveFromHash])

  useEffect(() => {
    if (!isHome) {
      setCurrentNav(activeNav)
    }
  }, [isHome, activeNav])

  const linkData = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        href: isHome ? item.homeHref : item.href,
        active: isHome ? currentNav === item.key : activeNav === item.key,
      })),
    [activeNav, currentNav, isHome]
  )

  return (
    <div className="hidden items-center gap-6 md:flex">
      {linkData.map((item) => (
        <Link key={item.key} className={getNavClass(item.active)} href={item.href}>
          {item.label}
        </Link>
      ))}
    </div>
  )
}
