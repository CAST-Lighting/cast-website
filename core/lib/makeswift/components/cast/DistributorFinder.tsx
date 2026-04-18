"use client"

import { forwardRef, useState, type Ref } from "react"

interface DistributorFinderProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  subheading?: string
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


const DistributorFinder = forwardRef(function DistributorFinder(
  {
    className,
    sectionStyle,
    overline = "Find Or Become A Distributor",
    heading = "CAST Distribution Partners",
    subheading = "CAST Lighting works with a select network of professional landscape supply distributors across the country. Find a distributor near you, or apply to carry CAST in your territory.",
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
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
      style={{ width: "100%", boxSizing: "border-box", background: sectionBackground, }}
    >
      {/* Main content */}
      <style>{`
        .df-main-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; align-items: flex-start; }
        .df-map { border-radius: 10px; height: 420px; display: flex; align-items: center; justify-content: center; border: 1px solid #d1d9e0; position: relative; overflow: hidden; background: #e2e8ed; }
        .df-right { display: flex; flex-direction: column; gap: 12px; padding-top: 0; }
        @media (min-width: 901px) { .df-right { padding-top: 0; } }
        @media (max-width: 900px) { .df-main-grid { grid-template-columns: 1fr; gap: 16px; } .df-map { height: 300px; } }
      `}</style>
      <div className="site-container">
        <div className="df-main-grid">

          {/* Left: map + form stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Map */}
            <div>
              <div className="df-map">
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,73,96,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,73,96,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div style={{ textAlign: "center", position: "relative" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" style={{ marginBottom: 10, opacity: 0.5 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "var(--color-content)", margin: 0, opacity: 0.7 }}>Map — connected in next phase</p>
                </div>
              </div>
            </div>

          </div>{/* end left column */}

          {/* Right: search + distributor tiles */}
          <div className="df-right">
            <form onSubmit={handleSearch} style={{ display: "flex", gap: 0, width: "100%", background: "rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", marginBottom: 4 }}>
              <input
                type="text"
                value={zip}
                onChange={e => setZip(e.target.value)}
                placeholder="Enter your ZIP code"
                style={{ flex: 1, padding: "11px 14px", border: "none", background: "transparent", fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#fff", outline: "none" }}
              />
              <button type="submit" style={{ background: "var(--color-accent)", color: "#fff", border: "none", padding: "11px 18px", fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", cursor: "pointer", flexShrink: 0 }}>
                Find
              </button>
            </form>
            {PLACEHOLDER_DISTRIBUTORS.slice(0, 4).map((d, i) => (
              <div key={i} style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "16px 18px" }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: "var(--color-title)", margin: "0 0 4px" }}>{d.name}</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "var(--color-content)", margin: "0 0 4px" }}>{d.city}, {d.state} · {d.type}</p>
                <a href={`tel:${d.phone}`} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none", display: "block", marginBottom: 8 }}>{d.phone}</a>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {d.brands.map((b, bi) => (
                    <span key={bi} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 3, fontSize: 10, fontFamily: "'Barlow', sans-serif", fontWeight: 600, color: "rgba(255,255,255,0.85)", padding: "2px 7px" }}>{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>{/* end right column */}

        </div>
      </div>
    </div>
  )
})

export default DistributorFinder
