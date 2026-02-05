/**
 * Computer fixtures
 */

export const listPage1 = {
  TotalRecords: 3,
  Data: [
    {
      Id: 1,
      ComputerName: 'WORKSTATION-001',
      ClientId: 100,
      LocationId: 1,
      OS: 'Windows 11 Pro',
      IsOnline: true,
      LastContact: '2024-01-15T10:30:00Z',
      LocalIPAddress: '192.168.1.101',
      AgentVersion: '2024.1.0.0',
    },
    {
      Id: 2,
      ComputerName: 'SERVER-001',
      ClientId: 100,
      LocationId: 1,
      OS: 'Windows Server 2022',
      IsOnline: true,
      LastContact: '2024-01-15T10:29:00Z',
      LocalIPAddress: '192.168.1.10',
      AgentVersion: '2024.1.0.0',
    },
  ],
};

export const listPage2 = {
  TotalRecords: 3,
  Data: [
    {
      Id: 3,
      ComputerName: 'LAPTOP-001',
      ClientId: 101,
      LocationId: 2,
      OS: 'Windows 11 Home',
      IsOnline: false,
      LastContact: '2024-01-14T18:00:00Z',
      LocalIPAddress: '192.168.2.50',
      AgentVersion: '2024.1.0.0',
    },
  ],
};

export const single = {
  Id: 1,
  ComputerName: 'WORKSTATION-001',
  ClientId: 100,
  LocationId: 1,
  Domain: 'CORPORATE',
  LastUserName: 'jsmith',
  OS: 'Windows 11 Pro',
  OSVersion: '10.0.22621',
  ServicePack: '',
  Type: 'Workstation',
  BiosManufacturer: 'Dell Inc.',
  BiosName: 'Dell System BIOS',
  BiosVersion: '2.1.0',
  SerialNumber: 'ABC123456',
  Model: 'Latitude 5520',
  Manufacturer: 'Dell Inc.',
  TotalMemory: 16384,
  TotalDiskSpace: 512,
  FreeDiskSpace: 256,
  LocalIPAddress: '192.168.1.101',
  MacAddress: '00:11:22:33:44:55',
  ExternalIPAddress: '203.0.113.50',
  IsOnline: true,
  LastContact: '2024-01-15T10:30:00Z',
  LastHeartbeat: '2024-01-15T10:29:30Z',
  DateAdded: '2023-06-01T09:00:00Z',
  AgentVersion: '2024.1.0.0',
  IsNetworkProbe: false,
  IsVirtual: false,
  UptimeSeconds: 86400,
  Comment: 'Primary workstation for John Smith',
  AssetTag: 'WS-001',
};

export const created = {
  Id: 10,
  ComputerName: 'NEW-WORKSTATION',
  ClientId: 100,
  LocationId: 1,
  DateAdded: '2024-01-15T11:00:00Z',
};

export const updated = {
  Id: 1,
  ComputerName: 'WORKSTATION-001-RENAMED',
  ClientId: 100,
  LocationId: 1,
  Comment: 'Updated comment',
};

export const commandResult = {
  ComputerId: 1,
  Output: 'Command executed successfully',
  ExitCode: 0,
  Success: true,
  ExecutedAt: '2024-01-15T10:35:00Z',
};
