/**
 * ConnectButton Component
 * Handles passkey authentication with LazorKit
 * 
 * Key Features:
 * - One-click passkey login (no seed phrases!)
 * - Auto-reconnect on page reload
 * - Loading states
 * - Error handling
 */
'use client';

import { useWallet } from '@lazorkit/wallet';

export function ConnectButton() {
  const { 
    connect, 
    disconnect, 
    isConnected, 
    isConnecting, 
    wallet,
    error 
  } = useWallet();

  // Handle connection
  const handleConnect = async () => {
    try {
      await connect();
      console.log('✅ Connected successfully!');
    } catch (err) {
      console.error('❌ Connection failed:', err);
    }
  };

  // Handle disconnection
  const handleDisconnect = async () => {
    try {
      await disconnect();
      console.log('👋 Disconnected');
    } catch (err) {
      console.error('❌ Disconnect failed:', err);
    }
  };

  // Show error if any
  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Error: {error.message}
      </div>
    );
  }

  // Connected state - show wallet address
  if (isConnected && wallet) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <p className="text-gray-600">Connected</p>
          <p className="font-mono text-xs">
            {wallet.smartWallet.slice(0, 8)}...{wallet.smartWallet.slice(-8)}
          </p>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Disconnected state - show connect button
  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting ? '🔄 Connecting...' : '🔐 Connect with Passkey'}
    </button>
  );
}