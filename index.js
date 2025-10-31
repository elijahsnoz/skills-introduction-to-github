/**
 * Digital Currency Ecosystem
 * Main entry point for the digital currency system
 */

const { Blockchain } = require('./digital-currency/blockchain');
const Wallet = require('./digital-currency/wallet');
const Transaction = require('./digital-currency/transaction');
const VRCurrencyInterface = require('./vr-integration/vr-currency-api');
const VRMarketplace = require('./vr-integration/vr-marketplace');
const { SmartContractManager } = require('./ecosystem/smart-contracts');
const { GovernanceSystem } = require('./ecosystem/governance');

// WebAPI is optional and requires express
let WebAPI = null;
try {
  WebAPI = require('./web-api/api-server');
} catch (err) {
  // Express not installed, WebAPI will not be available
  if (err.code !== 'MODULE_NOT_FOUND') {
    console.error('Error loading WebAPI:', err.message);
  }
}

class DigitalCurrencyEcosystem {
  constructor() {
    console.log('Initializing Digital Currency Ecosystem...');
    
    // Core components
    this.blockchain = new Blockchain();
    this.wallets = new Map();
    
    // VR components
    this.vrInterface = new VRCurrencyInterface(this.blockchain);
    this.vrMarketplace = new VRMarketplace(this.blockchain);
    
    // Ecosystem components
    this.smartContracts = new SmartContractManager(this.blockchain);
    this.governance = new GovernanceSystem(this.blockchain);
    
    // Web API (optional)
    if (WebAPI) {
      this.webAPI = new WebAPI();
    } else {
      this.webAPI = null;
      console.log('Note: Web API not available (express not installed)');
    }
    
    console.log('Digital Currency Ecosystem initialized successfully!');
  }

  /**
   * Create a new wallet
   */
  createWallet(owner) {
    const wallet = new Wallet(owner);
    this.wallets.set(wallet.address, wallet);
    console.log(`Wallet created for ${owner}: ${wallet.address}`);
    return wallet;
  }

  /**
   * Create and sign a transaction
   */
  createTransaction(fromAddress, toAddress, amount) {
    const transaction = new Transaction(fromAddress, toAddress, amount);
    
    if (this.wallets.has(fromAddress)) {
      const wallet = this.wallets.get(fromAddress);
      transaction.sign(wallet);
    }
    
    this.blockchain.createTransaction(transaction);
    console.log(`Transaction created: ${amount} from ${fromAddress} to ${toAddress}`);
    return transaction;
  }

  /**
   * Mine pending transactions
   */
  minePendingTransactions(minerAddress) {
    console.log(`Mining pending transactions for ${minerAddress}...`);
    this.blockchain.minePendingTransactions(minerAddress);
    console.log('Block mined successfully!');
    return this.blockchain.getBalanceOfAddress(minerAddress);
  }

  /**
   * Get wallet balance
   */
  getBalance(address) {
    return this.blockchain.getBalanceOfAddress(address);
  }

  /**
   * Start the web API server
   */
  startWebAPI(port = 3000) {
    if (!this.webAPI) {
      console.error('Web API not available. Install express: npm install express');
      return;
    }
    this.webAPI.start(port);
  }

  /**
   * Get ecosystem stats
   */
  getStats() {
    return {
      totalBlocks: this.blockchain.chain.length,
      pendingTransactions: this.blockchain.pendingTransactions.length,
      totalWallets: this.wallets.size,
      isChainValid: this.blockchain.isChainValid(),
      difficulty: this.blockchain.difficulty,
      miningReward: this.blockchain.miningReward,
    };
  }

  /**
   * Demo function to showcase the ecosystem
   */
  runDemo() {
    console.log('\n=== Digital Currency Ecosystem Demo ===\n');

    // Create wallets
    console.log('1. Creating wallets...');
    const alice = this.createWallet('Alice');
    const bob = this.createWallet('Bob');
    const charlie = this.createWallet('Charlie');

    // Mine initial coins
    console.log('\n2. Mining initial coins for Alice...');
    this.minePendingTransactions(alice.address);
    this.minePendingTransactions(alice.address);
    console.log(`Alice's balance: ${this.getBalance(alice.address)}`);

    // Create transactions
    console.log('\n3. Creating transactions...');
    this.createTransaction(alice.address, bob.address, 30);
    this.createTransaction(alice.address, charlie.address, 20);

    // Mine transactions
    console.log('\n4. Mining transactions...');
    this.minePendingTransactions(bob.address);

    // Display balances
    console.log('\n5. Final balances:');
    console.log(`Alice: ${this.getBalance(alice.address)}`);
    console.log(`Bob: ${this.getBalance(bob.address)}`);
    console.log(`Charlie: ${this.getBalance(charlie.address)}`);

    // VR Demo
    console.log('\n6. VR Integration Demo...');
    const vrSession = this.vrInterface.initVRSession('session_1', alice.address);
    console.log('VR Session:', vrSession);

    // List virtual item
    this.vrMarketplace.listItem(
      'item_001',
      'Virtual Sword',
      'Legendary sword for VR game',
      15,
      alice.address,
      'weapons'
    );
    console.log('Virtual item listed in marketplace');

    // Smart Contract Demo
    console.log('\n7. Smart Contract Demo...');
    const contractCode = (context) => {
      const { params } = context;
      if (params.action === 'transfer') {
        return {
          success: true,
          message: `Transferred ${params.amount} tokens`,
          newState: { lastTransfer: params.amount },
        };
      }
      return { success: false };
    };

    const contract = this.smartContracts.deployContract(
      alice.address,
      contractCode,
      'Token Transfer Contract'
    );
    console.log('Smart contract deployed:', contract.contractId);

    // Governance Demo
    console.log('\n8. Governance Demo...');
    const proposal = this.governance.createProposal(
      alice.address,
      'Increase Mining Reward',
      'Proposal to increase mining reward from 100 to 150',
      24 * 60 * 60 * 1000 // 24 hours
    );
    console.log('Governance proposal created:', proposal.proposalId);

    // Display stats
    console.log('\n9. Ecosystem Stats:');
    console.log(this.getStats());

    console.log('\n=== Demo Complete ===\n');
  }
}

// Export for use as a module
module.exports = DigitalCurrencyEcosystem;

// Run demo if executed directly
if (require.main === module) {
  const ecosystem = new DigitalCurrencyEcosystem();
  ecosystem.runDemo();
}
