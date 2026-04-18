import { headers } from 'next/headers';
import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

const SOURCE_PATH = '/global-elements/nav';

// Renders the /global-elements/nav Makeswift page at the top of every Makeswift page layout.
// Place SiteNavbar on the /global-elements/nav page in Makeswift.
// Any edits there propagate to every page automatically.
// Silently returns null if the page doesn't exist yet or if we're currently on the source page.
export async function GlobalNavLoader({ locale }: { locale: string }) {
  try {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') ?? '';
    if (pathname === SOURCE_PATH || pathname.startsWith(SOURCE_PATH + '/')) return null;

    const snapshot = await getPageSnapshot({ path: SOURCE_PATH, locale });
    if (!snapshot) return null;
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {
    return null;
  }
}
