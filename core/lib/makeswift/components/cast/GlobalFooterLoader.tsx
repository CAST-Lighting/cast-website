import { headers } from 'next/headers';
import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

const SOURCE_PATH = '/global-elements/footer';

// Renders the /global-elements/footer Makeswift page at the bottom of every Makeswift page layout.
// Place SiteFooter on the /global-elements/footer page in Makeswift.
// Any edits there propagate to every page automatically.
// Silently returns null if the page doesn't exist yet or if we're currently on the source page.
export async function GlobalFooterLoader({ locale }: { locale: string }) {
  try {
    const headersList = await headers();

    // Temporary diagnostics — log all headers to find which one carries the current path
    const allHeaders = Object.fromEntries(headersList.entries());
    console.log('[GlobalFooterLoader] headers:', JSON.stringify(allHeaders));

    // Try every candidate header in priority order
    const pathname =
      headersList.get('x-invoke-path') ??
      headersList.get('x-invoke-output') ??
      headersList.get('x-pathname') ??
      headersList.get('x-url') ??
      headersList.get('x-forwarded-uri') ??
      headersList.get('x-original-url') ??
      headersList.get('x-rewrite-url') ??
      '';

    console.log('[GlobalFooterLoader] resolved pathname:', pathname);

    if (pathname === SOURCE_PATH || pathname.startsWith(SOURCE_PATH + '/')) return null;

    const snapshot = await getPageSnapshot({ path: SOURCE_PATH, locale });
    if (!snapshot) return null;
    return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
  } catch {
    return null;
  }
}
