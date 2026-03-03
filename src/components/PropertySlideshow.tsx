'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Slide {
  src: string
  alt: string
}

interface PropertySlideshowProps {
  slides: Slide[]
  videoUrl?: string
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
  )
  return match ? match[1] : null
}

export default function PropertySlideshow({ slides, videoUrl }: PropertySlideshowProps) {
  const hasVideo = !!videoUrl
  const totalSlides = slides.length + (hasVideo ? 1 : 0)
  const [current, setCurrent] = useState(0)

  if (totalSlides === 0) return null

  const prev = () => setCurrent((c) => (c === 0 ? totalSlides - 1 : c - 1))
  const next = () => setCurrent((c) => (c === totalSlides - 1 ? 0 : c + 1))

  const isVideoSlide = hasVideo && current === 0
  const imageIndex = hasVideo ? current - 1 : current

  return (
    <div className="relative w-full">
      {/* Main Image / Video */}
      <div className="relative h-[55vh] w-full rounded-xl overflow-hidden bg-gray-100">
        {isVideoSlide && videoUrl ? (
          <div className="w-full h-full">
            {getYouTubeId(videoUrl) ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(videoUrl)}?rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Property video"
              />
            ) : (
              <video src={videoUrl} controls className="w-full h-full object-cover">
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ) : (
          slides[imageIndex] && (
            <Image
              src={slides[imageIndex].src}
              alt={slides[imageIndex].alt}
              fill
              className="object-cover transition-opacity duration-500"
              priority={imageIndex === 0}
              sizes="100vw"
            />
          )
        )}

        {/* Prev / Next arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center shadow-lg transition-colors"
              aria-label="Previous image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center shadow-lg transition-colors"
              aria-label="Next image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {current + 1} / {totalSlides}
        </div>
      </div>

      {/* Thumbnail strip */}
      {totalSlides > 1 && (
        <div className="flex gap-2 mt-3 px-4 overflow-x-auto pb-2">
          {/* Video thumbnail */}
          {hasVideo && (
            <button
              onClick={() => setCurrent(0)}
              className={`relative h-16 w-24 shrink-0 rounded-lg overflow-hidden transition-all ${
                current === 0 ? 'ring-2 ring-primary opacity-100' : 'opacity-60 hover:opacity-90'
              }`}
            >
              {getYouTubeId(videoUrl!) ? (
                <Image
                  src={`https://img.youtube.com/vi/${getYouTubeId(videoUrl!)}/mqdefault.jpg`}
                  alt="Video"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              )}
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="drop-shadow">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </button>
          )}
          {/* Image thumbnails */}
          {slides.map((slide, i) => {
            const slideIndex = hasVideo ? i + 1 : i
            return (
              <button
                key={i}
                onClick={() => setCurrent(slideIndex)}
                className={`relative h-16 w-24 shrink-0 rounded-lg overflow-hidden transition-all ${
                  slideIndex === current ? 'ring-2 ring-primary opacity-100' : 'opacity-60 hover:opacity-90'
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
