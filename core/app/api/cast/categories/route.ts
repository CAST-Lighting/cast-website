import { client } from '~/client'
import { graphql } from '~/client/graphql'

const CategoriesQuery = graphql(`
  query CastCategories {
    site {
      categoryTree {
        name
        path
        children {
          name
          path
        }
      }
    }
  }
`)

export async function GET() {
  try {
    const { data } = await client.fetch({
      document: CategoriesQuery,
      fetchOptions: { next: { revalidate: 3600 } },
    })

    const categories = data?.site.categoryTree?.map((cat) => ({
      name: cat.name,
      path: cat.path,
    })) ?? []

    return Response.json(categories)
  } catch {
    return Response.json([])
  }
}
