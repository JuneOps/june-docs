# Getting Started with June

Welcome to June! This guide will help you set up your account and start managing your IT assets effectively.

## Prerequisites

Before you begin, make sure you have:
- Admin access to your organization's MDM system (Jamf, Intune, etc.)
- A list of current IT assets (optional - June can discover them automatically)
- Budget information for IT asset planning
- Team member contact information

## Step 1: Account Setup (5 minutes)

### Create Your Organization
1. Sign up at [june.com/signup](https://june.com/signup)
2. Verify your email address
3. Complete the organization setup wizard:
   - Organization name and details
   - Industry and company size
   - Primary use case for June

### Invite Team Members
1. Go to **Settings** → **Team Management**
2. Click **Invite Members**
3. Add email addresses and select roles:
   - **Admin**: Full access to all features
   - **Manager**: Asset management and reporting
   - **Viewer**: Read-only access

## Step 2: Connect Your MDM System (10 minutes)

### Supported Platforms
- Jamf Pro
- Microsoft Intune
- VMware Workspace ONE
- Google Workspace
- Other MDM platforms (contact support)

### Connection Process
1. Navigate to **Integrations** → **MDM Platforms**
2. Select your MDM platform
3. Follow the integration wizard:
   - Enter server URL and credentials
   - Configure sync settings
   - Test the connection
   - Start initial sync

### What Gets Imported
- Device inventory (computers, mobile devices, tablets)
- Device specifications and status
- User assignments
- Compliance and security status
- Application installations

## Step 3: Import Existing Asset Data (15 minutes)

### CSV Import Option
1. Go to **Import** → **Asset Data**
2. Download the CSV template
3. Fill in your asset information:
   - Serial numbers
   - Purchase dates and costs
   - Vendor information
   - Current assignments

4. Upload and map fields
5. Review and confirm import

### Required Fields
- **Serial Number**: Unique identifier for each asset
- **Product Name**: Device model or description
- **Status**: Active, Inactive, or Retired

### Optional but Recommended
- Purchase date and cost
- Vendor information
- Warranty details
- Employee assignments

## Step 4: Configure Refresh Policies (10 minutes)

### Create Your First Policy
1. Navigate to **Settings** → **Refresh Policies**
2. Click **Create New Policy**
3. Configure policy settings:
   - **Policy Name**: e.g., "Standard Laptop Refresh"
   - **Device Types**: Select applicable devices
   - **Refresh Trigger**: Age, warranty expiration, or usage
   - **Refresh Timeline**: When to recommend refresh

### Example Policies
- **Laptops**: Refresh after 3 years or when warranty expires
- **Mobile Devices**: Refresh after 2 years
- **Desktops**: Refresh after 4 years
- **Tablets**: Refresh after 3 years

## Step 5: Set Up Budgets (10 minutes)

### Budget Configuration
1. Go to **Settings** → **Budget Management**
2. Set annual IT budget amounts
3. Allocate budget by:
   - Department
   - Device type
   - Quarter

### Budget Alerts
Configure notifications for:
- Budget thresholds (75%, 90%, 100%)
- Upcoming refresh costs
- Variance from planned spending

## Step 6: Explore Key Features (20 minutes)

### Dashboard Overview
Visit your dashboard to see:
- Total asset count and value
- Upcoming refresh recommendations
- Budget status and forecasts
- Recent AI insights

### Try Smart Search
Use natural language to find assets:
- "Show me laptops older than 2 years"
- "Which devices need security updates?"
- "Find assets assigned to engineering team"

### Review AI Insights
Check the AI recommendations for:
- Devices due for refresh
- Security compliance issues
- Cost optimization opportunities
- Budget planning suggestions

## Step 7: Set Up Notifications (5 minutes)

### Slack Integration (Optional)
1. Go to **Integrations** → **Slack**
2. Connect your Slack workspace
3. Choose channels for notifications:
   - Asset alerts
   - Budget notifications
   - Weekly reports

### Email Notifications
Configure email alerts for:
- Weekly asset summaries
- Budget threshold alerts
- Compliance issues
- Refresh recommendations

## Common First-Week Tasks

### Week 1 Checklist
- [ ] Complete MDM integration
- [ ] Import historical asset data
- [ ] Set up refresh policies
- [ ] Configure budget settings
- [ ] Invite team members
- [ ] Explore dashboard and reports
- [ ] Set up notifications
- [ ] Review AI recommendations

### Quick Wins
1. **Identify overdue refreshes**: Find devices that need immediate attention
2. **Validate asset assignments**: Ensure devices are assigned to current employees
3. **Review security compliance**: Identify devices with security issues
4. **Plan next quarter's budget**: Use AI forecasts for budget planning

## Troubleshooting

### MDM Connection Issues
- Verify server URL and credentials
- Check firewall and network access
- Ensure API permissions are enabled
- Contact support if issues persist

### Data Import Problems
- Verify CSV format matches template
- Check for duplicate serial numbers
- Ensure required fields are populated
- Review error messages and fix data

### Missing Devices
- Check MDM sync status
- Verify device enrollment in MDM
- Ensure devices are online and checking in
- Review import logs for errors

## Getting Help

### Resources
- **Help Center**: Comprehensive guides and tutorials
- **Video Tutorials**: Step-by-step video walkthroughs
- **API Documentation**: For custom integrations
- **Community Forum**: Connect with other users

### Contact Support
- **Email**: support@june.com
- **Chat**: Available in the app
- **Phone**: 1-800-JUNE-HELP (premium plans)
- **Response Time**: Within 4 hours for all plans

## Next Steps

Once you've completed the initial setup:

1. **Week 2**: Deep dive into reporting and analytics
2. **Week 3**: Optimize refresh policies based on data
3. **Week 4**: Set up advanced integrations and workflows
4. **Month 2**: Review and refine your asset management processes

---

**Need help getting started?** Our customer success team is here to help! Schedule a free onboarding call at [june.com/onboarding](https://june.com/onboarding) or contact us at support@june.com. 