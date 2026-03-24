"use client"

import { forwardRef, useState, type Ref } from "react"

interface SignupHeroProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  subheading?: string
  formHeading?: string
  submitButtonText?: string
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
  image?: string
}

const SignupHero = forwardRef(function SignupHero(
  {
    className,
    sectionStyle,
    overline = "Apply Today",
    heading = "Join The CAST TradePro Program",
    subheading = "CAST Lighting's TradePro program gives professional landscape contractors, designers, and installers access to exclusive pricing, dedicated support, and the industry's best outdoor lighting fixtures.",
    formHeading = "Start Your Application",
    submitButtonText = "Submit Application",
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    paddingTop,
    paddingBottom,
    image,
  }: SignupHeroProps,
  ref: Ref<HTMLDivElement>
) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#25262d"

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", background: sectionBackground, paddingTop: paddingTop ?? 0, paddingBottom: paddingBottom ?? 0 }}
    >
      {/* Hero banner */}
      <div
        style={{
          background: image
            ? `linear-gradient(rgba(0,30,40,0.72), rgba(0,30,40,0.72)), url(${image}) center/cover`
            : "var(--color-primary)",
          padding: "80px 0",
        }}
      >
        <div className="site-container" style={{ textAlign: "center", maxWidth: 720 }}>
          {overline && (
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", margin: "0 0 12px" }}>{overline}</p>
          )}
          <h1 style={{ fontSize: "var(--h1-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "#fff", margin: "0 0 20px" }}>
            {heading}
          </h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, margin: 0 }}>
            {subheading}
          </p>
        </div>
      </div>

      {/* Form card — centered, pulls up slightly into the hero */}
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", maxWidth: 560, margin: "0 auto" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 16 }}>
                <circle cx="12" cy="12" r="11" fill="var(--color-accent)" opacity="0.15" />
                <path d="M7 12l4 4 6-7" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--color-title)", margin: "0 0 10px" }}>Application Received</h3>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "var(--color-content)", lineHeight: 1.6, margin: 0 }}>Thank you for applying. A CAST account manager will contact you within 1–2 business days.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 20, fontWeight: 700, color: "var(--color-title)", margin: "0 0 24px" }}>{formHeading}</h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>First Name*</label>
                    <input required type="text" placeholder="John" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Last Name*</label>
                    <input required type="text" placeholder="Smith" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Business Name*</label>
                  <input required type="text" placeholder="Smith Landscape Co." style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Business Email*</label>
                  <input required type="email" placeholder="john@smithlandscape.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Phone Number</label>
                  <input type="tel" placeholder="(555) 000-0000" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Business Type*</label>
                  <select required style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", background: "#2d353c", outline: "none" }}>
                    <option value="">Select one...</option>
                    <option>Landscape Contractor</option>
                    <option>Landscape Designer</option>
                    <option>Electrical Contractor</option>
                    <option>Lighting Designer</option>
                    <option>Distributor / Dealer</option>
                    <option>Other</option>
                  </select>
                </div>
                <button type="submit" className="sg-btn-solid-md" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                  {submitButtonText}
                </button>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "var(--color-content)", margin: 0, textAlign: "center" }}>By submitting, you agree to CAST Lighting's Terms & Privacy Policy.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
})

export default SignupHero
