import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

// Renders the /global-elements/nav-topper Makeswift page above the nav on every Makeswift page layout.
// Place NavigationTopper on the /global-elements/nav-topper page in Makeswift.
// Any edits there propagate to every page automatically.
// Silently returns null if the page doesn't exist yet.
export async function GlobalNavTopperLoader({ locale }: { locale: string }) {
  try {
    const snapshot = await getPageSnapshot({ path: '/global-elements/nav-topper', locale });
    if (!snapshot) return null;
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {
    return null;
  }
}
