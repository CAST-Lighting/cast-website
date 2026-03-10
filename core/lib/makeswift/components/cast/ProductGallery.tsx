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
          border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;
          display: flex; flex-direction: column; height: 100%;
          transition: border-color 0.2s, box-shadow 0.2s; background: #fff;
        }
        .pg-card:hover { border-color: var(--color-primary); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .pg-card-image-wrap {
          background: #f6f7f8; aspect-ratio: 1 / 1; display: flex;
          align-items: center; justify-content: center; overflow: hidden; position: relative;
        }
        .pg-card-image-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
        .pg-card:hover .pg-card-image-wrap img { transform: scale(1.05); }
        .pg-card-category {
          position: absolute; top: 12px; left: 12px; background: #eef3f6;
          border: 1px solid #d1dbe5; border-radius: 8px; padding: 3px 10px;
          font-family: var(--font-heading); font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-title);
        }
        .pg-card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
        .pg-card-name { font-family: var(--font-heading); font-size: 18px; font-weight: 600; line-height: 1.3; color: var(--color-title); margin: 0 0 8px 0; }
        .pg-card-price { font-family: var(--font-heading); font-size: 20px; font-weight: 700; color: var(--color-primary); margin: 0 0 16px 0; }
        .pg-card-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: auto; padding: 12px 24px; border: 2px solid var(--color-title);
          border-radius: 8px; background: transparent; font-family: var(--font-heading);
          font-size: 14px; font-weight: 600; color: var(--color-title); cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s; text-decoration: none; width: 100%;
        }
        .pg-card-btn:hover { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
      `}</style>
      <section
        ref={ref}
        className={`${sectionStyle || ""} ${className || ""}`}
        style={{ width: "100%", boxSizing: "border-box", position: "relative", backgroundColor: bgColor || undefined }}
      >
        {bgImage && <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />}
        {overlayColor && (overlayOpacity ?? 0) > 0 && <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="site-container">
            <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heading)", color: "var(--color-title)" }}>{title}</h2>
                <p className="max-w-lg" style={{ color: "var(--color-content)", fontSize: "18px" }}>{description}</p>
              </div>
              <div className="hidden shrink-0 gap-2 md:flex">
                <Button size="icon" variant="ghost" onClick={() => carouselApi?.scrollPrev()} disabled={!canScrollPrev} className="disabled:pointer-events-auto">
                  <ArrowLeft className="size-5" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => carouselApi?.scrollNext()} disabled={!canScrollNext} className="disabled:pointer-events-auto">
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Carousel setApi={setCarouselApi} opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}>
              <CarouselContent className="ml-[max(44px,calc((100vw-1400px)/2+44px))] max-[1024px]:ml-[20px] max-[768px]:ml-[12px] max-[575px]:ml-[0px]">
                {items.map((item, index) => (
                  <CarouselItem key={index} className="max-w-[280px] pl-[20px] lg:max-w-[300px]">
                    <div className="pg-card">
                      <div className="pg-card-image-wrap">
                        {item.category && <span className="pg-card-category">{item.category}</span>}
                        {item.image ? <img src={item.image} alt={item.name || ""} /> : <div style={{ width: "100%", height: "100%", background: "#e5e7eb" }} />}
                      </div>
                      <div className="pg-card-body">
                        <h3 className="pg-card-name">{item.name}</h3>
                        <p className="pg-card-price">{item.price}</p>
                        <a href={item.href || "#"} className="pg-card-btn">View Product <ArrowRight style={{ width: 16, height: 16 }} /></a>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="mt-8 flex justify-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-[#004960]" : "bg-[#004960]/20"}`}
                  onClick={() => carouselApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
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
