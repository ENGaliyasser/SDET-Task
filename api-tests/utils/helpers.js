// utils/helpers.js
module.exports = {
    // Generates a valid token for authorized requests, taking user credentials as parameters
    getValidToken: async (apiClient, userEmail, userPassword) => {
        const response = await apiClient
            .post('/api/v1/auth')
            .send({ email: userEmail, password: userPassword });

        return response.body.token;  // Return the token for the authenticated user
    },

    // Returns an invalid token for testing unauthorized access
    getInvalidToken: () => 'invalid-token',
};