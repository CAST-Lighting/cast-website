"use client"
import { forwardRef, type Ref, type ReactNode } from "react"

interface StatItem {
  value?: string
  label?: string
}

interface FeatureItem {
  title?: string
  desc?: string
}

interface AboutContentProps {
  className?: string
  bgColor?: string
  overline?: string
  sectionHeading?: string
  sectionBody?: string
  stats?: StatItem[]
  features?: FeatureItem[]
  btn1Label?: string
  btn1Href?: string
  btn2Label?: string
  btn2Href?: string
}

const ICONS: ReactNode[] = [
  // Award / medal
  <svg key="award" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>,
  // Map Pin
  <svg key="map" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>,
  // Shield
  <svg key="shield" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
  // Leaf
  <svg key="leaf" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>,
  // Users
  <svg key="users" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  // Zap / lightning
  <svg key="zap" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>,
]

const DEFAULT_STATS: StatItem[] = [
  { value: "2001",      label: "Year Founded" },
  { value: "10,000+",   label: "Contractors Trust CAST" },
  { value: "Lifetime",  label: "Warranty on Every Fixture" },
  { value: "USA Made",  label: "Pine Brook, New Jersey" },
]

const DEFAULT_FEATURES: FeatureItem[] = [
  { title: "Founded 2001",       desc: "Over two decades of innovation in landscape lighting design and manufacturing." },
  { title: "Made in the USA",    desc: "Every CAST fixture is designed and manufactured in Pine Brook, New Jersey." },
  { title: "Lifetime Warranty",  desc: "We stand behind every product with a comprehensive lifetime warranty — no fine print." },
  { title: "Solid Brass & Copper", desc: "Premium materials that develop a beautiful patina and never corrode or deteriorate." },
  { title: "Contractor Trusted", desc: "Over 10,000 landscape lighting professionals rely on CAST fixtures for their projects." },
  { title: "LED Innovation",     desc: "Integrated LED technology engineered for optimal light output, efficiency, and longevity." },
]

const AboutContent = forwardRef(function AboutContent(
  {
    className,
    bgColor = "#0f1923",
    overline = "About CAST Lighting",
    sectionHeading = "Built to Last. Built in America.",
    sectionBody = "Since 2001, CAST Lighting has been designing and manufacturing professional-grade landscape lighting fixtures in the USA. Every product is crafted from solid brass or copper — materials chosen for their beauty and ability to withstand decades of outdoor exposure without corroding or deteriorating.",
    stats: statsProp,
    features: featuresProp,
    btn1Label = "Shop Products",
    btn1Href = "/shop",
    btn2Label = "Contact Us",
    btn2Href = "/contact",
  }: AboutContentProps,
  ref: Ref<HTMLElement>
) {
  const stats    = statsProp    && statsProp.length    > 0 ? statsProp    : DEFAULT_STATS
  const features = featuresProp && featuresProp.length > 0 ? featuresProp : DEFAULT_FEATURES

  return (
    <section
      ref={ref}
      className={className || ""}
      style={{ width: "100%", background: bgColor || "#0f1923" }}
    >
      <style>{`
        /* ── Editorial split ── */
        .ac-editorial {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 72px;
          align-items: center;
          margin-bottom: 80px;
        }
        @media (max-width: 960px) {
          .ac-editorial { grid-template-columns: 1fr; gap: 40px; margin-bottom: 56px; }
        }

        /* ── Stat tiles ── */
        .ac-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .ac-stat-tile {
          padding: 22px 18px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* ── Feature cards ── */
        .ac-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-bottom: 80px;
        }
        @media (max-width: 900px)  { .ac-cards { grid-template-columns: 1fr 1fr; margin-bottom: 56px; } }
        @media (max-width: 540px)  { .ac-cards { grid-template-columns: 1fr; } }

        .ac-card {
          padding: 28px 24px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: border-color 200ms, background 200ms;
        }
        .ac-card:hover {
          border-color: rgba(0,124,176,0.4);
          background: rgba(0,124,176,0.06);
        }
      `}</style>

      <div className="site-container">

        {/* ── 1. Editorial Split ─────────────────────────────── */}
        <div className="ac-editorial">

          {/* Left — story copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {overline && (
              <span style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7EBEE8",
              }}>
                {overline}
              </span>
            )}

            <h2 style={{
              fontFamily: "'Essonnes', 'Playfair Display', serif",
              fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#fff",
              margin: 0,
            }}>
              {sectionHeading}
            </h2>

            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 16,
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
            }}>
              {sectionBody}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 4 }}>
              {btn1Label && (
                <a href={btn1Href || "#"} className="sg-btn-solid-md">{btn1Label}</a>
              )}
              {btn2Label && (
                <a href={btn2Href || "#"} className="sg-btn-outline-dark-md">{btn2Label}</a>
              )}
            </div>
          </div>

          {/* Right — stat callouts */}
          <div className="ac-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="ac-stat-tile">
                <div style={{
                  fontFamily: "'Essonnes', 'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
                  fontWeight: 700,
                  color: "#7EBEE8",
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}>
                  {s.value || "—"}
                </div>
                <div style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.48)",
                  lineHeight: 1.45,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}>
                  {s.label || ""}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── 2. Feature Cards ───────────────────────────────── */}
        <div className="ac-cards">
          {features.map((item, i) => (
            <div key={i} className="ac-card">
              {/* Icon circle */}
              <div style={{
                width: 44, height: 44,
                borderRadius: "50%",
                background: "rgba(0,124,176,0.14)",
                border: "1px solid rgba(0,124,176,0.28)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#7EBEE8",
                marginBottom: 18,
                flexShrink: 0,
              }}>
                {ICONS[i % ICONS.length]}
              </div>

              <h3 style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                margin: "0 0 8px",
                lineHeight: 1.3,
              }}>
                {item.title || "Feature Title"}
              </h3>
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                lineHeight: 1.72,
                color: "rgba(255,255,255,0.55)",
                margin: 0,
              }}>
                {item.desc || "Feature description."}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
})

export default AboutContent
