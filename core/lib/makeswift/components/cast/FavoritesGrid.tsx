"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"
import { getTheme } from "~/lib/makeswift/theme"

interface FavoriteItem {
  id: number
  productId: number
  name: string
  price: string
  image: { url: string; alt: string } | null
  href: string
}

interface FavoritesGridProps {
  className?: string
  bgColor?: string
  heading?: string
  emptyMessage?: string
}

function parseNameAndModel(fullName: string): { name: string; model: string } {
  const match = fullName.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (match) return { name: match[1].trim(), model: match[2].trim() }
  return { name: fullName, model: "" }
}

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0
}

const DEMO: FavoriteItem[] = [
  { id: 1, productId: 119, name: "Classic Brass Path Light 5.5W (CBP55)",            price: "$89.99",  image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/119/738/caledbt_color-wheel-960x960-3092282884__17955.1762461221.jpg", alt: "Classic Brass Path Light" },  href: "/shop-all/classic-brass-path-light/" },
  { id: 2, productId: 266, name: "CAST Stainless Thumb Screw (XCHS83250)",           price: "$6.48",   image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/266/506/xchs83250-parts-960x960-2245893803__53926.1759240869.jpg", alt: "Stainless Thumb Screw" },     href: "/shop-all/stainless-screw/" },
  { id: 3, productId: 116, name: "CAST Integrated LED 12.5W Bullet Spot (SSPK12)",   price: "$228.00", image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/116/700/sspk12_1-960x960-52278476__36183.1762461221.jpg", alt: "LED Bullet Spot Light" },            href: "/shop-all/integrated-led-12-5-watt-bullet-spot-light-sspk12/" },
  { id: 4, productId: 226, name: "Path Light Set-In-Stake Telescopic Stem (PLTS24)", price: "$72.51",  image: null,                                                                                                                                                                                  href: "/shop-all/path-light-stem/" },
]

function FavoritesGrid(
  {
    className,
    bgColor = "#F5F5F5",
    heading = "My Favorites",
    emptyMessage = "Your favorites list is empty.",
  }: FavoritesGridProps,
  ref: Ref<HTMLElement>,
) {
  const t = getTheme("light")

  const [items, setItems]         = useState<FavoriteItem[]>(DEMO)
  const [qtys, setQtys]           = useState<Record<number, number>>(() => Object.fromEntries(DEMO.map(i => [i.id, 1])))
  const [removing, setRemoving]   = useState<number | null>(null)
  const [addingAll, setAddingAll] = useState(false)

  useEffect(() => {
    fetch("/api/account/favorites")
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then((data: FavoriteItem[]) => {
        setItems(data)
        setQtys(Object.fromEntries(data.map(i => [i.id, 1])))
      })
      .catch(err => console.error("[FavoritesGrid] fetch error", err))
  }, [])

  const setQty = (id: number, val: number) =>
    setQtys(prev => ({ ...prev, [id]: Math.max(1, val) }))

  const handleUnfavorite = async (item: FavoriteItem) => {
    setRemoving(item.id)
    try {
      await fetch("/api/account/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id, productId: item.productId }),
      })
    } catch (err) {
      console.error("[FavoritesGrid] remove error", err)
    }
    setItems(prev => prev.filter(i => i.id !== item.id))
    setRemoving(null)
  }

  const handleAddToCart = async (item: FavoriteItem) => {
    try {
      await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: item.productId, quantity: qtys[item.id] ?? 1 }),
      })
    } catch (err) {
      console.error("[FavoritesGrid] add to cart error", err)
    }
  }

  const handleAddAllToCart = async () => {
    setAddingAll(true)
    for (const item of items) await handleAddToCart(item)
    setAddingAll(false)
  }

  const orderTotal = items.reduce((sum, item) => sum + parsePrice(item.price) * (qtys[item.id] ?? 1), 0)

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={`cast-favorites-grid-defaults ${className || ""}`}
      style={{ background: bgColor, fontFamily: "'Barlow', sans-serif" }}
    >
      <style>{`
        .cast-favorites-grid-defaults { padding-top: 64px; padding-bottom: 64px; }
        @media (max-width: 1024px) { .cast-favorites-grid-defaults { padding-top: 51px; padding-bottom: 51px; } }
        @media (max-width: 768px)  { .cast-favorites-grid-defaults { padding-top: 41px; padding-bottom: 41px; } }
        @media (max-width: 640px)  { .cast-favorites-grid-defaults { padding-top: 35px; padding-bottom: 35px; } }
      `}</style>
      <style>{`
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .fav-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .fav-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .fav-grid { grid-template-columns: 1fr; } }
        .fav-card {
          background: ${t.cardBg};
          border: 1px solid ${t.cardBorder};
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 200ms, box-shadow 200ms;
        }
        .fav-card:hover {
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        }
        .fav-qty {
          display: flex; align-items: center;
          border: 1px solid ${t.inputBorder}; border-radius: 4px;
          overflow: hidden; background: ${t.inputBg}; width: fit-content;
        }
        .fav-qty button {
          width: 28px; height: 28px; border: none; background: transparent;
          color: ${t.accent}; cursor: pointer; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          transition: background 150ms;
        }
        .fav-qty button:hover { background: rgba(0,124,176,0.08); }
        .fav-qty input {
          width: 34px; border: none; background: transparent; text-align: center;
          font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700;
          color: ${t.heading}; outline: none;
        }
        .fav-qty input::-webkit-outer-spin-button,
        .fav-qty input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .fav-qty input[type=number] { -moz-appearance: textfield; }
        .fav-remove-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: none; border: 1px solid ${t.cardBorder};
          border-radius: 4px; color: ${t.subtle};
          font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 600;
          padding: 5px 9px; cursor: pointer;
          transition: border-color 150ms, color 150ms; white-space: nowrap;
        }
        .fav-remove-btn:hover { border-color: #ef4444; color: #ef4444; }
        .fav-remove-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .fav-footer {
          margin-top: 32px;
          border-top: 1px solid ${t.divider};
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .fav-footer-right {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .fav-total-label {
          text-align: right;
        }
        @media (max-width: 640px) {
          .fav-footer { flex-direction: column; align-items: flex-start; }
          .fav-footer-right { flex-direction: column; align-items: flex-start; gap: 12px; width: 100%; }
          .fav-total-label { text-align: left; }
        }
        @keyframes fav-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="site-container">

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: "var(--h2-size)", fontWeight: 700, color: t.heading, margin: 0 }}>
            {heading}
          </h2>
          {items.length > 0 && (
            <button className={t.btnPrimary} onClick={handleAddAllToCart} disabled={addingAll} style={{ opacity: addingAll ? 0.6 : 1 }}>
              {addingAll ? "Adding…" : `Add All to Cart (${items.length})`}
            </button>
          )}
        </div>

        {/* Empty */}
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.2 }}>♡</div>
            <p style={{ fontSize: 18, color: t.subtle, margin: "0 0 24px" }}>{emptyMessage}</p>
            <a href="/shop" className={t.btnPrimary} style={{ textDecoration: "none" }}>Browse Products →</a>
          </div>
        )}

        {/* Grid */}
        {items.length > 0 && (
          <div className="fav-grid">
            {items.map((item) => {
              const { name, model } = parseNameAndModel(item.name)
              const qty = qtys[item.id] ?? 1
              const isRemoving = removing === item.id

              return (
                <div key={item.id} className="fav-card" style={{ opacity: isRemoving ? 0.4 : 1, transition: "opacity 200ms" }}>

                  {/* Image — exactly like ShopGrid */}
                  <a href={item.href} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden", background: "#fff" }}>
                      {item.image ? (
                        <img src={item.image.url} alt={item.image.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(175,229,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(175,229,253,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, position: "relative", zIndex: 1 }}>
                            <circle cx="12" cy="12" r="10" stroke="#7EBEE8" strokeWidth="1.5" />
                            <path d="M8 12h8M12 8v8" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </a>

                  {/* Card body */}
                  <div style={{ padding: "18px 16px", flex: 1, display: "flex", flexDirection: "column" }}>

                    {/* Top: name/sku/price — grows to fill available space */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                      <a href={item.href} style={{ textDecoration: "none" }}>
                        <h3 className="heading-card-sm" style={{ margin: 0, color: t.heading }}>{name}</h3>
                      </a>
                      {model && (
                        <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 600, color: t.subtle, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                          #{model}
                        </p>
                      )}
                      {item.price && (
                        <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 18, fontWeight: 700, color: t.heading, margin: 0 }}>
                          {item.price}
                        </p>
                      )}
                    </div>

                    {/* Bottom: controls — always pinned to bottom of card */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                      <div style={{ height: 1, background: t.divider }} />

                      {/* QTY stepper */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: t.subtle, textTransform: "uppercase", letterSpacing: "0.05em" }}>Qty</span>
                        <div className="fav-qty">
                          <button onClick={() => setQty(item.id, qty - 1)} aria-label="Decrease">−</button>
                          <input type="number" value={qty} min={1} onChange={e => setQty(item.id, parseInt(e.target.value) || 1)} />
                          <button onClick={() => setQty(item.id, qty + 1)} aria-label="Increase">+</button>
                        </div>
                      </div>

                      {/* Add to Cart */}
                      <button className={t.btnPrimary} style={{ justifyContent: "center" }} onClick={() => handleAddToCart(item)}>
                        Add to Cart
                      </button>

                      {/* View + Remove */}
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <a href={item.href} className={t.btnOutlineSm} style={{ textDecoration: "none", flex: 1, justifyContent: "center", textAlign: "center", fontSize: 11 }}>
                          View Product
                        </a>
                        <button className="fav-remove-btn" onClick={() => handleUnfavorite(item)} disabled={isRemoving}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          {isRemoving ? "…" : "Remove"}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              )
            })}
          </div>
        )}

        {/* Footer summary */}
        {items.length > 0 && (
          <div className="fav-footer">
            <a href="/shop" style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: t.accent, textDecoration: "none" }}>← Back to Products</a>
            <div className="fav-footer-right">
              <div className="fav-total-label">
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 12, color: t.subtle, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {items.length} {items.length === 1 ? "item" : "items"} · Estimated Total
                </p>
                <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 24, fontWeight: 700, color: t.heading, margin: 0 }}>
                  ${orderTotal.toFixed(2)}
                </p>
              </div>
              <button className={t.btnPrimary} onClick={handleAddAllToCart} disabled={addingAll} style={{ opacity: addingAll ? 0.6 : 1 }}>
                {addingAll ? "Adding…" : "Add All to Cart"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default forwardRef<HTMLElement, FavoritesGridProps>(FavoritesGrid)
