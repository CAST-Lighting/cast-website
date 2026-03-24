import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import SignupHero from '~/lib/makeswift/components/cast/SignupHero';
import ContentMedia from '~/lib/makeswift/components/cast/ContentMedia';
import TradeProSection from '~/lib/makeswift/components/cast/TradeProSection';
import BrandLogos from '~/lib/makeswift/components/cast/BrandLogos';
import ReviewsCarousel from '~/lib/makeswift/components/cast/ReviewsCarousel';
import ReadyCTA from '~/lib/makeswift/components/cast/ReadyCTA';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Become a CAST Authorized Retailer | CAST Lighting',
  description:
    'Partner with the industry leader in professional outdoor lighting. High margins, marketing support, exclusive territory, and dealer training. Apply to become a CAST retailer.',
};

export default async function RetailSignupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const dealerReviews = [
    {
      name: 'Richard A.',
      role: 'Lighting Showroom Owner',
      location: 'Arizona',
      rating: 5,
      quote:
        'CAST is the best-performing line in our showroom. Customers come back for more fixtures because the quality is so consistent.',
    },
    {
      name: 'Patricia L.',
      role: 'Hardware Store Manager',
      location: 'Oregon',
      rating: 5,
      quote:
        'The margins are excellent and the product sells itself. We haven't had a single warranty claim in three years.',
    },
    {
      name: 'Tom B.',
      role: 'Online Retailer',
      location: 'Georgia',
      rating: 5,
      quote:
        'CAST's co-op advertising program helped us grow our landscape lighting category by 40% in year one.',
    },
  ];

  const retailBenefits = [
    {
      title: 'Premium Margins',
      desc: 'Earn 40–50% retail markup on every CAST product. Industry-leading margins with consistent sell-through.',
    },
    {
      title: 'Marketing Support',
      desc: 'Co-op advertising funds, product photography, display fixtures, and branded sales materials provided.',
    },
    {
      title: 'Exclusive Territory',
      desc: 'Protect your market with exclusive or semi-exclusive territory options for qualifying dealers.',
    },
    {
      title: 'Training & Certification',
      desc: 'CAST factory training, dealer certification program, and dedicated dealer support team.',
    },
  ];

  const whyPartnerFeatures = [
    {
      title: 'High Margins (40–50% markup)',
      desc: 'CAST commands premium retail prices with strong repeat purchase rates.',
    },
    {
      title: 'Co-op Advertising Available',
      desc: 'We fund a portion of your marketing spend when you feature CAST products.',
    },
    {
      title: 'Dedicated Dealer Support',
      desc: 'A dedicated CAST dealer rep is assigned to your account from day one.',
    },
    {
      title: 'Training and Certification',
      desc: 'Factory and online training to make your staff confident selling CAST.',
    },
    {
      title: 'Display Fixture Program',
      desc: 'Discounted display fixtures to showcase the CAST product line in your space.',
    },
    {
      title: 'Exclusive Territory Options',
      desc: 'Qualifying dealers can lock down exclusive territory for their market.',
    },
  ];

  return (
    <>
      <SignupHero
        overline="Authorized Retailer Program"
        heading="Become a CAST Authorized Retailer"
        subheading="Partner with the industry leader in professional outdoor lighting. Offer your customers fixtures that last a lifetime — and earn the margins you deserve."
        formHeading="Start Your Application"
        submitButtonText="Apply Now"
      />

      <ContentMedia
        heading="Why Partner"
        headingAccent="With CAST?"
        bodyText="CAST Lighting has built a reputation for quality that drives repeat customers and strong margins. Our solid brass and copper fixtures command premium prices while delivering lifetime value — making them the easiest sell in any lighting showroom or hardware store."
        features={whyPartnerFeatures}
        btn1Label="Apply to Become a Dealer"
        btn1Href="#top"
        btn2Label="View Product Catalog"
        btn2Href="/shop"
        stat="40–50%"
        statLabel="Avg. Retail Markup"
      />

      <TradeProSection
        overline="Built for Dealers"
        heading="The CAST Retail"
        headingAccent="Advantage"
        description="Everything you need to build a thriving landscape lighting department."
        benefits={retailBenefits}
        btnLabel="Apply to Become a Dealer"
        btnHref="#top"
      />

      <BrandLogos
        overline="Trusted Across the Industry"
        heading="Leading Retailers and Showrooms Choose CAST"
      />

      <ReviewsCarousel
        overline="What Our Dealers Say"
        heading="Trusted by Retailers"
        headingAccent="Nationwide"
        reviews={dealerReviews}
      />

      <ReadyCTA
        overline="Ready to Partner?"
        heading="Start Selling"
        headingAccent="CAST Lighting"
        body="Join the growing network of authorized CAST retailers and showrooms. Apply today — our dealer team will follow up within 1–2 business days."
        btn1Label="Apply to Become a Dealer"
        btn1Href="#top"
        btn2Label="Call Us: (973) 423-2303"
        btn2Href="tel:9734232303"
      />
    </>
  );
}
