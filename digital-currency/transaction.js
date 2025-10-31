/**
 * Transaction System
 * Handles transaction creation, validation, and processing
 */

class Transaction {
  constructor(from, to, amount, timestamp = Date.now()) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.timestamp = timestamp;
    this.signature = null;
  }

  sign(wallet) {
    if (wallet.address !== this.from) {
      throw new Error('You cannot sign transactions for other wallets!');
    }
    this.signature = wallet.signTransaction(this);
  }

  isValid() {
    // Mining rewards from null address are valid
    if (this.from === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    // Basic validation
    if (this.amount <= 0) {
      throw new Error('Transaction amount must be positive');
    }

    return true;
  }

  toJSON() {
    return {
      from: this.from,
      to: this.to,
      amount: this.amount,
      timestamp: this.timestamp,
      signature: this.signature,
    };
  }
}

module.exports = Transaction;
