/**
 * VR Marketplace
 * Manages virtual items and marketplace transactions in VR environments
 */

class VRMarketplace {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.items = new Map();
    this.listings = [];
  }

  /**
   * List a virtual item for sale
   */
  listItem(itemId, name, description, price, sellerAddress, category) {
    const listing = {
      id: itemId,
      name,
      description,
      price,
      seller: sellerAddress,
      category,
      listedAt: Date.now(),
      sold: false,
    };

    this.listings.push(listing);
    this.items.set(itemId, listing);

    return {
      success: true,
      listing,
    };
  }

  /**
   * Get all available marketplace items
   */
  getAvailableItems(category = null) {
    let availableItems = this.listings.filter(item => !item.sold);
    
    if (category) {
      availableItems = availableItems.filter(item => item.category === category);
    }

    return {
      success: true,
      items: availableItems,
      count: availableItems.length,
    };
  }

  /**
   * Purchase an item from the marketplace
   */
  purchaseItem(itemId, buyerAddress) {
    if (!this.items.has(itemId)) {
      return {
        success: false,
        error: 'Item not found',
      };
    }

    const item = this.items.get(itemId);
    
    if (item.sold) {
      return {
        success: false,
        error: 'Item already sold',
      };
    }

    const balance = this.blockchain.getBalanceOfAddress(buyerAddress);
    if (balance < item.price) {
      return {
        success: false,
        error: 'Insufficient balance',
        balance,
        required: item.price,
      };
    }

    // Create transaction
    this.blockchain.createTransaction({
      from: buyerAddress,
      to: item.seller,
      amount: item.price,
      itemId,
      timestamp: Date.now(),
    });

    item.sold = true;
    item.buyer = buyerAddress;
    item.soldAt = Date.now();

    return {
      success: true,
      item,
      newBalance: balance - item.price,
    };
  }

  /**
   * Get item details
   */
  getItemDetails(itemId) {
    if (!this.items.has(itemId)) {
      return {
        success: false,
        error: 'Item not found',
      };
    }

    return {
      success: true,
      item: this.items.get(itemId),
    };
  }

  /**
   * Get seller's listings
   */
  getSellerListings(sellerAddress) {
    const sellerItems = this.listings.filter(
      item => item.seller === sellerAddress
    );

    return {
      success: true,
      items: sellerItems,
      count: sellerItems.length,
    };
  }
}

module.exports = VRMarketplace;
