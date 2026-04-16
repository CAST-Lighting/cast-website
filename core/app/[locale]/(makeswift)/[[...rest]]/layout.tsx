import { type PropsWithChildren } from 'react';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalNavTopperLoader } from '~/lib/makeswift/components/cast/GlobalNavTopperLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string; rest?: string[] }>;
}

export default async function PathLayout({ children, params }: Props) {
  const { locale, rest } = await params;
  const isGlobalElement = rest?.[0] === 'global-elements';

  return (
    <>
      {!isGlobalElement && <GlobalNavTopperLoader locale={locale} />}
      {!isGlobalElement && <GlobalNavLoader locale={locale} />}
      {children}
      {!isGlobalElement && <GlobalFooterLoader locale={locale} />}
    </>
  );
}
