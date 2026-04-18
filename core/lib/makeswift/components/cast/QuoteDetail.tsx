"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"
import { useParams } from "next/navigation"
import { getTheme } from "~/lib/makeswift/theme"

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
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending:  { bg: "rgba(234,179,8,0.15)",  color: "#d97706" },
  Approved: { bg: "rgba(34,197,94,0.15)",   color: "#16a34a" },
  Ordered:  { bg: "rgba(0,124,176,0.15)",   color: "#007CB0" },
  Expired:  { bg: "rgba(0,73,96,0.07)",     color: "rgba(0,73,96,0.4)" },
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
    { id: "1", productId: 119, name: "Classic Brass Path Light 5.5W",           modelNumber: "CBP55",     image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/119/738/caledbt_color-wheel-960x960-3092282884__17955.1762461221.jpg", price: "$89.99",  qty: 8,  lineTotal: "$719.92"  },
    { id: "2", productId: 116, name: "CAST Integrated LED 12.5W Bullet Spot",   modelNumber: "SSPK12",    image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/116/700/sspk12_1-960x960-52278476__36183.1762461221.jpg", price: "$228.00", qty: 4,  lineTotal: "$912.00"  },
    { id: "3", productId: 226, name: "Path Light Set-In-Stake Telescopic Stem", modelNumber: "PLTS24",    image: null,  price: "$72.51",  qty: 12, lineTotal: "$870.12"  },
    { id: "4", productId: 266, name: "CAST Stainless Thumb Screw",              modelNumber: "XCHS83250", image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/266/506/xchs83250-parts-960x960-2245893803__53926.1759240869.jpg", price: "$6.48",   qty: 16, lineTotal: "$103.68"  },
  ],
}

function QuoteDetail(
  {
    className,
    bgColor = "#F5F5F5",
  }: QuoteDetailProps,
  ref: Ref<HTMLElement>,
) {
  const t = getTheme("light")
  const params = useParams()
  const quoteId = params?.id as string | undefined

  const [quote, setQuote]             = useState<QuoteData>(DEMO_QUOTE)
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue]     = useState(quote.quoteName)
  const [converting, setConverting]   = useState(false)

  useEffect(() => {
    if (!quoteId) return
    fetch(`/api/account/quotes/${quoteId}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then((data: QuoteData) => {
        setQuote(data)
        setNameValue(data.quoteName)
      })
      .catch(err => console.error("[QuoteDetail] fetch error", err))
  }, [quoteId])

  const commitName = () => {
    const trimmed = nameValue.trim()
    if (trimmed) {
      setQuote(prev => ({ ...prev, quoteName: trimmed }))
      if (quoteId) {
        fetch("/api/account/quotes", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: quoteId, name: trimmed }),
        }).catch(err => console.error("[QuoteDetail] rename error", err))
      }
    }
    setEditingName(false)
  }

  const handleConvertToOrder = async () => {
    if (!quoteId) return
    setConverting(true)
    try {
      await fetch(`/api/account/quotes/${quoteId}/convert-to-order`, { method: "POST" })
    } catch (err) {
      console.error("[QuoteDetail] convert error", err)
    }
    setConverting(false)
  }

  const { bg, color } = statusStyle(quote.status)

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={`cast-quote-detail-defaults ${className || ""}`}
      style={{ width: '100%', background: bgColor, fontFamily: "'Barlow', sans-serif" }}
    >


      <div className="site-container">

        {/* Back */}
        <a href="/account/quotes" style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: t.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          ← Back to My Quotes
        </a>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
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
                <h1 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: 0 }}>
                  {quote.quoteName}
                </h1>
                <button className="qd-rename-btn" onClick={() => { setNameValue(quote.quoteName); setEditingName(true) }} aria-label="Rename" title="Rename quote">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              </div>
            )}
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, color: t.accent, letterSpacing: "0.05em", textTransform: "uppercase", margin: "6px 0 0" }}>
              #{quote.quoteNumber}
            </p>
          </div>
          <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: bg, color, padding: "5px 14px", borderRadius: 100 }}>
            {quote.status}
          </span>
        </div>

        {/* Meta row */}
        <div className="qd-panel" style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 24, padding: "16px 20px" }}>
          {[
            { label: "Created",  value: quote.createdAt },
            { label: "Expires",  value: quote.expiresAt },
            { label: "Customer", value: quote.customerName },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: t.subtle, margin: "0 0 3px" }}>{label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.heading, margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Line items */}
        <div className="qd-panel" style={{ overflowX: "auto", marginBottom: 24 }}>
          <table className="qd-table" style={{ minWidth: 560 }}>
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
                    <div style={{ width: 40, height: 40, borderRadius: 4, overflow: "hidden", background: t.inputBg, flexShrink: 0 }}>
                      {item.image
                        ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="1.5" style={{ opacity: 0.4 }}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                          </div>
                      }
                    </div>
                  </td>
                  <td>
                    <a href={`/shop-all/${item.productId}`} style={{ textDecoration: "none" }}>
                      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, color: t.heading, margin: 0, lineHeight: 1.3 }}>{item.name}</p>
                    </a>
                  </td>
                  <td>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, color: t.accent, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>{item.modelNumber}</p>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.body, margin: 0 }}>{item.price}</p>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, color: t.heading, margin: 0 }}>{item.qty}</p>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, fontWeight: 700, color: t.accent, margin: 0 }}>{item.lineTotal}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes + Totals */}
        <div className="qd-bottom-grid">
          {quote.notes ? (
            <div className="qd-panel" style={{ padding: "16px 20px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: t.subtle, margin: "0 0 8px" }}>Notes</p>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: t.body, lineHeight: 1.6, margin: 0 }}>{quote.notes}</p>
            </div>
          ) : <div />}

          <div className="qd-panel" style={{ padding: "16px 24px" }}>
            {[
              { label: "Subtotal", value: quote.subtotal },
              { label: "Tax",      value: quote.tax },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${t.divider}` }}>
                <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.subtle }}>{label}</span>
                <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.body, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, marginTop: 4 }}>
              <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 15, fontWeight: 700, color: t.heading }}>Total</span>
              <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 20, fontWeight: 700, color: t.accent }}>{quote.total}</span>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="qd-action-bar">
          <a href="/account/quotes" className={t.btnOutline} style={{ textDecoration: "none" }}>← All Quotes</a>
          {quote.status === "Approved" && (
            <button className={t.btnPrimary} onClick={handleConvertToOrder} disabled={converting} style={{ opacity: converting ? 0.6 : 1 }}>
              {converting ? "Processing…" : "Convert to Order →"}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default forwardRef<HTMLElement, QuoteDetailProps>(QuoteDetail)
