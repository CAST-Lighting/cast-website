"use client"
import { forwardRef, type Ref } from "react"
import { Facebook, Instagram, Youtube, Linkedin, Phone, MapPin } from "lucide-react"

const FALLBACK_COLS = [
  {
    title: "Products",
    links: [
      { label: "Shop All Products", href: "/shop" },
      { label: "Path & Area Lights", href: "/shop" },
      { label: "Spot & Accent Lights", href: "/shop" },
      { label: "Well & In-Ground Lights", href: "/shop" },
      { label: "Step & Deck Lights", href: "/shop" },
      { label: "Transformers", href: "/shop" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Product Catalog", href: "/shop" },
      { label: "Installation Guides", href: "#" },
      { label: "Design Tips", href: "#" },
      { label: "Technical Support", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "Trade & Partners",
    links: [
      { label: "TradePro Program", href: "/trade-pro" },
      { label: "Become a Retailer", href: "/retail-signup" },
      { label: "Find a Contractor", href: "/contractor-finder" },
      { label: "Find a Distributor", href: "/distributor-finder" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Warranty Info", href: "#" },
      { label: "Returns", href: "#" },
      { label: "Shipping", href: "#" },
      { label: "Technical Support", href: "#" },
      { label: "About CAST", href: "#" },
    ],
  },
]

interface LinkItem { label?: string; href?: string }

const SiteFooter = forwardRef(function SiteFooter(
  {
    className,
    bgImage,
    bgColor,
    bgOpacity,
    gradientFrom,
    gradientTo,
    gradientDirection,
    lineHeight,
    paddingTop,
    paddingBottom,
    phone,
    address,
    copyright,
    tagline,
    facebookHref,
    instagramHref,
    youtubeHref,
    linkedinHref,
    col1Title,
    col1Links,
    col2Title,
    col2Links,
    col3Title,
    col3Links,
    col4Title,
    col4Links,
  }: {
    className?: string
    bgImage?: string
    bgColor?: string
    bgOpacity?: number
    gradientFrom?: string
    gradientTo?: string
    gradientDirection?: string
    lineHeight?: number
    paddingTop?: number
    paddingBottom?: number
    phone?: string
    address?: string
    copyright?: string
    tagline?: string
    facebookHref?: string
    instagramHref?: string
    youtubeHref?: string
    linkedinHref?: string
    col1Title?: string
    col1Links?: LinkItem[]
    col2Title?: string
    col2Links?: LinkItem[]
    col3Title?: string
    col3Links?: LinkItem[]
    col4Title?: string
    col4Links?: LinkItem[]
  },
  ref: Ref<HTMLElement>
) {
  const bgImageUrl = bgImage
  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.85
  const sectionBackground = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#004a61'

  const socialLinks = [
    { icon: Facebook, href: facebookHref || "#", label: "Facebook" },
    { icon: Instagram, href: instagramHref || "#", label: "Instagram" },
    { icon: Youtube, href: youtubeHref || "#", label: "YouTube" },
    { icon: Linkedin, href: linkedinHref || "#", label: "LinkedIn" },
  ]

  const cols = [
    { title: col1Title || FALLBACK_COLS[0].title, links: col1Links?.length ? col1Links : FALLBACK_COLS[0].links },
    { title: col2Title || FALLBACK_COLS[1].title, links: col2Links?.length ? col2Links : FALLBACK_COLS[1].links },
    { title: col3Title || FALLBACK_COLS[2].title, links: col3Links?.length ? col3Links : FALLBACK_COLS[2].links },
    { title: col4Title || FALLBACK_COLS[3].title, links: col4Links?.length ? col4Links : FALLBACK_COLS[3].links },
  ]

  return (
    <footer
      ref={ref}
      className={`relative border-t border-border ${className || ""}`}
      style={{ ...(!bgImageUrl ? { background: sectionBackground } : {}), '--section-line-height': lineHeight, paddingTop: paddingTop ?? 64, paddingBottom: paddingBottom ?? 64 } as React.CSSProperties}
    >
      {bgImageUrl && (
        <img src={bgImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      )}
      {bgImageUrl && (
        <div className="absolute inset-0" style={{ zIndex: 1, background: sectionBackground, opacity: overlayOpacity }} />
      )}

      <div className="relative" style={{ zIndex: 10 }}>
        <div className="site-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-1">
              <a href="/" className="heading-style-h5 tracking-wider text-foreground">
                CAST <span className="text-primary">LIGHTING</span>
              </a>
              <p className="text-size-small text-muted-foreground mt-4 leading-relaxed">
                {tagline || "Professional-grade landscape lighting trusted by contractors since 2001."}
              </p>
              <div className="flex items-start gap-2 mt-4 text-size-small text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{phone || "(800) 555-CAST"}</span>
              </div>
              <div className="flex items-start gap-2 mt-2 text-size-small text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{address || "Pine Brook, NJ 07058"}</span>
              </div>
              <div className="flex items-center gap-3 mt-5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="heading-style-h6 tracking-wider text-foreground mb-4 uppercase" style={{ fontSize: '14px' }}>{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href || '#'} className="text-size-small text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-size-small text-muted-foreground">
              {copyright || "© 2026 CAST Lighting. All rights reserved."}
            </p>
            <div className="flex gap-6 text-size-small text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default SiteFooter
