"use client"
import { forwardRef, type Ref, useState } from "react"
import { Phone, Mail, MapPin } from "lucide-react"

const ROLE_OPTIONS = ["Contractor", "Distributor", "Manufacturing Rep", "Homeowner"]
const HELP_OPTIONS = ["Product Support", "Business Inquiry", "Sales Help", "Press Inquiry", "Technical Support", "Other"]

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

const ContactSection = forwardRef(function ContactSection(
  {
    className,
    bgColor,
    overline,
    heading,
    headingAccent,
    description,
    phone,
    email,
    address,
    formHeading,
    submitLabel,
  }: {
    className?: string
    bgColor?: string
    overline?: string
    heading?: string
    headingAccent?: string
    description?: string
    phone?: string
    email?: string
    address?: string
    formHeading?: string
    submitLabel?: string
  },
  ref: Ref<HTMLElement>
) {
  const [role, setRole] = useState("")
  const [company, setCompany] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailVal, setEmailVal] = useState("")
  const [phoneVal, setPhoneVal] = useState("")
  const [zip, setZip] = useState("")
  const [helpTopic, setHelpTopic] = useState("")
  const [newsletter, setNewsletter] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetch("/api/cast/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, company, firstName, lastName, email: emailVal, phone: phoneVal, zip, helpTopic, newsletter, message }),
    }).catch(err => console.error("[ContactSection] submit error", err))
    setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      className={`cast-section-default relative overflow-hidden ${className || ""}`}
      style={{ width: "100%", background: bgColor || "#0d1620" }}
    >
      <style>{`
        .cs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .cs-name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cs-radio-group { display: flex; flex-wrap: wrap; gap: 10px; }
        .cs-radio-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-family: 'Barlow', sans-serif; font-size: 14px; color: rgba(255,255,255,0.8); padding: 8px 14px; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; transition: border-color 200ms ease, background 200ms ease; }
        .cs-radio-label:has(input:checked) { border-color: #007CB0; background: rgba(0,124,176,0.12); color: #fff; }
        .cs-radio-label input { accent-color: #007CB0; }
        .cs-select { width: 100%; padding: 10px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; color: #fff; font-family: 'Barlow', sans-serif; font-size: 15px; box-sizing: border-box; appearance: none; }
        .cs-select option { background: #1a2332; color: #fff; }
        @media (max-width: 768px) { .cs-grid { grid-template-columns: 1fr; gap: 40px; } }
        @media (max-width: 480px) { .cs-name-row { grid-template-columns: 1fr; } }
      `}</style>

      <div className="site-container">
        <div className="cs-grid">

          {/* Left: info */}
          <div>
            {overline && (
              <p className="text-style-overline" style={{ margin: "0 0 16px", color: "var(--cast-mid-blue)" }}>
                {overline}
              </p>
            )}
            <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 20px" }}>
              {heading || "Get In"} <span style={{ background: "linear-gradient(135deg, #007CB0, #7EBEE8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{headingAccent || "Touch"}</span>
            </h2>
            {description && (
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 40px" }}>{description}</p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {phone && (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,124,176,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone style={{ width: 18, height: 18, color: "#007CB0" }} />
                  </div>
                  <a href={`tel:${phone.replace(/\D/g, "")}`} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#fff", textDecoration: "none" }}>{phone}</a>
                </div>
              )}
              {email && (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,124,176,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail style={{ width: 18, height: 18, color: "#007CB0" }} />
                  </div>
                  <a href={`mailto:${email}`} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "#fff", textDecoration: "none" }}>{email}</a>
                </div>
              )}
              {address && (
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,124,176,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin style={{ width: 18, height: 18, color: "#007CB0" }} />
                  </div>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)" }}>{address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: "#1a2332", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "40px 36px" }}>
            {formHeading && (
              <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: "0 0 28px" }}>{formHeading}</h3>
            )}

            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>Message Sent!</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                  Thanks for reaching out. Our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                {/* I Am A... */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>I Am A… *</label>
                  <div className="cs-radio-group">
                    {ROLE_OPTIONS.map(opt => (
                      <label key={opt} className="cs-radio-label">
                        <input type="radio" name="role" value={opt} checked={role === opt} onChange={() => setRole(opt)} required />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Company */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>Company or Organization</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="ACME Landscaping" style={inputStyle} />
                </div>

                {/* First + Last */}
                <div className="cs-name-row">
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
                  <input type="email" value={emailVal} onChange={e => setEmailVal(e.target.value)} placeholder="john@company.com" required style={inputStyle} />
                </div>

                {/* Phone + Zip */}
                <div className="cs-name-row">
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Best Phone Contact *</label>
                    <input type="tel" value={phoneVal} onChange={e => setPhoneVal(e.target.value)} placeholder="(555) 000-0000" required style={inputStyle} />
                  </div>
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Zip Code *</label>
                    <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="07058" required style={inputStyle} />
                  </div>
                </div>

                {/* Help topic */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>What can we help you with? *</label>
                  <select value={helpTopic} onChange={e => setHelpTopic(e.target.value)} required className="cs-select">
                    <option value="" disabled>Select a topic…</option>
                    {HELP_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Newsletter */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>Sign up for our monthly newsletter?</label>
                  <div className="cs-radio-group">
                    <label className="cs-radio-label">
                      <input type="radio" name="newsletter" value="yes" checked={newsletter === "yes"} onChange={() => setNewsletter("yes")} />
                      Yes, sign me up!
                    </label>
                    <label className="cs-radio-label">
                      <input type="radio" name="newsletter" value="no" checked={newsletter === "no"} onChange={() => setNewsletter("no")} />
                      No, thank you.
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div style={fieldWrap}>
                  <label style={labelStyle}>Let us know how we can help *</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your project…" rows={4} required style={{ ...inputStyle, resize: "vertical" }} />
                </div>

                <button type="submit" className="sg-btn-solid-dark-lg" style={{ width: "100%", marginTop: 4 }}>
         