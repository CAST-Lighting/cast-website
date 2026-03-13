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
          background: unset;
        }
        .tp-inner {
        }
        .tp-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 60px;
        }
        .tp-subtitle {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary);
          margin: 0 0 12px;
        }
        .tp-heading {
          font-family: 'Barlow', sans-serif;
          font-size: var(--h2-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          color: var(--color-title);
          margin: 0 0 16px;
        }
        .tp-desc {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-size, 18px);
          font-weight: 400;
          line-height: var(--body-line-height, 1.6);
          color: #4c586f;
          margin: 0;
        }
        .tp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }
        .tp-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 8px;
        }
        .tp-card-icon {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #2d353c;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .tp-card:hover .tp-card-icon {
          box-shadow: 0 8px 30px rgba(0, 73, 96, 0.15);
          transform: translateY(-4px);
        }
        .tp-card-icon svg {
          width: 36px;
          height: 36px;
          color: var(--color-title);
        }
        .tp-card-title {
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          line-height: 1.3;
          color: var(--color-title);
          margin: 0 0 12px;
        }
        .tp-card-desc {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-sm-size, 15px);
          font-weight: 400;
          line-height: var(--body-line-height, 1.6);
          color: #4c586f;
          margin: 0;
        }
        .tp-cta {
          text-align: center;
        }
        .tp-cta a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          border: 2px solid var(--color-primary);
          background: transparent;
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--color-title);
          text-decoration: none;
          transition: all 0.2s;
        }
        .tp-cta a:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #ffffff;
        }
        @media (max-width: 1023px) {
          .tp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 24px;
          }
        }
        @media (max-width: 479px) {
          .tp-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .tp-header {
            margin-bottom: 40px;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`tp-section ${sectionStyle || ""} ${className || ""}`}
        style={{ position: "relative", backgroundColor: bgColor || "#25262d" }}
      >
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        <div className="tp-inner site-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="tp-header">
            <p className="tp-subtitle">{subtitle}</p>
            <h2 className="tp-heading">{heading}</h2>
            <p className="tp-desc">{description}</p>
          </div>
          <div className="tp-grid">
            {cards.map((card, index) => (
              <div key={index} className="tp-card">
                <div
                  className="tp-card-icon"
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
              <a href={buttonHref || "#"}>{buttonText}</a>
            </div>
          )}
        </div>
      </section>
    </>
  );
});

export default TradeProSection;
