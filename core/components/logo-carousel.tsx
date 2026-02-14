'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface LogoItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LogoCarouselProps {
  logos: LogoItem[];
  speed?: number;
  gap?: number;
  logoHeight?: number;
  pauseOnHover?: boolean;
  backgroundColor?: string;
  showTopRow?: boolean;
  showBottomRow?: boolean;
}

export function LogoCarousel({
  logos,
  speed = 35,
  gap = 48,
  logoHeight = 80,
  pauseOnHover = true,
  backgroundColor = 'transparent',
  showTopRow = true,
  showBottomRow = true,
}: LogoCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedLogos = [...logos, ...logos, ...logos];

  const rowStyles = {
    '--scroll-speed': `${speed}s`,
    '--gap': `${gap}px`,
  } as React.CSSProperties;

  const logoStyles = {
    height: `${logoHeight}px`,
    width: 'auto',
  };

  return (
    <div
      className="w-full overflow-hidden py-8"
      style={{ backgroundColor }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {showTopRow && (
        <div className="relative flex overflow-hidden mb-8" style={rowStyles}>
          <div className={`flex gap-[var(--gap)] animate-scroll-left ${isPaused && pauseOnHover ? 'pause' : ''}`}>
            {duplicatedLogos.map((logo, index) => (
              <div key={`top-${index}`} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 200}
                  height={logo.height || logoHeight}
                  style={logoStyles}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showBottomRow && (
        <div className="relative flex overflow-hidden" style={rowStyles}>
          <div className={`flex gap-[var(--gap)] animate-scroll-right ${isPaused && pauseOnHover ? 'pause' : ''}`}>
            {duplicatedLogos.map((logo, index) => (
              <div key={`bottom-${index}`} className="flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 200}
                  height={logo.height || logoHeight}
                  style={logoStyles}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left var(--scroll-speed) linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right var(--scroll-speed) linear infinite;
        }
        .pause {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
