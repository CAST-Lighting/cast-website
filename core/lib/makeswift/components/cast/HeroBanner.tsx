"use client"

import { forwardRef, useState, useEffect, useCallback, type Ref, type FormEvent } from "react"

interface FormField {
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
}

interface HeroBannerProps {
  className?: string
  heading?: string
  subtitle?: string
  announcementText?: string
  announcementLinkText?: string
  announcementHref?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  backgroundImage1?: string
  backgroundImage2?: string
  backgroundImage3?: string
  transitionMode?: "crossfade" | "slide"
  autoplaySpeed?: number
  heroStyle?: string
  bgImage?: string
  bgColor?: string
  overlayColor?: string
  overlayOpacity?: number
  showForm?: boolean
  showAnnouncement?: boolean
  formTitle?: string
  formSubmitText?: string
  formBackgroundColor?: string
  formBorderRadius?: number
  formFieldBgColor?: string
  formFieldBorderColor?: string
  primaryButtonBgColor?: string
  primaryButtonHoverBgColor?: string
  secondaryButtonBgColor?: string
  secondaryButtonHoverBgColor?: string
  formStep1Title?: string
  formStep2Title?: string
  formStep3Title?: string
  formStep1Fields?: FormField[]
  formStep2Fields?: FormField[]
  formStep3Fields?: FormField[]
  formStyle?: string
}

const defaultStep1Fields: FormField[] = [
  { label: "Full Name", type: "text", placeholder: "Your name", required: true },
  { label: "Email", type: "email", placeholder: "Your email", required: false },
]

const defaultStep2Fields: FormField[] = [
  { label: "Phone", type: "tel", placeholder: "Your phone number", required: true },
  { label: "Project Type", type: "select", placeholder: "Select project type", required: false },
]

const defaultStep3Fields: FormField[] = [
  { label: "Message", type: "textarea", placeholder: "Tell us about your project...", required: false },
]

