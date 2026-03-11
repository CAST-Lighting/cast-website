import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

// Renders the /global-footer Makeswift page at the bottom of every Makeswift page layout.
// Place SiteFooter on the /global-footer page in Makeswift.
// Any edits there propagate to every page automatically.
// Silently returns null if the page doesn't exist yet.
export async function GlobalFooterLoader({ locale }: { locale: string }) {
  try {
    const snapshot = await getPageSnapshot({ path: '/global-footer', locale });
    if (!snapshot) return null;
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {
    return null;
  }
}
