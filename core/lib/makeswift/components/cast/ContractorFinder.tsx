"use client"

import { forwardRef, useState, type Ref } from "react"

interface ContractorFinderProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  subheading?: string
  bgColor?: string
}

const PLACEHOLDER_CONTRACTORS = [
  { name: "Smith Landscape & Lighting", city: "Austin", state: "TX", zip: "78701", phone: "(512) 555-0142", specialty: "Residential & Commercial", certified: true },
  { name: "Premier Outdoor Lighting Co.", city: "Dallas", state: "TX", zip: "75201", phone: "(214) 555-0389", specialty: "Commercial Projects", certified: true },
  { name: "Green Horizons Landscaping", city: "Houston", state: "TX", zip: "77001", phone: "(713) 555-0217", specialty: "Residential Gardens", certified: false },
  { name: "Illuminated Gardens LLC", city: "San Antonio", state: "TX", zip: "78201", phone: "(210) 555-0463", specialty: "Luxury Residential", certified: true },
]

const ContractorFinder = forwardRef(function ContractorFinder(
  {
    className,
    sectionStyle,
    overline = "Find A Professional",
    heading = "Find A CAST Installer Near You",
    subheading = "Connect with CAST-certified landscape lighting contractors in your area. Every professional in our network is trained on CAST products and committed to quality installation.",
    bgColor,
  }: ContractorFinderProps,
  ref: Ref<HTMLDivElement>
) {
  const [zip, setZip] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
  }

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#f6f7f8" }}
    >
      {/* Hero */}
      <div style={{ background: "var(--color-primary)", padding: "72px 0" }}>
        <div className="site-container">
          {overline && (
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", margin: "0 0 12px" }}>{overline}</p>
          )}
          <h1 style={{ fontSize: "var(--h1-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Barlow', sans-serif", color: "#fff", margin: "0 0 16px", maxWidth: 620 }}>
            {heading}
          </h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, maxWidth: 540, margin: "0 0 36px" }}>
            {subheading}
          </p>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 0, maxWidth: 480, background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
            <input
              type="text"
              value={zip}
              onChange={e => setZip(e.target.value)}
              placeholder="Enter your ZIP code"
              style={{ flex: 1, padding: "14px 18px", border: "none", fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "var(--color-title)", outline: "none" }}
            />
            <button type="submit" style={{ background: "var(--color-accent)", color: "#fff", border: "none", padding: "14px 24px", fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer", flexShrink: 0 }}>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Map placeholder + results */}
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "flex-start" }}>
          {/* Map placeholder */}
          <div style={{ background: "#e2e8ed", borderRadius: 12, overflow: "hidden", minHeight: 480, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid #d1d9e0", position: "relative" }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" style={{ marginBottom: 16, opacity: 0.5 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-content)", margin: 0, opacity: 0.7, textAlign: "center", maxWidth: 200 }}>
              Interactive map will be connected in the next build phase
            </p>
            {/* Decorative grid lines */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,73,96,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,73,96,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
          </div>

          {/* Results panel */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--color-title)", margin: 0 }}>
                {searched ? `${PLACEHOLDER_CONTRACTORS.length} results near "${zip}"` : "Enter a ZIP code to search"}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(searched ? PLACEHOLDER_CONTRACTORS : PLACEHOLDER_CONTRACTORS.slice(0, 2)).map((c, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 10, padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--color-title)", margin: 0 }}>{c.name}</p>
                    {c.certified && (
                      <span style={{ background: "var(--color-accent)", color: "#fff", fontSize: 9, fontFamily: "'Barlow', sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 7px", borderRadius: 3, flexShrink: 0, marginLeft: 8 }}>Certified</span>
                    )}
                  </div>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", margin: "0 0 4px" }}>{c.city}, {c.state} {c.zip}</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", margin: "0 0 4px" }}>{c.specialty}</p>
                  <a href={`tel:${c.phone}`} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none" }}>{c.phone}</a>
                  <div style={{ marginTop: 12 }}>
                    <a href="#" className="sg-btn-solid-sm" style={{ textDecoration: "none" }}>Contact</a>
                  </div>
                </div>
              ))}

              {!searched && (
                <div style={{ background: "#fff", border: "1.5px dashed #dee2e6", borderRadius: 10, padding: "24px 20px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "var(--color-content)", margin: 0, lineHeight: 1.6 }}>
                    Search by ZIP code to see CAST-certified contractors near you.
                  </p>
                </div>
              )}
            </div>

            {/* Apply to be listed */}
            <div style={{ background: "var(--color-primary)", borderRadius: 10, padding: "20px", marginTop: 20 }}>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>Are you a contractor?</p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", margin: "0 0 14px", lineHeight: 1.5 }}>Join the CAST TradePro network and get listed in our installer directory.</p>
              <a href="/trade-pro-signup" className="sg-btn-solid-dark-sm" style={{ textDecoration: "none" }}>Apply Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ContractorFinder
