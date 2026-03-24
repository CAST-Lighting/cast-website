import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';
import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';
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
  return <CastSiteNavbar />;
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

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <NavWithFallback locale={locale} />
      <main>{children}</main>
      <FooterWithFallback locale={locale} />
    </>
  );
}