const HeroBanner = forwardRef(function HeroBanner(
  {
    className,
    heading = "Premium Landscape Lighting Built to Last",
    subtitle = "Professional-grade brass and copper fixtures trusted by contractors nationwide. We prioritize quality, durability, and performance in every product, providing solutions built to last a lifetime.",
    announcementText = "New 2026 Product Catalog Now Available.",
    announcementLinkText = "View catalog",
    announcementHref = "#",
    primaryButtonText = "Shop Products",
    primaryButtonHref = "#",
    secondaryButtonText = "Become a TradePro",
    secondaryButtonHref = "#",
    backgroundImage1,
    backgroundImage2,
    backgroundImage3,
    transitionMode = "crossfade",
    autoplaySpeed = 6000,
    heroStyle,
    bgImage,
    bgColor,
    overlayColor,
    overlayOpacity,
    showForm = true,
    showAnnouncement = true,
    formTitle = "Get An Easy, No-Pressure Quote",
    formSubmitText = "Get A Free Quote",
    formBackgroundColor = "rgba(0, 73, 96, 0.85)",
    formBorderRadius = 0,
    formFieldBgColor,
    formFieldBorderColor,
    primaryButtonBgColor,
    primaryButtonHoverBgColor,
    secondaryButtonBgColor,
    secondaryButtonHoverBgColor,
    formStep1Title = "Contact Info",
    formStep2Title = "Project Details",
    formStep3Title = "Additional Info",
    formStep1Fields = defaultStep1Fields,
    formStep2Fields = defaultStep2Fields,
    formStep3Fields = defaultStep3Fields,
    formStyle,
  }: HeroBannerProps,
  ref: Ref<HTMLDivElement>
) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const images = [backgroundImage1, backgroundImage2, backgroundImage3].filter(Boolean) as string[]
  const hasImages = images.length > 0

  const steps = [
    { title: formStep1Title, fields: formStep1Fields },
    { title: formStep2Title, fields: formStep2Fields },
    { title: formStep3Title, fields: formStep3Fields },
  ].filter((s) => s.fields && s.fields.length > 0)

  const totalSteps = steps.length
  const currentFields = steps[currentStep]?.fields || []

  const nextSlide = useCallback(() => {
    if (images.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(nextSlide, autoplaySpeed)
    return () => clearInterval(interval)
  }, [nextSlide, autoplaySpeed, images.length])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setFormState("submitting")
      setTimeout(() => setFormState("success"), 1000)
    }
  }

  const fieldInputStyle: React.CSSProperties = {
    background: formFieldBgColor || "rgba(0, 0, 0, 0.23)",
    border: `1px solid ${formFieldBorderColor || "rgba(255, 255, 255, 0.6)"}`,
    width: "100%",
    minHeight: "50px",
    padding: "0 20px",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "16px",
    color: "#ffffff",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  }

  const renderField = (field: FormField, index: number) => {
    const key = `${currentStep}-${index}`
    const labelStyle: React.CSSProperties = {
      display: "block",
      color: "#fff",
      marginBottom: "4px",
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "'Barlow', sans-serif",
    }

    if (field.type === "select") {
      return (
        <div key={key} style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>{field.label}{field.required ? " *" : ""}</label>
          <select
            className="hero-form-select"
            style={fieldInputStyle}
            value={formValues[key] || ""}
            onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
            required={field.required}
          >
            <option value="">{field.placeholder || "Select..."}</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="municipal">Municipal</option>
          </select>
        </div>
      )
    }

    if (field.type === "textarea") {
      return (
        <div key={key} style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>{field.label}{field.required ? " *" : ""}</label>
          <textarea
            className="hero-form-input"
            style={{ ...fieldInputStyle, minHeight: "100px", padding: "12px 20px", resize: "vertical" }}
            placeholder={field.placeholder}
            required={field.required}
            value={formValues[key] || ""}
            onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
          />
        </div>
      )
    }

    return (
      <div key={key} style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>{field.label}{field.required ? " *" : ""}</label>
        <input
          type={field.type || "text"}
          className="hero-form-input"
          style={fieldInputStyle}
          placeholder={field.placeholder}
          required={field.required}
          value={formValues[key] || ""}
          onChange={(e) => setFormValues({ ...formValues, [key]: e.target.value })}
        />
      </div>
    )
  }

  return (
    <>
      <style>{`
        .hero-form-input::placeholder, .hero-form-select::placeholder { color: rgba(255,255,255,0.7); }
        .hero-form-input:focus, .hero-form-select:focus { border-color: #fff !important; background: rgba(0,0,0,0.5) !important; }
        .hero-form-select {
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='white' stroke-width='2' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
        }
        .hero-form-select option { background: var(--color-primary); color: #fff; }
        @media (max-width: 1023px) {
          .hero-layout {
            flex-direction: column !important;
            align-items: center !important;
          }
          .hero-text-content {
            max-width: 100% !important;
            text-align: center !important;
          }
          .hero-text-content .announcement-wrap {
            justify-content: center !important;
          }
          .hero-text-content .buttons-wrap {
            justify-content: center !important;
          }
          .hero-text-content .indicators-wrap {
            justify-content: center !important;
          }
          .hero-form-wrapper {
            position: static !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            margin-top: 48px !important;
            width: 100% !important;
            max-width: 480px !important;
            align-self: center !important;
          }
        }
        @media (max-width: 640px) {
          .hero-form-wrapper {
            max-width: 100% !important;
          }
        }
      `}</style>
      <div ref={ref} className={`relative ${className || ""}`} style={{ backgroundColor: bgColor || "#111827", width: "100%", zIndex: 1 }}>
        {bgImage && (
          <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        )}
        {overlayColor && (overlayOpacity ?? 0) > 0 && (
          <div style={{ position: "absolute", inset: 0, backgroundColor: overlayColor, opacity: (overlayOpacity ?? 0) / 100, zIndex: 1 }} />
        )}
        {/* Background images */}
        {hasImages && (
          <div className="absolute inset-0 z-0">
            {transitionMode === "crossfade" ? (
              images.map((src, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: currentSlide === i ? 1 : 0,
                    transition: "opacity 1.2s ease-in-out",
                  }}
                >
                  <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <div
                className="flex h-full"
                style={{
                  width: `${images.length * 100}%`,
                  transform: `translateX(-${(currentSlide * 100) / images.length}%)`,
                  transition: "transform 0.8s ease-in-out",
                }}
              >
                {images.map((src, i) => (
                  <div key={i} style={{ width: `${100 / images.length}%`, height: "100%" }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(17,24,39,0.92) 0%, rgba(17,24,39,0.7) 50%, rgba(17,24,39,0.4) 100%)" }}
            />
          </div>
        )}

        {/* Gradient blobs (no images fallback) */}
        {!hasImages && (
          <>
            <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div
                style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#004960] to-[#057cb0] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              <div
                style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#004960] to-[#057cb0] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </>
        )}

        {/* Content */}
        <div className={`relative z-10 pt-14 ${heroStyle || ""}`}>
          <div
            className="hero-layout w-full site-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "48px",
              position: "relative",
            }}
          >
            {/* Left: Text content */}
            <div className="hero-text-content" style={{ maxWidth: "min(42rem, 50vw)", flexShrink: 0 }}>
              {showAnnouncement && announcementText && (
                <div className="announcement-wrap mb-6 flex sm:justify-start">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                    {announcementText}{" "}
                    <a href={announcementHref} className="font-semibold text-[#057cb0]">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {announcementLinkText} <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              )}
              <h1
                className="tracking-tight text-balance text-white"
                style={{
                  fontFamily: "'Essonnes', 'Playfair Display', serif",
                  fontSize: 'var(--h1-size)',
                  fontWeight: 'var(--heading-weight, 700)',
                  lineHeight: 'var(--heading-line-height, 1.1)',
                }}
              >
                {heading}
              </h1>
              <p className="mt-8 text-pretty text-gray-300" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "var(--body-lg-size, 20px)", lineHeight: "var(--body-line-height, 1.6)" }}>
                {subtitle}
              </p>
              <div className="buttons-wrap mt-10 flex items-center gap-x-6">
                <a
                  href={primaryButtonHref}
                  className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: primaryButtonBgColor || "var(--color-primary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = primaryButtonHoverBgColor || "var(--color-secondary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = primaryButtonBgColor || "var(--color-primary)")}
                >
                  {primaryButtonText}
                </a>
                <a
                  href={secondaryButtonHref}
                  className="text-sm/6 font-semibold text-white"
                  style={secondaryButtonBgColor ? { backgroundColor: secondaryButtonBgColor, padding: "10px 20px", borderRadius: "6px" } : undefined}
                  onMouseEnter={(e) => { if (secondaryButtonHoverBgColor) e.currentTarget.style.backgroundColor = secondaryButtonHoverBgColor }}
                  onMouseLeave={(e) => { if (secondaryButtonBgColor) e.currentTarget.style.backgroundColor = secondaryButtonBgColor }}
                >
                  {secondaryButtonText} <span aria-hidden="true">→</span>
                </a>
              </div>

              {/* Slide indicators */}
              {images.length > 1 && (
                <div className="indicators-wrap flex gap-2 mt-12">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className="transition-all duration-300 ease-in-out rounded-full"
                      style={{
                        width: currentSlide === i ? "32px" : "8px",
                        height: "8px",
                        backgroundColor: currentSlide === i ? "var(--color-primary)" : "rgba(255,255,255,0.4)",
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Multi-step Quote form */}
            {showForm && (
              <div
                className={`hero-form-wrapper ${formStyle || ""}`}
                style={{
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  background: `linear-gradient(160deg, rgba(0,49,64,0.92) 0%, rgba(0,92,122,0.85) 100%)`,
                  border: "1px solid rgba(127,190,232,0.2)",
                  borderRadius: `${formBorderRadius || 0}px`,
                  width: "400px",
                  padding: "44px 32px 36px",
                  boxShadow: "0 8px 60px -12px rgba(127,190,232,0.25), 0 2px 20px -4px rgba(0,49,64,0.5), inset 0 1px 0 0 rgba(127,190,232,0.12)",
                  position: "absolute",
                  right: "24px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 20,
                  overflow: "hidden",
                }}
              >
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(127,190,232,0.55), transparent)", pointerEvents: "none" }} />
                <h3 style={{
                  color: "#fff",
                  margin: "0 0 8px 0",
                  fontFamily: "'Essonnes', 'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}>
                  {formTitle}
                </h3>

                {/* Step indicator */}
                {totalSteps > 1 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: "3px",
                          borderRadius: "2px",
                          background: i <= currentStep ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: "'Barlow', sans-serif", whiteSpace: "nowrap", marginLeft: "4px" }}>
                      {currentStep + 1}/{totalSteps}
                    </span>
                  </div>
                )}

                {/* Step title */}
                {totalSteps > 1 && steps[currentStep]?.title && (
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: "0 0 16px", fontFamily: "'Barlow', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                    {steps[currentStep].title}
                  </p>
                )}

                {formState === "success" ? (
                  <div style={{
                    background: "rgba(0,150,0,0.25)",
                    border: "1px solid rgba(0,200,0,0.5)",
                    color: "#fff",
                    padding: "15px 20px",
                    fontSize: "16px",
                    lineHeight: 1.4,
                    borderRadius: `${Math.min(formBorderRadius || 0, 8)}px`,
                  }}>
                    Thank you! We&apos;ll be in touch shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {currentFields.map((field, i) => renderField(field, i))}

                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={() => setCurrentStep((prev) => prev - 1)}
                          style={{
                            flex: "0 0 auto",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            color: "#fff",
                            padding: "14px 20px",
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: "15px",
                            fontWeight: 600,
                            lineHeight: 1,
                            cursor: "pointer",
                            transition: "background 0.2s",
                            borderRadius: `${Math.min(formBorderRadius || 0, 8)}px`,
                          }}
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        style={{
                          flex: 1,
                          background: "var(--color-primary)",
                          border: "1px solid var(--color-primary)",
                          color: "#fff",
                          padding: "18px 27px",
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: "18px",
                          fontWeight: 600,
                          lineHeight: 1,
                          cursor: "pointer",
                          transition: "background 0.2s, border-color 0.2s",
                          borderRadius: `${Math.min(formBorderRadius || 0, 8)}px`,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-primary)"; e.currentTarget.style.borderColor = "var(--color-primary)" }}
                      >
                        {formState === "submitting"
                          ? "Submitting..."
                          : currentStep < totalSteps - 1
                            ? "Next"
                            : formSubmitText}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
})

export default HeroBanner
