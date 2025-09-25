/**
 * task1_navigation_page.js
 * Nightwatch Page Object for ACME Chemicals Sample Site navigation.
 * Encapsulates selectors and navigation commands for homepage and contact page.
 *
 * Elements:
 *   contactLink      - Link to the Contact page
 *   homepageBody     - Body of the homepage
 *   contactBody      - Body of the contact page
 */

module.exports = {
  url: 'http://s3-design-sample-site.s3-website-us-west-2.amazonaws.com/',
  elements: {
    contactLink: 'a[href="contact.html"]',
    homepageBody: 'body span.style2',
    contactBody: 'body table td.style2 p'
  },
  commands: [{
    /**
     * Navigates to the Contact page.
     */
    goToContact() {
      return this
        .waitForElementVisible('@contactLink', 5000)
        .click('@contactLink')
        .waitForElementVisible('@contactBody', 5000);
    },
    /**
     * Asserts homepage text is present.
     * @param {string} text
     */
    assertHomepageText(text) {
      return this.api.assert.containsText(this.elements.homepageBody.selector, text, 'Homepage text is displayed as expected');
    },
    /**
     * Asserts contact page text is present.
     * @param {string} text
     */
    assertContactText(text) {
      return this.api.assert.containsText(this.elements.contactBody.selector, text, 'Contact page header is correct');
    }
  }]
};
