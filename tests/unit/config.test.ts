/**
 * Config tests
 */

import { describe, it, expect } from 'vitest';
import { resolveConfig, DEFAULT_RATE_LIMIT_CONFIG } from '../../src/config.js';

describe('resolveConfig', () => {
  describe('serverUrl handling', () => {
    it('should accept a valid serverUrl', () => {
      const config = resolveConfig({
        serverUrl: 'https://server.hostedrmm.com',
        clientId: 'test-id',
        credentials: {
          method: 'integrator',
          integratorUsername: 'user',
          integratorPassword: 'pass',
        },
      });

      expect(config.serverUrl).toBe('https://server.hostedrmm.com');
    });

    it('should remove trailing slash from serverUrl', () => {
      const config = resolveConfig({
        serverUrl: 'https://server.hostedrmm.com/',
        clientId: 'test-id',
        credentials: {
          method: 'integrator',
          integratorUsername: 'user',
          integratorPassword: 'pass',
        },
      });

      expect(config.serverUrl).toBe('https://server.hostedrmm.com');
    });

    it('should throw without serverUrl', () => {
      expect(() =>
        resolveConfig({
          serverUrl: '',
          clientId: 'test-id',
          credentials: {
            method: 'integrator',
            integratorUsername: 'user',
            integratorPassword: 'pass',
          },
        })
      ).toThrow('serverUrl is required');
    });
  });

  describe('clientId handling', () => {
    it('should require clientId', () => {
      expect(() =>
        resolveConfig({
          serverUrl: 'https://server.hostedrmm.com',
          clientId: '',
          credentials: {
            method: 'integrator',
            integratorUsername: 'user',
            integratorPassword: 'pass',
          },
        })
      ).toThrow('clientId is required');
    });
  });

  describe('credentials handling', () => {
    it('should validate integrator credentials', () => {
      expect(() =>
        resolveConfig({
          serverUrl: 'https://server.hostedrmm.com',
          clientId: 'test-id',
          credentials: {
            method: 'integrator',
            integratorUsername: '',
            integratorPassword: 'pass',
          },
        })
      ).toThrow('integratorUsername and integratorPassword are required');
    });

    it('should validate user credentials', () => {
      expect(() =>
        resolveConfig({
          serverUrl: 'https://server.hostedrmm.com',
          clientId: 'test-id',
          credentials: {
            method: 'user',
            username: 'user',
            password: '',
          },
        })
      ).toThrow('username and password are required');
    });
  });

  describe('rate limit configuration', () => {
    it('should use default rate limit config', () => {
      const config = resolveConfig({
        serverUrl: 'https://server.hostedrmm.com',
        clientId: 'test-id',
        credentials: {
          method: 'integrator',
          integratorUsername: 'user',
          integratorPassword: 'pass',
        },
      });

      expect(config.rateLimit).toEqual(DEFAULT_RATE_LIMIT_CONFIG);
    });

    it('should merge custom rate limit config', () => {
      const config = resolveConfig({
        serverUrl: 'https://server.hostedrmm.com',
        clientId: 'test-id',
        credentials: {
          method: 'integrator',
          integratorUsername: 'user',
          integratorPassword: 'pass',
        },
        rateLimit: {
          maxRequests: 50,
          windowMs: 30000,
        },
      });

      expect(config.rateLimit.maxRequests).toBe(50);
      expect(config.rateLimit.windowMs).toBe(30000);
      expect(config.rateLimit.enabled).toBe(DEFAULT_RATE_LIMIT_CONFIG.enabled);
      expect(config.rateLimit.throttleThreshold).toBe(DEFAULT_RATE_LIMIT_CONFIG.throttleThreshold);
    });
  });
});
