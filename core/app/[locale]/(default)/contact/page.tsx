import { Metadata } from 'next';
import { CmsPageRenderer } from '~/lib/makeswift/cms-page-renderer';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact Us | CAST Lighting',
  description:
    "Get in touch with CAST Lighting. We're here to help with your landscape lighting needs. Call (973) 423-2303 or send us a message.",
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
              <span>Get in Touch</span>
            </div>
            <h1
              className="heading-style-h1"
              style={{ color: 'var(--color-blue-grey-100)' }}
            >
              Contact Us
            </h1>
            <p
              className="section-desc max-w-xl"
              style={{ color: 'var(--color-blue-grey-300)' }}
            >
              We&apos;re here to help with your landscape lighting needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ background: '#0f1923', padding: '80px 0' }}>
        <div className="site-container">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <h2
                className="heading-style-h2"
                style={{ color: 'var(--color-blue-grey-100)' }}
              >
                Get in Touch
              </h2>
              <p
                className="body-lg"
                style={{ color: 'var(--color-blue-grey-300)', lineHeight: 1.7 }}
              >
                Whether you&apos;re a contractor looking for product information, a
                homeowner interested in CAST fixtures, or have a warranty
                question — we&apos;re here to help.
              </p>

              <div className="flex flex-col gap-6">
                {[
                  {
                    label: 'Phone',
                    value: '(973) 423-2303',
                    href: 'tel:9734232303',
                  },
                  {
                    label: 'Email',
                    value: 'info@castlighting.com',
                    href: 'mailto:info@castlighting.com',
                  },
                  {
                    label: 'Address',
                    value: 'Pine Brook, NJ 07058',
                    href: null,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{ color: 'var(--color-blue-grey-500)' }}
                    >
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="body-lg"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        className="body-lg"
                        style={{ color: 'var(--color-blue-grey-200)' }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="p-6 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-blue-grey-400)' }}
                >
                  <strong style={{ color: 'var(--color-blue-grey-200)' }}>
                    Business Hours
                  </strong>
                  <br />
                  Monday – Friday: 8:00 AM – 5:00 PM EST
                  <br />
                  Saturday – Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex flex-col gap-6">
              <h2
                className="heading-style-h3"
                style={{ color: 'var(--color-blue-grey-100)' }}
              >
                Send Us a Message
              </h2>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-sm"
                    style={{ color: 'var(--color-blue-grey-300)' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className="form-input"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-sm"
                    style={{ color: 'var(--color-blue-grey-300)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="form-input"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-sm"
                    style={{ color: 'var(--color-blue-grey-300)' }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(555) 123-4567"
                    className="form-input"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-sm"
                    style={{ color: 'var(--color-blue-grey-300)' }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="sg-btn-solid-md self-start">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <CastSiteFooter />
    </>
  );
}

export default async function ContactPage() {
  return (
    <CmsPageRenderer
      templatePath="/contact"
      data={{}}
      fallback={<FallbackPage />}
    />
  );
}
