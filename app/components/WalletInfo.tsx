'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';

export function WalletInfo() {
  const { wallet, isConnected } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (wallet?.smartWallet) {
      try {
        await navigator.clipboard.writeText(wallet.smartWallet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  if (!isConnected || !wallet) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">
        Wallet Info
      </h3>

      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Wallet Address
        </label>
        <div className="flex items-center gap-2">
          <code className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white break-all font-mono">
            {wallet.smartWallet}
          </code>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Platform
          </label>
          <p className="text-white font-mono text-sm">
            {wallet.platform || 'Web'}
          </p>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Status
          </label>
          <p className="text-green-400 font-semibold text-sm">
            Connected
          </p>
        </div>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
        <p className="text-sm text-purple-300">
          Secured by WebAuthn Passkey
        </p>
      </div>
    </div>
  );
}