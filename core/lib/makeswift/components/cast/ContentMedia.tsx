"use client"

import { forwardRef, type Ref } from "react"
import { Shield, Award, Wrench } from "lucide-react"

export interface ContentMediaProps {
  className?: string
  sectionStyle?: string
  mediaType?: "image" | "video"
  mediaSrc?: string
  videoUrl?: string
  mediaPosition?: "left" | "right"
  heading?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  mediaStyle?: string
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
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
    description = "Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode. Our proprietary LED technology delivers superior color rendering and energy efficiency.",
    primaryButtonText = "Shop Products",
    primaryButtonHref = "#",
    secondaryButtonText = "Learn More →",
    secondaryButtonHref = "#",
    mediaStyle,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: ContentMediaProps,
  ref: Ref<HTMLDivElement>
) {
  const features = [
    { icon: Shield, title: "Lifetime Warranty", desc: "Every fixture backed by our industry-leading lifetime warranty." },
    { icon: Award, title: "Solid Brass & Copper", desc: "Premium alloys that never rust, corrode, or degrade over time." },
    { icon: Wrench, title: "Field Serviceable", desc: "Designed for easy maintenance and component replacement in the field." },
  ]

  return (
    <div
      ref={ref}
      className={`py-24 bg-gradient-dark relative overflow-hidden ${sectionStyle || ""} ${className || ""}`}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {overlayColor && (overlayOpacity ?? 0) > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100 }}
        />
      )}

      <div className="site-container relative z-10">
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center ${mediaPosition === "left" ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
        >
          {/* Text side */}
          <div>
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              {heading.includes("Durability") ? (
                <>Unmatched Quality, Technology &{" "}
                <span className="text-gradient-warm">Durability</span></>
              ) : (
                heading
              )}
            </h2>
            <p className="section-desc mb-8">{description}</p>

            <div className="space-y-6 mb-10">
              {features.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="icon-box">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="card-title text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {primaryButtonText && (
                <a href={primaryButtonHref || "#"} className="btn-primary">{primaryButtonText}</a>
              )}
              {secondaryButtonText && (
                <a href={secondaryButtonHref || "#"} className="btn-outline">{secondaryButtonText}</a>
              )}
            </div>
          </div>

          {/* Media side */}
          <div className={`relative ${mediaStyle || ""}`}>
            <div className="rounded-2xl overflow-hidden glow-warm">
              {mediaType === "video" ? (
                <iframe
                  src={videoUrl}
                  title={heading}
                  className="w-full h-[500px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={mediaSrc || "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=720&q=80"}
                  alt={heading}
                  className="w-full h-[500px] object-cover"
                />
              )}
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-5 glow-warm-sm">
              <div className="heading-style-h3 text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ContentMedia
