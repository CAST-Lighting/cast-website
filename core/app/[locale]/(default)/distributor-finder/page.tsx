import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import DistributorFinder from '~/lib/makeswift/components/cast/DistributorFinder';
import ContentMedia from '~/lib/makeswift/components/cast/ContentMedia';
import BrandLogos from '~/lib/makeswift/components/cast/BrandLogos';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Find a CAST Distributor Near You | CAST Lighting',
  description:
    'Locate an authorized CAST Lighting distributor in your region. Professional landscape supply distributors carrying the full CAST product line.',
};

export default async function DistributorFinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const whyDistributeFeatures = [
    {
      title: 'Strong Brand Recognition',
      desc: 'CAST is the most recognized name in professional landscape lighting — customers ask for it by name.',
    },
    {
      title: 'High Sell-Through Rates',
      desc: 'Contractors who discover CAST return again and again. Low return rates and high repeat purchases.',
    },
    {
      title: 'Exclusive Territory Options',
      desc: 'Qualified distributors can secure exclusive or semi-exclusive territory protection.',
    },
    {
      title: 'Marketing Support Provided',
      desc: 'CAST provides product photography, catalog materials, and co-op advertising funds.',
    },
  ];

  return (
    <>
      <DistributorFinder
        overline="Find Or Become A Distributor"
        heading="CAST Distribution Partners"
        subheading="CAST Lighting works with a select network of professional landscape supply distributors. Find a distributor in your region, or apply to carry CAST in your market."
        formHeading="Apply To Become A CAST Distributor"
      />

      <ContentMedia
        heading="Can't Find a Distributor"
        headingAccent="Near You?"
        bodyText="CAST is actively expanding its distribution network across North America. If there's no distributor in your market, this is your opportunity. Our distribution partners enjoy exclusive territory protection, industry-leading margins, and full CAST marketing support."
        features={whyDistributeFeatures}
        btn1Label="Inquire About Distribution"
        btn1Href="/retail-signup"
        btn2Label="Call Us: (973) 423-2303"
        btn2Href="tel:9734232303"
        stat="10,000+"
        statLabel="Contractors Served"
      />

      <BrandLogos
        overline="Distributed to the Industry's Best"
        heading="Leading Landscape Companies Trust CAST"
      />
    </>
  );
}
