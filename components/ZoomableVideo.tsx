'use client'

import { CSSProperties, useEffect, useState } from 'react'

type ZoomableVideoProps = {
  src: string
  title: string
  videoClassName?: string
  videoStyle?: CSSProperties
  wrapperClassName?: string
  triggerClassName?: string
  dialogLabel?: string
}

export default function ZoomableVideo({
  src,
  title,
  videoClassName,
  videoStyle,
  wrapperClassName,
  triggerClassName,
  dialogLabel,
}: ZoomableVideoProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <>
      <div className={wrapperClassName ?? 'zoomable-image'}>
        <video
          src={src}
          title={title}
          className={videoClassName}
          style={videoStyle}
          controls
          preload="metadata"
        />
        <button
          type="button"
          className={triggerClassName ?? 'hero-zoom-trigger'}
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={`Open full video: ${title}`}
        >
          Click to zoom
        </button>
      </div>

      {isOpen && (
        <div className="hero-zoom-layer" role="presentation">
          <button
            type="button"
            className="hero-zoom-backdrop"
            onClick={() => setIsOpen(false)}
            aria-label="Close full video"
          />
          <div
            className="hero-zoom-window"
            role="dialog"
            aria-modal="true"
            aria-label={dialogLabel ?? 'Full video preview'}
          >
            <button
              type="button"
              className="hero-zoom-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              Close
            </button>
            <video src={src} title={title} className="hero-zoom-image" controls autoPlay preload="metadata" />
          </div>
        </div>
      )}
    </>
  )
}