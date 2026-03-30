import { NextRequest, NextResponse } from 'next/server';
import { getSessionCustomerAccessToken } from '~/auth';

const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH ?? '';
const IMPERSONATION_TOKEN = process.env.BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN ?? '';

interface WishlistItem {
  id: number;
  product_id: number;
}

interface WishlistResponse {
  data: Array<{
    id: number;
    name: string;
    customer_id: number;
    items: WishlistItem[];
  }>;
}

interface ProductResponse {
  data: {
    id: number;
    name: string;
    custom_url: { url: string };
    images: Array<{ url_standard: string; is_thumbnail: boolean; url_thumbnail: string }>;
    calculated_price: number;
    price: number;
  };
}

export async function GET(_req: NextRequest) {
  const customerAccessToken = await getSessionCustomerAccessToken();
  if (!customerAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch wishlists via GraphQL impersonation
    const wishlistsRes = await fetch(
      `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/wishlists?limit=1`,
      {
        headers: {
          'X-Auth-Token': IMPERSONATION_TOKEN,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        cache: 'no-store',
      },
    );

    if (!wishlistsRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch wishlists' }, { status: 500 });
    }

    const wishlistsData = (await wishlistsRes.json()) as WishlistResponse;
    const wishlists = wishlistsData.data ?? [];

    if (wishlists.length === 0) {
      return NextResponse.json([]);
    }

    const firstWishlist = wishlists[0];
    const items = firstWishlist?.items ?? [];

    // Fetch product details for each item
    const productDetails = await Promise.all(
      items.map(async (item) => {
        const productRes = await fetch(
          `https://api.bigcommerce.com/stores/${STORE_HASH}/v3/catalog/products/${item.product_id}?include=images`,
          {
            headers: {
              'X-Auth-Token': IMPERSONATION_TOKEN,
              Accept: 'application/json',
            },
            cache: 'no-store',
          },
        );

        if (!productRes.ok) return null;

        const productData = (await productRes.json()) as ProductResponse;
        const product = productData.data;
        const thumbnail = product.images?.find((img) => img.is_thumbnail) ?? product.images?.[0];

        return {
          id: item.id,
          productId: product.id,
          name: product.name,
          price: `$${(product.calculated_price ?? product.price ?? 0).toFixed(2)}`,
          image: thumbnail ? { url: thumbnail.url_standard, alt: product.name } : null,
          href: product.custom_url?.url ?? `/products/${product.id}`,
        };
      }),
    );

    return NextResponse.json(productDetails.filter(Boolean));
  } catch (err) {
    console.error('[favorites API]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
