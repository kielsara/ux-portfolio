'use client'

import { useEffect, useRef } from 'react'

export type CanvasImageItem = {
  src: string
  alt: string
  width: number
  height: number
  x: number
  y: number
  rot: number
  objectFit?: 'cover' | 'contain'
}

const svgDataUri = (label: string, bg = '#2a2a34') =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320"><rect width="480" height="320" fill="${bg}"/><rect x="16" y="16" width="448" height="288" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)"/><text x="240" y="165" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif" font-size="22">${label}</text></svg>`)}`

const DEFAULT_CANVAS_ITEMS: CanvasImageItem[] = [
  { src: svgDataUri('Canvas Image 1', '#2f2d3d'), alt: 'Canvas image 1', width: 280, height: 185, x: 28, y: 62, rot: -1.8 },
  { src: svgDataUri('Canvas Image 2', '#243448'), alt: 'Canvas image 2', width: 250, height: 168, x: 330, y: 58, rot: 1.4 },
  { src: svgDataUri('Canvas Image 3', '#3b2f2d'), alt: 'Canvas image 3', width: 290, height: 190, x: 70, y: 270, rot: -0.9 },
  { src: svgDataUri('Canvas Image 4', '#263b34'), alt: 'Canvas image 4', width: 260, height: 175, x: 430, y: 258, rot: 0.9 },
]

// ─── Main component ───────────────────────────────────
interface DraggableCanvasProps {
  // Optional image tiles; pass different arrays per project page.
  items?: CanvasImageItem[]
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

  const allItems = items && items.length > 0 ? items : DEFAULT_CANVAS_ITEMS

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
        {/* Render each image tile */}
        {allItems.map((item, i) => {
          const dataAttrs = {
            'data-x':   String(item.x),
            'data-y':   String(item.y),
            'data-rot': String(item.rot),
          }
          return (
            <div key={i} {...dataAttrs} className="c-item c-screenshot c-canvas-image" style={{ width: `${item.width}px` }}>
              <div className="c-screenshot-inner" style={{ height: `${item.height}px` }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="c-canvas-image-img"
                  style={{ objectFit: item.objectFit ?? 'cover' }}
                  draggable={false}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="canvas-hint">drag each card to rearrange</div>
    </div>
  )
}
