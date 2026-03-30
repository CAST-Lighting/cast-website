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
  const [items, setItems] = useState<FavoriteItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/account/favorites")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load favorites")
        return r.json() as Promise<FavoriteItem[]>
      })
      .then((data) => {
        setItems(data)
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
        .fav-ms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) { .fav-ms-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .fav-ms-grid { grid-template-columns: 1fr; } }
        .fav-ms-card {
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
        }
        .fav-ms-card:hover {
          border-color: rgba(0,124,176,0.45);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
      `}</style>

      <div className="site-container">
        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "'Essonnes', 'Playfair Display', serif",
              fontSize: "var(--h2-size)",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}
          >
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
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16 }}>{error}</p>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 20, opacity: 0.3 }}>♡</div>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", margin: "0 0 24px" }}>
              {emptyMessage}
            </p>
            <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: "none" }}>
              Browse Products →
            </a>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="fav-ms-grid">
            {items.map((item) => (
              <div key={item.id} className="fav-ms-card">
                <a href={item.href} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      aspectRatio: "1/1",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, #1a2e3a, #0d3a4a)",
                      position: "relative",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image.url}
                        alt={item.image.alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#7EBEE8" strokeWidth="1.5" />
                          <circle cx="8.5" cy="8.5" r="1.5" stroke="#7EBEE8" strokeWidth="1.5" />
                          <path d="M21 15l-5-5L5 21" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </a>

                <div style={{ padding: "20px" }}>
                  <a href={item.href} style={{ textDecoration: "none" }}>
                    <h3
                      style={{
                        fontFamily: "'Essonnes', 'Playfair Display', serif",
                        fontSize: "var(--h4-size)",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.3,
                        margin: "0 0 8px",
                      }}
                    >
                      {item.name}
                    </h3>
                  </a>
                  {item.price && (
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#7EBEE8", margin: "0 0 16px" }}>
                      {item.price}
                    </p>
                  )}
                  <a href={item.href} className="sg-btn-solid-dark-sm" style={{ textDecoration: "none", display: "inline-block" }}>
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default forwardRef<HTMLElement, FavoritesGridProps>(FavoritesGrid)
