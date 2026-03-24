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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "CAST Lighting Professional Outdoor Lighting Products",
    "description": "Professional outdoor lighting fixtures in solid brass and copper. Path lights, spot lights, well lights, transformers, and more. Lifetime warranty.",
    "url": "https://www.castlighting.com/shop",
    "numberOfItems": 500,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Path & Area Lights", "description": "Solid brass and copper path lights for landscape installations." },
      { "@type": "ListItem", "position": 2, "name": "Accent & Spot Lights", "description": "Directional spot and flood lights for uplighting and feature illumination." },
      { "@type": "ListItem", "position": 3, "name": "Transformers & Power Supply", "description": "Digital and smart low-voltage transformers for landscape lighting systems." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
