"use client"

import { forwardRef, useState, useEffect, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"

interface ProductHeroProps {
  className?: string
  lightMode?: boolean
  // 🎨 Background
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  // 🛒 Commerce
  tradeProOnly?: boolean
  hidePrice?: boolean
  // ⚠️ Override — only used when BC data is unavailable (editor preview)
  productName?: string
  modelNumber?: string
  rating?: number
  reviewCount?: number
  shortDescription?: string
  price?: string
  inStock?: boolean
}

const Stars = ({ count = 4.7 }: { count?: number }) => (
  <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(count) ? "#f59e0b" : "#e5e7eb"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

const ImagePlaceholder = ({ lightMode }: { lightMode: boolean }) => (
  <div style={{ width: "100%", aspectRatio: "1", background: lightMode ? "rgba(0,73,96,0.06)" : "rgba(255,255,255,0.06)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
  </div>
)

const SAMPLE_BODY = "<p>Product description will appear here from your BigCommerce catalog. This includes full HTML formatting — paragraphs, bullet points, bold text, headings, and more.</p><ul><li>Solid brass construction — will never rust, corrode, or fade</li><li>5.5W LED module — 400 lumen output, 2700K warm white</li><li>IP67 waterproof rating — suitable for all weather conditions</li><li>Compatible with all CAST 12V transformers</li></ul>"

const ProductHero = forwardRef(function ProductHero(
  {
    className,
    lightMode = false,
    bgColor = "#25262d",
    bgImage,
    bgOpacity = 100,
    gradientFrom,
    gradientTo,
    gradientDirection = "to bottom",
    tradeProOnly = false,
    hidePrice = false,
    productName = "Classic Brass Path Light 5.5W",
    modelNumber = "BPL-55-BR",
    rating = 4.7,
    reviewCount = 520,
    shortDescription = "A short product description goes here that is no more than 160 characters to ensure SEO compliance and clarity for the customer.",
    price = "$89.99",
    inStock = true,
  }: ProductHeroProps,
  ref: Ref<HTMLDivElement>
) {
  const cms = useCmsData()
  const m = cms?.type === "product" ? cms.meta : null

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [isTradeProUser, setIsTradeProUser] = useState(true)

  useEffect(() => {
    setIsTradeProUser(true)
  }, [])

  // Live: BC data only. Editor (no m): use prop defaults as sample display.
  const name         = m ? (cms?.heading ?? "—")          : productName
  const model        = m ? (m.modelNumber ?? "—")          : modelNumber
  const ratingVal    = m ? (m.rating ?? 0)                 : rating
  const reviewVal    = m ? (m.reviewCount ?? 0)            : reviewCount
  const shortDesc    = m ? (m.shortDescription ?? "")      : shortDescription
  const priceVal     = m ? (m.price ?? "")                 : price
  const stockVal     = m ? (m.inStock ?? true)             : inStock
  const bodyHtml     = m ? (m.bodyHtml ?? "")              : SAMPLE_BODY
  const imgList: Array<{ src?: string; alt?: string }> =
    m?.images && m.images.length > 0
      ? m.images.map((img) => ({ src: img.src, alt: img.alt }))
      : [{}, {}, {}, {}]

  // Background
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = bgOpacity / 100
  const sectionBg = hasGradient
    ? `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`
    : bgColor

  // Theme colors
  const headingColor = lightMode ? '#014960' : '#ffffff'
  const bodyColor    = lightMode ? '#1a3a4a' : 'rgba(255,255,255,0.78)'
  const accentColor  = lightMode ? '#007CB0' : '#7EBEE8'
  const mutedColor   = lightMode ? '#1a3a4a' : 'rgba(255,255,255,0.65)'
  const dividerColor = lightMode ? 'rgba(0,73,96,0.15)' : 'rgba(255,255,255,0.1)'
  const thumbBg      = lightMode ? 'rgba(0,73,96,0.06)' : 'rgba(255,255,255,0.06)'
  const qtyBorder    = lightMode ? 'rgba(0,73,96,0.2)' : 'rgba(255,255,255,0.2)'
  const wishlistBg   = lightMode ? 'rgba(0,73,96,0.06)' : 'rgba(255,255,255,0.06)'
  const wishlistBorder = lightMode ? 'rgba(0,73,96,0.2)' : 'rgba(255,255,255,0.2)'

  // Downgrade headings in BC HTML to preserve SEO hierarchy (H1 = product name)
  const isHtml = bodyHtml.includes("<")
  const processedBody = isHtml
    ? bodyHtml
        .replace(/<h1(\s[^>]*)?>/gi, "<h3$1>").replace(/<\/h1>/gi, "</h3>")
        .replace(/<h2(\s[^>]*)?>/gi, "<h3$1>").replace(/<\/h2>/gi, "</h3>")
    : bodyHtml

  return (
    <div
      ref={ref}
      className={className ?? ""}
      style={{
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        ...(!bgImage ? { background: sectionBg } : {})
      }}
    >
      {bgImage && <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />}
      {bgImage && <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBg, opacity: overlayOpacity }} />}

      <style>{`
        .ph-thumb {
          width: 72px; height: 72px; border-radius: 4px; border: 2px solid transparent;
          background: ${thumbBg}; cursor: pointer; overflow: hidden; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 200ms ease;
        }
        .ph-thumb.active { border-color: #007CB0; }
        .ph-thumb:hover { border-color: #7EBEE8; }
        .ph-qty { display: flex; align-items: center; border: 2px solid ${qtyBorder}; border-radius: 4px; overflow: hidden; width: fit-content; background: ${lightMode ? '#fff' : 'rgba(255,255,255,0.06)'}; }
        .ph-qty button { width: 38px; height: 38px; border: none; background: transparent; cursor: pointer; font-size: 20px; color: #007CB0; display: flex; align-items: center; justify-content: center; transition: background 200ms ease; }
        .ph-qty button:hover { background: ${lightMode ? '#f0f8ff' : 'rgba(255,255,255,0.08)'}; }
        .ph-qty input { width: 48px; border: none; text-align: center; font-family: 'Barlow', sans-serif; font-size: 16px; font-weight: 700; color: ${lightMode ? '#25262d' : '#ffffff'}; outline: none; background: transparent; }
        .ph-tradepro-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(0,73,96,0.08); color: #007CB0; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 3px; }
        .ph-body-html a { color: #7EBEE8; text-decoration: underline; text-underline-offset: 2px; }
        .ph-body-html a:hover { color: #007CB0; }
        .ph-body-html p { margin: 0 0 16px; }
        .ph-body-html ul { padding-left: 24px !important; margin: 0 0 16px !important; list-style: disc outside !important; }
        .ph-body-html ol { padding-left: 24px !important; margin: 0 0 16px !important; list-style: decimal outside !important; }
        .ph-body-html li { margin-bottom: 6px !important; display: list-item !important; list-style: inherit !important; }
        .ph-body-html ul ul { list-style: circle outside !important; margin: 4px 0 4px !important; }
        .ph-body-html strong, .ph-body-html b { color: ${headingColor}; font-weight: 600; }
        .ph-body-html h3 { font-family: 'Essonnes', 'Playfair Display', serif; font-size: var(--h3-size); color: ${headingColor}; margin: 24px 0 10px; }
        .ph-body-html h4 { font-family: 'Essonnes', 'Playfair Display', serif; font-size: var(--h4-size); color: ${headingColor}; margin: 20px 0 8px; }
        @media (max-width: 1279px) {
          .ph-gallery { flex: 0 0 400px !important; max-width: 400px !important; }
        }
        @media (max-width: 900px) {
          .ph-layout { flex-direction: column !important; }
          .ph-gallery { max-width: 100% !important; flex: unset !important; position: relative !important; top: auto !important; align-self: stretch !important; }
        }
      `}</style>

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div className="ph-layout" style={{ display: "flex", gap: 56, alignItems: "flex-start" }}>

            {/* Left: sticky image gallery */}
            <div className="ph-gallery" style={{ flex: "0 0 540px", maxWidth: 540, position: "sticky", top: 120, alignSelf: "flex-start", display: "flex", gap: 12 }}>
              {/* Vertical thumbnails */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
                {imgList.map((img, i) => (
                  <button key={i} className={`ph-thumb${activeImg === i ? " active" : ""}`} onClick={() => setActiveImg(i)} aria-label={`Image ${i + 1}`}>
                    {img?.src
                      ? <img src={img.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /></svg>
                    }
                  </button>
                ))}
              </div>
              {/* Main image */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {imgList[activeImg]?.src
                  ? <img src={imgList[activeImg].src} alt={imgList[activeImg].alt ?? name} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 8 }} />
                  : <ImagePlaceholder lightMode={lightMode} />
                }
              </div>
            </div>

            {/* Right: product info + description */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Name */}
              <h1 style={{ fontSize: "var(--h1-size)", fontWeight: 700, lineHeight: 1.1, fontFamily: "'Essonnes', 'Playfair Display', serif", color: headingColor, margin: "0 0 8px" }}>
                {name}
              </h1>

              {/* Model # */}
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: headingColor, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 12px" }}>
                Model #: {model}
              </p>

              {/* Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Stars count={ratingVal} />
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: accentColor, fontWeight: 600 }}>
                  {ratingVal === 0 || reviewVal === 0 ? "Be the first to review" : `${ratingVal} · ${reviewVal} Ratings`}
                </span>
              </div>

              {/* Short description */}
              {shortDesc && (
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: bodyColor, lineHeight: 1.6, margin: "0 0 28px" }}>
                  {shortDesc}
                </p>
              )}

              {/* Price + stock */}
              {!hidePrice && (
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 32, fontWeight: 700, color: headingColor }}>{priceVal}</span>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: stockVal ? "#10b981" : "#ef4444" }}>
                    {stockVal ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              )}

              <div style={{ height: 1, background: dividerColor, margin: "20px 0" }} />

              {/* QTY */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: headingColor, width: 36 }}>QTY</span>
                <div className="ph-qty">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <input type="number" value={qty} min={1} onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button
                    className={lightMode ? "sg-btn-solid-md" : "sg-btn-solid-dark-md"}
                    style={{ justifyContent: "center", ...(!stockVal ? { opacity: 0.5, pointerEvents: "none" as const } : {}) }}
                  >
                    {stockVal ? "Add To Cart" : "Out of Stock"}
                  </button>
                  {isTradeProUser && (
                    <button
                      style={{ width: 48, height: 48, border: `2px solid ${wishlistBorder}`, borderRadius: 4, background: wishlistBg, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 200ms ease" }}
                      aria-label="Add to wishlist"
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#7EBEE8" }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = wishlistBorder }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={headingColor} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    </button>
                  )}
                  {tradeProOnly && <span className="ph-tradepro-badge">TradePro Only</span>}
                </div>
                {isTradeProUser && (
                  <button
                    className={lightMode ? "sg-btn-outline-md" : "sg-btn-outline-dark-md"}
                    style={{ justifyContent: "center", ...(!stockVal ? { opacity: 0.5, pointerEvents: "none" as const } : {}) }}
                  >
                    Add To Quote
                  </button>
                )}
              </div>

              {/* Login prompt */}
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: mutedColor, marginTop: 16 }}>
                Already a customer?{" "}
                <a href="#" style={{ color: "#7EBEE8" }}>Please login here</a>{" "}
                to favorite, save, or view order history for later reference.
              </p>

              <div style={{ height: 1, background: dividerColor, margin: "24px 0" }} />

              {/* Product Description */}
              <h2 style={{ fontSize: "var(--h2-size)", fontWeight: 700, lineHeight: 1.1, fontFamily: "'Essonnes', 'Playfair Display', serif", color: headingColor, marginTop: 32, marginBottom: 24 }}>
                Product Description
              </h2>

              {isHtml ? (
                <div
                  className="ph-body-html"
                  style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: bodyColor, lineHeight: 1.7, maxWidth: 640 }}
                  dangerouslySetInnerHTML={{ __html: processedBody }}
                />
              ) : (
                processedBody.split("\n\n").map((para, i) => (
                  <p key={i} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: bodyColor, lineHeight: 1.7, margin: "0 0 18px", maxWidth: 640 }}>{para}</p>
                ))
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProductHero
