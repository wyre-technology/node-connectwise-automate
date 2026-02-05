/**
 * Computer (Agent) types for ConnectWise Automate
 */

import type { BaseEntity, BaseListParams, ExtraDataField, LocationInfo } from './common.js';

/**
 * Computer entity (an agent/endpoint)
 */
export interface Computer extends BaseEntity {
  /** Computer name */
  ComputerName: string;
  /** Client ID */
  ClientId: number;
  /** Client name */
  Client?: {
    Id: number;
    Name: string;
  };
  /** Location ID */
  LocationId: number;
  /** Location info */
  Location?: LocationInfo;
  /** Domain name */
  Domain?: string;
  /** Username of last logged in user */
  LastUserName?: string;
  /** Operating system */
  OS?: string;
  /** OS version */
  OSVersion?: string;
  /** Service pack */
  ServicePack?: string;
  /** Computer type */
  Type?: string;
  /** BIOS manufacturer */
  BiosManufacturer?: string;
  /** BIOS name */
  BiosName?: string;
  /** BIOS version */
  BiosVersion?: string;
  /** Serial number */
  SerialNumber?: string;
  /** Computer model */
  Model?: string;
  /** Manufacturer */
  Manufacturer?: string;
  /** Total memory in MB */
  TotalMemory?: number;
  /** Total disk space in GB */
  TotalDiskSpace?: number;
  /** Free disk space in GB */
  FreeDiskSpace?: number;
  /** IP address */
  LocalIPAddress?: string;
  /** MAC address */
  MacAddress?: string;
  /** External IP address */
  ExternalIPAddress?: string;
  /** Is online */
  IsOnline?: boolean;
  /** Last contact time */
  LastContact?: string;
  /** Last heartbeat time */
  LastHeartbeat?: string;
  /** Date added */
  DateAdded?: string;
  /** Agent version */
  AgentVersion?: string;
  /** Network probe status */
  IsNetworkProbe?: boolean;
  /** Is virtualized */
  IsVirtual?: boolean;
  /** Uptime in seconds */
  UptimeSeconds?: number;
  /** Comment/notes */
  Comment?: string;
  /** Asset tag */
  AssetTag?: string;
  /** Extra data fields */
  ExtraDataFields?: ExtraDataField[];
}

/**
 * Computer list parameters
 */
export interface ComputerListParams extends BaseListParams {
  /** Filter by client ID */
  clientId?: number;
  /** Filter by location ID */
  locationId?: number;
  /** Include offline agents */
  includeOffline?: boolean;
  /** Filter by online status */
  isOnline?: boolean;
}

/**
 * Computer list response
 */
export interface ComputerListResponse {
  TotalRecords?: number;
  Data: Computer[];
}

/**
 * Computer creation data
 */
export interface ComputerCreateData {
  ComputerName: string;
  ClientId: number;
  LocationId: number;
  Comment?: string;
  AssetTag?: string;
}

/**
 * Computer update data
 */
export interface ComputerUpdateData {
  ComputerName?: string;
  LocationId?: number;
  Comment?: string;
  AssetTag?: string;
}

/**
 * Computer command execution
 */
export interface ComputerCommand {
  Command: string;
  Parameters?: Record<string, string | number | boolean>;
  RunAsAdmin?: boolean;
  PowerShell?: boolean;
}

/**
 * Command execution result
 */
export interface CommandResult {
  ComputerId: number;
  Output: string;
  ExitCode: number;
  Success: boolean;
  ExecutedAt: string;
}
