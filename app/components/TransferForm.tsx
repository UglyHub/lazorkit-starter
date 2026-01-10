'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function TransferForm() {
  const { signAndSendTransaction, wallet, isConnected } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wallet || !isConnected) {
      setResult('Wallet not connected');
      return;
    }

    if (!recipient || !amount) {
      setResult('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      setResult('');

      const recipientKey = new PublicKey(recipient);
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      const instruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(wallet.smartWallet),
        toPubkey: recipientKey,
        lamports: lamports,
      });

      const sig = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC',
          computeUnitLimit: 200000,
        },
      });

      setResult('Success: ' + sig);
      setRecipient('');
      setAmount('');
    } catch (err) {
      setResult('Error: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <p className="text-gray-400 text-center">
          Connect wallet to send transactions
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Send SOL</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Solana address"
            disabled={loading}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Amount</label>
          <input
            type="number"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            disabled={loading}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-sm text-blue-300">Gasless: Fees paid with USDC</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Transaction'}
        </button>
      </form>

      {result && (
        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-white break-all">{result}</p>
        </div>
      )}
    </div>
  );
}