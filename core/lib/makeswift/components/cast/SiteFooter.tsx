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
}

const SiteFooter = forwardRef(function SiteFooter(
  {
    className,
    logoText = "CAST LIGHTING",
    logoImage,
    phone = "(973) 423-2303",
    email = "info@castlighting.com",
    address = "Serving Contractors Nationwide",
    linkGroups = [
      {
        title: "Products",
        links: [
          { text: "Path Lights", url: "/products/path-lights" },
          { text: "Spot Lights", url: "/products/spot-lights" },
          { text: "Well Lights", url: "/products/well-lights" },
          { text: "Transformers", url: "/products/transformers" },
        ],
      },
      {
        title: "Company",
        links: [
          { text: "About", url: "/about" },
          { text: "TradePro", url: "/tradepro" },
          { text: "Training", url: "/training" },
          { text: "Blog", url: "/blog" },
        ],
      },
      {
        title: "Support",
        links: [
          { text: "Contact", url: "/contact" },
          { text: "Install Guides", url: "/guides" },
          { text: "Find a Contractor", url: "/contractors" },
          { text: "Warranty", url: "/warranty" },
        ],
      },
    ],
    copyrightText = "\u00a9 2026 CAST Lighting. All rights reserved.",
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
    facebookUrl = "#",
    instagramUrl = "#",
    linkedinUrl = "#",
    youtubeUrl = "#",
  }: SiteFooterProps,
  ref: Ref<HTMLElement>
) {
  return (
    <>
      <style>{`
        .sf2 {
          width: 100%;
          box-sizing: border-box;
          background: unset;
          position: relative;
          overflow: hidden;
        }
        .sf2-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
          pointer-events: none;
        }
        .sf2-inner {
          padding-top: 80px;
          padding-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .sf2-top {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 56px;
        }
        .sf2-brand {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .sf2-logo {
          font-family: 'Barlow', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.08em;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sf2-logo-mark {
          width: 28px;
          height: 28px;
          background: rgba(0,73,96,0.15);
          border: 1px solid rgba(0,73,96,0.4);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sf2-logo-mark svg {
          width: 16px;
          height: 16px;
          color: var(--color-primary);
        }
        .sf2-tagline {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.45);
          margin: 0;
          max-width: 280px;
        }
        .sf2-contact-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }
        .sf2-contact-link {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sf2-contact-link:hover { color: var(--color-primary); }
        .sf2-contact-link svg { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.5; }
        .sf2-brand-socials { display: flex; gap: 12px; margin-top: 8px; }
        .sf2-brand-socials a {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); transition: color 0.2s, background 0.2s, border-color 0.2s;
        }
        .sf2-brand-socials a:hover { color: #ffffff; background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
        .sf2-brand-socials a svg { width: 16px; height: 16px; }
        .sf2-link-col { display: flex; flex-direction: column; gap: 16px; }
        .sf2-link-title {
          font-family: 'Barlow', sans-serif; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); margin: 0;
        }
        .sf2-link-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .sf2-link-list a {
          font-family: 'Barlow', sans-serif; font-size: 14px; color: rgba(255,255,255,0.55);
          text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.2s;
        }
        .sf2-link-list a:hover { color: var(--color-primary); }
        .sf2-link-dot {
          width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.15);
          flex-shrink: 0; transition: background 0.2s, width 0.2s;
        }
        .sf2-link-list a:hover .sf2-link-dot { background: var(--color-primary); width: 14px; border-radius: 3px; }
        .sf2-bottom {
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .sf2-copyright { font-family: 'Barlow', sans-serif; font-size: 12px; color: rgba(255,255,255,0.25); margin: 0; }
        .sf2-bottom-right { display: flex; align-items: center; gap: 24px; }
        .sf2-socials { display: flex; gap: 16px; padding-right: 24px; border-right: 1px solid rgba(255,255,255,0.08); }
        .sf2-socials a { color: rgba(255,255,255,0.3); transition: color 0.2s; display: flex; }
        .sf2-socials a:hover { color: #ffffff; }
        .sf2-socials a svg { width: 18px; height: 18px; }
        .sf2-status {
          display: flex; align-items: center; gap: 8px; padding: 4px 12px;
          border-radius: 999px; background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.12);
        }
        .sf2-status-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
          animation: sf2pulse 2s ease-in-out infinite;
        }
        @keyframes sf2pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .sf2-status-text {
          font-family: 'Barlow', sans-serif; font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em; color: rgba(34,197,94,0.7);
        }
        @media (max-width: 1023px) {
          .sf2-top { grid-template-columns: 1fr 1fr; gap: 40px; }
          .sf2-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 767px) {
          .sf2-inner { padding-top: 56px; padding-bottom: 32px; }
          .sf2-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .sf2-bottom { flex-direction: column; align-items: flex-start; gap: 20px; }
          .sf2-socials { border-right: none; padding-right: 0; }
        }
        @media (max-width: 479px) {
          .sf2-top { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>

      <footer ref={ref} className={`sf2 ${className || ""}`} style={{ backgroundColor: bgColor || "#111827" }}>
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        <div className="sf2-grid-bg" aria-hidden="true" />
        <div className="sf2-inner site-container">
          <div className="sf2-top">
            <div className="sf2-brand">
              <a href="/" className="sf2-logo">
                {logoImage ? (
                  <img src={logoImage} alt={logoText || "Logo"} style={{ height: "32px", width: "auto" }} />
                ) : (
                  <>
                    <span className="sf2-logo-mark">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </span>
                    {logoText}
                  </>
                )}
              </a>
              <p className="sf2-tagline">Professional landscape lighting manufacturer. Solid bronze &amp; brass fixtures engineered for contractors.</p>
              <div className="sf2-contact-row">
                <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="sf2-contact-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" /></svg>
                  {phone}
                </a>
                <a href={`mailto:${email}`} className="sf2-contact-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  {email}
                </a>
                <span className="sf2-contact-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" /></svg>
                  {address}
                </span>
              </div>
              <div className="sf2-brand-socials">
                {facebookUrl && <a href={facebookUrl} aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>}
                {instagramUrl && <a href={instagramUrl} aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>}
                {linkedinUrl && <a href={linkedinUrl} aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>}
                {youtubeUrl && <a href={youtubeUrl} aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>}
              </div>
            </div>
            {linkGroups.map((group, i) => (
              <div className="sf2-link-col" key={i}>
                <h4 className="sf2-link-title">{group.title}</h4>
                <ul className="sf2-link-list">
                  {group.links.map((link, j) => (
                    <li key={j}><a href={link.url}><span className="sf2-link-dot" />{link.text}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="sf2-bottom">
            <p className="sf2-copyright">{copyrightText}</p>
            <div className="sf2-bottom-right">
              <div className="sf2-socials">
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></a>
                <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
                <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
              </div>
              <div className="sf2-status">
                <div className="sf2-status-dot" />
                <span className="sf2-status-text">All Systems Normal</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
})

export default SiteFooter
