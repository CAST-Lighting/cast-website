"use client"

import { forwardRef, useState, type Ref } from "react"
import { Mail } from "lucide-react"

export interface NewsletterCtaProps {
  className?: string
  sectionStyle?: string
  heading?: string
  description?: string
  buttonText?: string
  items?: { text?: string }[]
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
  containerBgColor?: string
}

const NewsletterCta = forwardRef(function NewsletterCta(
  {
    className,
    sectionStyle,
    heading = "Stay in the Loop",
    description = "Get the latest on new products, contractor resources, and exclusive offers delivered straight to your inbox.",
    buttonText = "Subscribe",
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
  }: NewsletterCtaProps,
  ref: Ref<HTMLElement>
) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section
      ref={ref}
      className={`py-20 bg-card relative ${sectionStyle || ""} ${className || ""}`}
    >
      {bgImage && (
        <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {overlayColor && (overlayOpacity ?? 0) > 0 && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100 }}
        />
      )}

      <div className="site-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="icon-box icon-box-lg mx-auto mb-6">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <h2 className="section-heading text-3xl md:text-4xl text-foreground mb-3">{heading}</h2>
          <p className="section-desc mb-8">{description}</p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-green-400 text-base font-medium py-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Thanks for subscribing! Check your inbox soon.
            </div>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="form-input flex-1"
                required
              />
              <button type="submit" className="btn-primary glow-warm-sm hover:glow-warm whitespace-nowrap">
                {buttonText}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
})

export default NewsletterCta
