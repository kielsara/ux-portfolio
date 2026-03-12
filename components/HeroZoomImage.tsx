'use client'

import { useEffect, useState } from 'react'

type HeroZoomImageProps = {
  src: string
  alt: string
  imagePosition?: string
}

export default function HeroZoomImage({ src, alt, imagePosition }: HeroZoomImageProps) {
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
      <div className="hero-image">
        <img
          src={src}
          alt={alt}
          className="hero-image-img"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        <button
          type="button"
          className="hero-zoom-trigger"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Open full hero image"
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
            aria-label="Close full hero image"
          />
          <div
            className="hero-zoom-window"
            role="dialog"
            aria-modal="true"
            aria-label="Full hero image preview"
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
