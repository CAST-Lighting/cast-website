"use client"
import { forwardRef, useState, type Ref } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

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
  paddingTop?: number
  paddingBottom?: number
  overline?: string
  heading?: string
  headingAccent?: string
  reviews?: Review[]
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
            fill: i <= rating ? "var(--color-accent, #c8972a)" : "transparent",
            stroke: "var(--color-accent, #c8972a)",
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
    paddingTop,
    paddingBottom,
    overline = "What Professionals Say",
    heading = "Trusted by Contractors",
    headingAccent = "Nationwide",
    reviews: reviewsProp,
  }: ReviewsCarouselProps,
  ref: Ref<HTMLElement>
) {
  const [page, setPage] = useState(0)
  const reviews = reviewsProp && reviewsProp.length > 0 ? reviewsProp : DEFAULT_REVIEWS
  const perPage = 3
  const pageCount = Math.ceil(reviews.length / perPage)
  const visible = reviews.slice(page * perPage, page * perPage + perPage)

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === "number" ? bgOpacity / 100 : 0.88
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || "to bottom"}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#141e27"

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{
        ...(!bgImage ? { background: sectionBackground } : {}),
        paddingTop: paddingTop ?? 96,
        paddingBottom: paddingBottom ?? 96,
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
        <div className="site-container">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="overline">{overline}</span>
            <h2 className="section-heading" style={{ marginTop: 12, fontSize: "clamp(32px, 4vw, 48px)" }}>
              {heading}{" "}
              <span className="text-gradient-warm">{headingAccent}</span>
            </h2>
            {/* Aggregate rating */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 16 }}>
              <StarRating rating={5} />
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
                4.9 / 5 — based on 200+ verified reviews
              </span>
            </div>
          </div>

          {/* Review cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 40,
            }}
          >
            {visible.map((review, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
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
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.7,
                  margin: 0,
                  flex: 1,
                  fontStyle: "italic",
                }}>
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={review.avatar || PLACEHOLDER_PERSON}
                    alt={review.name || "Reviewer"}
                    style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(200,151,42,0.3)" }}
                  />
                  <div>
                    <p style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 2px",
                    }}>
                      {review.name}
                    </p>
                    <p style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.5)",
                      margin: 0,
                    }}>
                      {review.role}{review.location ? ` · ${review.location}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: page === 0 ? "default" : "pointer",
                  opacity: page === 0 ? 0.4 : 1,
                  color: "#fff",
                }}
              >
                <ChevronLeft style={{ width: 20, height: 20 }} />
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      background: i === page ? "var(--color-accent, #c8972a)" : "rgba(255,255,255,0.25)",
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
                disabled={page === pageCount - 1}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: page === pageCount - 1 ? "default" : "pointer",
                  opacity: page === pageCount - 1 ? 0.4 : 1,
                  color: "#fff",
                }}
              >
                <ChevronRight style={{ width: 20, height: 20 }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
})

export default ReviewsCarousel
