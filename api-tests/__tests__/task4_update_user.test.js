/**
 * task4_update_user.test.js
 * Automated tests for User Update API using supertest and mock-user-auth.
 * Covers valid/invalid authorization, partial/full update, missing/invalid fields, and invalid types.
 */

const { request } = require('../utils/api_client');
const { getValidToken, getInvalidToken } = require('../utils/helpers');
const testData = require('../testData');

describe('User Update API', () => {
  const { updateUser1, updateUser2 } = testData;

  let validToken1;
  let validToken2;

  beforeAll(async () => {
    // Create users for update tests
    await request().post('/api/v1/users').send(updateUser1);
    await request().post('/api/v1/users').send(updateUser2);
    // Authenticate to get valid tokens
    validToken1 = await getValidToken(request(), updateUser1.email, updateUser1.password);
    validToken2 = await getValidToken(request(), updateUser2.email, updateUser2.password);
  });

  afterAll(async () => {
    // Clean up all users after tests
    await request()
      .delete('/api/v1/all-users')
      .send({ key_admin: testData.adminKey });
  });

  /**
   * 1. Should update user details with a valid token.
   */
  it('1. should update user details with a valid token', async () => {
    const response = await request()
      .patch('/api/v1/users')
      .set('Authorization', validToken1)
      .send({
        name: 'mock Updated',
        email: 'mock_updated@gmail.com',
        password: 'newpassword123'
      });
    console.log('Request:', { name: 'mock Updated', email: 'mock_updated@gmail.com', password: 'newpassword123' });
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated with success!');
  });

  /**
   * 2. Should handle partial updates successfully (update only email).
   */
  it('2. should handle partial updates successfully (update only email)', async () => {
    const response = await request()
      .patch('/api/v1/users')
      .set('Authorization', validToken2)
      .send({
        email: 'mock_partial_update@gmail.com'
      });
    console.log('Request:', { email: 'mock_partial_update@gmail.com' });
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated with success!');
  });

  /**
   * 3. Should return unauthorized for an invalid token.
   */
  it('3. should return unauthorized for an invalid token', async () => {
    const invalidToken = getInvalidToken();
    const response = await request()
      .patch('/api/v1/users')
      .set('Authorization', invalidToken)
      .send({
        name: 'Attempted Update',
        email: 'invalid_update@gmail.com'
      });
    console.log('Request:', { name: 'Attempted Update', email: 'invalid_update@gmail.com' });
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 4. Should return unauthorized for missing token.
   */
  it('4. should return unauthorized for missing token', async () => {
    const response = await request()
      .patch('/api/v1/users')
      .send({
        name: 'No Auth Update',
        email: 'no_auth_update@gmail.com'
      });
    console.log('Request:', { name: 'No Auth Update', email: 'no_auth_update@gmail.com' });
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 5. Should fail with empty body.
   */
  it('5. should return error for empty body on update', async () => {
    const response = await request()
      .patch('/api/v1/users')
      .set('Authorization', validToken1)
      .send({});
    console.log('Request: {}');
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode === 400 || response.statusCode === 401).toBe(true);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 6. Should fail with invalid types for fields.
   */
  it('6. should return error for invalid types in update', async () => {
    const reqBody = { name: 123, email: 456, password: { obj: true } };
    const response = await request()
      .patch('/api/v1/users')
      .set('Authorization', validToken1)
      .send(reqBody);
    console.log('Request:', reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode === 400 || response.statusCode === 401).toBe(true);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 7. Should fail with null fields in update.
   */
  it('7. should return error for null fields in update', async () => {
    const reqBody = { name: null, email: null, password: null };
    const response = await request()
      .patch('/api/v1/users')
      .set('Authorization', validToken1)
      .send(reqBody);
    console.log('Request:', reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode === 400 || response.statusCode === 401).toBe(true);
    expect(response.body).toHaveProperty('message');
  });
});