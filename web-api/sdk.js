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
    try {
      const response = await fetch(`${this.apiUrl}/wallet/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
  }

  /**
   * Get wallet balance
   */
  async getBalance(address) {
    try {
      const response = await fetch(`${this.apiUrl}/wallet/${address}/balance`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
  }

  /**
   * Create a transaction
   */
  async createTransaction(from, to, amount) {
    try {
      const response = await fetch(`${this.apiUrl}/transaction/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, amount }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
  }

  /**
   * Mine pending transactions
   */
  async mine(minerAddress) {
    try {
      const response = await fetch(`${this.apiUrl}/mine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ minerAddress }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
  }

  /**
   * Get blockchain
   */
  async getBlockchain() {
    try {
      const response = await fetch(`${this.apiUrl}/blockchain`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
  }

  /**
   * Validate blockchain
   */
  async validateBlockchain() {
    try {
      const response = await fetch(`${this.apiUrl}/blockchain/validate`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
  }

  /**
   * Get stats
   */
  async getStats() {
    try {
      const response = await fetch(`${this.apiUrl}/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
  }

  /**
   * Health check
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.apiUrl}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Network request failed',
      };
    }
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
