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
}

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
  }: NavigationTopperProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <>
      <style>{`
        .nav-topper {
          width: 100%;
          box-sizing: border-box;
        }
        .nav-topper-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 7px var(--nav-pad, 64px);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-topper-link {
          font-size: 12px;
          font-family: 'Barlow', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-topper-link:hover {
          color: #ffffff;
        }
        .nav-topper-sep {
          color: rgba(255,255,255,0.3);
          margin: 0 10px;
          user-select: none;
        }
        @media (max-width: 768px) {
          .nav-topper-inner {
            padding: 6px var(--nav-pad, 32px);
          }
          .nav-topper-link {
            font-size: 11px;
          }
        }
        @media (max-width: 575px) {
          .nav-topper-inner {
            flex-direction: column;
            gap: 4px;
            padding: 8px var(--nav-pad, 20px);
          }
        }
      `}</style>
      <div
        ref={ref}
        className={`nav-topper ${sectionStyle || ""} ${className || ""}`}
        style={{ backgroundColor: bgColor || "#003344" }}
      >
        <div className="nav-topper-inner">
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href={leftLink1Href} className="nav-topper-link">{leftLink1Text}</a>
            <span className="nav-topper-sep">|</span>
            <a
              href={leftLink2Href}
              className="nav-topper-link"
              style={leftLink2IsButton ? {
                background: leftLink2ButtonBgColor,
                color: leftLink2ButtonTextColor,
                padding: "3px 12px",
                borderRadius: "4px",
                fontSize: "11px",
              } : undefined}
            >
              {leftLink2Text}
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <a href={`tel:${phone?.replace(/[^\d+]/g, "")}`} className="nav-topper-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Phone size={12} />{phone}
            </a>
            <span className="nav-topper-sep">|</span>
            <a href={rightLinkHref} className="nav-topper-link">{rightLinkText}</a>
          </div>
        </div>
      </div>
    </>
  )
})

export default NavigationTopper
