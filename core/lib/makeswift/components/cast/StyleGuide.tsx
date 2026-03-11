"use client"

import { forwardRef, type Ref } from "react"

interface StyleGuideProps {
  className?: string
}

const COLORS = [
  { name: "Primary",   hex: "#004960", css: "--color-primary",   className: "text-color-primary" },
  { name: "Secondary", hex: "#005c7a", css: "--color-secondary",  className: "text-color-secondary" },
  { name: "Accent",    hex: "#057cb0", css: "--color-accent",     className: "text-color-accent" },
  { name: "Light",     hex: "#afe5fd", css: "--color-light",      className: "text-color-light" },
  { name: "Title",     hex: "#1a2332", css: "--color-title",      className: "text-color-title" },
  { name: "Body",      hex: "#4c586f", css: "--color-content",    className: "text-color-body" },
  { name: "White",     hex: "#ffffff", css: "—",                  className: "text-color-white" },
]

const StyleGuide = forwardRef(function StyleGuide(
  { className }: StyleGuideProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={className || ""} style={{ fontFamily: "'Barlow', sans-serif", color: "var(--color-title)" }}>
      <style>{`
        .sg-page { padding: 80px 0; }
        .sg-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 64px 64px;
          border-bottom: 1px solid #e5e7eb;
        }
        .sg-section:last-child { border-bottom: none; }
        .sg-section-label {
          display: inline-block;
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent);
          border-bottom: 2px solid var(--color-accent);
          padding-bottom: 6px;
          margin-bottom: 48px;
        }
        .sg-row { margin-bottom: 40px; }
        .sg-row:last-child { margin-bottom: 0; }
        .sg-class-tag {
          font-family: 'Barlow', monospace;
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.02em;
          margin-bottom: 8px;
          display: block;
        }
        .sg-colors { display: flex; flex-wrap: wrap; gap: 20px; }
        .sg-chip { width: 130px; }
        .sg-swatch {
          width: 130px; height: 88px;
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.08);
          margin-bottom: 10px;
        }
        .sg-chip-name { font-size: 13px; font-weight: 600; color: var(--color-title); margin-bottom: 2px; }
        .sg-chip-hex  { font-family: monospace; font-size: 11px; color: var(--color-content); margin-bottom: 2px; }
        .sg-chip-cls  { font-family: monospace; font-size: 10px; color: #9ca3af; }
        .sg-btns { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-end; }
        .sg-btn-group { display: flex; flex-direction: column; gap: 8px; }
        .sg-btn-label { font-size: 11px; color: #9ca3af; font-family: monospace; font-weight: 600; letter-spacing: 0.04em; }
        .sg-btn-primary {
          display: inline-flex; align-items: center;
          padding: 14px 28px; background: var(--color-primary); color: #fff;
          font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 600;
          border: none; cursor: pointer; border-radius: 4px; letter-spacing: 0.02em;
        }
        .sg-btn-secondary {
          display: inline-flex; align-items: center;
          padding: 12px 26px; background: transparent; color: var(--color-primary);
          font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 600;
          border: 2px solid var(--color-primary); cursor: pointer; border-radius: 4px;
        }
        .sg-btn-ghost {
          display: inline-flex; align-items: center;
          padding: 14px 0; background: transparent; color: var(--color-accent);
          font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 600;
          border: none; cursor: pointer; text-decoration: underline;
        }
        .sg-font-specimen { margin-bottom: 48px; }
        .sg-font-specimen:last-child { margin-bottom: 0; }
        .sg-font-name { font-size: 11px; color: #9ca3af; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
        .sg-font-big { font-size: 56px; font-weight: 700; line-height: 1; margin-bottom: 12px; color: var(--color-title); }
        .sg-font-alpha { font-size: 15px; color: var(--color-content); line-height: 1.8; }
        @media (max-width: 768px) {
          .sg-section { padding: 48px 32px; }
        }
      `}</style>

      <div className="sg-page">

        {/* Page header */}
        <div className="sg-section">
          <p className="text-style-overline" style={{ marginBottom: 20 }}>Client-First Style System</p>
          <h1 className="heading-style-h1" style={{ marginBottom: 24 }}>CAST Lighting Brand Guide</h1>
          <p className="text-size-large" style={{ maxWidth: 700 }}>
            This page defines every typography class, color, and button style used across the CAST Lighting website.
            All class names follow the <strong>Client-First</strong> naming convention — apply them in Makeswift's
            rich text editor or create matching Text Styles in the Design panel.
          </p>
        </div>

        {/* Headings */}
        <div className="sg-section">
          <div className="sg-section-label">Heading Styles</div>

          <div className="sg-row">
            <span className="sg-class-tag">.heading-style-h1 — Urbanist 700, 72px</span>
            <h1 className="heading-style-h1">Premium Landscape Lighting</h1>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.heading-style-h2 — Urbanist 700, 52px</span>
            <h2 className="heading-style-h2">Our Favorite Picks</h2>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.heading-style-h3 — Urbanist 600, 40px</span>
            <h3 className="heading-style-h3">The TradePro Advantage</h3>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.heading-style-h4 — Barlow 600, 28px</span>
            <h4 className="heading-style-h4">Why Contractors Choose CAST</h4>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.heading-style-h5 — Barlow 600, 22px</span>
            <h5 className="heading-style-h5">Lifetime Warranty Included</h5>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.heading-style-h6 — Barlow 700 Uppercase, 16px</span>
            <h6 className="heading-style-h6">Benefits for Contractors &amp; Installers</h6>
          </div>
        </div>

        {/* Text Sizes */}
        <div className="sg-section">
          <div className="sg-section-label">Text Sizes</div>

          <div className="sg-row">
            <span className="sg-class-tag">.text-style-overline — Barlow 700 Uppercase, 13px, accent color</span>
            <p className="text-style-overline">CAST vs Other Brands</p>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.text-size-xlarge — Barlow 400, 24px</span>
            <p className="text-size-xlarge" style={{ maxWidth: 720 }}>Professional-grade brass and copper fixtures trusted by contractors nationwide.</p>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.text-size-large — Barlow 400, 20px</span>
            <p className="text-size-large" style={{ maxWidth: 720 }}>Every CAST fixture is made from solid brass and copper alloys that will never rust or corrode.</p>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.text-size-medium — Barlow 400, 16px (default body)</span>
            <p className="text-size-medium" style={{ maxWidth: 720 }}>Designed for professional installers, our products are engineered for decades of reliable performance in any outdoor environment.</p>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.text-size-small — Barlow 400, 14px</span>
            <p className="text-size-small" style={{ maxWidth: 600 }}>All prices are listed in USD. Trade pricing available for verified contractors and licensed electricians.</p>
          </div>
          <div className="sg-row">
            <span className="sg-class-tag">.text-size-tiny — Barlow 400, 12px</span>
            <p className="text-size-tiny">© 2026 CAST Lighting. All rights reserved. Terms of Service · Privacy Policy</p>
          </div>
        </div>

        {/* Text Modifiers */}
        <div className="sg-section">
          <div className="sg-section-label">Text Modifiers</div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 32 }}>
            {[
              { cls: ".text-weight-bold",     label: "Bold (700)",      sample: "Bold Text Example" },
              { cls: ".text-weight-semibold", label: "Semibold (600)",  sample: "Semibold Text Example" },
              { cls: ".text-weight-medium",   label: "Medium (500)",    sample: "Medium Text Example" },
              { cls: ".text-weight-normal",   label: "Normal (400)",    sample: "Normal Text Example" },
              { cls: ".text-weight-light",    label: "Light (300)",     sample: "Light Text Example" },
              { cls: ".text-style-italic",    label: "Italic",          sample: "Italic Text Example" },
              { cls: ".text-style-allcaps",   label: "All Caps",        sample: "All Caps Example" },
              { cls: ".text-style-muted",     label: "Muted",           sample: "Muted Text Example" },
            ].map(({ cls, label, sample }) => (
              <div key={cls}>
                <span className="sg-class-tag">{cls} — {label}</span>
                <p className={cls.replace(".", "")} style={{ fontSize: 18, color: "var(--color-title)", margin: 0 }}>{sample}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Text Colors */}
        <div className="sg-section">
          <div className="sg-section-label">Text Colors</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { cls: "text-color-primary",   label: "Primary (#004960)",   bg: "transparent" },
              { cls: "text-color-secondary",  label: "Secondary (#005c7a)", bg: "transparent" },
              { cls: "text-color-accent",     label: "Accent (#057cb0)",    bg: "transparent" },
              { cls: "text-color-title",      label: "Title (#1a2332)",     bg: "transparent" },
              { cls: "text-color-body",       label: "Body (#4c586f)",      bg: "transparent" },
              { cls: "text-color-white",      label: "White (#ffffff)",     bg: "var(--color-title)" },
              { cls: "text-color-light",      label: "Light (#afe5fd)",     bg: "var(--color-primary)" },
            ].map(({ cls, label, bg }) => (
              <div key={cls} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="sg-class-tag" style={{ margin: 0, width: 200, flexShrink: 0 }}>.{cls}</span>
                <span className={cls} style={{ fontSize: 18, fontWeight: 600, background: bg, padding: bg !== "transparent" ? "4px 12px" : undefined, borderRadius: 4 }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Colors */}
        <div className="sg-section">
          <div className="sg-section-label">Brand Colors</div>
          <div className="sg-colors">
            {COLORS.map((c) => (
              <div key={c.name} className="sg-chip">
                <div
                  className="sg-swatch"
                  style={{
                    background: c.hex,
                    boxShadow: c.hex === "#ffffff" ? "inset 0 0 0 1px #e5e7eb" : undefined,
                  }}
                />
                <p className="sg-chip-name">{c.name}</p>
                <p className="sg-chip-hex">{c.hex}</p>
                <p className="sg-chip-cls">var({c.css})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="sg-section">
          <div className="sg-section-label">Buttons</div>
          <div className="sg-btns">
            <div className="sg-btn-group">
              <span className="sg-btn-label">.sg-btn-primary</span>
              <button className="sg-btn-primary">Shop Products</button>
            </div>
            <div className="sg-btn-group">
              <span className="sg-btn-label">.sg-btn-secondary</span>
              <button className="sg-btn-secondary">Learn More</button>
            </div>
            <div className="sg-btn-group">
              <span className="sg-btn-label">.sg-btn-ghost</span>
              <button className="sg-btn-ghost">Become a TradePro →</button>
            </div>
          </div>
        </div>

        {/* Font Specimens */}
        <div className="sg-section">
          <div className="sg-section-label">Font Families</div>
          <div className="sg-font-specimen">
            <p className="sg-font-name">Urbanist — Headings (H1, H2, H3)</p>
            <p className="sg-font-big" style={{ fontFamily: "'Urbanist', sans-serif" }}>Aa Bb Cc 123</p>
            <p className="sg-font-alpha" style={{ fontFamily: "'Urbanist', sans-serif" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz · 0123456789
            </p>
          </div>
          <div className="sg-font-specimen">
            <p className="sg-font-name">Barlow — Body, UI, Labels (H4–H6, all body text)</p>
            <p className="sg-font-big" style={{ fontFamily: "'Barlow', sans-serif" }}>Aa Bb Cc 123</p>
            <p className="sg-font-alpha" style={{ fontFamily: "'Barlow', sans-serif" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
              abcdefghijklmnopqrstuvwxyz · 0123456789
            </p>
          </div>
        </div>

      </div>
    </div>
  )
})

export default StyleGuide
