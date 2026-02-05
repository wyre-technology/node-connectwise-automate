/**
 * Alert types for ConnectWise Automate
 */

import type { BaseEntity, BaseListParams } from './common.js';

/**
 * Alert entity
 */
export interface Alert extends BaseEntity {
  /** Alert name/subject */
  Name: string;
  /** Alert message/description */
  Message?: string;
  /** Computer ID */
  ComputerId?: number;
  /** Computer name */
  ComputerName?: string;
  /** Client ID */
  ClientId?: number;
  /** Client name */
  ClientName?: string;
  /** Location ID */
  LocationId?: number;
  /** Location name */
  LocationName?: string;
  /** Alert severity (1-5) */
  Severity?: number;
  /** Alert category/type */
  AlertType?: string;
  /** Alert source */
  Source?: string;
  /** Alert status */
  Status?: 'New' | 'Acknowledged' | 'Closed';
  /** Is acknowledged */
  IsAcknowledged?: boolean;
  /** Acknowledged by user */
  AcknowledgedBy?: string;
  /** Acknowledged date */
  AcknowledgedDate?: string;
  /** Date created */
  DateCreated?: string;
  /** Last update date */
  DateModified?: string;
  /** Ticket ID if linked */
  TicketId?: number;
}

/**
 * Alert list parameters
 */
export interface AlertListParams extends BaseListParams {
  /** Filter by computer ID */
  computerId?: number;
  /** Filter by client ID */
  clientId?: number;
  /** Filter by location ID */
  locationId?: number;
  /** Filter by severity */
  severity?: number;
  /** Filter by status */
  status?: 'New' | 'Acknowledged' | 'Closed';
  /** Filter by acknowledged state */
  isAcknowledged?: boolean;
  /** Filter by date range start */
  startDate?: string;
  /** Filter by date range end */
  endDate?: string;
}

/**
 * Alert list response
 */
export interface AlertListResponse {
  TotalRecords?: number;
  Data: Alert[];
}

/**
 * Alert acknowledge data
 */
export interface AlertAcknowledgeData {
  /** Alert IDs to acknowledge */
  AlertIds: number[];
  /** Acknowledgment notes */
  Notes?: string;
}

/**
 * Alert acknowledge result
 */
export interface AlertAcknowledgeResult {
  /** Number of alerts acknowledged */
  Count: number;
  /** Successfully acknowledged alert IDs */
  AcknowledgedAlertIds: number[];
  /** Failed alert IDs */
  FailedAlertIds?: number[];
}

/**
 * Alert close data
 */
export interface AlertCloseData {
  /** Alert IDs to close */
  AlertIds: number[];
  /** Close notes */
  Notes?: string;
}

/**
 * Alert statistics
 */
export interface AlertStatistics {
  /** Total alerts */
  Total: number;
  /** New alerts */
  New: number;
  /** Acknowledged alerts */
  Acknowledged: number;
  /** Closed alerts */
  Closed: number;
  /** By severity */
  BySeverity: Record<number, number>;
}
