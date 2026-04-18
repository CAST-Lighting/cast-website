import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { clsx } from 'clsx';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { cache, PropsWithChildren } from 'react';

import '../../globals.css';

import { fonts } from '~/app/fonts';
import { MakeswiftProvider } from '~/lib/makeswift/provider';
import { getSiteVersion } from '@makeswift/runtime/next/server';
import '~/lib/makeswift/components';
import { CookieNotifications } from '~/app/notifications';
import { Providers } from '~/app/providers';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';
import { WebAnalyticsFragment } from '~/components/analytics/fragment';
import { AnalyticsProvider } from '~/components/analytics/provider';
import { ConsentManager } from '~/components/consent-manager';
import { ScriptsFragment } from '~/components/consent-manager/scripts-fragment';
import { ContainerQueryPolyfill } from '~/components/polyfills/container-query';
import { scriptsTransformer } from '~/data-transformers/scripts-transformer';
import { routing } from '~/i18n/routing';
import { getToastNotification } from '~/lib/server-toast';

// NOTE: GlobalThemeLoader has been moved to (default)/layout.tsx so it only
// runs on the live site — not inside the Makeswift editor path. A static
// fallback below ensures CSS variables are always present in the editor.

const RootLayoutMetadataQuery = graphql(
  `
    query RootLayoutMetadataQuery {
      site {
        settings {
          privacy {
            cookieConsentEnabled
            privacyPolicyUrl
          }
          storeName
          seo {
            pageTitle
            metaDescription
            metaKeywords
          }
          ...WebAnalyticsFragment
        }
        content {
          ...ScriptsFragment
        }
      }
      channel {
        entityId
      }
    }
  `,
  [WebAnalyticsFragment, ScriptsFragment],
);

const fetchRootLayoutMetadata = cache(async () => {
  return await client.fetch({
    document: RootLayoutMetadataQuery,
    fetchOptions: { next: { revalidate } },
  });
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await fetchRootLayoutMetadata();

  const storeName = data.site.settings?.storeName ?? '';

  const { pageTitle, metaDescription, metaKeywords } = data.site.settings?.seo || {};

  return {
    title: {
      template: `%s - ${storeName}`,
      default: pageTitle || storeName,
    },
    icons: {
      icon: '/favicon.ico', // app/favicon.ico/route.ts
    },
    description: metaDescription,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
    other: {
      platform: 'bigcommerce.catalyst',
      build_sha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '',
      store_hash: process.env.BIGCOMMERCE_STORE_HASH ?? '',
    },
  };
}

const VercelComponents = () => {
  if (process.env.VERCEL !== '1') {
    return null;
  }

  return (
    <>
      {process.env.DISABLE_VERCEL_ANALYTICS !== 'true' && <Analytics />}
      {process.env.DISABLE_VERCEL_SPEED_INSIGHTS !== 'true' && <SpeedInsights />}
    </>
  );
};

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

// Static fallback CSS variables — ensures the editor always has the CAST design
// tokens even when GlobalThemeLoader (in default layout) is not running.
const castThemeFallback = `
:root {
  --color-primary: #004960;
  --color-accent: #057cb0;
  --color-secondary: #005c7a;
  --color-light: #7fbee8;
  --color-title: #1a2332;
  --color-content: #3c3c47;
  --color-theme-primary: #057cb0;
  --color-theme-secondary: #004960;
  --h1-size: 46px;
  --h2-size: 36px;
  --h3-size: 29px;
  --h4-size: 26px;
  --h5-size: 23px;
  --h6-size: 20px;
  --body-size: 18px;
  --body-lg-size: 20px;
  --body-sm-size: 16px;
  --heading-weight: 700;
  --body-line-height: 1.5;
  --heading-line-height: 1.1;
}
`.trim();

export default async function RootLayout({ params, children }: Props) {
  const { locale } = await params;

  const rootData = await fetchRootLayoutMetadata();
  const toastNotificationCookieData = await getToastNotification();
  const siteVersion = await getSiteVersion();

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // need to call this method everywhere where static rendering is enabled
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-setRequestLocale-to-all-layouts-and-pages
  setRequestLocale(locale);

  const scripts = scriptsTransformer(rootData.data.site.content.scripts);
  // CAST manages its own cookie consent — disable the Catalyst/BigCommerce banner
  const isCookieConsentEnabled = false;
  const privacyPolicyUrl = rootData.data.site.settings?.privacy?.privacyPolicyUrl;

  return (
    <html className={clsx(fonts.map((f) => f.variable))} lang={locale}>
      {/* CAST Lighting brand fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        {/* Static CSS variable fallback — overridden by GlobalThemeLoader on live pages */}
        <style dangerouslySetInnerHTML={{ __html: castThemeFallback }} />
        <NextIntlClientProvider>
          <ConsentManager
            isCookieConsentEnabled={isCookieConsentEnabled}
            privacyPolicyUrl={privacyPolicyUrl}
            scripts={scripts}
          >
            <NuqsAdapter>
              <AnalyticsProvider
                channelId={rootData.data.channel.entityId}
                isCookieConsentEnabled={isCookieConsentEnabled}
                settings={rootData.data.site.settings}
              >
                <Providers>
                  <MakeswiftProvider siteVersion={siteVersion}>
                    {toastNotificationCookieData && (
                      <CookieNotifications {...toastNotificationCookieData} />
                    )}
                    {children}
                  </MakeswiftProvider>
                </Providers>
              </AnalyticsProvider>
            </NuqsAdapter>
          </ConsentManager>
        </NextIntlClientProvider>
        <VercelComponents />
        <ContainerQueryPolyfill />
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const fetchCache = 'default-cache';
