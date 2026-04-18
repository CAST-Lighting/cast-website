import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import GDPRPopup from '~/lib/makeswift/components/cast/GDPRPopup';
import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';
import CastNavigationTopper from '~/lib/makeswift/components/cast/NavigationTopper';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';
import { GlobalThemeLoader } from '~/lib/makeswift/components/cast/GlobalThemeLoader';

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

// NOTE: Use code components directly — do NOT use GlobalNavLoader/GlobalFooterLoader/
// GlobalNavTopperLoader. Those call MakeswiftPageShim which registers extra Page roots
// in the Makeswift editor, causing nav/footer/topper to appear as separate Page elements.
// GlobalThemeLoader is safe here because it only runs on (default) routes, never in the
// Makeswift editor path ((makeswift) routes).
export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {/* GlobalThemeLoader: injects Makeswift-configured CSS vars, overrides static fallback */}
      <GlobalThemeLoader locale={locale} />
      <CastNavigationTopper />
      <CastSiteNavbar />
      <main>{children}</main>
      <CastSiteFooter />
      <GDPRPopup />
    </>
  );
}
