"use client"

import { forwardRef, type Ref } from "react"
import { Phone } from "lucide-react"

interface NavigationTopperProps {
  className?: string
  sectionStyle?: string
  bgColor?: string
  leftLink1Text?: string
  leftLink1Href?: string
  leftLink2Text?: string
  leftLink2Href?: string
  leftLink2IsButton?: boolean
  leftLink2ButtonBgColor?: string
  leftLink2ButtonTextColor?: string
  phone?: string
  rightLinkText?: string
  rightLinkHref?: string
  marqueeItems?: string[]
}

const DEFAULT_MARQUEE = [
  "Free Shipping on All TradePro Orders",
  "Solid Brass & Copper — Built to Last a Lifetime",
  "Made in the USA",
  "New 2026 Product Catalog Now Available",
  "Exclusive Contractor Pricing — Join TradePro Today",
  "Industry-Leading Lifetime Warranty",
]

const Star = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f0ae1e" style={{ flexShrink: 0 }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const NavigationTopper = forwardRef(function NavigationTopper(
  {
    className,
    sectionStyle,
    bgColor,
    leftLink1Text = "EASY CONTRACTOR PRICING",
    leftLink1Href = "/contractor-pricing",
    leftLink2Text = "BECOME A TRADE PRO",
    leftLink2Href = "/trade-pro",
    leftLink2IsButton = false,
    leftLink2ButtonBgColor = "#ffffff",
    leftLink2ButtonTextColor = "#004960",
    phone = "(973) 423-2303",
    rightLinkText = "Contact Us",
    rightLinkHref = "/contact",
    marqueeItems = DEFAULT_MARQUEE,
  }: NavigationTopperProps,
  ref: Ref<HTMLDivElement>
) {
  const items = marqueeItems && marqueeItems.length > 0 ? marqueeItems : DEFAULT_MARQUEE
  // Duplicate for seamless loop
  const track = [...items, ...items]

  return (
    <>
      <style>{`
        .nt-root {
          width: 100%;
          box-sizing: border-box;
          background: #0a1520;
          border-bottom: 1px solid rgba(127,190,232,0.08);
          overflow: hidden;
        }
        .nt-link {
          font-size: 11px;
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nt-link:hover { color: #7ebee8; }
        .nt-sep {
          color: rgba(255,255,255,0.2);
          margin: 0 12px;
          user-select: none;
          flex-shrink: 0;
        }
        .nt-marquee-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .nt-marquee-track {
          display: flex;
          align-items: center;
          gap: 0;
          animation: ntScroll 36s linear infinite;
          width: max-content;
        }
        .nt-marquee-track:hover { animation-play-state: paused; }
        @keyframes ntScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nt-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 32px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
        }
        .nt-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--nav-pad, 64px);
          display: flex;
          align-items: center;
          height: 34px;
          gap: 16px;
        }
        .nt-sides {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .nt-sides { display: none; }
          .nt-inner { padding: 0 20px; }
        }
      `}</style>
      <div
        ref={ref}
        className={`nt-root ${sectionStyle || ""} ${className || ""}`}
      >
        <div className="nt-inner">
          {/* Left links */}
          <div className="nt-sides">
            <a href={leftLink1Href} className="nt-link">{leftLink1Text}</a>
            <span className="nt-sep">|</span>
            <a
              href={leftLink2Href}
              className="nt-link"
              style={leftLink2IsButton ? {
                background: leftLink2ButtonBgColor,
                color: leftLink2ButtonTextColor,
                padding: "2px 10px",
                borderRadius: "3px",
                fontSize: "10px",
              } : undefined}
            >
              {leftLink2Text}
            </a>
          </div>

          {/* Scrolling marquee */}
          <div className="nt-marquee-wrap">
            <div className="nt-marquee-track">
              {track.map((text, i) => (
                <span key={i} className="nt-marquee-item">
                  <Star />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right links */}
          <div className="nt-sides">
            <a href={`tel:${phone?.replace(/[^\d+]/g, "")}`} className="nt-link" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Phone size={11} style={{ flexShrink: 0 }} />{phone}
            </a>
            <span className="nt-sep">|</span>
            <a href={rightLinkHref} className="nt-link">{rightLinkText}</a>
          </div>
        </div>
      </div>
    </>
  )
})

export default NavigationTopper
