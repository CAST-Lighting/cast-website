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
  <div style={{ display: "flex", gap: 3 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={i <= (count ?? 5) ? "#f0ae1e" : "rgba(127,190,232,0.15)"}
      >
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
    heading = "What Contractors Are Saying",
    reviews,
    bgColor,
  }: ReviewsCarouselProps,
  ref: Ref<HTMLDivElement>
) {
  const [offset, setOffset] = useState(0)
  const list = reviews && reviews.length > 0 ? reviews : DEFAULT_REVIEWS
  const visibleCount = 3
  const max = Math.max(0, list.length - visibleCount)

  return (
    <>
      <style>{`
        .rc-section {
          width: 100%;
          box-sizing: border-box;
        }
        .rc-card {
          background: #243340;
          border: 1px solid rgba(127,190,232,0.1);
          border-radius: 14px;
          padding: 30px 28px;
          flex: 0 0 calc(33.333% - 16px);
          min-width: 260px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .rc-card:hover {
          border-color: rgba(127,190,232,0.22);
          box-shadow: 0 8px 28px rgba(0,0,0,0.22);
          transform: translateY(-3px);
        }
        .rc-track {
          display: flex;
          gap: 24px;
          transition: transform 420ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .rc-viewport {
          overflow: hidden;
        }
        .rc-arrow {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid rgba(127,190,232,0.25);
          background: #1e2d38;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7ebee8;
          transition: background 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
        }
        .rc-arrow:hover:not(:disabled) {
          background: #007cb0;
          border-color: #007cb0;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0,124,176,0.3);
        }
        .rc-arrow:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
        .rc-quote-mark {
          font-family: 'Essonnes', 'Playfair Display', serif;
          font-size: 56px;
          line-height: 1;
          color: rgba(126,190,232,0.12);
          margin: -8px 0 -16px;
          display: block;
          user-select: none;
        }
        .rc-text {
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          color: #90a4ae;
          line-height: 1.68;
          margin: 0;
          flex: 1;
          font-style: italic;
        }
        .rc-divider {
          width: 32px;
          height: 1px;
          background: rgba(127,190,232,0.15);
          flex-shrink: 0;
        }
        .rc-name {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #e2edf2;
          margin: 0 0 3px;
          letter-spacing: 0.01em;
        }
        .rc-location {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: #546f7a;
          margin: 0;
          letter-spacing: 0.03em;
        }
        @media (max-width: 900px) {
          .rc-card {
            flex: 0 0 calc(50% - 12px);
          }
        }
        @media (max-width: 575px) {
          .rc-card {
            flex: 0 0 100%;
          }
        }
      `}</style>

      <div
        ref={ref}
        className={`rc-section ${className || ""} ${sectionStyle || ""}`}
        style={{ backgroundColor: "#1e2d38" }}
      >
        <div className="site-container" style={{ paddingTop: 72, paddingBottom: 72 }}>
          {overline && (
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#7ebee8",
                marginBottom: 14,
                marginTop: 0,
              }}
            >
              {overline}
            </p>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 44,
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: "var(--h2-size)",
                fontWeight: "var(--heading-weight, 700)",
                lineHeight: "var(--heading-line-height, 1.1)",
                fontFamily: "'Essonnes', 'Playfair Display', serif",
                color: "#e2edf2",
                margin: 0,
              }}
            >
              {heading}
            </h2>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button
                className="rc-arrow"
                onClick={() => setOffset(Math.max(0, offset - 1))}
                disabled={offset === 0}
                aria-label="Previous reviews"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="rc-arrow"
                onClick={() => setOffset(Math.min(max, offset + 1))}
                disabled={offset >= max}
                aria-label="Next reviews"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="rc-viewport">
            <div
              className="rc-track"
              style={{ transform: `translateX(calc(-${offset} * (33.333% + 8px)))` }}
            >
              {list.map((r, i) => (
                <div key={i} className="rc-card">
                  <Stars count={r.rating ?? 5} />
                  <span className="rc-quote-mark" aria-hidden="true">&ldquo;</span>
                  <p className="rc-text">{r.text}</p>
                  <div className="rc-divider" />
                  <div>
                    <p className="rc-name">{r.name}</p>
                    <p className="rc-location">{r.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default ReviewsCarousel
