/**
 * Group types for ConnectWise Automate
 */

import type { BaseEntity, BaseListParams } from './common.js';

/**
 * Group entity
 */
export interface Group extends BaseEntity {
  /** Group name */
  Name: string;
  /** Group GUID */
  Guid?: string;
  /** Parent group ID */
  ParentId?: number;
  /** Group type */
  GroupType?: 'ClientGroup' | 'LocationGroup' | 'ComputerGroup' | 'NetworkDeviceGroup';
  /** Is auto-join group */
  IsAutoJoin?: boolean;
  /** Auto-join SQL */
  AutoJoinSql?: string;
  /** Is template group */
  IsTemplate?: boolean;
  /** Template group ID */
  TemplateId?: number;
  /** Group path */
  FullPath?: string;
  /** Member count */
  MemberCount?: number;
  /** Date created */
  DateCreated?: string;
  /** Comments/notes */
  Comment?: string;
}

/**
 * Group list parameters
 */
export interface GroupListParams extends BaseListParams {
  /** Filter by group type */
  groupType?: 'ClientGroup' | 'LocationGroup' | 'ComputerGroup' | 'NetworkDeviceGroup';
  /** Filter by parent group */
  parentId?: number;
  /** Search by name */
  name?: string;
}

/**
 * Group list response
 */
export interface GroupListResponse {
  TotalRecords?: number;
  Data: Group[];
}

/**
 * Group member
 */
export interface GroupMember extends BaseEntity {
  /** Group ID */
  GroupId: number;
  /** Member type */
  MemberType: 'Computer' | 'Client' | 'Location' | 'NetworkDevice';
  /** Member ID */
  MemberId: number;
  /** Member name */
  MemberName?: string;
  /** Date added */
  DateAdded?: string;
}

/**
 * Group member list parameters
 */
export interface GroupMemberListParams extends BaseListParams {
  /** Filter by group ID */
  groupId?: number;
  /** Filter by member type */
  memberType?: 'Computer' | 'Client' | 'Location' | 'NetworkDevice';
}

/**
 * Group member list response
 */
export interface GroupMemberListResponse {
  TotalRecords?: number;
  Data: GroupMember[];
}

/**
 * Add members to group request
 */
export interface GroupAddMembersRequest {
  /** Member IDs to add */
  MemberIds: number[];
}

/**
 * Remove members from group request
 */
export interface GroupRemoveMembersRequest {
  /** Member IDs to remove */
  MemberIds: number[];
}
