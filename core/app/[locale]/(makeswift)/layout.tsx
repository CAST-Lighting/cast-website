import { PropsWithChildren } from 'react';

// Makeswift pages manage their own nav/footer via registered components
export default function MakeswiftLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
