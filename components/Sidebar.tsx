'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

// ── Types ──────────────────────────────────────────────
interface NavItem {
  href: string
  label: string
  sub?: string
  external?: boolean
  hidden?: boolean          // set to true to remove item from UI navigation
}

interface NavGroup {
  groupLabel?: string
  items: NavItem[]
}

export interface SidebarProps {
  /** Home sidebar: show logo + nav groups */
  variant?: 'home' | 'project'
  /** Italic subtitle shown below back link (project variant) */
  intro?: string
  /** TOC entries (project variant) */
  toc?: { id: string; symbol: string; label: string }[]
  /** Active TOC id (controlled externally via client component) */
  activeTocId?: string
}

// ── Shared nav data — edit this to match your projects ──
const NAV_GROUPS: NavGroup[] = [
  {
    items: [{ href: '/about', label: 'About' }],
  },
  {
    groupLabel: 'Selected Work',
    items: [
      { href: '/selected-work/project-one',   label: 'UX Audit & Redesign',       sub: 'Addressing Synchrony Analytics usability' },
      { href: '/selected-work/project-two',   label: 'Design System',  sub: 'Establishing a component library & guidelines' },
      { href: '/selected-work/project-three', label: 'UX/UI Design with AI',  sub: 'Prototyping a behavior reporting platform' },
      { href: '/selected-work/project-four',  label: 'UX/UI Concept Redesign',   sub: 'Reimagining Strava\'s mobile experience' },
      { href: '/selected-work/project-five',  label: 'CX Strategy & Design',   sub: 'Developing Busey\'s persona & journey map program' },
      { href: '/selected-work/project-six',   label: 'UX Research & Operations',    sub: 'Scaling research practices at Synchrony', hidden: true },
    ],
  },
  {
    groupLabel: 'Contact Info',
    items: [
      { href: 'mailto:smkiel2@illinois.edu',                   label: 'Email',    sub: 'Send me a message' },
      { href: 'https://linkedin.com/in/saramkiel',     label: 'LinkedIn', sub: "Connect with me", external: true },
      { href: '/Sara Kiel — Resume.pdf',                label: 'Resume',   sub: 'Download my resume (PDF)' },
    ],
  },
]

const ABOUT_ITEM = NAV_GROUPS[0].items[0]
const SELECTED_WORK_GROUP = NAV_GROUPS[1]
const CONTACT_GROUP = NAV_GROUPS[2]

interface LocalPageNavProps {
  intro?: string
  toc?: { id: string; symbol: string; label: string }[]
  persistInView?: boolean
}

export function LocalPageNav({ intro, toc, persistInView = false }: LocalPageNavProps) {
  const [activeId, setActiveId] = useState<string | null>(toc?.[0]?.id ?? null)
  const [isTopActive, setIsTopActive] = useState(true)

  useEffect(() => {
    if (!toc || toc.length === 0) {
      setActiveId(null)
      return
    }

    const sections = toc
      .map((entry) => document.getElementById(entry.id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    if (sections.length === 0) {
      setActiveId(toc[0].id)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 140) {
          return
        }

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: '-18% 0px -58% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    )

    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      if (window.scrollY < 140) {
        setIsTopActive(true)
        setActiveId(null)
        return
      }

      setIsTopActive(false)
      const nextSection = sections.findLast((section) => section.getBoundingClientRect().top <= 140)
      if (nextSection) {
        setActiveId((currentId) => (currentId === nextSection.id ? currentId : nextSection.id))
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [toc])

  return (
    <aside
      className={`local-sidebar${persistInView ? ' local-sidebar--fixed' : ''}`}
      aria-label="Local page navigation"
    >
      <div className="local-sidebar-inner">
        {intro && <p className="sidebar-intro">{intro}</p>}

        {toc && toc.length > 0 && (
          <nav className="local-toc">
            <span className="local-toc-label">On this page</span>
            <a
              href="#"
              className={`local-toc-link${isTopActive ? ' is-active' : ''}`}
              aria-current={isTopActive ? 'location' : undefined}
            >
              <span className="toc-symbol">↑</span>
              Top of Page
              <span className="local-toc-arrow" aria-hidden="true">
                {isTopActive ? '←' : ''}
              </span>
            </a>
            {toc.map((entry) => (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className={`local-toc-link${activeId === entry.id ? ' is-active' : ''}`}
                aria-current={activeId === entry.id ? 'location' : undefined}
              >
                <span className="toc-symbol">{entry.symbol}</span>
                {entry.label}
                <span className="local-toc-arrow" aria-hidden="true">
                  {activeId === entry.id ? '←' : ''}
                </span>
              </a>
            ))}
          </nav>
        )}
      </div>
    </aside>
  )
}

export default function Sidebar({ variant = 'home' }: SidebarProps) {
  const sidebarClassName = variant === 'project' ? 'sidebar sidebar--project-page' : 'sidebar'

  // Close other dropdowns when one opens
  useEffect(() => {
    const handleToggle = (e: Event) => {
      const target = e.target as HTMLDetailsElement
      if (!target.open) return
      
      // Close all other details elements in the nav
      const allDetails = document.querySelectorAll('.top-nav .menu-dropdown')
      allDetails.forEach((details) => {
        if (details !== target && details instanceof HTMLDetailsElement) {
          details.open = false
        }
      })
    }

    const allDetails = document.querySelectorAll('.top-nav .menu-dropdown')
    allDetails.forEach((details) => {
      details.addEventListener('toggle', handleToggle)
    })

    return () => {
      allDetails.forEach((details) => {
        details.removeEventListener('toggle', handleToggle)
      })
    }
  }, [])

  return (
    <aside className={sidebarClassName}>
      <div className="sidebar-primary">
        <div className="sidebar-logo">
          <Link href="/">Sara Kiel</Link>
        </div>

        <nav className="top-nav" aria-label="Primary navigation">
          <Link href={ABOUT_ITEM.href} className="top-nav-link">
            {ABOUT_ITEM.label}
          </Link>

          <details className="menu-dropdown">
            <summary className="top-nav-link top-nav-link--summary">Selected Work</summary>
            <div className="menu-panel" role="menu" aria-label="Selected Work links">
              {SELECTED_WORK_GROUP.items
                .filter(item => !item.hidden)
                .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  role="menuitem"
                >
                  {item.label}
                  {item.sub && <span className="nav-sub">{item.sub}</span>}
                </Link>
              ))}
            </div>
          </details>

          <details className="menu-dropdown">
            <summary className="top-nav-link top-nav-link--summary">Contact Info</summary>
            <div className="menu-panel" role="menu" aria-label="Contact links">
              {CONTACT_GROUP.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  role="menuitem"
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                  {item.sub && <span className="nav-sub">{item.sub}</span>}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </div>

    </aside>
  )
}
