import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import { Page } from '~/lib/makeswift/page';
import '~/lib/makeswift/components';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'TradePro Program — Contractor Pricing & Support | CAST Lighting',
  description: 'Join 10,000+ landscape professionals in the CAST TradePro program. Exclusive contractor pricing, lifetime warranty, dedicated support. Apply free.',
};

export default async function TradeProPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Page path="/trade-pro" locale={locale} />;
}
