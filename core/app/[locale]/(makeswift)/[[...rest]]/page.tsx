import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

import '~/lib/makeswift/components';

interface PageProps {
  params: Promise<{ locale: string; rest?: string[] }>;
}

export default async function CatchAllPage({ params }: PageProps) {
  const { locale, rest } = await params;
  const path = rest ? `/${rest.join('/')}` : '/';

  const snapshot = await getPageSnapshot({ path, locale });

  if (snapshot == null) {
    // This is a temporary solution to fix the issue where non-published pages are not editable in the builder.
    await connection();
    return notFound();
  }

  return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, rest } = await params;
  const path = rest ? `/${rest.join('/')}` : '/';
  const isHomepage = path === '/';

  const snapshot = await getPageSnapshot({ path, locale });

  const snapshotTitle = (snapshot as Record<string, unknown>)?.title as string | undefined;
  const snapshotDesc = (snapshot as Record<string, unknown>)?.description as string | undefined;

  // Homepage gets branded defaults when Makeswift doesn't provide them
  if (isHomepage) {
    return {
      title: snapshotTitle || 'CAST Lighting | Professional Outdoor & Landscape Lighting',
      description:
        snapshotDesc ||
        'Professional-grade landscape lighting built to last. Shop brass & copper fixtures, transformers, and accessories. Trusted by contractors since 2001.',
    };
  }

  return snapshot
    ? {
        title: snapshotTitle || 'Page',
        description: snapshotDesc,
      }
    : {};
}
