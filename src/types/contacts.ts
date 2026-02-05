/**
 * Contact types for ConnectWise Automate
 */

import type { BaseEntity, BaseListParams } from './common.js';

/**
 * Contact entity
 */
export interface Contact extends BaseEntity {
  /** First name */
  FirstName: string;
  /** Last name */
  LastName: string;
  /** Full name */
  FullName?: string;
  /** Client ID */
  ClientId: number;
  /** Location ID */
  LocationId?: number;
  /** Email address */
  Email?: string;
  /** Phone number */
  Phone?: string;
  /** Mobile phone */
  MobilePhone?: string;
  /** Fax number */
  Fax?: string;
  /** Title/position */
  Title?: string;
  /** Address */
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  /** Is primary contact */
  IsPrimary?: boolean;
  /** External ID */
  ExternalId?: string;
  /** Comments */
  Comment?: string;
  /** Date added */
  DateAdded?: string;
}

/**
 * Contact list parameters
 */
export interface ContactListParams extends BaseListParams {
  /** Filter by client ID */
  clientId?: number;
  /** Filter by location ID */
  locationId?: number;
  /** Search by email */
  email?: string;
}

/**
 * Contact list response
 */
export interface ContactListResponse {
  TotalRecords?: number;
  Data: Contact[];
}

/**
 * Contact creation data
 */
export interface ContactCreateData {
  FirstName: string;
  LastName: string;
  ClientId: number;
  LocationId?: number;
  Email?: string;
  Phone?: string;
  MobilePhone?: string;
  Fax?: string;
  Title?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  IsPrimary?: boolean;
  ExternalId?: string;
  Comment?: string;
}

/**
 * Contact update data
 */
export interface ContactUpdateData {
  FirstName?: string;
  LastName?: string;
  LocationId?: number;
  Email?: string;
  Phone?: string;
  MobilePhone?: string;
  Fax?: string;
  Title?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Country?: string;
  IsPrimary?: boolean;
  ExternalId?: string;
  Comment?: string;
}
