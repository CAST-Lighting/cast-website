import { cache } from 'react';

import { fetchBlogPostBySlug } from '~/lib/airtable-blog';

export const getBlogPageData = cache(async (slug: string) => {
  const record = await fetchBlogPostBySlug(slug);
  if (!record) return null;

  const f = record.fields;

  // Tags: stored as comma-separated string
  const tags = f.Tags
    ? f.Tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return {
    name: 'CAST Lighting Blog',
    path: '/blog',
    post: {
      author: f.Author ?? null,
      htmlBody: f.Body ?? '',
      name: f.Title ?? '(Untitled)',
      publishedDate: {
        utc: f['Published Date']
          ? new Date(f['Published Date'] + 'T00:00:00Z').toISOString()
          : new Date().toISOString(),
      },
      tags,
      thumbnailImage: f['Featured Image URL']
        ? { altText: f.Title ?? '', url: f['Featured Image URL'] }
        : null,
      seo: {
        pageTitle: f['SEO Title'] ?? f.Title ?? '',
        metaDescription: f['Meta Description'] ?? '',
        metaKeywords: f.Tags ?? '',
      },
    },
  };
});
