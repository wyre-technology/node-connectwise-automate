/**
 * Rate limiter tests
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RateLimiter } from '../../src/rate-limiter.js';
import { DEFAULT_RATE_LIMIT_CONFIG } from '../../src/config.js';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter(DEFAULT_RATE_LIMIT_CONFIG);
    vi.useFakeTimers();
  });

  describe('recordRequest', () => {
    it('should record requests', () => {
      rateLimiter.recordRequest();
      expect(rateLimiter.getRemainingRequests()).toBe(99);
    });

    it('should not record requests when disabled', () => {
      const disabledLimiter = new RateLimiter({
        ...DEFAULT_RATE_LIMIT_CONFIG,
        enabled: false,
      });

      disabledLimiter.recordRequest();
      expect(disabledLimiter.getRemainingRequests()).toBe(100);
    });
  });

  describe('getRemainingRequests', () => {
    it('should return max requests when no requests made', () => {
      expect(rateLimiter.getRemainingRequests()).toBe(100);
    });

    it('should decrease as requests are made', () => {
      rateLimiter.recordRequest();
      rateLimiter.recordRequest();
      rateLimiter.recordRequest();
      expect(rateLimiter.getRemainingRequests()).toBe(97);
    });

    it('should reset after window expires', () => {
      rateLimiter.recordRequest();
      rateLimiter.recordRequest();
      expect(rateLimiter.getRemainingRequests()).toBe(98);

      // Advance past the window
      vi.advanceTimersByTime(DEFAULT_RATE_LIMIT_CONFIG.windowMs + 1000);

      expect(rateLimiter.getRemainingRequests()).toBe(100);
    });
  });

  describe('getCurrentRate', () => {
    it('should return 0 when no requests made', () => {
      expect(rateLimiter.getCurrentRate()).toBe(0);
    });

    it('should return correct rate', () => {
      for (let i = 0; i < 50; i++) {
        rateLimiter.recordRequest();
      }
      expect(rateLimiter.getCurrentRate()).toBe(0.5);
    });
  });

  describe('shouldRetry', () => {
    it('should return true when under max retries', () => {
      expect(rateLimiter.shouldRetry(0)).toBe(true);
      expect(rateLimiter.shouldRetry(1)).toBe(true);
      expect(rateLimiter.shouldRetry(2)).toBe(true);
    });

    it('should return false when at or over max retries', () => {
      expect(rateLimiter.shouldRetry(3)).toBe(false);
      expect(rateLimiter.shouldRetry(4)).toBe(false);
    });
  });

  describe('calculateRetryDelay', () => {
    it('should calculate exponential backoff', () => {
      expect(rateLimiter.calculateRetryDelay(0)).toBe(5000);
      expect(rateLimiter.calculateRetryDelay(1)).toBe(10000);
      expect(rateLimiter.calculateRetryDelay(2)).toBe(20000);
    });

    it('should cap at 30 seconds', () => {
      expect(rateLimiter.calculateRetryDelay(10)).toBe(30000);
    });
  });

  describe('parseRetryAfter', () => {
    it('should return default when null', () => {
      expect(rateLimiter.parseRetryAfter(null)).toBe(5000);
    });

    it('should parse seconds', () => {
      expect(rateLimiter.parseRetryAfter('60')).toBe(60000);
    });

    it('should parse HTTP date', () => {
      const futureDate = new Date(Date.now() + 30000);
      const result = rateLimiter.parseRetryAfter(futureDate.toUTCString());
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(30000);
    });

    it('should return default for invalid values', () => {
      expect(rateLimiter.parseRetryAfter('invalid')).toBe(5000);
    });
  });

  describe('waitForSlot', () => {
    it('should return immediately when disabled', async () => {
      const disabledLimiter = new RateLimiter({
        ...DEFAULT_RATE_LIMIT_CONFIG,
        enabled: false,
      });

      const start = Date.now();
      await disabledLimiter.waitForSlot();
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(100);
    });

    it('should return immediately when under threshold', async () => {
      const start = Date.now();
      await rateLimiter.waitForSlot();
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(100);
    });
  });
});
