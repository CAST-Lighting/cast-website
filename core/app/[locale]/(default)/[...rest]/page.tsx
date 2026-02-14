import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

interface PageProps {
  params: Promise<{ locale: string; rest: string[] }>;
}

export default async function CatchAllPage({ params }: PageProps) {
  const { locale, rest } = await params;
  const path = `/${rest.join('/')}`;

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
  const path = `/${rest.join('/')}`;

  const snapshot = await getPageSnapshot({ path, locale });

  return snapshot
    ? {
        title: snapshot.title || 'Page',
        description: snapshot.description,
      }
    : {};
}
