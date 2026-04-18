import { headers } from 'next/headers';
import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';
import CastNavigationTopper from '~/lib/makeswift/components/cast/NavigationTopper';

const SOURCE_PATH = '/global-elements/nav-topper';

// Renders the /global-elements/nav-topper Makeswift page above the nav on every page layout.
// Place NavigationTopper on the /global-elements/nav-topper page in Makeswift.
// Any edits there propagate to every page automatically.
// Falls back to the code CastNavigationTopper if the Makeswift page is empty or not published yet.
export async function GlobalNavTopperLoader({ locale }: { locale: string }) {
  try {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') ?? '';
    if (pathname === SOURCE_PATH || pathname.startsWith(SOURCE_PATH + '/')) return null;

    const snapshot = await getPageSnapshot({ path: SOURCE_PATH, locale });
    if (snapshot) return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {}
  return <CastNavigationTopper />;
}
