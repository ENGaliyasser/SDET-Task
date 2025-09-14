/**
 * task3MyStoreSearchTest.js
 * Automated test for searching "dress" on My Store homepage using Nightwatch.js and Page Object Model.
 * Steps:
 *   1. Open homepage and search for "dress"
 *   2. Verify URL and search results
 *   3. Verify each product name contains "Dress"
 */

module.exports = {
  'My Store Search for "dress" Flow': function (browser) {
    const storePage = browser.page.task3_my_store_page();

    // Step 1: Open homepage and search for "dress"
    storePage
      .navigate()
      .waitForElementVisible('body', 5000)
      .searchForDress();
    browser.saveScreenshot('ui-tests/screenshots/task3/Step1_Search_for_dress.png');

    // Step 2: Verify URL and search results
    browser
      .assert.urlContains('controller=search', 'URL contains controller=search')
      .assert.elementPresent(storePage.elements.productItems.selector, 'Search results found for "dress".');
    browser.saveScreenshot('ui-tests/screenshots/task3/Step2_Verify_search_results.png');

    // Step 3: Verify each product name contains "Dress"
    storePage.getProductCount(function (productCount) {
      console.log(`Number of products found: ${productCount}`);
      for (let i = 1; i <= productCount; i++) {
        storePage.verifyProductContainsText(i, 'Dress');
      }
      browser.saveScreenshot('ui-tests/screenshots/task3/Step3_Verify_each_product.png');
    });

    // End the browser session
    browser.end();
  }
};