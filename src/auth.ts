/**
 * Authentication management for ConnectWise Automate API
 *
 * ConnectWise Automate supports two authentication methods:
 * 1. Integrator authentication (username/password)
 * 2. User authentication (username/password with optional 2FA)
 *
 * Both methods return a JWT token that must be included in subsequent requests.
 */

import type { ResolvedConfig } from './config.js';
import { ConnectWiseAutomateAuthenticationError } from './errors.js';

/**
 * Token information
 */
export interface TokenInfo {
  /** Access token (JWT) */
  accessToken: string;
  /** Token type (usually 'Bearer') */
  tokenType: string;
  /** Unix timestamp (milliseconds) when the token expires */
  expiresAt: number;
}

/**
 * Authentication response from the API
 */
interface AuthTokenResponse {
  AccessToken: string;
  TokenType: string;
  ExpirationDate: string;
}

/**
 * Buffer time before expiry to trigger refresh (2 minutes in milliseconds)
 */
const EXPIRY_BUFFER_MS = 2 * 60 * 1000;

/**
 * Manages authentication token lifecycle for the ConnectWise Automate API
 */
export class AuthManager {
  private readonly config: ResolvedConfig;
  private token: TokenInfo | null = null;
  private refreshPromise: Promise<TokenInfo> | null = null;

  constructor(config: ResolvedConfig) {
    this.config = config;
  }

  /**
   * Get a valid access token, acquiring or refreshing as needed
   */
  async getToken(): Promise<string> {
    // If we have a valid token that's not near expiry, return it
    if (this.token && !this.isTokenNearExpiry(this.token)) {
      return this.token.accessToken;
    }

    // If a refresh is already in progress, wait for it
    if (this.refreshPromise) {
      const token = await this.refreshPromise;
      return token.accessToken;
    }

    // Acquire a new token
    const token = await this.acquireToken();
    return token.accessToken;
  }

  /**
   * Force a token refresh (e.g., after a 401 response)
   */
  async refreshToken(): Promise<string> {
    // Clear the current token
    this.token = null;

    // If a refresh is already in progress, wait for it
    if (this.refreshPromise) {
      const token = await this.refreshPromise;
      return token.accessToken;
    }

    // Acquire a new token
    const token = await this.acquireToken();
    return token.accessToken;
  }

  /**
   * Invalidate the current token
   */
  invalidateToken(): void {
    this.token = null;
  }

  /**
   * Check if the token is valid and not near expiry
   */
  hasValidToken(): boolean {
    return this.token !== null && !this.isTokenNearExpiry(this.token);
  }

  /**
   * Acquire a new token from the API
   */
  private async acquireToken(): Promise<TokenInfo> {
    // Set up the promise to prevent concurrent requests
    this.refreshPromise = this.doAcquireToken();

    try {
      const token = await this.refreshPromise;
      this.token = token;
      return token;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Perform the actual token acquisition
   */
  private async doAcquireToken(): Promise<TokenInfo> {
    const tokenUrl = `${this.config.serverUrl}/cwa/api/v1/apitoken`;

    // Build the request body based on auth method
    const body = this.buildAuthBody();

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ClientId': this.config.clientId,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new ConnectWiseAutomateAuthenticationError(
          `Failed to acquire token: ${response.status} ${response.statusText}`,
          response.status,
          errorBody
        );
      }

      const data = (await response.json()) as AuthTokenResponse;

      // Parse expiration date
      const expiresAt = new Date(data.ExpirationDate).getTime();

      return {
        accessToken: data.AccessToken,
        tokenType: data.TokenType || 'Bearer',
        expiresAt,
      };
    } catch (error) {
      if (error instanceof ConnectWiseAutomateAuthenticationError) {
        throw error;
      }
      throw new ConnectWiseAutomateAuthenticationError(
        `Failed to acquire token: ${error instanceof Error ? error.message : 'Unknown error'}`,
        0,
        error
      );
    }
  }

  /**
   * Build the authentication request body based on credentials method
   */
  private buildAuthBody(): Record<string, string> {
    if (this.config.credentials.method === 'integrator') {
      return {
        UserName: this.config.credentials.integratorUsername,
        Password: this.config.credentials.integratorPassword,
      };
    } else {
      const body: Record<string, string> = {
        UserName: this.config.credentials.username,
        Password: this.config.credentials.password,
      };

      if (this.config.credentials.twoFactorCode) {
        body['TwoFactorPasscode'] = this.config.credentials.twoFactorCode;
      }

      return body;
    }
  }

  /**
   * Check if a token is within the expiry buffer
   */
  private isTokenNearExpiry(token: TokenInfo): boolean {
    return Date.now() >= token.expiresAt - EXPIRY_BUFFER_MS;
  }
}
