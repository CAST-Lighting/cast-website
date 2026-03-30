"use client"

import { forwardRef, useState, useEffect, useCallback, type Ref } from "react"
import { Search, X, ArrowLeft, ArrowRight } from "lucide-react"

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
  paddingTop?: number
  paddingBottom?: number
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
    paddingTop,
    paddingBottom,
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
      className={className || ""}
      style={{
        background: bgColor || "#0f1923",
        minHeight: "80vh",
        paddingTop: paddingTop ?? 48,
        paddingBottom: paddingBottom ?? 96,
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
          transition: border-color 200ms, box-shadow 200ms, transform 200ms;
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
          transition: all 200ms;
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
            fontSize: "clamp(28px, 4vw, 48px)",
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
            <button type="submit" style={{ background: "#007CB0", border: "none", padding: "14px 24px", cursor: "pointer", color: "#fff", fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, transition: "background 200ms" }}>
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

        {/* Initial state — no search yet */}
        {!hasSearched && !loading && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,124,176,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Search style={{ width: 28, height: 28, color: "#007CB0" }} />
            </div>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              Enter a search term above to find products
            </p>
          </div>
        )}
      </div>
    </div>
  )
})

export default SearchResults
