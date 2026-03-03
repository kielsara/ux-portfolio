'use client'

import { useEffect, useRef } from 'react'

// ─── Canvas item types ────────────────────────────────
type NoteItem = {
  kind: 'note'
  color: 'c-pink' | 'c-blue' | 'c-green' | 'c-yellow'
  title: string
  body: string
  x: number; y: number; rot: number
}

type BadgeItem = {
  kind: 'badge'
  icon: string
  label: string
  name: string
  desc: string
  x: number; y: number; rot: number
  style?: React.CSSProperties
}

type ChartItem = {
  kind: 'chart'
  title: string
  bars: { label: string; pct: number; accent?: boolean }[]
  x: number; y: number; rot: number
}

type ScreenshotItem = {
  kind: 'screenshot'
  width: number
  height: number
  x: number; y: number; rot: number
  children: React.ReactNode
}

type CanvasItem = NoteItem | BadgeItem | ChartItem | ScreenshotItem

// ─── Default items — swap these for your own content ─
const CANVAS_ITEMS: CanvasItem[] = [
  {
    kind: 'note', color: 'c-pink', x: 28, y: 58, rot: -1.5,
    title: 'Low signal, high noise',
    body: 'System messages clutter threads. Notifications lack actionable context.',
  },
  {
    kind: 'note', color: 'c-green', x: 248, y: 48, rot: 1.2,
    title: 'Status confusion',
    body: "Clients can't tell what's happening or what to expect next. (~30% of messages asking for status)",
  },
  {
    kind: 'note', color: 'c-blue', x: 28, y: 280, rot: -1.0,
    title: 'Manual fragmented workflows',
    body: 'Ops manually relays info between parties. No structured handoffs.',
  },
  {
    kind: 'note', color: 'c-yellow', x: 248, y: 290, rot: 0.8,
    title: 'Tech & ops dependencies',
    body: 'Mobile app gaps force ops workarounds and server confusion.',
  },
  {
    kind: 'badge', x: 480, y: 68, rot: 2.0,
    icon: '✦', label: 'Claude AI', name: 'Analysis',
    desc: 'Classified 1,000+ chat threads by intent across 16 categories',
    style: { background: 'linear-gradient(140deg,#5e35ff,#a855f7)', color: '#fff' },
  },
  {
    kind: 'chart', x: 36, y: 200, rot: 1.5,
    title: 'Message intent breakdown',
    bars: [
      { label: 'Status',  pct: 78, accent: true },
      { label: 'ETA',     pct: 55 },
      { label: 'Address', pct: 36 },
      { label: 'Docs',    pct: 20 },
      { label: 'Other',   pct: 62 },
    ],
  },
]

// ─── Sub-renderers ────────────────────────────────────
function NoteCard({ item }: { item: NoteItem }) {
  return (
    <div className={`c-item c-note ${item.color}`}>
      <div className="c-note-title">{item.title}</div>
      <div className="c-note-body">{item.body}</div>
    </div>
  )
}

function BadgeCard({ item }: { item: BadgeItem }) {
  return (
    <div className="c-item c-badge" style={item.style}>
      <div className="c-badge-icon">{item.icon}</div>
      <div className="c-badge-label">{item.label}</div>
      <div className="c-badge-name">{item.name}</div>
      <div className="c-badge-desc">{item.desc}</div>
    </div>
  )
}

