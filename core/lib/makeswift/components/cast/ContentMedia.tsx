"use client"
import { forwardRef, type Ref } from "react"
import { Shield, Award, Wrench } from "lucide-react"

const featureIcons = [Shield, Award, Wrench]

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
    feature1Title,
    feature1Desc,
    feature2Title,
    feature2Desc,
    feature3Title,
    feature3Desc,
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
    feature1Title?: string
    feature1Desc?: string
    feature2Title?: string
    feature2Desc?: string
    feature3Title?: string
    feature3Desc?: string
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

  const features = [
    {
      icon: featureIcons[0],
      title: feature1Title || "Lifetime Warranty",
      desc: feature1Desc || "Every fixture backed by our industry-leading lifetime warranty.",
    },
    {
      icon: featureIcons[1],
      title: feature2Title || "Solid Brass & Copper",
      desc: feature2Desc || "Premium alloys that never rust, corrode, or degrade over time.",
    },
    {
      icon: featureIcons[2],
      title: feature3Title || "Field Serviceable",
      desc: feature3Desc || "Designed for easy maintenance and component replacement in the field.",
    },
  ]

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ ...(!bgImageUrl ? { background: sectionBackground } : {}), '--section-line-height': lineHeight, paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 } as React.CSSProperties}
    >
      {/* bg image layer */}
      {bgImageUrl && (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {/* overlay layer — shown when image present */}
      {bgImageUrl && (
        <div className="absolute inset-0" style={{
          zIndex: 1,
          background: sectionBackground,
          opacity: overlayOpacity
        }} />
      )}

      {/* content — always relative z-10 */}
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
                {features.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="icon-box">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="card-title text-foreground mb-1">{item.title}</h4>
                      <p className="text-size-small text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={btn1Href || "/shop"} className="sg-btn-solid-md">{btn1Label || "Shop Products"}</a>
                <a href={btn2Href || "/about"} className="sg-btn-outline-md">{btn2Label || "Learn More →"}</a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden glow-warm">
                <iframe
                  src={videoUrl || "https://www.youtube.com/embed/dQw4w9WcXgQ"}
                  title="Quality landscape lighting showcase"
                  className="w-full h-[500px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-5 glow-warm-sm">
                <div className="heading-style-h3 text-primary">{stat || "25+"}</div>
                <div className="text-size-small text-muted-foreground">{statLabel || "Years of Excellence"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default ContentMedia
