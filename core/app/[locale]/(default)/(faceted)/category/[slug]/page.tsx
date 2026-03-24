import { setRequestLocale } from 'next-intl/server';
import { type Metadata } from 'next';
import ShopGrid from '~/lib/makeswift/components/cast/ShopGrid';
import TradeProSection from '~/lib/makeswift/components/cast/TradeProSection';
import ReadyCTA from '~/lib/makeswift/components/cast/ReadyCTA';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

const CATEGORY_NAMES: Record<number, string> = {
  19: 'Accessories',
  23: 'All Products',
  24: 'Path Lights',
  25: 'Spot & Accent Lights',
  26: 'Area Lights',
  27: 'LED Lamps & Modules',
  28: 'Bluetooth Color Control',
  29: 'Wall Lights',
  30: 'Capstone Lights',
  31: 'Bullet Lights',
  32: 'Down Lights',
  34: 'Wall Wash',
  35: 'Ground Lights',
  37: 'Lamps',
  38: 'Path Light Modules',
  39: 'Accessories',
  45: 'Transformers',
  47: 'Range Extenders',
  50: 'Smart Controls',
  63: 'In-Ground Lights',
};

interface BCProduct {
  id: number;
  name: string;
  price: number;
  custom_url: { url: string };
  categories: number[];
  images: Array<{ url_standard: string; is_thumbnail: boolean }>;
}

async function fetchCategoryProducts(categoryId: number): Promise<BCProduct[]> {
  try {
    const url = categoryId === 23
      ? 'https://api.bigcommerce.com/stores/o3r3vyxngd/v3/catalog/products?limit=50&include=images&is_visible=true'
      : `https://api.bigcommerce.com/stores/o3r3vyxngd/v3/catalog/products?limit=50&include=images&is_visible=true&categories:in=${categoryId}`;

    const res = await fetch(url, {
      headers: {
        'X-Auth-Token': 'm44g12165hann457yzf0156dbc9qdp9',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json() as { data: BCProduct[] };
    return (data.data || []).filter(p => p.id !== 115 && p.name !== 'Test');
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryId = Number(slug);
  const name = CATEGORY_NAMES[categoryId] ?? 'Products';
  return {
    title: `${name} | CAST Lighting`,
    description: `Shop CAST Lighting ${name} — professional outdoor lighting in solid brass and copper. Lifetime warranty on every fixture.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const categoryId = Number(slug);
  const categoryName = CATEGORY_NAMES[categoryId] ?? 'Products';

  const bcProducts = await fetchCategoryProducts(categoryId);

  const products = bcProducts.map(p => {
    const thumbnail = p.images?.find(img => img.is_thumbnail) ?? p.images?.[0];
    const nonAllCat = p.categories?.find(id => id !== 23);
    const category = nonAllCat ? (CATEGORY_NAMES[nonAllCat] ?? 'Products') : 'Products';
    const price = `$${p.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return {
      image: thumbnail?.url_standard,
      name: p.name,
      price,
      href: p.custom_url?.url,
      category,
    };
  });

  return (
    <>
      {/* Category Hero */}
      <div style={{
        background: 'linear-gradient(180deg, #0d1620 0%, #1a2332 100%)',
        padding: '64px 0 48px',
      }}>
        <div className="site-container">
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--color-accent, #c8972a)',
            margin: '0 0 12px',
          }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
            {' / '}
            <a href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</a>
            {' / '}
            {categoryName}
          </p>
          <h1 style={{
            fontFamily: "'Essonnes', 'Playfair Display', serif",
            fontSize: 'var(--h1-size, 3rem)',
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}>
            {categoryName}
          </h1>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 17,
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
          }}>
            {products.length} professional-grade fixture{products.length !== 1 ? 's' : ''} — solid brass and copper, lifetime warranty
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <ShopGrid products={products} />

      {/* TradePro CTA */}
      <TradeProSection
        overline="For Landscape Professionals"
        heading="The TradePro"
        headingAccent="Advantage"
        btnLabel="Join TradePro Program"
        btnHref="/trade-pro"
      />

      <ReadyCTA
        heading="Need Help Choosing?"
        headingAccent="We can help."
        body="Our lighting experts are available to help you select the right fixtures for your project. Call us or start your TradePro application today."
        btn1Label="Call Us: (973) 423-2303"
        btn1Href="tel:9734232303"
        btn2Label="Join TradePro"
        btn2Href="/trade-pro"
      />
    </>
  );
}
