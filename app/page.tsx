/**
 * Home Page - LazorKit Starter Demo
 * Showcases passkey authentication integration
 */
'use client';

import { ConnectButton } from './components/ConnectButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            LazorKit Starter
          </h1>
          <p className="text-xl text-gray-300">
            Solana Passkey Wallet Integration Template
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          
          {/* Feature List */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              ✨ What This Demonstrates
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                Passkey Authentication (No seed phrases!)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                Gasless Transactions (Pay fees with USDC)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                Session Persistence (Auto-reconnect)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                Production-Ready Code Structure
              </li>
            </ul>
          </div>

          {/* Connect Button */}
          <div className="flex justify-center">
            <ConnectButton />
          </div>

          {/* Info Text */}
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>🔒 Your passkey never leaves your device</p>
            <p>🌐 Running on Solana Devnet</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p>Built with ❤️ using LazorKit SDK</p>
        </div>
      </div>
    </main>
  );
}