"use client";

import { forwardRef, type Ref } from "react";

export interface ComparisonItem {
  title?: string;
  description?: string;
}

export interface ComparisonSectionProps {
  className?: string;
  sectionStyle?: string;
  subtitle?: string;
  heading?: string;
  description?: string;
  castItems?: ComparisonItem[];
  otherItems?: ComparisonItem[];
  castHeading?: string;
  otherHeading?: string;
  bgImage?: string;
  bgColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  castCardBgColor?: string;
  otherCardBgColor?: string;
}

const defaultCastItems: ComparisonItem[] = [
  {
    title: "Made in the USA",
    description:
      "Solid cast bronze and brass fixtures engineered and manufactured in the United States.",
  },
  {
    title: "Contractor-Only Pricing & Dealer Protection",
    description:
      "TradePro accounts, tiered pricing, and protected relationships — never compete with retail.",
  },
  {
    title: "Complete Lighting Systems",
    description:
      "Fixtures, transformers, controls, wire, and accessories designed to work together.",
  },
  {
    title: "Unmatched Durability",
    description:
      "Cast metals, serviceable components, and long-term parts availability — built for decades, not seasons.",
  },
  {
    title: "Professional Support & Design Help",
    description:
      "Application guidance, system design assistance, and technical support from real lighting experts.",
  },
  {
    title: "Training & Education",
    description:
      "In-person training, online resources, and continuing education to help you grow your business.",
  },
];

const defaultOtherItems: ComparisonItem[] = [
  {
    title: "Aluminum or Composite Housings",
    description:
      "Lightweight aluminum and composite fixtures are prone to corrosion, cracking, and finish failure over time.",
  },
  {
    title: "Limited Professional Support",
    description:
      "Many mass-market brands offer minimal technical assistance, relying on generic customer service.",
  },
  {
    title: "No Dealer Protection",
    description:
      "Without dealer protection or pricing programs, margins are reduced and contractor relationships are not protected.",
  },
  {
    title: "Short Product Life Cycles",
    description:
      "Consumer brands frequently change product lines, discontinue fixtures, or update designs with little notice.",
  },
  {
    title: "Degraded Fixture Technology",
    description:
      "Most fixtures are not built to withstand the elements, often resulting in call-backs or redesigns.",
  },
  {
    title: "No Ongoing Training",
    description:
      "Little to no educational resources, leaving contractors without the knowledge to sell and install effectively.",
  },
];

