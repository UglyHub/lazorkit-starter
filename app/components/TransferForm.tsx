/**
 * TransferForm Component
 * Demonstrates gasless USDC transfers using LazorKit paymaster
 * 
 * Key Features:
 * - Send SOL without needing SOL for gas fees
 * - Real-time transaction status
 * - Transaction confirmation with explorer link
 * - Comprehensive error handling
 */
'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function TransferForm() {
  const { signAndSendTransaction, wallet, isConnected } = useWallet();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [txSignature, setTxSignature] = useState('');
  const [error, setError] = useState('');

  // Handle transfer submission
  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wallet || !isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!recipient || !amount) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setTxSignature('');

      // Validate recipient address
      let recipientPubkey: PublicKey;
      try {
        recipientPubkey = new PublicKey(recipient);
      } catch (err) {
        throw new Error('Invalid recipient address format');
      }

      // Create transfer instruction
      const instruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(wallet.smartWallet),
        toPubkey: recipientPubkey,
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      });

      console.log('📤 Initiating gasless transaction...');

      // Sign and send with gasless option (fees paid in USDC)
      const signature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC', // ✨ Magic! Paymaster covers gas fees
          computeUnitLimit: 200000,
        },
      });

      console.log('✅ Transaction successful!', signature);
      setTxSignature(signature);
      
      // Clear form on success
      setRecipient('');
      setAmount('');
    } catch (err: any) {
      console.error('❌ Transaction failed:', err);
      setError(err.message || 'Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show message if not connected
  if (!isConnected) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
        <p className="text-gray-400 text-center">
          Connect your wallet to send transactions
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">
        💸 Send SOL (Gasless)
      </h3>

      <form onSubmit={handleTransfer} className="space-y-4">
        {/* Recipient Address Input */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter Solana address..."
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            disabled={loading}
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Amount (SOL)
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            disabled={loading}
          />
        </div>

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-sm text-blue-300">
            ⚡ Gas fees paid in USDC - No SOL needed!
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !recipient || !amount}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '🔄 Sending Transaction...' : '📤 Send Transaction'}
        </button>
      </form>

      {/* Success Message */}
      {txSignature && (
        <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-4 animate-fade-in">
          <p className="text-sm text-green-300 mb-2 font-semibold">
            ✅ Transaction Successful!
          </p>
          
            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 break-all underline"
          >
            View on Solana Explorer →
          </a>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-sm text-red-300">❌ {error}</p>
        </div>
      )}
    </div>
  );
}