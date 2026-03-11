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
        .cm-media-wrap {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .cm-media-wrap iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border: none;
          border-radius: 12px;
        }
        .cm-media-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }
        .cm-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.25);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cm-play-overlay:hover {
          background: rgba(0,0,0,0.4);
        }
        .cm-play-overlay:hover svg circle {
          fill: rgba(0,73,96,1);
        }
        @media (max-width: 1023px) {
          .cm-layout {
            flex-direction: column !important;
            align-items: center !important;
          }
          .cm-text-content {
            max-width: 100% !important;
            flex: none !important;
            width: 100% !important;
            text-align: center !important;
          }
          .cm-text-content .cm-buttons {
            justify-content: center !important;
          }
          .cm-media-outer {
            width: 100% !important;
            flex: none !important;
          }
        }
      `}</style>
      <div
        ref={ref}
        className={`relative overflow-hidden ${sectionStyle || ""} ${className || ""}`}
        style={{ backgroundColor: bgColor || "#111827", width: "100%" }}
      >
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        {/* Gradient blobs */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#004960] to-[#057cb0] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#004960] to-[#057cb0] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div
            className="cm-layout w-full site-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "48px",
              flexDirection: mediaPosition === "left" ? "row-reverse" : "row",
            }}
          >
            {/* Text side */}
            <div className="cm-text-content" style={{ flex: "1 1 50%", maxWidth: "42rem", minWidth: 0 }}>
              <h2
                className="tracking-tight text-balance text-white"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)" }}
              >
                {heading}
              </h2>
              <p className="mt-6 text-pretty text-gray-300" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "var(--body-lg-size, 20px)", lineHeight: "var(--body-line-height, 1.6)" }}>
                {description}
              </p>
              {(primaryButtonText || secondaryButtonText) && (
                <div className="cm-buttons mt-10 flex items-center gap-x-6">
                  {primaryButtonText && (
                    <a
                      href={primaryButtonHref || "#"}
                      className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs"
                      style={{ backgroundColor: "var(--color-primary)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-secondary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
                    >
                      {primaryButtonText}
                    </a>
                  )}
                  {secondaryButtonText && (
                    <a href={secondaryButtonHref || "#"} className="text-sm/6 font-semibold text-white">
                      {secondaryButtonText} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Media side */}
            <div className={`cm-media-outer ${mediaStyle || ""}`} style={{ flex: "1 1 50%", minWidth: 0 }}>
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
                    <div onClick={() => setIsPlaying(true)} style={{ position: "relative", width: "100%", height: "100%" }}>
                      <img src={mediaSrc} alt={heading || ""} />
                      <div className="cm-play-overlay">
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                          <circle cx="36" cy="36" r="36" fill="rgba(0,73,96,0.85)" />
                          <path d="M29 22L51 36L29 50V22Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  )
                ) : (
                  <img
                    src={mediaSrc || "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=720&q=80"}
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
