import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import HeroBanner from '~/lib/makeswift/components/cast/HeroBanner';
import SignupHero from '~/lib/makeswift/components/cast/SignupHero';
import TradeProSection from '~/lib/makeswift/components/cast/TradeProSection';
import ComparisonSection from '~/lib/makeswift/components/cast/ComparisonSection';
import BrandLogos from '~/lib/makeswift/components/cast/BrandLogos';
import ReviewsCarousel from '~/lib/makeswift/components/cast/ReviewsCarousel';
import ReadyCTA from '~/lib/makeswift/components/cast/ReadyCTA';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'TradePro Program — Contractor Pricing & Support | CAST Lighting',
  description: 'Join 10,000+ landscape professionals in the CAST TradePro program. Exclusive contractor pricing, lifetime warranty, dedicated support. Apply free.',
};

export default async function TradeProPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "CAST TradePro Contractor Program",
    "provider": { "@type": "Organization", "name": "CAST Lighting" },
    "description": "Exclusive contractor pricing, lifetime warranty, and dedicated support for landscape professionals. Join 10,000+ TradePro contractors.",
    "areaServed": "US",
    "audience": { "@type": "Audience", "audienceType": "Landscape Contractors, Lighting Designers, Electrical Contractors" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HeroBanner
        headingLine1="Join The CAST TradePro Program"
        description="Get exclusive contractor pricing, lifetime product support, and the best outdoor lighting fixtures. Trusted by 10,000+ landscape contractors."
        btn1Label="Apply for TradePro Access"
        btn1Href="#apply"
        btn2Label="View Products"
        btn2Href="/shop"
        phrase1="For Landscape Professionals"
        phrase2="Exclusive Contractor Pricing"
        phrase3="Lifetime Warranty Included"
        badgeText="Join 10,000+ Landscape Contractors"
      />
      <div id="apply">
        <SignupHero
          overline="For Landscape Professionals"
          heading="Start Your TradePro Application"
          subheading="Join 10,000+ landscape professionals. Get exclusive pricing, lifetime warranty, and dedicated support — apply free in minutes."
          formHeading="Start Your Application"
          submitButtonText="Apply Now — It's Free"
          image="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80"
        />
      </div>
      <TradeProSection
        benefits={[
          { title: "Exclusive Contractor Pricing", desc: "Access wholesale pricing with volume discounts that improve your margins on every project." },
          { title: "Design Control in the Field", desc: "Interchangeable optics and adjustable fixtures let you fine-tune lighting on-site." },
          { title: "Lifetime Product Warranty", desc: "Every CAST product is backed by our industry-leading lifetime warranty — no questions asked." },
          { title: "Dedicated Support Team", desc: "Get direct access to our expert lighting designers for project planning and troubleshooting." },
        ]}
      />
      <ComparisonSection
        castPoints={[
          { text: "Solid brass and copper construction" },
          { text: "Lifetime warranty on all fixtures" },
          { text: "Made in USA — designed and engineered" },
          { text: "Interchangeable optics system" },
        ]}
        otherPoints={[
          { text: "Zinc or aluminum body construction" },
          { text: "Limited warranty — typically 1–3 years" },
          { text: "Imported — overseas manufacturing" },
          { text: "Fixed optics with no field adjustability" },
        ]}
      />
      <BrandLogos />
      <ReviewsCarousel
        reviews={[
          {
            name: "Mike T.",
            role: "Landscape Contractor",
            location: "Texas",
            rating: 5,
            quote: "CAST has completely transformed how I run my business. The contractor pricing is unbeatable and every client I've installed for has been thrilled with the quality.",
          },
          {
            name: "Sarah K.",
            role: "Landscape Designer",
            location: "Florida",
            rating: 5,
            quote: "The TradePro program is the real deal. The support team knows the products inside and out, and the lifetime warranty means I never have to worry about callbacks.",
          },
          {
            name: "James R.",
            role: "Landscape Contractor",
            location: "California",
            rating: 5,
            quote: "I switched to CAST two years ago and my close rate went up immediately. Clients can feel the quality difference the moment they hold a fixture.",
          },
        ]}
      />
      <ReadyCTA
        heading="Ready to Grow"
        headingAccent="Your Business"
        btn1Label="Apply for TradePro Access"
        btn1Href="/trade-pro"
        btn2Label="Shop Products"
        btn2Href="/shop"
      />
    </>
  );
}
