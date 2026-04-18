"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"
import { getTheme } from "~/lib/makeswift/theme"

interface Quote {
  id: string
  quoteNumber: string
  quoteName: string
  status: string
  total: string
  createdAt: string
  itemCount: number
}

interface QuotesListProps {
  className?: string
  paddingTop?: number
  paddingBottom?: number
  bgColor?: string
  heading?: string
  emptyMessage?: string
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending:  { bg: "rgba(234,179,8,0.15)",   color: "#d97706" },
  Approved: { bg: "rgba(34,197,94,0.15)",    color: "#16a34a" },
  Ordered:  { bg: "rgba(0,124,176,0.15)",    color: "#007CB0" },
  Expired:  { bg: "rgba(0,73,96,0.07)",      color: "rgba(0,73,96,0.4)" },
}
const statusStyle = (s: string) => STATUS_COLORS[s] ?? STATUS_COLORS["Pending"]!

const DEMO: Quote[] = [
  { id: "1", quoteNumber: "Q-2026-0042", quoteName: "Front Yard Renovation",  status: "Approved", total: "$3,847.50", createdAt: "March 28, 2026",    itemCount: 12 },
  { id: "2", quoteNumber: "Q-2026-0039", quoteName: "Back Patio Lighting",    status: "Pending",  total: "$1,250.00", createdAt: "March 24, 2026",    itemCount: 6  },
  { id: "3", quoteNumber: "Q-2026-0031", quoteName: "Commercial Walkway",     status: "Ordered",  total: "$6,120.75", createdAt: "March 10, 2026",    itemCount: 24 },
  { id: "4", quoteNumber: "Q-2026-0018", quoteName: "Pool Area Phase 1",      status: "Expired",  total: "$890.00",   createdAt: "February 14, 2026", itemCount: 4  },
]

function QuotesList(
  {
    className,
    paddingTop = 80,
    paddingBottom = 80,
    bgColor = "#F5F5F5",
    heading = "My Quotes",
    emptyMessage = "No quotes yet.",
  }: QuotesListProps,
  ref: Ref<HTMLElement>,
) {
  const t = getTheme("light")

  const [quotes, setQuotes]       = useState<Quote[]>(DEMO)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  useEffect(() => {
    fetch("/api/account/quotes")
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then((data: Array<{ id: string; quoteNumber: string; status: string; total: string; createdAt: string; customerName?: string }>) => {
        const mapped: Quote[] = data.map(q => ({
          id: q.id,
          quoteNumber: q.quoteNumber,
          quoteName: q.quoteNumber,
          status: q.status,
          total: q.total,
          createdAt: q.createdAt,
          itemCount: 0,
        }))
        setQuotes(mapped)
      })
      .catch(err => console.error("[QuotesList] fetch error", err))
  }, [])

  const startEdit = (quote: Quote) => { setEditingId(quote.id); setEditValue(quote.quoteName) }
  const commitEdit = (id: string) => {
    const trimmed = editValue.trim()
    if (trimmed) {
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, quoteName: trimmed } : q))
      fetch("/api/account/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: trimmed }),
      }).catch(err => console.error("[QuotesList] rename error", err))
    }
    setEditingId(null)
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className || ""}
      style={{ width: '100%', background: bgColor, paddingTop, paddingBottom, fontFamily: "'Barlow', sans-serif" }}
    >
      <style>{`
        .ql-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .ql-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .ql-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .ql-grid { grid-template-columns: 1fr; } }
        .ql-card {
          background: ${t.cardBg};
          border: 1px solid ${t.cardBorder};
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .ql-card:hover {
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        }
        .ql-name-input {
          background: ${t.inputBg};
          border: 1px solid rgba(0,124,176,0.4);
          border-radius: 4px;
          color: ${t.heading};
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 700;
          padding: 5px 8px; width: 100%; outline: none;
          box-sizing: border-box;
        }
        .ql-rename-btn {
          background: none; border: none; cursor: pointer;
          color: ${t.subtle}; padding: 0;
          display: inline-flex; align-items: center;
          transition: color 150ms; flex-shrink: 0;
        }
        .ql-rename-btn:hover { color: ${t.accent}; }
      `}</style>

      <div className="site-container">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: 0 }}>
            {heading}
          </h2>
        </div>

        {/* Empty */}
        {quotes.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.2 }}>📄</div>
            <p style={{ fontSize: 18, color: t.subtle, margin: "0 0 24px" }}>{emptyMessage}</p>
            <a href="/shop" className={t.btnPrimary} style={{ textDecoration: "none" }}>Browse Products →</a>
          </div>
        )}

        {/* Grid */}
        {quotes.length > 0 && (
          <div className="ql-grid">
            {quotes.map((quote) => {
              const { bg, color } = statusStyle(quote.status)
              const isEditing = editingId === quote.id
              return (
                <div key={quote.id} className="ql-card">
                  <div style={{ padding: "18px 16px", flex: 1, display: "flex", flexDirection: "column" }}>

                    {/* Top: grows to fill */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>

                      {/* Status badge */}
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: bg, color, padding: "3px 10px", borderRadius: 100, alignSelf: "flex-start" }}>
                        {quote.status}
                      </span>

                      {/* Quote name — editable */}
                      {isEditing ? (
                        <input
                          className="ql-name-input"
                          value={editValue}
                          autoFocus
                          onChange={e => setEditValue(e.target.value)}
                          onBlur={() => commitEdit(quote.id)}
                          onKeyDown={e => { if (e.key === "Enter") commitEdit(quote.id); if (e.key === "Escape") setEditingId(null) }}
                        />
                      ) : (
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                          <h3 className="heading-card-sm" style={{ margin: 0, color: t.heading, flex: 1 }}>
                            {quote.quoteName}
                          </h3>
                          <button className="ql-rename-btn" onClick={() => startEdit(quote)} aria-label="Rename quote" title="Rename">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Quote # */}
                      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 600, color: t.subtle, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                        #{quote.quoteNumber}
                      </p>

                      {/* Meta */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <p style={{ fontSize: 12, color: t.subtle, margin: 0 }}>{quote.createdAt}</p>
                        <p style={{ fontSize: 12, color: t.subtle, margin: 0 }}>{quote.itemCount} {quote.itemCount === 1 ? "item" : "items"}</p>
                      </div>

                      {/* Total */}
                      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 18, fontWeight: 700, color: t.heading, margin: 0 }}>
                        {quote.total}
                      </p>
                    </div>

                    {/* Bottom: actions — always pinned */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                      <div style={{ height: 1, background: t.divider }} />
                      <a href={`/account/quotes/${quote.id}`} className={t.btnPrimary} style={{ textDecoration: "none", justifyContent: "center", textAlign: "center" }}>
                        View Quote →
                      </a>
                      {quote.status === "Approved" && (
                        <a href={`/account/quotes/${quote.id}/convert`} className={t.btnOutlineSm} style={{ textDecoration: "none", justifyContent: "center", textAlign: "center" }}>
                          Convert to Order
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
