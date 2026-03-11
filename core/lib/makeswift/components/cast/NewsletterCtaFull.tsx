"use client";

import { forwardRef, useState, type Ref } from "react";
import { ArrowRight, Check } from "lucide-react";

export interface NewsletterCtaFullProps {
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

const NewsletterCtaFull = forwardRef(function NewsletterCtaFull(
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
  }: NewsletterCtaFullProps,
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
        .nlf-section {
          width: 100%;
          box-sizing: border-box;
          background: unset;
          position: relative;
          overflow: hidden;
        }
        .nlf-section::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0,73,96,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .nlf-section::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -60px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,73,96,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .nlf-inner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 48px;
          position: relative;
          z-index: 1;
        }
        .nlf-left {
          flex: 1 1 55%;
          min-width: 0;
        }
        .nlf-heading {
          font-family: 'Barlow', sans-serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
          margin: 0 0 8px;
        }
        .nlf-desc {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin: 0 0 28px;
        }
        .nlf-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .nlf-form-row {
          display: contents;
        }
        .nlf-input {
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
        .nlf-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .nlf-input:focus {
          border-color: var(--color-primary);
          background: rgba(255,255,255,0.1);
        }
        .nlf-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--color-primary);
          border: none;
          border-radius: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .nlf-submit:hover {
          background: var(--color-secondary);
        }
        .nlf-submit svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }
        .nlf-submit:hover svg {
          transform: translateX(3px);
        }
        .nlf-success {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #22c55e;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 0;
        }
        .nlf-success svg {
          width: 18px;
          height: 18px;
        }
        .nlf-right {
          flex: 0 0 auto;
        }
        .nlf-items {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .nlf-items li {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
        }
        .nlf-check-box {
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
        .nlf-check-box svg {
          width: 12px;
          height: 12px;
          color: var(--color-primary);
        }
        @media (max-width: 767px) {
          .nlf-inner {
            flex-direction: column;
            gap: 32px;
          }
          .nlf-heading {
            font-size: 26px;
          }
          .nlf-form {
            flex-direction: column;
          }
          .nlf-form-row {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`nlf-section ${sectionStyle || ""} ${className || ""}`}
        style={{ backgroundColor: containerBgColor || bgColor || "#111827" }}
      >
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        <div className="nlf-inner site-container">
          <div className="nlf-left">
            <h3 className="nlf-heading">{heading}</h3>
            <p className="nlf-desc">{description}</p>
            {submitted ? (
              <div className="nlf-success">
                <Check />
                Thanks for subscribing! Check your inbox.
              </div>
            ) : (
              <form className="nlf-form" onSubmit={handleSubmit}>
                <div className="nlf-form-row">
                  <input
                    type="text"
                    className="nlf-input"
                    placeholder="First name"
                    required
                  />
                  <input
                    type="email"
                    className="nlf-input"
                    placeholder="Email address"
                    required
                  />
                </div>
                <button type="submit" className="nlf-submit">
                  {buttonText} <ArrowRight />
                </button>
              </form>
            )}
          </div>
          <div className="nlf-right">
            <ul className="nlf-items">
              {items.map((item, i) => (
                <li key={i}>
                  <span className="nlf-check-box"><Check /></span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
});

export default NewsletterCtaFull;
