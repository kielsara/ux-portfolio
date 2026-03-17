'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

const ALL_PROJECTS = [
  {
    id: 'project-one',
    title: 'UX Audit & Redesign',
    subtitle: 'Addressing Synchrony Analytics usability',
    role: 'UX/UI Design Intern',
    methods: ['Heuristic Evaluation', 'WCAG Accessibility', 'Data Viz Best Practices'],
    image: '/selected-work/project-one/cover.png',
    gradient: 'linear-gradient(135deg,#d4c5b0,#a89880)',
    hasLink: true,
    alt: 'Cover image for UX Audit and Redesign project',
  },
  {
    id: 'project-two',
    title: 'Design System',
    subtitle: 'Establishing a component library & guidelines',
    role: 'UX/UI Design Intern',
    methods: ['Component Architecture', 'Design Systems', 'Cross-functional Alignment'],
    image: '/selected-work/project-two/cover.png',
    gradient: 'linear-gradient(135deg,#b8c9d4,#8aaab8)',
    hasLink: true,
    alt: 'Cover image for Design System project',
  },
  {
    id: 'project-three',
    title: 'UX/UI Design with AI',
    subtitle: 'Prototyping a behavior reporting platform',
    role: 'UX/UI Designer & Front-End Developer',
    methods: ['UI Prototyping', 'Usability Testing', 'Human-in-the-Loop AI'],
    image: '/selected-work/project-three/cover.png',
    gradient: 'linear-gradient(135deg,#c9c0d3,#9e91b0)',
    hasLink: true,
    alt: 'Cover image for UX/UI Design with AI project',
  },
  {
    id: 'project-four',
    title: 'UX/UI Concept Redesign',
    subtitle: 'Reimagining Strava\'s mobile experience',
    role: 'UX Researcher & UX/UI Designer',
    methods: ['User Interviews', 'Information Architecture', 'Prototyping'],
    image: '/selected-work/project-four/cover.png',
    gradient: 'linear-gradient(135deg,#d4b0b0,#b88080)',
    hasLink: true,
    alt: 'Cover image for UX/UI Concept Redesidgn project',
  },
  {
    id: 'project-five',
    title: 'CX Strategy & Design',
    subtitle: 'Developing Busey\'s persona & journey map program',
    role: 'CX Designer & Strategy Intern',
    methods: ['Journey Mapping', 'Workshop Facilitation', 'Service Design'],
    image: '/selected-work/project-five/cover.png',
    gradient: 'linear-gradient(135deg,#b0d4c0,#80b898)',
    hasLink: true,
    alt: 'Cover image for CX Strategy and Design project',
  },
  {
    id: 'project-six',
    title: 'UX Research & Operations',
    subtitle: 'Scaling research practices at Synchrony',
    role: 'Product Designer',
    methods: ['Research Ops', 'Usability Testing', 'Enablement'],
    image: '/selected-work/project-six/cover.jpg',
    gradient: 'linear-gradient(135deg,#d4d0b0,#b8b080)',
    hasLink: true,
    alt: 'Cover image for UX Research and Operations project',
    hidden: true,
  },
]

const PROJECTS = ALL_PROJECTS.filter(p => !p.hidden)
const LEFT_COLUMN_PROJECTS = PROJECTS.slice(0, 3)
const RIGHT_COLUMN_PROJECTS = PROJECTS.slice(3, 5)

type MarqueeProps = {
  orientation?: 'horizontal' | 'vertical'
}

const repeatCards = <T,>(cards: T[]) => [...cards, ...cards]

function MarqueeCard({
  project,
  index,
  listLength,
}: {
  project: (typeof PROJECTS)[number]
  index: number
  listLength: number
}) {
  const isMiddleSet = index < listLength
  const slideIndex = index % listLength

  return (
    <div
      className="marquee-card"
      role="group"
      aria-roledescription="slide"
      aria-label={`${project.title}, slide ${slideIndex + 1} of ${listLength}`}
      aria-hidden={!isMiddleSet ? true : undefined}
      tabIndex={isMiddleSet ? 0 : -1}
    >
      <div className="marquee-card-img" role="img" aria-label={project.alt}>
        {project.image ? (
          <img src={project.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: project.gradient,
            }}
          />
        )}
        <div className="marquee-card-img-overlay" />
        <div className="marquee-methods" aria-hidden="true">
          {project.methods.map(method => (
            <span key={method} className="marquee-method-chip">{method}</span>
          ))}
        </div>
      </div>

      <div className="marquee-card-body">
        <h3 className="marquee-card-title">{project.title}</h3>
        <p className="marquee-card-subtitle">{project.subtitle}</p>
        <div className="marquee-card-meta">
          <span className="marquee-card-role">{project.role}</span>
          {project.hasLink && <Link href={`/selected-work/${project.id}`}>View -&gt;</Link>}
        </div>
      </div>
    </div>
  )
}

export default function Marquee({ orientation = 'horizontal' }: MarqueeProps) {
  const isVertical = orientation === 'vertical'
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)

  const shouldPause = hovering || focused

  const leftCards = useMemo(() => repeatCards(LEFT_COLUMN_PROJECTS), [])
  const rightCards = useMemo(() => repeatCards(RIGHT_COLUMN_PROJECTS), [])

  if (!isVertical) {
    return null
  }

  return (
    <>
      <section
        className="marquee-wrapper marquee-wrapper--vertical"
        aria-label={`Selected Work slideshow, ${PROJECTS.length} projects`}
        aria-roledescription="carousel"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={() => setFocused(false)}
      >
        <p className="sr-only">
          Showing {PROJECTS.length} projects across two vertical columns. Hover or focus pauses both columns.
        </p>

        <div className="marquee-vertical-grid" aria-label="Project cards">
          <div className="marquee-column">
            <div className={`marquee-column-track marquee-column-track--up${shouldPause ? ' marquee-column-track--paused' : ''}`}>
              {leftCards.map((project, index) => (
                <MarqueeCard
                  key={`${project.id}-left-${index}`}
                  project={project}
                  index={index}
                  listLength={LEFT_COLUMN_PROJECTS.length}
                />
              ))}
            </div>
          </div>

          <div className="marquee-column">
            <div className={`marquee-column-track marquee-column-track--down${shouldPause ? ' marquee-column-track--paused' : ''}`}>
              {rightCards.map((project, index) => (
                <MarqueeCard
                  key={`${project.id}-right-${index}`}
                  project={project}
                  index={index}
                  listLength={RIGHT_COLUMN_PROJECTS.length}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
