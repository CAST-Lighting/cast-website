"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"

interface Quote {
  id: string
  quoteNumber: string
  status: string
  total: string
  createdAt: string
  customerName: string
}

interface QuotesListProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  heading?: string
  emptyMessage?: string
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "rgba(234,179,8,0.15)", color: "#f5c518" },
  Approved: { bg: "rgba(34,197,94,0.15)", color: "#4ade80" },
  Ordered: { bg: "rgba(0,124,176,0.2)", color: "#7EBEE8" },
  Expired: { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" },
}

function statusStyle(status: string): { bg: string; color: string } {
  return STATUS_COLORS[status] ?? STATUS_COLORS["Pending"] ?? { bg: "rgba(234,179,8,0.15)", color: "#f5c518" }
}

function QuotesList(
  {
    className,
    bgColor = "#0f1923",
    paddingTop = 64,
    paddingBottom = 64,
    heading = "My Quotes",
    emptyMessage = "No quotes yet.",
  }: QuotesListProps,
  ref: Ref<HTMLElement>,
) {
  // DEMO DATA — remove once BC B2B Quotes API is connected
  const DEMO_QUOTES: Quote[] = [
    { id: "1", quoteNumber: "Q-2026-0042", status: "Approved", total: "$3,847.50", createdAt: "March 28, 2026", customerName: "Tristan Vava" },
    { id: "2", quoteNumber: "Q-2026-0039", status: "Pending", total: "$1,250.00", createdAt: "March 24, 2026", customerName: "Tristan Vava" },
    { id: "3", quoteNumber: "Q-2026-0031", status: "Ordered", total: "$6,120.75", createdAt: "March 10, 2026", customerName: "Tristan Vava" },
    { id: "4", quoteNumber: "Q-2026-0018", status: "Expired", total: "$890.00", createdAt: "February 14, 2026", customerName: "Tristan Vava" },
  ]

  const [quotes, setQuotes] = useState<Quote[]>(DEMO_QUOTES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Uncomment below to connect live BC B2B Quotes API:
    // fetch("/api/account/quotes")
    fetch("/api/account/quotes-disabled-for-demo")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load quotes")
        return r.json() as Promise<Quote[]>
      })
      .then((data) => {
        setQuotes(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={{
        background: bgColor,
        paddingTop,
        paddingBottom,
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      <style>{`
        .ql-ms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1100px) { .ql-ms-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 680px) { .ql-ms-grid { grid-template-columns: 1fr; } }
        .ql-ms-card {
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
        }
        .ql-ms-card:hover {
          border-color: rgba(0,124,176,0.45);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="site-container">
        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#fff", margin: 0 }}>
            {heading}
          </h2>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ display: "inline-block", width: 36, height: 36, border: "3px solid rgba(0,124,176,0.3)", borderTopColor: "#007CB0", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.5)" }}>
            <p style={{ fontSize: 16 }}>{error}</p>
          </div>
        )}

        {!loading && !error && quotes.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.3 }}>📄</div>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>
              {emptyMessage}
            </p>
            <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: "none" }}>
              Browse Products →
            </a>
          </div>
        )}

        {!loading && !error && quotes.length > 0 && (
          <div className="ql-ms-grid">
            {quotes.map((quote) => {
              const { bg, color } = statusStyle(quote.status)
              return (
                <div key={quote.id} className="ql-ms-card">
                  <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h4-size)", fontWeight: 700, color: "#fff", margin: 0 }}>
                        #{quote.quoteNumber}
                      </h3>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: bg, color, padding: "4px 12px", borderRadius: 100, whiteSpace: "nowrap" }}>
                        {quote.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                      {quote.createdAt && (
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>{quote.createdAt}</p>
                      )}
                      {quote.customerName && (
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>{quote.customerName}</p>
                      )}
                      {quote.total && (
                        <p style={{ fontSize: 16, fontWeight: 700, color: "#7EBEE8", margin: 0 }}>{quote.total}</p>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <a href={`/account/quotes/${quote.id}`} className="sg-btn-outline-dark-sm" style={{ textDecoration: "none", display: "inline-block" }}>
                        View Quote →
                      </a>
                      {quote.status === "Approved" && (
                        <a href={`/account/quotes/${quote.id}/convert`} className="sg-btn-solid-dark-sm" style={{ textDecoration: "none", display: "inline-block" }}>
                          Order Now →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default forwardRef<HTMLElement, QuotesListProps>(QuotesList)
