import { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string; rest?: string[] }>;
}

// Nav, footer, and topper are managed as Makeswift global components.
// Do NOT render them here as code components — they would duplicate the
// global components the user has placed in Makeswift.
export default async function PathLayout({ children }: Props) {
  return <>{children}</>;
}
