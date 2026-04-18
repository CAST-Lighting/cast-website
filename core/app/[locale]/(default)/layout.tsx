import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import GDPRPopup from '~/lib/makeswift/components/cast/GDPRPopup';
import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';
import CastNavigationTopper from '~/lib/makeswift/components/cast/NavigationTopper';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';

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

// NOTE: Use code components directly here — do NOT use GlobalNavLoader/GlobalFooterLoader/GlobalNavTopperLoader.
// Those call MakeswiftPageShim which registers extra Page roots in the Makeswift editor,
// causing nav/footer/topper to appear as separate Page elements instead of within the main page.
export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <CastNavigationTopper />
      <CastSiteNavbar />
      <main>{children}</main>
      <CastSiteFooter />
      <GDPRPopup />
    </>
  );
}
