"use client"
import { forwardRef, type Ref, useState, useEffect, useCallback } from "react"

const STEPS = [
  {
    title: "Personal Info",
    fields: [
      { id: "firstName", label: "First Name", type: "text", placeholder: "John", required: true },
      { id: "lastName", label: "Last Name", type: "text", placeholder: "Smith", required: true },
      { id: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true },
      { id: "phone", label: "Phone", type: "tel", placeholder: "(555) 000-0000", required: true },
    ]
  },
  {
    title: "Business Info",
    fields: [
      { id: "role", label: "Role / Title", type: "select", required: true, options: ["Landscape Contractor", "Landscape Architect", "Landscape Designer", "Lighting Designer", "Other"] },
      { id: "company", label: "Company Name", type: "text", placeholder: "Acme Landscaping", required: true },
      { id: "address", label: "Street Address", type: "text", placeholder: "123 Main St", required: true },
      { id: "suite", label: "Suite / Unit", type: "text", placeholder: "Suite 100 (optional)", required: false },
    ]
  },
  {
    title: "Location",
    fields: [
      { id: "city", label: "City", type: "text", placeholder: "City", required: true },
      { id: "state", label: "State / Province", type: "text", placeholder: "State", required: true },
      { id: "zip", label: "Zip / Postal Code", type: "text", placeholder: "12345", required: true },
      { id: "country", label: "Country", type: "select", required: true, options: ["United States", "Canada", "Mexico", "Other"] },
    ]
  },
  {
    title: "Account Details",
    fields: [
      { id: "website", label: "Business Website", type: "url", placeholder: "https://yourcompany.com", required: false },
      { id: "taxExempt", label: "Tax Exempt?", type: "checkbox", required: false },
      { id: "newsletter", label: "Subscribe to CAST newsletters and updates?", type: "radio", required: false, options: ["Yes", "No"] },
    ]
  },
]

