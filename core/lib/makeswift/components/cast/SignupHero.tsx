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
    image,
  }: SignupHeroProps,
  ref: Ref<HTMLDivElement>
) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#f6f7f8" }}
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
          <h1 style={{ fontSize: "var(--h1-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Barlow', sans-serif", color: "#fff", margin: "0 0 20px" }}>
            {heading}
          </h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, margin: 0 }}>
            {subheading}
          </p>
        </div>
      </div>

      {/* Form card — centered, pulls up slightly into the hero */}
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 12, padding: "40px 36px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", maxWidth: 560, margin: "0 auto" }}>
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
                    <input required type="text" placeholder="John" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #dee2e6", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Last Name*</label>
                    <input required type="text" placeholder="Smith" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #dee2e6", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Business Name*</label>
                  <input required type="text" placeholder="Smith Landscape Co." style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #dee2e6", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Business Email*</label>
                  <input required type="email" placeholder="john@smithlandscape.com" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #dee2e6", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Phone Number</label>
                  <input type="tel" placeholder="(555) 000-0000" style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #dee2e6", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Business Type*</label>
                  <select required style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #dee2e6", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", background: "#fff", outline: "none" }}>
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
