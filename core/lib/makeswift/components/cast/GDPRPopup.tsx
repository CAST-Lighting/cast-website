"use client"
import { forwardRef, useEffect, useState, type Ref } from "react"

interface GDPRPopupProps {
  className?: string
  heading?: string
  body?: string
  acceptLabel?: string
  declineLabel?: string
  privacyLabel?: string
  privacyHref?: string
  bgColor?: string
}

const STORAGE_KEY = "cast_gdpr_accepted"
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000

const GDPRPopup = forwardRef(function GDPRPopup(
  {
    className,
    heading = "We Value Your Privacy",
    body = "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking \"Accept All\", you consent to our use of cookies.",
    acceptLabel = "Accept All",
    declineLabel = "Decline",
    privacyLabel = "Privacy Policy",
    privacyHref = "/privacy",
    bgColor = "#2d353c",
  }: GDPRPopupProps,
  ref: Ref<HTMLDivElement>
) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        setVisible(true)
        return
      }
      const parsed = JSON.parse(stored) as { timestamp?: number; accepted?: boolean }
      const age = Date.now() - (parsed.timestamp ?? 0)
      if (age > TWENTY_FOUR_HOURS) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, timestamp: Date.now() }))
    } catch {
      // localStorage unavailable
    }
    setVisible(false)
  }

  const handleDecline = () => {
    setDismissed(true)
    setVisible(false)
  }

  if (!visible || dismissed) return (
    <div ref={ref} className={className || ""} style={{ display: "none" }} />
  )

  return (
    <div
      ref={ref}
      className={className || ""}
      style={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 9999,
        maxWidth: 380,
        width: "calc(100vw - 48px)",
      }}
    >
      <div
        style={{
          background: bgColor || "#2d353c",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10,
          padding: "20px 22px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Heading */}
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 15,
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 8px",
          lineHeight: 1.3,
        }}>
          {heading || "We Value Your Privacy"}
        </p>

        {/* Body */}
        <p style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 13,
          color: "rgba(255,255,255,0.65)",
          margin: "0 0 16px",
          lineHeight: 1.6,
        }}>
          {body || "We use cookies to enhance your experience."}{" "}
          {privacyLabel && privacyHref && (
            <a
              href={privacyHref}
              style={{
                color: "#7EBEE8",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              {privacyLabel}
            </a>
          )}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={handleAccept}
            className="sg-btn-solid-sm"
            style={{ flex: "1 1 auto" }}
          >
            {acceptLabel || "Accept All"}
          </button>
          <button
            onClick={handleDecline}
            className="sg-btn-outline-dark-sm"
            style={{ flex: "1 1 auto" }}
          >
            {declineLabel || "Decline"}
          </button>
        </div>
      </div>
    </div>
  )
})

export default GDPRPopup
