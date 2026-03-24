import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import { Page } from '~/lib/makeswift/page';
import '~/lib/makeswift/components';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Become a CAST Authorized Retailer | CAST Lighting',
  description: 'Partner with the industry leader in professional outdoor lighting. High margins, marketing support, exclusive territory, and dealer training.',
};

export default async function RetailSignupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Page path="/retail-signup" locale={locale} />;
}
