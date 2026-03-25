"use client"
import { forwardRef, type Ref } from "react"
import { Shield, Award, Wrench, Star, Zap } from "lucide-react"

const FEATURE_ICONS = [Shield, Award, Wrench, Star, Zap]

const FALLBACK_FEATURES = [
  { title: "Lifetime Warranty", desc: "Every fixture backed by our industry-leading lifetime warranty." },
  { title: "Solid Brass & Copper", desc: "Premium alloys that never rust, corrode, or degrade over time." },
  { title: "Field Serviceable", desc: "Designed for easy maintenance and component replacement in the field." },
]

interface FeatureItem { title?: string; desc?: string }

function toEmbedUrl(url: string): string {
  if (!url) return ''
  // Already an embed URL
  if (url.includes('/embed/')) return url
  // youtu.be short link
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  // Standard watch URL
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
    paddingTop,
    paddingBottom,
    heading,
    headingAccent,
    bodyText,
    features: featuresProp,
    btn1Label,
    btn1Href,
    btn2Label,
    btn2Href,
    videoUrl,
    stat,
    statLabel,
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    paddingTop?: number
    paddingBottom?: number
    heading?: string
    headingAccent?: string
    bodyText?: string
    features?: FeatureItem[]
    btn1Label?: string
    btn1Href?: string
    btn2Label?: string
    btn2Href?: string
    videoUrl?: string
    stat?: string
    statLabel?: string
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#1a2332'

  const features = (featuresProp && featuresProp.length > 0) ? featuresProp : FALLBACK_FEATURES
  const embedSrc = toEmbedUrl(videoUrl || '')

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ ...(!bgImageUrl ? { background: sectionBackground } : {}), '--section-line-height': lineHeight, paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 } as React.CSSProperties}
    >
      {bgImageUrl && (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImageUrl && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
      )}

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
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
                        <h4 className="card-title mb-1" style={{ color: '#ffffff' }}>{item.title}</h4>
                        <p className="text-size-small" style={{ color: 'rgba(255,255,255,0.85)' }}>{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={btn1Href || "/shop"} className="sg-btn-solid-md">{btn1Label || "Shop Products"}</a>
                <a href={btn2Href || "/about"} className="sg-btn-outline-md" style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.5)' }}>{btn2Label || "Learn More →"}</a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden glow-warm">
                {embedSrc ? (
                  <iframe
                    src={embedSrc}
                    title="Quality landscape lighting showcase"
                    className="w-full h-[500px]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-[500px] flex items-center justify-center bg-secondary/20 text-muted-foreground text-size-small">
                    Add a YouTube URL in the panel to display a video
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl p-5 glow-warm-sm" style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div className="heading-style-h3" style={{ color: '#c8972a' }}>{stat || "25+"}</div>
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
