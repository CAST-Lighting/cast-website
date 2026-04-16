import { headers } from 'next/headers';
import { PropsWithChildren } from 'react';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

// Footer is managed on the /global-elements/footer Makeswift page.
// Edit that page once — changes apply to every Makeswift page automatically.
export default async function MakeswiftLayout({ params, children }: Props) {
  const { locale } = await params;
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isGlobalElements = pathname.includes('/global-elements');

  return (
    <>
      {children}
      {!isGlobalElements && <GlobalFooterLoader locale={locale} />}
    </>
  );
}
