"use client"
import { forwardRef, type Ref } from "react"
import { Phone, Mail, MapPin } from "lucide-react"

const ContactSection = forwardRef(function ContactSection(
  {
    className,
    bgColor,
    paddingTop,
    paddingBottom,
    overline,
    heading,
    headingAccent,
    description,
    phone,
    email,
    address,
    formHeading,
    submitLabel,
  }: {
    className?: string
    bgColor?: string
    paddingTop?: number
    paddingBottom?: number
    overline?: string
    heading?: string
    headingAccent?: string
    description?: string
    phone?: string
    email?: string
    address?: string
    formHeading?: string
    submitLabel?: string
  },
  ref: Ref<HTMLElement>
) {
  return (
    <section
      ref={ref}
      className={`relative overflow-hidden ${className || ''}`}
      style={{ background: bgColor || '#0d1620', paddingTop: paddingTop ?? 96, paddingBottom: paddingBottom ?? 96 }}
    >
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Left: info */}
          <div>
            {overline && <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#c8972a', margin: '0 0 16px' }}>{overline}</p>}
            <h2 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
              {heading || 'Get In'} <span style={{ background: 'linear-gradient(135deg, #c8972a, #e8b84b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{headingAccent || 'Touch'}</span>
            </h2>
            {description && <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 40px' }}>{description}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {phone && <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(200,151,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone style={{ width: 18, height: 18, color: '#c8972a' }} />
                </div>
                <a href={`tel:${phone.replace(/\D/g,'')}`} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: '#fff', textDecoration: 'none' }}>{phone}</a>
              </div>}
              {email && <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(200,151,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail style={{ width: 18, height: 18, color: '#c8972a' }} />
                </div>
                <a href={`mailto:${email}`} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: '#fff', textDecoration: 'none' }}>{email}</a>
              </div>}
              {address && <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(200,151,42,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin style={{ width: 18, height: 18, color: '#c8972a' }} />
                </div>
                <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>{address}</span>
              </div>}
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background: '#1a2332', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '40px 36px' }}>
            {formHeading && <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 28px' }}>{formHeading}</h3>}
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>First Name</label>
                  <input type="text" placeholder="John" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff', fontFamily: "'Barlow', sans-serif", fontSize: 15, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Last Name</label>
                  <input type="text" placeholder="Smith" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff', fontFamily: "'Barlow', sans-serif", fontSize: 15, boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Email</label>
                <input type="email" placeholder="john@company.com" style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff', fontFamily: "'Barlow', sans-serif", fontSize: 15, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Message</label>
                <textarea placeholder="Tell us about your project..." rows={4} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff', fontFamily: "'Barlow', sans-serif", fontSize: 15, resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '14px 24px', background: 'linear-gradient(135deg, #c8972a, #e8b84b)', border: 'none', borderRadius: 8, fontFamily: "'Barlow', sans-serif", fontSize: 15, fontWeight: 700, color: '#0d1620', cursor: 'pointer', letterSpacing: '0.03em' }}>
                {submitLabel || 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
})

export default ContactSection
