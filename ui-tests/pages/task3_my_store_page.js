/**
 * storePage.js
 * Nightwatch Page Object for My Store (multiformis.com)
 * Encapsulates all selectors and commands for the search and product listing features.
 *
 * Elements:
 *   searchInput    - Search input field on homepage
 *   searchButton   - Search button
 *   productList    - Container for search results
 *   productItems   - Individual product items in results
 *   resultHeading  - Heading showing the search keyword
 */

module.exports = {
  url: 'http://automationpractice.multiformis.com/index.php',
  elements: {
    searchInput: 'input[name="search_query"]', // Search input field
    searchButton: 'button[name="submit_search"]', // Search button
    productList: '.product_list', // Container for search results
    productItems: '.product_list .ajax_block_product', // Individual product items
    resultHeading: '.lighter' // Heading showing search keyword
  },
  commands: [{
    /**
     * Searches for "dress" using the homepage search.
     */
    searchForDress() {
      return this
        .setValue('@searchInput', 'dress')
        .click('@searchButton')
        .waitForElementVisible('@productList', 5000);
    },
    /**
     * Gets the number of products in the search results.
     * @param {function} callback
     */
    getProductCount(callback) {
      this.api.elements('css selector', this.elements.productItems.selector, function (result) {
        callback(result.value.length);
      });
      return this;
    },
    /**
     * Verifies that the product at the given index contains the specified text.
     * @param {number} index
     * @param {string} text
     */
    verifyProductContainsText(index, text) {
      const productSelector = `.product_list .ajax_block_product:nth-child(${index}) .product-name`;
      return this.api.verify.containsText(productSelector, text, `Verifying product ${index} contains "${text}" in the name.`);
    }
  }]
};