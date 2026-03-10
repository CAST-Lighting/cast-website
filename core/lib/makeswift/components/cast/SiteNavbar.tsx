"use client"

import { forwardRef, useState, useEffect, useRef, useCallback, type Ref } from "react"
import { Search, ShoppingCart, ChevronDown, X } from "lucide-react"
import { MenuToggleIcon } from "./ui/menu-toggle-icon"

interface SiteNavbarProps {
  className?: string
  transparentMode?: boolean
  bgColor?: string
  logoImage?: string
  logoText?: string
  ctaText?: string
  ctaHref?: string
  phone?: string
  contactText?: string
  contactHref?: string
}

type DropdownKey = "shop" | "resources" | "contractors" | "about" | null

const shopLinks = [
  { title: "Path Lights", href: "/products/path-lights" },
  { title: "Spot Lights", href: "/products/spot-lights" },
  { title: "Well Lights", href: "/products/well-lights" },
  { title: "Wall Lights", href: "/products/wall-lights" },
  { title: "Deck Lights", href: "/products/deck-lights" },
  { title: "Transformers", href: "/products/transformers" },
]

const resourcesLinks = [
  { title: "Installation Guides", href: "/resources/installation-guides" },
  { title: "Training", href: "/resources/training" },
  { title: "Technical Support", href: "/resources/technical-support" },
  { title: "Downloads", href: "/resources/downloads" },
]

const contractorsLinks = [
  { title: "Find a Contractor", href: "/contractors/find" },
  { title: "Contractor Finder Map", href: "/contractors/map" },
  { title: "Submit a Project", href: "/contractors/submit-project" },
]

const aboutLinks = [
  { title: "About CAST", href: "/about" },
  { title: "Our Story", href: "/about/our-story" },
  { title: "Warranty", href: "/about/warranty" },
  { title: "Blog", href: "/blog" },
]

const dropdownData: Record<string, { title: string; href: string }[]> = {
  shop: shopLinks,
  resources: resourcesLinks,
  contractors: contractorsLinks,
  about: aboutLinks,
}

