"use client";

import { forwardRef, type Ref } from "react";

export interface TradeProCard {
  icon?: string;
  title?: string;
  description?: string;
}

export interface TradeProSectionProps {
  className?: string;
  sectionStyle?: string;
  subtitle?: string;
  heading?: string;
  description?: string;
  cards?: TradeProCard[];
  buttonText?: string;
  buttonHref?: string;
  bgImage?: string;
  bgColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

const defaultCards: TradeProCard[] = [
  {
    title: "Discounted Pricing & Free Shipping",
    description:
      "Exclusive contractor pricing on all CAST products with free shipping on every order, no minimums required.",
  },
  {
    title: "Customized Support, Training & Education",
    description:
      "Dedicated account reps, hands-on installation training, and technical resources to grow your business.",
  },
  {
    title: "Social Media & Recognition",
    description:
      "Get featured on CAST social channels, receive co-branded marketing materials, and build your reputation.",
  },
  {
    title: "Events, Workshops, & Business Growth",
    description:
      "Access to exclusive trade events, design workshops, and business development tools to scale your company.",
  },
];

const defaultIcons = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
];

const TradeProSection = forwardRef(function TradeProSection(
  {
    className,
    sectionStyle,
    subtitle = "Benefits for Contractors & Installers",
    heading = "The TradePro Advantage",
    description = "Access professional products with lifetime warranties that give you design control in the field.",
    cards = defaultCards,
    buttonText = "Learn More About TradePro",
    buttonHref = "#",
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: TradeProSectionProps,
  ref: Ref<HTMLElement>
) {
  return (
    <>
      <style>{`
        .tp-section {
          width: 100%;
          box-sizing: border-box;
        }
        .tp-header {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 64px;
        }
        .tp-subtitle {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #7ebee8;
          margin: 0 0 14px;
        }
        .tp-heading {
          font-family: 'Essonnes', 'Playfair Display', serif;
          font-size: var(--h2-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          color: #e2edf2;
          margin: 0 0 18px;
        }
        .tp-desc {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-size, 18px);
          font-weight: 400;
          line-height: 1.65;
          color: #90a4ae;
          margin: 0;
        }
        .tp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 56px;
        }
        .tp-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 32px 20px;
          background: #1e2d38;
          border: 1px solid rgba(127,190,232,0.12);
          border-radius: 16px;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .tp-card:hover {
          border-color: rgba(127,190,232,0.28);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          transform: translateY(-4px);
        }
        .tp-card-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0,124,176,0.1);
          border: 1px solid rgba(0,124,176,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: background 0.22s, box-shadow 0.22s, border-color 0.22s;
          flex-shrink: 0;
        }
        .tp-card:hover .tp-card-icon-wrap {
          background: rgba(0,124,176,0.18);
          border-color: rgba(0,124,176,0.4);
          box-shadow: 0 0 24px rgba(0,124,176,0.2);
        }
        .tp-card-icon-wrap svg {
          width: 34px;
          height: 34px;
          color: #7ebee8;
        }
        .tp-card-title {
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.3;
          color: #e2edf2;
          margin: 0 0 12px;
        }
        .tp-card-desc {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-sm-size, 15px);
          font-weight: 400;
          line-height: 1.65;
          color: #90a4ae;
          margin: 0;
        }
        .tp-cta {
          text-align: center;
        }
        .tp-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 36px;
          border: 2px solid #007cb0;
          background: transparent;
          border-radius: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #7ebee8;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .tp-cta-btn:hover {
          background: #007cb0;
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(0,124,176,0.3);
        }
        .tp-cta-btn svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }
        .tp-cta-btn:hover svg {
          transform: translateX(3px);
        }
        @media (max-width: 1023px) {
          .tp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 479px) {
          .tp-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .tp-header {
            margin-bottom: 40px;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`tp-section ${sectionStyle || ""} ${className || ""}`}
        style={{
          position: "relative",
          backgroundColor: "#111820",
          background: "linear-gradient(180deg, #111820 0%, #0d1a24 100%)",
        }}
      >
        {bgImage && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: overlayColor,
              opacity: (overlayOpacity ?? 0) / 100,
              zIndex: 1,
            }}
          />
        )}
        <div className="site-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="tp-header">
            <p className="tp-subtitle">{subtitle}</p>
            <h2 className="tp-heading">{heading}</h2>
            <p className="tp-desc">{description}</p>
          </div>
          <div className="tp-grid">
            {cards.map((card, index) => (
              <div key={index} className="tp-card">
                <div
                  className="tp-card-icon-wrap"
                  dangerouslySetInnerHTML={{
                    __html: card.icon || defaultIcons[index % defaultIcons.length],
                  }}
                />
                <h3 className="tp-card-title">{card.title}</h3>
                <p className="tp-card-desc">{card.description}</p>
              </div>
            ))}
          </div>
          {buttonText && (
            <div className="tp-cta">
              <a href={buttonHref || "#"} className="tp-cta-btn">
                {buttonText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
});

export default TradeProSection;
