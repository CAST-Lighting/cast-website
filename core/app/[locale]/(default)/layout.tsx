import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function DefaultLayout({ params, children }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <GlobalNavLoader locale={locale} />
      <main>{children}</main>
      <GlobalFooterLoader locale={locale} />
    </>
  );
}
