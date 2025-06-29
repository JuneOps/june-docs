# Integrations Guide

June connects with your existing IT infrastructure to provide a unified view of your assets. This guide covers all supported integrations and how to set them up.

## Overview

June integrates with three main categories of systems:
- **MDM Platforms**: Device management and inventory
- **Identity Providers**: User authentication and directory
- **Communication Tools**: Notifications and alerts

---

## MDM Platform Integrations

### Supported Platforms

#### Jamf Pro
**Best for**: macOS and iOS device management

**What Gets Synced**:
- Device inventory (Mac, iPhone, iPad, Apple TV)
- Hardware specifications and serial numbers
- OS versions and update status
- Application installations
- Security compliance status
- User assignments and location data
- MDM enrollment and supervision status

**Setup Requirements**:
- Jamf Pro administrator access
- API user account with read permissions
- Network access to Jamf Pro server

#### Microsoft Intune
**Best for**: Windows, iOS, and Android device management

**What Gets Synced**:
- Device inventory across all platforms
- Compliance policy status
- Application deployment status
- Security configuration
- User assignments
- Device enrollment information

**Setup Requirements**:
- Azure AD administrator access
- Microsoft Graph API permissions
- Intune administrator role

#### VMware Workspace ONE
**Best for**: Multi-platform enterprise device management

**What Gets Synced**:
- Cross-platform device inventory
- Application catalog and installations
- Compliance and security posture
- User and device assignments
- Certificate and profile status

**Setup Requirements**:
- Workspace ONE administrator access
- REST API access credentials
- Console administrator permissions

#### Google Workspace
**Best for**: Chrome OS and Android device management

**What Gets Synced**:
- Chromebook and mobile device inventory
- Google Workspace user directory
- Device compliance status
- Application permissions and usage
- Security settings

**Setup Requirements**:
- Google Workspace super admin access
- Admin SDK API enabled
- Service account with domain-wide delegation

### MDM Integration Setup

#### Step 1: Prepare Your MDM System
1. **Create API User** (platform-specific):
   - Jamf: Create API user with read-only access
   - Intune: Configure app registration in Azure AD
   - Workspace ONE: Generate REST API credentials
   - Google: Create service account with admin access

2. **Verify Permissions**:
   - Device inventory read access
   - User directory access (if applicable)
   - Application and policy read access

#### Step 2: Configure June Integration
1. Navigate to **Integrations** → **MDM Platforms**
2. Select your MDM platform
3. Enter connection details:
   - Server URL or tenant ID
   - API credentials or certificate
   - Sync preferences

4. Test the connection
5. Start initial sync

#### Step 3: Verify Sync
1. Check sync status in the integration dashboard
2. Verify device count matches your MDM
3. Review any sync errors or warnings
4. Configure ongoing sync schedule

### Sync Behavior

#### Initial Sync
- Full device inventory import
- User assignment mapping
- Historical data import (where available)
- Compliance status baseline

#### Ongoing Sync
- **Real-time**: Device enrollment/unenrollment events
- **Hourly**: Compliance status updates
- **Daily**: Full inventory reconciliation
- **Weekly**: User assignment updates

#### Conflict Resolution
When data conflicts exist between June and your MDM:
- MDM data takes precedence for device specifications
- June data takes precedence for cost and procurement info
- Manual assignments in June override MDM assignments
- Audit logs track all data source changes

---

## Identity Provider Integrations

### Supported Providers

#### Google Workspace
**Features**:
- Single sign-on (SSO)
- User directory sync
- Group membership management
- Admin role mapping

**Setup Process**:
1. Enable SAML SSO in Google Admin Console
2. Configure June as a SAML application
3. Map user attributes and groups
4. Test SSO login

#### Microsoft Azure AD
**Features**:
- Azure AD SSO integration
- Active Directory user sync
- Security group mapping
- Conditional access support

**Setup Process**:
1. Register June in Azure AD app registrations
2. Configure SAML or OIDC authentication
3. Set up user and group provisioning
4. Configure attribute mapping

#### Okta
**Features**:
- Okta SSO integration
- User lifecycle management
- Multi-factor authentication
- Role-based access control

**Setup Process**:
1. Add June from Okta App Integration Network
2. Configure SSO settings
3. Set up user provisioning
4. Map Okta groups to June roles

### SSO Benefits

#### For Users
- Single login for all applications
- Reduced password fatigue
- Consistent security policies
- Automatic account provisioning

#### for IT Administrators
- Centralized user management
- Consistent security policies
- Automated user lifecycle
- Enhanced audit capabilities

---

## Communication Tool Integrations

### Slack Integration

**Features**:
- Real-time asset alerts
- Weekly digest reports
- Interactive commands
- Escalation workflows

