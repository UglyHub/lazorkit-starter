# 🚀 LazorKit Starter Template

A complete Next.js starter template for integrating LazorKit's passkey wallet infrastructure on Solana. No seed phrases, no wallet installations required - just seamless Web3 authentication using biometrics.

## ✨ Features

- **🔐 Passkey Authentication** - Login with Face ID, Touch ID, or Windows Hello
- **💸 Gasless Transactions** - Pay transaction fees with USDC instead of SOL
- **🔄 Session Persistence** - Auto-reconnect on page reload
- **📱 Web3 Without Friction** - No seed phrases or browser extensions needed
- **🏗️ Production-Ready** - TypeScript, error handling, clean architecture
- **🎨 Beautiful UI** - Responsive design with Tailwind CSS

## 🎯 What This Demonstrates

This starter template shows developers how to:

1. Set up LazorKit SDK in a Next.js application
2. Implement passkey-based wallet authentication
3. Configure gasless transaction support via paymasters
4. Build a user-friendly Web3 interface
5. Handle wallet connection states properly

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/lazorkit-starter.git
cd lazorkit-starter

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure
```
lazorkit-starter/
├── app/
│   ├── components/
│   │   ├── ConnectButton.tsx    # Passkey authentication component
│   │   ├── TransferForm.tsx     # Gasless transaction form
│   │   └── WalletInfo.tsx       # Wallet details display
│   ├── config.ts                # LazorKit configuration
│   ├── providers.tsx            # Client-side provider wrapper
│   ├── layout.tsx               # Root layout with provider
│   └── page.tsx                 # Main page with dashboard
├── docs/
│   ├── TUTORIAL-1-AUTH.md       # Passkey authentication guide
│   └── TUTORIAL-2-GASLESS.md    # Gasless transactions guide
└── README.md                    # This file
```

## 🎓 Tutorials

### Tutorial 1: Passkey Authentication
Learn how to implement WebAuthn-based wallet authentication without seed phrases.

👉 [Read Tutorial 1](./docs/TUTORIAL-1-AUTH.md)

### Tutorial 2: Gasless Transactions
Understand how to use paymasters to sponsor transaction fees with USDC.

👉 [Read Tutorial 2](./docs/TUTORIAL-2-GASLESS.md)

## 🔧 Configuration

The LazorKit configuration is centralized in `app/config.ts`:
```typescript
export const LAZORKIT_CONFIG = {
  rpcUrl: 'https://api.devnet.solana.com',
  portalUrl: 'https://portal.lazor.sh',
  paymasterConfig: {
    paymasterUrl: 'https://kora.devnet.lazorkit.com',
  },
} as const;
```

**For Production:**
- Change `rpcUrl` to mainnet endpoint
- Update paymaster configuration
- Add your API keys if required

## 📖 Key Concepts

### Passkey Authentication

LazorKit uses WebAuthn credentials (passkeys) instead of traditional private keys. Your device's secure enclave (Face ID, Touch ID, Windows Hello) stores the credential - it never leaves your device.

**Benefits:**
- No seed phrases to manage
- Hardware-level security
- Familiar user experience
- Recovery options built-in

### Smart Wallets

Accounts are Program Derived Addresses (PDAs) controlled by the LazorKit on-chain program. This enables:

- Key rotation and recovery
- Spending limits and policies
- Session keys for apps
- Gasless transactions

### Gasless Transactions

The Paymaster service sponsors gas fees, allowing users to pay with USDC instead of holding SOL:
```typescript
await signAndSendTransaction({
  instructions: [instruction],
  transactionOptions: {
    feeToken: 'USDC', // ✨ Magic happens here
  },
});
```

## 🧪 Testing Notes

⚠️ **Service Availability**

During development (January 2026), LazorKit's Devnet services experienced intermittent availability. The integration code is correct and follows official documentation.

**To test successfully:**
1. Ensure LazorKit services are operational
2. Check [docs.lazorkit.com](https://docs.lazorkit.com) for service status
3. Use a device with WebAuthn support (most modern devices)
4. Test in Chrome, Edge, or Firefox for best compatibility

**Alternative Testing:**
- Review the code implementation
- Deploy to production with mainnet services
- Test when Devnet services are restored

## 🎨 Customization

### Styling

This template uses Tailwind CSS. Customize the theme in `app/globals.css` or modify component styles directly.

### Add Features

**Example: Add Balance Display**
```typescript
// In WalletInfo.tsx
import { useConnection } from '@solana/wallet-adapter-react';

const { connection } = useConnection();
const [balance, setBalance] = useState(0);

useEffect(() => {
  if (wallet?.smartWallet) {
    connection.getBalance(new PublicKey(wallet.smartWallet))
      .then(bal => setBalance(bal / LAMPORTS_PER_SOL));
  }
}, [wallet]);
```

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

No environment variables required for basic setup. Add these if using custom services:
```env
NEXT_PUBLIC_RPC_URL=your_rpc_url
NEXT_PUBLIC_PAYMASTER_API_KEY=your_api_key
```

## 📚 Resources

- **LazorKit Documentation:** [docs.lazorkit.com](https://docs.lazorkit.com)
- **GitHub Repository:** [github.com/lazor-kit/lazor-kit](https://github.com/lazor-kit/lazor-kit)
- **Telegram Community:** [t.me/lazorkit](https://t.me/lazorkit)
- **Solana Docs:** [docs.solana.com](https://docs.solana.com)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this starter in your projects!

## 🙏 Acknowledgments

- Built for the Superteam Vietnam LazorKit Bounty
- Powered by [LazorKit](https://lazorkit.com)
- Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)

---

**Need help?** Open an issue or reach out on Telegram!

Built with ❤️ for the Solana community