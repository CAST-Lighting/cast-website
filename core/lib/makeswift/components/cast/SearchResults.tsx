"use client"

import { forwardRef, useState, useEffect, useCallback, type Ref } from "react"
import { Search, X, ArrowLeft, ArrowRight } from "lucide-react"

/* ── Dummy data for editor preview ── */
const DUMMY_PRODUCTS = [
  { id: "dp1", category: "Path Lights", name: "Classic Brass Path Light", price: "$189.00" },
  { id: "dp2", category: "Path Lights", name: "Low-Profile Copper Path Light", price: "$164.00" },
  { id: "dp3", category: "Spotlights", name: "Adjustable Brass Spotlight", price: "$212.00" },
  { id: "dp4", category: "Well Lights", name: "Brass In-Ground Well Light", price: "$248.00" },
  { id: "dp5", category: "Flood Lights", name: "Solid Brass Flood Light", price: "$179.00" },
  { id: "dp6", category: "Path Lights", name: "Victorian Brass Path Light", price: "$224.00" },
  { id: "dp7", category: "Deck Lights", name: "Copper Step & Deck Light", price: "$142.00" },
  { id: "dp8", category: "Spotlights", name: "Compact Brass MR16 Spot", price: "$195.00" },
]

const DUMMY_DOCS = [
  { id: "dd1", type: "Installation Guide", title: "Path Light Installation & Wiring Guide", excerpt: "Step-by-step instructions for in-ground path light installation, including wire depth, transformer load calculations, and fixture spacing." },
  { id: "dd2", type: "Spec Sheet", title: "Brass Path Light Series — Technical Specifications", excerpt: "Full spec data: lumen output, beam angles, IP ratings, material specs, and finish options for all path light SKUs." },
  { id: "dd3", type: "Warranty", title: "Lifetime Warranty Coverage — What's Included", excerpt: "CAST Lighting's lifetime warranty covers all solid brass and copper fixtures against defects in materials and workmanship." },
  { id: "dd4", type: "FAQ", title: "Choosing the Right Path Light for Your Project", excerpt: "Guidance on wattage selection, halogen vs. LED, fixture height, and spacing recommendations for residential and commercial installs." },
]

const DUMMY_BLOG_POSTS = [
  { id: "db1", date: "March 14, 2025", readTime: "6 min read", title: "Why Solid Brass Outlasts Composite in Landscape Lighting", excerpt: "After 20 years on the market, we've seen every material hold up — or not — in real installations. Here's what the data shows about brass longevity versus aluminum and composite alternatives." },
  { id: "db2", date: "January 28, 2025", readTime: "4 min read", title: "Path Light Spacing: The Contractor's Complete Guide", excerpt: "The most common mistake landscape contractors make is under-spacing path lights. We break down the math, the aesthetics, and the lumen output formulas that make every installation look intentional." },
]

interface Product {
  id: number
  name: string
  price: string
  salePrice?: string
  image?: string
  href: string
  brand?: string
  category?: string
}

interface SearchResultsProps {
  className?: string
  bgColor?: string
  heading?: string
  headingAccent?: string
  placeholder?: string
  emptyHeading?: string
  emptyBody?: string
  pageSize?: number
}

