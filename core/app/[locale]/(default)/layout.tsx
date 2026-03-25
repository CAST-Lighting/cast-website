import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';
import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';
import CastNavigationTopper from '~/lib/makeswift/components/cast/NavigationTopper';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

async function NavWithFallback({ locale }: { locale: string }) {
  // Try Makeswift-managed nav first; fall back to hardcoded component
  try {
    const { getPageSnapshot } = await import('~/lib/makeswift/client');
    const { getSiteVersion } = await import('@makeswift/runtime/next/server');
    const snapshot = await getPageSnapshot({ path: '/global-nav', locale });
    if (snapshot) {
      const { MakeswiftPageShim } = await import('~/lib/makeswift/makeswift-page-shim');
      return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
    }
  } catch {}
  return (
    <>
      <CastNavigationTopper />
      <CastSiteNavbar />
    </>
  );
}

async function FooterWithFallback({ locale }: { locale: string }) {
  try {
    const { getPageSnapshot } = await import('~/lib/makeswift/client');
    const snapshot = await getPageSnapshot({ path: '/global-footer', locale });
    if (snapshot) {
      const { MakeswiftPageShim } = await import('~/lib/makeswift/makeswift-page-shim');
      return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
    }
  } catch {}
  return <CastSiteFooter />;
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
      <NavWithFallback locale={locale} />
      {/* Spacer that clears both fixed bars: top bar (~36px) + main nav (~72px) */}
      <div style={{ height: 108 }} aria-hidden="true" />
      <main>{children}</main>
      <FooterWithFallback locale={locale} />
    </>
  );
}
