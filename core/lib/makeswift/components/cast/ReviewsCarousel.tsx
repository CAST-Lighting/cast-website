"use client"

import { forwardRef, useState, type Ref } from "react"

interface Review {
  name?: string
  location?: string
  rating?: number
  text?: string
}

interface ReviewsCarouselProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  reviews?: Review[]
  bgColor?: string
}

const DEFAULT_REVIEWS: Review[] = [
  { name: "Mike T.", location: "Dallas, TX", rating: 5, text: "The quality of CAST fixtures is unmatched. I've installed hundreds of their path lights and never had a single failure in over a decade of professional use." },
  { name: "Sarah M.", location: "Phoenix, AZ", rating: 5, text: "As a landscape contractor, CAST is the only brand I trust for outdoor lighting. Solid brass construction that is genuinely built to last a lifetime." },
  { name: "James R.", location: "Atlanta, GA", rating: 5, text: "Incredible customer support and the products speak for themselves. My clients are always blown away by the finished result. Won't use anything else." },
  { name: "David L.", location: "Denver, CO", rating: 5, text: "Switched from cheaper brands and never looked back. Worth every penny for the lifetime warranty alone — the build quality is in a different league." },
  { name: "Jennifer K.", location: "Seattle, WA", rating: 5, text: "The Bluetooth color control system is a complete game changer. Clients love showing it off. Incredibly easy to install and rock-solid reliable." },
  { name: "Robert H.", location: "Nashville, TN", rating: 5, text: "Best landscape lighting on the market, period. The brass patinas beautifully over time and every single piece feels like it was made to last forever." },
]

const Stars = ({ count = 5 }: { count?: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= (count ?? 5) ? "#f59e0b" : "#e5e7eb"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const ReviewsCarousel = forwardRef(function ReviewsCarousel(
  {
    className,
    sectionStyle,
    overline = "TESTIMONIALS",
    heading = "Our Raving Reviews",
    reviews,
    bgColor,
  }: ReviewsCarouselProps,
  ref: Ref<HTMLDivElement>
) {
  const [offset, setOffset] = useState(0)
  const list = reviews && reviews.length > 0 ? reviews : DEFAULT_REVIEWS
  const max = Math.max(0, list.length - 3)

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#f6f7f8" }}
    >
      <style>{`
        .rc-card {
          background: #fff;
          border-radius: 8px;
          padding: 28px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
          flex: 0 0 calc(33.333% - 16px);
          min-width: 260px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .rc-track { display: flex; gap: 24px; transition: transform 420ms cubic-bezier(.4,0,.2,1); }
        .rc-viewport { overflow: hidden; }
        .rc-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          border: 2px solid var(--color-primary);
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--color-primary);
          transition: background 200ms ease, color 200ms ease;
          flex-shrink: 0;
        }
        .rc-arrow:hover { background: var(--color-primary); color: #fff; }
        .rc-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
        @media (max-width: 900px) { .rc-card { flex: 0 0 calc(50% - 12px); } }
        @media (max-width: 575px) { .rc-card { flex: 0 0 100%; } }
      `}</style>

      <div className="site-container" style={{ paddingTop: 72, paddingBottom: 72 }}>
        {overline && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent)", marginBottom: 12, marginTop: 0 }}>
            {overline}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, gap: 16, flexWrap: "wrap" }}>
          <h2 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Barlow', sans-serif", color: "var(--color-title)", margin: 0 }}>
            {heading}
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="rc-arrow" onClick={() => setOffset(Math.max(0, offset - 1))} disabled={offset === 0} aria-label="Previous reviews">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="rc-arrow" onClick={() => setOffset(Math.min(max, offset + 1))} disabled={offset >= max} aria-label="Next reviews">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        <div className="rc-viewport">
          <div className="rc-track" style={{ transform: `translateX(calc(-${offset} * (33.333% + 8px)))` }}>
            {list.map((r, i) => (
              <div key={i} className="rc-card">
                <Stars count={r.rating ?? 5} />
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "var(--color-content)", lineHeight: 1.65, margin: 0, flex: 1 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--color-title)", margin: "0 0 2px" }}>{r.name}</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", margin: 0 }}>{r.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default ReviewsCarousel
