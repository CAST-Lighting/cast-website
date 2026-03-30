import { Metadata } from 'next';
import { CmsPageRenderer } from '~/lib/makeswift/cms-page-renderer';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';

export const metadata: Metadata = {
  title: 'About CAST Lighting | Our Story',
  description:
    'Professional-grade landscape lighting trusted by contractors since 2001. Made in the USA with a lifetime warranty on every fixture.',
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
              <span>Our Story</span>
            </div>
            <h1
              className="heading-style-h1"
              style={{ color: 'var(--color-blue-grey-100)' }}
            >
              About CAST Lighting
            </h1>
            <p
              className="section-desc max-w-xl"
              style={{ color: 'var(--color-blue-grey-300)' }}
            >
              Professional-grade landscape lighting trusted by contractors since
              2001
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ background: '#0f1923', padding: '80px 0' }}>
        <div className="site-container">
          <div className="max-w-3xl mx-auto flex flex-col gap-16">
            {/* Intro */}
            <div className="flex flex-col gap-6 text-center">
              <h2
                className="heading-style-h2"
                style={{ color: 'var(--color-blue-grey-100)' }}
              >
                Built to Last. Built in America.
              </h2>
              <p
                className="body-lg"
                style={{ color: 'var(--color-blue-grey-300)', lineHeight: 1.8 }}
              >
                Since 2001, CAST Lighting has been designing and manufacturing
                professional-grade landscape lighting fixtures in the USA. Every
                product is crafted from solid brass or copper — materials chosen
                for their beauty and ability to withstand decades of outdoor
                exposure without corroding or deteriorating.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Founded 2001',
                  desc: 'Over two decades of innovation in landscape lighting design and manufacturing.',
                },
                {
                  title: 'Made in the USA',
                  desc: 'Every CAST fixture is designed and manufactured in Pine Brook, New Jersey.',
                },
                {
                  title: 'Lifetime Warranty',
                  desc: 'We stand behind every product with a comprehensive lifetime warranty — no fine print.',
                },
                {
                  title: 'Solid Brass & Copper',
                  desc: 'Premium materials that develop a beautiful patina and never corrode or deteriorate.',
                },
                {
                  title: 'Contractor Trusted',
                  desc: 'Over 10,000 landscape lighting professionals rely on CAST fixtures for their projects.',
                },
                {
                  title: 'LED Innovation',
                  desc: 'Integrated LED technology engineered for optimal light output, efficiency, and longevity.',
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
                  <p style={{ color: 'var(--color-blue-grey-400)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Mission */}
            <div
              className="text-center flex flex-col gap-6 p-10 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <h2
                className="heading-style-h3"
                style={{ color: 'var(--color-blue-grey-100)' }}
              >
                Our Mission
              </h2>
              <p
                className="body-lg"
                style={{ color: 'var(--color-blue-grey-300)', lineHeight: 1.8 }}
              >
                To provide landscape lighting professionals with the
                highest-quality fixtures available — products that are beautiful,
                durable, and easy to install. We believe outdoor lighting should
                enhance properties for a lifetime, and we build every product
                with that standard in mind.
              </p>
              <div className="flex flex-wrap gap-3 justify-center" style={{ marginTop: 8 }}>
                <a href="/shop" className="sg-btn-solid-md">
                  Shop Products
                </a>
                <a href="/contact" className="sg-btn-outline-dark-md">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CastSiteFooter />
    </>
  );
}

export default async function AboutPage() {
  return (
    <CmsPageRenderer
      templatePath="/about"
      data={{}}
      fallback={<FallbackPage />}
    />
  );
}
