"use client"
import { forwardRef, type Ref } from "react"
import { Phone } from "lucide-react"

const NavigationTopper = forwardRef(function NavigationTopper(
  {
    className,
    bgColor,
    leftLink1Text,
    leftLink1Href,
    leftLink2Text,
    leftLink2Href,
    phone,
    rightLinkText,
    rightLinkHref,
  }: {
    className?: string
    bgColor?: string
    leftLink1Text?: string
    leftLink1Href?: string
    leftLink2Text?: string
    leftLink2Href?: string
    phone?: string
    rightLinkText?: string
    rightLinkHref?: string
  },
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-[51] border-b backdrop-blur-md border-[#004a61] ${className || ""}`}
      style={{ background: bgColor || "rgba(0,51,68,0.85)" }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-2 text-sm font-body">
        <div className="flex items-center gap-4">
          <a
            href={leftLink1Href || "/trade-pro"}
            className="text-primary hover:text-warm-glow transition-colors font-semibold tracking-wide"
          >
            {leftLink1Text || "EASY CONTRACTOR PRICING"}
          </a>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <a
            href={leftLink2Href || "/trade-pro"}
            className="text-secondary-foreground hover:text-primary transition-colors hidden sm:inline tracking-wide"
          >
            {leftLink2Text || "BECOME A TRADE PRO"}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${(phone || "(973) 423-2303").replace(/\D/g, "")}`}
            className="flex items-center gap-1.5 text-secondary-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{phone || "(973) 423-2303"}</span>
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href={rightLinkHref || "/contact"}
            className="text-secondary-foreground hover:text-primary transition-colors"
          >
            {rightLinkText || "Contact Us"}
          </a>
        </div>
      </div>
    </div>
  )
})

export default NavigationTopper
