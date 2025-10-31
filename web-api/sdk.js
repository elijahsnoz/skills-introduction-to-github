/**
 * Web SDK for Digital Currency
 * JavaScript SDK for web applications to easily integrate with the digital currency
 */

class DigitalCurrencySDK {
  constructor(apiUrl = 'http://localhost:3000/api') {
    this.apiUrl = apiUrl;
  }

  /**
   * Create a new wallet
   */
  async createWallet(owner) {
    const response = await fetch(`${this.apiUrl}/wallet/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ owner }),
    });
    return await response.json();
  }

  /**
   * Get wallet balance
   */
  async getBalance(address) {
    const response = await fetch(`${this.apiUrl}/wallet/${address}/balance`);
    return await response.json();
  }

  /**
   * Create a transaction
   */
  async createTransaction(from, to, amount) {
    const response = await fetch(`${this.apiUrl}/transaction/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to, amount }),
    });
    return await response.json();
  }

  /**
   * Mine pending transactions
   */
  async mine(minerAddress) {
    const response = await fetch(`${this.apiUrl}/mine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ minerAddress }),
    });
    return await response.json();
  }

  /**
   * Get blockchain
   */
  async getBlockchain() {
    const response = await fetch(`${this.apiUrl}/blockchain`);
    return await response.json();
  }

  /**
   * Validate blockchain
   */
  async validateBlockchain() {
    const response = await fetch(`${this.apiUrl}/blockchain/validate`);
    return await response.json();
  }

  /**
   * Get stats
   */
  async getStats() {
    const response = await fetch(`${this.apiUrl}/stats`);
    return await response.json();
  }

  /**
   * Health check
   */
  async healthCheck() {
    const response = await fetch(`${this.apiUrl}/health`);
    return await response.json();
  }
}

// For browser environments
if (typeof window !== 'undefined') {
  window.DigitalCurrencySDK = DigitalCurrencySDK;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DigitalCurrencySDK;
}
