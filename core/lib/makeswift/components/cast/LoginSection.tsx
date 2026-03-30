"use client"
import { forwardRef, type Ref, useState } from "react"

interface LoginSectionProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  // Login form
  loginHeading?: string
  loginSubheading?: string
  loginBtnLabel?: string
  forgotPasswordHref?: string
  forgotPasswordLabel?: string
  // TradePro card
  tradeProHeading?: string
  tradeProDescription?: string
  tradeProBtnLabel?: string
  tradeProBtnHref?: string
  // Retail card
  retailHeading?: string
  retailDescription?: string
  retailBtnLabel?: string
  retailBtnHref?: string
  // Divider label
  dividerLabel?: string
}

const LoginSection = forwardRef(function LoginSection(
  {
    className,
    bgColor,
    paddingTop = 80,
    paddingBottom = 96,
    loginHeading = "Welcome Back",
    loginSubheading = "Sign in to your CAST Lighting account",
    loginBtnLabel = "Sign In",
    forgotPasswordHref = "/login/forgot-password",
    forgotPasswordLabel = "Forgot Password?",
    tradeProHeading = "Become a TradePro",
    tradeProDescription = "Apply for exclusive contractor pricing, training resources, and dedicated support. Trusted by over 10,000 landscape professionals.",
    tradeProBtnLabel = "Apply for TradePro",
    tradeProBtnHref = "/trade-pro",
    retailHeading = "Create a Retail Account",
    retailDescription = "Carry CAST Lighting in your store. Access co-op marketing, protected territories, and full distributor support.",
    retailBtnLabel = "Open a Retail Account",
    retailBtnHref = "/retail-signup",
    dividerLabel = "New to CAST Lighting?",
  }: LoginSectionProps,
  ref: Ref<HTMLElement>
) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  return (
    <section
      ref={ref}
      className={className || ""}
      style={{ background: bgColor || "#0f1923", paddingTop, paddingBottom }}
    >
      <style>{`
        .ls-input {
          width: 100%; padding: 12px 16px; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 0; background: rgba(255,255,255,0.05);
          font-family: 'Barlow', sans-serif; font-size: 15px; color: #fff;
          outline: none; box-sizing: border-box; transition: border-color 200ms;
        }
        .ls-input:focus { border-color: #007CB0; }
        .ls-input::placeholder { color: rgba(255,255,255,0.35); }
        .ls-label { font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.7); display: block; margin-bottom: 6px; }
        .ls-account-card {
          background: #2d353c; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 28px; display: flex; flex-direction: column; gap: 14px;
          transition: border-color 200ms;
        }
        .ls-account-card:hover { border-color: rgba(0,124,176,0.4); }
        .ls-layout { display: grid; grid-template-columns: 1fr 1px 1fr; gap: 48px; align-items: start; }
        @media (max-width: 900px) { .ls-layout { grid-template-columns: 1fr; } .ls-divider { display: none; } }
      `}</style>

      <div className="site-container" style={{ maxWidth: 1100 }}>
        <div className="ls-layout">

          {/* Left — Login Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#fff", margin: "0 0 8px", lineHeight: 1.1 }}>
                {loginHeading}
              </h2>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                {loginSubheading}
              </p>
            </div>

            <form style={{ display: "flex", flexDirection: "column", gap: 18 }}
              onSubmit={e => { e.preventDefault(); window.location.href = '/account'; }}>
              <div>
                <label className="ls-label">Email Address</label>
                <input
                  type="email" className="ls-input" placeholder="you@company.com"
                  value={email} onChange={e => setEmail(e.target.value)} required
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <label className="ls-label" style={{ margin: 0 }}>Password</label>
                  <a href={forgotPasswordHref} style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "#7EBEE8", textDecoration: "none" }}>
                    {forgotPasswordLabel}
                  </a>
                </div>
                <input
                  type="password" className="ls-input" placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)} required
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="checkbox" id="ls-remember" checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#007CB0", cursor: "pointer" }}
                />
                <label htmlFor="ls-remember" style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", cursor: "pointer" }}>
                  Remember me
                </label>
              </div>

              <button type="submit" className="sg-btn-solid-dark-md" style={{ justifyContent: "center", width: "100%" }}>
                {loginBtnLabel}
              </button>
            </form>
          </div>

          {/* Center divider */}
          <div className="ls-divider" style={{ width: 1, background: "rgba(255,255,255,0.08)", alignSelf: "stretch" }} />

          {/* Right — Account options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", margin: "0 0 4px" }}>
              {dividerLabel}
            </p>

            {/* TradePro card */}
            <div className="ls-account-card">
              <div style={{ width: 44, height: 44, borderRadius: 8, background: "rgba(0,124,176,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h3-size)", fontWeight: 700, color: "#fff", margin: "0 0 8px", lineHeight: 1.2 }}>
                  {tradeProHeading}
                </h3>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
                  {tradeProDescription}
                </p>
              </div>
              <a href={tradeProBtnHref} className="sg-btn-solid-dark-sm" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                {tradeProBtnLabel} →
              </a>
            </div>

            {/* Retail card */}
            <div className="ls-account-card">
              <div style={{ width: 44, height: 44, borderRadius: 8, background: "rgba(0,124,176,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h3-size)", fontWeight: 700, color: "#fff", margin: "0 0 8px", lineHeight: 1.2 }}>
                  {retailHeading}
                </h3>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
                  {retailDescription}
                </p>
              </div>
              <a href={retailBtnHref} className="sg-btn-outline-dark-sm" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
                {retailBtnLabel} →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
})

export default LoginSection
