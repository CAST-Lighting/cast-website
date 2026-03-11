"use client"

import { forwardRef, useState, type Ref } from "react"

interface ProductHeroProps {
  className?: string
  productName?: string
  modelNumber?: string
  rating?: number
  reviewCount?: number
  shortDescription?: string
  price?: string
  inStock?: boolean
  images?: Array<{ src?: string; alt?: string }>
  tradeProOnly?: boolean
  bgColor?: string
}

const Stars = ({ count = 4.7, total = 5 }: { count?: number; total?: number }) => (
  <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(count) ? "#f59e0b" : "#e5e7eb"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const ImagePlaceholder = () => (
  <div style={{ width: "100%", aspectRatio: "1", background: "#f1f3f5", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
  </div>
)

const ProductHero = forwardRef(function ProductHero(
  {
    className,
    productName = "Classic Brass Path Light 5.5W",
    modelNumber = "BPL-55-BR",
    rating = 4.7,
    reviewCount = 520,
    shortDescription = "A short product description goes here that is no more than 160 characters to ensure SEO compliance and clarity for the customer.",
    price = "$89.99",
    inStock = true,
    images,
    tradeProOnly = false,
    bgColor,
  }: ProductHeroProps,
  ref: Ref<HTMLDivElement>
) {
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const imgList = images && images.length > 0 ? images : [{}, {}, {}, {}]

  return (
    <div
      ref={ref}
      className={className || ""}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#ffffff" }}
    >
      <style>{`
        .ph-thumb {
          width: 72px; height: 72px; border-radius: 4px; border: 2px solid transparent;
          background: #f1f3f5; cursor: pointer; overflow: hidden; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 200ms;
        }
        .ph-thumb.active { border-color: var(--color-primary); }
        .ph-thumb:hover { border-color: var(--color-accent); }
        .ph-qty { display: flex; align-items: center; border: 1.5px solid #dee2e6; border-radius: 4px; overflow: hidden; width: fit-content; }
        .ph-qty button { width: 36px; height: 36px; border: none; background: #f8f9fa; cursor: pointer; font-size: 18px; color: var(--color-primary); display: flex; align-items: center; justify-content: center; transition: background 200ms; }
        .ph-qty button:hover { background: #e9ecef; }
        .ph-qty input { width: 48px; border: none; text-align: center; font-family: 'Barlow', sans-serif; font-size: 16px; font-weight: 600; color: var(--color-title); outline: none; }
        .ph-tradepro-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(0,73,96,0.08); color: var(--color-primary); font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 3px; }
        @media (max-width: 900px) { .ph-layout { flex-direction: column !important; } .ph-gallery { max-width: 100% !important; } }
      `}</style>

      <div className="site-container" style={{ paddingTop: 48, paddingBottom: 64 }}>
        <div className="ph-layout" style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>

          {/* Left: Image gallery — sticky scroll */}
          <div className="ph-gallery" style={{ flex: "0 0 480px", maxWidth: 480, position: "sticky", top: 100 }}>
            <div style={{ marginBottom: 12 }}>
              {imgList[activeImg]?.src
                ? <img src={imgList[activeImg].src} alt={imgList[activeImg].alt || productName} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8 }} />
                : <ImagePlaceholder />
              }
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {imgList.map((img, i) => (
                <button key={i} className={`ph-thumb${activeImg === i ? " active" : ""}`} onClick={() => setActiveImg(i)} aria-label={`Image ${i + 1}`}>
                  {img?.src
                    ? <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", margin: "0 0 8px" }}>Model #: {modelNumber}</p>
            <h1 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Barlow', sans-serif", color: "var(--color-title)", margin: "0 0 12px" }}>
              {productName}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Stars count={rating} />
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-accent)", fontWeight: 600 }}>{rating} · {reviewCount} Ratings</span>
            </div>

            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "var(--color-content)", lineHeight: 1.6, margin: "0 0 20px" }}>{shortDescription}</p>

            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 32, fontWeight: 700, color: "var(--color-title)" }}>{price}</span>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: inStock ? "#10b981" : "#ef4444" }}>
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div style={{ height: 1, background: "#e9ecef", margin: "20px 0" }} />

            {/* QTY */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--color-title)", width: 36 }}>QTY</span>
              <div className="ph-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <input type="number" value={qty} min={1} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="sg-btn-solid-lg" style={{ justifyContent: "center", width: "100%" }}>Add To Cart</button>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="sg-btn-outline-md" style={{ flex: 1, justifyContent: "center" }}>
                  Add To Quote
                  {tradeProOnly && <span className="ph-tradepro-badge" style={{ marginLeft: 8 }}>TradePro Only</span>}
                </button>
                <button style={{ width: 44, height: 44, border: "2px solid #dee2e6", borderRadius: 4, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 200ms" }} aria-label="Add to wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-content)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                </button>
              </div>
            </div>

            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "var(--color-content)", marginTop: 16 }}>
              Already a customer? <a href="#" style={{ color: "var(--color-accent)" }}>Please login here</a> to favorite, save, or view order history for later reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProductHero
