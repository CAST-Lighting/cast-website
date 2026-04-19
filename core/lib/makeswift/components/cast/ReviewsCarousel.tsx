"use client"
import { forwardRef, useState, useRef, useEffect, type Ref } from "react"
import { Star, ArrowLeft, ArrowRight } from "lucide-react"
import { useCmsData } from "~/lib/makeswift/cms-context"
import { getTheme, type ThemeMode } from "~/lib/makeswift/theme"

const PLACEHOLDER_PERSON = "https://storage.googleapis.com/s.mkswft.com/RmlsZTo0MzUyZTgwOS1jZDk2LTQ3YWQtOGM0ZC1kZDdhYmRlODhkMDY=/placeholder_person.webp"

interface Review {
  name?: string
  role?: string
  quote?: string
  rating?: number
  location?: string
  avatar?: string
}

interface ReviewsCarouselProps {
  className?: string
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  overline?: string
  heading?: string
  headingAccent?: string
  reviews?: Review[]
  mode?: ThemeMode
}

const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Michael Torres",
    role: "Landscape Contractor",
    location: "Austin, TX",
    rating: 5,
    quote: "I've been installing CAST fixtures for 8 years and nothing comes close to the build quality. Solid brass construction means I never get call-backs about corroded housings. My clients see the difference immediately.",
  },
  {
    name: "Jennifer Walsh",
    role: "Homeowner",
    location: "Charlotte, NC",
    rating: 5,
    quote: "We had CAST path lights installed along our driveway and the transformation was incredible. Three years later they look exactly the same. Worth every penny — I tell everyone who asks about them.",
  },
  {
    name: "David Chen",
    role: "Lighting Designer",
    location: "Los Angeles, CA",
    rating: 5,
    quote: "The interchangeable optics system is a game changer. I can specify CAST knowing I have full control over the beam spread after installation. No other brand offers that level of field adjustability.",
  },
  {
    name: "Sarah Jamison",
    role: "Landscape Architect",
    location: "Denver, CO",
    rating: 5,
    quote: "CAST's TradePro program is the best in the industry. The support team knows their products inside and out, and the warranty is actually honored — no questions asked. That's rare.",
  },
  {
    name: "Robert Martinez",
    role: "Electrical Contractor",
    location: "Miami, FL",
    rating: 5,
    quote: "Switched my business to CAST two years ago and haven't looked back. The LED modules are field-serviceable so I can keep fixtures running for decades. My margins are better and my clients are happier.",
  },
  {
    name: "Lisa Park",
    role: "Homeowner",
    location: "Seattle, WA",
    rating: 5,
    quote: "Our outdoor lighting was always an afterthought until we found CAST. Now it's the first thing guests comment on. The warm color rendering looks completely natural — not that harsh LED blue you see everywhere.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          style={{
            width: 16,
            height: 16,
            fill: i <= rating ? "var(--color-accent, #007CB0)" : "transparent",
            stroke: "var(--color-accent, #007CB0)",
          }}
        />
      ))}
    </div>
  )
}

const ReviewsCarousel = forwardRef(function ReviewsCarousel(
  {
    className,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    overline = "What Professionals Say",
    heading = "Trusted by Contractors",
    headingAccent = "Nationwide",
    reviews: reviewsProp,
    mode = 'dark',
  }: ReviewsCarouselProps,
  ref: Ref<HTMLElement>
) {
  const t = getTheme(mode)
  const cms = useCmsData()
  const cmsReviews = cms?.type === 'product' ? cms.meta?.reviews : null

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // CMS reviews → component reviews, with fallback to props then defaults
  const cmsReviewsMapped: Review[] | null = cmsReviews && cmsReviews.length > 0
    ? cmsReviews.map((r) => ({
        name: r.author,
        rating: r.rating,
        quote: r.text,
        location: r.date,
      }))
    : null

  const reviews = reviewsProp && reviewsProp.length > 0
    ? reviewsProp
    : (cmsReviewsMapped ?? DEFAULT_REVIEWS)

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

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 340
    const distance = dir === "left" ? -cardWidth * 2 : cardWidth * 2
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
  const overlayOpacity = typeof bgOpacity === "number" ? bgOpacity / 100 : 0.88
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || "to bottom"}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#f8f9fa"

  return (
    <section
      ref={ref}
      className={`cast-section-default relative overflow-hidden ${className || ""}`}
      style={{
        width: '100%',
        ...(!bgImage ? { background: sectionBackground } : {}),
      }}
    >
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      )}
      {bgImage && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }}
        />
      )}

      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header — aligned to site-container */}
        <div className="site-container mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div style={{ textAlign: "left" }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.14em", color: t.accent, margin: "0 0 12px", display: "block" }}>{overline}</span>
              <h2 className="section-heading" style={{ marginTop: 12, fontSize: "var(--h2-size)", color: t.heading }}>
                {heading}{" "}
                <span className="text-gradient-warm">{headingAccent}</span>
              </h2>
              {/* Aggregate rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                <StarRating rating={5} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: t.body }}>
                  4.9 / 5 — based on 200+ verified reviews
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button onClick={() => scroll("left")} disabled={!canScrollLeft} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors duration-200 ease-in disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll("right")} disabled={!canScrollRight} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors duration-200 ease-in disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel — left edge aligns with site-container, bleeds right */}
        <div style={{ paddingLeft: "max(16px, calc((100vw - 1600px) / 2 + 64px))" }}>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pr-16 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[340px]"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.cardBorder}`,
                  borderRadius: 14,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <StarRating rating={review.rating ?? 5} />
                <p style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 15,
                  color: t.body,
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                  fontStyle: "italic",
                }}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div style={{ borderTop: `1px solid ${t.divider}`, paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={review.avatar || PLACEHOLDER_PERSON}
                    alt={review.name || "Reviewer"}
                    style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(0,124,176,0.3)" }}
                  />
                  <div>
                    <p style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: t.heading,
                      margin: "0 0 2px",
                    }}>
                      {review.name}
                    </p>
                    <p style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 13,
                      color: t.subtle,
                      margin: 0,
                    }}>
                      {review.role}{review.location ? ` · ${review.location}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default ReviewsCarousel
