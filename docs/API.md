# API Documentation

## Overview

The Digital Currency Ecosystem provides a comprehensive RESTful API for web applications to interact with the blockchain, wallets, and transactions.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API does not require authentication. In production, implement proper authentication mechanisms.

## Endpoints

### Blockchain

#### Get Blockchain
Retrieve the entire blockchain with all blocks.

```
GET /api/blockchain
```

**Response:**
```json
{
  "success": true,
  "chain": [
    {
      "index": 0,
      "timestamp": 1234567890,
      "data": "Genesis Block",
      "previousHash": "0",
      "hash": "abc123...",
      "nonce": 0
    }
  ],
  "length": 1
}
```

#### Validate Blockchain
Check if the blockchain is valid.

```
GET /api/blockchain/validate
```

**Response:**
```json
{
  "success": true,
  "isValid": true
}
```

### Wallet

#### Create Wallet
Create a new digital wallet.

```
POST /api/wallet/create
```

**Request Body:**
```json
{
  "owner": "Alice"
}
```

**Response:**
```json
{
  "success": true,
  "wallet": {
    "owner": "Alice",
    "address": "abc123...",
    "publicKey": "def456..."
  }
}
```

#### Get Wallet Balance
Get the balance of a specific wallet address.

```
GET /api/wallet/:address/balance
```

**Response:**
```json
{
  "success": true,
  "address": "abc123...",
  "balance": 100
}
```

### Transactions

#### Create Transaction
Create a new transaction.

```
POST /api/transaction/create
```

**Request Body:**
```json
{
  "from": "abc123...",
  "to": "def456...",
  "amount": 50
}
```

**Response:**
```json
{
  "success": true,
  "transaction": {
    "from": "abc123...",
    "to": "def456...",
    "amount": 50,
    "timestamp": 1234567890,
    "signature": null
  },
  "pendingCount": 1
}
```

#### Mine Block
Mine pending transactions into a new block.

```
POST /api/mine
```

**Request Body:**
```json
{
  "minerAddress": "abc123..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Block mined successfully",
  "reward": 100,
  "minerBalance": 100
}
```

### Statistics

#### Get Stats
Get ecosystem statistics.

```
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalBlocks": 5,
    "pendingTransactions": 2,
    "difficulty": 2,
    "miningReward": 100
  }
}
```

#### Health Check
Check API health status.

```
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": 1234567890
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

## HTTP Status Codes

- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently, there are no rate limits. In production, implement appropriate rate limiting.

## CORS

CORS is enabled for all origins. In production, restrict to specific domains.

## Examples

### Using cURL

#### Create a wallet
```bash
curl -X POST http://localhost:3000/api/wallet/create \
  -H "Content-Type: application/json" \
  -d '{"owner":"Alice"}'
```

#### Create a transaction
```bash
curl -X POST http://localhost:3000/api/transaction/create \
  -H "Content-Type: application/json" \
  -d '{"from":"abc123","to":"def456","amount":50}'
```

#### Mine a block
```bash
curl -X POST http://localhost:3000/api/mine \
  -H "Content-Type: application/json" \
  -d '{"minerAddress":"abc123"}'
```

### Using JavaScript Fetch

```javascript
// Create wallet
const response = await fetch('http://localhost:3000/api/wallet/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ owner: 'Alice' }),
});
const data = await response.json();

// Get balance
const balance = await fetch('http://localhost:3000/api/wallet/abc123/balance');
const balanceData = await balance.json();
```

### Using the SDK

```javascript
const DigitalCurrencySDK = require('./web-api/sdk');
const sdk = new DigitalCurrencySDK('http://localhost:3000/api');

// Create wallet
const wallet = await sdk.createWallet('Alice');

// Get balance
const balance = await sdk.getBalance(wallet.wallet.address);

// Create transaction
const tx = await sdk.createTransaction(
  fromAddress,
  toAddress,
  50
);

// Mine block
const result = await sdk.mine(minerAddress);
```

## Webhooks

Webhook support is planned for future releases to notify applications of:
- New blocks mined
- Transactions confirmed
- Balance changes

## Versioning

Current API version: v1

Future versions will be accessible via `/api/v2/` prefix.