const SiteNavbar = forwardRef(function SiteNavbar(
  {
    className,
    transparentMode = true,
    bgColor = "#ffffff",
    logoImage,
    logoText = "CAST LIGHTING",
    ctaText = "LOGIN / SIGNUP",
    ctaHref = "/account",
    phone = "(973) 423-2303",
    contactText = "Contact Us",
    contactHref = "/contact",
  }: SiteNavbarProps,
  ref: Ref<HTMLElement>
) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 10) }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(o => !o)
      }
      if (e.key === "Escape") {
        setSearchOpen(false)
        setActiveDropdown(null)
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      setSearchQuery("")
      setTimeout(() => searchInputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  const openDropdown = useCallback((key: DropdownKey) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setActiveDropdown(key)
  }, [])

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150)
  }, [])

  const mainBg = transparentMode
    ? scrolled ? "rgba(33,33,32,0.85)" : "transparent"
    : bgColor
  const mainTextColor = transparentMode ? "#ffffff" : "var(--color-title)"

  const navItemStyle = {
    display: "inline-flex" as const,
    alignItems: "center" as const,
    gap: 4,
    height: 60,
    padding: "0 14px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: mainTextColor,
    fontSize: 13,
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
    textDecoration: "none",
    position: "relative" as const,
    transition: "opacity 0.15s",
  }

  return (
    <>
      <style>{`
        :root { --nav-pad: 64px; }
        @media (max-width: 1200px) { :root { --nav-pad: 40px; } }
        @media (max-width: 768px) { :root { --nav-pad: 32px; } }
        @media (max-width: 480px) { :root { --nav-pad: 20px; } }
        .nav-dropdown-anchor { position: relative; }
        .nav-dropdown {
          position: absolute; top: 100%; left: 0; background: #ffffff;
          border: 1px solid #eaeaea; border-radius: 10px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12); z-index: 40; margin-top: 4px;
          min-width: 220px; animation: navDropIn 0.18s ease-out;
        }
        @keyframes navDropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .nav-dropdown-inner { padding: 8px; display: flex; flex-direction: column; gap: 2px; }
        .nav-dropdown-link {
          display: block; padding: 10px 14px; border-radius: 6px; font-size: 14px;
          font-family: 'Barlow', sans-serif; font-weight: 500; color: var(--color-title);
          text-decoration: none; transition: background-color 0.12s, color 0.12s; white-space: nowrap;
        }
        .nav-dropdown-link:hover { background: #f6f7f8; color: var(--color-primary); }
        .nav-search-bar {
          position: absolute; top: 100%; left: 0; right: 0; display: flex;
          justify-content: center; margin-top: 8px; z-index: 40; pointer-events: none;
        }
        .nav-search-pill {
          width: 100%; max-width: 800px; background: #ffffff; border: 1px solid #eaeaea;
          border-radius: 999px; box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          pointer-events: auto; animation: navSearchIn 0.2s ease-out;
        }
        @keyframes navSearchIn { from { opacity: 0; transform: translateY(-6px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .nav-search-inner { padding: 18px 24px; display: flex; align-items: center; gap: 14px; }
        .nav-search-input {
          flex: 1; border: none; outline: none; font-size: 18px; font-family: 'Barlow', sans-serif;
          color: var(--color-title); background: transparent;
        }
        .nav-search-input::placeholder { color: #bbb; }
        .nav-search-close {
          background: none; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer;
          color: #9ca3af; padding: 4px 10px; display: flex; align-items: center; gap: 4px;
          font-size: 11px; font-family: 'Barlow', sans-serif; transition: color 0.15s, border-color 0.15s;
        }
        .nav-search-close:hover { color: #212120; border-color: #ccc; }
        .nav-desktop { display: flex !important; }
        .nav-mobile-toggle { display: none !important; }
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        .nav-mobile-panel {
          position: fixed; inset: 0; z-index: 100; background: var(--color-primary);
          overflow-y: auto; padding: 80px var(--nav-pad) 40px; font-family: 'Barlow', sans-serif;
        }
        .nav-mob-btn {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 12px 0; font-size: 15px; font-family: 'Barlow', sans-serif; font-weight: 600;
          color: #fff; background: none; border: none; cursor: pointer;
          text-transform: uppercase; letter-spacing: 0.04em;
        }
        .nav-mob-sub {
          display: block; padding: 8px 0 8px 16px; font-size: 14px;
          font-family: 'Barlow', sans-serif; font-weight: 400; color: rgba(255,255,255,0.75);
          text-decoration: none; transition: color 0.15s;
        }
        .nav-mob-sub:hover { color: #fff; }
      `}</style>

      <header
        ref={ref}
        className={className || ""}
        style={{
          position: transparentMode ? "absolute" : "relative",
          top: 0, left: 0, right: 0, zIndex: 50,
          fontFamily: "'Barlow', sans-serif",
          backdropFilter: transparentMode && scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: transparentMode && scrolled ? "blur(12px)" : "none",
          transition: "backdrop-filter 0.3s, background-color 0.3s",
        }}
      >
        <div style={{ backgroundColor: mainBg, transition: "background-color 0.3s", position: "relative" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 var(--nav-pad)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
            <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
              {logoImage ? (
                <img src={logoImage} alt={logoText || "Logo"} style={{ height: 36, width: "auto", objectFit: "contain", filter: transparentMode ? "brightness(0) invert(1)" : "none" }} />
              ) : (
                <span style={{ fontWeight: 700, fontSize: 20, color: mainTextColor, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{logoText}</span>
              )}
            </a>

            <nav style={{ display: "flex", alignItems: "center", height: "100%" }} className="nav-desktop">
              {([
                { key: "shop" as const, label: "Shop", hasDropdown: true },
                { key: null, label: "Deals", hasDropdown: false, href: "/deals" },
                { key: "resources" as const, label: "Resources", hasDropdown: true },
                { key: "contractors" as const, label: "Contractors", hasDropdown: true },
                { key: "about" as const, label: "About", hasDropdown: true },
              ]).map((item) =>
                item.hasDropdown && item.key ? (
                  <div key={item.key} className="nav-dropdown-anchor" onMouseEnter={() => openDropdown(item.key)} onMouseLeave={closeDropdown}>
                    <button style={navItemStyle} onClick={() => setActiveDropdown(d => d === item.key ? null : item.key)}>
                      {item.label} <ChevronDown size={14} style={{ opacity: 0.6, transition: "transform 0.2s", transform: activeDropdown === item.key ? "rotate(180deg)" : "none" }} />
                    </button>
                    {activeDropdown === item.key && (
                      <div className="nav-dropdown">
                        <div className="nav-dropdown-inner">
                          {dropdownData[item.key].map((link) => (
                            <a key={link.href} href={link.href} className="nav-dropdown-link">{link.title}</a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a key={item.label} href={item.href || "#"} style={navItemStyle} onMouseEnter={() => openDropdown(null)}>{item.label}</a>
                )
              )}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
              <button type="button" onClick={() => { setSearchOpen(o => !o); setActiveDropdown(null) }} aria-label="Search" style={{ background: "none", border: "none", cursor: "pointer", color: mainTextColor, padding: 6, display: "flex", alignItems: "center" }}>
                <Search size={20} />
              </button>
              <a href="/cart" aria-label="Cart" style={{ color: mainTextColor, padding: 6, display: "flex", alignItems: "center", textDecoration: "none" }}>
                <ShoppingCart size={20} />
              </a>
              <a href={ctaHref} className="nav-desktop" style={{ display: "inline-flex", alignItems: "center", padding: "8px 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", textDecoration: "none", borderRadius: 4, border: `1.5px solid ${transparentMode ? "rgba(255,255,255,0.5)" : "var(--color-primary)"}`, color: mainTextColor, background: "transparent", whiteSpace: "nowrap" }}>
                {ctaText}
              </a>
              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" className="nav-mobile-toggle" style={{ background: "none", border: "none", cursor: "pointer", color: mainTextColor, padding: 4, display: "none", alignItems: "center" }}>
                <MenuToggleIcon open={mobileMenuOpen} />
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="nav-search-bar">
              <div className="nav-search-pill">
                <div className="nav-search-inner">
                  <Search size={18} style={{ color: "#9ca3af", flexShrink: 0 }} />
                  <input
                    ref={searchInputRef}
                    className="nav-search-input"
                    type="text"
                    placeholder="Search products, pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="nav-search-close" onClick={() => setSearchOpen(false)}>
                    ESC <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {mobileMenuOpen && (
          <div className="nav-mobile-panel">
            <div style={{ position: "absolute", top: 16, right: 20 }}>
              <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}>
                <MenuToggleIcon open={true} />
              </button>
            </div>
            <nav style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {(["shop", "resources", "contractors", "about"] as const).map((key) => (
                <div key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <button className="nav-mob-btn" onClick={() => setMobileExpanded(e => e === key ? null : key)}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <ChevronDown size={16} style={{ transition: "transform 0.2s", transform: mobileExpanded === key ? "rotate(180deg)" : "none", opacity: 0.6 }} />
                  </button>
                  {mobileExpanded === key && (
                    <div style={{ paddingBottom: 8 }}>
                      {dropdownData[key].map((l) => (
                        <a key={l.href} href={l.href} className="nav-mob-sub">{l.title}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <a href="/deals" className="nav-mob-btn" style={{ textDecoration: "none", color: "#fff" }}>Deals</a>
              </div>
            </nav>
            <div style={{ marginTop: 24 }}>
              <a href={ctaHref} style={{ display: "block", textAlign: "center", padding: "12px 24px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", backgroundColor: "var(--color-primary)", borderRadius: 4, textDecoration: "none" }}>{ctaText}</a>
            </div>
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <a href={`tel:${phone?.replace(/[^\d+]/g, "")}`} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textDecoration: "none" }}>{phone}</a>
              <a href={contactHref} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textDecoration: "none" }}>{contactText}</a>
            </div>
          </div>
        )}
      </header>
    </>
  )
})

export default SiteNavbar
