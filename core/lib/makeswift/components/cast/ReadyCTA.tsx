"use client"

import { forwardRef, type Ref } from "react"

interface ReadyCTAProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  subheading?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  bgColor?: string
  textColor?: string
}

const ReadyCTA = forwardRef(function ReadyCTA(
  {
    className,
    sectionStyle,
    overline = "READY TO GET STARTED?",
    heading = "Ready To Become A TradePro?",
    subheading = "Join thousands of contractors who trust CAST Lighting. Access professional products with lifetime warranties that give you design control in the field.",
    primaryButtonText = "Apply Now",
    primaryButtonHref = "/trade-pro-signup",
    secondaryButtonText = "Contact Us",
    secondaryButtonHref = "/contact",
    bgColor,
    textColor,
  }: ReadyCTAProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "var(--color-primary)" }}
    >
      <div className="site-container" style={{ paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
        {overline && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(175,229,253,0.8)", marginBottom: 16, marginTop: 0 }}>
            {overline}
          </p>
        )}
        <h2 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Barlow', sans-serif", color: textColor || "#ffffff", margin: "0 0 20px" }}>
          {heading}
        </h2>
        {subheading && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: "0 auto 40px", maxWidth: 640 }}>
            {subheading}
          </p>
        )}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {primaryButtonText && (
            <a href={primaryButtonHref || "#"} className="sg-btn-solid-dark-lg">{primaryButtonText}</a>
          )}
          {secondaryButtonText && (
            <a href={secondaryButtonHref || "#"} className="sg-btn-outline-dark-lg">{secondaryButtonText}</a>
          )}
        </div>
      </div>
    </div>
  )
})

export default ReadyCTA
