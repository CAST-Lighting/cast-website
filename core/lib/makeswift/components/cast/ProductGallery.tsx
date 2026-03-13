"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { forwardRef, useEffect, useState, type Ref } from "react";

import { Button } from "./ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

export interface GalleryItem {
  category?: string;
  image?: string;
  name?: string;
  price?: string;
  href?: string;
}

export interface ProductGalleryProps {
  className?: string;
  sectionStyle?: string;
  title?: string;
  description?: string;
  items?: GalleryItem[];
  bgImage?: string;
  bgColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

const defaultItems: GalleryItem[] = [
  { category: "Path Lights", name: "Classic Path Light", price: "$189.99", href: "#", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { category: "Path Lights", name: "Chelsea London Path Light", price: "$219.99", href: "#", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80" },
  { category: "Spot Lights", name: "Classic Bullet Light", price: "$149.99", href: "#", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
  { category: "Path Lights", name: "Nouveau Path Light", price: "$199.99", href: "#", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80" },
  { category: "Well Lights", name: "Classic Well Light", price: "$129.99", href: "#", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80" },
  { category: "Spot Lights", name: "Craft Directional Light", price: "$234.99", href: "#", image: "https://images.unsplash.com/photo-1550070881-a5d71eda5800?w=600&q=80" },
];

const ProductGallery = forwardRef(function ProductGallery(
  {
    className,
    sectionStyle,
    title = "Our Favorite Picks",
    description = "Explore our most popular landscape lighting fixtures trusted by contractors nationwide.",
    items = defaultItems,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: ProductGalleryProps,
  ref: Ref<HTMLElement>
) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => { carouselApi.off("select", updateSelection); };
  }, [carouselApi]);

  return (
    <>
      <style>{`
        .pg-card {
          border: 1px solid rgba(127,190,232,0.12);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #243340;
          transition: border-color 0.22s, box-shadow 0.22s, transform 0.22s;
        }
        .pg-card:hover {
          border-color: #007cb0;
          box-shadow: 0 8px 32px rgba(0,124,176,0.18);
          transform: translateY(-3px);
        }
        .pg-card-image-wrap {
          background: #111820;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .pg-card-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .pg-card:hover .pg-card-image-wrap img {
          transform: scale(1.06);
        }
        .pg-card-image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #111820 0%, #1a2330 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pg-card-category {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(17,24,32,0.82);
          border: 1px solid rgba(127,190,232,0.18);
          border-radius: 6px;
          padding: 4px 10px;
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #7ebee8;
          backdrop-filter: blur(4px);
        }
        .pg-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 4px;
        }
        .pg-card-name {
          font-family: 'Barlow', sans-serif;
          font-size: 17px;
          font-weight: 600;
          line-height: 1.35;
          color: #e2edf2;
          margin: 0 0 6px 0;
        }
        .pg-card-price {
          font-family: 'Barlow', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #7ebee8;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }
        .pg-card-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: auto;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          background: #007cb0;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          text-decoration: none;
          width: 100%;
          letter-spacing: 0.02em;
        }
        .pg-card-btn:hover {
          background: #005c7a;
          box-shadow: 0 4px 14px rgba(0,124,176,0.3);
        }
        .pg-card-btn svg {
          width: 15px;
          height: 15px;
          transition: transform 0.2s;
        }
        .pg-card-btn:hover svg {
          transform: translateX(3px);
        }
        .pg-dot {
          height: 6px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, width 0.2s;
          padding: 0;
        }
        .pg-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(127,190,232,0.2);
          background: #1e2d38;
          color: #7ebee8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .pg-nav-btn:hover:not(:disabled) {
          background: #007cb0;
          border-color: #007cb0;
          color: #ffffff;
        }
        .pg-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
      <section
        ref={ref}
        className={`${sectionStyle || ""} ${className || ""}`}
        style={{ width: "100%", boxSizing: "border-box", position: "relative", backgroundColor: "#1e2d38" }}
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
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 48,
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    color: "#90a4ae",
                    fontSize: "var(--body-size, 18px)",
                    margin: 0,
                    maxWidth: 480,
                    lineHeight: 1.6,
                  }}
                >
                  {description}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                <button
                  className="pg-nav-btn"
                  onClick={() => carouselApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  aria-label="Previous products"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  className="pg-nav-btn"
                  onClick={() => carouselApi?.scrollNext()}
                  disabled={!canScrollNext}
                  aria-label="Next products"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Carousel
              setApi={setCarouselApi}
              opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}
            >
              <CarouselContent className="ml-[max(44px,calc((100vw-1400px)/2+44px))] max-[1024px]:ml-[20px] max-[768px]:ml-[12px] max-[575px]:ml-[0px]">
                {items.map((item, index) => (
                  <CarouselItem key={index} className="max-w-[280px] pl-[20px] lg:max-w-[300px]">
                    <div className="pg-card">
                      <div className="pg-card-image-wrap">
                        {item.category && (
                          <span className="pg-card-category">{item.category}</span>
                        )}
                        {item.image ? (
                          <img src={item.image} alt={item.name || ""} />
                        ) : (
                          <div className="pg-card-image-placeholder">
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="rgba(127,190,232,0.2)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="pg-card-body">
                        <h3 className="pg-card-name">{item.name}</h3>
                        <p className="pg-card-price">{item.price}</p>
                        <a href={item.href || "#"} className="pg-card-btn">
                          View Product <ArrowRight />
                        </a>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div
              style={{
                marginTop: 32,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
              }}
            >
              {items.map((_, index) => (
                <button
                  key={index}
                  className="pg-dot"
                  onClick={() => carouselApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  style={{
                    width: currentSlide === index ? 20 : 6,
                    background: currentSlide === index ? "#007cb0" : "rgba(127,190,232,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default ProductGallery;
