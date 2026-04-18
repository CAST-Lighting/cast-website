"use client"
import { forwardRef, useEffect, useState, useCallback, type Ref } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  status: string
  tags: string
  category: string
  author: string
  publishedDate: string
  featuredImageUrl: string
  body: string
  readTime: string
}

interface CategoryTag {
  label?: string
  value?: string
}

interface BlogGridProps {
  className?: string
  bgColor?: string
  postsPerPage?: number
  categoryTags?: CategoryTag[]
  emptyMessage?: string
}

const DEFAULT_CATEGORY_TAGS: CategoryTag[] = [
  { label: "All", value: "" },
  { label: "Installation", value: "Installation" },
  { label: "Product Guides", value: "Product Guides" },
  { label: "Design Tips", value: "Design Tips" },
  { label: "Case Studies", value: "Case Studies" },
  { label: "Industry News", value: "Industry News" },
]

function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateStr
  }
}

function getExcerpt(body: string, maxLen = 120): string {
  const plain = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
  return plain.length > maxLen ? plain.slice(0, maxLen) + "..." : plain
}

const BlogGrid = forwardRef(function BlogGrid(
  {
    className,
    bgColor = "#0f1923",
    postsPerPage = 9,
    categoryTags: categoryTagsProp,
    emptyMessage = "No posts found.",
  }: BlogGridProps,
  ref: Ref<HTMLDivElement>
) {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string>("")
  const [page, setPage] = useState(0)

  const categoryTags =
    categoryTagsProp && categoryTagsProp.length > 0 ? categoryTagsProp : DEFAULT_CATEGORY_TAGS

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/cast/blog?status=Published")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: BlogPost[] = await res.json()
      setAllPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchPosts()
  }, [fetchPosts])

  // Filter posts by active tag
  const filteredPosts = activeTag
    ? allPosts.filter((p) => {
        const tags = (p.tags ?? "").split(",").map((t) => t.trim())
        return tags.includes(activeTag)
      })
    : allPosts

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const visiblePosts = filteredPosts.slice(page * postsPerPage, (page + 1) * postsPerPage)

  const handleTagClick = (tag: string) => {
    setActiveTag(tag)
    setPage(0)
  }

  return (
    <div
      ref={ref}
      className={`cast-blog-grid-defaults ${className || ""}`}
      style={{ background: bgColor || "#0f1923" }}
    >
      {/* ── Category Filter Pills ── */}
      <div
        style={{
          background: "#141e2a",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "18px 0",
          marginBottom: 0,
        }}
      >
        <div className="site-container">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            {categoryTags.map((cat, i) => {
              const isActive = (cat.value ?? "") === activeTag
              return (
                <button
                  key={i}
                  onClick={() => handleTagClick(cat.value ?? "")}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.09em",
                    padding: "8px 18px",
                    borderRadius: 100,
                    border: isActive ? "none" : "1px solid rgba(255,255,255,0.18)",
                    background: isActive ? "#007CB0" : "transparent",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    transition: "all 200ms",
                  }}
                >
                  {cat.label || cat.value || "Tag"}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Post Grid ── */}
      <div style={{ padding: "56px 0 0" }}>
        <div className="site-container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div
                style={{
                  display: "inline-block",
                  width: 40,
                  height: 40,
                  border: "3px solid rgba(0,124,176,0.3)",
                  borderTopColor: "#007CB0",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 15,
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 16,
                }}
              >
                Loading posts...
              </p>
            </div>
          ) : error ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 16,
                  color: "rgba(255,100,100,0.7)",
                  margin: "0 0 16px",
                }}
              >
                Could not load blog posts.
              </p>
              <button
                onClick={() => void fetchPosts()}
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#007CB0",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Try again
              </button>
            </div>
          ) : visiblePosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 20,
                  color: "rgba(255,255,255,0.4)",
                  margin: "0 0 16px",
                }}
              >
                {activeTag ? `No posts found for "${activeTag}".` : emptyMessage}
              </p>
              {activeTag && (
                <button
                  onClick={() => handleTagClick("")}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#007CB0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  View all posts →
                </button>
              )}
            </div>
          ) : (
            <>
            <div className="blog-grid">
              {visiblePosts.map((post) => {
                const excerpt = getExcerpt(post.body)
                const displayTag = activeTag || post.tags?.split(",")?.[0]?.trim() || "Insights"
                return (
                  <a
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    style={{
                      textDecoration: "none",
                      display: "block",
                      background: "#2d353c",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      overflow: "hidden",
                      transition: "border-color 200ms, box-shadow 200ms, transform 200ms",
                      color: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = "rgba(0,124,176,0.45)"
                      el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"
                      el.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = "rgba(255,255,255,0.08)"
                      el.style.boxShadow = "none"
                      el.style.transform = "translateY(0)"
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        aspectRatio: "16/9",
                        position: "relative",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #1a2e3a 0%, #0d3a4a 100%)",
                        flexShrink: 0,
                      }}
                    >
                      {post.featuredImageUrl ? (
                        <img
                          src={post.featuredImageUrl}
                          alt={post.title}
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
                            position: "absolute",
                            inset: 0,
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundImage:
                                "linear-gradient(rgba(0,124,176,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,176,0.04) 1px, transparent 1px)",
                              backgroundSize: "24px 24px",
                            }}
                          />
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ opacity: 0.4, position: "relative", zIndex: 1 }}
                          >
                            <circle cx="12" cy="12" r="10" stroke="#007CB0" strokeWidth="1.5" />
                            <path d="M8 12h8M12 8v8" stroke="#007CB0" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                      {/* Gradient overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(15,25,35,0.55) 0%, transparent 50%)",
                        }}
                      />
                      {/* Category tag */}
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
                        <span
                          style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.09em",
                            color: "#fff",
                            background: "#007CB0",
                            padding: "3px 10px",
                            borderRadius: 4,
                          }}
                        >
                          {displayTag}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                      <h3
                        style={{
                          fontFamily: "'Essonnes', 'Playfair Display', serif",
                          fontSize: "var(--h4-size, 1.25rem)",
                          fontWeight: 700,
                          color: "#fff",
                          lineHeight: 1.3,
                          margin: 0,
                        }}
                      >
                        {post.title}
                      </h3>
                      {excerpt && (
                        <p
                          style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: 14,
                            color: "rgba(255,255,255,0.52)",
                            lineHeight: 1.65,
                            margin: 0,
                          }}
                        >
                          {excerpt}
                        </p>
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: 6,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: 12,
                            color: "rgba(255,255,255,0.38)",
                          }}
                        >
                          {formatDate(post.publishedDate)}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#007CB0",
                            letterSpacing: "0.02em",
                          }}
                        >
                          Read More →
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
            </>
          )}

          {/* ── Pagination ── */}
          {!loading && !error && totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 64 }}>
              {page > 0 && (
                <button
                  onClick={() => setPage((p) => p - 1)}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    background: "#2d353c",
                    border: "1px solid rgba(0,124,176,0.35)",
                    borderRadius: 8,
                    padding: "12px 32px",
                    cursor: "pointer",
                    transition: "all 200ms",
                  }}
                >
                  ← Previous
                </button>
              )}
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  alignSelf: "center",
                }}
              >
                Page {page + 1} of {totalPages}
              </span>
              {page < totalPages - 1 && (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    background: "#2d353c",
                    border: "1px solid rgba(0,124,176,0.35)",
                    borderRadius: 8,
                    padding: "12px 32px",
                    cursor: "pointer",
                    transition: "all 200ms",
                  }}
                >
                  Next →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default BlogGrid
