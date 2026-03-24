import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import { Page } from '~/lib/makeswift/page';
import '~/lib/makeswift/components';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Find a CAST Distributor Near You | CAST Lighting',
  description: 'Locate an authorized CAST Lighting distributor in your region. Professional landscape supply distributors carrying the full CAST product line.',
};

export default async function DistributorFinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Page path="/distributor-finder" locale={locale} />;
}
