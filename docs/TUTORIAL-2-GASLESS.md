# Tutorial 2: Gasless Transactions with LazorKit

Learn how to implement gasless transactions where users pay fees with USDC instead of SOL using LazorKit's paymaster service.

## 📚 What You'll Learn

- What gasless transactions are and why they matter
- How paymasters work on Solana
- How to implement USDC fee payments
- How to create a transfer form with gasless support
- Best practices for transaction handling

## 🎯 Prerequisites

- Completed [Tutorial 1: Passkey Authentication](./TUTORIAL-1-AUTH.md)
- Connected wallet with LazorKit
- Basic understanding of Solana transactions

## 💡 What Are Gasless Transactions?

### The Problem with Traditional Wallets

**Traditional Flow:**
```
User wants to send Token X
   ↓
Needs SOL for gas fees
   ↓
Must acquire SOL first
   ↓
Complex onboarding 😫
```

**With LazorKit Gasless:**
```
User wants to send Token X
   ↓
Pay fees with USDC instead
   ↓
No SOL needed!
   ↓
Smooth onboarding 🎉
```

### How It Works

A **paymaster** is a service that sponsors transaction fees:

1. User creates transaction
2. Specifies `feeToken: 'USDC'`
3. Paymaster covers SOL fees
4. User's USDC balance decreases
5. Transaction succeeds ✅

---

## 🚀 Step-by-Step Implementation

### Step 1: Install Required Packages

You should already have these from Tutorial 1:
```bash
npm install @lazorkit/wallet @solana/web3.js
```

---

### Step 2: Create Transfer Form Component

Create a component that sends SOL with gasless fees.

**File: `app/components/TransferForm.tsx`**
```typescript
'use client';

import { useWallet } from '@lazorkit/wallet';
import { useState } from 'react';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

export function TransferForm() {
  // Get wallet methods from LazorKit
  const { signAndSendTransaction, wallet, isConnected } = useWallet();
  
  // Form state
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate wallet connection
    if (!wallet || !isConnected) {
      setResult('Wallet not connected');
      return;
    }

    // Validate form inputs
    if (!recipient || !amount) {
      setResult('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      setResult('');

      // Create recipient public key
      const recipientKey = new PublicKey(recipient);
      
      // Convert SOL to lamports (1 SOL = 1 billion lamports)
      const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

      // Create transfer instruction
      const instruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(wallet.smartWallet),
        toPubkey: recipientKey,
        lamports: lamports,
      });

      // 🎯 THE MAGIC: Sign and send with gasless option
      const sig = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: 'USDC',        // ✨ Pay fees with USDC!
          computeUnitLimit: 200000, // Set compute budget
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

  // Show message if wallet not connected
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
        {/* Recipient Input */}
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

        {/* Amount Input */}
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

        {/* Info Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <p className="text-sm text-blue-300">Gasless: Fees paid with USDC</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Transaction'}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-4 bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-white break-all">{result}</p>
        </div>
      )}
    </div>
  );
}
```

---

### Step 3: Add Form to Your Page

Include the transfer form in your dashboard.

**File: `app/page.tsx`**
```typescript
'use client';

import { ConnectButton } from './components/ConnectButton';
import { TransferForm } from './components/TransferForm';
import { useWallet } from '@lazorkit/wallet';

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My dApp</h1>
        
        <ConnectButton />
        
        {isConnected && (
          <div className="mt-8">
            <TransferForm />
          </div>
        )}
      </div>
    </main>
  );
}
```

---

## 🎉 Test It Out!

### Prerequisites

1. **Connected wallet** with LazorKit (from Tutorial 1)
2. **USDC balance** in your smart wallet (for fees)
3. **Recipient address** to send SOL to

### Testing Steps

1. **Start dev server:**
```bash
   npm run dev
```

2. **Connect wallet:**
   - Click "Connect with Passkey"
   - Authenticate with biometrics

3. **Fill transfer form:**
   - **Recipient:** Any valid Solana address
   - **Amount:** 0.001 SOL (for testing)

4. **Submit transaction:**
   - Click "Send Transaction"
   - Wait for confirmation
   - View on Solana Explorer

### What Happens Behind the Scenes
```
1. User submits form
   ↓
2. TransferForm creates instruction
   ↓
3. signAndSendTransaction called with feeToken: 'USDC'
   ↓
4. LazorKit contacts paymaster service
   ↓
5. Paymaster calculates fee in USDC
   ↓
6. Transaction sent to Solana with sponsor signature
   ↓
7. Blockchain deducts USDC from user
   ↓
8. Transaction confirms ✅
```

---

## 🔍 Deep Dive: How Paymasters Work

### Traditional Solana Transaction
```typescript
// User pays fees in SOL
{
  feePayer: userPublicKey,  // User's wallet
  recentBlockhash: '...',
  instructions: [...]
}
```

### Gasless Transaction with Paymaster
```typescript
// Paymaster pays fees, user pays in USDC
{
  feePayer: paymasterPublicKey,  // Paymaster's wallet (has SOL)
  recentBlockhash: '...',
  instructions: [
    // Transfer USDC from user to paymaster
    transferUSDCInstruction,
    // Original user instruction
    userInstruction,
  ]
}
```

