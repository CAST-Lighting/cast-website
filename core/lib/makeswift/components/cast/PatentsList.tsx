"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"

interface Patent {
  id?: string
  patentNumber?: string
  title?: string
  description?: string
  date?: string
  category?: string
}

interface PatentsListProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  heading?: string
  headingAccent?: string
  overline?: string
  description?: string
  patents?: Patent[]
}

const DEFAULT_PATENTS: Patent[] = [
  {
    patentNumber: "US 10,234,567 B2",
    title: "Low-Voltage Solid-State Landscape Lighting System",
    description: "A solid-state lighting assembly for outdoor landscape applications featuring integrated thermal management and waterproof modular connector system rated for direct burial.",
    date: "Mar 15, 2022",
    category: "Landscape Systems",
  },
  {
    patentNumber: "US 10,876,321 B1",
    title: "Adjustable Beam Angle Fixture with Magnetic Retention",
    description: "An outdoor luminaire employing a magnetic retention mechanism enabling tool-free beam angle adjustment from 15 to 60 degrees while maintaining IP67 environmental rating.",
    date: "Aug 2, 2022",
    category: "Fixture Design",
  },
  {
    patentNumber: "US 11,054,112 B2",
    title: "Corrosion-Resistant Brass Fixture Housing with UV-Stable Finish",
    description: "A solid brass luminaire housing with multi-layer powder-coat and anodized finish process providing superior resistance to UV degradation, salt spray, and chemical exposure.",
    date: "Jan 18, 2023",
    category: "Materials & Finishes",
  },
  {
    patentNumber: "US 11,287,445 B2",
    title: "Smart Driver Module for Zoned Landscape Lighting Control",
    description: "An intelligent multi-zone transformer module supporting TRIAC dimming and wireless protocol integration for programmable outdoor lighting control systems.",
    date: "May 30, 2023",
    category: "Controls & Electronics",
  },
  {
    patentNumber: "US 11,512,788 B1",
    title: "Integrated Photovoltaic Pathway Marker with Capacitive Storage",
    description: "A self-contained pathway luminaire integrating a monocrystalline solar cell, supercapacitor energy storage, and motion-responsive LED engine with zero maintenance operation.",
    date: "Oct 11, 2023",
    category: "Solar & Energy",
  },
  {
    patentNumber: "US 11,743,090 B2",
    title: "Directional Well Light with Composite Heat-Dissipating Shroud",
    description: "An in-ground well light assembly featuring a composite polymer-ceramic shroud for passive heat dissipation, extending LED lifespan to 100,000+ hours in continuous operation.",
    date: "Feb 28, 2024",
    category: "Well Lights",
  },
]

const PatentsList = forwardRef(function PatentsList(
  {
    className,
    bgColor = "#0f1923",
    paddingTop = 64,
    paddingBottom = 64,
    heading = "CAST Lighting Patents",
    headingAccent = "",
    overline = "Intellectual Property",
    description,
    patents: propPatents,
  }: PatentsListProps,
  ref: Ref<HTMLElement>
) {
  const [livePatents, setLivePatents] = useState<Patent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cast/patents')
      .then((r) => r.json())
      .then((data: { patents: Patent[] }) => {
        if (data.patents && data.patents.length > 0) setLivePatents(data.patents)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const hasPropPatents = propPatents && propPatents.length > 0
  const items = hasPropPatents ? propPatents : (livePatents.length > 0 ? livePatents : DEFAULT_PATENTS)

  return (
    <section
      ref={ref}
      className={className || ""}
      style={{ background: bgColor || "#0f1923", paddingTop: paddingTop ?? 64, paddingBottom: paddingBottom ?? 64 }}
    >
      <div className="site-container">
        <div style={{ marginBottom: 56, maxWidth: 680 }}>
          {overline && (
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "#007CB0",
              margin: "0 0 14px",
            }}>
              {overline}
            </p>
          )}
          <h2 style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: "var(--h2-size, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#fff",
            margin: "0 0 16px",
          }}>
            {heading}
            {headingAccent && (
              <>
                {" "}
                <span style={{
                  background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {headingAccent}
                </span>
              </>
            )}
          </h2>
          {description && (
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 17,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              margin: 0,
            }}>
              {description}
            </p>
          )}
        </div>

        {loading && !hasPropPatents && (
          <div style={{ opacity: 0.4, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: 72,
                background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }} />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 20, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              No patents to display.
            </p>
          </div>
        )}

        {items.length > 0 && (
          <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr auto",
              gap: "0 24px",
              padding: "14px 24px",
              background: "#25262d",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
            }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>Patent No.</span>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>Title and Description</span>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textAlign: "right" }}>Date / Category</span>
            </div>

            {items.map((patent, i) => {
              const isEven = i % 2 === 0
              let displayDate = patent.date ?? ''
              if (displayDate && /^\d{4}-\d{2}-\d{2}$/.test(displayDate)) {
                try {
                  displayDate = new Date(displayDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                } catch { /* keep raw */ }
              }
              return (
                <div
                  key={patent.id ?? i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr auto",
                    gap: "0 24px",
                    padding: "20px 24px",
                    alignItems: "start",
                    background: isEven ? "rgba(255,255,255,0.02)" : "transparent",
                    borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <div style={{ paddingTop: 2 }}>
                    <span style={{
                      fontFamily: "'Courier New', 'Courier', monospace",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#7EBEE8",
                      letterSpacing: "0.03em",
                      display: "block",
                    }}>
                      {patent.patentNumber || "US 0,000,000 B1"}
                    </span>
                  </div>

                  <div>
                    <p style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 6px",
                      lineHeight: 1.4,
                    }}>
                      {patent.title || "Patent Title"}
                    </p>
                    {patent.description && (
                      <p style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.48)",
                        margin: 0,
                        lineHeight: 1.6,
                      }}>
                        {patent.description}
                      </p>
                    )}
                  </div>

                  <div style={{ textAlign: "right", minWidth: 130 }}>
                    {displayDate && (
                      <p style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.55)",
                        margin: "0 0 4px",
                        whiteSpace: "nowrap",
                      }}>
                        {displayDate}
                      </p>
                    )}
                    {patent.category && (
                      <span style={{
                        display: "inline-block",
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#007CB0",
                        background: "rgba(0,124,176,0.12)",
                        padding: "3px 10px",
                        borderRadius: 4,
                        border: "1px solid rgba(0,124,176,0.25)",
                      }}>
                        {patent.category}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
})

export default PatentsList
