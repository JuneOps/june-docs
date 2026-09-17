# Browser Extension Documentation Page Design

**Date**: 2026-04-09
**Status**: Approved

## Overview

Add a new "Agents & Extensions" tab to the June docs site with a single page covering the browser extension and the June Device Agent. The page is non-technical, aimed at IT admins evaluating or managing the extension.

## Navigation

- **New tab**: "Agents & Extensions" in `docs.json`
- **Group**: "Browser Extension"
- **Page**: `agents-extensions/browser-extension.mdx`

## Page Structure

### 1. Intro
- Chrome icon/badge to indicate Chrome-only support
- Brief description: tracks SaaS application usage across your organization's browsers

### 2. How It Works
CardGroup with 4 cards:
1. **Device Registration** - Identifies the user by browser profile email. If the June Device Agent is deployed via MDM, it also retrieves the device serial number for hardware-level identification.
2. **Configuration** - Pulls your org's tracked apps list from June. Refreshes daily.
3. **Usage Tracking** - Measures focus time on configured SaaS apps only.
4. **Reporting** - Sends usage data to June every 6 hours.

### 3. What It Tracks
Simple table:

| Data | Description |
|------|-------------|
| Application | Which configured SaaS app was in focus |
| Duration | Time spent actively using the app per day |
| Date | The calendar day the usage occurred |
| Timezone | User's local timezone |

Plus a Note callout: only tracks configured domains — no browsing history, page content, or keystrokes.

### 4. Permissions
AccordionGroup with plain-English explanations (no technical jargon):
- **Storage** - Stores usage data locally on the device
- **Alarms** - Schedules regular config refresh and data reporting
- **Tabs** - Detects which browser tab is currently focused
- **Native Messaging** - Communicates with the June Device Agent to get the device serial number
- **User Email** - Retrieves the browser profile email for user identification
- **All URLs** - Checks if the current page matches a configured app

### 5. June Device Agent
2-3 sentences:
- Lightweight native companion that provides the device serial number to the extension
- Deployed via MDM alongside the extension
- Communicates locally only, no network access

### 6. FAQ
Accordion Q&As:
- Does the extension track my browsing history?
- What happens if I'm offline?
- How often does it send data?
- Can I see what's being tracked?
- Does it affect browser performance?

### 7. Getting Started
Single Card linking to the in-app deployment guide.

## Design Decisions
- **Single page**: Only 2 products (extension + device agent), no need to split
- **Non-technical tone**: Target audience is IT admins, not developers
- **No installation details**: In-app guide covers deployment step-by-step
- **Chrome-only**: Indicated via icon/badge at top of page
