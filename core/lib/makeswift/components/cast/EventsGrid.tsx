"use client"
import { forwardRef, useEffect, useState, useCallback, type Ref } from "react"

interface CastEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  image?: string
  link?: string
  status?: string
}

interface EventsGridProps {
  className?: string
  bgColor?: string
  heading?: string
  headingAccent?: string
  overline?: string
  emptyMessage?: string
}

const PLACEHOLDER_EVENTS: CastEvent[] = [
  {
    id: "1",
    title: "CAST Lighting Contractor Certification Workshop",
    date: "2026-04-15",
    location: "Orlando, FL",
    description: "Hands-on certification training for landscape contractors. Learn advanced installation techniques, system design principles, and earn your CAST TradePro certification.",
    link: "#",
  },
  {
    id: "2",
    title: "Outdoor Lighting Design Masterclass",
    date: "2026-05-08",
    location: "Dallas, TX",
    description: "An intensive one-day design workshop covering layered lighting concepts, fixture placement, control systems, and client presentation strategies for high-end residential projects.",
    link: "#",
  },
  {
    id: "3",
    title: "CAST Distributor Summit & Product Launch",
    date: "2026-06-20",
    location: "Phoenix, AZ",
    description: "Annual summit for authorized CAST distributors featuring new product unveilings, sales strategy sessions, and exclusive first look at upcoming catalog additions for Q3/Q4.",
    link: "#",
  },
]

function formatEventDate(dateStr: string): { month: string; day: string; year: string } {
  try {
    const d = new Date(dateStr + "T12:00:00")
    return {
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      day: d.getDate().toString(),
      year: d.getFullYear().toString(),
    }
  } catch {
    return { month: "TBD", day: "—", year: "" }
  }
}

function getExcerpt(text: string, maxLen = 130): string {
  if (!text) return ""
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text
}

const EventsGrid = forwardRef(function EventsGrid(
  {
    className,
    bgColor = "#0f1923",
    heading = "Upcoming",
    headingAccent = "Events",
    overline = "Training & Community",
    emptyMessage = "No upcoming events at this time.",
  }: EventsGridProps,
  ref: Ref<HTMLElement>
) {
  const [events, setEvents] = useState<CastEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/cast/events")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json() as { events: CastEvent[] }
      setEvents(data.events ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchEvents()
  }, [fetchEvents])

  const displayEvents = loading ? [] : (events.length > 0 ? events : PLACEHOLDER_EVENTS)

  return (
    <section
      ref={ref}
      className={className || ""}
      style={{ width: '100%', background: bgColor || "#0f1923", }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: 56, maxWidth: 600 }}>
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
            margin: 0,
          }}>
            {heading || "Upcoming"}{" "}
            {headingAccent && (
              <span style={{
                background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {headingAccent}
              </span>
            )}
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{
              display: "inline-block",
              width: 40,
              height: 40,
              border: "3px solid rgba(0,124,176,0.3)",
              borderTopColor: "#007CB0",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 15,
              color: "rgba(255,255,255,0.4)",
              marginTop: 16,
            }}>
              Loading events...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 16,
              color: "rgba(255,100,100,0.7)",
              margin: "0 0 16px",
            }}>
              Could not load events.
            </p>
            <button
              onClick={() => void fetchEvents()}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "#007CB0",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State (after load, no events, no placeholder used) */}
        {!loading && !error && events.length === 0 && PLACEHOLDER_EVENTS.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 20,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
            }}>
              {emptyMessage}
            </p>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && displayEvents.length > 0 && (
          <>
          <style>{`
            .events-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
            @media (max-width: 900px) { .events-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 575px) { .events-grid { grid-template-columns: 1fr; } }
          `}</style>
          <div className="events-grid">
            {displayEvents.map((event) => {
              const { month, day, year } = formatEventDate(event.date)
              const excerpt = getExcerpt(event.description)
              return (
                <div
                  key={event.id}
                  style={{
                    background: "#25262d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 200ms, box-shadow 200ms, transform 200ms",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "rgba(0,124,176,0.45)"
                    el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"
                    el.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "rgba(255,255,255,0.08)"
                    el.style.boxShadow = "none"
                    el.style.transform = "translateY(0)"
                  }}
                >
                  {/* Date Banner */}
                  <div style={{
                    background: "linear-gradient(135deg, #014960, #007CB0)",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}>
                    <div style={{ textAlign: "center", minWidth: 56 }}>
                      <span style={{
                        display: "block",
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.75)",
                      }}>
                        {month}
                      </span>
                      <span style={{
                        display: "block",
                        fontFamily: "'Essonnes', 'Playfair Display', serif",
                        fontSize: "2.2rem",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1,
                      }}>
                        {day}
                      </span>
                      <span style={{
                        display: "block",
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.6)",
                      }}>
                        {year}
                      </span>
                    </div>
                    {event.location && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        paddingLeft: 16,
                        borderLeft: "1px solid rgba(255,255,255,0.2)",
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: 13,
                          color: "rgba(255,255,255,0.8)",
                          fontWeight: 600,
                        }}>
                          {event.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                    <h3 style={{
                      fontFamily: "'Essonnes', 'Playfair Display', serif",
                      fontSize: "var(--heading-card-sm, 1.2rem)",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.35,
                      margin: 0,
                    }}>
                      {event.title}
                    </h3>
                    {excerpt && (
                      <p style={{
                        fontFamily: "'Barlow', sans-serif",
                        fontSize: 14,
                        color: "rgba(255,255,255,0.52)",
                        lineHeight: 1.65,
                        margin: 0,
                        flex: 1,
                      }}>
                        {excerpt}
                      </p>
                    )}
                    {event.link && (
                      <a
                        href={event.link}
                        style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#007CB0",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          marginTop: 4,
                          letterSpacing: "0.02em",
                        }}
                      >
                        Learn More →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          </>
        )}
      </div>
    </section>
  )
})

export default EventsGrid
