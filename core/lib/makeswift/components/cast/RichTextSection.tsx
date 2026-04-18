import { forwardRef, type Ref } from "react"

interface RichTextSectionProps {
  className?: string
  bgColor?: string
  heading?: string
  headingAccent?: string
  lastUpdated?: string
  content?: string
  pdfLabel?: string
  pdfUrl?: string
  showPdf?: boolean
}

const DEFAULT_CONTENT = `These Terms and Conditions ("Terms") govern your access to and use of the CAST Lighting website, products, and services (collectively, "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not access the Services.

1. USE OF SERVICES

CAST Lighting grants you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for your personal or internal business purposes. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Services without express written permission from CAST Lighting.

2. INTELLECTUAL PROPERTY

All content on the CAST Lighting website, including but not limited to text, graphics, logos, images, photographs, product designs, and software, is the property of CAST Lighting and is protected by applicable intellectual property laws. Our patent portfolio covers numerous innovations in outdoor lighting technology; unauthorized reproduction or use of patented designs is strictly prohibited.

3. PRODUCT INFORMATION AND ACCURACY

CAST Lighting makes every effort to display accurate product information, specifications, and pricing on our website. However, we do not warrant that product descriptions, specifications, pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors and to update product information at any time without prior notice.

4. ORDERS AND PAYMENT

By placing an order through our website or authorized distributors, you represent that you are authorized to use the designated payment method and agree to pay all charges in accordance with the applicable terms. CAST Lighting reserves the right to refuse or cancel any order at any time for reasons including product availability, errors in pricing, or suspected fraud.

5. SHIPPING AND RETURNS

Products are shipped in accordance with our Shipping Policy, which is incorporated by reference into these Terms. Returns are subject to our Return Policy and must be initiated within the stated return window. Custom or special-order products may not be eligible for return. Please review the applicable policy before placing your order.

6. LIMITATION OF LIABILITY

To the fullest extent permitted by applicable law, CAST Lighting shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the Services or products.

7. GOVERNING LAW

These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in New Castle County, Delaware.

8. CHANGES TO TERMS

CAST Lighting reserves the right to modify these Terms at any time. We will provide notice of material changes by updating the "Last Updated" date at the top of this page. Your continued use of the Services after any changes constitutes your acceptance of the new Terms.

9. CONTACT INFORMATION

If you have any questions about these Terms, please contact us at legal@castlighting.com or by mail at CAST Lighting, 123 Industrial Drive, Wilmington, DE 19801.`

const RichTextSection = forwardRef(function RichTextSection(
  {
    className,
    bgColor = "#0f1923",
    heading = "Terms & Conditions",
    headingAccent = "",
    lastUpdated = "January 1, 2026",
    content,
    pdfLabel = "Download PDF Version",
    pdfUrl = "",
    showPdf = false,
  }: RichTextSectionProps,
  ref: Ref<HTMLElement>
) {
  const bodyText = content || DEFAULT_CONTENT

  // Split content into paragraphs on double-newlines (or single)
  const paragraphs = bodyText
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <section
      ref={ref}
      className={className || ""}
      style={{ width: '100%', background: bgColor || "#0f1923", }}
    >
      <div className="site-container">
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* Heading */}
          <div style={{ marginBottom: 40: 32, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <h1 style={{
              fontFamily: "'Essonnes', 'Playfair Display', serif",
              fontSize: "var(--h1-size, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#fff",
              margin: "0 0 16px",
            }}>
              {heading}
              {headingAccent && (
                <>
                  {" "}
                  <span style={{
                    background: "linear-gradient(135deg, #007CB0, #7EBEE8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    {headingAccent}
                  </span>
                </>
              )}
            </h1>
            {lastUpdated && (
              <p style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}>
                Last updated: {lastUpdated}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            {paragraphs.map((para, i) => {
              // Detect numbered section headers like "1. TITLE" or "TITLE" all-caps short
              const isSectionHeader = /^\d+\.\s+[A-Z\s&]+$/.test(para)
              return (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: isSectionHeader ? 15 : 16,
                    fontWeight: isSectionHeader ? 700 : 400,
                    color: isSectionHeader ? "#fff" : "rgba(255,255,255,0.72)",
                    lineHeight: 1.75,
                    margin: "0 0 20px",
                    textTransform: isSectionHeader ? "none" : "none",
                    letterSpacing: isSectionHeader ? "0.02em" : "normal",
                  }}
                >
                  {para}
                </p>
              )
            })}
          </div>

          {/* PDF Download */}
          {showPdf && pdfUrl && (
            <div style={{ marginTop: 40: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <a
                href={pdfUrl}
                download
                className="sg-btn-outline-dark-sm"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {pdfLabel || "Download PDF Version"}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
})

export default RichTextSection
