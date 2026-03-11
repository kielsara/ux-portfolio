'use client'

import Link from 'next/link'
import { useRef, useState, useCallback, useEffect } from 'react'

// ── Edit this array to add/remove your projects ──
// (mark an entry with `hidden: true` to remove it from the UI temporarily)
const ALL_PROJECTS = [
  { id: 'project-one',   label: 'Project One',   gradient: 'linear-gradient(135deg,#d4c5b0,#a89880)', hasLink: true,  alt: 'Screenshot of Project One' },
  { id: 'project-two',   label: 'Project Two',   gradient: 'linear-gradient(135deg,#b8c9d4,#8aaab8)', hasLink: true,  alt: 'Screenshot of Project Two' },
  { id: 'project-three', label: 'Project Three', gradient: 'linear-gradient(135deg,#c9c0d3,#9e91b0)', hasLink: true, alt: 'Screenshot of Project Three' },
  { id: 'project-four',  label: 'Project Four',  gradient: 'linear-gradient(135deg,#d4b0b0,#b88080)', hasLink: true,  alt: 'Screenshot of Project Four' },
  { id: 'project-five',  label: 'Project Five',  gradient: 'linear-gradient(135deg,#b0d4c0,#80b898)', hasLink: true, alt: 'Screenshot of Project Five' },
  { id: 'project-six',   label: 'Project Six',   gradient: 'linear-gradient(135deg,#d4d0b0,#b8b080)', hasLink: true,  alt: 'Screenshot of Project Six', hidden: true },
]

// filter out any hidden entries before rendering
const PROJECTS = ALL_PROJECTS.filter(p => !p.hidden)

// Triple set for seamless infinite manual navigation
const CARDS = [...PROJECTS, ...PROJECTS, ...PROJECTS]
const PROJECT_COUNT = PROJECTS.length
const CARD_WIDTH_WITH_GAP = 320 + 20
const MIDDLE_SET_START = PROJECT_COUNT
const MIDDLE_SET_END = PROJECT_COUNT * 2

const normalizeIndex = (index: number) => {
  return ((index % PROJECT_COUNT) + PROJECT_COUNT) % PROJECT_COUNT
}

