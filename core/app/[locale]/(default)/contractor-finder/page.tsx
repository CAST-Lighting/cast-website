import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TradePro Program | CAST Lighting',
  description: 'Join the CAST TradePro program. Exclusive contractor pricing, dedicated support, and a lifetime warranty on every fixture.',
};

// /contractor-finder now redirects to /trade-pro — they serve the same audience.
// The TradePro signup IS the contractor program.
export default function ContractorFinderPage() {
  redirect('/trade-pro');
}
