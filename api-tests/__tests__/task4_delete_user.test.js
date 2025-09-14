/**
 * task4_delete_user.test.js
 * Automated tests for User Delete API using supertest and mock-user-auth.
 * Covers valid/invalid authorization, admin key, and invalid method scenarios.
 */

const { request } = require('../utils/api_client');
const { getValidToken, getInvalidToken } = require('../utils/helpers');
const testData = require('../testData');

describe('User Delete API', () => {
  const { getUser1, getUser2, adminKey } = testData;

  beforeAll(async () => {
    // Create users for delete tests
    await request().post('/api/v1/users').send(getUser1);
    await request().post('/api/v1/users').send(getUser2);
  });

  afterAll(async () => {
    // Clean up all users after tests
    await request()
      .delete('/api/v1/all-users')
      .send({ key_admin: adminKey });
  });

  /**
   * 1. Should delete user1 with a valid token.
   */
  it('1. should delete user1 with a valid token', async () => {
    const validToken = await getValidToken(request(), getUser1.email, getUser1.password);
    const response = await request()
      .delete('/api/v1/users')
      .set('Authorization', validToken);
    console.log('Request: Authorization', validToken);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted with success');
  });

  /**
   * 2. Should return unauthorized for invalid token when deleting user2.
   */
  it('2. should return unauthorized for invalid token when deleting user2', async () => {
    const invalidToken = getInvalidToken();
    const response = await request()
      .delete('/api/v1/users')
      .set('Authorization', invalidToken);
    console.log('Request: Authorization', invalidToken);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 3. Should return unauthorized error when trying to delete user2 without a token.
   */
  it('3. should return unauthorized error when trying to delete user2 without a token', async () => {
    const response = await request()
      .delete('/api/v1/users');
    console.log('Request: No Authorization');
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 4. Should delete all users with the admin key.
   */
  it('4. should delete all users with the admin key', async () => {
    const response = await request()
      .delete('/api/v1/all-users')
      .send({ key_admin: adminKey });
    console.log('Request: key_admin', adminKey);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Users deleted with success');
  });

  /**
   * 5. Should return unauthorized when trying to delete all users without admin key.
   */
  it('5. should return unauthorized when trying to delete all users without admin key', async () => {
    const response = await request()
      .delete('/api/v1/all-users')
      .send({});
    console.log('Request: No key_admin');
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 6. Should return 404 or 405 for invalid HTTP method (GET).
   */
  it('6. should return 404 or 405 for invalid HTTP method (GET)', async () => {
    const response = await request()
      .get('/api/v1/users');
    console.log('Request: GET /api/v1/users');
    console.log('Response:', response.statusCode, response.body);

    if (![404, 405].includes(response.statusCode)) {
      throw new Error(`Expected status 404 or 405, but received ${response.statusCode}`);
    }
  });
});