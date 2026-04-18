import { fetchAllBlogPosts, createBlogPost } from '~/lib/airtable-blog';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() ?? '';
    const status = searchParams.get('status') ?? undefined;

    const records = await fetchAllBlogPosts({ statusFilter: status, noCache: true });

    const posts = records.map((r) => ({
      id: r.id,
      title: r.fields.Title ?? '',
      slug: r.fields.Slug ?? '',
      status: r.fields.Status ?? 'Draft',
      category: r.fields.Category ?? '',
      tags: r.fields.Tags ?? '',
      author: r.fields.Author ?? '',
      publishedDate: r.fields['Published Date'] ?? '',
      readTime: r.fields['Read Time'] ?? 1,
      featuredImageUrl: r.fields['Featured Image URL'] ?? '',
      seoTitle: r.fields['SEO Title'] ?? '',
      metaDescription: r.fields['Meta Description'] ?? '',
      body: r.fields.Body ?? '',
    }));

    // Deduplicate by Airtable record ID to guard against pagination overlap or
    // duplicate records in the base
    const seen = new Set<string>();
    const dedupedPosts = posts.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });

    const filtered = search
      ? dedupedPosts.filter(
          (p) =>
            p.title.toLowerCase().includes(search) ||
            p.slug.toLowerCase().includes(search) ||
            p.author.toLowerCase().includes(search),
        )
      : dedupedPosts;

    return Response.json(filtered);
  } catch (err) {
    console.error('[GET /api/cast/blog]', err);
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.slug) {
      return Response.json({ error: 'Title and Slug are required' }, { status: 400 });
    }

    const fields: Record<string, unknown> = {
      Title: body.title,
      Slug: body.slug,
      Status: body.status ?? 'Draft',
      Body: body.body ?? '',
      Category: body.category ?? 'Landscape Lighting',
      Tags: body.tags ?? '',
      Author: body.author ?? 'CAST Lighting Team',
      'Read Time': String(body.readTime ?? '1 min'),
      'Published Date': body.publishedDate ?? new Date().toISOString().slice(0, 10),
      'SEO Title': body.seoTitle ?? body.title,
      'Meta Description': body.metaDescription ?? '',
    };

    if (body.featuredImageUrl) {
      fields['Featured Image URL'] = body.featuredImageUrl;
    }
    if (body.audioUrl) {
      fields['Audio URL'] = body.audioUrl;
    }

    const record = await createBlogPost(fields as Parameters<typeof createBlogPost>[0]);

    return Response.json({
      id: record.id,
      ...record.fields,
    });
  } catch (err) {
    console.error('[POST /api/cast/blog]', err);
    const message = err instanceof Error ? err.message : 'Failed to create post';
    return Response.json({ error: message }, { status: 500 });
  }
}
