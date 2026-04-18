"use client"
import { forwardRef, type Ref, useState } from "react"
import { ArrowLeft, Search } from "lucide-react"

interface NotFoundHeroProps {
  className?: string
  bgColor?: string
  errorCode?: string
  heading?: string
  headingAccent?: string
  body?: string
  searchPlaceholder?: string
  btnLabel?: string
  btnHref?: string
}

const NotFoundHero = forwardRef(function NotFoundHero(
  {
    className,
    bgColor
    errorCode = "404",
    heading = "Page Not",
    headingAccent = "Found",
    body = "The page you're looking for doesn't exist or has been moved. Try searching or head back to the homepage.",
    searchPlaceholder = "Search products, guides, resources...",
    btnLabel = "Back to Home",
    btnHref = "/",
  }: NotFoundHeroProps,
  ref: Ref<HTMLElement>
) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(query.trim())}`
    }
  }

  return (
    <section
      ref={ref}
      className={`cast-not-found-hero-defaults ${className || ""}`}
      style={{
        background: bgColor || "#0f1923",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`\n        .cast-not-found-hero-defaults { padding-top: 120px; padding-bottom: 80px; }\n        @media (max-width: 1024px) { .cast-not-found-hero-defaults { padding-top: 96px; padding-bottom: 64px; } }\n        @media (max-width: 768px)  { .cast-not-found-hero-defaults { padding-top: 78px; padding-bottom: 52px; } }\n        @media (max-width: 640px)  { .cast-not-found-hero-defaults { padding-top: 66px; padding-bottom: 44px; } }\n      `}</style>
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,124,176,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,176,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Decorative glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 400,
          background: "radial-gradient(ellipse, rgba(0,124,176,0.1), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 640, padding: "0 24px", width: "100%" }}>
        {/* Error code */}
        <p
          style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: "clamp(100px, 18vw, 180px)",
            fontWeight: 700,
            lineHeight: 1,
            margin: "0 0 8px",
            background: "linear-gradient(135deg, rgba(0,124,176,0.3), rgba(126,190,232,0.15))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            userSelect: "none",
          }}
        >
          {errorCode}
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: "var(--h2-size)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            margin: "0 0 16px",
          }}
        >
          {heading}{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {headingAccent}
          </span>
        </h1>

        {/* Body */}
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 17,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            margin: "0 0 40px",
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {body}
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            maxWidth: 480,
            margin: "0 auto 32px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            overflow: "hidden",
            transition: "border-color 200ms",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", paddingLeft: 16, color: "rgba(255,255,255,0.35)" }}>
            <Search style={{ width: 18, height: 18 }} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "14px 16px",
              fontFamily: "'Barlow', sans-serif",
              fontSize: 15,
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#007CB0",
              border: "none",
              padding: "14px 20px",
              cursor: "pointer",
              color: "#fff",
              fontFamily: "'Barlow', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              transition: "background 200ms",
            }}
          >
            Search
          </button>
        </form>

        {/* Back to home button */}
        <a
          href={btnHref}
          className="sg-btn-outline-md"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} />
          {btnLabel}
        </a>
      </div>
    </section>
  )
})

export default NotFoundHero
