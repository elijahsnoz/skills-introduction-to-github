/**
 * Example: Basic Usage
 * Demonstrates the basic functionality of the digital currency ecosystem
 */

const DigitalCurrencyEcosystem = require('../index');

async function basicExample() {
  console.log('=== Basic Usage Example ===\n');

  // Initialize ecosystem
  const ecosystem = new DigitalCurrencyEcosystem();

  // Create wallets
  console.log('Creating wallets...');
  const alice = ecosystem.createWallet('Alice');
  const bob = ecosystem.createWallet('Bob');
  
  console.log(`Alice's address: ${alice.address}`);
  console.log(`Bob's address: ${bob.address}\n`);

  // Mine initial coins for Alice
  console.log('Mining coins for Alice...');
  ecosystem.minePendingTransactions(alice.address);
  ecosystem.minePendingTransactions(alice.address);
  
  console.log(`Alice's balance: ${ecosystem.getBalance(alice.address)}\n`);

  // Create transaction
  console.log('Creating transaction from Alice to Bob...');
  ecosystem.createTransaction(alice.address, bob.address, 30);

  // Mine the transaction
  console.log('Mining transaction...');
  ecosystem.minePendingTransactions(bob.address);

  // Check balances
  console.log('\nFinal balances:');
  console.log(`Alice: ${ecosystem.getBalance(alice.address)} coins`);
  console.log(`Bob: ${ecosystem.getBalance(bob.address)} coins`);

  // Validate blockchain
  const stats = ecosystem.getStats();
  console.log(`\nBlockchain valid: ${stats.isChainValid}`);
  console.log(`Total blocks: ${stats.totalBlocks}`);
}

basicExample().catch(console.error);
