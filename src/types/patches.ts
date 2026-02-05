/**
 * Patch management types for ConnectWise Automate
 */

import type { BaseEntity, BaseListParams } from './common.js';

/**
 * Patch entity
 */
export interface Patch extends BaseEntity {
  /** Patch title */
  Title: string;
  /** Microsoft KB article ID */
  KBArticle?: string;
  /** Patch description */
  Description?: string;
  /** Bulletin ID */
  BulletinId?: string;
  /** Patch category */
  Category?: string;
  /** Product name */
  Product?: string;
  /** Severity */
  Severity?: 'Critical' | 'Important' | 'Moderate' | 'Low' | 'Unspecified';
  /** Release date */
  ReleaseDate?: string;
  /** Is approved */
  IsApproved?: boolean;
  /** Approved by */
  ApprovedBy?: string;
  /** Approval date */
  ApprovalDate?: string;
  /** Is superseded */
  IsSuperseded?: boolean;
  /** Superseded by patch ID */
  SupersededBy?: number;
  /** Download size in bytes */
  DownloadSize?: number;
  /** Download URL */
  DownloadUrl?: string;
}

/**
 * Patch list parameters
 */
export interface PatchListParams extends BaseListParams {
  /** Filter by approval status */
  isApproved?: boolean;
  /** Filter by category */
  category?: string;
  /** Filter by severity */
  severity?: 'Critical' | 'Important' | 'Moderate' | 'Low' | 'Unspecified';
  /** Filter by product */
  product?: string;
  /** Search by title */
  title?: string;
  /** Filter by release date start */
  releaseDateStart?: string;
  /** Filter by release date end */
  releaseDateEnd?: string;
}

/**
 * Patch list response
 */
export interface PatchListResponse {
  TotalRecords?: number;
  Data: Patch[];
}

/**
 * Patch approval request
 */
export interface PatchApproveRequest {
  /** Patch IDs to approve */
  PatchIds: number[];
  /** Approval notes */
  Notes?: string;
}

/**
 * Patch approval result
 */
export interface PatchApproveResult {
  /** Number of patches approved */
  Count: number;
  /** Approved patch IDs */
  ApprovedPatchIds: number[];
  /** Failed patch IDs */
  FailedPatchIds?: number[];
}

/**
 * Computer patch status
 */
export interface ComputerPatch extends BaseEntity {
  /** Computer ID */
  ComputerId: number;
  /** Computer name */
  ComputerName?: string;
  /** Patch ID */
  PatchId: number;
  /** Patch title */
  PatchTitle?: string;
  /** Installation status */
  Status: 'Installed' | 'Missing' | 'Pending' | 'Failed' | 'Ignored';
  /** Install date */
  InstallDate?: string;
  /** Last attempt date */
  LastAttemptDate?: string;
  /** Error message */
  ErrorMessage?: string;
}

/**
 * Computer patch list parameters
 */
export interface ComputerPatchListParams extends BaseListParams {
  /** Filter by computer ID */
  computerId?: number;
  /** Filter by patch ID */
  patchId?: number;
  /** Filter by status */
  status?: 'Installed' | 'Missing' | 'Pending' | 'Failed' | 'Ignored';
  /** Filter by client ID */
  clientId?: number;
}

/**
 * Computer patch list response
 */
export interface ComputerPatchListResponse {
  TotalRecords?: number;
  Data: ComputerPatch[];
}

/**
 * Patch statistics
 */
export interface PatchStatistics {
  /** Total patches in system */
  TotalPatches: number;
  /** Approved patches */
  ApprovedPatches: number;
  /** Pending approval */
  PendingApproval: number;
  /** Total computers needing patches */
  ComputersNeedingPatches: number;
  /** By severity */
  BySeverity: {
    Critical: number;
    Important: number;
    Moderate: number;
    Low: number;
    Unspecified: number;
  };
}

/**
 * Patch install request
 */
export interface PatchInstallRequest {
  /** Computer IDs */
  ComputerIds: number[];
  /** Patch IDs to install */
  PatchIds: number[];
  /** Force reboot after install */
  ForceReboot?: boolean;
  /** Delay in minutes before reboot */
  RebootDelayMinutes?: number;
}

/**
 * Patch install response
 */
export interface PatchInstallResponse {
  /** Job ID */
  JobId: string;
  /** Target computers */
  ComputerIds: number[];
  /** Target patches */
  PatchIds: number[];
  /** Status */
  Status: 'Queued' | 'Running' | 'Completed' | 'Failed';
  /** Message */
  Message?: string;
}
