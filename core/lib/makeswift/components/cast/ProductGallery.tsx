"use client"

import { forwardRef, useEffect, useRef, useState, type Ref } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

export interface GalleryItem {
  category?: string
  image?: string
  name?: string
  price?: string
  href?: string
}

export interface ProductGalleryProps {
  className?: string
  sectionStyle?: string
  title?: string
  description?: string
  items?: GalleryItem[]
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
}

const defaultItems: GalleryItem[] = [
  { category: "Path Lights", name: "Classic Brass Path Light", price: "$189.00", href: "#", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { category: "Path Lights", name: "Modern Copper Path Light", price: "$209.00", href: "#", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80" },
  { category: "Spot Lights", name: "Pro Series Spotlight", price: "$149.00", href: "#", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { category: "Spot Lights", name: "Compact LED Spotlight", price: "$129.00", href: "#", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80" },
  { category: "Wall Wash", name: "Copper Wall Washer", price: "$219.00", href: "#", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80" },
  { category: "Well Lights", name: "In-Ground LED Well Light", price: "$169.00", href: "#", image: "https://images.unsplash.com/photo-1550070881-a5d71eda5800?w=600&q=80" },
]

const ProductGallery = forwardRef(function ProductGallery(
  {
    className,
    sectionStyle,
    title = "Our Favorite Picks",
    description = "Explore our most popular landscape lighting fixtures trusted by contractors nationwide.",
    items,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: ProductGalleryProps,
  ref: Ref<HTMLElement>
) {
  const products = (items && items.length > 0 ? items : defaultItems)
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
    const cardWidth = 300
    const distance = direction === "left" ? -cardWidth * 2 : cardWidth * 2
    const start = el.scrollLeft
    const duration = 600
    let startTime: number | null = null
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      el.scrollLeft = start + distance * easeInOutCubic(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden ${sectionStyle || ""} ${className || ""}`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
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
      </div>

      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover z-[1]" />
      )}
      {overlayColor && (overlayOpacity ?? 0) > 0 && (
        <div
          className="absolute inset-0 z-[2]"
          style={{ backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100 }}
        />
      )}

      <div className="site-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="section-heading text-4xl md:text-5xl text-foreground mb-3">
              {title}
            </h2>
            <p className="section-desc max-w-md">{description}</p>
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
            <a href="#" className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-medium ml-4">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Carousel — left-aligned, bleeds right */}
      <div className="pl-[max(1.5rem,calc((100vw-1400px)/2+1.5rem))] relative z-10">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pr-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, i) => (
            <div
              key={i}
              className="group flex-shrink-0 w-[280px] bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-md"
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                {product.category && (
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-semibold text-primary tracking-wide uppercase">
                    {product.category}
                  </span>
                )}
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name || ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="card-title text-foreground mb-1">{product.name}</h3>
                <p className="text-primary text-lg font-bold mb-3">{product.price}</p>
                <a
                  href={product.href || "#"}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View Product <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default ProductGallery
