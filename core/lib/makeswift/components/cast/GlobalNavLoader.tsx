import { headers } from 'next/headers';
import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';
import CastSiteNavbar from '~/lib/makeswift/components/cast/SiteNavbar';

const SOURCE_PATH = '/global-elements/nav';

// Renders the /global-elements/nav Makeswift page at the top of every page layout.
// Place SiteNavbar on the /global-elements/nav page in Makeswift.
// Any edits there propagate to every page automatically.
// Falls back to the code CastSiteNavbar if the Makeswift page is empty or not published yet.
export async function GlobalNavLoader({ locale }: { locale: string }) {
  try {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') ?? '';
    if (pathname === SOURCE_PATH || pathname.startsWith(SOURCE_PATH + '/')) return null;

    const snapshot = await getPageSnapshot({ path: SOURCE_PATH, locale });
    if (snapshot) return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {}
  return <CastSiteNavbar />;
}
