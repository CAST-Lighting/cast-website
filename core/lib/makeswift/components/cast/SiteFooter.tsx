"use client"
import { forwardRef, type Ref } from "react"
import { Facebook, Instagram, Youtube, Linkedin, Phone, MapPin } from "lucide-react"

const footerLinks = {
  Products: ["Path Lights", "Spot Lights", "Wall Wash", "Well Lights", "Deck Lights", "Transformers"],
  Resources: ["Product Catalog", "Installation Guides", "Design Tips", "Case Studies", "FAQs"],
  Company: ["About CAST", "Careers", "Contact Us", "Dealer Locator", "Blog"],
  Support: ["Warranty Info", "Returns", "Shipping", "Technical Support", "Trade Pro Program"]
}

const SiteFooter = forwardRef(function SiteFooter(
  { className }: { className?: string },
  ref: Ref<HTMLElement>
) {
  return (
    <footer ref={ref} className={`border-t border-border py-16 bg-[#004a61] ${className || ""}`}>
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-1">
            <a href="/" className="heading-style-h5 tracking-wider text-foreground">
              CAST <span className="text-primary">LIGHTING</span>
            </a>
            <p className="text-size-small text-muted-foreground mt-4 leading-relaxed">
              Professional-grade landscape lighting trusted by contractors since 2001.
            </p>
            <div className="flex items-start gap-2 mt-4 text-size-small text-muted-foreground">
              <Phone className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>(800) 555-CAST</span>
            </div>
            <div className="flex items-start gap-2 mt-2 text-size-small text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <span>Pine Brook, NJ 07058</span>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Linkedin, href: "#", label: "LinkedIn" }].
                map(({ icon: Icon, href, label }) =>
                  <a key={label} href={href} aria-label={label} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) =>
            <div key={title}>
              <h4 className="heading-style-h6 tracking-wider text-foreground mb-4 uppercase" style={{ fontSize: '14px' }}>{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) =>
                  <li key={link}>
                    <a href="#" className="text-size-small text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-size-small text-muted-foreground">
            &copy; 2026 CAST Lighting. All rights reserved.
          </p>
          <div className="flex gap-6 text-size-small text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default SiteFooter