#### Setup Process
1. Go to **Integrations** → **Slack**
2. Click **Connect to Slack**
3. Authorize June app in your Slack workspace
4. Configure channel notifications:
   - **#it-alerts**: Critical asset issues
   - **#budget-updates**: Budget threshold alerts
   - **#weekly-reports**: Summary reports

#### Available Commands
- `/june search [query]`: Search assets
- `/june status [serial]`: Get device status
- `/june refresh`: Show refresh recommendations
- `/june budget`: Current budget status

#### Notification Types
- **Critical**: Security violations, device failures
- **Important**: Budget thresholds, compliance issues
- **Informational**: Weekly summaries, refresh recommendations

### Email Notifications

**Features**:
- Customizable email alerts
- Digest reports
- Escalation chains
- Rich HTML formatting

#### Notification Categories
1. **Security Alerts**: Immediate security issues
2. **Budget Notifications**: Spending thresholds and forecasts
3. **Compliance Reports**: Weekly compliance summaries
4. **Refresh Recommendations**: Monthly refresh planning updates

#### Customization Options
- Frequency (immediate, daily, weekly)
- Recipient groups by role
- Alert thresholds and criteria
- Email template customization

### Webhook Integration

**Features**:
- Real-time event streaming
- Custom integration development
- Third-party tool connectivity
- Automated workflow triggers

#### Supported Events
- Device enrollment/unenrollment
- Compliance status changes
- Budget threshold alerts
- Asset assignments
- Refresh recommendations

#### Webhook Configuration
1. Navigate to **Integrations** → **Webhooks**
2. Create new webhook endpoint
3. Select events to subscribe to
4. Configure authentication and security
5. Test webhook delivery

---

## Advanced Integration Features

### API Access

June provides a comprehensive GraphQL API for custom integrations:

#### API Capabilities
- Full asset inventory access
- Real-time data updates
- Custom report generation
- Bulk data operations
- Webhook event subscriptions

#### Authentication
- API key authentication
- OAuth 2.0 support
- Role-based access control
- Rate limiting and quotas

#### Documentation
- Interactive API explorer
- Code examples in multiple languages
- GraphQL schema documentation
- Integration tutorials

### Data Export

#### Supported Formats
- **CSV**: Asset inventories and reports
- **JSON**: API-compatible data structure
- **Excel**: Formatted reports with charts
- **PDF**: Executive summaries and presentations

#### Export Options
- **On-demand**: Manual export from web interface
- **Scheduled**: Automated daily/weekly exports
- **API**: Programmatic data access
- **Webhook**: Real-time data streaming

### Custom Fields

Add organization-specific data to your assets:

#### Field Types
- Text (single line, multi-line)
- Number (integer, decimal, currency)
- Date (date, datetime)
- Selection (dropdown, multi-select)
- Boolean (yes/no, checkboxes)

#### Use Cases
- Internal asset tags
- Cost center assignments
- Service level agreements
- Custom compliance requirements
- Location-specific data

---

## Integration Best Practices

### Planning Your Integrations

1. **Assess Current Tools**: Inventory existing systems and data
2. **Define Requirements**: Identify must-have vs. nice-to-have integrations
3. **Plan Rollout**: Prioritize integrations by business impact
4. **Test Thoroughly**: Validate data accuracy before going live

### Security Considerations

#### API Security
- Use dedicated service accounts
- Implement least-privilege access
- Rotate credentials regularly
- Monitor API usage and access logs

#### Data Protection
- Encrypt data in transit and at rest
- Implement proper access controls
- Regular security assessments
- Compliance with data protection regulations

### Troubleshooting Common Issues

#### Sync Problems
- **Symptom**: Missing or outdated device data
- **Solution**: Check API permissions and network connectivity
- **Prevention**: Monitor sync status dashboard regularly

#### Authentication Failures
- **Symptom**: Unable to connect to external system
- **Solution**: Verify credentials and service account permissions
- **Prevention**: Set up credential expiration alerts

#### Data Discrepancies
- **Symptom**: Asset counts don't match between systems
- **Solution**: Review sync logs and conflict resolution rules
- **Prevention**: Establish clear data governance policies

---

## Getting Help

### Support Resources
- **Integration Guides**: Step-by-step setup instructions
- **Video Tutorials**: Visual walkthrough of integration setup
- **API Documentation**: Comprehensive technical documentation
- **Community Forum**: Connect with other users and share solutions

### Professional Services
- **Integration Consulting**: Expert help with complex integrations
- **Custom Development**: Tailored integration solutions
- **Data Migration**: Assistance with data import and cleanup
- **Training**: Team training on integration management

### Contact Information
- **Technical Support**: integrations@june.com
- **Professional Services**: services@june.com
- **API Support**: api-support@june.com
- **Phone**: 1-800-JUNE-HELP (premium plans)

---

**Ready to connect your systems?** Start with our [Integration Planning Worksheet](https://june.com/integration-worksheet) or schedule a consultation with our integration specialists. 