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
  const initials = name.replace(/([A-Z])/g, ' $1').trim().split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div style={{
      width: 140,
      height: 60,
      border: "1.5px solid #dee2e6",
      borderRadius: 6,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      padding: "0 12px",
      backgroundColor: "#fff",
    }}>
      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 700, color: "#adb5bd", letterSpacing: "0.04em" }}>{initials}</span>
      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 9, fontWeight: 600, color: "#ced4da", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{name}</span>
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
    <div
      ref={ref}
      className={`${className || ""} ${sectionStyle || ""}`}
      style={{ width: "100%", boxSizing: "border-box", backgroundColor: bgColor || "#ffffff" }}
    >
      <div className="site-container" style={{ paddingTop: 56, paddingBottom: 56 }}>
        {overline && (
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--color-content)", textAlign: "center", marginBottom: heading ? 12 : 32, marginTop: 0 }}>
            {overline}
          </p>
        )}
        {heading && (
          <h2 style={{ fontSize: "var(--h3-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)", fontFamily: "'Barlow', sans-serif", color: "var(--color-title)", textAlign: "center", margin: "0 0 40px" }}>
            {heading}
          </h2>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", alignItems: "center" }}>
          {list.map((logo, i) => (
            logo.image
              ? <img key={i} src={logo.image} alt={logo.name || `Logo ${i + 1}`} style={{ height: 48, width: "auto", objectFit: "contain", opacity: 0.6 }} />
              : <PlaceholderLogo key={i} name={logo.name || `Brand ${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  )
})

export default BrandLogos
