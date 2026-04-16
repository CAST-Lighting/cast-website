import { type PropsWithChildren } from 'react';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string; rest?: string[] }>;
}

export default async function PathLayout({ children, params }: Props) {
  const { locale, rest } = await params;
  const isGlobalElement = rest?.[0] === 'global-elements';

  return (
    <>
      {children}
      {!isGlobalElement && <GlobalFooterLoader locale={locale} />}
    </>
  );
}
