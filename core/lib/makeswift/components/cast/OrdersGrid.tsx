"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"
import { getTheme } from "~/lib/makeswift/theme"

interface Order {
  id: string
  orderNumber: string
  status: string
  total: string
  createdAt: string
  itemCount: number
  trackingNumber?: string
}

interface OrdersGridProps {
  className?: string
  bgColor?: string
  paddingTop?: number
  paddingBottom?: number
  heading?: string
  emptyMessage?: string
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Processing: { bg: "rgba(234,179,8,0.15)",  color: "#d97706" },
  Shipped:    { bg: "rgba(0,124,176,0.15)",   color: "#007CB0" },
  Delivered:  { bg: "rgba(34,197,94,0.15)",   color: "#16a34a" },
  Cancelled:  { bg: "rgba(239,68,68,0.12)",   color: "#dc2626" },
  Refunded:   { bg: "rgba(0,73,96,0.07)",     color: "rgba(0,73,96,0.45)" },
}
const statusStyle = (s: string) => STATUS_COLORS[s] ?? STATUS_COLORS["Processing"]!

const DEMO: Order[] = [
  { id: "1", orderNumber: "ORD-2026-1041", status: "Delivered",  total: "$3,847.50", createdAt: "March 20, 2026",    itemCount: 12, trackingNumber: "1Z999AA10123456784" },
  { id: "2", orderNumber: "ORD-2026-1038", status: "Shipped",    total: "$1,250.00", createdAt: "March 27, 2026",    itemCount: 6,  trackingNumber: "1Z999AA10123456791" },
  { id: "3", orderNumber: "ORD-2026-1029", status: "Processing", total: "$640.00",   createdAt: "March 29, 2026",    itemCount: 4  },
  { id: "4", orderNumber: "ORD-2026-0987", status: "Delivered",  total: "$6,120.75", createdAt: "February 28, 2026", itemCount: 24, trackingNumber: "1Z999AA10123456802" },
]

function OrdersGrid(
  {
    className,
    bgColor = "#F5F5F5",
    paddingTop = 64,
    paddingBottom = 64,
    heading = "My Orders",
    emptyMessage = "No orders yet.",
  }: OrdersGridProps,
  ref: Ref<HTMLElement>,
) {
  const t = getTheme("light")
  const [orders, setOrders] = useState<Order[]>(DEMO)

  useEffect(() => {
    // TODO: fetch("/api/account/orders").then(...)
  }, [])

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={{ background: bgColor, paddingTop, paddingBottom, fontFamily: "'Barlow', sans-serif" }}
    >
      <style>{`
        .og-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .og-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .og-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .og-grid { grid-template-columns: 1fr; } }
        .og-card {
          background: ${t.cardBg};
          border: 1px solid ${t.cardBorder};
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .og-card:hover {
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        }
      `}</style>

      <div className="site-container">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: 0 }}>
            {heading}
          </h2>
        </div>

        {/* Empty */}
        {orders.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.2 }}>📦</div>
            <p style={{ fontSize: 18, color: t.subtle, margin: "0 0 24px" }}>{emptyMessage}</p>
            <a href="/shop" className={t.btnPrimary} style={{ textDecoration: "none" }}>Browse Products →</a>
          </div>
        )}

        {/* Grid */}
        {orders.length > 0 && (
          <div className="og-grid">
            {orders.map((order) => {
              const { bg, color } = statusStyle(order.status)
              return (
                <div key={order.id} className="og-card">
                  <div style={{ padding: "18px 16px", flex: 1, display: "flex", flexDirection: "column" }}>

                    {/* Top — grows to fill */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>

                      {/* Status badge */}
                      <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", background: bg, color, padding: "3px 10px", borderRadius: 100, alignSelf: "flex-start" }}>
                        {order.status}
                      </span>

                      {/* Order # */}
                      <h3 className="heading-card-sm" style={{ margin: 0, color: t.heading }}>
                        {order.orderNumber}
                      </h3>

                      {/* Meta */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <p style={{ fontSize: 12, color: t.subtle, margin: 0 }}>{order.createdAt}</p>
                        <p style={{ fontSize: 12, color: t.subtle, margin: 0 }}>{order.itemCount} {order.itemCount === 1 ? "item" : "items"}</p>
                        {order.trackingNumber && (
                          <p style={{ fontSize: 11, fontWeight: 600, color: t.accent, margin: 0, fontFamily: "'Barlow',sans-serif", letterSpacing: "0.03em" }}>
                            Tracking: {order.trackingNumber}
                          </p>
                        )}
                      </div>

                      {/* Total */}
                      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 18, fontWeight: 700, color: t.heading, margin: 0 }}>
                        {order.total}
                      </p>
                    </div>

                    {/* Bottom — pinned actions */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                      <div style={{ height: 1, background: t.divider }} />
                      <a href={`/account/orders/${order.id}`} className={t.btnPrimary} style={{ textDecoration: "none", justifyContent: "center", textAlign: "center" }}>
                        View Order →
                      </a>
                      {(order.status === "Shipped" || order.status === "Delivered") && order.trackingNumber && (
                        <a
                          href={`https://www.ups.com/track?tracknum=${order.trackingNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={t.btnOutlineSm}
                          style={{ textDecoration: "none", justifyContent: "center", textAlign: "center" }}
                        >
                          Track Package
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

export default forwardRef<HTMLElement, OrdersGridProps>(OrdersGrid)
