import { PropsWithChildren } from 'react';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

// Nav and footer are managed on the /global-nav and /global-footer Makeswift pages.
// Edit those pages once — changes apply to every Makeswift page automatically.
export default async function MakeswiftLayout({ params, children }: Props) {
  const { locale } = await params;

  return (
    <>
      <GlobalNavLoader locale={locale} />
      {children}
      <GlobalFooterLoader locale={locale} />
    </>
  );
}
