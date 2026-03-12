'use client'

import { CSSProperties, useEffect, useState } from 'react'

type ZoomableImageProps = {
  src: string
  alt: string
  imageClassName?: string
  imageStyle?: CSSProperties
  wrapperClassName?: string
  triggerClassName?: string
  dialogLabel?: string
}

export default function ZoomableImage({
  src,
  alt,
  imageClassName,
  imageStyle,
  wrapperClassName,
  triggerClassName,
  dialogLabel,
}: ZoomableImageProps) {
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
        <img src={src} alt={alt} className={imageClassName} style={imageStyle} />
        <button
          type="button"
          className={triggerClassName ?? 'hero-zoom-trigger'}
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={`Open full image: ${alt}`}
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
            aria-label="Close full image"
          />
          <div
            className="hero-zoom-window"
            role="dialog"
            aria-modal="true"
            aria-label={dialogLabel ?? 'Full image preview'}
          >
            <button
              type="button"
              className="hero-zoom-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              Close
            </button>
            <img src={src} alt={alt} className="hero-zoom-image" />
          </div>
        </div>
      )}
    </>
  )
}
