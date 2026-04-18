"use client"
import { forwardRef, useState, type Ref } from "react"

interface BenefitItem {
  text?: string
}

interface TradeProSignupProps {
  className?: string
  // Hero section
  badgeText?: string
  heading?: string
  description?: string
  // Sidebar
  sidebarHeading?: string
  sidebarBody?: string
  sidebarNote?: string
  benefits?: BenefitItem[]
  loginHref?: string
  // Form
  submitLabel?: string
  // Layout
  bgColor?: string
}

const DEFAULT_BENEFITS: BenefitItem[] = [
  { text: "FREE Shipping on orders $1,000 or greater." },
  { text: "Application reviewed within 2–5 business days." },
  { text: "Exclusive contractor pricing on all fixtures." },
  { text: "Access to dedicated account support." },
]

const TradeProSignup = forwardRef(function TradeProSignup(
  {
    className,
    badgeText = "Account Application",
    heading = "Trade Professional Registration",
    description = "Application for an Account",
    sidebarHeading = "Landscape Account",
    sidebarBody = "If you are a contractor or landscape architect without a Distributor or Specification Sales Agency in your area, you can apply to have your own CAST online ordering account.",
    sidebarNote = "Application may take between 2–5 business days to be approved and we may contact you with questions after an application has been submitted.",
    benefits: benefitsProp,
    loginHref = "/login",
    submitLabel = "Submit Application →",
    bgColor = "#0f1923",
  }: TradeProSignupProps,
  ref: Ref<HTMLDivElement>
) {
  const [submitted, setSubmitted] = useState(false)
  const benefits = benefitsProp && benefitsProp.length > 0 ? benefitsProp : DEFAULT_BENEFITS

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      ref={ref}
      className={className || ""}
      style={{ width: '100%', background: bgColor || "#0f1923", minHeight: "100vh" }}
    >
      {/* ── Hero ── */}
      <section
        style={{
          background: "#1a2332": 96: 64,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,124,176,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,176,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
          {badgeText && (
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#007CB0",
                margin: "0 0 16px",
              }}
            >
              {badgeText}
            </p>
          )}
          <h1
            style={{
              fontFamily: "'Essonnes', 'Playfair Display', serif",
              fontSize: "var(--h2-size)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              margin: "0 0 20px",
            }}
          >
            {heading}
          </h1>
          {description && (
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 620,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <style>{`
        .tps-layout { display: grid; grid-template-columns: 1fr 380px; gap: 48px; align-items: start; }
        .tps-name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .tps-city-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        @media (max-width: 900px) { .tps-layout { grid-template-columns: 1fr; } }
        @media (max-width: 480px) {
          .tps-name-row { grid-template-columns: 1fr; }
          .tps-city-row { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ padding: "64px 0 96px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div className="tps-layout">
            {/* ── Form ── */}
            <div
              style={{
                background: "#2d353c",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "40px 36px",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 16 }}>
                    <circle cx="12" cy="12" r="11" fill="#007CB0" opacity="0.15" />
                    <path d="M7 12l4 4 6-7" stroke="#007CB0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3
                    style={{
                      fontFamily: "'Essonnes', 'Playfair Display', serif",
                      fontSize: "var(--h3-size)",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 10px",
                    }}
                  >
                    Application Received
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 15,
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Thank you for applying. A CAST account manager will review your application within 2–5 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="tps-name-row">
                    <div>
                      <label style={labelStyle}>First Name *</label>
                      <input style={inputStyle} type="text" required placeholder="First Name" />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name *</label>
                      <input style={inputStyle} type="text" required placeholder="Last Name" />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input style={inputStyle} type="email" required placeholder="you@company.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>Best Phone Contact *</label>
                    <input style={inputStyle} type="tel" required placeholder="(555) 000-0000" />
                  </div>
                  <div>
                    <label style={labelStyle}>I Am A... *</label>
                    <select style={selectStyle} required>
                      <option value="">Select one...</option>
                      <option>Contractor / Installer</option>
                      <option>Landscape Architect</option>
                      <option>Lighting Designer</option>
                      <option>Electrical Contractor</option>
                      <option>Distributor</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Company or Organization *</label>
                    <input style={inputStyle} type="text" required placeholder="Company Name" />
                  </div>
                  <div>
                    <label style={labelStyle}>Address Line 1 *</label>
                    <input style={inputStyle} type="text" required placeholder="Street Address" />
                  </div>
                  <div>
                    <label style={labelStyle}>Address Line 2</label>
                    <input style={inputStyle} type="text" placeholder="Suite, Unit, etc. (optional)" />
                  </div>
                  <div className="tps-city-row">
                    <div>
                      <label style={labelStyle}>City *</label>
                      <input style={inputStyle} type="text" required placeholder="City" />
                    </div>
                    <div>
                      <label style={labelStyle}>State *</label>
                      <input style={inputStyle} type="text" required placeholder="State" />
                    </div>
                    <div>
                      <label style={labelStyle}>Postal Code *</label>
                      <input style={inputStyle} type="text" required placeholder="Zip" />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Country *</label>
                    <select style={selectStyle} required>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input type="checkbox" id="tp-tax-exempt" style={{ accentColor: "#007CB0" }} />
                    <label
                      htmlFor="tp-tax-exempt"
                      style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)" }}
                    >
                      Tax Exempt
                    </label>
                  </div>
                  <div>
                    <label style={labelStyle}>Comments / Questions</label>
                    <textarea
                      style={{ ...inputStyle, resize: "vertical" }}
                      rows={4}
                      placeholder="Any additional information..."
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subscribe to our newsletter?</label>
                    <div style={{ display: "flex", gap: 20, marginTop: 4 }}>
                      <label style={radioLabelStyle}>
                        <input type="radio" name="tp-newsletter" value="yes" defaultChecked style={{ accentColor: "#007CB0" }} />{" "}
                        Yes
                      </label>
                      <label style={radioLabelStyle}>
                        <input type="radio" name="tp-newsletter" value="no" style={{ accentColor: "#007CB0" }} />{" "}
                        No
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="sg-btn-solid-md"
                    style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                  >
                    {submitLabel}
                  </button>
                </form>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div
              style={{
                background: "#1a2332",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "32px 28px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Essonnes', 'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 16px",
                }}
              >
                {sidebarHeading}
              </h3>
              {sidebarBody && (
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    margin: "0 0 16px",
                  }}
                >
                  {sidebarBody}
                </p>
              )}
              {sidebarNote && (
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 15,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    margin: "0 0 20px",
                  }}
                >
                  {sidebarNote}
                </p>
              )}
              {benefits.map((b, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(0,124,176,0.1)",
                    border: "1px solid rgba(0,124,176,0.25)",
                    borderRadius: 8,
                    padding: "14px 16px",
                    marginBottom: 12,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#007CB0",
                      margin: 0,
                    }}
                  >
                    {b.text || "Benefit goes here."}
                  </p>
                </div>
              ))}
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                  margin: "16px 0 8px",
                }}
              >
                Already have an account?
              </p>
              <a
                href={loginHref || "/login"}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#007CB0",
                  textDecoration: "none",
                }}
              >
                Login Now →
              </a>
              <div
                style={{
                  marginTop: 24: 20,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  CAST Lighting stores information on its own servers for verification and contact purposes. We will not sell or
                  share your information with a third-party without your consent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 6,
  fontFamily: "'Barlow', sans-serif",
  fontSize: 14,
  color: "#fff",
  boxSizing: "border-box",
  outline: "none",
  background: "rgba(255,255,255,0.05)",
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none",
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'Barlow', sans-serif",
  fontSize: 13,
  fontWeight: 600,
  color: "rgba(255,255,255,0.85)",
  display: "block",
  marginBottom: 6,
}

const radioLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontFamily: "'Barlow', sans-serif",
  fontSize: 14,
  color: "rgba(255,255,255,0.75)",
}

export default TradeProSignup
