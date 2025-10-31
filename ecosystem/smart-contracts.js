/**
 * Smart Contract System
 * Enables programmable transactions and automated agreements in the ecosystem
 */

class SmartContract {
  constructor(id, creator, code, description) {
    this.id = id;
    this.creator = creator;
    this.code = code;
    this.description = description;
    this.createdAt = Date.now();
    this.state = {};
    this.isActive = true;
  }

  /**
   * Execute the smart contract
   */
  execute(params, blockchain) {
    if (!this.isActive) {
      return {
        success: false,
        error: 'Contract is not active',
      };
    }

    try {
      // Create execution context
      const context = {
        params,
        state: this.state,
        blockchain,
        timestamp: Date.now(),
      };

      // Execute contract code
      const result = this.code(context);

      // Update state if needed
      if (result.newState) {
        this.state = { ...this.state, ...result.newState };
      }

      return {
        success: true,
        result,
        state: this.state,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Deactivate contract
   */
  deactivate() {
    this.isActive = false;
  }

  /**
   * Get contract info
   */
  getInfo() {
    return {
      id: this.id,
      creator: this.creator,
      description: this.description,
      createdAt: this.createdAt,
      isActive: this.isActive,
      state: this.state,
    };
  }
}

class SmartContractManager {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.contracts = new Map();
  }

  /**
   * Deploy a new smart contract
   */
  deployContract(creator, code, description) {
    const id = `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const contract = new SmartContract(id, creator, code, description);
    this.contracts.set(id, contract);

    return {
      success: true,
      contractId: id,
      contract: contract.getInfo(),
    };
  }

  /**
   * Execute a smart contract
   */
  executeContract(contractId, params) {
    if (!this.contracts.has(contractId)) {
      return {
        success: false,
        error: 'Contract not found',
      };
    }

    const contract = this.contracts.get(contractId);
    return contract.execute(params, this.blockchain);
  }

  /**
   * Get contract details
   */
  getContract(contractId) {
    if (!this.contracts.has(contractId)) {
      return {
        success: false,
        error: 'Contract not found',
      };
    }

    return {
      success: true,
      contract: this.contracts.get(contractId).getInfo(),
    };
  }

  /**
   * List all contracts
   */
  listContracts() {
    const contractList = [];
    for (const [id, contract] of this.contracts) {
      contractList.push(contract.getInfo());
    }

    return {
      success: true,
      contracts: contractList,
      count: contractList.length,
    };
  }

  /**
   * Deactivate a contract
   */
  deactivateContract(contractId, caller) {
    if (!this.contracts.has(contractId)) {
      return {
        success: false,
        error: 'Contract not found',
      };
    }

    const contract = this.contracts.get(contractId);
    
    if (contract.creator !== caller) {
      return {
        success: false,
        error: 'Only creator can deactivate contract',
      };
    }

    contract.deactivate();
    return {
      success: true,
      message: 'Contract deactivated',
    };
  }
}

module.exports = { SmartContract, SmartContractManager };
