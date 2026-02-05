/**
 * Client types for ConnectWise Automate
 */

import type { BaseEntity, BaseListParams, LocationInfo } from './common.js';

/**
 * Client entity (company/organization)
 */
export interface Client extends BaseEntity {
  /** Client name */
  Name: string;
  /** Company address */
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  /** Phone number */
  Phone?: string;
  /** Fax number */
  Fax?: string;
  /** Website URL */
  Website?: string;
  /** Date client was added */
  DateAdded?: string;
  /** External ID (for integration) */
  ExternalId?: string;
  /** Comments/notes */
  Comment?: string;
  /** Is active */
  IsActive?: boolean;
  /** Contact count */
  ContactCount?: number;
  /** Computer count */
  ComputerCount?: number;
  /** Locations for this client */
  Locations?: LocationInfo[];
}

/**
 * Client list parameters
 */
export interface ClientListParams extends BaseListParams {
  /** Include inactive clients */
  includeInactive?: boolean;
  /** Search by name */
  name?: string;
}

/**
 * Client list response
 */
export interface ClientListResponse {
  TotalRecords?: number;
  Data: Client[];
}

/**
 * Client creation data
 */
export interface ClientCreateData {
  Name: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  Phone?: string;
  Fax?: string;
  Website?: string;
  ExternalId?: string;
  Comment?: string;
}

/**
 * Client update data
 */
export interface ClientUpdateData {
  Name?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  Phone?: string;
  Fax?: string;
  Website?: string;
  ExternalId?: string;
  Comment?: string;
  IsActive?: boolean;
}

/**
 * Location entity
 */
export interface Location extends BaseEntity {
  /** Location name */
  Name: string;
  /** Client ID */
  ClientId: number;
  /** Address */
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  /** Phone number */
  Phone?: string;
  /** Fax number */
  Fax?: string;
  /** Is default location */
  IsDefault?: boolean;
  /** Date added */
  DateAdded?: string;
  /** Comments */
  Comment?: string;
  /** Computer count */
  ComputerCount?: number;
}

/**
 * Location list parameters
 */
export interface LocationListParams extends BaseListParams {
  /** Filter by client ID */
  clientId?: number;
}

/**
 * Location list response
 */
export interface LocationListResponse {
  TotalRecords?: number;
  Data: Location[];
}

/**
 * Location creation data
 */
export interface LocationCreateData {
  Name: string;
  ClientId: number;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  Phone?: string;
  Fax?: string;
  Comment?: string;
  IsDefault?: boolean;
}

/**
 * Location update data
 */
export interface LocationUpdateData {
  Name?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  Phone?: string;
  Fax?: string;
  Comment?: string;
  IsDefault?: boolean;
}
