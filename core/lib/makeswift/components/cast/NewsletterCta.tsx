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
          background: #1e2d38;
          border: 1px solid rgba(127,190,232,0.15);
          border-radius: 20px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 56px;
          padding: 56px 60px;
          position: relative;
          overflow: hidden;
        }
        .nl-card::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 340px;
          height: 340px;
          background: radial-gradient(circle, rgba(0,124,176,0.14) 0%, transparent 65%);
          pointer-events: none;
        }
        .nl-card::after {
          content: '';
          position: absolute;
          bottom: -70px;
          left: -50px;
          width: 240px;
          height: 240px;
          background: radial-gradient(circle, rgba(126,190,232,0.06) 0%, transparent 65%);
          pointer-events: none;
        }
        .nl-left {
          flex: 1 1 55%;
          min-width: 0;
          position: relative;
          z-index: 1;
        }
        .nl-heading {
          font-family: 'Essonnes', 'Playfair Display', serif;
          font-size: var(--h2-size);
          font-weight: var(--heading-weight, 700);
          line-height: var(--heading-line-height, 1.1);
          color: #e2edf2;
          margin: 0 0 12px;
        }
        .nl-desc {
          font-family: 'Barlow', sans-serif;
          font-size: var(--body-size, 18px);
          font-weight: 400;
          line-height: 1.65;
          color: #90a4ae;
          margin: 0 0 30px;
        }
        .nl-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .nl-inputs {
          display: flex;
          gap: 10px;
          flex: 1 1 auto;
          min-width: 0;
          flex-wrap: wrap;
        }
        .nl-input {
          flex: 1 1 160px;
          min-width: 0;
          padding: 13px 16px;
          border: 1px solid rgba(127,190,232,0.18);
          border-radius: 8px;
          background: rgba(17,24,32,0.6);
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          color: #e2edf2;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .nl-input::placeholder {
          color: #546f7a;
        }
        .nl-input:focus {
          border-color: #007cb0;
          background: rgba(17,24,32,0.85);
          box-shadow: 0 0 0 3px rgba(0,124,176,0.12);
        }
        .nl-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 28px;
          background: #007cb0;
          border: none;
          border-radius: 8px;
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: 0.03em;
        }
        .nl-submit:hover {
          background: #005c7a;
          box-shadow: 0 4px 18px rgba(0,124,176,0.35);
        }
        .nl-submit svg {
          width: 15px;
          height: 15px;
          transition: transform 0.2s;
        }
        .nl-submit:hover svg {
          transform: translateX(3px);
        }
        .nl-success {
          font-family: 'Barlow', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #22c55e;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 0;
        }
        .nl-success svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .nl-right {
          flex: 0 0 auto;
          position: relative;
          z-index: 1;
          padding-top: 4px;
        }
        .nl-items-label {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.13em;
          color: #546f7a;
          margin: 0 0 16px;
        }
        .nl-items {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nl-items li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #90a4ae;
          line-height: 1.4;
        }
        .nl-check-box {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: rgba(0,124,176,0.12);
          border: 1px solid rgba(126,190,232,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .nl-check-box svg {
          width: 11px;
          height: 11px;
          color: #7ebee8;
        }
        @media (max-width: 1023px) {
          .nl-card {
            flex-direction: column;
            padding: 44px 40px;
            gap: 36px;
          }
          .nl-right {
            width: 100%;
          }
          .nl-items {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px 24px;
          }
        }
        @media (max-width: 767px) {
          .nl-card {
            padding: 36px 24px;
            gap: 32px;
          }
          .nl-form {
            flex-direction: column;
          }
          .nl-inputs {
            flex-direction: column;
          }
          .nl-submit {
            width: 100%;
          }
        }
      `}</style>
      <section
        ref={ref}
        className={`nl-section ${sectionStyle || ""} ${className || ""}`}
        style={{ position: "relative", backgroundColor: "#111820" }}
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
          <div
            className="nl-card"
            style={containerBgColor ? { background: containerBgColor } : undefined}
          >
            <div className="nl-left">
              <h3 className="nl-heading">{heading}</h3>
              <p className="nl-desc">{description}</p>
              {submitted ? (
                <div className="nl-success">
                  <Check />
                  Thanks for subscribing! Check your inbox soon.
                </div>
              ) : (
                <form className="nl-form" onSubmit={handleSubmit}>
                  <div className="nl-inputs">
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
              <p className="nl-items-label">What you&apos;ll get</p>
              <ul className="nl-items">
                {items.map((item, i) => (
                  <li key={i}>
                    <span className="nl-check-box">
                      <Check />
                    </span>
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
