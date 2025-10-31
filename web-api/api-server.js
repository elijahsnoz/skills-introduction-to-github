/**
 * Web API for Digital Currency
 * RESTful API endpoints for web applications to interact with the digital currency system
 */

const express = require('express');
const { Blockchain } = require('../digital-currency/blockchain');
const Wallet = require('../digital-currency/wallet');
const Transaction = require('../digital-currency/transaction');

class WebAPI {
  constructor() {
    this.app = express();
    this.blockchain = new Blockchain();
    this.wallets = new Map();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // CORS middleware
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
  }

  setupRoutes() {
    // Blockchain routes
    this.app.get('/api/blockchain', (req, res) => {
      res.json({
        success: true,
        chain: this.blockchain.chain,
        length: this.blockchain.chain.length,
      });
    });

    this.app.get('/api/blockchain/validate', (req, res) => {
      const isValid = this.blockchain.isChainValid();
      res.json({
        success: true,
        isValid,
      });
    });

    // Wallet routes
    this.app.post('/api/wallet/create', (req, res) => {
      const { owner } = req.body;
      if (!owner) {
        return res.status(400).json({
          success: false,
          error: 'Owner name is required',
        });
      }

      const wallet = new Wallet(owner);
      this.wallets.set(wallet.address, wallet);

      res.json({
        success: true,
        wallet: wallet.getInfo(),
      });
    });

    this.app.get('/api/wallet/:address/balance', (req, res) => {
      const { address } = req.params;
      const balance = this.blockchain.getBalanceOfAddress(address);

      res.json({
        success: true,
        address,
        balance,
      });
    });

    // Transaction routes
    this.app.post('/api/transaction/create', (req, res) => {
      const { from, to, amount } = req.body;

      if (!from || !to || !amount) {
        return res.status(400).json({
          success: false,
          error: 'From, to, and amount are required',
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Amount must be positive',
        });
      }

      const transaction = new Transaction(from, to, parseFloat(amount));
      this.blockchain.createTransaction(transaction);

      res.json({
        success: true,
        transaction: transaction.toJSON(),
        pendingCount: this.blockchain.pendingTransactions.length,
      });
    });

    this.app.post('/api/mine', (req, res) => {
      const { minerAddress } = req.body;

      if (!minerAddress) {
        return res.status(400).json({
          success: false,
          error: 'Miner address is required',
        });
      }

      this.blockchain.minePendingTransactions(minerAddress);

      res.json({
        success: true,
        message: 'Block mined successfully',
        reward: this.blockchain.miningReward,
        minerBalance: this.blockchain.getBalanceOfAddress(minerAddress),
      });
    });

    // Stats routes
    this.app.get('/api/stats', (req, res) => {
      const totalBlocks = this.blockchain.chain.length;
      const pendingTransactions = this.blockchain.pendingTransactions.length;

      res.json({
        success: true,
        stats: {
          totalBlocks,
          pendingTransactions,
          difficulty: this.blockchain.difficulty,
          miningReward: this.blockchain.miningReward,
        },
      });
    });

    // Health check
    this.app.get('/api/health', (req, res) => {
      res.json({
        success: true,
        status: 'healthy',
        timestamp: Date.now(),
      });
    });
  }

  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Web API server running on port ${port}`);
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = WebAPI;
