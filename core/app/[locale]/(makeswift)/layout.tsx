import { type PropsWithChildren } from 'react';
import { GlobalNavTopperLoader } from '~/lib/makeswift/components/cast/GlobalNavTopperLoader';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function MakeswiftLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <>
      <GlobalNavTopperLoader locale={locale} />
      <GlobalNavLoader locale={locale} />
      {children}
      <GlobalFooterLoader locale={locale} />
    </>
  );
}
