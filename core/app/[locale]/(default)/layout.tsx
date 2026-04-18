import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import GDPRPopup from '~/lib/makeswift/components/cast/GDPRPopup';
import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';
import CastNavigationTopper from '~/lib/makeswift/components/cast/NavigationTopper';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalNavTopperLoader } from '~/lib/makeswift/components/cast/GlobalNavTopperLoader';

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

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {/* Nav: Makeswift-managed global elements — fall back to null if not published yet */}
      <GlobalNavTopperLoader locale={locale} />
      <GlobalNavLoader locale={locale} />
      <main>{children}</main>
      {/* Footer: Makeswift-managed — changes in Global Elements > footer propagate here */}
      <GlobalFooterLoader locale={locale} />
      <GDPRPopup />
    </>
  );
}
