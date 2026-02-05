/**
 * Auth fixtures
 */

// Token expires in 100 hours from "now" (for testing)
const expirationDate = new Date(Date.now() + 360000000).toISOString();

export const tokenSuccess = {
  AccessToken: 'mock-jwt-token-for-testing',
  TokenType: 'Bearer',
  ExpirationDate: expirationDate,
};

export const tokenFailure = {
  Message: 'Invalid credentials',
};