**Key Points:**
1. Paymaster's wallet has SOL for fees
2. Additional instruction transfers USDC to paymaster
3. Net result: User pays in USDC, blockchain gets SOL

---

## 🎓 Advanced Usage

### Custom Compute Budget
```typescript
await signAndSendTransaction({
  instructions: [instruction],
  transactionOptions: {
    feeToken: 'USDC',
    computeUnitLimit: 300000,      // Increase for complex transactions
    computeUnitPrice: 1000,         // Prioritize transaction
  },
});
```

### Error Handling
```typescript
try {
  const sig = await signAndSendTransaction({...});
  
  // Wait for confirmation
  await connection.confirmTransaction(sig, 'confirmed');
  
  console.log('Transaction confirmed:', sig);
} catch (err) {
  if (err.message.includes('Insufficient USDC')) {
    alert('Not enough USDC for fees');
  } else if (err.message.includes('Transaction failed')) {
    alert('Transaction was rejected');
  } else {
    alert('Unknown error: ' + err.message);
  }
}
```

### Batch Transactions
```typescript
// Send multiple instructions in one transaction
const instructions = [
  SystemProgram.transfer({...}),
  SystemProgram.transfer({...}),
  SystemProgram.transfer({...}),
];

await signAndSendTransaction({
  instructions: instructions,
  transactionOptions: {
    feeToken: 'USDC',
  },
});
```

---

## 🛠️ Troubleshooting

### Issue: "Insufficient USDC for fees"

**Cause:** Wallet doesn't have enough USDC to cover transaction fees.

**Solution:**
- Add USDC to your smart wallet
- Transaction fees are typically $0.01-0.05
- Check balance before sending

### Issue: "Paymaster service unavailable"

**Cause:** LazorKit paymaster service is down or overloaded.

**Solution:**
- Check [status.lazorkit.com](https://status.lazorkit.com)
- Wait and retry
- Use traditional SOL fees as fallback

### Issue: "Transaction simulation failed"

**Cause:** Transaction would fail on-chain (insufficient balance, invalid address).

**Solution:**
- Verify recipient address is valid
- Check sender has enough SOL to transfer
- Review instruction parameters

### Issue: "Blockhash not found"

**Cause:** Transaction took too long to process (>60 seconds).

**Solution:**
- Retry transaction with new blockhash
- Check network congestion
- Increase compute budget for priority

---

## 💰 Fee Economics

### Typical Costs

| Transaction Type | SOL Fee | USDC Equivalent |
|-----------------|---------|-----------------|
| Simple transfer | 0.000005 | ~$0.001 |
| Token swap | 0.00001 | ~$0.002 |
| NFT mint | 0.00002 | ~$0.004 |

**Note:** Paymaster may add small markup (5-10%) for service.

### When to Use Gasless

✅ **Good for:**
- User onboarding (no SOL needed)
- Micropayments
- Games and apps with frequent transactions

❌ **Not ideal for:**
- High-value DeFi (pay SOL directly)
- When you already have SOL
- Situations requiring absolute minimum fees

---

## 🔐 Security Considerations

### User Safety

1. **Verify recipient addresses** before sending
2. **Start with small amounts** when testing
3. **Check transaction details** before confirming
4. **Keep USDC balance** for fees

### Smart Contract Interactions
```typescript
// When interacting with programs, verify:
const instruction = await program.methods
  .transferTokens()
  .accounts({
    from: wallet.smartWallet,  // ✅ Your wallet
    to: recipientAddress,       // ⚠️ Verify this!
  })
  .instruction();

await signAndSendTransaction({
  instructions: [instruction],
  transactionOptions: { feeToken: 'USDC' },
});
```

---

## 🚀 Next Steps

Now that you understand gasless transactions:

1. ✅ Build more complex transaction UIs
2. ✅ Add transaction history
3. ✅ Implement token swaps
4. ✅ Create NFT minting flows
5. ✅ Deploy your dApp to production!

---

## 📚 Resources

- [LazorKit Documentation](https://docs.lazorkit.com)
- [Solana Transaction Guide](https://docs.solana.com/developing/programming-model/transactions)
- [Paymaster Specification](https://docs.lazorkit.com/paymaster)
- [Compute Budget Guide](https://docs.solana.com/developing/programming-model/runtime#compute-budget)

---

## 🎓 Summary

**What You Learned:**
- ✅ What gasless transactions are
- ✅ How to implement USDC fee payments
- ✅ How paymasters work on Solana
- ✅ Error handling and best practices
- ✅ When to use gasless vs traditional fees

**Key Takeaway:**
```typescript
// This one line enables gasless transactions! ✨
feeToken: 'USDC'
```

---

**Congratulations!** 🎉 You now know how to build Web3 apps with:
- No seed phrases (passkeys)
- No SOL needed (gasless transactions)
- Seamless UX for users

**Build something amazing!** 🚀

---

Built with ❤️ by [Chiderah Onwumelu](https://github.com/Uglyhub)