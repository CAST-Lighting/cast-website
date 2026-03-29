import { getLocale } from 'next-intl/server';
import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';
import { CmsDataProvider, type CmsPageData } from '~/lib/makeswift/cms-context';

import '~/lib/makeswift/components';

/**
 * Renders a Makeswift template page with CMS data injected via context.
 *
 * @param templatePath — The Makeswift page path (e.g., "/blog-post/")
 * @param data — CMS data to inject into components
 * @param fallback — Optional React node to render if Makeswift template doesn't exist
 */
export async function CmsPageRenderer({
  templatePath,
  data,
  fallback,
}: {
  templatePath: string;
  data: CmsPageData;
  fallback?: React.ReactNode;
}) {
  const locale = await getLocale();
  const snapshot = await getPageSnapshot({ path: templatePath, locale });

  if (snapshot == null) {
    return fallback ?? null;
  }

  return (
    <CmsDataProvider data={data}>
      <MakeswiftPageShim metadata={false} snapshot={snapshot} />
    </CmsDataProvider>
  );
}
