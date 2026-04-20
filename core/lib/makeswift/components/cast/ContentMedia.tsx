"use client"
import { forwardRef, type Ref } from "react"
import { Shield, Award, Wrench, Star, Zap } from "lucide-react"
import { getTheme } from "~/lib/makeswift/theme"

const FEATURE_ICONS = [Shield, Award, Wrench, Star, Zap]

const FALLBACK_FEATURES = [
  { title: "Lifetime Warranty", desc: "Every fixture backed by our industry-leading lifetime warranty." },
  { title: "Solid Brass & Copper", desc: "Premium alloys that never rust, corrode, or degrade over time." },
  { title: "Field Serviceable", desc: "Designed for easy maintenance and component replacement in the field." },
]

interface FeatureItem { title?: string; desc?: string }

function toEmbedUrl(url: string): string {
  if (!url) return ''
  if (url.includes('/embed/')) return url
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  return url
}

const ContentMedia = forwardRef(function ContentMedia(
  {
    className,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    lineHeight,
    heading,
    headingAccent,
    bodyText,
    features: featuresProp,
    btn1Label,
    btn1Href,
    btn2Label,
    btn2Href,
    mediaType = 'video',
    videoUrl,
    imageUrl,
    reverseLayout = false,
    stat,
    statLabel,
    mode = 'dark',
    lightMode,
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    heading?: string
    headingAccent?: string
    bodyText?: string
    features?: FeatureItem[]
    btn1Label?: string
    btn1Href?: string
    btn2Label?: string
    btn2Href?: string
    mediaType?: 'video' | 'image'
    videoUrl?: string
    imageUrl?: string
    reverseLayout?: boolean
    stat?: string
    statLabel?: string
    mode?: 'dark' | 'light'
    lightMode?: boolean
  },
  ref: Ref<HTMLElement>
) {
  const t = getTheme(lightMode ? 'light' : mode)
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = lightMode
    ? '#F5F5F5'
    : hasGradient
      ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
      : bgColor || t.bg

  const features = (featuresProp && featuresProp.length > 0) ? featuresProp : FALLBACK_FEATURES
  const embedSrc = toEmbedUrl(videoUrl || '')

  // Content column order — reversed puts media left, content right
  const contentOrder = reverseLayout ? 2 : 1
  const mediaOrder   = reverseLayout ? 1 : 2

  return (
    <section
      ref={ref}
      className={`cast-section-default relative overflow-hidden ${className || ""}`}
      style={{ width: '100%', ...(!bgImage ? { background: sectionBackground } : {}), } as React.CSSProperties}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImage && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
      )}

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* ── Content column ── */}
            <div style={{ order: contentOrder }}>
              <h2 className="heading-style-h2 mb-6 leading-tight" style={{ color: t.heading }}>
                {heading || "Unmatched Quality, Technology &"}{" "}
                <span className="text-gradient-warm">{headingAccent || "Durability"}</span>
              </h2>
              <p className="section-desc mb-8">
                {bodyText || "Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode. Our proprietary LED technology delivers superior color rendering and energy efficiency."}
              </p>

              <div className="space-y-6 mb-10">
                {features.map((item, i) => {
                  const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length] as React.ElementType
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="icon-box">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="card-title mb-1" style={{ color: t.heading }}>{item.title}</h4>
                        <p className="text-size-small" style={{ color: t.body }}>{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={btn1Href || "/shop"} className={t.btnPrimary}>{btn1Label || "Shop Products"}</a>
                <a href={btn2Href || "/about"} className={t.btnOutline}>{btn2Label || "Learn More →"}</a>
              </div>
            </div>

            {/* ── Media column ── */}
            <div className="relative" style={{ order: mediaOrder }}>
              <div className="rounded-2xl overflow-hidden glow-warm">
                {mediaType === 'image' ? (
                  /* ── Image mode ── */
                  imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={heading || ""}
                      className="w-full h-[280px] md:h-[500px] object-cover block"
                    />
                  ) : (
                    <div className="w-full h-[280px] md:h-[500px] flex items-center justify-center"
                      style={{ background: lightMode ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)", border: lightMode ? "1px dashed rgba(0,0,0,0.2)" : "1px dashed rgba(255,255,255,0.15)" }}>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: lightMode ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}>
                        Add an image URL in the panel
                      </span>
                    </div>
                  )
                ) : (
                  /* ── Video mode ── */
                  embedSrc ? (
                    <iframe
                      src={embedSrc}
                      title="Quality landscape lighting showcase"
                      className="w-full h-[280px] md:h-[500px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-[280px] md:h-[500px] relative">
                      <img
                        src="https://storage.googleapis.com/s.mkswft.com/RmlsZToyYWIwMGYxYS1hZDc1LTRmMjgtOGQ0YS0yODNkMjExZmQ1ODg=/placeholder_video.webp"
                        alt="Add a YouTube URL in the panel to display a video"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Stat badge */}
              <div
                className="absolute -bottom-6 glow-warm-sm"
                style={{
                  [reverseLayout ? 'right' : 'left']: '-1.5rem',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <div className="heading-style-h3" style={{ color: t.accent }}>{stat || "25+"}</div>
                <div className="text-size-small" style={{ color: '#1a2332', fontWeight: 600 }}>{statLabel || "Years of Excellence"}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
})

export default ContentMedia
