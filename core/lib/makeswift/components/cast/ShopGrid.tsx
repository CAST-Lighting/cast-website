"use client"

import { forwardRef, useState, type Ref } from "react"

interface Product {
  image?: string
  name?: string
  price?: string
  badge?: string
  href?: string
  category?: string
}

interface ShopGridProps {
  className?: string
  sectionStyle?: string
  heading?: string
  headingAccent?: string
  products?: Product[]
  bgColor?: string
  bgImage?: string
  bgOpacity?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  paddingTop?: number
  paddingBottom?: number
}

const DEFAULT_PRODUCTS: Product[] = [
  // Path & Area
  { category: "Path & Area Lights", name: "Classic Brass Path Light 5.5W", price: "$89.99", badge: "Best Seller", href: "/individual-product" },
  { category: "Path & Area Lights", name: "Copper Hat Path Light 8W", price: "$109.99", href: "/individual-product" },
  { category: "Path & Area Lights", name: "Mission Style Path Light 5W", price: "$79.99", badge: "Made in USA", href: "/individual-product" },
  { category: "Path & Area Lights", name: "Brass Bollard Path Light 10W", price: "$129.99", href: "/individual-product" },
  { category: "Path & Area Lights", name: "Low Profile Area Light 8W", price: "$99.99", href: "/individual-product" },
  { category: "Path & Area Lights", name: "Traditional Lantern Path Light", price: "$119.99", badge: "New", href: "/individual-product" },
  // Accent & Spot
  { category: "Accent & Spot Lights", name: "Brass Bullet Spot Light 8W", price: "$99.99", badge: "Best Seller", href: "/individual-product" },
  { category: "Accent & Spot Lights", name: "Copper Directional Flood 12W", price: "$129.99", href: "/individual-product" },
  { category: "Accent & Spot Lights", name: "Mini Adjustable Spot Light 5W", price: "$79.99", href: "/individual-product" },
  { category: "Accent & Spot Lights", name: "Wide Flood Accent Light 15W", price: "$149.99", href: "/individual-product" },
  { category: "Accent & Spot Lights", name: "Brass Spike Spot Light 8W", price: "$109.99", badge: "Made in USA", href: "/individual-product" },
  { category: "Accent & Spot Lights", name: "Swivel Knuckle Spot 10W", price: "$119.99", href: "/individual-product" },
  // Transformers
  { category: "Transformers & Power Supply", name: "150W Digital Transformer", price: "$199.99", badge: "Best Seller", href: "/individual-product" },
  { category: "Transformers & Power Supply", name: "300W Smart Transformer", price: "$299.99", href: "/individual-product" },
  { category: "Transformers & Power Supply", name: "600W Commercial Transformer", price: "$449.99", badge: "Pro", href: "/individual-product" },
]

const PRICE_RANGES = ["$0 – $100", "$101 – $500", "$501 – $1,000", "$1,000+"]

