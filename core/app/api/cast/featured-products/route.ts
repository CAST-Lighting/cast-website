import { client } from '~/client'
import { graphql } from '~/client/graphql'

const FeaturedProductsQuery = graphql(`
  query CastFeaturedProducts {
    site {
      featuredProducts(first: 12) {
        edges {
          node {
            entityId
            name
            path
            defaultImage {
              url: urlTemplate(lossy: true)
              altText
            }
            prices {
              price {
                value
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`)

export async function GET() {
  try {
    const { data } = await client.fetch({
      document: FeaturedProductsQuery,
      fetchOptions: { next: { revalidate: 300 } },
    })

    const products = data?.site.featuredProducts.edges?.map((e) => {
      const p = e.node.prices?.price
      const price = p ? `$${p.value.toFixed(2)}` : ''
      return {
        entityId: e.node.entityId,
        name: e.node.name,
        path: e.node.path,
        image: (e.node.defaultImage?.url ?? '').replace('{:size}', '600x600'),
        imageAlt: e.node.defaultImage?.altText ?? e.node.name,
        price,
      }
    }) ?? []

    return Response.json(products)
  } catch {
    return Response.json([])
  }
}
