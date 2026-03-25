#!/usr/bin/env node
// Migrates all BigCommerce blog posts to Airtable
// Usage: node scripts/migrate-blog-to-airtable.js
// Reads credentials from .env.local

const fs = require('fs');
const path = require('path');

// Load .env.local
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    env[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
  }
  return env;
}

const env = loadEnv();

const BC_STORE_HASH = 'o3r3vyxngd';
const BC_TOKEN = 'kwgxvplive3amj9olhkoqokxrn1hbxm';
const AIRTABLE_TOKEN = env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_ID = env.AIRTABLE_TABLE_ID;

const AT_BASE = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;
const BC_BASE = `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/v2`;

const CATEGORY_LIST = ['Installation', 'Product Guides', 'Design Tips', 'Case Studies', 'Industry News'];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extractSlug(url) {
  // url can be "/blog/some-slug/" or "/some-slug/" or "some-slug"
  if (!url) return '';
  const parts = url.replace(/^\/|\/$/g, '').split('/');
  // If last segment is empty or 'blog', try second to last
  const last = parts[parts.length - 1];
  if (last && last !== 'blog') return last;
  if (parts.length >= 2) return parts[parts.length - 2];
  return last || '';
}

function extractDate(dateVal) {
  if (!dateVal) return '';
  // BC v2 can return: ISO string, Unix timestamp (number), or {date, timezone_type, timezone} object
  if (typeof dateVal === 'object' && dateVal.date) {
    dateVal = dateVal.date;
  }
  if (typeof dateVal === 'number') {
    return new Date(dateVal * 1000).toISOString().slice(0, 10);
  }
  if (typeof dateVal === 'string') {
    // Could be "Mon, 31 Dec 2012 00:00:00 +0000" or ISO "2023-03-15T10:00:00+0000"
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return '';
}

function estimateReadTime(body) {
  if (!body) return 1;
  const wordCount = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 250));
}

function inferCategory(tags) {
  if (!Array.isArray(tags)) return 'Insights';
  for (const tag of tags) {
    if (CATEGORY_LIST.includes(tag)) return tag;
  }
  return 'Insights';
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
}

async function fetchBCPosts() {
  console.log('Fetching BigCommerce blog posts...');
  const posts = [];
  let page = 1;

  while (true) {
    const url = `${BC_BASE}/blog/posts?limit=250&page=${page}`;
    const res = await fetch(url, {
      headers: {
        'X-Auth-Token': BC_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`BC API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    if (!data || data.length === 0) break;
    posts.push(...data);
    console.log(`  Page ${page}: fetched ${data.length} posts (total so far: ${posts.length})`);
    if (data.length < 250) break;
    page++;
  }

  console.log(`Total BC posts fetched: ${posts.length}`);
  return posts;
}

async function checkExistingSlugs() {
  console.log('Checking existing Airtable records...');
  const slugs = new Set();
  let offset;

  do {
    const params = new URLSearchParams({ pageSize: '100' });
    if (offset) params.append('offset', offset);

    const res = await fetch(`${AT_BASE}?${params}`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(`Airtable error: ${res.status}`);
    const data = await res.json();
    for (const rec of data.records) {
      if (rec.fields.Slug) slugs.add(rec.fields.Slug);
    }
    offset = data.offset;
  } while (offset);

  console.log(`Existing slugs in Airtable: ${slugs.size}`);
  return slugs;
}

async function batchCreate(records) {
  // Airtable max 10 per request, rate limit ~5 req/sec
  const BATCH_SIZE = 10;
  let created = 0;
  let skipped = 0;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);

    const res = await fetch(AT_BASE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: batch.map((r) => ({ fields: r })),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Batch failed (${i}-${i + BATCH_SIZE}): ${res.status} ${text}`);
      skipped += batch.length;
    } else {
      created += batch.length;
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(records.length / BATCH_SIZE);
      console.log(`  Batch ${batchNum}/${totalBatches}: created ${batch.length} records`);
    }

    // Rate limit: 5 requests/second → wait 200ms between batches
    if (i + BATCH_SIZE < records.length) {
      await sleep(220);
    }
  }

  return { created, skipped };
}

async function main() {
  console.log('\n=== CAST Blog Migration: BigCommerce → Airtable ===\n');

  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    throw new Error('Missing Airtable credentials in .env.local');
  }

  const [bcPosts, existingSlugs] = await Promise.all([
    fetchBCPosts(),
    checkExistingSlugs(),
  ]);

  // Map BC posts to Airtable fields
  const toCreate = [];
  const toSkip = [];

  for (const post of bcPosts) {
    const slug = extractSlug(post.url);

    if (!slug) {
      console.warn(`Skipping post ${post.id} — no slug derived from url: ${post.url}`);
      continue;
    }

    if (existingSlugs.has(slug)) {
      toSkip.push(slug);
      continue;
    }

    const tags = Array.isArray(post.tags) ? post.tags : [];
    const tagsStr = tags.join(', ');

    const category = inferCategory(tags);

    const fields = {
      Title: post.title || '(Untitled)',
      Slug: slug,
      Status: post.is_published ? 'Published' : 'Draft',
      Body: post.body || '',
      Tags: tagsStr,
      Author: post.author || 'CAST Lighting Team',
      'Published Date': extractDate(post.published_date),
      'SEO Title': post.meta_title || post.title || '',
      'Meta Description': post.meta_description || stripHtml(post.body),
    };

    // Only include Category if it's a known option in Airtable (not the fallback)
    if (category !== 'Insights') {
      fields.Category = category;
    }

    if (post.thumbnail_path) {
      fields['Featured Image URL'] = post.thumbnail_path;
    }

    toCreate.push(fields);
  }

  if (toSkip.length > 0) {
    console.log(`\nSkipping ${toSkip.length} posts already in Airtable.`);
  }

  if (toCreate.length === 0) {
    console.log('\nAll posts already migrated. Nothing to do.');
    return;
  }

  console.log(`\nMigrating ${toCreate.length} posts to Airtable...`);
  const { created, skipped } = await batchCreate(toCreate);

  console.log('\n=== Migration Complete ===');
  console.log(`  Created: ${created}`);
  console.log(`  Skipped (errors): ${skipped}`);
  console.log(`  Already existed: ${toSkip.length}`);
  console.log(`  Total BC posts: ${bcPosts.length}`);
}

main().catch((err) => {
  console.error('\nMigration failed:', err.message);
  process.exit(1);
});
