import { PropsWithChildren } from 'react';

// Passthrough layout — suppresses GlobalNavLoader and GlobalFooterLoader injected by the
// parent (makeswift)/layout.tsx so that /global-elements/* pages don't double-render.
export default function GlobalElementsLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
