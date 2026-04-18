import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageSnapshot } from '~/lib/makeswift/client';
import { MakeswiftPageShim } from '~/lib/makeswift/makeswift-page-shim';
import '~/lib/makeswift/components';

import { getBlog } from './page-data';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const blog = await getBlog();

  return {
    title: blog?.name ?? t('title'),
    description:
      blog?.description && blog.description.length > 150
        ? `${blog.description.substring(0, 150)}...`
        : blog?.description,
  };
}

export default async function Blog({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const snapshot = await getPageSnapshot({ path: '/blog', locale });
  if (!snapshot) return notFound();

  return <MakeswiftPageShim metadata={false} snapshot={snapshot} />;
}
