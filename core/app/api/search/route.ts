import { NextRequest, NextResponse } from "next/server"

const BC_STORE = process.env.BIGCOMMERCE_STORE_HASH || "o3r3vyxngd"
const BC_TOKEN = process.env.BIGCOMMERCE_ACCESS_TOKEN || process.env.BC_ACCESS_TOKEN || ""

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const keyword = searchParams.get("keyword") || ""
  const limit = Math.min(Number(searchParams.get("limit") || "12"), 50)
  const page = Math.max(Number(searchParams.get("page") || "1"), 1)
  const sort = searchParams.get("sort") || ""
  const direction = searchParams.get("direction") || "asc"
  const include = searchParams.get("include") || "images"

  if (!keyword.trim()) {
    return NextResponse.json({ products: [], total: 0 })
  }

  try {
    const params = new URLSearchParams({
      "keyword": keyword,
      "limit": String(limit),
      "page": String(page),
      "include": include,
    })

    if (sort) {
      params.set("sort", sort)
      params.set("direction", direction)
    }

    const res = await fetch(
      `https://api.bigcommerce.com/stores/${BC_STORE}/v3/catalog/products?${params}`,
      {
        headers: {
          "X-Auth-Token": BC_TOKEN,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      console.error(`BC search error: ${res.status}`)
      return NextResponse.json({ products: [], total: 0 })
    }

    const data = await res.json()
    const products = (data.data || []).map((p: Record<string, unknown>) => {
      const images = p.images as Array<{ url_standard?: string; url_thumbnail?: string; description?: string }> | undefined
      const primaryImage = images?.[0]
      const price = p.price as number | undefined
      const salePrice = p.sale_price as number | undefined
      const customUrl = p.custom_url as { url?: string } | undefined

      return {
        id: p.id,
        name: p.name,
        price: price != null ? `$${Number(price).toFixed(2)}` : "",
        salePrice: salePrice && salePrice > 0 && salePrice !== price
          ? `$${Number(salePrice).toFixed(2)}`
          : undefined,
        image: primaryImage?.url_standard || primaryImage?.url_thumbnail || null,
        href: customUrl?.url || `/product/${p.id}`,
        brand: (p.brand_id as number) ? undefined : undefined, // brand name not in v3 products, keep clean
      }
    })

    const total = data.meta?.pagination?.total ?? products.length

    return NextResponse.json({ products, total })
  } catch (err) {
    console.error("Search API error:", err)
    return NextResponse.json({ products: [], total: 0 }, { status: 500 })
  }
}
