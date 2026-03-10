import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { setRequestLocale } from 'next-intl/server';

import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';

import '~/lib/makeswift/components';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const snapshot = await getPageSnapshot({ path: '/', locale });

  if (snapshot == null) {
    // Allows Makeswift editor to detect and enable editing for unpublished pages
    await connection();
    return notFound();
  }

  return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
}