function ChartCard({ item }: { item: ChartItem }) {
  return (
    <div className="c-item c-chart-card">
      <div className="c-chart-title">{item.title}</div>
      <div className="mini-bar">
        {item.bars.map((bar) => (
          <div key={bar.label} className={`bar-row${bar.accent ? ' bar-accent' : ''}`}>
            <span className="bar-label">{bar.label}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${bar.pct}%` }} />
            </div>
            <span className="bar-pct">{Math.round(bar.pct * 0.41)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stacked bar chart SVG ────────────────────────────
function StackedBarSvg() {
  const rows = [
    [80, 40, 30, 20], [60, 55, 35, 15], [90, 30, 25, 25],
    [45, 65, 40, 20], [70, 50, 20, 30], [100, 25, 30, 15], [55, 70, 25, 20],
  ]
  const colors = ['#6e9fff', '#ff8c5a', '#a8d870', '#f5c842']
  return (
    <svg width="190" height="120" viewBox="0 0 190 120">
      <text x="0" y="10" fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">
        Job Status / Individual
      </text>
      {rows.map((row, ri) => {
        let x = 0
        return (
          <g key={ri}>
            {row.map((w, ci) => {
              const rect = <rect key={ci} x={x} y={18 + ri * 10} width={w} height={7} fill={colors[ci]} rx={1} />
              x += w
              return rect
            })}
          </g>
        )
      })}
    </svg>
  )
}

// ─── Histogram SVG ────────────────────────────────────
function HistogramSvg() {
  const bars = [40, 55, 20, 50, 15, 35, 60, 45, 65]
  return (
    <svg width="175" height="115" viewBox="0 0 175 115">
      <text x="0" y="10" fontSize="6" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif">
        Messages by category
      </text>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 18}
          y={95 - h}
          width={14}
          height={h}
          fill={i === 4 ? '#c8622a' : '#9b8af5'}
          rx={2}
        />
      ))}
      <line x1={0} y1={95} x2={165} y2={95} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
    </svg>
  )
}

// ─── Data table ───────────────────────────────────────
function DataTable() {
  const rows = [
    ['0 chats',   '404', '109', '100'],
    ['1–3 chats', '723', '268', '210'],
    ['4–6 chats', '450', '244', '263'],
    ['7–10',      '302', '269', '301'],
    ['10+',       '188', '284', '234'],
  ]
  const cols = ['chat_band', 'total_jobs', 'avg_chats', 'churn_count']
  return (
    <div style={{ padding: '12px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)' }}>
      <div style={{ display: 'flex', gap: '8px', color: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
        {cols.map(c => <span key={c} style={{ minWidth: '44px' }}>{c}</span>)}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
          {row.map((cell, j) => <span key={j} style={{ minWidth: '44px' }}>{cell}</span>)}
        </div>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────
interface DraggableCanvasProps {
  /** Optional additional items to render */
  items?: CanvasItem[]
}

export default function DraggableCanvas({ items }: DraggableCanvasProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const topZRef = useRef(10)

  // ── Position + drag setup ─────────────────────────
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const cItems = Array.from(viewport.querySelectorAll<HTMLElement>('.c-item'))

    // Apply initial position & rotation from data attrs
    cItems.forEach(el => {
      el.style.left      = (parseFloat(el.dataset.x  ?? '0')) + 'px'
      el.style.top       = (parseFloat(el.dataset.y  ?? '0')) + 'px'
      el.style.transform = `rotate(${parseFloat(el.dataset.rot ?? '0')}deg)`
    })

    // Make each element draggable
    const cleanups: (() => void)[] = []

    cItems.forEach(el => {
      let isDragging = false
      let startCX = 0, startCY = 0, startL = 0, startT = 0
      const originRot = parseFloat(el.dataset.rot ?? '0')

      function onStart(cx: number, cy: number) {
        isDragging = true
        startCX = cx; startCY = cy
        startL = parseFloat(el.style.left) || 0
        startT = parseFloat(el.style.top)  || 0
        el.classList.add('dragging')
        el.style.zIndex = String(++topZRef.current)
        el.style.transform = `rotate(${originRot + 1.5}deg) scale(1.03)`
      }

      function onMove(cx: number, cy: number) {
        if (!isDragging) return
        const currentViewport = viewportRef.current
        if (!currentViewport) return
        const vw = currentViewport.clientWidth
        const vh = currentViewport.clientHeight
        const ew = el.offsetWidth
        const eh = el.offsetHeight
        el.style.left = Math.max(0, Math.min(vw - ew, startL + cx - startCX)) + 'px'
        el.style.top  = Math.max(38, Math.min(vh - eh, startT + cy - startCY)) + 'px'
      }

      function onEnd() {
        if (!isDragging) return
        isDragging = false
        el.classList.remove('dragging')
        el.style.transform = `rotate(${originRot}deg)`
      }

      // Mouse
      const md = (e: MouseEvent) => { e.preventDefault(); onStart(e.clientX, e.clientY) }
      const mm = (e: MouseEvent) => onMove(e.clientX, e.clientY)
      const mu = () => onEnd()
      el.addEventListener('mousedown', md)
      window.addEventListener('mousemove', mm)
      window.addEventListener('mouseup', mu)

      // Touch
      const ts = (e: TouchEvent) => onStart(e.touches[0].clientX, e.touches[0].clientY)
      const tm = (e: TouchEvent) => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY) }
      const te = () => onEnd()
      el.addEventListener('touchstart', ts, { passive: true })
      el.addEventListener('touchmove',  tm, { passive: false })
      el.addEventListener('touchend',   te)

      cleanups.push(() => {
        el.removeEventListener('mousedown', md)
        window.removeEventListener('mousemove', mm)
        window.removeEventListener('mouseup', mu)
        el.removeEventListener('touchstart', ts)
        el.removeEventListener('touchmove', tm)
        el.removeEventListener('touchend', te)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  // ── TOC active link observer ──────────────────────
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const links    = document.querySelectorAll<HTMLAnchorElement>('.toc-link')

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'))
          const active = document.querySelector<HTMLAnchorElement>(`.toc-link[href="#${entry.target.id}"]`)
          if (active) active.classList.add('active')
        }
      })
    }, { rootMargin: '-20% 0px -60% 0px' })

    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const allItems = [...CANVAS_ITEMS, ...(items ?? [])]

  return (
    <div className="canvas-wrapper">
      {/* Title bar */}
      <div className="canvas-titlebar">
        <div className="canvas-titlebar-dots">
          <div className="tbar-dot" style={{ background: '#ff5f57' }} />
          <div className="tbar-dot" style={{ background: '#febc2e' }} />
          <div className="tbar-dot" style={{ background: '#28c840' }} />
        </div>
        <span className="canvas-titlebar-label">Research Canvas</span>
      </div>

      <div className="canvas-viewport" ref={viewportRef}>
        {/* Render each item */}
        {allItems.map((item, i) => {
          const dataAttrs = {
            'data-x':   String(item.x),
            'data-y':   String(item.y),
            'data-rot': String(item.rot),
          }

          if (item.kind === 'note') {
            return (
              <div key={i} {...dataAttrs} className={`c-item c-note ${item.color}`}>
                <div className="c-note-title">{item.title}</div>
                <div className="c-note-body">{item.body}</div>
              </div>
            )
          }

          if (item.kind === 'badge') {
            return (
              <div key={i} {...dataAttrs} className="c-item c-badge" style={item.style}>
                <div className="c-badge-icon">{item.icon}</div>
                <div className="c-badge-label">{item.label}</div>
                <div className="c-badge-name">{item.name}</div>
                <div className="c-badge-desc">{item.desc}</div>
              </div>
            )
          }

          if (item.kind === 'chart') {
            return (
              <div key={i} {...dataAttrs} className="c-item c-chart-card">
                <div className="c-chart-title">{item.title}</div>
                <div className="mini-bar">
                  {item.bars.map(bar => (
                    <div key={bar.label} className={`bar-row${bar.accent ? ' bar-accent' : ''}`}>
                      <span className="bar-label">{bar.label}</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${bar.pct}%` }} /></div>
                      <span className="bar-pct">{Math.round(bar.pct * 0.41)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          return null
        })}

        {/* Hardcoded chart screenshots — replace with <Image> tags when you have real screenshots */}
        <div className="c-item c-screenshot" data-x="470" data-y="200" data-rot="-1.2" style={{ width: '220px' }}>
          <div className="c-screenshot-inner" style={{ height: '155px', background: 'linear-gradient(160deg,#1e1e24,#2a2a34)' }}>
            <StackedBarSvg />
          </div>
        </div>

        <div className="c-item c-screenshot" data-x="590" data-y="200" data-rot="0.8" style={{ width: '200px' }}>
          <div className="c-screenshot-inner" style={{ height: '140px', background: 'linear-gradient(160deg,#1a1a22,#22222e)' }}>
            <HistogramSvg />
          </div>
        </div>

        <div className="c-item c-screenshot" data-x="480" data-y="355" data-rot="-0.5" style={{ width: '240px' }}>
          <div className="c-screenshot-inner" style={{ height: '130px', background: '#1a2030', alignItems: 'stretch', justifyContent: 'flex-start' }}>
            <DataTable />
          </div>
        </div>
      </div>

      <div className="canvas-hint">drag each card to rearrange</div>
    </div>
  )
}
