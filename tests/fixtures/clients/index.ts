/**
 * Client fixtures
 */

export const list = {
  TotalRecords: 2,
  Data: [
    {
      Id: 100,
      Name: 'Acme Corporation',
      Address1: '123 Main Street',
      City: 'New York',
      State: 'NY',
      ZipCode: '10001',
      Country: 'USA',
      Phone: '555-123-4567',
      IsActive: true,
      ComputerCount: 25,
      DateAdded: '2022-01-15T09:00:00Z',
    },
    {
      Id: 101,
      Name: 'TechStart Inc.',
      Address1: '456 Innovation Drive',
      City: 'San Francisco',
      State: 'CA',
      ZipCode: '94102',
      Country: 'USA',
      Phone: '555-987-6543',
      IsActive: true,
      ComputerCount: 10,
      DateAdded: '2023-03-20T14:30:00Z',
    },
  ],
};

export const single = {
  Id: 100,
  Name: 'Acme Corporation',
  Address1: '123 Main Street',
  Address2: 'Suite 500',
  City: 'New York',
  State: 'NY',
  ZipCode: '10001',
  Country: 'USA',
  Phone: '555-123-4567',
  Fax: '555-123-4568',
  Website: 'https://www.acme.com',
  IsActive: true,
  ComputerCount: 25,
  ContactCount: 5,
  DateAdded: '2022-01-15T09:00:00Z',
  ExternalId: 'CRM-ACME-001',
  Comment: 'Premium customer',
};

export const created = {
  Id: 102,
  Name: 'New Customer Corp',
  Address1: '789 Business Park',
  City: 'Chicago',
  State: 'IL',
  ZipCode: '60601',
  Country: 'USA',
  IsActive: true,
  DateAdded: '2024-01-15T11:00:00Z',
};

export const updated = {
  Id: 100,
  Name: 'Acme Corporation Updated',
  Address1: '123 Main Street',
  City: 'New York',
  State: 'NY',
  ZipCode: '10001',
  Country: 'USA',
  IsActive: true,
  Comment: 'Updated company info',
};

export const locations = {
  TotalRecords: 2,
  Data: [
    {
      Id: 1,
      Name: 'Headquarters',
      ClientId: 100,
      Address1: '123 Main Street',
      City: 'New York',
      State: 'NY',
      ZipCode: '10001',
      IsDefault: true,
      ComputerCount: 20,
    },
    {
      Id: 2,
      Name: 'Branch Office',
      ClientId: 100,
      Address1: '456 Side Street',
      City: 'Brooklyn',
      State: 'NY',
      ZipCode: '11201',
      IsDefault: false,
      ComputerCount: 5,
    },
  ],
};

export const singleLocation = {
  Id: 1,
  Name: 'Headquarters',
  ClientId: 100,
  Address1: '123 Main Street',
  Address2: 'Suite 500',
  City: 'New York',
  State: 'NY',
  ZipCode: '10001',
  Country: 'USA',
  Phone: '555-123-4567',
  IsDefault: true,
  ComputerCount: 20,
  DateAdded: '2022-01-15T09:00:00Z',
};