const ComparisonSection = forwardRef(function ComparisonSection(
  {
    className,
    sectionStyle,
    subtitle = "CAST vs Other Brands",
    heading = "Why Contractors Choose CAST Lighting",
    description = "CAST Lighting is a professional landscape lighting manufacturer specializing in contractor-grade outdoor lighting systems, low-voltage fixtures, and complete installation solutions.",
    castItems = defaultCastItems,
    otherItems = defaultOtherItems,
    castHeading = "CAST Advantages",
    otherHeading = "Other Lighting Brands",
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
    castCardBgColor,
    otherCardBgColor,
  }: ComparisonSectionProps,
  ref: Ref<HTMLElement>
) {
  return (
    <>
      <style>{`
        .comp-section {
          width: 100%;
          box-sizing: border-box;
          background: unset;
        }
        .comp-inner {
        }
        .comp-header {
          max-width: 800px;
          margin-bottom: 48px;
        }
        .comp-subtitle {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .comp-heading {
          font-family: 'Barlow', sans-serif;
          font-size: var(--h2-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          color: var(--color-title);
          margin: 0 0 20px;
        }
        .comp-desc {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-size, 18px);
          font-weight: 400;
          line-height: var(--body-line-height, 1.6);
          color: #4c586f;
          margin: 0;
        }
        .comp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        /* CAST card — dark premium */
        .comp-cast-card {
          background: #111827;
          border-radius: 16px;
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
        }
        .comp-cast-card::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(0,73,96,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .comp-cast-card::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0,73,96,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .comp-card-heading {
          font-family: 'Barlow', sans-serif;
          font-size: var(--h3-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          margin: 0 0 32px;
          position: relative;
          z-index: 1;
        }
        .comp-cast-card .comp-card-heading {
          color: #ffffff;
        }
        .comp-cast-card .comp-card-heading::after {
          content: '';
          display: block;
          width: 48px;
          height: 3px;
          background: var(--color-primary);
          margin-top: 16px;
          border-radius: 2px;
        }
        .comp-item {
          display: flex;
          gap: 16px;
          position: relative;
          z-index: 1;
        }
        .comp-item + .comp-item {
          margin-top: 28px;
          padding-top: 28px;
        }
        .comp-cast-card .comp-item + .comp-item {
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .comp-item-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
        }
        .comp-cast-card .comp-item-icon {
          background: rgba(34, 197, 94, 0.15);
        }
        .comp-cast-card .comp-item-icon svg {
          width: 16px;
          height: 16px;
          color: #22c55e;
        }
        .comp-item-title {
          font-family: 'Barlow', sans-serif;
          font-size: var(--h5-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          margin: 0 0 6px;
        }
        .comp-cast-card .comp-item-title {
          color: #ffffff;
        }
        .comp-item-desc {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-sm-size, 15px);
          font-weight: 400;
          line-height: var(--body-line-height, 1.6);
          margin: 0;
        }
        .comp-cast-card .comp-item-desc {
          color: rgba(255,255,255,0.6);
        }

        /* Other brands card — light muted */
        .comp-other-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 40px 36px;
          border: 1px solid #eaeaea;
        }
        .comp-other-card .comp-card-heading {
          color: #6b7280;
        }
        .comp-other-card .comp-card-heading::after {
          content: '';
          display: block;
          width: 48px;
          height: 3px;
          background: #d1d5db;
          margin-top: 16px;
          border-radius: 2px;
        }
        .comp-other-card .comp-item + .comp-item {
          border-top: 1px solid #f3f4f6;
        }
        .comp-other-card .comp-item-icon {
          background: rgba(239, 68, 68, 0.1);
        }
        .comp-other-card .comp-item-icon svg {
          width: 14px;
          height: 14px;
          color: #ef4444;
        }
        .comp-other-card .comp-item-title {
          color: #6b7280;
        }
        .comp-other-card .comp-item-desc {
          color: #9ca3af;
        }

        @media (max-width: 1023px) {
          .comp-cast-card,
          .comp-other-card {
            padding: 32px 28px;
          }
        }
        @media (max-width: 767px) {
          .comp-grid {
            grid-template-columns: 1fr;
          }
          .comp-cast-card,
          .comp-other-card {
            padding: 28px 20px;
          }
          .comp-item + .comp-item {
            margin-top: 20px;
            padding-top: 20px;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`comp-section ${sectionStyle || ""} ${className || ""}`}
        style={{ position: "relative", backgroundColor: bgColor || "#f6f7f8" }}
      >
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        <div className="comp-inner site-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="comp-header">
            <p className="comp-subtitle">{subtitle}</p>
            <h2 className="comp-heading">{heading}</h2>
            <p className="comp-desc">{description}</p>
          </div>

          <div className="comp-grid">
            {/* CAST Advantages */}
            <div className="comp-cast-card" style={castCardBgColor ? { background: castCardBgColor } : undefined}>
              <h3 className="comp-card-heading">{castHeading}</h3>
              {castItems.map((item, i) => (
                <div key={i} className="comp-item">
                  <div className="comp-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="comp-item-title">{item.title}</h4>
                    <p className="comp-item-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Brands */}
            <div className="comp-other-card" style={otherCardBgColor ? { background: otherCardBgColor } : undefined}>
              <h3 className="comp-card-heading">{otherHeading}</h3>
              {otherItems.map((item, i) => (
                <div key={i} className="comp-item">
                  <div className="comp-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="comp-item-title">{item.title}</h4>
                    <p className="comp-item-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default ComparisonSection;
