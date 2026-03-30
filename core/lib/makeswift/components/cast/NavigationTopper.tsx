"use client"
import { forwardRef, type Ref } from "react"
import { Phone } from "lucide-react"

const NavigationTopper = forwardRef(function NavigationTopper(
  {
    className,
    bgColor,
    leftLinks,
    rightLinks,
    phoneNumber,
  }: {
    className?: string
    bgColor?: string
    leftLinks?: { label?: string; href?: string }[]
    rightLinks?: { label?: string; href?: string }[]
    phoneNumber?: string
  },
  ref: Ref<HTMLDivElement>
) {
  const resolvedLeft = leftLinks && leftLinks.length > 0
    ? leftLinks
    : [
        { label: "EASY CONTRACTOR PRICING", href: "/trade-pro" },
        { label: "BECOME A TRADE PRO", href: "/trade-pro" },
      ]

  const resolvedRight = rightLinks && rightLinks.length > 0
    ? rightLinks
    : [{ label: "Contact Us", href: "/contact" }]

  const resolvedPhone = phoneNumber || "(973) 423-2303"

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-[51] border-b backdrop-blur-md border-[#004a61] ${className || ""}`}
      style={{ background: bgColor || "rgba(0,51,68,0.85)" }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-2 text-sm font-body">
        <div className="flex items-center gap-4">
          {resolvedLeft.map((link, i) => (
            <span key={i} className="flex items-center gap-4">
              {i > 0 && <span className="text-muted-foreground hidden sm:inline">|</span>}
              <a
                href={link.href || "/trade-pro"}
                className={
                  i === 0
                    ? "text-primary hover:text-warm-glow transition-colors font-semibold tracking-wide"
                    : "text-secondary-foreground hover:text-primary transition-colors hidden sm:inline tracking-wide"
                }
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${resolvedPhone.replace(/\D/g, "")}`}
            className="flex items-center gap-1.5 text-secondary-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{resolvedPhone}</span>
          </a>
          {resolvedRight.map((link, i) => (
            <span key={i} className="flex items-center gap-4">
              <span className="text-muted-foreground">|</span>
              <a
                href={link.href || "/contact"}
                className="text-secondary-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})

export default NavigationTopper