const ProductCard = ({ product }: { product: Product }) => (
  <div style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color 200ms, box-shadow 200ms" }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,124,176,0.4)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)"; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
  >
    {/* Image / placeholder */}
    <div style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
      {product.image ? (
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{
          width: "100%", height: "100%",
          background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          {/* Decorative grid pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(175,229,253,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(175,229,253,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          {/* CAST brass accent icon */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5, position: "relative", zIndex: 1 }}>
            <circle cx="12" cy="12" r="10" stroke="#007CB0" strokeWidth="1.5" />
            <path d="M8 12h8M12 8v8" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {product.category && (
            <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,124,176,0.7)", position: "relative", zIndex: 1, textAlign: "center", maxWidth: 120 }}>
              {product.category}
            </span>
          )}
        </div>
      )}
      {/* Badges */}
      <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 4 }}>
        {product.badge && (
          <span style={{ background: "var(--color-accent, #007CB0)", color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 4, display: "inline-block" }}>
            {product.badge}
          </span>
        )}
      </div>
    </div>
    <div style={{ padding: "18px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
      {product.category && (
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent, #007CB0)", margin: 0 }}>
          {product.category}
        </p>
      )}
      <h3 className="heading-card-sm" style={{ margin: 0 }}>{product.name}</h3>
      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>{product.price}</p>
      <a
        href={product.href || "#"}
        className="sg-btn-solid-md"
        style={{ marginTop: "auto", textAlign: "center", textDecoration: "none", justifyContent: "center" }}
      >
        View Product →
      </a>
    </div>
  </div>
)

const ShopGrid = forwardRef(function ShopGrid(
  { className, sectionStyle, heading, headingAccent = "", products, bgColor, bgImage, bgOpacity, gradientFrom, gradientTo, gradientDirection, paddingTop, paddingBottom }: ShopGridProps,
  ref: Ref<HTMLDivElement>
) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const list = products && products.length > 0 ? products : DEFAULT_PRODUCTS
  const categories = ["All", ...Array.from(new Set(list.map(p => p.category).filter((c): c is string => !!c)))]
  const filtered = list.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory
    const matchSearch = !search || (p.name || "").toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const grouped: Record<string, Product[]> = {}
  filtered.forEach(p => {
    const cat = p.category || "Products"
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(p)
  })

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || "#25262d"

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ position: "relative", width: "100%", boxSizing: "border-box", ...(!bgImage ? { background: sectionBackground } : {}), paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 }}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImage && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
      )}
      <style>{`
        .sg-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 24px;
          align-self: flex-start;
          position: sticky;
          top: 100px;
        }
        .sg-filter-label {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-content);
          margin: 0 0 10px;
        }
        .sg-filter-section { margin-bottom: 24px; }
        .sg-filter-section:last-child { margin-bottom: 0; }
        .sg-filter-item {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Barlow', sans-serif; font-size: 14px; color: var(--color-content);
          padding: 4px 0; cursor: pointer;
        }
        .sg-filter-item input { cursor: pointer; accent-color: var(--color-primary); }
        .sg-search-input {
          width: 100%; box-sizing: border-box;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
          padding: 8px 12px; font-family: 'Barlow', sans-serif; font-size: 14px;
          outline: none; color: var(--color-title);
          transition: border-color 200ms;
        }
        .sg-search-input:focus { border-color: var(--color-accent); }
        .sg-section-heading {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--color-content); margin: 0 0 6px;
        }
        .sg-section-title {
          font-size: var(--h3-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          font-family: 'Essonnes', 'Playfair Display', serif;
          color: var(--color-title); margin: 0 0 20px;
        }
        .sg-product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 1100px) { .sg-product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 900px) { .sg-sidebar { width: 100%; position: static; } .sg-layout { flex-direction: column !important; } }
        @media (max-width: 575px) { .sg-product-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="relative" style={{ zIndex: 10 }}>
      <div className="site-container">
        {heading && (
          <h2 style={{ fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", margin: "0 0 32px" }}>
            {heading}{headingAccent && <> <span className="text-gradient-warm">{headingAccent}</span></>}
          </h2>
        )}
        <div className="sg-layout" style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

          {/* Sidebar */}
          <aside className="sg-sidebar">
            <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: "var(--color-title)", margin: "0 0 20px" }}>Filters</h2>

            <div className="sg-filter-section">
              <p className="sg-filter-label">Quick Search</p>
              <input className="sg-search-input" type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="sg-filter-section">
              <p className="sg-filter-label">Categories</p>
              {categories.map(cat => (
                <label key={cat} className="sg-filter-item">
                  <input type="radio" name="category" checked={activeCategory === cat} onChange={() => setActiveCategory(cat)} />
                  {cat}
                </label>
              ))}
            </div>

            <div className="sg-filter-section">
              <p className="sg-filter-label">Selections</p>
              {["Made In USA", "Lighting Kits", "Accessories"].map(s => (
                <label key={s} className="sg-filter-item">
                  <input type="checkbox" />
                  {s}
                </label>
              ))}
            </div>

            <div className="sg-filter-section">
              <p className="sg-filter-label">Pricing (non-gated)</p>
              {PRICE_RANGES.map(r => (
                <label key={r} className="sg-filter-item">
                  <input type="checkbox" />
                  {r}
                </label>
              ))}
            </div>

            <button className="sg-btn-solid-md" style={{ width: "100%", marginTop: 8, justifyContent: "center" }}>
              Apply Filters
            </button>
          </aside>

          {/* Product sections */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {Object.keys(grouped).length === 0 ? (
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "var(--color-content)" }}>No products found.</p>
            ) : (
              Object.entries(grouped).map(([cat, prods]) => (
                <div key={cat} style={{ marginBottom: 56 }}>
                  <p className="sg-section-heading">Shop Lighting</p>
                  <h3 className="sg-section-title">{cat}</h3>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                    <select style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, padding: "6px 12px", color: "var(--color-title)", background: "#2d353c" }}>
                      <option>Sort Products</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Best Sellers</option>
                    </select>
                  </div>
                  <div className="sg-product-grid">
                    {prods.map((p, i) => <ProductCard key={i} product={p} />)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
})

export default ShopGrid
