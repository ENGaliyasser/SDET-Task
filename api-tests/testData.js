/**
 * testData.js
 * Centralized test data for API authentication and user CRUD tests.
 */

module.exports = {
  validUser: { username: 'john_doe', password: 'password123' },
  invalidUser: { username: 'wrong', password: 'wrongpass' },
  newUser: { username: 'alice', password: 'alicepass' },
  adminKey: 'admin123',
  // Data for extra fields scenario
  extraFields: {
    age: 30,
    address: '123 Main St'
  },
  // Data for missing fields scenarios
  missingEmail: { password: 'password123' },
  missingPassword: { username: 'john_doe' },
  emptyBody: {},
  // Additional data for create user tests
  duplicateUser: { name: 'Ahmed', email: 'ahmed@gmail.com', password: 'password123' },
  // Data for update, get, delete tests
  updateUser1: { name: 'mock1', email: 'mock1@gmail.com', password: 'password123' },
  updateUser2: { name: 'mock2', email: 'mock2@gmail.com', password: 'password123' },
  getUser1: { name: 'mockk1', email: 'mockk1@gmail.com', password: 'password123' },
  getUser2: { name: 'mockk2', email: 'mockk2@gmail.com', password: 'password123' }
};