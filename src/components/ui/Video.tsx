'use client'

import React, { useState } from 'react'

interface VideoProps {
  src: string
  className?: string
  style?: React.CSSProperties
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
}

const videoCDNMap: Record<string, string> = {
  '/concert.mp4': process.env.NEXT_PUBLIC_VIDEO_CONCERT || '/concert.mp4',
  '/ballroom.mp4': process.env.NEXT_PUBLIC_VIDEO_BALLROOM || '/ballroom.mp4',
  '/dj.mov': process.env.NEXT_PUBLIC_VIDEO_DJ || '/dj.mov',
  '/hero-1.mp4': process.env.NEXT_PUBLIC_VIDEO_HERO_1 || '/hero-1.mp4',
  '/hero-2.mp4': process.env.NEXT_PUBLIC_VIDEO_HERO_2 || '/hero-2.mp4',
}

export function Video({
  src,
  className = '',
  style,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  ...props
}: VideoProps & React.VideoHTMLAttributes<HTMLVideoElement>) {
  const [error, setError] = useState(false)

  // Get CDN URL or fall back to local
  const videoSrc = videoCDNMap[src] || src

  // If both CDN and local fail, show a fallback gradient
  if (error) {
    return (
      <div
        className={className}
        style={{
          ...style,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
        }}
      >
        <div className="w-full h-full flex items-center justify-center opacity-30">
          <div className="w-16 h-16 border-2 border-white/20 rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <video
      src={videoSrc}
      className={className}
      style={style}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      onError={() => setError(true)}
      {...props}
    />
  )
}

export default Video
