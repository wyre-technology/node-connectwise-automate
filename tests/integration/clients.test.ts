/**
 * Clients integration tests
 */

import { describe, it, expect } from 'vitest';
import { ConnectWiseAutomateClient } from '../../src/client.js';

describe('Clients Resource', () => {
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

  describe('list', () => {
    it('should list clients', async () => {
      const client = createClient();
      const response = await client.clients.list();

      expect(response.TotalRecords).toBe(2);
      expect(response.Data).toHaveLength(2);
      expect(response.Data[0]?.Name).toBe('Acme Corporation');
    });
  });

  describe('get', () => {
    it('should get a single client', async () => {
      const client = createClient();
      const result = await client.clients.get(100);

      expect(result.Id).toBe(100);
      expect(result.Name).toBe('Acme Corporation');
      expect(result.City).toBe('New York');
      expect(result.ComputerCount).toBe(25);
    });
  });

  describe('create', () => {
    it('should create a client', async () => {
      const client = createClient();
      const result = await client.clients.create({
        Name: 'New Customer Corp',
        Address1: '789 Business Park',
        City: 'Chicago',
        State: 'IL',
        ZipCode: '60601',
        Country: 'USA',
      });

      expect(result.Id).toBe(102);
      expect(result.Name).toBe('New Customer Corp');
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      const client = createClient();
      const result = await client.clients.update(100, {
        Name: 'Acme Corporation Updated',
        Comment: 'Updated company info',
      });

      expect(result.Name).toBe('Acme Corporation Updated');
      expect(result.Comment).toBe('Updated company info');
    });
  });

  describe('delete', () => {
    it('should delete a client', async () => {
      const client = createClient();

      await expect(client.clients.delete(100)).resolves.toBeUndefined();
    });
  });
});

describe('Locations Resource', () => {
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

  describe('list', () => {
    it('should list locations', async () => {
      const client = createClient();
      const response = await client.locations.list();

      expect(response.TotalRecords).toBe(2);
      expect(response.Data).toHaveLength(2);
      expect(response.Data[0]?.Name).toBe('Headquarters');
    });
  });

  describe('get', () => {
    it('should get a single location', async () => {
      const client = createClient();
      const location = await client.locations.get(1);

      expect(location.Id).toBe(1);
      expect(location.Name).toBe('Headquarters');
      expect(location.ClientId).toBe(100);
      expect(location.IsDefault).toBe(true);
    });
  });
});
