import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import ShopHero from '~/lib/makeswift/components/cast/ShopHero';
import ShopGrid from '~/lib/makeswift/components/cast/ShopGrid';
import CategoryGrid from '~/lib/makeswift/components/cast/CategoryGrid';
import ReviewsCarousel from '~/lib/makeswift/components/cast/ReviewsCarousel';
import TradeProSection from '~/lib/makeswift/components/cast/TradeProSection';
import NewsletterCta from '~/lib/makeswift/components/cast/NewsletterCta';

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

  return (
    <>
      <ShopHero
        headline="Shop Professional Outdoor Lighting"
        subheadline="Built for contractors. Tested for decades."
      />
      <ShopGrid />
      <CategoryGrid />
      <ReviewsCarousel />
      <TradeProSection />
      <NewsletterCta />
    </>
  );
}
