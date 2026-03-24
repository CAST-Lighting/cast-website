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
  description:
    'Browse 500+ professional outdoor lighting fixtures — path lights, spot lights, well lights, transformers, and more. Solid brass and copper construction. Lifetime warranty.',
};

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ShopHero
        headline="Shop Professional Outdoor Lighting"
        subheadline="Built for contractors. Tested for decades. Trusted by the industry."
        ctaLabel="Browse All Products"
        ctaHref="#shop-grid"
        showSearch={true}
      />

      <div id="shop-grid">
        <ShopGrid />
      </div>

      <CategoryGrid
        sectionTitle="Shop by"
        sectionTitleAccent="Category"
        sectionDescription="Explore our full range of professional landscape lighting solutions — from path lights to transformers."
      />

      <ReviewsCarousel
        overline="What Our Customers Say"
        heading="Trusted by Contractors"
        headingAccent="Nationwide"
      />

      <TradeProSection
        overline="For Landscape Professionals"
        heading="The TradePro"
        headingAccent="Advantage"
        btnLabel="Join TradePro Program"
        btnHref="/trade-pro"
      />

      <NewsletterCta
        heading="Stay Ahead of the Industry"
        description="New products, contractor resources, and exclusive TradePro offers — delivered to your inbox."
      />
    </>
  );
}
