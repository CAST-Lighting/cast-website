"use client"
import { forwardRef, useState, type Ref, type FormEvent } from "react"

interface ContractorFinderProps {
  className?: string
  overline?: string
  heading?: string
  subheading?: string
  successHeading?: string
  successBody?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
}

const STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
]

const HEARD_OPTIONS = [
  "Google / Search Engine",
  "Social Media",
  "Contractor Referral",
  "Trade Show / Event",
  "Magazine / Publication",
  "Friend or Family",
  "Other",
]

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontFamily: "\'Barlow\', sans-serif",
  fontSize: 15,
  color: "#fff",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 7,
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 180ms",
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "\'Barlow\', sans-serif",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "rgba(255,255,255,0.55)",
  marginBottom: 6,
}

const ContractorFinder = forwardRef(function ContractorFinder(
  {
    className,
    overline = "Find A Professional",
    heading = "Get Connected With a CAST Installer",
    subheading = "Tell us a little about your project and we\'ll personally match you with a CAST-certified landscape lighting contractor in your area.",
    successHeading = "Thank You!",
    successBody = "We\'ve received your request and will reach out within 1–2 business days with a contractor recommendation in your area.",
    bgColor = "#0f1923",
    paddingTop = 72,
    paddingBottom = 72,
  }: ContractorFinderProps,
  ref: Ref<HTMLDivElement>
) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    city: "", state: "", zip: "", projectDetails: "", heardFrom: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/cast/contractor-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Submission failed")
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again or call us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      ref={ref}
      className={className || ""}
      style={{ background: bgColor || "#0f1923", paddingTop: paddingTop ?? 72, paddingBottom: paddingBottom ?? 72 }}
    >
      <div className="site-container" style={{ maxWidth: 780 }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          {overline && (
            <p style={{ fontFamily: "\'Barlow\', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--color-accent, #057cb0)", margin: "0 0 12px" }}>
              {overline}
            </p>
          )}
          <h1 style={{ fontFamily: "\'Essonnes\', \'Playfair Display\', serif", fontSize: "var(--h2-size, 2.25rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 16px", maxWidth: 620 }}>
            {heading}
          </h1>
          <p style={{ fontFamily: "\'Barlow\', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, maxWidth: 560, margin: 0 }}>
            {subheading}
          </p>
        </div>

        {submitted ? (
          /* ── Success state ── */
          <div style={{ background: "#1b2a35", border: "1px solid rgba(5,124,176,0.35)", borderRadius: 12, padding: "48px 40px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(5,124,176,0.15)", border: "2px solid #057cb0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#057cb0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontFamily: "\'Essonnes\', \'Playfair Display\', serif", fontSize: "var(--h3-size, 1.8rem)", color: "#fff", margin: "0 0 14px" }}>
              {successHeading}
            </h2>
            <p style={{ fontFamily: "\'Barlow\', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: 0, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
              {successBody}
            </p>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit}>
            <div style={{ background: "#1b2a35", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "40px" }}>

              {/* Row 1: Name */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>First Name <span style={{ color: "#057cb0" }}>*</span></label>
                  <input required style={inputStyle} type="text" placeholder="Jane" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Last Name <span style={{ color: "#057cb0" }}>*</span></label>
                  <input required style={inputStyle} type="text" placeholder="Smith" value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                </div>
              </div>

              {/* Row 2: Email + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Email Address <span style={{ color: "#057cb0" }}>*</span></label>
                  <input required style={inputStyle} type="email" placeholder="jane@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input style={inputStyle} type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => set("phone", e.target.value)} />
                </div>
              </div>

              {/* Row 3: City + State + ZIP */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>City <span style={{ color: "#057cb0" }}>*</span></label>
                  <input required style={inputStyle} type="text" placeholder="Austin" value={form.city} onChange={e => set("city", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>State <span style={{ color: "#057cb0" }}>*</span></label>
                  <select required style={{ ...inputStyle, appearance: "none" }} value={form.state} onChange={e => set("state", e.target.value)}>
                    <option value="">Select</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>ZIP Code <span style={{ color: "#057cb0" }}>*</span></label>
                  <input required style={inputStyle} type="text" placeholder="78701" maxLength={10} value={form.zip} onChange={e => set("zip", e.target.value)} />
                </div>
              </div>

              {/* Row 4: Project details */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Tell Us About Your Project <span style={{ color: "#057cb0" }}>*</span></label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your outdoor space, what kind of lighting you have in mind, and anything else that will help us find the right contractor for you..."
                  value={form.projectDetails}
                  onChange={e => set("projectDetails", e.target.value)}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                />
              </div>

              {/* Row 5: How did you hear */}
              <div style={{ marginBottom: 32 }}>
                <label style={labelStyle}>How Did You Hear About Us?</label>
                <select style={{ ...inputStyle, appearance: "none" }} value={form.heardFrom} onChange={e => set("heardFrom", e.target.value)}>
                  <option value="">Select an option</option>
                  {HEARD_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {error && (
                <p style={{ fontFamily: "\'Barlow\', sans-serif", fontSize: 14, color: "#ff6b6b", marginBottom: 16 }}>{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "15px 32px",
                  background: submitting ? "rgba(5,124,176,0.5)" : "#057cb0",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontFamily: "\'Barlow\', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "background 200ms",
                }}
              >
                {submitting ? "Submitting..." : "Request a Contractor Match"}
              </button>
            </div>
          </form>
        )}

        {/* Trust badge row */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {["CAST-Certified Network", "No Obligation", "Response Within 48hrs"].map(badge => (
            <div key={badge} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#057cb0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: "\'Barlow\', sans-serif", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>{badge}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
})

export default ContractorFinder
