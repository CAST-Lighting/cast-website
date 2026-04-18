"use client"

import { forwardRef, useState, type Ref } from "react"

interface DistributorFinderProps {
  className?: string
  paddingTop?: number
  paddingBottom?: number
  sectionStyle?: string
  overline?: string
  heading?: string
  subheading?: string
  formHeading?: string
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
}

const PLACEHOLDER_DISTRIBUTORS = [
  { name: "Pacific Outdoor Supply Co.", city: "Los Angeles", state: "CA", type: "Wholesale Distributor", phone: "(310) 555-0281", brands: ["CAST", "FX Luminaire", "Kichler"] },
  { name: "Southwest Landscape Supply", city: "Phoenix", state: "AZ", type: "Landscape Distributor", phone: "(602) 555-0154", brands: ["CAST", "Vista Professional"] },
  { name: "Eastern Pro Lighting", city: "Atlanta", state: "GA", type: "Lighting Showroom", phone: "(404) 555-0367", brands: ["CAST", "Unique Lighting"] },
]

const Benefit = ({ text }: { text: string }) => (
  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="11" fill="var(--color-accent)" opacity="0.15" />
      <path d="M7 12l4 4 6-7" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "var(--color-content)", lineHeight: 1.5 }}>{text}</span>
  </div>
)

const DistributorFinder = forwardRef(function DistributorFinder(
  {
    className,
    paddingTop = 96,
    paddingBottom = 96,
    sectionStyle,
    overline = "Find Or Become A Distributor",
    heading = "CAST Distribution Partners",
    subheading = "CAST Lighting works with a select network of professional landscape supply distributors across the country. Find a distributor near you, or apply to carry CAST in your territory.",
    formHeading = "Apply To Become A CAST Distributor",
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection
  }: DistributorFinderProps,
  ref: Ref<HTMLDivElement>
) {
  const [zip, setZip] = useState("")
  const [searched, setSearched] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
  }

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
      className={`cast-distributor-finder-defaults ${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", background: sectionBackground, paddingTop, paddingBottom, }}
    >
      {/* Hero */}
      <div style={{ background: "var(--color-primary)", padding: "72px 0" }}>
        <div className="site-container">
          {overline && (
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", margin: "0 0 12px" }}>{overline}</p>
          )}
          <h1 style={{ fontSize: "var(--h1-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "#fff", margin: "0 0 16px", maxWidth: 620 }}>
            {heading}
          </h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, maxWidth: 540, margin: "0 0 36px" }}>
            {subheading}
          </p>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 0, maxWidth: 480, width: "100%", background: "#2d353c", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
            <input
              type="text"
              value={zip}
              onChange={e => setZip(e.target.value)}
              placeholder="Enter your ZIP code"
              style={{ flex: 1, padding: "14px 18px", border: "none", fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "var(--color-title)", outline: "none" }}
            />
            <button type="submit" style={{ background: "var(--color-accent)", color: "#fff", border: "none", padding: "14px 24px", fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer", flexShrink: 0 }}>
              Find
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <style>{`
        .df-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: flex-start; }
        @media (max-width: 768px) { .df-main-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="site-container" style={{ paddingTop: 64, paddingBottom: 72 }}>
        <div className="df-main-grid">

          {/* Distributor results + map */}
          <div>
            <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 24px" }}>
              {searched ? `Results near "${zip}"` : "Current Distributors"}
            </h2>

            {/* Map placeholder */}
            <div style={{ background: "#e2e8ed", borderRadius: 10, height: 200, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: "1px solid #d1d9e0", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,73,96,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,73,96,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <div style={{ textAlign: "center", position: "relative" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" style={{ marginBottom: 8, opacity: 0.5 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "var(--color-content)", margin: 0, opacity: 0.7 }}>Map — connected in next phase</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PLACEHOLDER_DISTRIBUTORS.map((d, i) => (
                <div key={i} style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "18px 20px" }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--color-title)", margin: "0 0 4px" }}>{d.name}</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", margin: "0 0 4px" }}>{d.city}, {d.state} · {d.type}</p>
                  <a href={`tel:${d.phone}`} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none", display: "block", marginBottom: 8 }}>{d.phone}</a>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {d.brands.map((b, bi) => (
                      <span key={bi} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 3, fontSize: 11, fontFamily: "'Barlow', sans-serif", fontWeight: 600, color: "rgba(255,255,255,0.85)", padding: "2px 8px" }}>{b}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div>
            <div style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 16 }}>
                    <circle cx="12" cy="12" r="11" fill="var(--color-accent)" opacity="0.15" />
                    <path d="M7 12l4 4 6-7" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h3-size)", fontWeight: 700, color: "var(--color-title)", margin: "0 0 10px" }}>Application Received</h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "var(--color-content)", lineHeight: 1.6, margin: 0 }}>Our distribution team will review your application and follow up within 3–5 business days.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h3-size)", fontWeight: 700, color: "var(--color-title)", margin: "0 0 8px" }}>{formHeading}</h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-content)", lineHeight: 1.5, margin: "0 0 24px" }}>Carry the industry's best outdoor lighting brand in your market.</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
                    <Benefit text="Exclusive territory protection available" />
                    <Benefit text="Industry-leading margins on all CAST products" />
                    <Benefit text="Full marketing support and co-op funds" />
                    <Benefit text="CAST factory training and certification" />
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Company Name*</label>
                      <input required type="text" placeholder="Acme Landscape Supply" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Contact Name*</label>
                      <input required type="text" placeholder="Jane Doe" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Email*</label>
                      <input required type="email" placeholder="jane@acmesupply.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Territory / State*</label>
                      <input required type="text" placeholder="e.g. Southern California" style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-title)", display: "block", marginBottom: 6 }}>Annual Revenue Range</label>
                      <select style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-title)", boxSizing: "border-box", background: "#2d353c", outline: "none" }}>
                        <option value="">Select...</option>
                        <option>Under $500K</option>
                        <option>$500K – $2M</option>
                        <option>$2M – $10M</option>
                        <option>Over $10M</option>
                      </select>
                    </div>
                    <button type="submit" className="sg-btn-solid-md" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                      Submit Application
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default DistributorFinder
