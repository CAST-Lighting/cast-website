"use client"
import { forwardRef, type Ref, useState, useRef, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface BCProduct {
  entityId: number
  name: string
  path: string
  image: string
  imageAlt: string
  price: string
}

const FALLBACK_PRODUCTS: BCProduct[] = [
  { entityId: 1, name: "Classic Brass Path Light", price: "$189.00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", imageAlt: "Classic Brass Path Light", path: "/shop" },
  { entityId: 2, name: "Modern Copper Path Light", price: "$209.00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", imageAlt: "Modern Copper Path Light", path: "/shop" },
  { entityId: 3, name: "Pro Series Spotlight", price: "$149.00", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80", imageAlt: "Pro Series Spotlight", path: "/shop" },
  { entityId: 4, name: "Compact LED Spotlight", price: "$129.00", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80", imageAlt: "Compact LED Spotlight", path: "/shop" },
  { entityId: 5, name: "Copper Wall Washer", price: "$219.00", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", imageAlt: "Copper Wall Washer", path: "/shop" },
  { entityId: 6, name: "Slim Profile Wall Wash", price: "$199.00", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", imageAlt: "Slim Profile Wall Wash", path: "/shop" },
]

interface ProductGalleryProps {
  className?: string
  sectionTitle?: string
  sectionTitleAccent?: string
  sectionDescription?: string
  viewAllLabel?: string
  viewAllHref?: string
  bgImage?: string
  bgColor?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  lineHeight?: number
  paddingTop?: number
  paddingBottom?: number
}

const ProductGallery = forwardRef(function ProductGallery(
  {
    className,
    sectionTitle,
    sectionTitleAccent,
    sectionDescription,
    viewAllLabel,
    viewAllHref,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    lineHeight,
    paddingTop,
    paddingBottom,
  }: ProductGalleryProps,
  ref: Ref<HTMLElement>
) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [products, setProducts] = useState<BCProduct[]>(FALLBACK_PRODUCTS)

  useEffect(() => {
    fetch('/api/cast/featured-products')
      .then((r) => r.json())
      .then((data: BCProduct[]) => { if (data.length > 0) setProducts(data) })
      .catch(() => {})
  }, [])

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
    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('div')?.offsetWidth ?? 300
    const distance = dir === 'left' ? -cardWidth * 2 : cardWidth * 2
    const start = el.scrollLeft
    const duration = 600
    let startTime: number | null = null
    const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / duration, 1)
      el.scrollLeft = start + distance * ease(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#0d1b2e'

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ''}`}
      style={{
        ...(!bgImage ? { background: sectionBackground } : {}),
        '--section-line-height': lineHeight,
        paddingTop: paddingTop ?? 96,
        paddingBottom: paddingBottom ?? 96,
      } as React.CSSProperties}
    >
      {bgImage && <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />}
      {bgImage && <div className="absolute inset-0" style={{ background: sectionBackground, opacity: overlayOpacity, zIndex: 1 }} />}

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header — aligned to site-container */}
        <div className="site-container mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="section-heading text-foreground mb-3">
                {sectionTitle || 'Our Favorite'}{' '}
                <span className="text-gradient-warm">{sectionTitleAccent || 'Picks'}</span>
              </h2>
              <p className="section-desc max-w-md">
                {sectionDescription || 'Explore our most popular landscape lighting fixtures trusted by contractors nationwide.'}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button onClick={() => scroll('left')} disabled={!canScrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll('right')} disabled={!canScrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href={viewAllHref || '/shop'} className="flex items-center gap-2 text-primary hover:text-accent transition-colors text-size-medium font-medium ml-4">
                {viewAllLabel || 'View All'} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Carousel — left edge aligns with site-container, bleeds right */}
        <div style={{ paddingLeft: 'max(64px, calc((100vw - 1600px) / 2 + 64px))' }}>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pr-16 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <a
                key={product.entityId}
                href={product.path}
                className="group flex-shrink-0 w-[280px] bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/30 no-underline"
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="card-title text-foreground mb-1">{product.name}</h3>
                  {product.price && <p className="text-primary text-size-large font-bold mb-3">{product.price}</p>}
                  <span className="inline-flex items-center gap-1.5 text-size-small text-muted-foreground group-hover:text-primary transition-colors">
                    View Product <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default ProductGallery
