/**
 * Example: Smart Contracts
 * Demonstrates how to create and execute smart contracts
 */

const DigitalCurrencyEcosystem = require('../index');

async function smartContractExample() {
  console.log('=== Smart Contract Example ===\n');

  const ecosystem = new DigitalCurrencyEcosystem();

  // Create wallet
  const creator = ecosystem.createWallet('Contract Creator');
  
  // Mine some coins
  ecosystem.minePendingTransactions(creator.address);
  console.log(`Creator balance: ${ecosystem.getBalance(creator.address)} coins\n`);

  // 1. Simple Token Transfer Contract
  console.log('Deploying Token Transfer Contract...');
  const transferContract = (context) => {
    const { params, state } = context;
    
    if (params.action === 'transfer' && params.amount > 0) {
      const totalTransferred = (state.totalTransferred || 0) + params.amount;
      
      return {
        success: true,
        message: `Transferred ${params.amount} tokens`,
        newState: {
          totalTransferred,
          lastTransfer: params.amount,
          transferCount: (state.transferCount || 0) + 1,
        },
      };
    }
    
    return { success: false, error: 'Invalid transfer parameters' };
  };

  const contract1 = ecosystem.smartContracts.deployContract(
    creator.address,
    transferContract,
    'Token Transfer Contract'
  );
  console.log(`Contract deployed: ${contract1.contractId}\n`);

  // Execute the contract
  console.log('Executing transfer contract...');
  const result1 = ecosystem.smartContracts.executeContract(
    contract1.contractId,
    { action: 'transfer', amount: 50 }
  );
  console.log('Execution result:', result1.result);
  console.log('Contract state:', result1.state);

  // 2. Escrow Contract
  console.log('\nDeploying Escrow Contract...');
  const escrowContract = (context) => {
    const { params, state } = context;
    
    if (params.action === 'deposit') {
      return {
        success: true,
        message: 'Funds deposited in escrow',
        newState: {
          depositor: params.from,
          amount: params.amount,
          recipient: params.to,
          released: false,
        },
      };
    }
    
    if (params.action === 'release' && state.depositor === params.caller) {
      return {
        success: true,
        message: 'Escrow released',
        newState: {
          ...state,
          released: true,
          releaseTime: Date.now(),
        },
      };
    }
    
    return { success: false, error: 'Invalid escrow action' };
  };

  const contract2 = ecosystem.smartContracts.deployContract(
    creator.address,
    escrowContract,
    'Escrow Contract'
  );
  console.log(`Contract deployed: ${contract2.contractId}\n`);

  // Execute escrow deposit
  console.log('Depositing to escrow...');
  const depositResult = ecosystem.smartContracts.executeContract(
    contract2.contractId,
    {
      action: 'deposit',
      from: creator.address,
      to: 'recipient_address',
      amount: 100,
    }
  );
  console.log('Deposit result:', depositResult.result);

  // 3. Voting Contract
  console.log('\nDeploying Voting Contract...');
  const votingContract = (context) => {
    const { params, state } = context;
    
    if (params.action === 'vote') {
      const votes = state.votes || {};
      const voters = state.voters || new Set();
      
      if (voters.has(params.voter)) {
        return { success: false, error: 'Already voted' };
      }
      
      votes[params.option] = (votes[params.option] || 0) + 1;
      voters.add(params.voter);
      
      return {
        success: true,
        message: `Vote recorded for ${params.option}`,
        newState: {
          votes,
          voters,
          totalVotes: (state.totalVotes || 0) + 1,
        },
      };
    }
    
    if (params.action === 'results') {
      return {
        success: true,
        results: state.votes || {},
        totalVotes: state.totalVotes || 0,
      };
    }
    
    return { success: false, error: 'Invalid voting action' };
  };

  const contract3 = ecosystem.smartContracts.deployContract(
    creator.address,
    votingContract,
    'Voting Contract'
  );
  console.log(`Contract deployed: ${contract3.contractId}\n`);

  // Cast votes
  console.log('Casting votes...');
  ['voter1', 'voter2', 'voter3'].forEach((voter, index) => {
    const option = index % 2 === 0 ? 'optionA' : 'optionB';
    const voteResult = ecosystem.smartContracts.executeContract(
      contract3.contractId,
      { action: 'vote', voter, option }
    );
    console.log(`${voter} voted for ${option}:`, voteResult.success);
  });

  // Get results
  const results = ecosystem.smartContracts.executeContract(
    contract3.contractId,
    { action: 'results' }
  );
  console.log('\nVoting results:', results.result.results);

  // List all contracts
  console.log('\nAll deployed contracts:');
  const allContracts = ecosystem.smartContracts.listContracts();
  allContracts.contracts.forEach(contract => {
    console.log(`  - ${contract.id}: ${contract.description}`);
    console.log(`    Created by: ${contract.creator}`);
    console.log(`    Active: ${contract.isActive}`);
  });
}

smartContractExample().catch(console.error);