const SearchResults = forwardRef(function SearchResults(
  {
    className,
    bgColor,
    heading = "Search",
    headingAccent = "Results",
    placeholder = "Search products, guides, resources...",
    emptyHeading = "No results found",
    emptyBody = "Try a different search term or browse our product categories.",
    pageSize = 12,
  }: SearchResultsProps,
  ref: Ref<HTMLDivElement>
) {
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState("relevance")
  const [hasSearched, setHasSearched] = useState(false)

  // Read initial query from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get("q") || params.get("term") || ""
    if (q) {
      setQuery(q)
      setSubmittedQuery(q)
    }
  }, [])

  const fetchResults = useCallback(async (searchTerm: string, pg: number, sort: string) => {
    if (!searchTerm.trim()) return
    setLoading(true)
    setHasSearched(true)

    try {
      const params = new URLSearchParams({
        keyword: searchTerm.trim(),
        limit: String(pageSize),
        page: String(pg),
        include: "images",
      })

      // Map sort options
      if (sort === "price_asc") params.set("sort", "price")
      else if (sort === "price_desc") { params.set("sort", "price"); params.set("direction", "desc") }
      else if (sort === "name_asc") params.set("sort", "name")
      else if (sort === "name_desc") { params.set("sort", "name"); params.set("direction", "desc") }
      else if (sort === "date") { params.set("sort", "date_modified"); params.set("direction", "desc") }

      const res = await fetch(`/api/search?${params}`)
      if (!res.ok) throw new Error("Search failed")
      const data = await res.json()

      setProducts(data.products || [])
      setTotal(data.total || 0)
    } catch {
      setProducts([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [pageSize])

  // Fetch when submittedQuery, page, or sort changes
  useEffect(() => {
    if (submittedQuery) {
      fetchResults(submittedQuery, page, sortBy)
    }
  }, [submittedQuery, page, sortBy, fetchResults])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSubmittedQuery(query)
    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set("q", query)
    window.history.replaceState({}, "", url.toString())
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div
      ref={ref}
      className={`cast-section-default ${className || ""}`}
      style={{
        width: '100%',
        background: bgColor || "#0f1923",
        minHeight: "80vh",
      }}
    >
      <style>{`
        .sr-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1200px) { .sr-product-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 900px) { .sr-product-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 575px) { .sr-product-grid { grid-template-columns: 1fr; } }
        .sr-card {
          background: #2d353c;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
          text-decoration: none;
          color: inherit;
        }
        .sr-card:hover {
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
        .sr-sort-select {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          padding: 8px 12px;
          color: #fff;
          background: #2d353c;
          outline: none;
          cursor: pointer;
        }
        .sr-sort-select:focus { border-color: rgba(0,124,176,0.5); }
        .sr-page-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 40px; height: 40px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          font-family: 'Barlow', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          transition: all 200ms ease;
        }
        .sr-page-btn:hover { border-color: rgba(0,124,176,0.5); color: #007CB0; }
        .sr-page-btn.active { background: #007CB0; border-color: #007CB0; color: #fff; }
        .sr-page-btn:disabled { opacity: 0.3; cursor: default; }
        .sr-skeleton {
          background: linear-gradient(90deg, #2d353c 25%, #3a444d 50%, #2d353c 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 10px;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>

      <div className="site-container">
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: "var(--h2-size)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            margin: "0 0 24px",
          }}>
            {heading}{" "}
            <span style={{
              background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {headingAccent}
            </span>
          </h1>

          {/* Search bar */}
          <form onSubmit={handleSubmit} style={{ display: "flex", maxWidth: 600, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", paddingLeft: 16, color: "rgba(255,255,255,0.35)" }}>
              <Search style={{ width: 18, height: 18 }} />
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={placeholder}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "14px 16px", fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "#fff" }}
            />
            {query && (
              <button type="button" onClick={() => { setQuery(""); setSubmittedQuery(""); setProducts([]); setHasSearched(false) }}
                style={{ background: "transparent", border: "none", padding: "0 12px", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}>
                <X style={{ width: 16, height: 16 }} />
              </button>
            )}
            <button type="submit" style={{ background: "#007CB0", border: "none", padding: "14px 24px", cursor: "pointer", color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, transition: "background 200ms ease" }}>
              Search
            </button>
          </form>
        </div>

        {/* Results header bar */}
        {hasSearched && !loading && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)", margin: 0 }}>
              {total > 0 ? (
                <>Showing <strong style={{ color: "#fff" }}>{products.length}</strong> of <strong style={{ color: "#fff" }}>{total}</strong> results for "<strong style={{ color: "#007CB0" }}>{submittedQuery}</strong>"</>
              ) : (
                <>No results for "<strong style={{ color: "#007CB0" }}>{submittedQuery}</strong>"</>
              )}
            </p>
            {total > 0 && (
              <select className="sr-sort-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1) }}>
                <option value="relevance">Sort: Relevance</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A – Z</option>
                <option value="name_desc">Name: Z – A</option>
                <option value="date">Newest First</option>
              </select>
            )}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="sr-product-grid">
            {Array.from({ length: pageSize > 8 ? 8 : pageSize }).map((_, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <div className="sr-skeleton" style={{ aspectRatio: "1/1" }} />
                <div style={{ padding: 16 }}>
                  <div className="sr-skeleton" style={{ height: 14, width: "60%", marginBottom: 8 }} />
                  <div className="sr-skeleton" style={{ height: 18, width: "80%", marginBottom: 8 }} />
                  <div className="sr-skeleton" style={{ height: 20, width: "40%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {hasSearched && !loading && products.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,124,176,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Search style={{ width: 28, height: 28, color: "#007CB0" }} />
            </div>
            <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>
              {emptyHeading}
            </h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.55)", margin: "0 0 32px", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
              {emptyBody}
            </p>
            <a href="/shop" className="sg-btn-solid-md" style={{ textDecoration: "none" }}>
              Browse All Products →
            </a>
          </div>
        )}

        {/* Product grid */}
        {!loading && products.length > 0 && (
          <>
            <div className="sr-product-grid">
              {products.map(product => (
                <a key={product.id} href={product.href} className="sr-card">
                  <div style={{ aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,124,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,176,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, position: "relative", zIndex: 1 }}>
                          <circle cx="12" cy="12" r="10" stroke="#007CB0" strokeWidth="1.5" />
                          <path d="M8 12h8M12 8v8" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,25,35,0.4) 0%, transparent 40%)" }} />
                    {product.salePrice && (
                      <span style={{ position: "absolute", top: 10, left: 10, background: "#dc2626", color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 4 }}>
                        Sale
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "18px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    {product.brand && (
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#007CB0", margin: 0 }}>
                        {product.brand}
                      </p>
                    )}
                    <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.35 }}>
                      {product.name}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
                      {product.salePrice ? (
                        <>
                          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{product.salePrice}</span>
                          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "line-through" }}>{product.price}</span>
                        </>
                      ) : (
                        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{product.price}</span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 48 }}>
                <button className="sr-page-btn" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                  <ArrowLeft style={{ width: 16, height: 16 }} />
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 7) pageNum = i + 1
                  else if (page <= 4) pageNum = i + 1
                  else if (page >= totalPages - 3) pageNum = totalPages - 6 + i
                  else pageNum = page - 3 + i
                  return (
                    <button key={pageNum} className={`sr-page-btn ${pageNum === page ? "active" : ""}`} onClick={() => setPage(pageNum)}>
                      {pageNum}
                    </button>
                  )
                })}
                <button className="sr-page-btn" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Initial state — dummy results preview */}
        {!hasSearched && !loading && (
          <div>
            {/* ── PRODUCTS ── */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 700, color: "#fff", margin: 0 }}>Products</h2>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>18 results</span>
              </div>
              <div className="sr-product-grid">
                {DUMMY_PRODUCTS.map(p => (
                  <div key={p.id} style={{ background: "#2d353c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ aspectRatio: "1/1", background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,124,176,0.04) 1px, transparent 1px),linear-gradient(90deg,rgba(0,124,176,0.04) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, position: "relative", zIndex: 1 }}>
                        <circle cx="12" cy="12" r="10" stroke="#007CB0" strokeWidth="1.5" />
                        <path d="M8 12h8M12 8v8" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div style={{ padding: "16px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#007CB0", margin: 0 }}>{p.category}</p>
                      <p style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.3 }}>{p.name}</p>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", margin: "4px 0 0" }}>{p.price}</p>
                      <div style={{ marginTop: "auto", paddingTop: 10 }}>
                        <span className="sg-btn-solid-md" style={{ display: "block", textAlign: "center", fontSize: 13 }}>View Product →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DOCUMENTATION ── */}
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 700, color: "#fff", margin: 0 }}>Documentation</h2>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>4 results</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {DUMMY_DOCS.map(doc => (
                  <div key={doc.id} style={{ display: "flex", alignItems: "flex-start", gap: 18, background: "#2d353c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "18px 22px" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(126,190,232,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="14 2 14 8 20 8" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="16" y1="13" x2="8" y2="13" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="16" y1="17" x2="8" y2="17" stroke="#7EBEE8" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7EBEE8", margin: "0 0 5px" }}>{doc.type}</p>
                      <p style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: 17, fontWeight: 600, color: "#fff", margin: "0 0 6px", lineHeight: 1.3 }}>{doc.title}</p>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>{doc.excerpt}</p>
                    </div>
                    <span style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", alignSelf: "center", flexShrink: 0 }}>→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── BLOG POSTS ── */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 700, color: "#fff", margin: 0 }}>Blog Posts</h2>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>2 results</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {DUMMY_BLOG_POSTS.map(post => (
                  <div key={post.id} style={{ display: "flex", gap: 24, background: "#2d353c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ width: 200, flexShrink: 0, background: "linear-gradient(135deg, #1a2e3a 0%, #0d4a5c 50%, #1a3a4a 100%)", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,124,176,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,124,176,0.04) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0, padding: "22px 22px 22px 0", display: "flex", flexDirection: "column", gap: 8 }}>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#7EBEE8", margin: 0 }}>{post.date} · {post.readTime}</p>
                      <p style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: 19, fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.3 }}>{post.title}</p>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 700, color: "#7EBEE8" }}>Read Article →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default SearchResults
