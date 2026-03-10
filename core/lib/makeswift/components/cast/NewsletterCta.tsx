"use client";

import { forwardRef, useState, type Ref } from "react";
import { ArrowRight, Check } from "lucide-react";

export interface NewsletterCtaProps {
  className?: string;
  sectionStyle?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  items?: { text?: string }[];
  bgImage?: string;
  bgColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  containerBgColor?: string;
}

const defaultItems = [
  { text: "New Product Announcements" },
  { text: "Exclusive TradePro Offers" },
  { text: "Installation Tips & Guides" },
  { text: "Design Inspiration" },
  { text: "Industry News & Events" },
];

const NewsletterCta = forwardRef(function NewsletterCta(
  {
    className,
    sectionStyle,
    heading = "Stay in the Loop",
    description = "Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.",
    buttonText = "Subscribe",
    items = defaultItems,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
    containerBgColor,
  }: NewsletterCtaProps,
  ref: Ref<HTMLElement>
) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <style>{`
        .nl-section {
          width: 100%;
          box-sizing: border-box;
        }
        .nl-card {
          background: #111827;
          border-radius: 16px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
          padding: 56px 64px;
          position: relative;
          overflow: hidden;
        }
        .nl-card::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,73,96,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .nl-card::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -60px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(0,73,96,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .nl-left {
          flex: 1 1 55%;
          min-width: 0;
          position: relative;
          z-index: 1;
        }
        .nl-heading {
          font-family: 'Urbanist', sans-serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
          margin: 0 0 8px;
        }
        .nl-desc {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin: 0 0 28px;
        }
        .nl-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .nl-form-row {
          display: contents;
        }
        .nl-input {
          flex: 1;
          padding: 14px 18px;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #ffffff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .nl-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .nl-input:focus {
          border-color: var(--color-primary);
          background: rgba(255,255,255,0.1);
        }
        .nl-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--color-primary);
          border: none;
          border-radius: 8px;
          font-family: 'Urbanist', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .nl-submit:hover {
          background: var(--color-secondary);
        }
        .nl-submit svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }
        .nl-submit:hover svg {
          transform: translateX(3px);
        }
        .nl-success {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #22c55e;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 0;
        }
        .nl-success svg {
          width: 18px;
          height: 18px;
        }
        .nl-right {
          flex: 0 0 auto;
          position: relative;
          z-index: 1;
        }
        .nl-items {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .nl-items li {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
        }
        .nl-check-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: rgba(0,73,96,0.15);
          border: 1px solid rgba(0,73,96,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nl-check-box svg {
          width: 12px;
          height: 12px;
          color: var(--color-primary);
        }
        @media (max-width: 767px) {
          .nl-card {
            flex-direction: column;
            padding: 36px 24px;
            gap: 32px;
          }
          .nl-heading {
            font-size: 26px;
          }
          .nl-form {
            flex-direction: column;
          }
          .nl-form-row {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`nl-section ${sectionStyle || ""} ${className || ""}`}
        style={{ position: "relative", backgroundColor: bgColor || undefined }}
      >
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        <div className="site-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="nl-card" style={containerBgColor ? { background: containerBgColor } : undefined}>
            <div className="nl-left">
              <h3 className="nl-heading">{heading}</h3>
              <p className="nl-desc">{description}</p>
              {submitted ? (
                <div className="nl-success">
                  <Check />
                  Thanks for subscribing! Check your inbox.
                </div>
              ) : (
                <form className="nl-form" onSubmit={handleSubmit}>
                  <div className="nl-form-row">
                    <input
                      type="text"
                      className="nl-input"
                      placeholder="First name"
                      required
                    />
                    <input
                      type="email"
                      className="nl-input"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <button type="submit" className="nl-submit">
                    {buttonText} <ArrowRight />
                  </button>
                </form>
              )}
            </div>
            <div className="nl-right">
              <ul className="nl-items">
                {items.map((item, i) => (
                  <li key={i}>
                    <span className="nl-check-box"><Check /></span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default NewsletterCta;
