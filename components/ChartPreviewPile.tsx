'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { ChartPreviewItem } from '@/lib/selectedWork'

type ChartPreviewPileProps = {
  previews: ChartPreviewItem[]
}

const LAYOUT = [
  { x: 0.04, y: 0.08, rot: -5.5 },
  { x: 0.18, y: 0.16, rot: 4.2 },
  { x: 0.30, y: 0.24, rot: -3.8 },
  { x: 0.44, y: 0.32, rot: 5.1 },
  { x: 0.56, y: 0.40, rot: -4.6 },
  { x: 0.70, y: 0.48, rot: 3.3 },
  { x: 0.82, y: 0.56, rot: -2.7 },
  { x: 0.12, y: 0.64, rot: 4.6 },
  { x: 0.26, y: 0.72, rot: -3.1 },
  { x: 0.38, y: 0.20, rot: 3.9 },
  { x: 0.52, y: 0.28, rot: -4.9 },
  { x: 0.64, y: 0.36, rot: 2.7 },
  { x: 0.75, y: 0.52, rot: -2.2 },
  { x: 0.90, y: 0.60, rot: 4.0 },
  { x: 0.58, y: 0.72, rot: -3.6 },
]

const getLayoutSlot = (index: number) => {
  return LAYOUT[index % LAYOUT.length]
}

export default function ChartPreviewPile({ previews }: ChartPreviewPileProps) {
  const pileRef = useRef<HTMLDivElement>(null)
  const topZRef = useRef(previews.length + 10)

  useEffect(() => {
    const pile = pileRef.current
    if (!pile) return

    const cards = Array.from(pile.querySelectorAll<HTMLElement>('.chart-pile-card'))

    const layoutCards = () => {
      const boundsWidth = pile.clientWidth
      const boundsHeight = pile.clientHeight

      cards.forEach((card, index) => {
        const slot = getLayoutSlot(index)
        const cardWidth = card.offsetWidth
        const cardHeight = card.offsetHeight
        const maxLeft = Math.max(0, boundsWidth - cardWidth)
        const maxTop = Math.max(0, boundsHeight - cardHeight)
        const left = Math.round(slot.x * maxLeft)
        const top = Math.round(slot.y * maxTop)

        card.dataset.rot = String(slot.rot)
        card.style.left = `${left}px`
        card.style.top = `${top}px`
        card.style.transform = `rotate(${slot.rot}deg)`
        card.style.zIndex = String(index + 1)
      })

      topZRef.current = cards.length + 10
    }

    layoutCards()
    window.addEventListener('resize', layoutCards)

    const cleanups: Array<() => void> = []

    cards.forEach(card => {
      let activePointerId: number | null = null
      let startClientX = 0
      let startClientY = 0
      let startLeft = 0
      let startTop = 0

      const getRotation = () => parseFloat(card.dataset.rot ?? '0')

      const handlePointerDown = (event: PointerEvent) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return

        activePointerId = event.pointerId
        startClientX = event.clientX
        startClientY = event.clientY
        startLeft = parseFloat(card.style.left) || 0
        startTop = parseFloat(card.style.top) || 0

        card.setPointerCapture(event.pointerId)
        card.classList.add('dragging')
        card.style.zIndex = String(++topZRef.current)
        card.style.transform = `rotate(${getRotation() + 1.4}deg) scale(1.02)`
      }

      const handlePointerMove = (event: PointerEvent) => {
        if (activePointerId !== event.pointerId) return

        event.preventDefault()
        const currentPile = pileRef.current
        if (!currentPile) return

        const maxLeft = Math.max(0, currentPile.clientWidth - card.offsetWidth)
        const maxTop = Math.max(0, currentPile.clientHeight - card.offsetHeight)
        const nextLeft = startLeft + event.clientX - startClientX
        const nextTop = startTop + event.clientY - startClientY

        card.style.left = `${Math.max(0, Math.min(maxLeft, nextLeft))}px`
        card.style.top = `${Math.max(0, Math.min(maxTop, nextTop))}px`
      }

      const handlePointerUp = (event: PointerEvent) => {
        if (activePointerId !== event.pointerId) return

        activePointerId = null
        if (card.hasPointerCapture(event.pointerId)) {
          card.releasePointerCapture(event.pointerId)
        }

        card.classList.remove('dragging')
        card.style.transform = `rotate(${getRotation()}deg)`
      }

      card.addEventListener('pointerdown', handlePointerDown)
      card.addEventListener('pointermove', handlePointerMove)
      card.addEventListener('pointerup', handlePointerUp)
      card.addEventListener('pointercancel', handlePointerUp)

      cleanups.push(() => {
        card.removeEventListener('pointerdown', handlePointerDown)
        card.removeEventListener('pointermove', handlePointerMove)
        card.removeEventListener('pointerup', handlePointerUp)
        card.removeEventListener('pointercancel', handlePointerUp)
      })
    })

    return () => {
      window.removeEventListener('resize', layoutCards)
      cleanups.forEach(cleanup => cleanup())
    }
  }, [previews])

  return (
    <div className="chart-pile-wrapper">
      <div className="chart-pile-stage" ref={pileRef} aria-label="Draggable pile of chart and graph component previews">
        {previews.map(preview => (
          <article key={preview.title} className="chart-pile-card">
            <div className="chart-pile-frame">
              <Image
                src={preview.src}
                alt={preview.alt}
                fill
                sizes="(max-width: 720px) 34vw, (max-width: 1180px) 22vw, 200px"
                className="chart-pile-image"
                style={{ objectPosition: preview.objectPosition }}
                draggable={false}
              />
              <div className="chart-pile-sheen" aria-hidden="true" />
            </div>
            <h4 className="chart-pile-title">{preview.title}</h4>
          </article>
        ))}
      </div>
      <p className="chart-pile-hint">drag cards around to reveal more of the pile</p>
    </div>
  )
}