"use client"
import { forwardRef, type Ref } from "react"
import { useCmsData } from "~/lib/makeswift/cms-context"

interface CmsSubPageHeroProps {
  className?: string
  paddingTop?: number
  paddingBottom?: number
  bgImage?: string
  bgColor?: string
  bgOpacity?: number
  badgeText?: string
  headingLine1?: string
  headingAccent?: string
  description?: string
  btn1Label?: string
  btn1Href?: string
  btn2Label?: string
  btn2Href?: string
}

const CmsSubPageHero = forwardRef(function CmsSubPageHero(
  {
    className,
    paddingTop = 165,
    paddingBottom = 64,
    bgImage,
    bgColor = "#25262d",
    bgOpacity = 60,
    badgeText = "Badge Text",
    headingLine1 = "Page Title Goes Here",
    headingAccent,
    description = "Description text.",
    btn1Label,
    btn1Href = "#",
    btn2Label,
    btn2Href = "#",
  }: CmsSubPageHeroProps,
  ref: Ref<HTMLElement>
) {
  const cms = useCmsData()

  const resolvedHeading = cms?.heading ?? headingLine1

  const resolvedDescription = (() => {
    if (!cms) return description
    if (cms.type === "blog") {
      const m = cms.meta as { publishedDate?: string; category?: string; author?: string } | null
      const parts = [m?.publishedDate, m?.category, m?.author].filter(Boolean)
      return parts.length > 0 ? parts.join(" · ") : description
    }
    if (cms.type === "product")
      return (cms.meta as { shortDescription?: string } | null)?.shortDescription ?? description
    if (cms.type === "category")
      return (cms.meta as { description?: string } | null)?.description ?? description
    if (cms.type === "search") {
      const total = (cms.meta as { total?: number } | null)?.total
      if (total !== undefined) return `${total} result${total !== 1 ? "s" : ""} found`
    }
    return description
  })()

  const overlayOpacity = bgOpacity / 100
  const overlayBg = bgColor || "#25262d"

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{
        width: "100%",
        paddingTop,
        paddingBottom,
        ...(bgImage ? {} : { background: overlayBg }),
      }}
    >
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayBg,
          opacity: bgImage ? overlayOpacity : 1,
          zIndex: 1,
        }}
      />
      <div className="site-container" style={{ position: "relative", zIndex: 10 }}>
        {badgeText && (
          <p
            className="text-style-overline"
            style={{ margin: "0 0 16px", color: "var(--cast-light-blue)" }}
          >
            {badgeText}
          </p>
        )}
        <h1
          style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: "var(--h1-size, clamp(2rem, 5vw, 3.5rem))",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            margin: "0 0 20px",
            maxWidth: 800,
          }}
        >
          {resolvedHeading}
          {headingAccent && !cms?.heading && (
            <>
              {" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {headingAccent}
              </span>
            </>
          )}
        </h1>
        {resolvedDescription && (
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 17,
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.7,
              maxWidth: 620,
              margin: btn1Label || btn2Label ? "0 0 32px" : 0,
            }}
          >
            {resolvedDescription}
          </p>
        )}
        {(btn1Label || btn2Label) && (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {btn1Label && (
              <a href={btn1Href} className="sg-btn-solid-dark-md" style={{ textDecoration: "none" }}>
                {btn1Label}
              </a>
            )}
            {btn2Label && (
              <a href={btn2Href} className="sg-btn-outline-dark-md" style={{ textDecoration: "none" }}>
                {btn2Label}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
})

export default CmsSubPageHero
