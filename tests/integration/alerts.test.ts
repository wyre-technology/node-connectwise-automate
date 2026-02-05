/**
 * Alerts integration tests
 */

import { describe, it, expect } from 'vitest';
import { ConnectWiseAutomateClient } from '../../src/client.js';

describe('Alerts Resource', () => {
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
    it('should list alerts', async () => {
      const client = createClient();
      const response = await client.alerts.list();

      expect(response.TotalRecords).toBe(3);
      expect(response.Data).toHaveLength(3);
      expect(response.Data[0]?.Name).toBe('High CPU Usage');
    });
  });

  describe('get', () => {
    it('should get a single alert', async () => {
      const client = createClient();
      const alert = await client.alerts.get(1);

      expect(alert.Id).toBe(1);
      expect(alert.Name).toBe('High CPU Usage');
      expect(alert.Severity).toBe(3);
      expect(alert.Status).toBe('New');
    });
  });

  describe('acknowledge', () => {
    it('should acknowledge alerts', async () => {
      const client = createClient();
      const result = await client.alerts.acknowledge({
        AlertIds: [1],
        Notes: 'Acknowledged via API',
      });

      expect(result.Count).toBe(1);
      expect(result.AcknowledgedAlertIds).toContain(1);
    });
  });

  describe('close', () => {
    it('should close alerts', async () => {
      const client = createClient();
      const result = await client.alerts.close({
        AlertIds: [1],
        Notes: 'Closed via API',
      });

      expect(result.Count).toBe(1);
      expect(result.AcknowledgedAlertIds).toContain(1);
    });
  });

  describe('statistics', () => {
    it('should get alert statistics', async () => {
      const client = createClient();
      const stats = await client.alerts.statistics();

      expect(stats.Total).toBe(50);
      expect(stats.New).toBe(10);
      expect(stats.Acknowledged).toBe(30);
      expect(stats.Closed).toBe(10);
      expect(stats.BySeverity).toBeDefined();
    });
  });
});
