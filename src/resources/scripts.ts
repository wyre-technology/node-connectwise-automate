/**
 * Scripts resource operations
 */

import type { HttpClient } from '../http.js';
import type { PaginatedIterable } from '../pagination.js';
import { createPaginatedIterable } from '../pagination.js';
import type {
  Script,
  ScriptListParams,
  ScriptListResponse,
  ScriptExecuteRequest,
  ScriptExecuteResponse,
  ScriptExecution,
  ScriptExecutionListParams,
  ScriptExecutionListResponse,
  ScriptFolder,
} from '../types/scripts.js';

/**
 * Scripts resource operations
 */
export class ScriptsResource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * List scripts with optional filtering
   */
  async list(params?: ScriptListParams): Promise<ScriptListResponse> {
    return this.httpClient.request<ScriptListResponse>('/Scripts', {
      params: this.buildListParams(params),
    });
  }

  /**
   * List all scripts with automatic pagination
   */
  listAll(params?: Omit<ScriptListParams, 'pageSize' | 'page'>): PaginatedIterable<Script> {
    return createPaginatedIterable<Script>(
      this.httpClient,
      '/Scripts',
      this.buildListParams(params)
    );
  }

  /**
   * Get a single script by ID
   */
  async get(id: number): Promise<Script> {
    return this.httpClient.request<Script>(`/Scripts/${id}`);
  }

  /**
   * Execute a script on one or more computers
   */
  async execute(request: ScriptExecuteRequest): Promise<ScriptExecuteResponse> {
    return this.httpClient.request<ScriptExecuteResponse>('/Scripts/Execute', {
      method: 'POST',
      body: request,
    });
  }

  /**
   * Get script execution history
   */
  async executions(params?: ScriptExecutionListParams): Promise<ScriptExecutionListResponse> {
    return this.httpClient.request<ScriptExecutionListResponse>('/Scripts/Executions', {
      params: this.buildExecutionListParams(params),
    });
  }

  /**
   * List all executions with automatic pagination
   */
  executionsAll(params?: Omit<ScriptExecutionListParams, 'pageSize' | 'page'>): PaginatedIterable<ScriptExecution> {
    return createPaginatedIterable<ScriptExecution>(
      this.httpClient,
      '/Scripts/Executions',
      this.buildExecutionListParams(params)
    );
  }

  /**
   * Get a single execution by ID
   */
  async getExecution(id: number): Promise<ScriptExecution> {
    return this.httpClient.request<ScriptExecution>(`/Scripts/Executions/${id}`);
  }

  /**
   * List script folders
   */
  async folders(): Promise<ScriptFolder[]> {
    return this.httpClient.request<ScriptFolder[]>('/Scripts/Folders');
  }

  /**
   * Get a single folder by ID
   */
  async getFolder(id: number): Promise<ScriptFolder> {
    return this.httpClient.request<ScriptFolder>(`/Scripts/Folders/${id}`);
  }

  /**
   * Build query parameters from list params
   */
  private buildListParams(params?: ScriptListParams): Record<string, string | number | boolean | undefined> {
    if (!params) return {};

    const result: Record<string, string | number | boolean | undefined> = {};

    if (params.pageSize !== undefined) result['pageSize'] = params.pageSize;
    if (params.page !== undefined) result['page'] = params.page;
    if (params.condition !== undefined) result['condition'] = params.condition;
    if (params.select !== undefined) result['$select'] = params.select;
    if (params.orderBy !== undefined) result['$orderby'] = params.orderBy;
    if (params.expand !== undefined) result['$expand'] = params.expand;
    if (params.folderId !== undefined) result['folderId'] = params.folderId;
    if (params.scriptType !== undefined) result['scriptType'] = params.scriptType;
    if (params.name !== undefined) result['name'] = params.name;

    return result;
  }

  /**
   * Build query parameters from execution list params
   */
  private buildExecutionListParams(params?: ScriptExecutionListParams): Record<string, string | number | boolean | undefined> {
    if (!params) return {};

    const result: Record<string, string | number | boolean | undefined> = {};

    if (params.pageSize !== undefined) result['pageSize'] = params.pageSize;
    if (params.page !== undefined) result['page'] = params.page;
    if (params.condition !== undefined) result['condition'] = params.condition;
    if (params.select !== undefined) result['$select'] = params.select;
    if (params.orderBy !== undefined) result['$orderby'] = params.orderBy;
    if (params.expand !== undefined) result['$expand'] = params.expand;
    if (params.scriptId !== undefined) result['scriptId'] = params.scriptId;
    if (params.computerId !== undefined) result['computerId'] = params.computerId;
    if (params.status !== undefined) result['status'] = params.status;
    if (params.startDate !== undefined) result['startDate'] = params.startDate;
    if (params.endDate !== undefined) result['endDate'] = params.endDate;

    return result;
  }
}
