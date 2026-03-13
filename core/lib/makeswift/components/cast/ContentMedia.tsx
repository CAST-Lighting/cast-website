"use client";

import { forwardRef, useState, type Ref } from "react";

export interface ContentMediaProps {
  className?: string;
  sectionStyle?: string;
  mediaType?: "image" | "video";
  mediaSrc?: string;
  videoUrl?: string;
  mediaPosition?: "left" | "right";
  heading?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  mediaStyle?: string;
  bgImage?: string;
  bgColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ContentMedia = forwardRef(function ContentMedia(
  {
    className,
    sectionStyle,
    mediaType = "video",
    mediaSrc,
    videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
    mediaPosition = "right",
    heading = "Unmatched Quality, Technology & Durability",
    description = "Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode. Our patented designs and integrated LED technology deliver superior performance backed by industry-leading warranties.",
    primaryButtonText = "Shop Products",
    primaryButtonHref = "#",
    secondaryButtonText = "Learn More",
    secondaryButtonHref = "#",
    mediaStyle,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: ContentMediaProps,
  ref: Ref<HTMLDivElement>
) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <style>{`
        .cm-section {
          width: 100%;
          box-sizing: border-box;
        }
        .cm-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }
        .cm-text-content {
          flex: 1 1 48%;
          max-width: 560px;
          min-width: 0;
        }
        .cm-media-outer {
          flex: 1 1 48%;
          min-width: 0;
        }
        .cm-media-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          background: #111820;
          box-shadow: 0 0 0 1px rgba(127,190,232,0.12), 0 24px 64px rgba(0,0,0,0.5), 0 0 60px rgba(0,124,176,0.1);
        }
        .cm-media-wrap iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border: none;
        }
        .cm-media-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cm-play-btn {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(13,26,36,0.35);
          cursor: pointer;
          transition: background 0.25s;
          border: none;
          padding: 0;
        }
        .cm-play-btn:hover {
          background: rgba(13,26,36,0.5);
        }
        .cm-play-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(0,124,176,0.88);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s, background 0.25s, box-shadow 0.25s;
          box-shadow: 0 4px 24px rgba(0,124,176,0.5);
        }
        .cm-play-btn:hover .cm-play-circle {
          transform: scale(1.1);
          background: #007cb0;
          box-shadow: 0 6px 32px rgba(0,124,176,0.65);
        }
        .cm-heading {
          font-family: 'Essonnes', 'Playfair Display', serif;
          font-size: var(--h2-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          color: #e2edf2;
          margin: 0 0 20px;
        }
        .cm-description {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-lg-size, 20px);
          line-height: 1.65;
          color: #90a4ae;
          margin: 0 0 36px;
        }
        .cm-buttons {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .cm-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: #007cb0;
          border: none;
          border-radius: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .cm-btn-primary:hover {
          background: #005c7a;
          box-shadow: 0 4px 20px rgba(0,124,176,0.35);
        }
        .cm-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #7ebee8;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.2s, gap 0.2s;
          white-space: nowrap;
        }
        .cm-btn-secondary:hover {
          color: #e2edf2;
          gap: 12px;
        }
        .cm-blob-1 {
          position: absolute;
          top: -120px;
          right: -120px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,124,176,0.12) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
        .cm-blob-2 {
          position: absolute;
          bottom: -100px;
          left: -80px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(126,190,232,0.06) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }
        @media (max-width: 1023px) {
          .cm-layout {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 40px;
          }
          .cm-text-content {
            max-width: 100% !important;
            flex: none !important;
            width: 100% !important;
          }
          .cm-media-outer {
            width: 100% !important;
            flex: none !important;
          }
          .cm-heading,
          .cm-description {
            text-align: center;
          }
          .cm-buttons {
            justify-content: center;
          }
        }
      `}</style>
      <div
        ref={ref}
        className={`cm-section ${sectionStyle || ""} ${className || ""}`}
        style={{ position: "relative", backgroundColor: "#111820" }}
      >
        {bgImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: overlayColor,
              opacity: (overlayOpacity ?? 0) / 100,
              zIndex: 1,
            }}
          />
        )}

        {/* Decorative blobs */}
        <div className="cm-blob-1" aria-hidden="true" />
        <div className="cm-blob-2" aria-hidden="true" />

        <div className="site-container" style={{ position: "relative", zIndex: 2 }}>
          <div
            className="cm-layout"
            style={{
              flexDirection: mediaPosition === "left" ? "row-reverse" : "row",
            }}
          >
            {/* Text side */}
            <div className="cm-text-content">
              <h2 className="cm-heading">{heading}</h2>
              <p className="cm-description">{description}</p>
              {(primaryButtonText || secondaryButtonText) && (
                <div className="cm-buttons">
                  {primaryButtonText && (
                    <a href={primaryButtonHref || "#"} className="cm-btn-primary">
                      {primaryButtonText}
                    </a>
                  )}
                  {secondaryButtonText && (
                    <a href={secondaryButtonHref || "#"} className="cm-btn-secondary">
                      {secondaryButtonText}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Media side */}
            <div className={`cm-media-outer ${mediaStyle || ""}`}>
              <div className="cm-media-wrap">
                {mediaType === "video" ? (
                  isPlaying || !mediaSrc ? (
                    <iframe
                      src={videoUrl}
                      title="Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img src={mediaSrc} alt={heading || ""} />
                      <button
                        className="cm-play-btn"
                        onClick={() => setIsPlaying(true)}
                        aria-label="Play video"
                      >
                        <div className="cm-play-circle">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="white"
                            style={{ marginLeft: 3 }}
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </button>
                    </>
                  )
                ) : (
                  <img
                    src={
                      mediaSrc ||
                      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=720&q=80"
                    }
                    alt={heading || ""}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ContentMedia;
