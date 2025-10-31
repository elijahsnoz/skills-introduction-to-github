/**
 * VR Integration API
 * Provides interfaces for virtual reality applications to interact with the digital currency
 */

class VRCurrencyInterface {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.activeVRSessions = new Map();
  }

  /**
   * Initialize a VR session for currency transactions
   */
  initVRSession(sessionId, walletAddress) {
    this.activeVRSessions.set(sessionId, {
      walletAddress,
      timestamp: Date.now(),
      transactions: [],
    });
    return {
      success: true,
      sessionId,
      message: 'VR session initialized',
    };
  }

  /**
   * Process a VR transaction (e.g., buying virtual items)
   */
  processVRTransaction(sessionId, from, to, amount, itemId) {
    if (!this.activeVRSessions.has(sessionId)) {
      return {
        success: false,
        error: 'Invalid VR session',
      };
    }

    const session = this.activeVRSessions.get(sessionId);
    const transaction = {
      from,
      to,
      amount,
      itemId,
      timestamp: Date.now(),
      vrSession: sessionId,
    };

    this.blockchain.createTransaction(transaction);
    session.transactions.push(transaction);

    return {
      success: true,
      transaction,
      balance: this.blockchain.getBalanceOfAddress(from),
    };
  }

  /**
   * Get VR wallet balance for display in virtual environment
   */
  getVRBalance(sessionId, address) {
    if (!this.activeVRSessions.has(sessionId)) {
      return {
        success: false,
        error: 'Invalid VR session',
      };
    }

    return {
      success: true,
      address,
      balance: this.blockchain.getBalanceOfAddress(address),
      timestamp: Date.now(),
    };
  }

  /**
   * Purchase virtual items using digital currency
   */
  purchaseVirtualItem(sessionId, buyerAddress, itemId, price, seller) {
    if (!this.activeVRSessions.has(sessionId)) {
      return {
        success: false,
        error: 'Invalid VR session',
      };
    }

    const balance = this.blockchain.getBalanceOfAddress(buyerAddress);
    if (balance < price) {
      return {
        success: false,
        error: 'Insufficient balance',
        balance,
        required: price,
      };
    }

    return this.processVRTransaction(
      sessionId,
      buyerAddress,
      seller,
      price,
      itemId
    );
  }

  /**
   * Close VR session
   */
  closeVRSession(sessionId) {
    if (this.activeVRSessions.has(sessionId)) {
      const session = this.activeVRSessions.get(sessionId);
      this.activeVRSessions.delete(sessionId);
      return {
        success: true,
        message: 'VR session closed',
        totalTransactions: session.transactions.length,
      };
    }
    return {
      success: false,
      error: 'Session not found',
    };
  }

  /**
   * Get VR session info
   */
  getVRSessionInfo(sessionId) {
    if (!this.activeVRSessions.has(sessionId)) {
      return {
        success: false,
        error: 'Session not found',
      };
    }

    const session = this.activeVRSessions.get(sessionId);
    return {
      success: true,
      session: {
        walletAddress: session.walletAddress,
        timestamp: session.timestamp,
        transactionCount: session.transactions.length,
      },
    };
  }
}

module.exports = VRCurrencyInterface;
