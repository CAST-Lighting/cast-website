import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

// Renders the /global-nav Makeswift page at the top of every Makeswift page layout.
// Place NavigationTopper + SiteNavbar on the /global-nav page in Makeswift.
// Any edits there propagate to every page automatically.
// Silently returns null if the page doesn't exist yet.
export async function GlobalNavLoader({ locale }: { locale: string }) {
  try {
    const snapshot = await getPageSnapshot({ path: '/global-nav', locale });
    if (!snapshot) return null;
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {
    return null;
  }
}
