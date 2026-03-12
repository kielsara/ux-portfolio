'use client'

import { useRef, useState, useCallback } from 'react'

interface Tool {
  name: string
  icon: string // path to icon in /public
}

const TOOLS: Tool[] = [
  { name: 'Figma', icon: '/tools/figma.png' },
  { name: 'Miro', icon: '/tools/miro.png' },
  { name: 'Photoshop', icon: '/tools/photoshop.png' },
  { name: 'Framer', icon: '/tools/framer.svg' },
  { name: 'Lucidchart', icon: '/tools/lucidchart.png' },
  { name: 'Lovable', icon: '/tools/lovable.png' },
  { name: 'Replit', icon: '/tools/replit.png' },
  { name: 'Canva', icon: '/tools/canva.png' },
  { name: 'Claude', icon: '/tools/claude.png' },
  { name: 'UserTesting', icon: '/tools/usertesting.png'},
  { name: 'Qualtrics', icon: '/tools/qualtrics.png' },
]

const BASE_SIZE = 48
const MAX_SIZE = 72
const INFLUENCE_RADIUS = 120 // px distance from cursor that triggers scaling

export default function ToolDock() {
  const dockRef = useRef<HTMLDivElement>(null)
  const [mouseX, setMouseX] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dockRef.current) return
    const rect = dockRef.current.getBoundingClientRect()
    setMouseX(e.clientX - rect.left)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseX(null)
  }, [])

  function getScale(index: number): number {
    if (mouseX === null) return 1
    const el = itemRefs.current[index]
    if (!el || !dockRef.current) return 1

    const dockRect = dockRef.current.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const elCenter = elRect.left + elRect.width / 2 - dockRect.left
    const distance = Math.abs(mouseX - elCenter)

    if (distance > INFLUENCE_RADIUS) return 1
    const proportion = 1 - distance / INFLUENCE_RADIUS
    return 1 + proportion * (MAX_SIZE / BASE_SIZE - 1)
  }

  return (
    <div
      ref={dockRef}
      className="tool-dock"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {TOOLS.map((tool, i) => {
        const scale = getScale(i)
        return (
          <div
            key={tool.name}
            ref={(el) => { itemRefs.current[i] = el }}
            className="tool-dock-item"
            style={{
              width: BASE_SIZE * scale,
              height: BASE_SIZE * scale,
            }}
          >
            <img
              src={tool.icon}
              alt={tool.name}
              className="tool-dock-icon"
              draggable={false}
            />
            <span className="tool-dock-label">{tool.name}</span>
          </div>
        )
      })}
    </div>
  )
}
