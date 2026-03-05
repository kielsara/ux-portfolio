'use client'

import Link from 'next/link'
import { useEffect } from 'react'

// ── Types ──────────────────────────────────────────────
interface NavItem {
  href: string
  label: string
  sub?: string
  external?: boolean
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
      { href: '/selected-work/project-one',   label: 'UX Audit',       sub: 'Synchrony analytics platform' },
      { href: '/selected-work/project-two',   label: 'Design System',  sub: 'Component library & guidelines' },
      { href: '/selected-work/project-three', label: 'Project Three',  sub: 'Research synthesis' },
      { href: '/selected-work/project-four',  label: 'Project Four',   sub: 'Operational workflow redesign' },
      { href: '/selected-work/project-five',  label: 'Project Five',   sub: 'Accessibility uplift sprint' },
      { href: '/selected-work/project-six',   label: 'Project Six',    sub: 'Onboarding optimization' },
    ],
  },
  {
    groupLabel: 'Contact Info',
    items: [
      { href: 'mailto:smkiel2@illinois.edu',                   label: 'Email',    sub: 'Send me a message' },
      { href: 'https://linkedin.com/in/saramkiel',     label: 'LinkedIn', sub: "Connect with me", external: true },
      { href: '/resume.pdf',                            label: 'Resume',   sub: 'Download my resume (PDF)' },
    ],
  },
]

const ABOUT_ITEM = NAV_GROUPS[0].items[0]
const SELECTED_WORK_GROUP = NAV_GROUPS[1]
const CONTACT_GROUP = NAV_GROUPS[2]

export default function Sidebar({ variant = 'home', intro, toc }: SidebarProps) {
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
    <aside className="sidebar">
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
              {SELECTED_WORK_GROUP.items.map((item) => (
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

      {variant === 'project' && (
        <div className="sidebar-project-local">
          <div>
            <div className="sidebar-back">
              <Link href="/">← Index</Link>
            </div>
            {intro && <p className="sidebar-intro">{intro}</p>}
          </div>
          {toc && toc.length > 0 && (
            <nav className="toc">
              <span className="toc-label">On this page</span>
              {toc.map((entry) => (
                <a key={entry.id} href={`#${entry.id}`} className="toc-link">
                  <span className="toc-symbol">{entry.symbol}</span>
                  {entry.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      )}
    </aside>
  )
}
