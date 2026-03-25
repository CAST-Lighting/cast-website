'use client';

import { useState, useEffect, useCallback } from 'react';

const ADMIN_PASSWORD = 'cast2026admin';

const CATEGORIES = [
  'Installation',
  'Product Guides',
  'Design Tips',
  'Case Studies',
  'Industry News',
  'Insights',
];

interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  tags: string;
  author: string;
  publishedDate: string;
  readTime: number;
  featuredImageUrl: string;
  seoTitle: string;
  metaDescription: string;
  body: string;
}

const emptyForm = (): Omit<Post, 'id'> => ({
  title: '',
  slug: '',
  status: 'Draft',
  category: 'Insights',
  tags: '',
  author: 'CAST Lighting Team',
  publishedDate: new Date().toISOString().slice(0, 10),
  readTime: 1,
  featuredImageUrl: '',
  seoTitle: '',
  metaDescription: '',
  body: '',
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const S = {
  page: {
    background: '#0f1923',
    minHeight: '100vh',
    fontFamily: "'Barlow', sans-serif",
    color: '#e8edf2',
  } as React.CSSProperties,
  header: {
    background: '#141e2a',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerTitle: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  headerDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#007CB0',
  },
  body: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '32px 24px',
  },
  row: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap' as const,
  },
  input: {
    background: '#1a2332',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6,
    color: '#e8edf2',
    fontFamily: "'Barlow', sans-serif",
    fontSize: 14,
    padding: '9px 14px',
    outline: 'none',
  },
  btnPrimary: {
    background: '#007CB0',
    border: 'none',
    borderRadius: 6,
    color: '#fff',
    cursor: 'pointer',
    fontFamily: "'Barlow', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.04em',
    padding: '9px 20px',
    transition: 'background 150ms',
  },
  btnGhost: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 6,
    color: 'rgba(255,255,255,0.65)',
    cursor: 'pointer',
    fontFamily: "'Barlow', sans-serif",
    fontSize: 13,
    padding: '8px 16px',
    transition: 'border-color 150ms',
  },
  btnDanger: {
    background: 'transparent',
    border: '1px solid rgba(220,60,60,0.35)',
    borderRadius: 6,
    color: '#e05555',
    cursor: 'pointer',
    fontFamily: "'Barlow', sans-serif",
    fontSize: 12,
    padding: '6px 12px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 13,
  },
  th: {
    background: '#1a2332',
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    fontSize: 11,
    padding: '10px 14px',
    textAlign: 'left' as const,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  td: {
    padding: '12px 14px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    verticalAlign: 'middle' as const,
  },
  statusBadge: (status: string) => ({
    display: 'inline-block',
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    padding: '3px 8px',
    borderRadius: 4,
    background: status === 'Published' ? 'rgba(0,124,176,0.18)' : 'rgba(255,255,255,0.08)',
    color: status === 'Published' ? '#7EBEE8' : 'rgba(255,255,255,0.45)',
    border: `1px solid ${status === 'Published' ? 'rgba(0,124,176,0.3)' : 'rgba(255,255,255,0.12)'}`,
  }),
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.65)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflowY: 'auto' as const,
    padding: '40px 16px',
  },
  modal: {
    background: '#1a2332',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    width: '100%',
    maxWidth: 760,
    padding: 32,
    position: 'relative' as const,
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.5)',
    display: 'block',
    marginBottom: 6,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fullInput: {
    background: '#0f1923',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6,
    color: '#e8edf2',
    fontFamily: "'Barlow', sans-serif",
    fontSize: 14,
    padding: '9px 14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    background: '#0f1923',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6,
    color: '#e8edf2',
    fontFamily: "'Barlow', sans-serif",
    fontSize: 13,
    padding: '10px 14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    lineHeight: 1.6,
  },
  select: {
    background: '#0f1923',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 6,
    color: '#e8edf2',
    fontFamily: "'Barlow', sans-serif",
    fontSize: 14,
    padding: '9px 14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  errorMsg: {
    color: '#e05555',
    fontSize: 13,
    marginTop: 4,
  },
};

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onAuth();
    } else {
      setError('Incorrect password.');
      setPw('');
    }
  }

  return (
    <div
      style={{
        ...S.page,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#141e2a',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10,
          padding: 40,
          width: 360,
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#007CB0',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="11"
                width="18"
                height="11"
                rx="2"
                stroke="#fff"
                strokeWidth="1.5"
              />
              <path
                d="M7 11V7a5 5 0 0110 0v4"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <h2
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: '#fff',
            margin: '16px 0 6px',
          }}
        >
          CAST Blog Admin
        </h2>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            margin: '0 0 28px',
          }}
        >
          Enter admin password to continue.
        </p>
        <form onSubmit={submit}>
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError('');
            }}
            placeholder="Password"
            autoFocus
            style={{
              ...S.fullInput,
              marginBottom: error ? 8 : 16,
              textAlign: 'center',
            }}
          />
          {error && <p style={{ ...S.errorMsg, marginBottom: 12 }}>{error}</p>}
          <button type="submit" style={{ ...S.btnPrimary, width: '100%' }}>
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Post Form Modal ──────────────────────────────────────────────────────────
function PostModal({
  post,
  onClose,
  onSave,
}: {
  post: Post | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const isEdit = !!post;
  const [form, setForm] = useState<Omit<Post, 'id'>>(
    post ? { ...post } : emptyForm(),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function setField(key: keyof Omit<Post, 'id'>, value: string | number) {
    setForm((f) => {
      const updated = { ...f, [key]: value };
      // Auto-estimate read time from body
      if (key === 'body') {
        const words = (value as string)
          .replace(/<[^>]+>/g, ' ')
          .split(/\s+/)
          .filter(Boolean).length;
        updated.readTime = Math.max(1, Math.ceil(words / 250));
      }
      return updated;
    });
  }

  function handleTitleChange(v: string) {
    setForm((f) => ({
      ...f,
      title: v,
      slug: isEdit ? f.slug : slugify(v),
      seoTitle: isEdit ? f.seoTitle : v,
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError('Title and Slug are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const url = isEdit ? `/api/cast/blog/${post!.id}` : '/api/cast/blog';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Save failed');
      }
      onSave();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  }

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              margin: 0,
            }}
          >
            {isEdit ? 'Edit Post' : 'New Post'}
          </h2>
          <button onClick={onClose} style={{ ...S.btnGhost, padding: '6px 12px' }}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSave}>
          {/* Title */}
          <div style={S.fieldGroup}>
            <label style={S.label}>Title *</label>
            <input
              style={S.fullInput}
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              required
            />
          </div>

          {/* Slug */}
          <div style={S.fieldGroup}>
            <label style={S.label}>Slug *</label>
            <input
              style={S.fullInput}
              value={form.slug}
              onChange={(e) => setField('slug', slugify(e.target.value))}
              placeholder="url-slug-here"
              required
            />
          </div>

          {/* Status + Category */}
          <div style={S.grid2}>
            <div style={S.fieldGroup}>
              <label style={S.label}>Status</label>
              <select
                style={S.select}
                value={form.status}
                onChange={(e) => setField('status', e.target.value)}
              >
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Category</label>
              <select
                style={S.select}
                value={form.category}
                onChange={(e) => setField('category', e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Author + Published Date */}
          <div style={S.grid2}>
            <div style={S.fieldGroup}>
              <label style={S.label}>Author</label>
              <input
                style={S.fullInput}
                value={form.author}
                onChange={(e) => setField('author', e.target.value)}
                placeholder="Author name"
              />
            </div>
            <div style={S.fieldGroup}>
              <label style={S.label}>Published Date</label>
              <input
                type="date"
                style={S.fullInput}
                value={form.publishedDate}
                onChange={(e) => setField('publishedDate', e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={S.fieldGroup}>
            <label style={S.label}>Tags (comma-separated)</label>
            <input
              style={S.fullInput}
              value={form.tags}
              onChange={(e) => setField('tags', e.target.value)}
              placeholder="Installation, LED, Pathway"
            />
          </div>

          {/* Featured Image URL */}
          <div style={S.fieldGroup}>
            <label style={S.label}>Featured Image URL</label>
            <input
              style={S.fullInput}
              value={form.featuredImageUrl}
              onChange={(e) => setField('featuredImageUrl', e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* SEO Title */}
          <div style={S.fieldGroup}>
            <label style={S.label}>SEO Title</label>
            <input
              style={S.fullInput}
              value={form.seoTitle}
              onChange={(e) => setField('seoTitle', e.target.value)}
              placeholder="SEO page title"
            />
          </div>

          {/* Meta Description */}
          <div style={S.fieldGroup}>
            <label style={S.label}>Meta Description</label>
            <textarea
              style={{ ...S.textarea, minHeight: 72 }}
              value={form.metaDescription}
              onChange={(e) => setField('metaDescription', e.target.value)}
              placeholder="Short description for search engines..."
            />
          </div>

          {/* Body */}
          <div style={S.fieldGroup}>
            <label style={S.label}>
              Body (HTML)
              {form.readTime > 0 && (
                <span
                  style={{
                    marginLeft: 8,
                    fontWeight: 400,
                    textTransform: 'none',
                    color: '#007CB0',
                  }}
                >
                  ~{form.readTime} min read
                </span>
              )}
            </label>
            <textarea
              style={{ ...S.textarea, minHeight: 280 }}
              value={form.body}
              onChange={(e) => setField('body', e.target.value)}
              placeholder="<p>Post content here...</p>"
            />
          </div>

          {error && <p style={S.errorMsg}>{error}</p>}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" onClick={onClose} style={S.btnGhost}>
              Cancel
            </button>
            <button type="submit" style={S.btnPrimary} disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function CastAdminPage() {
  const [authed, setAuthed] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalPost, setModalPost] = useState<Post | null | 'new'>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Post | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cast/blog');
      if (!res.ok) throw new Error('Failed to load');
      const data: Post[] = await res.json();
      setPosts(data);
    } catch {
      showToast('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) void loadPosts();
  }, [authed, loadPosts]);

  async function handleDelete() {
    if (!deleteConfirm) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/cast/blog/${deleteConfirm.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      setDeleteConfirm(null);
      showToast(`Deleted "${deleteConfirm.title}"`);
      void loadPosts();
    } catch {
      showToast('Delete failed');
    } finally {
      setDeleting(false);
    }
  }

  const filtered = search
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.slug.toLowerCase().includes(search.toLowerCase()) ||
          p.author.toLowerCase().includes(search.toLowerCase()),
      )
    : posts;

  const published = posts.filter((p) => p.status === 'Published').length;
  const drafts = posts.filter((p) => p.status === 'Draft').length;

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div style={S.page}>
      {/* Header */}
      <header style={S.header}>
        <div style={S.headerTitle}>
          <div style={S.headerDot} />
          CAST Blog Admin
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            {posts.length} posts · {published} published · {drafts} drafts
          </span>
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 12,
              color: '#007CB0',
              textDecoration: 'none',
              padding: '6px 12px',
              border: '1px solid rgba(0,124,176,0.3)',
              borderRadius: 6,
            }}
          >
            View Blog ↗
          </a>
        </div>
      </header>

      {/* Body */}
      <div style={S.body}>
        {/* Toolbar */}
        <div style={S.row}>
          <input
            style={{ ...S.input, flex: 1, minWidth: 200, maxWidth: 360 }}
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={loadPosts}
            style={S.btnGhost}
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button
            onClick={() => setModalPost('new')}
            style={S.btnPrimary}
          >
            + New Post
          </button>
        </div>

        {/* Table */}
        <div
          style={{
            background: '#141e2a',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Title</th>
                <th style={S.th}>Slug</th>
                <th style={S.th}>Category</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Date</th>
                <th style={S.th}>Read</th>
                <th style={S.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      ...S.td,
                      textAlign: 'center',
                      padding: '48px 24px',
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {loading ? 'Loading posts…' : search ? 'No posts match your search.' : 'No posts yet.'}
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr
                    key={post.id}
                    style={{ transition: 'background 100ms' }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background =
                        'rgba(255,255,255,0.03)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = '')
                    }
                  >
                    <td style={{ ...S.td, maxWidth: 260 }}>
                      <span
                        style={{
                          fontWeight: 600,
                          color: '#fff',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={post.title}
                      >
                        {post.title}
                      </span>
                    </td>
                    <td style={{ ...S.td, maxWidth: 180 }}>
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#007CB0',
                          textDecoration: 'none',
                          fontSize: 12,
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={post.slug}
                      >
                        /{post.slug}
                      </a>
                    </td>
                    <td style={{ ...S.td, color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
                      {post.category}
                    </td>
                    <td style={S.td}>
                      <span style={S.statusBadge(post.status)}>{post.status}</span>
                    </td>
                    <td
                      style={{
                        ...S.td,
                        color: 'rgba(255,255,255,0.38)',
                        fontSize: 12,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.publishedDate}
                    </td>
                    <td
                      style={{
                        ...S.td,
                        color: 'rgba(255,255,255,0.38)',
                        fontSize: 12,
                      }}
                    >
                      {post.readTime}m
                    </td>
                    <td style={S.td}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => setModalPost(post)}
                          style={{ ...S.btnGhost, padding: '5px 12px', fontSize: 12 }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(post)}
                          style={S.btnDanger}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p
          style={{
            marginTop: 16,
            fontSize: 12,
            color: 'rgba(255,255,255,0.25)',
            textAlign: 'right',
          }}
        >
          {filtered.length} of {posts.length} posts shown
        </p>
      </div>

      {/* New / Edit Modal */}
      {modalPost !== null && (
        <PostModal
          post={modalPost === 'new' ? null : modalPost}
          onClose={() => setModalPost(null)}
          onSave={() => {
            setModalPost(null);
            showToast(modalPost === 'new' ? 'Post created.' : 'Post updated.');
            void loadPosts();
          }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && setDeleteConfirm(null)}>
          <div
            style={{
              ...S.modal,
              maxWidth: 420,
              marginTop: 120,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠</div>
            <h3
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 8px',
              }}
            >
              Delete Post?
            </h3>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 13,
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 24px',
              }}
            >
              &ldquo;{deleteConfirm.title}&rdquo; will be permanently deleted from Airtable.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={S.btnGhost}>
                Cancel
              </button>
              <button
                onClick={() => void handleDelete()}
                disabled={deleting}
                style={{
                  ...S.btnPrimary,
                  background: '#c0392b',
                }}
              >
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#2d353c',
            border: '1px solid rgba(0,124,176,0.4)',
            borderRadius: 8,
            padding: '12px 20px',
            fontFamily: "'Barlow', sans-serif",
            fontSize: 14,
            color: '#fff',
            zIndex: 999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
