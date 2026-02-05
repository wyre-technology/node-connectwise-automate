/**
 * Script types for ConnectWise Automate
 */

import type { BaseEntity, BaseListParams } from './common.js';

/**
 * Script entity
 */
export interface Script extends BaseEntity {
  /** Script name */
  Name: string;
  /** Script description */
  Description?: string;
  /** Script folder/category */
  FolderId?: number;
  /** Folder name */
  FolderName?: string;
  /** Script GUID */
  Guid?: string;
  /** Script type */
  ScriptType?: 'Function' | 'Script' | 'Maintenance';
  /** License type */
  LicenseType?: string;
  /** Parameters definition */
  Parameters?: ScriptParameter[];
  /** Is enabled */
  IsEnabled?: boolean;
  /** Date created */
  DateCreated?: string;
  /** Last modified date */
  DateModified?: string;
  /** Last modified by */
  ModifiedBy?: string;
  /** Version */
  Version?: number;
}

/**
 * Script parameter definition
 */
export interface ScriptParameter {
  /** Parameter name */
  Name: string;
  /** Parameter type */
  Type: 'String' | 'Number' | 'Boolean' | 'ComputerList' | 'ClientList' | 'LocationList';
  /** Default value */
  DefaultValue?: string;
  /** Is required */
  IsRequired?: boolean;
  /** Description */
  Description?: string;
}

/**
 * Script list parameters
 */
export interface ScriptListParams extends BaseListParams {
  /** Filter by folder ID */
  folderId?: number;
  /** Filter by script type */
  scriptType?: 'Function' | 'Script' | 'Maintenance';
  /** Search by name */
  name?: string;
}

/**
 * Script list response
 */
export interface ScriptListResponse {
  TotalRecords?: number;
  Data: Script[];
}

/**
 * Script execution request
 */
export interface ScriptExecuteRequest {
  /** Script ID */
  ScriptId: number;
  /** Target computer IDs */
  ComputerIds: number[];
  /** Script parameters */
  Parameters?: Record<string, string | number | boolean>;
  /** Priority (1=high, 2=normal, 3=low) */
  Priority?: number;
  /** Run offline mode */
  OfflineMode?: boolean;
}

/**
 * Script execution response
 */
export interface ScriptExecuteResponse {
  /** Execution job ID */
  JobId: string;
  /** Script ID */
  ScriptId: number;
  /** Target computers */
  ComputerIds: number[];
  /** Status */
  Status: 'Queued' | 'Running' | 'Completed' | 'Failed';
  /** Message */
  Message?: string;
  /** Queued date */
  QueuedDate: string;
}

/**
 * Script execution history
 */
export interface ScriptExecution extends BaseEntity {
  /** Script ID */
  ScriptId: number;
  /** Script name */
  ScriptName?: string;
  /** Computer ID */
  ComputerId: number;
  /** Computer name */
  ComputerName?: string;
  /** Execution status */
  Status: 'Queued' | 'Running' | 'Completed' | 'Failed' | 'Cancelled';
  /** Start time */
  StartTime?: string;
  /** End time */
  EndTime?: string;
  /** Duration in seconds */
  Duration?: number;
  /** Exit code */
  ExitCode?: number;
  /** Output/results */
  Output?: string;
  /** Error message */
  ErrorMessage?: string;
}

/**
 * Script execution list parameters
 */
export interface ScriptExecutionListParams extends BaseListParams {
  /** Filter by script ID */
  scriptId?: number;
  /** Filter by computer ID */
  computerId?: number;
  /** Filter by status */
  status?: 'Queued' | 'Running' | 'Completed' | 'Failed' | 'Cancelled';
  /** Filter by date range start */
  startDate?: string;
  /** Filter by date range end */
  endDate?: string;
}

/**
 * Script execution list response
 */
export interface ScriptExecutionListResponse {
  TotalRecords?: number;
  Data: ScriptExecution[];
}

/**
 * Script folder
 */
export interface ScriptFolder extends BaseEntity {
  /** Folder name */
  Name: string;
  /** Parent folder ID */
  ParentId?: number;
  /** Script count */
  ScriptCount?: number;
  /** Child folders */
  Children?: ScriptFolder[];
}
