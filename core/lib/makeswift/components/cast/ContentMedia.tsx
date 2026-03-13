"use client"
import { forwardRef, type Ref } from "react"
import { Shield, Award, Wrench } from "lucide-react"

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
  }: {
    className?: string
    bgImage?: { url: string }
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    paddingTop?: number
    paddingBottom?: number
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage?.url
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const hasGradient = !!(gradientFrom && gradientTo)

  const sectionBg: React.CSSProperties = bgImageUrl
    ? {}
    : hasGradient
    ? { background: `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})` }
    : { background: bgColor || '#1a2332' }

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ ...sectionBg, '--section-line-height': lineHeight, paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 } as React.CSSProperties}
    >
      {/* bg image layer */}
      {bgImageUrl && (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {/* overlay layer — shown when image present */}
      {bgImageUrl && (
        <div className="absolute inset-0" style={{
          zIndex: 1,
          background: hasGradient
            ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
            : bgColor || '#014960',
          opacity: overlayOpacity
        }} />
      )}

      {/* content — always relative z-10 */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                Unmatched Quality, Technology &{" "}
                <span className="text-gradient-warm">Durability</span>
              </h2>
              <p className="section-desc mb-8">
                Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode. Our proprietary LED technology delivers superior color rendering and energy efficiency.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { icon: Shield, title: "Lifetime Warranty", desc: "Every fixture backed by our industry-leading lifetime warranty." },
                  { icon: Award, title: "Solid Brass & Copper", desc: "Premium alloys that never rust, corrode, or degrade over time." },
                  { icon: Wrench, title: "Field Serviceable", desc: "Designed for easy maintenance and component replacement in the field." },
                ].map((item) => (
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
                <a href="#" className="sg-btn-solid-md">Shop Products</a>
                <a href="#" className="sg-btn-outline-md">Learn More →</a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden glow-warm">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WcXgQ"
                  title="Quality landscape lighting showcase"
                  className="w-full h-[500px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-5 glow-warm-sm">
                <div className="heading-style-h3 text-primary">25+</div>
                <div className="text-size-small text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default ContentMedia
