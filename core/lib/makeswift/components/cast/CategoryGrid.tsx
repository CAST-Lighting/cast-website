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
          gap: 16px;
        }
        @media (max-width: 1279px) {
          .cg-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }
        @media (max-width: 767px) {
          .cg-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 479px) {
          .cg-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        .cg-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 12px;
          padding: 16px 8px;
          border-radius: 12px;
          transition: background 0.2s, transform 0.2s;
        }
        .cg-card:hover {
          background: #f6f7f8;
          transform: translateY(-4px);
        }
        .cg-card-icon {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          overflow: hidden;
          background: #f6f7f8;
          border: 2px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cg-card:hover .cg-card-icon {
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0, 73, 96, 0.15);
        }
        .cg-card-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cg-card-name {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          line-height: 1.2;
          color: var(--color-title);
          text-align: center;
          margin: 0;
        }
        .cg-card:hover .cg-card-name {
          color: var(--color-primary);
        }
        @media (max-width: 767px) {
          .cg-card-icon {
            width: 72px;
            height: 72px;
          }
          .cg-card-name {
            font-size: 12px;
          }
          .cg-card {
            padding: 12px 4px;
            gap: 8px;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`cg-section ${sectionStyle || ""} ${className || ""}`}
        style={{ position: "relative", backgroundColor: bgColor || undefined }}
      >
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="site-container">
            <div className="mb-8 flex flex-col gap-4 md:mb-14 lg:mb-16" style={{ textAlign: "center", alignItems: "center" }}>
              <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", color: "var(--color-title)", fontSize: "var(--h2-size)", fontWeight: "var(--heading-weight, 700)", lineHeight: "var(--heading-line-height, 1.1)" }}>
                {title}
              </h2>
              {description && (
                <p className="max-w-lg" style={{ fontFamily: "'Barlow', sans-serif", color: "var(--color-content)", fontSize: "var(--body-size, 18px)" }}>
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
                      <div style={{ width: "100%", height: "100%", background: "#e5e7eb" }} />
                    )}
                  </div>
                  <h3 className="cg-card-name">{item.name}</h3>
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
