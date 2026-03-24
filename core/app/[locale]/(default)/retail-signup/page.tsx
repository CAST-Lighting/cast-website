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
  description: 'Partner with the industry leader in professional outdoor lighting. High margins, exclusive territory, co-op advertising, and full dealer support.',
};

export default async function RetailSignupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SignupHero
        heading="Become a CAST Authorized Retailer"
        subheading="Partner with the industry leader in professional outdoor lighting."
        formHeading="Start Your Dealer Application"
        submitButtonText="Apply to Become a Dealer"
        image="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80"
      />
      <ContentMedia
        heading="Why Partner"
        headingAccent="With CAST?"
        features={[
          { title: "High Margins — 40–50%", desc: "Industry-leading dealer margins on every CAST product you sell." },
          { title: "Co-op Advertising", desc: "Joint marketing programs to drive traffic and close more sales in your market." },
          { title: "Dedicated Dealer Support", desc: "A direct line to our dealer support team for training, ordering, and product questions." },
          { title: "Training and Certification", desc: "Full product training so your team can confidently sell and specify CAST fixtures." },
          { title: "Display Fixture Program", desc: "Discounted display inventory to showcase CAST products in your showroom." },
          { title: "Exclusive Territory", desc: "Protected dealer territory so you can build a sustainable CAST business." },
        ]}
        btn1Label="Apply Now"
        btn1Href="/retail-signup"
        btn2Label="Contact Sales"
        btn2Href="/contact"
      />
      <TradeProSection
        overline="Retailer Benefits"
        heading="The CAST Dealer"
        headingAccent="Advantage"
        benefits={[
          { title: "Premium Margins", desc: "40–50% dealer margins on the full CAST product line, with volume incentives available." },
          { title: "Marketing Support", desc: "Co-op advertising funds, digital assets, and campaign support to grow your CAST sales." },
          { title: "Exclusive Territory", desc: "Protected dealer territory ensures you can build a reliable, recurring CAST revenue stream." },
          { title: "Training and Certification", desc: "Factory training, product certification, and ongoing education from the CAST team." },
        ]}
      />
      <BrandLogos />
      <ReviewsCarousel
        overline="What Our Dealers Say"
        heading="Trusted by Dealers"
        headingAccent="Nationwide"
        reviews={[
          {
            name: "Tom B.",
            role: "Showroom Owner",
            location: "Arizona",
            rating: 5,
            quote: "CAST is our top-performing brand by a wide margin. The product sells itself, and the margins keep our business healthy. The dealer support team is genuinely exceptional.",
          },
          {
            name: "Karen M.",
            role: "Landscape Supply Dealer",
            location: "Georgia",
            rating: 5,
            quote: "We added CAST to our lineup two years ago and it has consistently been our best seller. The display program helped us showcase the product and the results were immediate.",
          },
          {
            name: "David L.",
            role: "Lighting Showroom Owner",
            location: "North Carolina",
            rating: 5,
            quote: "The exclusive territory protection was the deciding factor for us. We knew we could invest in building the CAST brand without competing against other local dealers.",
          },
        ]}
      />
      <ReadyCTA
        heading="Start Selling"
        headingAccent="CAST Lighting"
        btn1Label="Apply to Become a Dealer"
        btn1Href="/retail-signup"
        btn2Label="Contact Our Sales Team"
        btn2Href="/contact"
      />
    </>
  );
}
