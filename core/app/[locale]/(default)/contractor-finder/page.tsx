import { Metadata } from 'next';
import { CmsPageRenderer } from '~/lib/makeswift/cms-page-renderer';

export const metadata: Metadata = {
  title: 'Find a Contractor | CAST Lighting',
  description:
    'Connect with certified CAST Lighting contractors in your area. Professional landscape lighting installation by trained experts.',
};

function FallbackPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 165, paddingBottom: 64, zIndex: 2 }}
      >
        <img
          src="https://storage.googleapis.com/s.mkswft.com/RmlsZTpmNGU1MTkzMi02Y2JlLTQ0ZjAtOWIwNC03ZmI3MmQwNzYwMDk=/background-1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: '#25262d', opacity: 0.6, zIndex: 1 }}
        />
        <div className="site-container w-full relative" style={{ zIndex: 10 }}>
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <div className="badge-pill self-center">
              <span
                className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ background: 'var(--color-accent)' }}
              />
              <span>Find a Pro</span>
            </div>
            <h1
              className="heading-style-h1"
              style={{ color: 'var(--color-blue-grey-100)' }}
            >
              Find a Contractor
            </h1>
            <p
              className="section-desc max-w-xl"
              style={{ color: 'var(--color-blue-grey-300)' }}
            >
              Connect with certified CAST Lighting contractors in your area
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: '#0f1923', padding: '80px 0' }}>
        <div className="site-container">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
            <h2
              className="heading-style-h2"
              style={{ color: 'var(--color-blue-grey-100)' }}
            >
              Professional Installation Matters
            </h2>
            <p
              className="body-lg"
              style={{ color: 'var(--color-blue-grey-300)', lineHeight: 1.7 }}
            >
              CAST Lighting fixtures are designed to be installed by trained
              landscape lighting professionals. Our network of certified
              contractors ensures your outdoor lighting system is designed and
              installed to the highest standards — maximizing the beauty,
              safety, and longevity of your investment.
            </p>

            <div
              className="grid md:grid-cols-3 gap-8"
              style={{ marginTop: 24 }}
            >
              {[
                {
                  title: 'Expert Design',
                  desc: 'Certified contractors create custom lighting plans tailored to your property.',
                },
                {
                  title: 'Quality Installation',
                  desc: 'Professional installation ensures optimal fixture placement and wiring.',
                },
                {
                  title: 'Ongoing Support',
                  desc: 'Your contractor provides maintenance and seasonal adjustments as needed.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3 p-6 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <h3
                    className="heading-style-h4"
                    style={{ color: 'var(--color-blue-grey-100)' }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-blue-grey-400)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col items-center gap-4"
              style={{ marginTop: 32 }}
            >
              <p style={{ color: 'var(--color-blue-grey-300)' }}>
                Ready to find a CAST Lighting contractor near you?
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="/contact" className="sg-btn-solid-md">
                  Contact Us
                </a>
                <a href="tel:9734232303" className="sg-btn-outline-dark-md">
                  Call (973) 423-2303
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default async function ContractorFinderPage() {
  return (
    <CmsPageRenderer
      templatePath="/contractor-finder"
      data={{}}
      fallback={<FallbackPage />}
    />
  );
}
