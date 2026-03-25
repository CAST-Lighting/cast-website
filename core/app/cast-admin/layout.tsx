import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CAST Blog Admin',
  robots: { index: false, follow: false },
};

export default function CastAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#0f1923', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
