'use client';

import { LazorkitProvider } from '@lazorkit/wallet';
import { LAZORKIT_CONFIG } from './config';
import { Buffer } from 'buffer';

// Setup Buffer polyfill for LazorKit
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.Buffer = Buffer;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazorkitProvider
      rpcUrl={LAZORKIT_CONFIG.rpcUrl}
      portalUrl={LAZORKIT_CONFIG.portalUrl}
      paymasterConfig={LAZORKIT_CONFIG.paymasterConfig}
    >
      {children}
    </LazorkitProvider>
  );
}
