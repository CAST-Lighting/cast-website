import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

// Renders the /global-elements/nav Makeswift page at the top of every Makeswift page layout.
// Place SiteNavbar on the /global-elements/nav page in Makeswift.
// Any edits there propagate to every page automatically.
// Silently returns null if the page doesn't exist yet.
export async function GlobalNavLoader({ locale }: { locale: string }) {
  try {
    const snapshot = await getPageSnapshot({ path: '/global-elements/nav', locale });
    if (!snapshot) return null;
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {
    return null;
  }
}
