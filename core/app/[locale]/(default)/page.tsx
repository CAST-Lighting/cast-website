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

  // connection() ensures the page is always dynamic so Makeswift
  // draft mode headers are read on every request
  await connection();

  const snapshot = await getPageSnapshot({ path: '/', locale });

  return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
}
