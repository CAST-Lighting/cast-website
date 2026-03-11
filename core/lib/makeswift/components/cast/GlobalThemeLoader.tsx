import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';
import '~/lib/makeswift/components';

export async function GlobalThemeLoader({ locale }: { locale: string }) {
  const snapshot = await getPageSnapshot({ path: '/global-styles', locale });
  if (!snapshot) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: -9999,
      }}
    >
      <MakeswiftPageShim metadata={false} snapshot={snapshot} />
    </div>
  );
}
