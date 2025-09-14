/**
 * task4_authenticate_user.test.js
 * Automated tests for User Authentication API using supertest and mock-user-auth.
 * Covers all authentication scenarios: valid/invalid credentials, missing/extra fields, invalid types, and method validation.
 */

const { request } = require('../utils/api_client');
const testData = require('../test_data');

describe('User Authentication API', () => {
  const {
    validUser,
    invalidUser,
    adminKey,
    extraFields,
    missingEmail,
    missingPassword,
    emptyBody
  } = testData;

  // Use these for user creation and login (email is username + '@gmail.com')
  const userName = validUser.username;
  const userEmail = `${validUser.username}@gmail.com`;
  const userPassword = validUser.password;

  beforeAll(async () => {
    // Create a user for authentication tests
    await request()
      .post('/api/v1/users')
      .send({
        name: userName,
        email: userEmail,
        password: userPassword
      });
  });

  afterAll(async () => {
    // Clean up all users after tests
    await request()
      .delete('/api/v1/all-users')
      .send({ key_admin: adminKey });
  });

  /**
   * 1. Valid authentication should return a token.
   */
  it('1. should authenticate with valid credentials and return a token', async () => {
    console.log('Request:', { email: userEmail, password: userPassword });
    const res = await request()
      .post('/api/v1/auth')
      .send({ email: userEmail, password: userPassword });
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  /**
   * 2. Invalid email should return 401 Unauthorized.
   */
  it('2. should fail authentication with invalid email', async () => {
    const reqBody = { email: `${invalidUser.username}@gmail.com`, password: userPassword };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Incorrect email or password');
  });

  /**
   * 3. Invalid password should return 401 Unauthorized.
   */
  it('3. should fail authentication with invalid password', async () => {
    const reqBody = { email: userEmail, password: invalidUser.password };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Incorrect email or password');
  });

  /**
   * 4. Missing email should return 400 Bad Request.
   */
  it('4. should fail authentication with missing email', async () => {
    const reqBody = { password: userPassword };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Missing required fields');
  });

  /**
   * 5. Missing password should return 400 Bad Request.
   */
  it('5. should fail authentication with missing password', async () => {
    const reqBody = { email: userEmail };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Missing required fields');
  });

  /**
   * 6. Empty body should return 400 Bad Request.
   */
  it('6. should fail authentication with empty body', async () => {
    const reqBody = emptyBody;
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Missing required fields');
  });

  /**
   * 7. Extra fields in body should be ignored and authentication should succeed.
   */
  it('7. should authenticate and ignore extra fields', async () => {
    const reqBody = {
      email: userEmail,
      password: userPassword,
      age: extraFields.age,
      address: extraFields.address
    };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  /**
   * 8. Invalid HTTP method (GET) should return 404 or 405.
   */
  it('8. should fail authentication with invalid HTTP method', async () => {
    console.log('Request: GET /api/v1/auth');
    const res = await request()
      .get('/api/v1/auth')
      .send();
    console.log('Response:', res.statusCode, res.body);

    expect([404, 405]).toContain(res.statusCode);
  });

  /**
   * 9. Should fail with wrong data types for email and password.
   */
  it('9. should fail authentication with non-string email and password', async () => {
    const reqBody = { email: 12345, password: { obj: true } };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode === 400 || res.statusCode === 401).toBe(true);
    expect(res.body).toHaveProperty('message');
  });

  /**
   * 10. Should fail with whitespace-only email and password.
   */
  it('10. should fail authentication with whitespace-only email and password', async () => {
    const reqBody = { email: '   ', password: '   ' };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  /**
   * 11. Should fail with null email and password.
   */
  it('11. should fail authentication with null email and password', async () => {
    const reqBody = { email: null, password: null };
    console.log('Request:', reqBody);
    const res = await request()
      .post('/api/v1/auth')
      .send(reqBody);
    console.log('Response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});