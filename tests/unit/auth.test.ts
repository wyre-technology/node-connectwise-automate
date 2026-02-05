/**
 * Auth manager tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { AuthManager } from '../../src/auth.js';
import { resolveConfig } from '../../src/config.js';
import { ConnectWiseAutomateAuthenticationError } from '../../src/errors.js';

describe('AuthManager', () => {
  const createAuthManager = (overrides: Partial<{ integratorUsername: string; integratorPassword: string }> = {}) => {
    const config = resolveConfig({
      serverUrl: 'https://testserver.hostedrmm.com',
      clientId: 'test-client-id',
      credentials: {
        method: 'integrator',
        integratorUsername: overrides.integratorUsername ?? 'test-user',
        integratorPassword: overrides.integratorPassword ?? 'test-password',
      },
    });
    return new AuthManager(config);
  };

  describe('getToken', () => {
    it('should acquire a new token', async () => {
      const authManager = createAuthManager();
      const token = await authManager.getToken();

      expect(token).toBe('mock-jwt-token-for-testing');
    });

    it('should return cached token on subsequent calls', async () => {
      const authManager = createAuthManager();

      const token1 = await authManager.getToken();
      const token2 = await authManager.getToken();

      expect(token1).toBe(token2);
    });

    it('should throw on bad credentials', async () => {
      const authManager = createAuthManager({
        integratorUsername: 'bad-user',
        integratorPassword: 'bad-password',
      });

      await expect(authManager.getToken()).rejects.toThrow(ConnectWiseAutomateAuthenticationError);
    });
  });

  describe('refreshToken', () => {
    let authManager: AuthManager;

    beforeEach(() => {
      authManager = createAuthManager();
    });

    it('should acquire a new token', async () => {
      // First get a token
      await authManager.getToken();

      // Then refresh
      const token = await authManager.refreshToken();

      expect(token).toBe('mock-jwt-token-for-testing');
    });
  });

  describe('invalidateToken', () => {
    it('should clear the cached token', async () => {
      const authManager = createAuthManager();

      // First get a token
      await authManager.getToken();
      expect(authManager.hasValidToken()).toBe(true);

      // Invalidate
      authManager.invalidateToken();
      expect(authManager.hasValidToken()).toBe(false);
    });
  });

  describe('hasValidToken', () => {
    it('should return false when no token', () => {
      const authManager = createAuthManager();
      expect(authManager.hasValidToken()).toBe(false);
    });

    it('should return true after acquiring token', async () => {
      const authManager = createAuthManager();
      await authManager.getToken();
      expect(authManager.hasValidToken()).toBe(true);
    });
  });
});
