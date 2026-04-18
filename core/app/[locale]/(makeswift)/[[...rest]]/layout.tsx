import { type PropsWithChildren } from 'react';
import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';
import CastNavigationTopper from '~/lib/makeswift/components/cast/NavigationTopper';
import CastSiteFooter from '~/lib/makeswift/components/cast/SiteFooter';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string; rest?: string[] }>;
}

export default async function PathLayout({ children, params }: Props) {
  const { rest } = await params;
  const isGlobalElement = rest?.[0] === 'global-elements';

  return (
    <>
      {!isGlobalElement && <CastNavigationTopper />}
      {!isGlobalElement && <CastSiteNavbar />}
      {children}
      {!isGlobalElement && <CastSiteFooter />}
    </>
  );
}
