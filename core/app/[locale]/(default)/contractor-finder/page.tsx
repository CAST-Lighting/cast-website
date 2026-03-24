import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import { Page } from '~/lib/makeswift/page';
import '~/lib/makeswift/components';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Find a Certified CAST Installer | CAST Lighting',
  description: 'Find a certified CAST Lighting installer near you. All contractors in our network are TradePro certified, vetted by CAST, and trained on our full product line.',
};

export default async function ContractorFinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Page path="/contractor-finder" locale={locale} />;
}
