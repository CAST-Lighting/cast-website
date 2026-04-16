/* eslint-disable react/jsx-no-bind */
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ButtonLink } from '@/vibes/soul/primitives/button-link';
import { SignInSection } from '@/vibes/soul/sections/sign-in-section';
import { buildConfig } from '~/build-config/reader';
import { ForceRefresh } from '~/components/force-refresh';
import LoginSection from '~/lib/makeswift/components/cast/LoginSection';

import { login } from './_actions/login';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    redirectTo?: string;
    error?: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Auth.Login' });

  return {
    title: t('title'),
  };
}

export default async function Login({ params, searchParams }: Props) {
  const { locale } = await params;
  const { redirectTo = '/account/orders', error } = await searchParams;

  setRequestLocale(locale);

  const t = await getTranslations('Auth.Login');

  // Try Makeswift-managed login page first
  try {
    const { getPageSnapshot } = await import('~/lib/makeswift/client');
    const snapshot = await getPageSnapshot({ path: '/login', locale });
    if (snapshot) {
      const { MakeswiftPageShim } = await import('~/lib/makeswift/makeswift-page-shim');
      return (
        <>
          <ForceRefresh />
          <MakeswiftPageShim metadata={false} snapshot={snapshot} />
        </>
      );
    }
  } catch {}

  // Fall back to CAST-branded LoginSection
  return (
    <>
      <ForceRefresh />
      <LoginSection />
    </>
  );
}
