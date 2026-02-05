/**
 * Common types shared across resources
 */

/**
 * Base list parameters for paginated endpoints
 */
export interface BaseListParams {
  /** Number of records per page (default: 100) */
  pageSize?: number;
  /** Page number (1-indexed, default: 1) */
  page?: number;
  /** OData filter expression */
  condition?: string;
  /** Fields to select */
  select?: string;
  /** Sort field and direction */
  orderBy?: string;
  /** Expand related entities */
  expand?: string;
}

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  Id: number;
}

/**
 * Response wrapper for list endpoints
 */
export interface ListResponse<T> {
  TotalRecords?: number;
  Data: T[];
}

/**
 * Extra data fields for computers
 */
export interface ExtraDataField {
  Id: number;
  FieldName: string;
  FieldValue: string;
}

/**
 * Location information
 */
export interface LocationInfo {
  Id: number;
  Name: string;
  ClientId: number;
}

/**
 * Generic API response
 */
export interface ApiResponse<T> {
  Data: T;
  Success: boolean;
  Message?: string;
}
