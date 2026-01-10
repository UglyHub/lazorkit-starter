'use client';

import { ConnectButton } from './components/ConnectButton';
import { TransferForm } from './components/TransferForm';
import { WalletInfo } from './components/WalletInfo';
import { useWallet } from '@lazorkit/wallet';

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            LazorKit Starter
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Solana Passkey Wallet Integration Template
          </p>
          
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>

        {!isConnected && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4">
                What This Demonstrates
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <strong className="text-white">Passkey Authentication</strong>
                    <p className="text-sm text-gray-400">No seed phrases - use biometrics</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <strong className="text-white">Gasless Transactions</strong>
                    <p className="text-sm text-gray-400">Pay fees with USDC instead of SOL</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <strong className="text-white">Session Persistence</strong>
                    <p className="text-sm text-gray-400">Auto-reconnect on reload</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <strong className="text-white">Production-Ready Code</strong>
                    <p className="text-sm text-gray-400">TypeScript, error handling, clean architecture</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  Your passkey never leaves your device
                </p>
              </div>
            </div>
          </div>
        )}

        {isConnected && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-6">
                <WalletInfo />
              </div>

              <div className="space-y-6">
                <TransferForm />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <p className="text-gray-400">
            Built with LazorKit SDK
          </p>
        </div>
      </div>
    </main>
  );
}