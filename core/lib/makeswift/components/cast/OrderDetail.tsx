"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"
import { useParams } from "next/navigation"
import { getTheme } from "~/lib/makeswift/theme"

interface OrderLineItem {
  id: string
  productId: number
  name: string
  modelNumber: string
  image: string | null
  price: string
  qty: number
  lineTotal: string
}

interface ShippingAddress {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

interface OrderData {
  id: string
  orderNumber: string
  status: string
  createdAt: string
  shippedAt?: string
  deliveredAt?: string
  trackingNumber?: string
  trackingUrl?: string
  shippingAddress: ShippingAddress
  items: OrderLineItem[]
  subtotal: string
  shipping: string
  tax: string
  total: string
  notes?: string
}

interface OrderDetailProps {
  className?: string
  bgColor?: string
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Processing: { bg: "rgba(234,179,8,0.15)",  color: "#d97706" },
  Shipped:    { bg: "rgba(0,124,176,0.15)",   color: "#007CB0" },
  Delivered:  { bg: "rgba(34,197,94,0.15)",   color: "#16a34a" },
  Cancelled:  { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
  Refunded:   { bg: "rgba(0,73,96,0.07)",     color: "rgba(0,73,96,0.45)" },
}
const statusStyle = (s: string) => STATUS_COLORS[s] ?? STATUS_COLORS["Processing"]!

const DEMO_ORDER: OrderData = {
  id: "1",
  orderNumber: "ORD-2026-1041",
  status: "Delivered",
  createdAt: "March 20, 2026",
  shippedAt: "March 22, 2026",
  deliveredAt: "March 25, 2026",
  trackingNumber: "1Z999AA10123456784",
  trackingUrl: "https://www.ups.com/track?tracknum=1Z999AA10123456784",
  shippingAddress: { name: "Tristan Vava", line1: "123 Main Street", city: "Charlotte", state: "NC", zip: "28277" },
  subtotal: "$3,560.00",
  shipping: "$0.00",
  tax: "$287.50",
  total: "$3,847.50",
  items: [
    { id: "1", productId: 119, name: "Classic Brass Path Light 5.5W",           modelNumber: "CBP55",     image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/119/738/caledbt_color-wheel-960x960-3092282884__17955.1762461221.jpg", price: "$89.99",  qty: 8,  lineTotal: "$719.92"  },
    { id: "2", productId: 116, name: "CAST Integrated LED 12.5W Bullet Spot",   modelNumber: "SSPK12",    image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/116/700/sspk12_1-960x960-52278476__36183.1762461221.jpg", price: "$228.00", qty: 4,  lineTotal: "$912.00"  },
    { id: "3", productId: 226, name: "Path Light Set-In-Stake Telescopic Stem", modelNumber: "PLTS24",    image: null,  price: "$72.51",  qty: 12, lineTotal: "$870.12"  },
    { id: "4", productId: 266, name: "CAST Stainless Thumb Screw",              modelNumber: "XCHS83250", image: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/266/506/xchs83250-parts-960x960-2245893803__53926.1759240869.jpg", price: "$6.48",   qty: 16, lineTotal: "$103.68"  },
  ],
}

function OrderDetail(
  {
    className,
    bgColor = "#F5F5F5",
  }: OrderDetailProps,
  ref: Ref<HTMLElement>,
) {
  const t = getTheme("light")
  const params = useParams()
  const orderId = params?.id as string | undefined

  const [order, setOrder] = useState<OrderData>(DEMO_ORDER)

  useEffect(() => {
    if (!orderId) return
    fetch(`/api/account/orders/${orderId}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then((data: OrderData) => setOrder(data))
      .catch(err => console.error("[OrderDetail] fetch error", err))
  }, [orderId])

  const { bg, color } = statusStyle(order.status)

  const STATUS_STEPS = ["Processing", "Shipped", "Delivered"]
  const currentStep = STATUS_STEPS.indexOf(order.status)

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={`cast-order-detail-defaults ${className || ""}`}
      style={{ background: bgColor, fontFamily: "'Barlow', sans-serif" }}
    >


      <div className="site-container">

        {/* Back */}
        <a href="/account/orders" style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: t.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          ← Back to My Orders
        </a>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: "0 0 6px" }}>
              {order.orderNumber}
            </h1>
            <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.subtle, margin: 0 }}>
              Placed {order.createdAt}
            </p>
          </div>
          <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: bg, color, padding: "5px 14px", borderRadius: 100 }}>
            {order.status}
          </span>
        </div>

        {/* Progress tracker — only for non-cancelled */}
        {STATUS_STEPS.includes(order.status) && (
          <div className="od-panel" style={{ padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStep
                const isLast = i === STATUS_STEPS.length - 1
                return (
                  <div key={step} style={{ display: "flex", alignItems: "center", flex: isLast ? 0 : 1 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? t.accent : t.inputBg, border: `2px solid ${done ? t.accent : t.cardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, color: done ? t.heading : t.subtle, textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{step}</span>
                    </div>
                    {!isLast && (
                      <div style={{ flex: 1, height: 2, background: i < currentStep ? t.accent : t.divider, margin: "0 8px", marginBottom: 22 }} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Info row — shipping + tracking */}
        <div className="od-info-grid">
          <div className="od-panel" style={{ padding: "16px 20px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: t.subtle, margin: "0 0 10px" }}>Shipping Address</p>
            <p style={{ fontSize: 14, color: t.heading, fontWeight: 600, margin: "0 0 2px" }}>{order.shippingAddress.name}</p>
            <p style={{ fontSize: 14, color: t.body, margin: 0, lineHeight: 1.6 }}>
              {order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </p>
          </div>
          <div className="od-panel" style={{ padding: "16px 20px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: t.subtle, margin: "0 0 10px" }}>Delivery Info</p>
            {[
              order.shippedAt    && { label: "Shipped",   value: order.shippedAt },
              order.deliveredAt  && { label: "Delivered", value: order.deliveredAt },
            ].filter(Boolean).map((row) => (
              <div key={(row as {label:string}).label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: t.subtle }}>{(row as {label:string}).label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: t.heading }}>{(row as {value:string}).value}</span>
              </div>
            ))}
            {order.trackingNumber && (
              <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className={t.btnSm} style={{ textDecoration: "none", marginTop: 12, display: "inline-flex" }}>
                Track Package →
              </a>
            )}
          </div>
        </div>

        {/* Line items */}
        <div className="od-panel" style={{ overflowX: "auto", marginBottom: 24 }}>
          <table className="od-table" style={{ minWidth: 560 }}>
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
              {order.items.map((item) => (
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
                    <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, fontWeight: 700, color: t.heading, margin: 0, lineHeight: 1.3 }}>{item.name}</p>
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
        <div className="od-bottom-grid">
          {order.notes ? (
            <div className="od-panel" style={{ padding: "16px 20px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: t.subtle, margin: "0 0 8px" }}>Notes</p>
              <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: t.body, lineHeight: 1.6, margin: 0 }}>{order.notes}</p>
            </div>
          ) : <div />}

          <div className="od-panel" style={{ padding: "16px 24px" }}>
            {[
              { label: "Subtotal", value: order.subtotal },
              { label: "Shipping", value: order.shipping },
              { label: "Tax",      value: order.tax },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${t.divider}` }}>
                <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.subtle }}>{label}</span>
                <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: t.body, fontWeight: 600 }}>{value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, marginTop: 4 }}>
              <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 15, fontWeight: 700, color: t.heading }}>Total</span>
              <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 20, fontWeight: 700, color: t.accent }}>{order.total}</span>
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="od-action-bar">
          <a href="/account/orders" className={t.btnOutline} style={{ textDecoration: "none" }}>← All Orders</a>
          <a href="/shop" className={t.btnPrimary} style={{ textDecoration: "none" }}>Reorder Items →</a>
        </div>

      </div>
    </div>
  )
}

export default forwardRef<HTMLElement, OrderDetailProps>(OrderDetail)
