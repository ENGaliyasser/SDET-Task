/**
 * task4_create_user.test.js
 * Automated tests for User Creation API using supertest and mock-user-auth.
 * Covers all user creation scenarios: valid/invalid body, duplicate users, missing/extra fields, invalid types.
 */

const { request } = require('../utils/api_client');
const testData = require('../testData');

describe('User Creation API', () => {
  const {
    adminKey,
    validUser,
    newUser,
    invalidUser,
    extraFields,
    missingEmail,
    missingPassword,
    emptyBody
  } = testData;

  // Prepare user data for tests
  const user1 = {
    name: validUser.username,
    email: `${validUser.username}@gmail.com`,
    password: validUser.password
  };
  const user2 = {
    name: newUser.username,
    email: `${newUser.username}@gmail.com`,
    password: newUser.password
  };
  // Use user1 as the duplicate user for duplicate test
  const duplicateUser = { ...user1 };

  beforeAll(async () => {
    // Ensure all users are deleted before testing
    await request()
      .delete('/api/v1/all-users')
      .send({ key_admin: adminKey });
  });

  afterAll(async () => {
    // Clean up all users after tests
    await request()
      .delete('/api/v1/all-users')
      .send({ key_admin: adminKey });
  });

  /**
   * 1. Should create a user successfully with valid data.
   */
  it('1. should create a user successfully (validUser)', async () => {
    console.log('Request:', user1);
    const response = await request()
      .post('/api/v1/users')
      .send(user1);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User registered with success');
    // If requirements specify a token should be returned, uncomment the next line:
    // expect(response.body).toHaveProperty('token');
  });

  /**
   * 2. Should create another user successfully with valid data.
   */
  it('2. should create another user successfully (newUser)', async () => {
    console.log('Request:', user2);
    const response = await request()
      .post('/api/v1/users')
      .send(user2);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User registered with success');
    // If requirements specify a token should be returned, uncomment the next line:
    // expect(response.body).toHaveProperty('token');
  });

  /**
   * 3. (Optional) If requirements specify a token should be returned on success, test for token property.
   */
  it('3. should return a token property on successful registration if required', async () => {
    const response = await request()
      .post('/api/v1/users')
      .send({
        name: 'Ali',
        email: 'ali@gmail.com',
        password: 'password123'
      });
    // Only check for token if API requirements specify it
    // Remove or comment this test if not required
    expect(response.statusCode).toBe(200);
    // expect(response.body).toHaveProperty('token');
  });

  /**
   * 4. Should return an error for already registered user.
   */
  it('4. should return an error for already registered user', async () => {
    console.log('Request (first create):', duplicateUser);
    await request()
      .post('/api/v1/users')
      .send(duplicateUser);

    console.log('Request (duplicate):', duplicateUser);
    const response = await request()
      .post('/api/v1/users')
      .send(duplicateUser);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'User already registered');
  });

  /**
   * 5. Should return an error for missing required field: password.
   */
  it('5. should return an error for missing required field (password)', async () => {
    const reqBody = { name: 'reda', email: 'reda@gmail.com' };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Missing required fields');
  });

  /**
   * 6. Should return an error for missing required field: name.
   */
  it('6. should return an error for missing required field (name)', async () => {
    const reqBody = { email: 'anas@gmail.com', password: 'password123' };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Missing required fields');
  });

  /**
   * 7. Should return an error for missing required field: email.
   */
  it('7. should return an error for missing required field (email)', async () => {
    const reqBody = { name: 'osama', password: 'password123' };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Missing required fields');
  });

  /**
   * 8. Should return an error for empty body.
   */
  it('8. should return an error for empty body', async () => {
    console.log('Request:', emptyBody);
    const response = await request()
      .post('/api/v1/users')
      .send(emptyBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Missing required fields');
  });

  /**
   * 9. Should create a user successfully and ignore extra fields.
   */
  it('9. should create a user successfully and ignore extra fields', async () => {
    const reqBody = {
      name: 'Ali',
      email: 'ali@gmail.com',
      password: 'password123',
      age: extraFields.age,
      address: extraFields.address
    };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'User registered with success');
    // If requirements specify a token should be returned, uncomment the next line:
    // expect(response.body).toHaveProperty('token');
  });

  /**
   * 10. Should return an error for invalid email format.
   */
  it('10. should return an error for invalid email format', async () => {
    const reqBody = { name: 'Aly', email: 'invalid-email', password: 'password123' };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid email format');
  });

  /**
   * 11. Should return an error for too short password.
   */
  it('11. should return an error for too short password', async () => {
    const reqBody = { name: 'Omar', email: 'omar@gmail.com', password: '123' };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Password must be at least 6 characters');
  });

  /**
   * 12. Should fail with non-string types for name/email/password.
   */
  it('12. should return an error for non-string types for name/email/password', async () => {
    const reqBody = { name: 123, email: 456, password: { obj: true } };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode === 400 || response.statusCode === 401).toBe(true);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 13. Should fail with whitespace-only name/email/password.
   */
  it('13. should return an error for whitespace-only name/email/password', async () => {
    const reqBody = { name: '   ', email: '   ', password: '   ' };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode === 400 || response.statusCode === 401).toBe(true);
    expect(response.body).toHaveProperty('message');
  });

  /**
   * 14. Should fail with null name/email/password.
   */
  it('14. should return an error for null name/email/password', async () => {
    const reqBody = { name: null, email: null, password: null };
    console.log('Request:', reqBody);
    const response = await request()
      .post('/api/v1/users')
      .send(reqBody);
    console.log('Response:', response.statusCode, response.body);

    expect(response.statusCode === 400 || response.statusCode === 401).toBe(true);
    expect(response.body).toHaveProperty('message');
  });
});