import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import DistributorFinder from '~/lib/makeswift/components/cast/DistributorFinder';
import ContentMedia from '~/lib/makeswift/components/cast/ContentMedia';
import BrandLogos from '~/lib/makeswift/components/cast/BrandLogos';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Find a CAST Lighting Distributor | CAST Lighting',
  description: 'Find CAST Lighting distribution partners near you. Strong brand recognition, high sell-through rates, exclusive territory options, and full marketing support.',
};

export default async function DistributorFinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <DistributorFinder
        overline="Find A Distributor"
        heading="Find A CAST Distributor Near You"
      />
      <ContentMedia
        heading="Why Distribute CAST Lighting?"
        features={[
          { title: "Strong Brand Recognition", desc: "CAST is a trusted name among landscape contractors and designers nationwide." },
          { title: "High Sell-Through Rates", desc: "Professional-grade products that contractors actively seek out and specify by name." },
          { title: "Exclusive Territory Options", desc: "Protected territory agreements available for qualified distribution partners." },
          { title: "Marketing Support", desc: "Co-op marketing funds, digital assets, and a dedicated distributor support team." },
        ]}
        btn1Label="Apply to Distribute"
        btn1Href="/distributor-finder"
        btn2Label="Contact Us"
        btn2Href="/contact"
      />
      <BrandLogos />
    </>
  );
}
