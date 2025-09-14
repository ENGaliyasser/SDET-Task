/**
 * task4_get_user.test.js
 * Automated tests for User Read API using supertest and mock-user-auth.
 * Covers valid/invalid authorization, token expiration, and invalid method scenarios.
 */

const { request } = require('../utils/api_client');
const { getValidToken, getInvalidToken } = require('../utils/helpers');
const testData = require('../testData');

describe('User Read API', () => {
  const { getUser1, getUser2 } = testData;

  beforeAll(async () => {
    // Create users for get tests
    await request().post('/api/v1/users').send(getUser1);
    await request().post('/api/v1/users').send(getUser2);
  });

  afterAll(async () => {
    // Clean up all users after tests
    await request()
      .delete('/api/v1/all-users')
      .send({ key_admin: testData.adminKey });
  });

  /**
   * 1. Should retrieve user details with a valid token.
   */
  it('1. should retrieve user details with a valid token', async () => {
    const validToken = await getValidToken(request(), getUser1.email, getUser1.password);
    const response = await request()
      .get('/api/v1/users')
      .set('Authorization', validToken);
    console.log('Request: Authorization', validToken);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', getUser1.email);
    expect(response.body).toHaveProperty('name', getUser1.name);
  });

  /**
   * 2. Should handle token expiration as unauthorized.
   */
  it('2. should handle token expiration as unauthorized', async () => {
    // Simulate expired token by passing an invalid/expired token string
    const response = await request()
      .get('/api/v1/users')
      .set('Authorization', 'expired');
    console.log('Request: Authorization expired');
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 3. Should return unauthorized for invalid token.
   */
  it('3. should return unauthorized for invalid token', async () => {
    const invalidToken = getInvalidToken();
    const response = await request()
      .get('/api/v1/users')
      .set('Authorization', invalidToken);
    console.log('Request: Authorization', invalidToken);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 4. Should return unauthorized for missing token.
   */
  it('4. should return unauthorized for missing token', async () => {
    const response = await request()
      .get('/api/v1/users');
    console.log('Request: No Authorization');
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 5. Should return 404 or 405 for invalid HTTP method (POST).
   */
  it('5. should return 404 or 405 for invalid HTTP method (POST)', async () => {
    const response = await request()
      .post('/api/v1/users')
      .send({});
    console.log('Request: POST /api/v1/users');
    console.log('Response:', response.statusCode, response.body);

    expect([404, 405]).toContain(response.statusCode);
  });
});