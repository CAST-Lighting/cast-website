import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import ContractorFinder from '~/lib/makeswift/components/cast/ContractorFinder';
import ContentMedia from '~/lib/makeswift/components/cast/ContentMedia';
import BrandLogos from '~/lib/makeswift/components/cast/BrandLogos';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Find a Certified CAST Installer | CAST Lighting',
  description:
    'Find a certified CAST Lighting installer near you. All contractors in our network are TradePro certified, vetted by CAST, and trained on our full product line.',
};

export default async function ContractorFinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const certificationFeatures = [
    {
      title: 'All Installers Are TradePro Certified',
      desc: "Every contractor listed has completed CAST's TradePro certification and maintains active membership.",
    },
    {
      title: 'Vetted and Approved by CAST',
      desc: 'We personally review each applicant for quality of work, customer service, and professionalism.',
    },
    {
      title: 'Fully Insured Professionals',
      desc: 'All listed contractors carry full general liability and workmanship insurance.',
    },
    {
      title: 'Trained on CAST Products',
      desc: 'Certified installers have completed CAST factory training on installation best practices and product specifications.',
    },
  ];

  return (
    <>
      <ContractorFinder
        overline="Find A Professional Installer"
        heading="Find A CAST Installer Near You"
        subheading="Connect with CAST-certified landscape lighting contractors in your area. Every professional in our network is trained on CAST products and committed to quality installation."
      />

      <ContentMedia
        heading="Find a Certified CAST"
        headingAccent="Installer Near You"
        bodyText="Not all landscape lighting contractors are equal. CAST-certified installers have been trained on our product line, vetted for quality, and are committed to delivering results that meet the CAST standard. When you hire from our network, you know you're getting the best."
        features={certificationFeatures}
        btn1Label="Are You a Contractor?"
        btn1Href="/trade-pro"
        btn2Label="View Products"
        btn2Href="/shop"
        stat="500+"
        statLabel="Certified Installers"
      />

      <BrandLogos
        overline="Trusted By The Industry"
        heading="10,000+ Professionals Choose CAST"
      />
    </>
  );
}
