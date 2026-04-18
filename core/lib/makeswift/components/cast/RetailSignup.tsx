"use client"
import { forwardRef, useState, type Ref } from "react"

interface BenefitItem {
  text?: string
}

interface RetailSignupProps {
  className?: string
  // Hero section
  badgeText?: string
  heading?: string
  description?: string
  // Sidebar
  sidebarHeading?: string
  sidebarBody?: string
  benefits?: BenefitItem[]
  loginHref?: string
  // Form
  submitLabel?: string
  // Layout
  bgColor?: string
}

const DEFAULT_BENEFITS: BenefitItem[] = [
  { text: "Retail Customers Receive 20% off MSRP on Lamps and Repair Parts once Registered and Logged In." },
  { text: "FREE Shipping on orders $1,000 or greater." },
]

const RetailSignup = forwardRef(function RetailSignup(
  {
    className,
    badgeText = "Account Application",
    heading = "Retail Store Registration",
    description = "First-time users, register for an account below",
    sidebarHeading = "Retail Store Account",
    sidebarBody = "The CAST Retail Store is a resource for repair parts, lamps and accessories to help our customers maintain their lighting systems.",
    benefits: benefitsProp,
    loginHref = "/login",
    submitLabel = "Register & Continue to Checkout →",
    bgColor = "#0f1923",
  }: RetailSignupProps,
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
        .rs-layout { display: grid; grid-template-columns: 1fr 380px; gap: 48px; align-items: start; }
        .rs-name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .rs-city-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        .rs-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 900px) { .rs-layout { grid-template-columns: 1fr; } }
        @media (max-width: 480px) {
          .rs-name-row { grid-template-columns: 1fr; }
          .rs-city-row { grid-template-columns: 1fr; }
          .rs-two-col { grid-template-columns: 1fr; }
        }
      `}</style>
      <div style={{ padding: "64px 0 96px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div className="rs-layout">
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
                    Account Created
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
                    Thank you for registering. You can now log in to access your retail account.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="rs-name-row">
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
                    <input style={inputStyle} type="email" required placeholder="you@email.com" />
                  </div>
                  <div>
                    <label style={labelStyle}>Best Phone Contact *</label>
                    <input style={inputStyle} type="tel" required placeholder="(555) 000-0000" />
                  </div>
                  <div>
                    <label style={labelStyle}>Company or Organization</label>
                    <input style={inputStyle} type="text" placeholder="Company Name (optional)" />
                  </div>
                  <div>
                    <label style={labelStyle}>Address Line 1 *</label>
                    <input style={inputStyle} type="text" required placeholder="Street Address" />
                  </div>
                  <div>
                    <label style={labelStyle}>Address Line 2</label>
                    <input style={inputStyle} type="text" placeholder="Suite, Unit, etc. (optional)" />
                  </div>
                  <div className="rs-city-row">
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
                  <div className="rs-two-col">
                    <div>
                      <label style={labelStyle}>Password *</label>
                      <input style={inputStyle} type="password" required placeholder="Create a password" />
                    </div>
                    <div>
                      <label style={labelStyle}>Retype Password *</label>
                      <input style={inputStyle} type="password" required placeholder="Confirm password" />
                    </div>
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
                        <input type="radio" name="retail-newsletter" value="yes" defaultChecked style={{ accentColor: "#007CB0" }} />{" "}
                        Yes
                      </label>
                      <label style={radioLabelStyle}>
                        <input type="radio" name="retail-newsletter" value="no" style={{ accentColor: "#007CB0" }} />{" "}
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
                    margin: "0 0 20px",
                  }}
                >
                  {sidebarBody}
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

export default RetailSignup
