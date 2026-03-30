"use client"
import { forwardRef, type Ref } from "react"
import { Phone, MapPin } from "lucide-react"

const FilledFacebook = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const FilledX = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
const FilledPinterest = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
const FilledInstagram = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
const FilledYoutube = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
const FilledLinkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>

const FALLBACK_COLS = [
  {
    title: "Products",
    links: [
      { label: "Shop All Products", href: "/category/23" },
      { label: "Path & Area Lights", href: "/category/26" },
      { label: "Spot & Accent Lights", href: "/category/31" },
      { label: "Well & In-Ground Lights", href: "/category/35" },
      { label: "Step & Deck Lights", href: "/category/30" },
      { label: "Transformers", href: "/category/45" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Installation Guides", href: "#" },
      { label: "Downloads", href: "#" },
      { label: "Patents", href: "/patents" },
      { label: "Style Guide", href: "/style-guide" },
    ],
  },
  {
    title: "Trade & Partners",
    links: [
      { label: "TradePro Program", href: "/trade-pro" },
      { label: "Become a Retailer", href: "/retail-signup" },
      { label: "Find a Contractor", href: "/contractor-finder" },
      { label: "Find a Distributor", href: "/distributor-finder" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Account & Support",
    links: [
      { label: "My Account", href: "/account/orders" },
      { label: "My Quotes", href: "/quotes" },
      { label: "My Favorites", href: "/favorites" },
      { label: "Warranty Info", href: "/warranty" },
      { label: "Returns", href: "/returns" },
      { label: "About CAST", href: "/about" },
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
    xHref,
    pinterestHref,
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
    xHref?: string
    pinterestHref?: string
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
    { icon: FilledFacebook, href: facebookHref || "#", label: "Facebook" },
    { icon: FilledInstagram, href: instagramHref || "#", label: "Instagram" },
    { icon: FilledYoutube, href: youtubeHref || "#", label: "YouTube" },
    { icon: FilledLinkedin, href: linkedinHref || "#", label: "LinkedIn" },
    { icon: FilledX, href: xHref || "#", label: "X" },
    { icon: FilledPinterest, href: pinterestHref || "#", label: "Pinterest" },
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
                <img src="https://storage.googleapis.com/s.mkswft.com/RmlsZToxNmVlZWE3MS1iNjRjLTQ0MjctOGI2My1jNWI3ODQxNWFmNGI=/cast__lighting_white.svg" alt="CAST Lighting" style={{ height: 48, width: 'auto' }} />
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
                  <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ background: '#ffffff', color: '#014960' }}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            {cols.map((col) => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", marginBottom: 16 }}>{col.title}</h4>
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
              <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/returns" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default SiteFooter
