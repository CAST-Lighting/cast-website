"use client"
import { forwardRef, type Ref, useState, useRef, useEffect } from "react"
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react"

interface NavItem {
  label: string
  href?: string
  dropdown?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: "SHOP",
    href: "/category/23",
    dropdown: [
      { label: "All Products", href: "/category/23" },
      { label: "Path & Area Lights", href: "/category/26" },
      { label: "Spot & Accent Lights", href: "/category/31" },
      { label: "Well & In-Ground Lights", href: "/category/35" },
      { label: "Step & Deck Lights", href: "/category/30" },
      { label: "Down Lights", href: "/category/32" },
      { label: "Transformers", href: "/category/45" },
      { label: "Accessories", href: "/category/19" },
    ],
  },
  { label: "DEALS", href: "/shop" },
  {
    label: "RESOURCES",
    dropdown: [
      { label: "Installation Guides", href: "/shop" },
      { label: "Technical Support", href: "/shop" },
      { label: "Trainings & Events", href: "/shop" },
      { label: "Downloads", href: "/shop" },
    ],
  },
  {
    label: "CONTRACTORS",
    dropdown: [
      { label: "TradePro Program", href: "/trade-pro" },
      { label: "Find a Contractor", href: "/contractor-finder" },
      { label: "Find a Distributor", href: "/distributor-finder" },
      { label: "Become a Retailer", href: "/retail-signup" },
    ],
  },
  { label: "ABOUT", href: "/about" },
]

const SiteNavbar = forwardRef(function SiteNavbar(
  {
    className,
    lineHeight,
  }: {
    className?: string
    lineHeight?: number
  },
  ref: Ref<HTMLElement>
) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <header
      ref={ref}
      className={`fixed left-0 right-0 z-50 ${className || ""}`}
      style={{ top: 36, '--section-line-height': lineHeight } as React.CSSProperties}
    >
      {/* Main nav */}
      <nav className="backdrop-blur-md border-b border-[#004a61] bg-[#005C7A]/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center">
            <img src="/images/logos/cast__lighting_white.svg" alt="CAST Lighting" className="h-10 w-auto" />
          </a>

          <div className="hidden lg:flex items-center gap-8 font-body font-medium text-sm tracking-wide">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
              >
                <a
                  href={item.href || "#"}
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
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-secondary-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="text-secondary-foreground hover:text-primary transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="text-secondary-foreground hover:text-primary transition-colors" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
            </button>
            <a
              href="#"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-warm-glow transition-colors"
            >
              LOGIN / SIGNUP
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
              <Search className="w-5 h-5 text-muted-foreground/60 flex-shrink-0" />
              <input
                type="text"
                placeholder="I am looking for ..."
                autoFocus
                className="w-full bg-transparent text-gray-900 placeholder:text-muted-foreground/50 focus:outline-none font-body text-lg"
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-card border-t border-border px-6 py-4 space-y-1 font-body">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    item.dropdown ?
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label) :
                      undefined
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
                        key={sub.label}
                        href={sub.href}
                        className="block text-sm text-muted-foreground hover:text-primary py-1.5"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#" className="block w-full text-center px-5 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm mt-2">
              LOGIN / SIGNUP
            </a>
          </div>
        )}
      </nav>
      {/* Cart Drawer */}
      {cartOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={() => setCartOpen(false)}
          />
          {/* Slide-in panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-card border-l border-border z-[101] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-lg font-semibold font-display text-foreground">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Body */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground/40" />
              <p className="text-secondary-foreground font-body">Your cart is empty.</p>
              <a
                href="/shop"
                onClick={() => setCartOpen(false)}
                className="inline-flex items-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-warm-glow transition-colors"
              >
                Shop Now
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  )
})

export default SiteNavbar
