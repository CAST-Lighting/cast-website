"use client"

import { forwardRef, useState, useRef, useEffect, type Ref } from "react"
import { Phone, ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react"

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

const navItems = [
  {
    label: "SHOP",
    dropdown: ["Path Lights", "Spot Lights", "Well Lights", "Wall Washes", "Deck Lights", "Transformers", "Accessories"],
  },
  { label: "DEALS" },
  {
    label: "RESOURCES",
    dropdown: ["Installation Guides", "Technical Support", "Trainings & Events", "Downloads"],
  },
  {
    label: "CONTRACTORS",
    dropdown: ["TradePro", "Support", "Login"],
  },
  { label: "ABOUT" },
]

const SiteNavbar = forwardRef(function SiteNavbar(
  {
    className,
    transparentMode = true,
    bgColor,
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const navBg = transparentMode && !scrolled
    ? "transparent"
    : bgColor || "rgba(0,92,122,0.92)"

  return (
    <header
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-50 font-body ${className || ""}`}
    >
      <nav
        style={{ backgroundColor: navBg, transition: "background-color 0.3s" }}
        className="backdrop-blur-md border-b border-[#004a61]"
      >
        <div className="site-container flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="font-heading text-2xl font-bold tracking-wider text-foreground shrink-0">
            {logoImage ? (
              <img src={logoImage} alt={logoText || "Logo"} style={{ height: 36, width: "auto", objectFit: "contain" }} />
            ) : (
              <>CAST <span className="text-primary">LIGHTING</span></>
            )}
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8 font-body font-medium text-sm tracking-wide">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
              >
                <a
                  href="#"
                  className="flex items-center gap-1 text-secondary-foreground hover:text-primary transition-colors py-2"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </a>
                {item.dropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="min-w-[200px] rounded-lg border border-border bg-card/95 backdrop-blur-md shadow-lg py-2">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-4 py-2.5 text-sm text-secondary-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              className="text-secondary-foreground hover:text-primary transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="text-secondary-foreground hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <a
              href={ctaHref}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-warm-glow transition-colors"
            >
              {ctaText}
            </a>
            <button
              className="lg:hidden text-secondary-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="flex justify-center py-4 px-6">
            <div className="w-full max-w-3xl bg-white rounded-full shadow-lg px-8 py-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="I am looking for ..."
                autoFocus
                className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-lg"
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    item.dropdown
                      ? setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      : undefined
                  }
                  className="flex items-center justify-between w-full text-secondary-foreground hover:text-primary py-2"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {item.dropdown && mobileExpanded === item.label && (
                  <div className="pl-4 pb-2 space-y-1">
                    {item.dropdown.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block text-sm text-muted-foreground hover:text-primary py-1.5"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-border space-y-3">
              <a
                href={`tel:${phone?.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-2 text-sm text-secondary-foreground hover:text-primary py-1"
              >
                <Phone className="w-4 h-4" />
                {phone}
              </a>
              <a
                href={ctaHref}
                className="block w-full text-center px-5 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm"
              >
                {ctaText}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
})

export default SiteNavbar
