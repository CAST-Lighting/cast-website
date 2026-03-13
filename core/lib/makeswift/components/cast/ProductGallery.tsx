"use client"
import { forwardRef, type Ref, useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

const products = [
  { category: "Path Lights", name: "Classic Brass Path Light", price: "$189.00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { category: "Path Lights", name: "Modern Copper Path Light", price: "$209.00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { category: "Spot Lights", name: "Pro Series Spotlight", price: "$149.00", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80" },
  { category: "Spot Lights", name: "Compact LED Spotlight", price: "$129.00", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80" },
  { category: "Wall Wash", name: "Copper Wall Washer", price: "$219.00", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { category: "Wall Wash", name: "Slim Profile Wall Wash", price: "$199.00", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { category: "Well Lights", name: "In-Ground LED Well Light", price: "$169.00", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80" },
  { category: "Well Lights", name: "Heavy Duty Well Light", price: "$189.00", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80" },
  { category: "Deck Lights", name: "Flush Mount Deck Light", price: "$89.00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { category: "Transformers", name: "300W Multi-Tap Transformer", price: "$349.00", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80" },
  { category: "Accessories", name: "Brass Mounting Kit", price: "$29.00", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { category: "Accessories", name: "Wire Connector Pack", price: "$19.00", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80" },
]

const ProductGallery = forwardRef(function ProductGallery(
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
    bgImage?: string
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 300
    const distance = direction === "left" ? -cardWidth * 2 : cardWidth * 2
    const start = el.scrollLeft
    const duration = 600
    let startTime: number | null = null

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      el.scrollLeft = start + distance * easeInOutCubic(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  const bgImageUrl = bgImage
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

      {/* Animated background blobs — always shown */}
      {!bgImageUrl && (
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <div
            className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px]"
            style={{
              background: "radial-gradient(circle, hsl(var(--brand-light-blue)), transparent 70%)",
              top: "-20%",
              left: "-10%",
              animation: "drift1 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[100px]"
            style={{
              background: "radial-gradient(circle, hsl(var(--brand-medium-blue)), transparent 70%)",
              bottom: "-15%",
              right: "-5%",
              animation: "drift2 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[80px]"
            style={{
              background: "radial-gradient(circle, hsl(var(--brand-dark-blue)), transparent 70%)",
              top: "40%",
              left: "50%",
              animation: "drift3 18s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* content — always relative z-10 */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
                Our Favorite <span className="text-gradient-warm">Picks</span>
              </h2>
              <p className="section-desc max-w-md">
                Explore our most popular landscape lighting fixtures trusted by contractors nationwide.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#" className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-size-medium font-medium ml-4">
                View All <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Carousel — left-aligned with heading, bleeds to the right */}
        <div className="pl-[max(1.5rem,calc((100vw-1600px)/2+1.5rem))]">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pr-6 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}
          >
            {products.map((product, i) => (
              <div
                key={i}
                className="group flex-shrink-0 w-[280px] bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30"
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-md bg-background/80 backdrop-blur-sm text-size-tiny font-semibold text-primary tracking-wide uppercase">
                    {product.category}
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="card-title text-foreground mb-1">{product.name}</h3>
                  <p className="text-primary text-size-large font-bold mb-3">{product.price}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-size-small text-muted-foreground hover:text-primary transition-colors"
                  >
                    View Product <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default ProductGallery
