"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"

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
  paddingTop?: number
  paddingBottom?: number
  heading?: string
  emptyMessage?: string
}

// Parse "Product Name (MODELNUM)" → { name, model }
function parseNameAndModel(fullName: string): { name: string; model: string } {
  const match = fullName.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (match) return { name: match[1].trim(), model: match[2].trim() }
  return { name: fullName, model: "" }
}

function FavoritesGrid(
  {
    className,
    bgColor = "#0f1923",
    paddingTop = 64,
    paddingBottom = 64,
    heading = "My Favorites",
    emptyMessage = "Your favorites list is empty.",
  }: FavoritesGridProps,
  ref: Ref<HTMLElement>,
) {
  const DEMO: FavoriteItem[] = [
    { id: 1, productId: 119, name: "Classic Brass Path Light 5.5W (CBP55)",            price: "$89.99",  image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/119/738/caledbt_color-wheel-960x960-3092282884__17955.1762461221.jpg", alt: "Classic Brass Path Light" },  href: "/shop-all/classic-brass-path-light/" },
    { id: 2, productId: 266, name: "CAST Stainless Thumb Screw (XCHS83250)",           price: "$6.48",   image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/266/506/xchs83250-parts-960x960-2245893803__53926.1759240869.jpg", alt: "Stainless Thumb Screw" },     href: "/shop-all/stainless-screw/" },
    { id: 3, productId: 116, name: "CAST Integrated LED 12.5W Bullet Spot (SSPK12)",   price: "$228.00", image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/116/700/sspk12_1-960x960-52278476__36183.1762461221.jpg", alt: "LED Bullet Spot Light" },            href: "/shop-all/integrated-led-12-5-watt-bullet-spot-light-sspk12/" },
    { id: 4, productId: 226, name: "Path Light Set-In-Stake Telescopic Stem (PLTS24)", price: "$72.51",  image: null,                                                                                                                                                                                  href: "/shop-all/path-light-stem/" },
  ]

  const [items, setItems]       = useState<FavoriteItem[]>(DEMO)
  const [qtys, setQtys]         = useState<Record<number, number>>(() => Object.fromEntries(DEMO.map(i => [i.id, 1])))
  const [removing, setRemoving] = useState<number | null>(null)
  const [addingAll, setAddingAll] = useState(false)

  useEffect(() => {
    // TODO: fetch("/api/account/favorites").then(...)
  }, [])

  const setQty = (id: number, val: number) =>
    setQtys(prev => ({ ...prev, [id]: Math.max(1, val) }))

  const handleUnfavorite = async (item: FavoriteItem) => {
    setRemoving(item.id)
    // TODO: DELETE /api/account/favorites/:productId
    setItems(prev => prev.filter(i => i.id !== item.id))
    setRemoving(null)
  }

  const handleAddToCart = async (item: FavoriteItem) => {
    // TODO: POST /api/cart/add { productId: item.productId, quantity: qtys[item.id] }
    console.log("Add to cart", item.productId, "qty", qtys[item.id])
  }

  const handleAddAllToCart = async () => {
    setAddingAll(true)
    // TODO: batch add all items
    for (const item of items) {
      await handleAddToCart(item)
    }
    setAddingAll(false)
  }

  return (
    <div
      ref={ref as Ref<HTMLDivElement>}
      className={className}
      style={{ background: bgColor, paddingTop, paddingBottom, fontFamily: "'Barlow', sans-serif" }}
    >
      <style>{`
        .fav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1200px) { .fav-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .fav-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .fav-grid { grid-template-columns: 1fr; } }

        .fav-card {
          background: #1e2a33;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
        }
        .fav-card:hover {
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }

        .fav-qty {
          display: flex;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
          width: fit-content;
        }
        .fav-qty button {
          width: 28px; height: 28px;
          border: none; background: transparent;
          color: #7EBEE8; cursor: pointer; font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          transition: background 150ms;
        }
        .fav-qty button:hover { background: rgba(0,124,176,0.15); }
        .fav-qty input {
          width: 36px; border: none; background: transparent;
          text-align: center; font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 700; color: #fff; outline: none;
        }
        /* hide number input arrows */
        .fav-qty input::-webkit-outer-spin-button,
        .fav-qty input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .fav-qty input[type=number] { -moz-appearance: textfield; }

        .fav-unfav-btn {
          display: inline-flex; align-items: center; gap: 4px;
          background: none; border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px; color: rgba(255,255,255,0.4);
          font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 600;
          padding: 5px 9px; cursor: pointer;
          transition: border-color 150ms, color 150ms;
          white-space: nowrap;
        }
        .fav-unfav-btn:hover { border-color: #ef4444; color: #ef4444; }
        .fav-unfav-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        @keyframes fav-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="site-container">

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#fff", margin: 0 }}>
            {heading}
          </h2>
          {items.length > 0 && (
            <button
              className="sg-btn-solid-md"
              onClick={handleAddAllToCart}
              disabled={addingAll}
              style={{ opacity: addingAll ? 0.6 : 1 }}
            >
              {addingAll ? "Adding…" : `Add All to Cart (${items.length})`}
            </button>
          )}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.25 }}>♡</div>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>{emptyMessage}</p>
            <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: "none" }}>Browse Products →</a>
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

                  {/* Image */}
                  <a href={item.href} style={{ textDecoration: "none", display: "block", flexShrink: 0 }}>
                    <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "#fff" }}>
                      {item.image ? (
                        <img src={item.image.url} alt={item.image.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a2e3a" }}>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.2 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7EBEE8" strokeWidth="1.5" />
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="#7EBEE8" strokeWidth="1.5" />
                            <path d="M21 15l-5-5L5 21" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </a>

                  {/* Info */}
                  <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", flex: 1, gap: 6 }}>

                    {/* Name */}
                    <a href={item.href} style={{ textDecoration: "none" }}>
                      <h3 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.35, margin: 0 }}>
                        {name}
                      </h3>
                    </a>

                    {/* Model # */}
                    {model && (
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, color: "#7EBEE8", letterSpacing: "0.05em", textTransform: "uppercase", margin: 0 }}>
                        SKU: {model}
                      </p>
                    )}

                    {/* Price */}
                    {item.price && (
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#007CB0", margin: 0 }}>
                        {item.price}
                      </p>
                    )}

                    {/* QTY stepper */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Qty</span>
                      <div className="fav-qty">
                        <button onClick={() => setQty(item.id, qty - 1)} aria-label="Decrease quantity">−</button>
                        <input
                          type="number"
                          value={qty}
                          min={1}
                          onChange={e => setQty(item.id, parseInt(e.target.value) || 1)}
                          aria-label="Quantity"
                        />
                        <button onClick={() => setQty(item.id, qty + 1)} aria-label="Increase quantity">+</button>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: "auto", paddingTop: 8 }}>
                      <button
                        className="sg-btn-solid-dark-sm"
                        style={{ width: "100%", justifyContent: "center", fontSize: 12 }}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                      <div style={{ display: "flex", gap: 6 }}>
                        <a href={item.href} className="sg-btn-outline-dark-sm" style={{ textDecoration: "none", fontSize: 11, padding: "5px 10px", flex: 1, justifyContent: "center", textAlign: "center" }}>
                          View Product
                        </a>
                        <button
                          className="fav-unfav-btn"
                          onClick={() => handleUnfavorite(item)}
                          disabled={isRemoving}
                          aria-label={`Remove ${name} from favorites`}
                        >
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

        {/* Footer row */}
        {items.length > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, flexWrap: "wrap", gap: 12 }}>
            <a href="/shop" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "#7EBEE8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              ← Back to Products
            </a>
            <button
              className="sg-btn-solid-md"
              onClick={handleAddAllToCart}
              disabled={addingAll}
              style={{ opacity: addingAll ? 0.6 : 1 }}
            >
              {addingAll ? "Adding…" : `Add All to Cart (${items.length})`}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default forwardRef<HTMLElement, FavoritesGridProps>(FavoritesGrid)
