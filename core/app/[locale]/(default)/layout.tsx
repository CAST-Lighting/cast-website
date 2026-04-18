import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CAST Lighting",
  "url": "https://www.castlighting.com",
  "logo": "https://www.castlighting.com/cast-logo.svg",
  "description": "Professional outdoor lighting fixtures in solid brass and copper. Lifetime warranty on every product. Made in USA. Trusted by 10,000+ landscape contractors.",
  "foundingDate": "1998",
  "areaServed": "US",
  "sameAs": [
    "https://www.facebook.com/castlighting",
    "https://www.instagram.com/castlighting",
    "https://www.youtube.com/castlighting",
  ],
};

// Nav, footer, topper, and GDPR popup are all managed as Makeswift global components.
// GlobalThemeLoader lives in the root [locale]/layout.tsx.
export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {children}
    </>
  );
}
