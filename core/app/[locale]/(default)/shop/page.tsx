import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import { Page } from '~/lib/makeswift/page';
import '~/lib/makeswift/components';

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Shop Professional Outdoor Lighting | CAST Lighting',
  description: 'Browse professional outdoor lighting fixtures — path lights, spot lights, well lights, transformers, and more. Solid brass and copper construction. Lifetime warranty.',
};

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Page path="/shop" locale={locale} />;
}
