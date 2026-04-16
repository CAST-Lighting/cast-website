import { type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  params: Promise<{ locale: string }>;
}

export default async function MakeswiftLayout({ children }: Props) {
  return <>{children}</>;
}
