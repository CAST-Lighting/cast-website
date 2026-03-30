import { CmsPageRenderer } from '~/lib/makeswift/cms-page-renderer';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';
import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Trade Professional Registration | CAST Lighting',
  description: 'Apply for a CAST Lighting landscape account. For contractors and landscape architects without a Distributor in your area. Application takes 2-5 business days.',
};

function FallbackPage() {
  return (
    <>

    <>
      <style>{`
        .reg-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .reg-grid { display: grid; grid-template-columns: 1fr 380px; gap: 48px; align-items: start; }
        @media (max-width: 900px) { .reg-grid { grid-template-columns: 1fr; } }
        .reg-input { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; font-family: 'Barlow', sans-serif; font-size: 14px; color: #fff; box-sizing: border-box; outline: none; background: rgba(255,255,255,0.05); }
        .reg-input:focus { border-color: #007CB0; }
        .reg-label { font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); display: block; margin-bottom: 6px; }
        .reg-select { width: 100%; padding: 11px 14px; border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; font-family: 'Barlow', sans-serif; font-size: 14px; color: #fff; box-sizing: border-box; background: rgba(255,255,255,0.05); outline: none; appearance: none; }
        .reg-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .reg-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        @media (max-width: 640px) { .reg-row-2, .reg-row-3 { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ background: '#0f1923', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ background: '#1a2332', paddingTop: 96, paddingBottom: 64, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,124,176,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,124,176,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="reg-container" style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#007CB0', margin: '0 0 16px' }}>Account Application</p>
            <h1 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: "var(--h2-size)", fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '0 0 20px' }}>Trade Professional Registration</h1>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>Application for an Account</p>
          </div>
        </section>

        {/* Form + Sidebar */}
        <div style={{ padding: '64px 0 96px' }}>
          <div className="reg-container">
            <div className="reg-grid">
              {/* Form */}
              <div style={{ background: '#2d353c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '40px 36px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div className="reg-row-2">
                    <div>
                      <label className="reg-label">First Name *</label>
                      <input className="reg-input" type="text" required placeholder="First Name" />
                    </div>
                    <div>
                      <label className="reg-label">Last Name *</label>
                      <input className="reg-input" type="text" required placeholder="Last Name" />
                    </div>
                  </div>
                  <div>
                    <label className="reg-label">Email *</label>
                    <input className="reg-input" type="email" required placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="reg-label">Best Phone Contact *</label>
                    <input className="reg-input" type="tel" required placeholder="(555) 000-0000" />
                  </div>
                  <div>
                    <label className="reg-label">I Am A... *</label>
                    <select className="reg-select" required>
                      <option value="">Select one...</option>
                      <option>Contractor / Installer</option>
                      <option>Landscape Architect</option>
                      <option>Lighting Designer</option>
                      <option>Electrical Contractor</option>
                      <option>Distributor</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="reg-label">Company or Organization *</label>
                    <input className="reg-input" type="text" required placeholder="Company Name" />
                  </div>
                  <div>
                    <label className="reg-label">Address Line 1 *</label>
                    <input className="reg-input" type="text" required placeholder="Street Address" />
                  </div>
                  <div>
                    <label className="reg-label">Address Line 2</label>
                    <input className="reg-input" type="text" placeholder="Suite, Unit, etc. (optional)" />
                  </div>
                  <div className="reg-row-3">
                    <div>
                      <label className="reg-label">City *</label>
                      <input className="reg-input" type="text" required placeholder="City" />
                    </div>
                    <div>
                      <label className="reg-label">State *</label>
                      <input className="reg-input" type="text" required placeholder="State" />
                    </div>
                    <div>
                      <label className="reg-label">Postal Code *</label>
                      <input className="reg-input" type="text" required placeholder="Zip" />
                    </div>
                  </div>
                  <div>
                    <label className="reg-label">Country *</label>
                    <select className="reg-select" required>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="checkbox" id="tax-exempt" style={{ accentColor: '#007CB0' }} />
                    <label htmlFor="tax-exempt" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>Tax Exempt</label>
                  </div>
                  <div>
                    <label className="reg-label">Comments / Questions</label>
                    <textarea className="reg-input" rows={4} placeholder="Any additional information..." style={{ resize: 'vertical' }} />
                  </div>
                  <div>
                    <label className="reg-label">Subscribe to our newsletter?</label>
                    <div style={{ display: 'flex', gap: 20, marginTop: 4 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                        <input type="radio" name="newsletter" value="yes" defaultChecked style={{ accentColor: '#007CB0' }} /> Yes
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
                        <input type="radio" name="newsletter" value="no" style={{ accentColor: '#007CB0' }} /> No
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="sg-btn-solid-md" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                    Submit Application &rarr;
                  </button>
                </form>
              </div>

              {/* Sidebar */}
              <div style={{ background: '#1a2332', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '32px 28px' }}>
                <h3 style={{ fontFamily: "'Essonnes', 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>Landscape Account</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: '0 0 20px' }}>
                  If you are a contractor or landscape architect without a Distributor or Specification Sales Agency in your area, you can apply to have your own CAST online ordering account.
                </p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: '0 0 20px' }}>
                  Application may take between 2&ndash;5 business days to be approved and we may contact you with questions after an application has been submitted.
                </p>
                <div style={{ background: 'rgba(0,124,176,0.1)', border: '1px solid rgba(0,124,176,0.25)', borderRadius: 8, padding: '14px 16px', marginBottom: 20 }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#007CB0', margin: 0 }}>FREE Shipping on orders $1,000 or greater.</p>
                </div>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 12px' }}>Already have an account?</p>
                <a href="/login" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, fontWeight: 600, color: '#007CB0', textDecoration: 'none' }}>Login Now &rarr;</a>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                    CAST Lighting stores information on its own servers for verification and contact purposes. We will not sell or share your information with a third-party without your consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default async function TradeProPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const makeswiftPage = await CmsPageRenderer({ templatePath: '/trade-pro', data: {} });
  if (makeswiftPage) return makeswiftPage;
  return <FallbackPage />;
}