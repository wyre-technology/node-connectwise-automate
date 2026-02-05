/**
 * Client tests
 */

import { describe, it, expect } from 'vitest';
import { ConnectWiseAutomateClient } from '../../src/client.js';

describe('ConnectWiseAutomateClient', () => {
  const createClient = () =>
    new ConnectWiseAutomateClient({
      serverUrl: 'https://testserver.hostedrmm.com',
      clientId: 'test-client-id',
      credentials: {
        method: 'integrator',
        integratorUsername: 'test-user',
        integratorPassword: 'test-password',
      },
    });

  describe('constructor', () => {
    it('should create client with integrator credentials', () => {
      const client = createClient();

      expect(client.getConfig().serverUrl).toBe('https://testserver.hostedrmm.com');
      expect(client.getConfig().clientId).toBe('test-client-id');
    });

    it('should create client with user credentials', () => {
      const client = new ConnectWiseAutomateClient({
        serverUrl: 'https://testserver.hostedrmm.com',
        clientId: 'test-client-id',
        credentials: {
          method: 'user',
          username: 'test-user',
          password: 'test-password',
        },
      });

      expect(client.getConfig().serverUrl).toBe('https://testserver.hostedrmm.com');
    });

    it('should create client with user credentials and 2FA', () => {
      const client = new ConnectWiseAutomateClient({
        serverUrl: 'https://testserver.hostedrmm.com',
        clientId: 'test-client-id',
        credentials: {
          method: 'user',
          username: 'test-user',
          password: 'test-password',
          twoFactorCode: '123456',
        },
      });

      expect(client.getConfig().serverUrl).toBe('https://testserver.hostedrmm.com');
    });

    it('should remove trailing slash from serverUrl', () => {
      const client = new ConnectWiseAutomateClient({
        serverUrl: 'https://testserver.hostedrmm.com/',
        clientId: 'test-client-id',
        credentials: {
          method: 'integrator',
          integratorUsername: 'test-user',
          integratorPassword: 'test-password',
        },
      });

      expect(client.getConfig().serverUrl).toBe('https://testserver.hostedrmm.com');
    });

    it('should throw without serverUrl', () => {
      expect(
        () =>
          new ConnectWiseAutomateClient({
            serverUrl: '',
            clientId: 'test-client-id',
            credentials: {
              method: 'integrator',
              integratorUsername: 'test-user',
              integratorPassword: 'test-password',
            },
          })
      ).toThrow('serverUrl is required');
    });

    it('should throw without clientId', () => {
      expect(
        () =>
          new ConnectWiseAutomateClient({
            serverUrl: 'https://testserver.hostedrmm.com',
            clientId: '',
            credentials: {
              method: 'integrator',
              integratorUsername: 'test-user',
              integratorPassword: 'test-password',
            },
          })
      ).toThrow('clientId is required');
    });

    it('should throw without integrator credentials', () => {
      expect(
        () =>
          new ConnectWiseAutomateClient({
            serverUrl: 'https://testserver.hostedrmm.com',
            clientId: 'test-client-id',
            credentials: {
              method: 'integrator',
              integratorUsername: '',
              integratorPassword: 'test-password',
            },
          })
      ).toThrow('integratorUsername and integratorPassword are required');
    });

    it('should throw without user credentials', () => {
      expect(
        () =>
          new ConnectWiseAutomateClient({
            serverUrl: 'https://testserver.hostedrmm.com',
            clientId: 'test-client-id',
            credentials: {
              method: 'user',
              username: '',
              password: 'test-password',
            },
          })
      ).toThrow('username and password are required');
    });
  });

  describe('resource initialization', () => {
    it('should have all resources initialized', () => {
      const client = createClient();

      expect(client.computers).toBeDefined();
      expect(client.clients).toBeDefined();
      expect(client.locations).toBeDefined();
      expect(client.contacts).toBeDefined();
      expect(client.alerts).toBeDefined();
      expect(client.scripts).toBeDefined();
      expect(client.patches).toBeDefined();
      expect(client.groups).toBeDefined();
    });
  });

  describe('getRateLimitStatus', () => {
    it('should return rate limit status', () => {
      const client = createClient();
      const status = client.getRateLimitStatus();

      expect(status.remaining).toBe(100);
      expect(status.rate).toBe(0);
    });
  });

  describe('invalidateToken', () => {
    it('should not throw', () => {
      const client = createClient();

      expect(() => client.invalidateToken()).not.toThrow();
    });
  });
});
