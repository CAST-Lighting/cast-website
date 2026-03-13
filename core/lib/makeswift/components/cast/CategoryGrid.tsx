"use client"
import { forwardRef, type Ref } from "react"
import { Lightbulb, Sun, CircleDot, Lamp, SquareAsterisk, Zap, Focus } from "lucide-react"

const defaultBgSrc = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80"

const categories = [
  { name: "Path Lights", icon: Lamp },
  { name: "Spot Lights", icon: Zap },
  { name: "Wall Wash", icon: Sun },
  { name: "Well Lights", icon: CircleDot },
  { name: "Deck Lights", icon: SquareAsterisk },
  { name: "Flood Lights", icon: Zap },
  { name: "Accent Lights", icon: Focus },
  { name: "Transformers", icon: Lightbulb },
]

const CategoryGrid = forwardRef(function CategoryGrid(
  {
    className,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    lineHeight,
  }: {
    className?: string
    bgImage?: { url: string }
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage?.url
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const hasGradient = !!(gradientFrom && gradientTo)

  // CategoryGrid always shows an image — either the prop image or the default Unsplash src
  const resolvedImgSrc = bgImageUrl || defaultBgSrc

  const sectionBg: React.CSSProperties = {}

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden ${className || ""}`}
      style={{ ...sectionBg, '--section-line-height': lineHeight } as React.CSSProperties}
    >
      {/* bg image layer */}
      <img
        src={resolvedImgSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />
      {/* overlay layer */}
      <div className="absolute inset-0" style={{
        zIndex: 1,
        background: hasGradient
          ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
          : bgColor || '#003344',
        opacity: overlayOpacity
      }} />

      {/* content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3 opacity-100">
              Product <span className="text-gradient-warm">Categories</span>
            </h2>
            <p className="section-desc">
              Explore our full range of professional landscape lighting solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-secondary hover:border-primary/40 hover:bg-secondary/80 transition-all duration-300"
              >
                <cat.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-size-small font-medium text-secondary-foreground group-hover:text-primary text-center transition-colors">
                  {cat.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default CategoryGrid
