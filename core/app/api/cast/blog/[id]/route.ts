import {
  fetchBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from '~/lib/airtable-blog';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const record = await fetchBlogPostById(id);
    if (!record) return Response.json({ error: 'Not found' }, { status: 404 });

    return Response.json({
      id: record.id,
      title: record.fields.Title ?? '',
      slug: record.fields.Slug ?? '',
      status: record.fields.Status ?? 'Draft',
      category: record.fields.Category ?? '',
      tags: record.fields.Tags ?? '',
      author: record.fields.Author ?? '',
      publishedDate: record.fields['Published Date'] ?? '',
      readTime: record.fields['Read Time'] ?? 1,
      featuredImageUrl: record.fields['Featured Image URL'] ?? '',
      audioUrl: record.fields['Audio URL'] ?? '',
      seoTitle: record.fields['SEO Title'] ?? '',
      metaDescription: record.fields['Meta Description'] ?? '',
      body: record.fields.Body ?? '',
    });
  } catch (err) {
    console.error('[GET /api/cast/blog/[id]]', err);
    return Response.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const fields: Record<string, unknown> = {};
    if (body.title !== undefined) fields['Title'] = body.title;
    if (body.slug !== undefined) fields['Slug'] = body.slug;
    if (body.status !== undefined) fields['Status'] = body.status;
    if (body.body !== undefined) fields['Body'] = body.body;
    if (body.category !== undefined) fields['Category'] = body.category;
    if (body.tags !== undefined) fields['Tags'] = body.tags;
    if (body.author !== undefined) fields['Author'] = body.author;
    if (body.readTime !== undefined) fields['Read Time'] = body.readTime;
    if (body.publishedDate !== undefined) fields['Published Date'] = body.publishedDate;
    if (body.seoTitle !== undefined) fields['SEO Title'] = body.seoTitle;
    if (body.metaDescription !== undefined) fields['Meta Description'] = body.metaDescription;
    if (body.featuredImageUrl !== undefined) fields['Featured Image URL'] = body.featuredImageUrl;
    if (body.audioUrl !== undefined) fields['Audio URL'] = body.audioUrl;

    const record = await updateBlogPost(
      id,
      fields as Parameters<typeof updateBlogPost>[1],
    );

    return Response.json({ id: record.id, ...record.fields });
  } catch (err) {
    console.error('[PUT /api/cast/blog/[id]]', err);
    return Response.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    await deleteBlogPost(id);
    return Response.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/cast/blog/[id]]', err);
    return Response.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
