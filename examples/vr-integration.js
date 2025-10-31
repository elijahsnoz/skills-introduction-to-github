/**
 * Example: VR Integration
 * Demonstrates how to integrate the digital currency with VR applications
 */

const DigitalCurrencyEcosystem = require('../index');

async function vrExample() {
  console.log('=== VR Integration Example ===\n');

  const ecosystem = new DigitalCurrencyEcosystem();

  // Create wallets for VR users
  const player1 = ecosystem.createWallet('VR_Player_1');
  const gameStore = ecosystem.createWallet('VR_Game_Store');

  // Give player some coins
  ecosystem.minePendingTransactions(player1.address);
  ecosystem.minePendingTransactions(player1.address);
  console.log(`Player balance: ${ecosystem.getBalance(player1.address)} coins\n`);

  // Initialize VR session
  console.log('Initializing VR session...');
  const session = ecosystem.vrInterface.initVRSession(
    'vr_session_001',
    player1.address
  );
  console.log('Session initialized:', session.success);

  // List virtual items in marketplace
  console.log('\nListing virtual items...');
  
  ecosystem.vrMarketplace.listItem(
    'sword_001',
    'Legendary Sword',
    'A powerful weapon for VR combat',
    30,
    gameStore.address,
    'weapons'
  );

  ecosystem.vrMarketplace.listItem(
    'shield_001',
    'Diamond Shield',
    'Provides excellent protection',
    25,
    gameStore.address,
    'armor'
  );

  ecosystem.vrMarketplace.listItem(
    'avatar_001',
    'Elite Avatar Skin',
    'Premium avatar customization',
    40,
    gameStore.address,
    'avatars'
  );

  // Browse available items
  const items = ecosystem.vrMarketplace.getAvailableItems();
  console.log(`Available items: ${items.count}`);
  items.items.forEach(item => {
    console.log(`  - ${item.name}: ${item.price} coins (${item.category})`);
  });

  // Purchase item using VR interface
  console.log('\nPurchasing Legendary Sword...');
  const purchase = ecosystem.vrInterface.purchaseVirtualItem(
    'vr_session_001',
    player1.address,
    'sword_001',
    30,
    gameStore.address
  );

  if (purchase.success) {
    console.log('Purchase successful!');
    console.log(`New balance: ${purchase.balance} coins`);
  }

  // Mine the transaction
  ecosystem.minePendingTransactions(gameStore.address);

  // Check final balances
  console.log('\nFinal balances:');
  console.log(`Player: ${ecosystem.getBalance(player1.address)} coins`);
  console.log(`Game Store: ${ecosystem.getBalance(gameStore.address)} coins`);

  // Get VR session info
  const sessionInfo = ecosystem.vrInterface.getVRSessionInfo('vr_session_001');
  console.log(`\nTotal VR transactions: ${sessionInfo.session.transactionCount}`);

  // Close VR session
  const closeResult = ecosystem.vrInterface.closeVRSession('vr_session_001');
  console.log(`Session closed: ${closeResult.success}`);
}

vrExample().catch(console.error);
