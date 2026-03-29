import { getLocale } from 'next-intl/server';

import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

import '~/lib/makeswift/components';

export default async function NotFound() {
  const locale = await getLocale();
  const snapshot = await getPageSnapshot({ path: '/page-not-found', locale });

  if (snapshot == null) {
    // Fallback until a /404 page is created in Makeswift
    return (
      <div
        style={{
          background: '#0f1923',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px 24px',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Essonnes', 'Playfair Display', serif",
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 16px',
            }}
          >
            404
          </h1>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 18,
              color: 'rgba(255,255,255,0.6)',
              margin: '0 0 32px',
            }}
          >
            Page not found
          </p>
          <a
            href="/"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: '#007CB0',
              textDecoration: 'none',
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
}
