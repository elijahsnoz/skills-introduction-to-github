# Digital Currency Ecosystem

A comprehensive digital currency system designed for virtual reality environments, web applications, and decentralized ecosystems.

## Features

### Core Components
- **Blockchain**: Secure, decentralized ledger system
- **Wallet System**: Cryptographically secure digital wallets
- **Transaction Processing**: Fast and reliable transaction validation
- **Mining**: Proof-of-work consensus mechanism

### Virtual Reality Integration
- **VR Currency API**: Seamless integration with VR applications
- **VR Marketplace**: Buy and sell virtual items using digital currency
- **VR Sessions**: Manage currency transactions within VR environments
- **Real-time Balance Updates**: Instant wallet balance updates in VR

### Web Application Support
- **RESTful API**: Complete HTTP API for web applications
- **JavaScript SDK**: Easy-to-use SDK for web developers
- **CORS Support**: Cross-origin resource sharing enabled
- **Real-time Stats**: Live blockchain and transaction statistics

### Ecosystem Features
- **Smart Contracts**: Programmable transactions and automated agreements
- **Governance System**: Community-driven decision making
- **Proposal Voting**: Democratic voting mechanism with weighted votes
- **Marketplace**: Decentralized marketplace for digital assets

## Installation

```bash
npm install
```

## Quick Start

### Run the Demo

```bash
node index.js
```

This will run a comprehensive demo showcasing all features of the ecosystem.

### Start the Web API Server

```bash
npm run start-api
```

The API server will start on port 3000 by default.

## Usage Examples

### Creating a Wallet

```javascript
const DigitalCurrencyEcosystem = require('./index');
const ecosystem = new DigitalCurrencyEcosystem();

const wallet = ecosystem.createWallet('Alice');
console.log('Wallet address:', wallet.address);
```

### Making a Transaction

```javascript
ecosystem.createTransaction(
  aliceAddress,
  bobAddress,
  50 // amount
);

// Mine the transaction
ecosystem.minePendingTransactions(minerAddress);
```

### VR Integration

```javascript
const vrInterface = ecosystem.vrInterface;

// Initialize VR session
const session = vrInterface.initVRSession('session_1', walletAddress);

// Purchase virtual item
const purchase = vrInterface.purchaseVirtualItem(
  'session_1',
  buyerAddress,
  'item_001',
  100, // price
  sellerAddress
);
```

### Web API Usage

```javascript
// Using the SDK
const sdk = new DigitalCurrencySDK('http://localhost:3000/api');

// Create wallet
const wallet = await sdk.createWallet('Bob');

// Get balance
const balance = await sdk.getBalance(wallet.wallet.address);

// Create transaction
const tx = await sdk.createTransaction(fromAddress, toAddress, 50);

// Mine block
const result = await sdk.mine(minerAddress);
```

### Smart Contracts

```javascript
const contractCode = (context) => {
  const { params, state, blockchain } = context;
  // Your contract logic here
  return {
    success: true,
    newState: { /* updated state */ }
  };
};

const contract = ecosystem.smartContracts.deployContract(
  creatorAddress,
  contractCode,
  'My Smart Contract'
);
```

### Governance

```javascript
// Create proposal
const proposal = ecosystem.governance.createProposal(
  creatorAddress,
  'Proposal Title',
  'Proposal Description',
  24 * 60 * 60 * 1000 // voting period (24 hours)
);

// Vote on proposal
ecosystem.governance.vote(
  proposalId,
  voterAddress,
  true // vote in favor
);

// Finalize proposal
ecosystem.governance.finalizeProposal(proposalId);
```

## API Endpoints

### Blockchain Endpoints
- `GET /api/blockchain` - Get entire blockchain
- `GET /api/blockchain/validate` - Validate blockchain integrity

### Wallet Endpoints
- `POST /api/wallet/create` - Create new wallet
- `GET /api/wallet/:address/balance` - Get wallet balance

### Transaction Endpoints
- `POST /api/transaction/create` - Create transaction
- `POST /api/mine` - Mine pending transactions

### Stats Endpoints
- `GET /api/stats` - Get ecosystem statistics
- `GET /api/health` - Health check

## Architecture

```
digital-currency-ecosystem/
├── digital-currency/      # Core blockchain components
│   ├── blockchain.js      # Blockchain implementation
│   ├── wallet.js          # Wallet system
│   └── transaction.js     # Transaction processing
├── vr-integration/        # Virtual reality components
│   ├── vr-currency-api.js # VR API interface
│   └── vr-marketplace.js  # VR marketplace
├── web-api/               # Web application components
│   ├── api-server.js      # RESTful API server
│   └── sdk.js             # JavaScript SDK
├── ecosystem/             # Ecosystem features
│   ├── smart-contracts.js # Smart contract system
│   └── governance.js      # Governance system
├── docs/                  # Documentation
└── index.js               # Main entry point
```

## Technology Stack

- **Node.js**: Runtime environment
- **Express**: Web API framework
- **Crypto**: Cryptographic operations
- **JavaScript**: Primary programming language

## Security Features

- SHA-256 hashing for block integrity
- Cryptographic signatures for transactions
- Proof-of-work mining for consensus
- Address-based authentication
- Transaction validation

## Use Cases

### Virtual Reality
- In-game currency for VR games
- Virtual item purchases
- Avatar customization payments
- VR world subscriptions

### Web Applications
- E-commerce payments
- Content creator monetization
- Subscription services
- Peer-to-peer transfers

### Ecosystem
- Community governance
- Decentralized marketplace
- Smart contract execution
- Token-based voting

## Configuration

The system uses the following default configurations:

- Mining difficulty: 2
- Mining reward: 100 coins
- Minimum voting period: 24 hours
- API port: 3000

These can be customized by modifying the respective class constructors.

## Development

### Running Tests

```bash
npm test
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Multi-signature wallets
- [ ] Lightning network implementation
- [ ] Mobile app integration
- [ ] Hardware wallet support
- [ ] Advanced smart contract features
- [ ] Decentralized exchange
- [ ] Cross-chain bridges
- [ ] Enhanced VR features
