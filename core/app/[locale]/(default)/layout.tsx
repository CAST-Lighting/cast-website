import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <CastSiteNavbar transparentMode={false} bgColor="#ffffff" />
      <main>{children}</main>
      <CastSiteFooter />
    </>
  );
}
