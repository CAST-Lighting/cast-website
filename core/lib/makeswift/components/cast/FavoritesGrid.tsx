"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"

interface FavoriteItem {
  id: number
  productId: number
  name: string
  modelNumber?: string
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

// Extract model number from name — BC format: "Product Name (MODELNUM)"
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
  const DEMO_FAVORITES: FavoriteItem[] = [
    { id: 1, productId: 119, name: "Classic Brass Path Light 5.5W (CBP55)", price: "$89.99", image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/119/738/caledbt_color-wheel-960x960-3092282884__17955.1762461221.jpg", alt: "Classic Brass Path Light" }, href: "/shop-all/classic-brass-path-light/" },
    { id: 2, productId: 266, name: "CAST Stainless Thumb Screw (XCHS83250)", price: "$6.48", image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/266/506/xchs83250-parts-960x960-2245893803__53926.1759240869.jpg", alt: "Stainless Thumb Screw" }, href: "/shop-all/stainless-screw/" },
    { id: 3, productId: 116, name: "CAST Integrated LED 12.5W Bullet Spot (SSPK12)", price: "$228.00", image: { url: "https://cdn11.bigcommerce.com/s-o3r3vyxngd/images/stencil/960w/products/116/700/sspk12_1-960x960-52278476__36183.1762461221.jpg", alt: "LED Bullet Spot Light" }, href: "/shop-all/integrated-led-12-5-watt-bullet-spot-light-sspk12/" },
    { id: 4, productId: 226, name: "Path Light Set-In-Stake Telescopic Stem (PLTS24)", price: "$72.51", image: null, href: "/shop-all/path-light-stem/" },
  ]

  const [items, setItems] = useState<FavoriteItem[]>(DEMO_FAVORITES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [removing, setRemoving] = useState<number | null>(null)

  useEffect(() => {
    // TODO: connect BC wishlists API
    // fetch("/api/account/favorites")
    //   .then(r => r.json())
    //   .then(data => { if (data?.length) setItems(data) })
    //   .catch(() => {})
  }, [])

  const handleUnfavorite = async (item: FavoriteItem) => {
    setRemoving(item.id)
    // TODO: call DELETE /api/account/favorites/:id
    // await fetch(`/api/account/favorites/${item.productId}`, { method: "DELETE" })
    setItems(prev => prev.filter(i => i.id !== item.id))
    setRemoving(null)
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
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
          display: flex;
          flex-direction: column;
        }
        .fav-card:hover {
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
        .fav-unfav-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          color: rgba(255,255,255,0.5);
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 10px;
          cursor: pointer;
          transition: border-color 200ms, color 200ms, opacity 200ms;
          white-space: nowrap;
        }
        .fav-unfav-btn:hover {
          border-color: #ef4444;
          color: #ef4444;
        }
        .fav-unfav-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div className="site-container">
        {/* Heading */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "#fff", margin: 0 }}>
            {heading}
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ display: "inline-block", width: 36, height: 36, border: "3px solid rgba(0,124,176,0.3)", borderTopColor: "#007CB0", borderRadius: "50%", animation: "fav-spin 0.8s linear infinite" }} />
            <style>{`@keyframes fav-spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.5)", fontSize: 16 }}>{error}</p>
        )}

        {/* Empty state */}
        {!loading && !error && items.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.25 }}>♡</div>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>{emptyMessage}</p>
            <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: "none" }}>Browse Products →</a>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && items.length > 0 && (
          <div className="fav-grid">
            {items.map((item) => {
              const { name, model } = parseNameAndModel(item.name)
              const isRemoving = removing === item.id
              return (
                <div key={item.id} className="fav-card" style={{ opacity: isRemoving ? 0.4 : 1, transition: "opacity 200ms" }}>

                  {/* Image */}
                  <a href={item.href} style={{ textDecoration: "none", display: "block", flexShrink: 0 }}>
                    <div style={{ aspectRatio: "1/1", overflow: "hidden", background: "#fff", position: "relative" }}>
                      {item.image ? (
                        <img src={item.image.url} alt={item.image.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a2e3a" }}>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7EBEE8" strokeWidth="1.5" />
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="#7EBEE8" strokeWidth="1.5" />
                            <path d="M21 15l-5-5L5 21" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </a>

                  {/* Info */}
                  <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <a href={item.href} style={{ textDecoration: "none" }}>
                      <h3 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.35, margin: "0 0 4px" }}>
                        {name}
                      </h3>
                    </a>

                    {/* Model # */}
                    {model && (
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, color: "#7EBEE8", letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 6px" }}>
                        #{model}
                      </p>
                    )}

                    {/* Price */}
                    {item.price && (
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#007CB0", margin: "0 0 12px" }}>
                        {item.price}
                      </p>
                    )}

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: "auto", flexWrap: "wrap" }}>
                      <a href={item.href} className="sg-btn-solid-dark-sm" style={{ textDecoration: "none", fontSize: 12, padding: "6px 12px" }}>
                        View Product
                      </a>
                      <button
                        className="fav-unfav-btn"
                        onClick={() => handleUnfavorite(item)}
                        disabled={isRemoving}
                        aria-label={`Remove ${name} from favorites`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {isRemoving ? "Removing…" : "Unfavorite"}
                      </button>
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

export default forwardRef<HTMLElement, FavoritesGridProps>(FavoritesGrid)
