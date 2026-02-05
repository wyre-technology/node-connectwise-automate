/**
 * Computers integration tests
 */

import { describe, it, expect } from 'vitest';
import { ConnectWiseAutomateClient } from '../../src/client.js';
import { ConnectWiseAutomateNotFoundError } from '../../src/errors.js';

describe('Computers Resource', () => {
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
    it('should list computers', async () => {
      const client = createClient();
      const response = await client.computers.list();

      expect(response.TotalRecords).toBe(3);
      expect(response.Data).toHaveLength(2);
      expect(response.Data[0]?.ComputerName).toBe('WORKSTATION-001');
    });

    it('should support pagination', async () => {
      const client = createClient();
      const page1 = await client.computers.list({ page: 1 });
      const page2 = await client.computers.list({ page: 2 });

      expect(page1.Data).toHaveLength(2);
      expect(page2.Data).toHaveLength(1);
      expect(page2.Data[0]?.ComputerName).toBe('LAPTOP-001');
    });
  });

  describe('listAll', () => {
    it('should iterate all computers from first page', async () => {
      const client = createClient();
      const computers = await client.computers.listAll().toArray();

      // The mock returns 2 items on page 1, which is less than pageSize (100),
      // so pagination stops after first page
      expect(computers).toHaveLength(2);
      expect(computers[0]?.ComputerName).toBe('WORKSTATION-001');
      expect(computers[1]?.ComputerName).toBe('SERVER-001');
    });
  });

  describe('get', () => {
    it('should get a single computer', async () => {
      const client = createClient();
      const computer = await client.computers.get(1);

      expect(computer.Id).toBe(1);
      expect(computer.ComputerName).toBe('WORKSTATION-001');
      expect(computer.OS).toBe('Windows 11 Pro');
      expect(computer.SerialNumber).toBe('ABC123456');
    });

    it('should throw NotFoundError for non-existent computer', async () => {
      const client = createClient();

      await expect(client.computers.get(999)).rejects.toThrow(ConnectWiseAutomateNotFoundError);
    });
  });

  describe('create', () => {
    it('should create a computer', async () => {
      const client = createClient();
      const computer = await client.computers.create({
        ComputerName: 'NEW-WORKSTATION',
        ClientId: 100,
        LocationId: 1,
      });

      expect(computer.Id).toBe(10);
      expect(computer.ComputerName).toBe('NEW-WORKSTATION');
    });
  });

  describe('update', () => {
    it('should update a computer', async () => {
      const client = createClient();
      const computer = await client.computers.update(1, {
        ComputerName: 'WORKSTATION-001-RENAMED',
        Comment: 'Updated comment',
      });

      expect(computer.ComputerName).toBe('WORKSTATION-001-RENAMED');
      expect(computer.Comment).toBe('Updated comment');
    });
  });

  describe('delete', () => {
    it('should delete a computer', async () => {
      const client = createClient();

      await expect(client.computers.delete(1)).resolves.toBeUndefined();
    });
  });

  describe('executeCommand', () => {
    it('should execute a command on a computer', async () => {
      const client = createClient();
      const result = await client.computers.executeCommand(1, {
        Command: 'ipconfig /all',
        RunAsAdmin: true,
      });

      expect(result.Success).toBe(true);
      expect(result.ExitCode).toBe(0);
      expect(result.Output).toBe('Command executed successfully');
    });
  });

  describe('restart', () => {
    it('should restart a computer', async () => {
      const client = createClient();

      await expect(client.computers.restart(1)).resolves.toBeUndefined();
    });

    it('should restart with options', async () => {
      const client = createClient();

      await expect(client.computers.restart(1, true, 5)).resolves.toBeUndefined();
    });
  });

  describe('shutdown', () => {
    it('should shutdown a computer', async () => {
      const client = createClient();

      await expect(client.computers.shutdown(1)).resolves.toBeUndefined();
    });
  });

  describe('wakeUp', () => {
    it('should wake up a computer', async () => {
      const client = createClient();

      await expect(client.computers.wakeUp(1)).resolves.toBeUndefined();
    });
  });
});
