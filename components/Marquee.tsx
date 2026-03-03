'use client'

import Link from 'next/link'
import { useRef, useState, useCallback, useEffect } from 'react'

// ── Edit this array to add/remove your projects ──
const PROJECTS = [
  { id: 'project-one',   label: 'Project One',   gradient: 'linear-gradient(135deg,#d4c5b0,#a89880)', hasLink: true,  alt: 'Screenshot of Project One' },
  { id: 'project-two',   label: 'Project Two',   gradient: 'linear-gradient(135deg,#b8c9d4,#8aaab8)', hasLink: true,  alt: 'Screenshot of Project Two' },
  { id: 'project-three', label: 'Project Three', gradient: 'linear-gradient(135deg,#c9c0d3,#9e91b0)', hasLink: false, alt: 'Screenshot of Project Three' },
  { id: 'project-four',  label: 'Project Four',  gradient: 'linear-gradient(135deg,#d4b0b0,#b88080)', hasLink: true,  alt: 'Screenshot of Project Four' },
  { id: 'project-five',  label: 'Project Five',  gradient: 'linear-gradient(135deg,#b0d4c0,#80b898)', hasLink: false, alt: 'Screenshot of Project Five' },
  { id: 'project-six',   label: 'Project Six',   gradient: 'linear-gradient(135deg,#d4d0b0,#b8b080)', hasLink: true,  alt: 'Screenshot of Project Six' },
]

// Duplicate for seamless CSS loop
const CARDS = [...PROJECTS, ...PROJECTS]

export default function Marquee() {
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isManualMode, setIsManualMode] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Derived: animation should stop if paused by user, hover, focus, or in manual mode
  const shouldPause = paused || hovering || focused || isManualMode

  // Navigate to a specific slide
  const goToSlide = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    
    // Enter manual mode and pause
    setIsManualMode(true)
    setPaused(true)
    setCurrentIndex(index)
    
    const cardWidth = 320 + 20 // card width + gap
    const offset = -(index * cardWidth)
    
    // Fully stop the CSS marquee animation so inline transform takes effect
    track.style.animation = 'none'
    track.style.transition = 'transform 0.5s ease'
    track.style.transform = `translateX(${offset}px)`
  }, [])

  // focus the active card when index changes in manual mode
  useEffect(() => {
    if (!isManualMode) return
    const track = trackRef.current
    if (!track) return
    const sel = `.marquee-card[data-slide-index="${currentIndex}"]`
    const el = track.querySelector(sel) as HTMLElement | null
    if (el) el.focus()
  }, [currentIndex, isManualMode])

  // Announce slide info to screen readers
  const [announcement, setAnnouncement] = useState('')

  // Navigate prev/next
  const navigateAndAnnounce = useCallback((direction: 'prev' | 'next') => {
    // ensure carousel is paused when manually navigating
    setPaused(true)

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    
    // Wrap around
    if (nextIndex < 0) nextIndex = PROJECTS.length - 1
    if (nextIndex >= PROJECTS.length) nextIndex = 0
    
    console.log('[Marquee] navigate', direction, 'from', currentIndex, 'to', nextIndex)
    goToSlide(nextIndex)
    setAnnouncement(`Showing ${PROJECTS[nextIndex].label}, slide ${nextIndex + 1} of ${PROJECTS.length}`)
  }, [currentIndex, goToSlide])

  

  return (
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
          const isOriginal = i < PROJECTS.length
          const slideIndex = isOriginal ? i : i - PROJECTS.length
          const isActive = isOriginal && slideIndex === currentIndex
          return (
            <div
              key={`${project.id}-${i}`}
              className={"marquee-card" + (isActive ? ' marquee-card--active' : '')}
              role="group"
              aria-roledescription="slide"
              aria-label={`${project.label}, slide ${(i % PROJECTS.length) + 1} of ${PROJECTS.length}`}
              // Hide duplicated cards from screen readers
              aria-hidden={!isOriginal ? true : undefined}
              data-slide-index={isOriginal ? slideIndex : undefined}
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
                  <Link href={`/case-study/${project.id}`}>View →</Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

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
                const cardWidth = 320 + 20
                const snapIndex = Math.round(Math.abs(currentX) / cardWidth) % PROJECTS.length
                setCurrentIndex(snapIndex)
                goToSlide(snapIndex)
              }
              setAnnouncement(`Slideshow paused on ${PROJECTS[currentIndex].label}`)
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
    </section>
  )
}
