import { NextRequest, NextResponse } from 'next/server';
import { addToOrCreateCart } from '~/lib/cart';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { productId?: number; quantity?: number };
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    await addToOrCreateCart({
      lineItems: [
        {
          productEntityId: productId,
          selectedOptions: {},
          quantity,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[cart/add]', err);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}
