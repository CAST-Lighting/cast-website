"use client"

import { forwardRef, Ref } from "react"

interface FooterLink {
  text: string
  url: string
}

interface LinkGroup {
  title: string
  links: FooterLink[]
}

interface SiteFooterProps {
  className?: string
  logoText?: string
  logoImage?: string
  phone?: string
  email?: string
  address?: string
  linkGroups?: LinkGroup[]
  copyrightText?: string
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  privacyUrl?: string
  termsUrl?: string
}

const SiteFooter = forwardRef(function SiteFooter(
  {
    className,
    logoText = "CAST LIGHTING",
    logoImage,
    phone = "(973) 423-2303",
    email = "info@castlighting.com",
    address = "Pine Brook, NJ 07058",
    linkGroups = [
      {
        title: "Products",
        links: [
          { text: "Path Lights", url: "/products/path-lights" },
          { text: "Spot Lights", url: "/products/spot-lights" },
          { text: "Wall Wash", url: "/products/wall-wash" },
          { text: "Well Lights", url: "/products/well-lights" },
          { text: "Deck Lights", url: "/products/deck-lights" },
          { text: "Transformers", url: "/products/transformers" },
        ],
      },
      {
        title: "Resources",
        links: [
          { text: "Product Catalog", url: "/resources/catalog" },
          { text: "Installation Guides", url: "/resources/installation-guides" },
          { text: "Design Tips", url: "/resources/design-tips" },
          { text: "Case Studies", url: "/resources/case-studies" },
          { text: "FAQs", url: "/resources/faqs" },
        ],
      },
      {
        title: "Company",
        links: [
          { text: "About CAST", url: "/about" },
          { text: "Careers", url: "/careers" },
          { text: "Contact Us", url: "/contact" },
          { text: "Dealer Locator", url: "/dealers" },
          { text: "Blog", url: "/blog" },
        ],
      },
      {
        title: "Support",
        links: [
          { text: "Warranty Info", url: "/warranty" },
          { text: "Returns", url: "/returns" },
          { text: "Shipping", url: "/shipping" },
          { text: "Technical Support", url: "/support" },
          { text: "Trade Pro Program", url: "/tradepro" },
        ],
      },
    ],
    copyrightText = "© 2026 CAST Lighting. All rights reserved.",
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
    facebookUrl = "#",
    instagramUrl = "#",
    linkedinUrl = "#",
    youtubeUrl = "#",
    privacyUrl = "#",
    termsUrl = "#",
  }: SiteFooterProps,
  ref: Ref<HTMLElement>
) {
  // Exact Lovable color translations
  const BG = "#004a61"
  const BORDER = "rgba(127,190,232,0.15)"
  const FG = "#f0f5f7"
  const MUTED = "#8aa4ae"
  const PRIMARY = "#7ebee8"
  const SOCIAL_BG = "#1e3d50"

  return (
    <>
      <style>{`
        .lf-footer {
          width: 100%;
          box-sizing: border-box;
          background: #004a61;
          border-top: 1px solid rgba(127,190,232,0.15);
        }
        .lf-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 64px 24px;
        }
        .lf-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }
        .lf-logo {
          font-family: 'Barlow', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 16px;
          color: #f0f5f7;
        }
        .lf-logo-accent { color: #7ebee8; }
        .lf-tagline {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: #8aa4ae;
          margin: 0 0 16px;
        }
        .lf-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: #8aa4ae;
          text-decoration: none;
          margin-bottom: 8px;
          transition: color 0.15s;
        }
        .lf-contact-item:hover { color: #7ebee8; }
        .lf-contact-item svg { flex-shrink: 0; margin-top: 2px; color: #7ebee8; }
        .lf-socials {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 20px;
        }
        .lf-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1e3d50;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8aa4ae;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
        }
        .lf-social-btn:hover { color: #7ebee8; background: rgba(126,190,232,0.15); }
        .lf-social-btn svg { width: 16px; height: 16px; }
        .lf-col-title {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #f0f5f7;
          margin: 0 0 16px;
        }
        .lf-link-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .lf-link-list a {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: #8aa4ae;
          text-decoration: none;
          transition: color 0.15s;
        }
        .lf-link-list a:hover { color: #7ebee8; }
        .lf-bottom {
          border-top: 1px solid rgba(127,190,232,0.15);
          padding-top: 32px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .lf-copyright {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: #8aa4ae;
          margin: 0;
        }
        .lf-bottom-links {
          display: flex;
          gap: 24px;
        }
        .lf-bottom-links a {
          font-family: 'Barlow', sans-serif;
          font-size: 13px;
          color: #8aa4ae;
          text-decoration: none;
          transition: color 0.15s;
        }
        .lf-bottom-links a:hover { color: #7ebee8; }
        @media (max-width: 1023px) {
          .lf-grid { grid-template-columns: 1fr 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 767px) {
          .lf-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .lf-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
          .lf-container { padding: 48px 20px; }
        }
        @media (max-width: 479px) {
          .lf-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>

      <footer
        ref={ref}
        className={`lf-footer ${className || ""}`}
        style={{ position: "relative" }}
      >
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}

        <div className="lf-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="lf-grid">
            {/* Brand column */}
            <div>
              <a href="/" className="lf-logo">
                {logoImage ? (
                  <img src={logoImage} alt={logoText || "Logo"} style={{ height: 32, width: "auto" }} />
                ) : (
                  <>CAST <span className="lf-logo-accent">LIGHTING</span></>
                )}
              </a>
              <p className="lf-tagline">
                Professional-grade landscape lighting trusted by contractors since 2001.
              </p>
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="lf-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-.51a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>{phone}</span>
              </a>
              <span className="lf-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{address}</span>
              </span>
              <div className="lf-socials">
                {facebookUrl && (
                  <a href={facebookUrl} className="lf-social-btn" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                  </a>
                )}
                {instagramUrl && (
                  <a href={instagramUrl} className="lf-social-btn" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                )}
                {youtubeUrl && (
                  <a href={youtubeUrl} className="lf-social-btn" aria-label="YouTube">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                )}
                {linkedinUrl && (
                  <a href={linkedinUrl} className="lf-social-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                )}
              </div>
            </div>

            {/* Link columns */}
            {linkGroups.map((group, i) => (
              <div key={i}>
                <h4 className="lf-col-title">{group.title}</h4>
                <ul className="lf-link-list">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="lf-bottom">
            <p className="lf-copyright">{copyrightText}</p>
            <div className="lf-bottom-links">
              <a href={privacyUrl || "#"}>Privacy Policy</a>
              <a href={termsUrl || "#"}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
})

export default SiteFooter
