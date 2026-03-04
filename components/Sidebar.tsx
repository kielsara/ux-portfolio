import Link from 'next/link'

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
  variant?: 'home' | 'case-study'
  /** Italic subtitle shown below back link (case-study variant) */
  intro?: string
  /** TOC entries (case-study variant) */
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
    groupLabel: 'Case Studies',
    items: [
      { href: '/case-study/project-one',   label: 'UX Audit',       sub: 'Synchrony analytics platform' },
      { href: '/case-study/project-two',   label: 'Design System',  sub: 'Component library & guidelines' },
      { href: '/case-study/project-three', label: 'Project Three',  sub: 'Coming soon' },
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

export default function Sidebar({ variant = 'home', intro, toc }: SidebarProps) {
  return (
    <aside className="sidebar">
      {variant === 'home' ? (
        <>
          <div className="sidebar-logo">
            <Link href="/">Sara Kiel</Link>
          </div>
          <nav className="nav">
            {NAV_GROUPS.map((group, i) => (
              <div key={i} className="nav-group">
                {group.groupLabel && (
                  <span className="nav-label">{group.groupLabel}</span>
                )}
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link"
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.label}
                    {item.sub && <span className="nav-sub">{item.sub}</span>}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </>
      ) : (
        <>
          <div className="sidebar-back">
            <Link href="/">← Index</Link>
          </div>
          {intro && <p className="sidebar-intro">{intro}</p>}
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
        </>
      )}
    </aside>
  )
}
