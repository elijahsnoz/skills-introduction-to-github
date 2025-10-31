# Getting Started with Digital Currency Ecosystem

This guide will help you get started with the Digital Currency Ecosystem for your virtual reality and web applications.

## Prerequisites

- Node.js v14.0.0 or higher
- npm or yarn package manager
- Basic knowledge of JavaScript

## Installation

### 1. Clone or Download the Repository

```bash
git clone https://github.com/elijahsnoz/skills-introduction-to-github.git
cd skills-introduction-to-github
```

### 2. Install Dependencies (Optional)

The core system works without external dependencies. However, to use the Web API server:

```bash
npm install
```

## Quick Start Guide

### Running the Demo

The easiest way to see the system in action:

```bash
node index.js
```

This runs a comprehensive demo showcasing:
- Wallet creation
- Mining operations
- Transactions
- VR integration
- Smart contracts
- Governance proposals

### Running Individual Examples

#### 1. Basic Usage
Learn the fundamentals of the blockchain:

```bash
node examples/basic-usage.js
```

This example shows:
- Creating wallets
- Mining coins
- Making transactions
- Checking balances

#### 2. VR Integration
See how to integrate with VR applications:

```bash
node examples/vr-integration.js
```

This example demonstrates:
- VR session management
- Virtual marketplace
- Purchasing virtual items
- Balance tracking in VR

#### 3. Smart Contracts
Explore programmable transactions:

```bash
node examples/smart-contracts.js
```

This example covers:
- Deploying contracts
- Executing contract code
- Managing contract state
- Voting systems

### Starting the Web API Server

To use the REST API for web applications:

```bash
# First install express
npm install express

# Then start the server
npm run start-api
```

The API will be available at `http://localhost:3000/api`

## Your First Integration

### Creating a Simple Application

Create a new file `my-app.js`:

```javascript
const DigitalCurrencyEcosystem = require('./index');

// Initialize the ecosystem
const ecosystem = new DigitalCurrencyEcosystem();

// Create a wallet
const myWallet = ecosystem.createWallet('MyName');
console.log('My wallet address:', myWallet.address);

// Mine some coins
ecosystem.minePendingTransactions(myWallet.address);
ecosystem.minePendingTransactions(myWallet.address);

// Check balance
const balance = ecosystem.getBalance(myWallet.address);
console.log('My balance:', balance, 'coins');
```

Run it:
```bash
node my-app.js
```

### Integrating with VR

For Unity (C#):
```csharp
// See docs/VR-INTEGRATION.md for complete Unity examples
```

For Unreal Engine (C++):
```cpp
// See docs/VR-INTEGRATION.md for complete Unreal examples
```

### Integrating with Web Apps

#### Using the SDK

```javascript
const DigitalCurrencySDK = require('./web-api/sdk');
const sdk = new DigitalCurrencySDK('http://localhost:3000/api');

// Create wallet
const wallet = await sdk.createWallet('User123');

// Check balance
const balance = await sdk.getBalance(wallet.wallet.address);

// Make transaction
const tx = await sdk.createTransaction(
  fromAddress,
  toAddress,
  50
);
```

#### Using Fetch API

```javascript
// Create wallet
const response = await fetch('http://localhost:3000/api/wallet/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ owner: 'User123' })
});
const data = await response.json();
```

## Common Use Cases

### 1. VR Game Currency

```javascript
// Initialize VR session when player enters game
const session = ecosystem.vrInterface.initVRSession(
  'game_session_123',
  playerWalletAddress
);

// When player buys an item
const purchase = ecosystem.vrInterface.purchaseVirtualItem(
  'game_session_123',
  playerWalletAddress,
  'sword_legendary_001',
  100, // price
  gameStoreAddress
);

// Close session when player exits
ecosystem.vrInterface.closeVRSession('game_session_123');
```

### 2. Web Marketplace

```javascript
// List item for sale
ecosystem.vrMarketplace.listItem(
  'item_123',
  'Digital Art NFT',
  'Beautiful digital artwork',
  500,
  sellerAddress,
  'art'
);

// Browse items
const items = ecosystem.vrMarketplace.getAvailableItems('art');

// Purchase item
const purchase = ecosystem.vrMarketplace.purchaseItem(
  'item_123',
  buyerAddress
);
```

### 3. Smart Contract Automation

```javascript
// Create an escrow contract
const escrowCode = (context) => {
  const { params, state } = context;
  
  if (params.action === 'deposit') {
    return {
      success: true,
      newState: {
        amount: params.amount,
        buyer: params.buyer,
        seller: params.seller
      }
    };
  }
  
  if (params.action === 'release') {
    // Transfer logic here
    return { success: true };
  }
};

const contract = ecosystem.smartContracts.deployContract(
  ownerAddress,
  escrowCode,
  'Escrow Contract'
);
```

## Configuration Options

### Blockchain Settings

Modify in `digital-currency/blockchain.js`:

```javascript
// Mining difficulty (higher = slower mining)
this.difficulty = 2;

// Reward for mining a block
this.miningReward = 100;
```

### API Settings

Modify in `web-api/api-server.js`:

```javascript
// Default port
const port = 3000;
```

## Best Practices

### Security
1. Never expose private keys
2. Validate all inputs
3. Use HTTPS in production
4. Implement rate limiting
5. Add authentication

### Performance
1. Cache balance queries
2. Batch transactions
3. Use async operations
4. Optimize mining difficulty
5. Monitor blockchain size

### Development
1. Test thoroughly
2. Handle errors gracefully
3. Log important events
4. Version your API
5. Document changes

## Troubleshooting

### Common Issues

**Problem**: "Cannot find module 'express'"
```bash
Solution: npm install express
```

**Problem**: Mining takes too long
```javascript
Solution: Reduce difficulty in blockchain.js
this.difficulty = 1; // Easier mining
```

**Problem**: Balance not updating
```javascript
Solution: Mine pending transactions
ecosystem.minePendingTransactions(minerAddress);
```

## Next Steps

1. Read the [complete documentation](docs/README.md)
2. Explore the [API reference](docs/API.md)
3. Check out [VR integration guide](docs/VR-INTEGRATION.md)
4. Join the community (coming soon)
5. Contribute to the project

## Support

- Documentation: `/docs` directory
- Examples: `/examples` directory
- Issues: GitHub Issues
- Community: Coming soon

## Additional Resources

- [Blockchain Basics](https://bitcoin.org/bitcoin.pdf)
- [Smart Contracts](https://ethereum.org/en/smart-contracts/)
- [VR Development](https://unity.com/)
- [Web3 Guide](https://web3.foundation/)

Happy coding! 🚀
