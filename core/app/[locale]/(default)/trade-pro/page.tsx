import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
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
  description:
    'Join 10,000+ landscape professionals in the CAST TradePro program. Exclusive contractor pricing, lifetime warranty, dedicated support, and interchangeable optics. Apply free.',
};

export default async function TradeProPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const contractorReviews = [
    {
      name: 'Mike T.',
      role: 'Landscape Contractor',
      location: 'Texas',
      rating: 5,
      quote:
        'CAST fixtures are the only ones I specify. The lifetime warranty means I never have a callback.',
    },
    {
      name: 'Sarah K.',
      role: 'Outdoor Lighting Designer',
      location: 'Florida',
      rating: 5,
      quote:
        'TradePro pricing made the difference for my business. I close more jobs because I can price competitively.',
    },
    {
      name: 'James R.',
      role: 'Master Electrician',
      location: 'California',
      rating: 5,
      quote:
        'The solid brass construction means installations from 10 years ago still look brand new.',
    },
  ];

  const tradeProBenefits = [
    {
      title: 'Exclusive Contractor Pricing',
      desc: 'Access wholesale pricing and volume discounts that improve your margins on every project.',
    },
    {
      title: 'Design Control in the Field',
      desc: 'Interchangeable optics and adjustable fixtures let you fine-tune lighting on-site after install.',
    },
    {
      title: 'Lifetime Product Warranty',
      desc: "Every fixture backed by CAST's lifetime warranty—no questions asked. Replace or repair at no cost.",
    },
    {
      title: 'Dedicated Support Team',
      desc: 'Direct access to lighting design experts for project planning and troubleshooting.',
    },
  ];

  const castAdvantages = [
    { text: 'Solid brass construction' },
    { text: 'Lifetime warranty on every fixture' },
    { text: 'Made in USA — designed and engineered' },
    { text: 'Interchangeable optics system' },
    { text: 'Dedicated contractor support line' },
    { text: 'Field-adjustable fixtures' },
  ];

  const competitorWeaknesses = [
    { text: 'Zinc or aluminum bodies that corrode' },
    { text: 'Limited 5–10 year warranty' },
    { text: 'Imported — no domestic support' },
    { text: 'Fixed optics — no field adjustment' },
    { text: 'No dedicated contractor program' },
    { text: "Replace, don't repair" },
  ];

  return (
    <>
      <SignupHero
        overline="For Landscape Professionals"
        heading="Join The CAST TradePro Program"
        subheading="Get exclusive contractor pricing, lifetime product support, and the industry's best outdoor lighting fixtures. Trusted by 10,000+ landscape contractors."
        formHeading="Start Your Application"
        submitButtonText="Apply Now — It's Free"
      />

      <TradeProSection
        overline="Benefits for Contractors & Installers"
        heading="The TradePro"
        headingAccent="Advantage"
        benefits={tradeProBenefits}
        btnLabel="Apply for TradePro Access"
        btnHref="#top"
      />

      <ComparisonSection
        overline="CAST vs The Competition"
        heading="Why CAST vs."
        headingAccent="The Competition"
        description="See how CAST Lighting stacks up against the alternatives."
        castTitle="CAST Advantages"
        othersTitle="Other Lighting Brands"
        castPoints={castAdvantages}
        otherPoints={competitorWeaknesses}
      />

      <BrandLogos
        overline="Trusted by Leading Landscape Companies"
        heading="10,000+ Landscape Professionals Choose CAST"
      />

      <ReviewsCarousel
        overline="What TradePro Members Say"
        heading="Contractors Trust"
        headingAccent="CAST"
        reviews={contractorReviews}
      />

      <ReadyCTA
        overline="Get Started Today"
        heading="Ready to Grow"
        headingAccent="Your Business?"
        body="Join 10,000+ landscape professionals who trust CAST. Apply for TradePro access and get exclusive contractor pricing, design support, and lifetime warranties."
        btn1Label="Apply for TradePro Access"
        btn1Href="#top"
        btn2Label="Call Us: (973) 423-2303"
        btn2Href="tel:9734232303"
      />
    </>
  );
}
