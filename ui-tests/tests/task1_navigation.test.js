/**
 * task1_navigation.test.js
 * UI Navigation Test for ACME Chemicals Sample Site using Nightwatch.js and Page Object Model.
 * Steps:
 *   1. Open homepage and verify it loads
 *   2. Navigate to Contact page and validate content
 *   3. Navigate back and confirm homepage content is shown again
 */

module.exports = {
  'ACME Chemicals Navigation Flow': function (browser) {
    const navigationPage = browser.page.task1_navigation_page();
    const homepageText = 'The point is not merely to enhance the strength';
    const contactPageText = 'CONTACT ACME CHEMICALS';

    // Step 1: Open homepage and verify it loads
    
    navigationPage
      .navigate()
      .waitForElementVisible('@homepageBody', 5000)
      .assertHomepageText(homepageText);
    browser.saveScreenshot('ui-tests/screenshots/task1/step1_homepage.png');

    // Step 2: Navigate to Contact page and validate content
    
    navigationPage
      .goToContact()
      .assertContactText(contactPageText);
    browser.saveScreenshot('ui-tests/screenshots/task1/step2_contact.png');

    // Step 3: Navigate back and confirm homepage content is shown again
    
    browser
      .back()
      .waitForElementVisible('body', 5000)
      .assert.containsText('body', homepageText, 'Homepage content is visible after back navigationmmmmmm');
    browser.saveScreenshot('ui-tests/screenshots/task1/step3_back_to_homepage.png');

    // End the browser session
    browser.end();
  }
};
