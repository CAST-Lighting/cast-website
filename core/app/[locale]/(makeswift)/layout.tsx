import { headers } from 'next/headers';
import { PropsWithChildren } from 'react';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

// Nav and footer are managed on the /global-nav and /global-elements/footer Makeswift pages.
// Edit those pages once — changes apply to every Makeswift page automatically.
export default async function MakeswiftLayout({ params, children }: Props) {
  const { locale } = await params;
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isGlobalElements = pathname.includes('/global-elements');

  return (
    <>
      {!isGlobalElements && <GlobalNavLoader locale={locale} />}
      {children}
      {!isGlobalElements && <GlobalFooterLoader locale={locale} />}
    </>
  );
}
