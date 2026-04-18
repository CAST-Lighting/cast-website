"use client"
import { forwardRef, type Ref, useState } from "react"
import { MapPin, Shield, Star, Phone } from "lucide-react"

const PROJECT_TYPES = [
  "Residential Installation",
  "Commercial Installation",
  "Upgrade / Replacement",
  "Repair / Maintenance",
  "Design Consultation",
]

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "Just exploring",
]

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px",
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8, color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: 15,
  boxSizing: "border-box",
}
const labelStyle: React.CSSProperties = {
  fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600,
  color: "rgba(255,255,255,0.5)", display: "block", marginBottom: 6,
}
const fieldWrap: React.CSSProperties = { display: "flex", flexDirection: "column" }

interface ContractorFinderProps {
  className?: string
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  overline?: string
  heading?: string
  subheading?: string
  formHeading?: string
  submitLabel?: string
}

const ContractorFinder = forwardRef(function ContractorFinder(
  {
    className,
    bgColor,
    bgImage,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    overline = "Find A Professional",
    heading = "Find A CAST Installer Near You",
    subheading = "Tell us about your project and we'll connect you with a CAST-certified landscape lighting contractor in your area.",
    formHeading = "Request a Contractor",
    submitLabel = "Find My Contractor",
  }: ContractorFinderProps,
  ref: Ref<HTMLDivElement>
) {
  const [projectType, setProjectType] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [zip, setZip] = useState("")
  const [timeline, setTimeline] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === "number" ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || "to bottom"}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#0d1620"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch("/api/cast/contractor-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectType, firstName, lastName, email, phone, zip, timeline, description }),
    }).catch(err => console.error("[ContractorFinder] submit error", err))
    setSubmitted(true)
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ width: "100%", boxSizing: "border-box" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: sectionBackground, zIndex: 0 }} />
      {bgImage && (
        <>
          <img src={bgImage} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, background: sectionBackground, opacity: overlayOpacity, zIndex: 1 }} />
        </>
      )}

      <style>{`
        .cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; position: relative; z-index: 10; }
        .cf-name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cf-radio-group { display: flex; flex-wrap: wrap; gap: 10px; }
        .cf-radio-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 13px; color: rgba(255,255,255,0.8); padding: 8px 14px; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; transition: border-color 200ms ease, background 200ms ease; }
        .cf-radio-label:has(input:checked) { border-color: #007CB0; background: rgba(0,124,176,0.12); color: #fff; }
        .cf-radio-label input { accent-color: #007CB0; }
        .cf-select { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; font-family: 'Barlow', sans-serif; font-size: 15px; box-sizing: border-box; appearance: none; }
        .cf-select option { background: #1a2332; color: #fff; }
        .cf-trust-item { display: flex; align-items: flex-start; gap: 14px; }
        @media (max-width: 900px) { .cf-grid { grid-template-columns: 1fr; gap: 40px; } }
        @media (max-width: 480px) { .cf-name-row { grid-template-columns: 1fr; } }
      `}</style>

      <div className="site-container" style={{ position: "relative", zIndex: 10 }}>
        <div className="cf-grid">

          {/* Left: messaging + trust */}
          <div>
            {overline && (
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7EBEE8", margin: "0 0 14px" }}>{overline}</p>
            )}
            <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 20px" }}>
              {heading}
            </h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 44px" }}>
              {subheading}
            </p>

            {/* Trust callouts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="cf-trust-item">
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,124,176,0.15)", border: "1px solid rgba(0,124,176,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Shield style={{ width: 20, height: 20, color: "#7EBEE8" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>CAST-Certified Network</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>Every contractor in our network is trained and certified on CAST products and installation standards.</p>
                </div>
              </div>
              <div className="cf-trust-item">
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,124,176,0.15)", border: "1px solid rgba(0,124,176,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MapPin style={{ width: 20, height: 20, color: "#7EBEE8" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Local Professionals</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>We match you with contractors who know your region, local codes, and landscape conditions.</p>
                </div>
              </div>
              <div className="cf-trust-item">
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,124,176,0.15)", border: "1px solid rgba(0,124,176,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Star style={{ width: 20, height: 20, color: "#7EBEE8" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>No Cost to You</p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.5 }}>Our contractor matching service is completely free. We'll reach out within one business day.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: "#1a2332", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "40px 36px" }}>
            {formHeading && (
              <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 28px" }}>{formHeading}</h3>
            )}

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Request Received!</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>
                  We'll connect you with a CAST-certified contractor in your area within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* Project type */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>I need help with… *</label>
                  <div className="cf-radio-group">
                    {PROJECT_TYPES.map(opt => (
                      <label key={opt} className="cf-radio-label">
                        <input type="radio" name="projectType" value={opt} checked={projectType === opt} onChange={() => setProjectType(opt)} required />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* First + Last */}
                <div className="cf-name-row">
                  <div style={fieldWrap}>
                    <label style={labelStyle}>First Name *</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" required style={inputStyle} />
                  </div>
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Last Name *</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" required style={inputStyle} />
                  </div>
                </div>

                {/* Email */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required style={inputStyle} />
                </div>

                {/* Phone + Zip */}
                <div className="cf-name-row">
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Phone Number *</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000" required style={inputStyle} />
                  </div>
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Zip Code *</label>
                    <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="07058" required style={inputStyle} />
                  </div>
                </div>

                {/* Timeline */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>Project Timeline *</label>
                  <select value={timeline} onChange={e => setTimeline(e.target.value)} required className="cf-select">
                    <option value="" disabled>When are you looking to start?</option>
                    {TIMELINE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>Tell us about your project</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your space, size of the area, any specific lighting goals…" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                <button type="submit" style={{ width: "100%", padding: "14px 24px", background: "linear-gradient(135deg, #007CB0, #7EBEE8)", border: "none", borderRadius: 8, fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "#0d1620", cursor: "pointer", letterSpacing: "0.03em", marginTop: 4 }}>
                  {submitLabel}
                </button>

                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0, textAlign: "center" }}>
                  We'll reach out within one business day. No spam, ever.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  )
})

export default ContractorFinder
