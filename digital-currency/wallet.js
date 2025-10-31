/**
 * Digital Wallet Implementation
 * Manages user accounts and digital currency holdings
 */

const crypto = require('crypto');

class Wallet {
  constructor(owner) {
    this.owner = owner;
    this.address = this.generateAddress();
    this.privateKey = this.generatePrivateKey();
    this.publicKey = this.generatePublicKey();
  }

  generateAddress() {
    return crypto.randomBytes(32).toString('hex');
  }

  generatePrivateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  generatePublicKey() {
    return crypto
      .createHash('sha256')
      .update(this.privateKey + this.address)
      .digest('hex');
  }

  signTransaction(transaction) {
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(transaction))
      .digest('hex');
    
    const signature = crypto
      .createHmac('sha256', this.privateKey)
      .update(hash)
      .digest('hex');
    
    return signature;
  }

  verifyTransaction(transaction, signature) {
    const hash = crypto
      .createHash('sha256')
      .update(JSON.stringify(transaction))
      .digest('hex');
    
    const expectedSignature = crypto
      .createHmac('sha256', this.privateKey)
      .update(hash)
      .digest('hex');
    
    return signature === expectedSignature;
  }

  getInfo() {
    return {
      owner: this.owner,
      address: this.address,
      publicKey: this.publicKey,
    };
  }
}

module.exports = Wallet;
