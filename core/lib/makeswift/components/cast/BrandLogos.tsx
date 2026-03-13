"use client"

import { forwardRef, type Ref } from "react"

interface Logo {
  image?: string
  name?: string
  url?: string
}

interface BrandLogosProps {
  className?: string
  sectionStyle?: string
  overline?: string
  heading?: string
  logos?: Logo[]
  bgColor?: string
}

const DEFAULT_LOGOS: Logo[] = [
  { name: "LandscapePro" },
  { name: "GreenWorks" },
  { name: "OutdoorElite" },
  { name: "LightMaster" },
  { name: "ProInstall" },
  { name: "NightScape" },
  { name: "TerraCraft" },
  { name: "LandArt" },
]

const PlaceholderLogo = ({ name }: { name: string }) => {
  const words = name.replace(/([A-Z])/g, " $1").trim().split(" ").filter(Boolean)
  const initials = words.slice(0, 2).map((w) => w[0]).join("")
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        padding: "10px 20px",
        backgroundColor: "#1e2d38",
        border: "1px solid rgba(127,190,232,0.12)",
        borderRadius: 8,
        minWidth: 120,
        height: 56,
        transition: "border-color 0.2s",
      }}
    >
      <span
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 15,
          fontWeight: 700,
          color: "#7ebee8",
          letterSpacing: "0.06em",
          lineHeight: 1,
        }}
      >
        {initials}
      </span>
      <span
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 8,
          fontWeight: 600,
          color: "#546f7a",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  )
}

const BrandLogos = forwardRef(function BrandLogos(
  {
    className,
    sectionStyle,
    overline = "TRUSTED BY THOUSANDS ACROSS THE USA",
    heading,
    logos,
    bgColor,
  }: BrandLogosProps,
  ref: Ref<HTMLDivElement>
) {
  const list = logos && logos.length > 0 ? logos : DEFAULT_LOGOS

  return (
    <>
      <style>{`
        .bl-logo-item {
          opacity: 0.7;
          transition: opacity 0.2s, filter 0.2s;
          filter: grayscale(20%);
        }
        .bl-logo-item:hover {
          opacity: 1;
          filter: grayscale(0%);
        }
        .bl-logo-item img {
          height: 44px;
          width: auto;
          object-fit: contain;
          display: block;
        }
      `}</style>
      <div
        ref={ref}
        className={`${className || ""} ${sectionStyle || ""}`}
        style={{
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "#1a2330",
          borderTop: "1px solid rgba(127,190,232,0.08)",
          borderBottom: "1px solid rgba(127,190,232,0.08)",
        }}
      >
        <div className="site-container" style={{ paddingTop: 48, paddingBottom: 48 }}>
          {overline && (
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#7ebee8",
                textAlign: "center",
                marginBottom: heading ? 14 : 36,
                marginTop: 0,
              }}
            >
              {overline}
            </p>
          )}
          {heading && (
            <h2
              style={{
                fontFamily: "'Essonnes', 'Playfair Display', serif",
                fontSize: "var(--h3-size)",
                fontWeight: "var(--heading-weight, 700)",
                lineHeight: "var(--heading-line-height, 1.1)",
                color: "#e2edf2",
                textAlign: "center",
                margin: "0 0 40px",
              }}
            >
              {heading}
            </h2>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {list.map((logo, i) =>
              logo.image ? (
                <a
                  key={i}
                  href={logo.url || "#"}
                  className="bl-logo-item"
                  aria-label={logo.name || `Partner logo ${i + 1}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img src={logo.image} alt={logo.name || `Logo ${i + 1}`} />
                </a>
              ) : (
                <div key={i} className="bl-logo-item">
                  <PlaceholderLogo name={logo.name || `Brand ${i + 1}`} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
})

export default BrandLogos