export default function Marquee() {
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [currentVirtualIndex, setCurrentVirtualIndex] = useState(MIDDLE_SET_START)
  const [isManualMode, setIsManualMode] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const recenterTimeoutRef = useRef<number | null>(null)

  const currentIndex = normalizeIndex(currentVirtualIndex)

  // Derived: animation should stop if paused by user, hover, focus, or in manual mode
  const shouldPause = paused || hovering || focused || isManualMode

  // Navigate to a specific slide
  const goToSlide = useCallback((virtualIndex: number) => {
    const track = trackRef.current
    if (!track) return
    
    // Enter manual mode and pause
    setIsManualMode(true)
    setPaused(true)
    setCurrentVirtualIndex(virtualIndex)
    
    const offset = -(virtualIndex * CARD_WIDTH_WITH_GAP)
    
    // Fully stop the CSS marquee animation so inline transform takes effect
    track.style.animation = 'none'
    track.style.transition = 'transform 0.5s ease'
    track.style.transform = `translateX(${offset}px)`

    if (recenterTimeoutRef.current) {
      window.clearTimeout(recenterTimeoutRef.current)
    }

    recenterTimeoutRef.current = window.setTimeout(() => {
      const currentTrack = trackRef.current
      if (!currentTrack) return

      let recenteredIndex = virtualIndex
      if (virtualIndex < MIDDLE_SET_START) {
        recenteredIndex = virtualIndex + PROJECT_COUNT
      } else if (virtualIndex >= MIDDLE_SET_END) {
        recenteredIndex = virtualIndex - PROJECT_COUNT
      }

      if (recenteredIndex !== virtualIndex) {
        setCurrentVirtualIndex(recenteredIndex)
        currentTrack.style.transition = 'none'
        currentTrack.style.transform = `translateX(${-recenteredIndex * CARD_WIDTH_WITH_GAP}px)`

        requestAnimationFrame(() => {
          const updatedTrack = trackRef.current
          if (!updatedTrack) return
          updatedTrack.style.transition = 'transform 0.5s ease'
        })
      }
    }, 520)
  }, [])

  // focus the active card when index changes in manual mode
  useEffect(() => {
    if (!isManualMode) return
    const track = trackRef.current
    if (!track) return
    const sel = `.marquee-card[data-virtual-index="${currentVirtualIndex}"]`
    const el = track.querySelector(sel) as HTMLElement | null
    if (el) el.focus()
  }, [currentVirtualIndex, isManualMode])

  useEffect(() => {
    return () => {
      if (recenterTimeoutRef.current) {
        window.clearTimeout(recenterTimeoutRef.current)
      }
    }
  }, [])

  // Announce slide info to screen readers
  const [announcement, setAnnouncement] = useState('')

  // Navigate prev/next
  const navigateAndAnnounce = useCallback((direction: 'prev' | 'next') => {
    // ensure carousel is paused when manually navigating
    setPaused(true)

    const nextVirtualIndex = direction === 'next'
      ? currentVirtualIndex + 1
      : currentVirtualIndex - 1
    const nextProjectIndex = normalizeIndex(nextVirtualIndex)

    goToSlide(nextVirtualIndex)
    setAnnouncement(`Showing ${PROJECTS[nextProjectIndex].label}, slide ${nextProjectIndex + 1} of ${PROJECTS.length}`)
  }, [currentVirtualIndex, goToSlide])

  

  return (
    <>
      <section
        className="marquee-wrapper"
        aria-label={`Selected Work slideshow, ${PROJECTS.length} projects`}
        aria-roledescription="carousel"
      >
        {/* Screen-reader live region for control announcements */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {announcement}
        </div>

        {/* Slide count hint for screen readers */}
        <p className="sr-only">
          Showing {PROJECTS.length} projects. Use the previous and next buttons to browse,
          or pause the slideshow with the pause button.
        </p>

        <div
          className={`marquee-track${shouldPause ? ' marquee-track--paused' : ''}`}
          ref={trackRef}
          aria-label="Project cards"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={() => setFocused(false)}
        >
        {CARDS.map((project, i) => {
          const projectIndex = normalizeIndex(i)
          const isMiddleSet = i >= MIDDLE_SET_START && i < MIDDLE_SET_END
          const isActive = i === currentVirtualIndex
          return (
            <div
              key={`${project.id}-${i}`}
              className={"marquee-card" + (isActive ? ' marquee-card--active' : '')}
              role="group"
              aria-roledescription="slide"
              aria-label={`${project.label}, slide ${projectIndex + 1} of ${PROJECTS.length}`}
              // Hide duplicated cards from screen readers
              aria-hidden={!isMiddleSet ? true : undefined}
              data-virtual-index={i}
              tabIndex={isActive ? 0 : -1}
            >
              {/* Replace the div below with an <Image> when you have real screenshots */}
              <div
                className="marquee-card-img"
                style={{ background: project.gradient, width: '100%', height: '100%' }}
                role="img"
                aria-label={project.alt}
              />
              <div className="card-label">
                <span>{project.label}</span>
                {project.hasLink && (
                  <Link href={`/selected-work/${project.id}`}>View →</Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
      </section>

      {/* Carousel controls */}
      <div className="marquee-controls" role="group" aria-label="Slideshow controls">
        <button
          className="marquee-btn"
          onClick={() => navigateAndAnnounce('prev')}
          aria-label="Previous project"
          type="button"
        >
          {/* Left arrow */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className="marquee-btn marquee-btn--pause"
          onClick={() => {
            const newPaused = !paused
            setPaused(newPaused)
            if (newPaused) {
              // When pausing, enter manual mode and snap to nearest card
              setIsManualMode(true)
              const track = trackRef.current
              if (track) {
                const computed = getComputedStyle(track).transform
                let currentX = 0
                if (computed && computed !== 'none') {
                  const match = computed.match(/matrix\(1,\s*0,\s*0,\s*1,\s*(-?[\d.]+),/)
                  if (match) currentX = parseFloat(match[1])
                }
                const rawIndex = Math.round(Math.abs(currentX) / CARD_WIDTH_WITH_GAP)
                const snapIndex = normalizeIndex(rawIndex)
                const snapVirtualIndex = MIDDLE_SET_START + snapIndex
                goToSlide(snapVirtualIndex)
                setAnnouncement(`Slideshow paused on ${PROJECTS[snapIndex].label}`)
              }
            } else {
              // Resume auto-scroll
              setIsManualMode(false)
              setAnnouncement('Slideshow resumed')
              if (trackRef.current) {
                trackRef.current.style.transition = ''
                trackRef.current.style.transform = ''
                // restore CSS animation
                trackRef.current.style.animation = ''
              }
            }
          }}
          aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
          aria-pressed={paused}
          type="button"
        >
          {paused ? (
            /* Play icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <path d="M5 3l8 5-8 5V3z" fill="currentColor"/>
            </svg>
          ) : (
            /* Pause icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
              <rect x="4" y="3" width="3" height="10" rx="1" fill="currentColor"/>
              <rect x="9" y="3" width="3" height="10" rx="1" fill="currentColor"/>
            </svg>
          )}
        </button>

        <button
          className="marquee-btn"
          onClick={() => navigateAndAnnounce('next')}
          aria-label="Next project"
          type="button"
        >
          {/* Right arrow */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Visible caption for quick feedback during debugging/navigation */}
      <div className="marquee-caption" aria-hidden="true">
        {PROJECTS[currentIndex]?.label || ''}
      </div>
    </>
  )
}
