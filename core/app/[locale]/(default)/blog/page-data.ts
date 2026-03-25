import { getFormatter } from 'next-intl/server';
import { cache } from 'react';

import { fetchAllBlogPosts } from '~/lib/airtable-blog';

// Cursor encoding: btoa("offset:N") where N is the start index
function encodeCursor(offset: number): string {
  return Buffer.from(`offset:${offset}`).toString('base64');
}

function decodeCursor(cursor: string): number {
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf8');
    const match = /^offset:(\d+)$/.exec(decoded);
    return match ? parseInt(match[1]!, 10) : 0;
  } catch {
    return 0;
  }
}

interface BlogPostsFiltersInput {
  tag: string | null;
}

interface Pagination {
  limit: number;
  before: string | null;
  after: string | null;
}

export const getBlog = cache(async () => {
  return {
    name: 'CAST Lighting Blog',
    description:
      'Lighting tips, installation guides, and industry insights for landscape professionals.',
    path: '/blog',
  };
});

export const getBlogPosts = cache(
  async ({ tag, limit = 9, before, after }: BlogPostsFiltersInput & Pagination) => {
    const allRecords = await fetchAllBlogPosts({ statusFilter: 'Published' });

    // Filter by tag if provided
    const filtered = tag
      ? allRecords.filter((r) => {
          const tags = (r.fields.Tags ?? '').split(',').map((t) => t.trim());
          return tags.includes(tag);
        })
      : allRecords;

    const total = filtered.length;

    // Determine start index from cursors
    let startIndex = 0;
    if (after) {
      startIndex = decodeCursor(after);
    } else if (before) {
      const beforeIndex = decodeCursor(before);
      startIndex = Math.max(0, beforeIndex - limit);
    }

    const page = filtered.slice(startIndex, startIndex + limit);
    const hasNextPage = startIndex + limit < total;
    const hasPreviousPage = startIndex > 0;

    const format = await getFormatter();

    return {
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor: hasPreviousPage ? encodeCursor(startIndex) : null,
        endCursor: hasNextPage ? encodeCursor(startIndex + limit) : null,
      },
      posts: page.map((record) => {
        const fields = record.fields;
        const slug = fields.Slug ?? record.id;
        const dateStr = fields['Published Date'];
        const date = dateStr
          ? format.dateTime(new Date(dateStr))
          : '';
        const imgUrl = fields['Featured Image URL'];

        // Plain text summary from Body
        const plainBody = (fields.Body ?? '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        return {
          id: record.id,
          author: fields.Author ?? null,
          content: plainBody.slice(0, 200) || null,
          date,
          image: imgUrl ? { src: imgUrl, alt: fields.Title ?? '' } : undefined,
          href: `/blog/${slug}`,
          title: fields.Title ?? '(Untitled)',
        };
      }),
    };
  },
);
