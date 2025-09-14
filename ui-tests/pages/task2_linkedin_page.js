/**
 * linkedinPage.js
 * Nightwatch Page Object for LinkedIn Registration
 * Encapsulates all selectors and commands for the registration workflow.
 *
 * Elements:
 *   joinNowLink     - "Join now" navigation link
 *   emailInput      - Email address input field
 *   passwordInput   - Password input field
 *   submitButton    - Submit/Continue button
 *   firstNameInput  - First name input field
 *   lastNameInput   - Last name input field
 *   securityHeader  - Header on the security verification page
 */

module.exports = {
  url: 'https://www.linkedin.com',
  elements: {
    joinNowLink: 'a[href*="signup"]',                // "Join now" navigation link
    emailInput: 'input[name="email-address"]',       // Email address input field
    passwordInput: 'input[name="password"]',         // Password input field
    submitButton: 'button[type="submit"]',           // Submit/Continue button
    firstNameInput: 'input[name="first-name"]',      // First name input field
    lastNameInput: 'input[name="last-name"]',        // Last name input field
    securityHeader: 'body'                          // Updated selector for security verification (captcha or challenge)
  },
  commands: [{
    /**
     * Navigates to the registration form by clicking "Join now".
     */
    goToRegistration() {
      return this
        .waitForElementVisible('@joinNowLink', 7000)
        .click('@joinNowLink')
        .waitForElementVisible('@emailInput', 5000);
    },
    /**
     * Fills in the email and password fields.
     * @param {string} email
     * @param {string} password
     */
    fillEmailAndPassword(email, password) {
      return this
        .setValue('@emailInput', email)
        .setValue('@passwordInput', password);
    },
    /**
     * Submits the registration form.
     */
    submitRegistration() {
      return this
        .click('@submitButton');
    },
    /**
     * Fills in the first and last name fields.
     * @param {string} firstName
     * @param {string} lastName
     */
    fillName(firstName, lastName) {
      return this
        .waitForElementVisible('@firstNameInput', 5000)
        .setValue('@firstNameInput', firstName)
        .setValue('@lastNameInput', lastName);
    },
    /**
     * Proceeds to the next step after entering names.
     */
    continueAfterName() {
      return this
        .click('@submitButton');
    },
    /**
     * Waits for the security verification page and asserts its presence.
     */
    verifySecurityPage() {
      // Check for common LinkedIn security/captcha text
      return this
        .waitForElementVisible('@securityHeader', 8000)
        .assert.textContains('@securityHeader', 'Security verification')
        .waitForElementVisible('@securityHeader', 8000)
    }
  }]
};