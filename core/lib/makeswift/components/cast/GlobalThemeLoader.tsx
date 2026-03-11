import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

// Renders the /global-styles Makeswift page in a hidden container so that
// the CastSiteTheme component on that page can inject CSS variables onto :root
// for every page on the site. Must be placed inside <MakeswiftProvider>.
// Silently returns null if the page doesn't exist yet or the API fails.
export async function GlobalThemeLoader({ locale }: { locale: string }) {
  try {
    const snapshot = await getPageSnapshot({ path: '/global-styles', locale });
    if (!snapshot) return null;
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 0,
          height: 0,
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -9999,
        }}
      >
        <MakeswiftPageShim metadata={false} snapshot={snapshot} />
      </div>
    );
  } catch {
    // Page doesn't exist yet or API error — fail silently
    return null;
  }
}
