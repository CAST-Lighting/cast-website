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
  products?: Product[]
  bgColor?: string
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

const CATEGORIES = ["All", "Path & Area Lights", "Accent & Spot Lights", "Transformers & Power Supply"]
const PRICE_RANGES = ["$0 – $100", "$101 – $500", "$501 – $1,000", "$1,000+"]

const ProductCard = ({ product }: { product: Product }) => (
  <div style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column" }}>
    {/* Image placeholder */}
    <div style={{ aspectRatio: "4/3", background: "#f1f3f5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      {product.image
        ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
      }
      {product.badge && (
        <span style={{ position: "absolute", top: 10, left: 10, background: "var(--color-primary)", color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 8px", borderRadius: 3 }}>
          {product.badge}
        </span>
      )}
    </div>
    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--color-title)", margin: 0, lineHeight: 1.3 }}>{product.name}</p>
      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, fontWeight: 700, color: "var(--color-primary)", margin: 0 }}>{product.price}</p>
      <a href={product.href || "#"} className="sg-btn-solid-sm" style={{ marginTop: "auto", textAlign: "center", textDecoration: "none" }}>View Product</a>
    </div>
  </div>
)

const ShopGrid = forwardRef(function ShopGrid(
  { className, sectionStyle, products, bgColor }: ShopGridProps,
  ref: Ref<HTMLDivElement>
) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")

  const list = products && products.length > 0 ? products : DEFAULT_PRODUCTS
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

  return (
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#f6f7f8" }}
    >
      <style>{`
        .sg-sidebar {
          width: 220px;
          flex-shrink: 0;
          background: #fff;
          border: 1px solid #e9ecef;
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
          border: 1.5px solid #dee2e6; border-radius: 4px;
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

      <div className="site-container" style={{ paddingTop: 48, paddingBottom: 72 }}>
        <div className="sg-layout" style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>

          {/* Sidebar */}
          <aside className="sg-sidebar">
            <h2 style={{ fontFamily: "'Barlow', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--color-title)", margin: "0 0 20px" }}>Filters</h2>

            <div className="sg-filter-section">
              <p className="sg-filter-label">Quick Search</p>
              <input className="sg-search-input" type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="sg-filter-section">
              <p className="sg-filter-label">Categories</p>
              {CATEGORIES.map(cat => (
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
                  <h2 className="sg-section-title">{cat}</h2>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                    <select style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, border: "1px solid #dee2e6", borderRadius: 4, padding: "6px 12px", color: "var(--color-title)", background: "#fff" }}>
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
  )
})

export default ShopGrid