function TradeProMultiStepForm({ formTitle, formSubtitle, formSubmitLabel }: { formTitle?: string; formSubtitle?: string; formSubmitLabel?: string }) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState<Record<string, string | boolean>>({})
  const totalSteps = STEPS.length
  const current = STEPS[step]

  const inputStyle = { border: '1px solid rgba(175,229,253,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', width: '100%', padding: '10px 14px', borderRadius: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }
  const labelStyle = { fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(175,229,253,0.8)', display: 'block', marginBottom: 4, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,124,176,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7EBEE8" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h4 style={{ fontFamily: "'Essonnes','Playfair Display',serif", fontSize: 'var(--h4-size)', color: '#fff', margin: '0 0 8px' }}>Application Submitted!</h4>
      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>We'll review your application and follow up within 2–5 business days.</p>
    </div>
  )

  return (
    <div>
      <h3 className="heading-style-h4 mb-1" style={{ color: '#fff' }}>{formTitle || "Become a TradePro"}</h3>
      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: 'var(--color-blue-grey-300)', marginBottom: 16 }}>
        {formSubtitle || "Apply for exclusive contractor pricing, training, and dedicated support."}
      </p>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#007CB0' : 'rgba(255,255,255,0.15)', transition: 'background 200ms' }} />
        ))}
      </div>
      <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(175,229,253,0.6)', marginBottom: 14 }}>
        Step {step + 1} of {totalSteps} — {current.title}
      </p>

      <form onSubmit={e => { e.preventDefault(); if (step < totalSteps - 1) { setStep(s => s + 1) } else { setSubmitted(true) } }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {current.fields.map(field => (
            <div key={field.id}>
              <label style={labelStyle}>{field.label}{field.required && <span style={{ color: '#7EBEE8' }}> *</span>}</label>
              {field.type === 'select' ? (
                <select style={{ ...inputStyle, background: 'rgba(40,90,110,0.8)', appearance: 'none' }} required={field.required} value={String(values[field.id] || '')} onChange={e => setValues(v => ({...v, [field.id]: e.target.value}))}>
                  <option value="">Select...</option>
                  {(field.options || []).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : field.type === 'checkbox' ? (
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" checked={Boolean(values[field.id])} onChange={e => setValues(v => ({...v, [field.id]: e.target.checked}))} style={{ accentColor: '#007CB0', width: 16, height: 16 }} />
                  <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Yes, I am tax exempt</span>
                </label>
              ) : field.type === 'radio' ? (
                <div style={{ display: 'flex', gap: 16 }}>
                  {(field.options || []).map(o => (
                    <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: "'Barlow',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      <input type="radio" name={field.id} value={o} checked={values[field.id] === o} onChange={() => setValues(v => ({...v, [field.id]: o}))} style={{ accentColor: '#007CB0' }} />
                      {o}
                    </label>
                  ))}
                </div>
              ) : (
                <input type={field.type} placeholder={field.placeholder} required={field.required} style={inputStyle} value={String(values[field.id] || '')} onChange={e => setValues(v => ({...v, [field.id]: e.target.value}))} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          {step > 0 && (
            <button type="button" className="sg-btn-outline-dark-sm" onClick={() => setStep(s => s - 1)} style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
          )}
          <button type="submit" className="sg-btn-solid-dark-md" style={{ flex: 2, justifyContent: 'center' }}>
            {step < totalSteps - 1 ? 'Next →' : (formSubmitLabel || 'Submit Application')}
          </button>
        </div>
      </form>
    </div>
  )
}

const DEFAULT_SLIDES = [
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTpmNGU1MTkzMi02Y2JlLTQ0ZjAtOWIwNC03ZmI3MmQwNzYwMDk=/background-1.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTpkZDVmYmU0ZS1hMzE3LTRlYWYtODg0Zi0wY2Q0MWVlOWU2ZTk=/background-6.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTphN2U4ZjZlNS02ZDg0LTQzZmQtYTM4Ni0yMmNmOWNlNDYxMDM=/background-3.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTo5NmM1NDI2ZS1iMTZkLTQzYzItYTYyYy1hNDc1MWM5NDFiOWE=/background-7.jpg",
  "https://storage.googleapis.com/s.mkswft.com/RmlsZTo5M2JkMWM4NC1mOTA3LTRlZDktYThkMC0xNGZmYTAxODQ2MWI=/background-5.jpg",
]

interface HeroBannerProps {
  className?: string
  // New List-based props
  slides?: string[]
  staticImageSrc?: string
  centerContent?: boolean
  phrases?: Array<{ text?: string }>
  staticAccentText?: boolean
  headingAccent?: string
  buttons?: Array<{ label?: string; href?: string }>
  showForm?: boolean
  // Legacy scalar props (kept for backward compat with saved Makeswift data)
  slide1Image?: string
  slide2Image?: string
  slide3Image?: string
  slide4Image?: string
  slide5Image?: string
  phrase1?: string
  phrase2?: string
  phrase3?: string
  btn1Label?: string
  btn1Href?: string
  btn2Label?: string
  btn2Href?: string
  hideForm?: boolean
  bgColor?: string
  bgOpacity?: number
  // Shared props
  badgeText?: string
  headingLine1?: string
  description?: string
  formTitle?: string
  formSubtitle?: string
  formSubmitLabel?: string
  formWidth?: number
  formOffsetBottom?: number
  gradientFrom?: string
  gradientTo?: string
  gradientDirection?: string
  lineHeight?: number
}

const HeroBanner = forwardRef(function HeroBanner(
  {
    className,
    // New list-based props
    slides, staticImageSrc, centerContent, phrases: phrasesProp, staticAccentText, headingAccent,
    buttons: buttonsProp, showForm,
    // Legacy scalar props
    slide1Image, slide2Image, slide3Image, slide4Image, slide5Image,
    phrase1, phrase2, phrase3,
    btn1Label, btn1Href, btn2Label, btn2Href,
    hideForm,
    bgColor, bgOpacity, gradientFrom, gradientTo, gradientDirection,
    // Shared
    badgeText, headingLine1, description,
    formTitle, formSubtitle, formSubmitLabel,
    formWidth, formOffsetBottom,
    lineHeight = 136,  }: HeroBannerProps,
  ref: Ref<HTMLElement>
) {
  const [current, setCurrent] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Resolve slide images: new List prop takes priority over legacy scalars
  const resolvedSlideImages = (slides && slides.length > 0)
    ? slides
    : [slide1Image, slide2Image, slide3Image, slide4Image, slide5Image].filter(Boolean) as string[]
  const resolvedImages = resolvedSlideImages.length > 0 ? resolvedSlideImages : DEFAULT_SLIDES
  // staticImageSrc mode: dedicated image picker overrides carousel entirely
  const images = staticImageSrc ? [staticImageSrc] : resolvedImages

  // Resolve phrases: new List prop takes priority over legacy scalars
  const resolvedPhrases = (phrasesProp && phrasesProp.length > 0)
    ? phrasesProp.map(p => p.text).filter(Boolean) as string[]
    : [phrase1, phrase2, phrase3].filter(Boolean) as string[]
  const activePhrases = resolvedPhrases.length > 0 ? resolvedPhrases : ["Built to Last Forever", "Designed for Contractors", "Loved by Homeowners"]

  // Resolve buttons: new List prop takes priority over legacy scalars
  // Build button list — only include buttons that have a label set
  const legacyButtons = [
    btn1Label?.trim() ? { label: btn1Label, href: btn1Href || "#" } : null,
    btn2Label?.trim() ? { label: btn2Label, href: btn2Href || "#" } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  const resolvedButtons = (buttonsProp && buttonsProp.length > 0)
    ? buttonsProp.filter(b => b?.label?.trim())
    : legacyButtons

  // Form visibility: showForm (new) takes priority; hideForm (legacy) as fallback
  const resolvedShowForm = showForm !== undefined ? showForm : !hideForm
  const isCentered = !!(centerContent && !resolvedShowForm)

  const next = useCallback(() => setCurrent(p => (p + 1) % images.length), [images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next, images.length])

  useEffect(() => {
    const t = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setPhraseIndex(p => (p + 1) % activePhrases.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(t)
  }, [activePhrases.length])

  const hasGradient = !!(gradientFrom && gradientTo)
  const overlayOpacity = typeof bgOpacity === 'number' ? bgOpacity / 100 : 0.70
  const overlayBg = hasGradient
    ? `linear-gradient(${gradientDirection || 'to bottom'}, ${gradientFrom}, ${gradientTo})`
    : bgColor || '#003344'

  return (
    <section
      ref={ref}
      className={`relative ${className || ""}`}
      style={{
        width: '100%',
        position: 'relative',
        zIndex: 2,
        '--section-line-height': lineHeight,
      } as React.CSSProperties}
    >
      {/* Slide images */}
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: overlayBg, opacity: overlayOpacity, zIndex: 1 }} />

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 20 }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6" : "w-2 opacity-50"}`}
              style={{ background: i === current ? 'var(--color-accent)' : '#fff' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="site-container w-full relative" style={{ zIndex: 10 }}>
        <div
          className={`grid grid-cols-1 gap-10 lg:gap-16 items-start lg:items-center ${resolvedShowForm ? 'lg:grid-cols-2' : ''}`}
          style={isCentered ? { display: 'flex', flexDirection: 'column', alignItems: 'center' } : undefined}
        >

          {/* ── Left: text ── */}
          <div
            className="flex flex-col gap-6"
            style={isCentered ? { maxWidth: 800, margin: '0 auto', textAlign: 'center', alignItems: 'center', width: '100%' } : undefined}
          >
            {/* Badge — only show if populated */}
            {badgeText?.trim() && (
              <div className={`badge-pill ${isCentered ? '' : 'self-start'}`}>
                <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
                <span>{badgeText}</span>
              </div>
            )}

            {/* Heading */}
            <h1 className="heading-style-h1" style={{ color: 'var(--color-blue-grey-100)' }}>
              {headingLine1 || "Premium Landscape Lighting"}
              {staticAccentText ? (
                headingAccent?.trim() ? (
                  <>
                    <br />
                    <span className="text-gradient-warm" style={{ display: 'inline-block' }}>
                      {headingAccent}
                    </span>
                  </>
                ) : null
              ) : (
                activePhrases.length > 0 && activePhrases[0]?.trim() ? (
                  <>
                    <br />
                    <span
                      className="text-gradient-warm"
                      style={{
                        display: 'inline-block',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        opacity: isAnimating ? 0 : 1,
                        transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
                      }}
                    >
                      {activePhrases[phraseIndex]}
                    </span>
                  </>
                ) : null
              )}
            </h1>

            {/* Description — only show if populated */}
            {description?.trim() && (
              <p className="section-desc max-w-md" style={{ color: 'var(--color-blue-grey-300)' }}>
                {description}
              </p>
            )}

            {/* Buttons — only render if at least one has a label */}
            {resolvedButtons.length > 0 && (
              <div className="flex flex-wrap gap-3" style={isCentered ? { justifyContent: 'center' } : undefined}>
                {resolvedButtons.map((btn, i) => (
                  <a
                    key={i}
                    href={btn.href || "#"}
                    className={i === 0 ? "sg-btn-solid-md" : "sg-btn-outline-dark-md"}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: form ── */}
          {resolvedShowForm && <div
            className="lg:ml-auto hero-form-wrapper"
            style={{
              position: 'relative',
              zIndex: 50,
              maxWidth: formWidth ? `${formWidth}px` : '472px',
            }}
          >
            {formOffsetBottom && <style>{`.hero-form-wrapper { transform: translateY(${formOffsetBottom}px); } @media (max-width: 1023px) { .hero-form-wrapper { transform: none; } }`}</style>}
            <div
              className="rounded-2xl p-6 lg:p-8 border border-white/10 relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, hsl(193 98% 16% / 0.97), hsl(198 100% 28% / 0.93))',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 8px 60px -12px hsl(204 72% 70% / 0.3), 0 2px 20px -4px hsl(193 98% 19% / 0.5), inset 0 1px 0 0 hsl(204 72% 70% / 0.15)',
              }}
            >
              {/* top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(204 72% 70% / 0.6), transparent)' }} />

              <TradeProMultiStepForm
                formTitle={formTitle}
                formSubtitle={formSubtitle}
                formSubmitLabel={formSubmitLabel}
              />
            </div>
          </div>}

        </div>
      </div>
    </section>
  )
})

export default HeroBanner
