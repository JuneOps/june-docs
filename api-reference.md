# June API Reference

The June API provides programmatic access to your IT asset data through a modern GraphQL interface. Build custom integrations, automate workflows, and create tailored reporting solutions.

## Getting Started

### Base URL
```
https://api.june.com/graphql
```

### Authentication
June uses API key authentication for all requests.

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

### Get Your API Key
1. Log into your June account
2. Navigate to **Settings** → **API Keys**
3. Click **Generate New API Key**
4. Copy and securely store your key

---

## GraphQL Basics

### Making Requests
All API requests are made via POST to the GraphQL endpoint.

```javascript
const response = await fetch('https://api.june.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query GetAssets($organizationId: ID!) {
        assets(organizationId: $organizationId, first: 10) {
          edges {
            node {
              id
              serialNumber
              deviceName
              status
            }
          }
        }
      }
    `,
    variables: {
      organizationId: "your-org-id"
    }
  })
});

const data = await response.json();
```

### Pagination
June uses cursor-based pagination for large result sets.

```graphql
query GetAssets($organizationId: ID!, $after: String) {
  assets(organizationId: $organizationId, first: 50, after: $after) {
    edges {
      cursor
      node {
        id
        serialNumber
        deviceName
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

## Core Resources

### Assets

#### Get All Assets
```graphql
query GetAssets($organizationId: ID!, $first: Int, $after: String) {
  assets(
    organizationId: $organizationId
    first: $first
    after: $after
  ) {
    edges {
      cursor
      node {
        id
        classification
        serialNumber
        deviceName
        condition
        status
        refreshStatus
        osName
        osVersion
        product {
          id
          manufacturer
          model
          name
        }
        currentAssignee {
          __typename
          ... on Employee {
            id
            fullName
            email
          }
        }
        purchaseDetail {
          purchaseDate
          cost
          vendor
          warrantyExpiration
        }
        mdmDetail {
          lastCheckInAt
          supervised
          enrolledViaAutomatedDeviceEnrollment
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

#### Get Single Asset
```graphql
query GetAsset($id: ID!, $organizationId: ID!) {
  asset(id: $id, organizationId: $organizationId) {
    id
    classification
    serialNumber
    deviceName
    condition
    status
    refreshStatus
    refreshReasonMessages
    osName
    osVersion
    createdAt
    updatedAt
    metadata
    product {
      id
      manufacturer
      model
      name
      description
    }
    currentAssignee {
      __typename
      ... on Employee {
        id
        fullName
        email
        firstName
        lastName
      }
      ... on Location {
        id
        name
      }
    }
    department {
      id
      departmentName
    }
    purchaseDetail {
      id
      purchaseDate
      cost
      currency
      vendor
      warrantyExpiration
      usefulLifeMonths
      effectiveUsefulLifeMonths
    }
    mdmDetail {
      id
      externalId
      lastCheckInAt
      supervised
      ownershipType
    }
    securityDetail {
      id
      fullDiskEncryptionEnabled
      firewallEnabled
      remoteDesktopEnabled
    }
  }
}
```

#### Search Assets
```graphql
query SearchAssets(
  $organizationId: ID!
  $smartSearch: String
  $filters: AssetFiltersInput
) {
  assets(
    organizationId: $organizationId
    smartSearch: $smartSearch
    filters: $filters
    first: 50
  ) {
    edges {
      node {
        id
        serialNumber
        deviceName
        status
        refreshStatus
        product {
          manufacturer
          model
        }
        currentAssignee {
          __typename
          ... on Employee {
            fullName
          }
        }
      }
    }
  }
}
```

**Example Search Queries:**
- `"MacBook Pro assigned to engineering"`
- `"devices due for refresh"`
- `"assets purchased in 2023"`
- `"Windows laptops with compliance issues"`

### Employees

#### Get All Employees
```graphql
query GetEmployees($organizationId: ID!) {
  employees(organizationId: $organizationId, first: 100) {
    edges {
      node {
        id
        firstName
        lastName
        fullName
        email
        status
        department {
          id
          departmentName
        }
        assignedAssets {
          id
          serialNumber
          deviceName
          classification
        }
      }
    }
  }
}
```

#### Get Single Employee
```graphql
query GetEmployee($id: ID!, $organizationId: ID!) {
  employee(id: $id, organizationId: $organizationId) {
    id
    firstName
    lastName
    fullName
    email
    status
    createdAt
    updatedAt
    department {
      id
      departmentName
    }
    assignedAssets {
      id
      serialNumber
      deviceName
      classification
      status
      product {
        manufacturer
        model
      }
    }
  }
}
```

### Departments

#### Get All Departments
```graphql
query GetDepartments($organizationId: ID!) {
  departments(organizationId: $organizationId) {
    id
    departmentName
    employeeCount
    assetCount
    totalAssetValue
  }
}
```

### AI Insights

#### Get AI Recommendations
```graphql
query GetAIRecommendations($organizationId: ID!) {
  aiRecommendations(organizationId: $organizationId) {
    id
    type
    priority
    title
    description
    estimatedSavings
    affectedAssetCount
    recommendedAction
    createdAt
    status
  }
}
```

---

## Mutations

### Update Asset
```graphql
mutation UpdateAsset($input: UpdateAssetInput!) {
  updateAsset(input: $input) {
    asset {
      id
      deviceName
      status
      currentAssignee {
        __typename
        ... on Employee {
          fullName
        }
      }
    }
    errors
  }
}
```

### Assign Asset to Employee
```graphql
mutation AssignAsset($input: AssignAssetInput!) {
  assignAsset(input: $input) {
    asset {
      id
      currentAssignee {
        __typename
        ... on Employee {
          id
          fullName
        }
      }
    }
    errors
  }
}
```

### Create Import Session
```graphql
mutation CreateImportSession($input: CreateImportSessionInput!) {
  createImportSession(input: $input) {
    importSession {
      id
      status
      fileName
      totalRows
      processedRows
      successRows
      errorRows
    }
    errors
  }
}
```

---

## Subscriptions

### Real-time Asset Updates
```graphql
subscription AssetUpdates($organizationId: ID!) {
  assetUpdates(organizationId: $organizationId) {
    id
    type
    asset {
      id
      serialNumber
      deviceName
      status
    }
    timestamp
  }
}
```

### Compliance Alerts
```graphql
subscription ComplianceAlerts($organizationId: ID!) {
  complianceAlerts(organizationId: $organizationId) {
    id
    severity
    type
    message
    affectedAssets {
      id
      serialNumber
      deviceName
    }
    timestamp
  }
}
```

---

## Filtering and Sorting

### Asset Filters
```graphql
input AssetFiltersInput {
  status: [AssetStatusEnum!]
  classification: [AssetClassificationEnum!]
  refreshStatus: [AssetRefreshStatusEnum!]
  assigneeId: ID
  departmentId: ID
  purchaseDateRange: DateRangeInput
  costRange: CostRangeInput
  manufacturer: [String!]
  compliance: ComplianceFilterInput
}

input DateRangeInput {
  start: ISO8601DateTime
  end: ISO8601DateTime
}

input CostRangeInput {
  min: Float
  max: Float
}
```

### Sorting Options
```graphql
enum AssetSortField {
  DEVICE_NAME
  SERIAL_NUMBER
  PURCHASE_DATE
  COST
  STATUS
  REFRESH_STATUS
  CREATED_AT
  UPDATED_AT
}

enum SortDirection {
  ASC
  DESC
}
```

---

## Error Handling

### Error Types
June returns structured errors with helpful information:

```json
{
  "errors": [
    {
      "message": "Asset not found",
      "code": "ASSET_NOT_FOUND",
      "path": ["asset"],
      "extensions": {
        "assetId": "123456"
      }
    }
  ]
}
```

### Common Error Codes
- `AUTHENTICATION_REQUIRED`: Missing or invalid API key
- `PERMISSION_DENIED`: Insufficient permissions for requested resource
- `ASSET_NOT_FOUND`: Requested asset doesn't exist
- `VALIDATION_ERROR`: Invalid input data
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

---

## Rate Limiting

### Limits
- **Standard Plan**: 1000 requests/hour
- **Professional Plan**: 5000 requests/hour  
- **Enterprise Plan**: 20000 requests/hour

### Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1609459200
```

### Best Practices
- Cache responses when possible
- Use pagination for large datasets
- Implement exponential backoff for retries
- Monitor rate limit headers

---

## Webhooks

### Setup
1. Navigate to **Settings** → **Webhooks**
2. Create new webhook endpoint
3. Select events to subscribe to
4. Configure security settings

### Event Types
- `asset.created`
- `asset.updated`
- `asset.assigned`
- `asset.unassigned`
- `asset.refresh_due`
- `compliance.violation`
- `budget.threshold_exceeded`

### Payload Example
```json
{
  "event": "asset.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "organizationId": "org_123",
  "data": {
    "asset": {
      "id": "asset_456",
      "serialNumber": "ABC123",
      "changes": {
        "status": {
          "from": "active",
          "to": "inactive"
        }
      }
    }
  }
}
```

### Security
- HTTPS required for all webhook endpoints
- Optional signature verification using HMAC-SHA256
- IP allowlisting available for enterprise plans

---

## SDK and Libraries

### Official SDKs

#### JavaScript/Node.js
```bash
npm install @june/api-client
```

```javascript
import { JuneClient } from '@june/api-client';

const client = new JuneClient({
  apiKey: 'your-api-key'
});

const assets = await client.assets.list({
  organizationId: 'your-org-id',
  first: 50
});
```

#### Python
```bash
pip install june-api-client
```

```python
from june import JuneClient

client = JuneClient(api_key='your-api-key')

assets = client.assets.list(
    organization_id='your-org-id',
    first=50
)
```

### Community Libraries
- **Ruby**: `june-ruby` gem
- **PHP**: `june-php` package
- **Go**: `june-go` module
- **C#**: `June.ApiClient` NuGet package

---

## Examples and Tutorials

### Common Use Cases

#### Daily Asset Report
```javascript
// Generate daily asset summary
const today = new Date().toISOString().split('T')[0];

const query = `
  query DailyReport($organizationId: ID!, $date: ISO8601DateTime!) {
    assets(organizationId: $organizationId) {
      totalCount
    }
    
    assetsCreatedToday: assets(
      organizationId: $organizationId
      filters: { createdAfter: $date }
    ) {
      totalCount
    }
    
    complianceViolations: assets(
      organizationId: $organizationId
      filters: { compliance: { hasViolations: true } }
    ) {
      totalCount
    }
  }
`;
```

#### Bulk Asset Update
```javascript
// Update multiple assets
const updatePromises = assetIds.map(id => 
  client.updateAsset({
    id,
    organizationId: 'your-org-id',
    input: {
      status: 'ACTIVE'
    }
  })
);

const results = await Promise.all(updatePromises);
```

#### Custom Dashboard Data
```javascript
// Fetch data for custom dashboard
const dashboardData = await client.query(`
  query Dashboard($organizationId: ID!) {
    organization(id: $organizationId) {
      totalAssets
      totalEmployees
      monthlySpend
    }
    
    assetsByStatus: assets(organizationId: $organizationId) {
      aggregations {
        groupBy: status
        count
      }
    }
    
    refreshRecommendations: aiRecommendations(
      organizationId: $organizationId
      type: REFRESH
    ) {
      totalCount
      estimatedTotalSavings
    }
  }
`);
```

---

## Support and Resources

### Documentation
- **GraphQL Schema**: Interactive schema explorer
- **Postman Collection**: Pre-built API requests
- **Code Examples**: Sample implementations
- **Integration Guides**: Step-by-step tutorials

### Support Channels
- **API Documentation**: [api.june.com](https://api.june.com)
- **Developer Forum**: [developers.june.com](https://developers.june.com)
- **Email Support**: api-support@june.com
- **Slack Community**: Join our developer Slack

### Status and Updates
- **API Status**: [status.june.com](https://status.june.com)
- **Changelog**: [changelog.june.com](https://changelog.june.com)
- **Developer Newsletter**: Monthly updates and tips

---

**Ready to start building?** 

Get your API key and start exploring the June API today. Need help? Our developer support team is standing by to assist with your integration.

[Get API Key](https://app.june.com/settings/api) | [Join Developer Community](https://developers.june.com) 