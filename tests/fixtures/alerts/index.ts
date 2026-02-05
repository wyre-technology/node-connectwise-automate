/**
 * Alert fixtures
 */

export const list = {
  TotalRecords: 3,
  Data: [
    {
      Id: 1,
      Name: 'High CPU Usage',
      Message: 'CPU usage exceeded 90% for 15 minutes',
      ComputerId: 1,
      ComputerName: 'WORKSTATION-001',
      ClientId: 100,
      ClientName: 'Acme Corporation',
      Severity: 3,
      AlertType: 'Performance',
      Status: 'New',
      IsAcknowledged: false,
      DateCreated: '2024-01-15T10:00:00Z',
    },
    {
      Id: 2,
      Name: 'Disk Space Low',
      Message: 'Disk C: has less than 10% free space',
      ComputerId: 2,
      ComputerName: 'SERVER-001',
      ClientId: 100,
      ClientName: 'Acme Corporation',
      Severity: 4,
      AlertType: 'Disk',
      Status: 'Acknowledged',
      IsAcknowledged: true,
      AcknowledgedBy: 'admin',
      AcknowledgedDate: '2024-01-15T10:15:00Z',
      DateCreated: '2024-01-15T09:00:00Z',
    },
    {
      Id: 3,
      Name: 'Agent Offline',
      Message: 'Agent has not contacted in 24 hours',
      ComputerId: 3,
      ComputerName: 'LAPTOP-001',
      ClientId: 101,
      ClientName: 'TechStart Inc.',
      Severity: 2,
      AlertType: 'Agent',
      Status: 'New',
      IsAcknowledged: false,
      DateCreated: '2024-01-14T18:00:00Z',
    },
  ],
};

export const single = {
  Id: 1,
  Name: 'High CPU Usage',
  Message: 'CPU usage exceeded 90% for 15 minutes',
  ComputerId: 1,
  ComputerName: 'WORKSTATION-001',
  ClientId: 100,
  ClientName: 'Acme Corporation',
  LocationId: 1,
  LocationName: 'Headquarters',
  Severity: 3,
  AlertType: 'Performance',
  Source: 'Performance Monitor',
  Status: 'New',
  IsAcknowledged: false,
  DateCreated: '2024-01-15T10:00:00Z',
  DateModified: '2024-01-15T10:00:00Z',
};

export const acknowledgeResult = {
  Count: 1,
  AcknowledgedAlertIds: [1],
};

export const closeResult = {
  Count: 1,
  AcknowledgedAlertIds: [1],
};

export const statistics = {
  Total: 50,
  New: 10,
  Acknowledged: 30,
  Closed: 10,
  BySeverity: {
    1: 5,
    2: 10,
    3: 20,
    4: 10,
    5: 5,
  },
};
