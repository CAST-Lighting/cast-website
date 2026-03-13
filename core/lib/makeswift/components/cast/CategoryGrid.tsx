"use client";

import { forwardRef, type Ref } from "react";

export interface CategoryItem {
  image?: string;
  name?: string;
  href?: string;
}

export interface CategoryGridProps {
  className?: string;
  sectionStyle?: string;
  title?: string;
  description?: string;
  items?: CategoryItem[];
  bgImage?: string;
  bgColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

const defaultItems: CategoryItem[] = [
  { name: "Path Lights", href: "#", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&q=80" },
  { name: "Spot Lights", href: "#", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&q=80" },
  { name: "Well Lights", href: "#", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80" },
  { name: "Wall Lights", href: "#", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300&q=80" },
  { name: "Deck Lights", href: "#", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&q=80" },
  { name: "Transformers", href: "#", image: "https://images.unsplash.com/photo-1550070881-a5d71eda5800?w=300&q=80" },
  { name: "Wire & Connectors", href: "#", image: "https://images.unsplash.com/photo-1548324215-9133768e4094?w=300&q=80" },
  { name: "Accessories", href: "#", image: "https://images.unsplash.com/photo-1551250928-243dc937c49d?w=300&q=80" },
];

const CategoryGrid = forwardRef(function CategoryGrid(
  {
    className,
    sectionStyle,
    title = "Product Categories",
    description = "Explore our full range of professional landscape lighting solutions.",
    items = defaultItems,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: CategoryGridProps,
  ref: Ref<HTMLElement>
) {
  return (
    <>
      <style>{`
        .cg-section {
          width: 100%;
          box-sizing: border-box;
        }
        .cg-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 12px;
        }
        @media (max-width: 1279px) {
          .cg-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
        @media (max-width: 767px) {
          .cg-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
        }
        @media (max-width: 479px) {
          .cg-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        .cg-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 12px;
          padding: 20px 10px;
          border-radius: 14px;
          background: #1e2d38;
          border: 1px solid rgba(127,190,232,0.12);
          transition: background 0.2s, border-color 0.22s, transform 0.22s, box-shadow 0.22s;
        }
        .cg-card:hover {
          background: #243340;
          border-color: rgba(127,190,232,0.28);
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.28);
        }
        .cg-card-icon {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          overflow: hidden;
          background: #111820;
          border: 2px solid rgba(127,190,232,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.22s, box-shadow 0.22s;
        }
        .cg-card:hover .cg-card-icon {
          border-color: #7ebee8;
          box-shadow: 0 0 0 4px rgba(126,190,232,0.1);
        }
        .cg-card-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .cg-card:hover .cg-card-icon img {
          transform: scale(1.08);
        }
        .cg-card-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1e2d38 0%, #243340 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cg-card-name {
          font-family: "'Barlow', sans-serif";
          font-size: 12px;
          font-weight: 600;
          line-height: 1.3;
          color: #e2edf2;
          text-align: center;
          margin: 0;
          letter-spacing: 0.01em;
          transition: color 0.2s;
        }
        .cg-card:hover .cg-card-name {
          color: #7ebee8;
        }
        @media (max-width: 767px) {
          .cg-card-icon {
            width: 68px;
            height: 68px;
          }
          .cg-card-name {
            font-size: 11px;
          }
          .cg-card {
            padding: 14px 6px;
            gap: 8px;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`cg-section ${sectionStyle || ""} ${className || ""}`}
        style={{ position: "relative", backgroundColor: "#1a2330" }}
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
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="site-container">
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                marginBottom: 48,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Essonnes', 'Playfair Display', serif",
                  color: "#e2edf2",
                  fontSize: "var(--h2-size)",
                  fontWeight: "var(--heading-weight, 700)",
                  lineHeight: "var(--heading-line-height, 1.1)",
                  margin: 0,
                }}
              >
                {title}
              </h2>
              {description && (
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    color: "#90a4ae",
                    fontSize: "var(--body-size, 18px)",
                    margin: 0,
                    maxWidth: 520,
                    lineHeight: 1.6,
                  }}
                >
                  {description}
                </p>
              )}
            </div>
            <div className="cg-grid">
              {items.map((item, index) => (
                <a key={index} href={item.href || "#"} className="cg-card">
                  <div className="cg-card-icon">
                    {item.image ? (
                      <img src={item.image} alt={item.name || ""} />
                    ) : (
                      <div className="cg-card-placeholder">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(127,190,232,0.35)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="5" />
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="cg-card-name">{item.name}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default CategoryGrid;
