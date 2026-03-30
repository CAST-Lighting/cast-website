"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"

interface QuoteLineItem {
  id: string
  productId: number
  name: string
  modelNumber: string
  image: string | null
  price: string
  qty: number
  lineTotal: string
}

interface QuoteData {
  id: string
  quoteNumber: string
  quoteName: string
  status: string
  createdAt: string
  expiresAt: string
  customerName: string
  notes: string
  items: QuoteLineItem[]
  subtotal: string
  tax: string
  total: string
}

interface QuoteDetailProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending:  { bg: "rgba(234,179,8,0.15)",  color: "#f5c518" },
  Approved: { bg: "rgba(34,197,94,0.15)",   color: "#4ade80" },
  Ordered:  { bg: "rgba(0,124,176,0.2)",    color: "#7EBEE8" },
  Expired:  { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" },
}
const statusStyle = (s: string) => STATUS_COLORS[s] ?? STATUS_COLORS["Pending"]!

const DEMO_QUOTE: QuoteData = {
  id: "1",
  quoteNumber: "Q-2026-0042",
  quoteName: "Front Yard Renovation",
  status: "Approved",
  createdAt: "March 28, 2026",
  expiresAt: "April 28, 2026",
  customerName: "Tristan Vava",
  notes: "Please confirm transformer compatibility before ordering. Customer prefers warm white 2700K throughout.",
  subtotal: "$3,560.00",
  tax: "$287.50",
  total: "$3,847.50",
  items: [
    { id: "1", productId: 119, name: "Classic Brass Path Light 5.5W", modelNumber: "CBP55",   image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/119/738/caledbt_color-wheel-960x960-3092282884__17955.1762461221.jpg", price: "$89.99",  qty: 8,  lineTotal: "$719.92"  },
    { id: "2", productId: 116, name: "CAST Integrated LED 12.5W Bullet Spot", modelNumber: "SSPK12", image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/116/700/sspk12_1-960x960-52278476__36183.1762461221.jpg", price: "$228.00", qty: 4,  lineTotal: "$912.00"  },
    { id: "3", productId: 226, name: "Path Light Set-In-Stake Telescopic Stem", modelNumber: "PLTS24", image: null, price: "$72.51",  qty: 12, lineTotal: "$870.12"  },
    { id: "4", productId: 266, name: "CAST Stainless Thumb Screw",             modelNumber: "XCHS83250", image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/266/506/xchs83250-parts-960x960-2245893803__53926.1759240869.jpg", price: "$6.48",   qty: 16, lineTotal: "$103.68"  },
  ],
}

function QuoteDetail(
  {
    className,
    bgColor = "#F5F5F5",
    paddingTop = 64,
    paddingBottom = 64,
  }: QuoteDetailProps,
  ref: Ref<HTMLElement>,
) {
  const [quote, setQuote]         = useState<QuoteData>(DEMO_QUOTE)
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue]     = useState(quote.quoteName)
  const [converting, setConverting]   = useState(false)

  useEffect(() => {
    // TODO: get quote id from URL params, fetch /api/account/quotes/:id
  }, [])

  const commitName = () => {
    const trimmed = nameValue.trim()
    if (trimmed) {
      setQuote(prev => ({ ...prev, quoteName: trimmed }))
      // TODO: PATCH /api/account/quotes/:id { name: trimmed }
    }
    setEditingName(false)
  }

  const handleConvertToOrder = async () => {
    setConverting(true)
    // TODO: POST /api/account/quotes/:id/convert-to-order
    setConverting(false)
  }

  const { bg, color } = statusStyle(quote.status)

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={{ background: bgColor, paddingTop, paddingBottom, fontFamily: "'Barlow', sans-serif" }}
    >
      <style>{`
        .qd-table { width: 100%; border-collapse: collapse; }
        .qd-table th {
          font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4); padding: 10px 16px; text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .qd-table th:last-child { text-align: right; }
        .qd-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); vertical-align: middle; }
        .qd-table tr:last-child td { border-bottom: none; }
        .qd-name-input {
          background: rgba(255,255,255,0.07); border: 1px solid rgba(0,124,176,0.5);
          border-radius: 4px; color: #fff; font-family: 'Essonnes','Playfair Display',serif;
          font-size: var(--h3-size); font-weight: 700; padding: 4px 10px; outline: none; width: 100%;
        }
        .qd-rename-btn {
          background: none; border: none; cursor: pointer; color: rgba(0,73,96,0.35);
          padding: 0; display: inline-flex; align-items: center; transition: color 150ms; margin-left: 8px;
        }
        .qd-rename-btn:hover { color: #007CB0; }
      `}</style>

      <div className="site-container">

        {/* Back link */}
        <a href="/account/quotes" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#007CB0", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          ← Back to My Quotes
        </a>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            {/* Quote name — editable */}
            {editingName ? (
              <input
                className="qd-name-input"
                value={nameValue}
                autoFocus
                onChange={e => setNameValue(e.target.value)}
                onBlur={commitName}
                onKeyDown={e => { if (e.key === "Enter") commitName(); if (e.key === "Escape") setEditingName(false) }}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#014960", margin: 0 }}>
                  {quote.quoteName}
                </h1>
                <button className="qd-rename-btn" onClick={() => { setNameValue(quote.quoteName); setEditingName(true) }} aria-label="Rename quote" title="Rename quote">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              </div>
            )}
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: "#007CB0", letterSpacing: "0.05em", textTransform: "uppercase", margin: "6px 0 0" }}>
              #{quote.quoteNumber}
            </p>
          </div>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: bg, color, padding: "5px 14px", borderRadius: 100 }}>
            {quote.status}
          </span>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32, padding: "16px 20px", background: "#1e2a33", borderRadius: 8, border: "1px solid rgba(255,255,255,0.07)" }}>
          {[
            { label: "Created",   value: quote.createdAt },
            { label: "Expires",   value: quote.expiresAt },
            { label: "Customer",  value: quote.customerName },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(255,255,255,0.4)", margin: "0 0 3px" }}>{label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Line items table */}
        <div style={{ background: "#1e2a33", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
          <table className="qd-table">
            <thead>
              <tr>
                <th style={{ width: 56 }}></th>
                <th>Product</th>
                <th>SKU</th>
                <th style={{ textAlign: "right" }}>Unit Price</th>
                <th style={{ textAlign: "center" }}>Qty</th>
                <th style={{ textAlign: "right" }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 4, overflow: "hidden", background: "#fff", flexShrink: 0 }}>
                      {item.image
                        ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        : <div style={{ width: "100%", height: "100%", background: "#2d353c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7EBEE8" strokeWidth="1.5" style={{ opacity: 0.4 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                          </div>
                      }
                    </div>
                  </td>
                  <td>
                    <a href={`/shop-all/${item.productId}`} style={{ textDecoration: "none" }}>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3 }}>{item.name}</p>
                    </a>
                  </td>
                  <td>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, color: "#7EBEE8", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                      {item.modelNumber}
                    </p>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0 }}>{item.price}</p>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>{item.qty}</p>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 700, color: "#007CB0", margin: 0 }}>{item.lineTotal}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes + Totals row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "start", flexWrap: "wrap" }}>

          {/* Notes */}
          {quote.notes && (
            <div style={{ background: "#1e2a33", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "16px 20px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(255,255,255,0.4)", margin: "0 0 8px" }}>Notes</p>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{quote.notes}</p>
            </div>
          )}

          {/* Totals */}
          <div style={{ background: "#1e2a33", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "16px 24px", minWidth: 260 }}>
            {[
              { label: "Subtotal", value: quote.subtotal, muted: true },
              { label: "Tax",      value: quote.tax,      muted: true },
            ].map(({ label, value, muted }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{label}</span>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: muted ? "rgba(255,255,255,0.7)" : "#fff", fontWeight: 600 }}>{value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, marginTop: 4 }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff" }}>Total</span>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 20, fontWeight: 700, color: "#007CB0" }}>{quote.total}</span>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(0,73,96,0.12)", justifyContent: "flex-end" }}>
          <a href="/account/quotes" className="sg-btn-outline-md" style={{ textDecoration: "none" }}>
            ← All Quotes
          </a>
          {quote.status === "Approved" && (
            <button
              className="sg-btn-solid-md"
              onClick={handleConvertToOrder}
              disabled={converting}
              style={{ opacity: converting ? 0.6 : 1 }}
            >
              {converting ? "Processing…" : "Convert to Order →"}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default forwardRef<HTMLElement, QuoteDetailProps>(QuoteDetail)
