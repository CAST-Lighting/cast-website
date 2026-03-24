import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import ContractorFinder from '~/lib/makeswift/components/cast/ContractorFinder';
import ContentMedia from '~/lib/makeswift/components/cast/ContentMedia';
import BrandLogos from '~/lib/makeswift/components/cast/BrandLogos';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Find a CAST Certified Installer Near You | CAST Lighting',
  description: 'Search our network of CAST-certified landscape lighting contractors. TradePro certified, vetted by CAST, fully insured, and trained on every product.',
};

export default async function ContractorFinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContractorFinder
        overline="Find A Professional Installer"
        heading="Find A CAST Installer Near You"
      />
      <ContentMedia
        heading="Why Choose a"
        headingAccent="CAST Installer"
        features={[
          { title: "TradePro Certified", desc: "Every installer in our network has completed the CAST TradePro certification program." },
          { title: "Vetted by CAST", desc: "Our team reviews each contractor before they are listed in the installer directory." },
          { title: "Fully Insured", desc: "All CAST-listed contractors carry liability insurance and are properly licensed." },
          { title: "Trained on CAST Products", desc: "Certified installers receive hands-on training directly from CAST on every product line." },
        ]}
        btn1Label="Apply for TradePro"
        btn1Href="/trade-pro"
        btn2Label="Learn More"
        btn2Href="/about"
      />
      <BrandLogos />
    </>
  );
}
