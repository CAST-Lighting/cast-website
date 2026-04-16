import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

// Renders the /global-elements/footer Makeswift page at the bottom of every Makeswift page layout.
// Place SiteFooter on the /global-elements/footer page in Makeswift.
// Any edits there propagate to every page automatically.
// Silently returns null if the page doesn't exist yet.
export async function GlobalFooterLoader({ locale }: { locale: string }) {
  try {
    const snapshot = await getPageSnapshot({ path: '/global-elements/footer', locale });
    if (!snapshot) return null;
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {
    return null;
  }
}
