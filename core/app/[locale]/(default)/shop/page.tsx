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

const CATEGORY_MAP: Record<number, string> = {
  23: 'All Products',
  24: 'Path Lights',
  25: 'Spot & Accent Lights',
  26: 'Area Lights',
  27: 'LED Lamps & Modules',
  28: 'Bluetooth Color Control',
  29: 'Wall Lights',
  30: 'Capstone Lights',
  31: 'Bullet Lights',
  34: 'Wall Wash',
  35: 'Ground Lights',
  37: 'Lamps',
  38: 'Path Light Modules',
  39: 'Accessories',
  47: 'Range Extenders',
  50: 'Smart Controls',
  63: 'In-Ground Lights',
}

interface BCProduct {
  id: number
  name: string
  price: number
  custom_url: { url: string }
  categories: number[]
  images: Array<{ url_standard: string; is_thumbnail: boolean }>
}

async function fetchBCProducts() {
  try {
    const res = await fetch(
      'https://api.bigcommerce.com/stores/o3r3vyxngd/v3/catalog/products?limit=50&include=images&is_visible=true',
      {
        headers: { 'X-Auth-Token': 'm44g12165hann457yzf0156dbc9qdp9', 'Content-Type': 'application/json' },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []
    const data = await res.json() as { data: BCProduct[] }
    const products = data.data || []

    return products
      .filter(p => p.id !== 115 && p.name !== 'Test')
      .map(p => {
        const thumbnail = p.images?.find(img => img.is_thumbnail) ?? p.images?.[0]
        const nonAllCat = p.categories?.find(id => id !== 23)
        const category = nonAllCat ? (CATEGORY_MAP[nonAllCat] ?? 'Products') : 'Products'
        const price = `$${p.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        return {
          image: thumbnail?.url_standard,
          name: p.name,
          price,
          href: p.custom_url?.url,
          category,
        }
      })
  } catch {
    return []
  }
}

export const metadata: Metadata = {
  title: 'Shop Professional Outdoor Lighting | CAST Lighting',
  description: 'Browse professional outdoor lighting fixtures — path lights, spot lights, well lights, transformers, and more. Solid brass and copper construction. Lifetime warranty.',
};

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products = await fetchBCProducts()

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
      <ShopGrid products={products} />
      <CategoryGrid />
      <ReviewsCarousel />
      <TradeProSection />
      <NewsletterCta />
    </>
  );
}
