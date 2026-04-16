import { PropsWithChildren } from 'react';
import { GlobalNavTopperLoader } from '~/lib/makeswift/components/cast/GlobalNavTopperLoader';
import { GlobalNavLoader } from '~/lib/makeswift/components/cast/GlobalNavLoader';
import { GlobalFooterLoader } from '~/lib/makeswift/components/cast/GlobalFooterLoader';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

// Global elements are managed under the /global-elements/ section in Makeswift.
// Edit those pages once — changes apply to every Makeswift page automatically.
//   /global-elements/nav-topper  → NavigationTopper (above nav)
//   /global-elements/nav         → SiteNavbar
//   /global-elements/footer      → SiteFooter
export default async function MakeswiftLayout({ params, children }: Props) {
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
