# Browser Extension Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a new "Agents & Extensions" tab to the June docs with a Browser Extension page covering how it works, what it tracks, permissions, the device agent, and FAQ.

**Architecture:** Single new MDX page at `agents-extensions/browser-extension.mdx` using Mintlify components (CardGroup, AccordionGroup, Note, Icon). Navigation added as a new tab in `docs.json`.

**Tech Stack:** Mintlify, MDX

---

### Task 1: Create the browser extension page directory

**Files:**
- Create: `agents-extensions/` directory

**Step 1: Create directory**

```bash
mkdir -p agents-extensions
```

**Step 2: Commit**

```bash
git add agents-extensions
git commit -m "chore: create agents-extensions directory"
```

---

### Task 2: Create the browser extension MDX page

**Files:**
- Create: `agents-extensions/browser-extension.mdx`

**Step 1: Create the page with all sections**

Write the following to `agents-extensions/browser-extension.mdx`:

```mdx
---
title: 'Browser Extension'
description: 'Track SaaS application usage across your organization with the June browser extension'
---

<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
  <Icon icon="chrome" size={24} />
  <span>Available for Google Chrome</span>
</div>

The June browser extension gives your organization visibility into which SaaS applications employees actively use and for how long. It runs silently in the background, only tracking the applications your organization has configured.

## What you'll learn
- How the extension works at a high level
- What data it collects and what it doesn't
- What permissions it needs and why
- How the June Device Agent complements it

## How It Works

<CardGroup cols={2}>
  <Card title="Device Registration" icon="user-check">
    Identifies the user by their browser profile email. If the June Device Agent is deployed via MDM, it also retrieves the device serial number for hardware-level identification.
  </Card>

  <Card title="Configuration" icon="gear">
    Pulls your organization's list of tracked applications from June. This list refreshes automatically once a day.
  </Card>

  <Card title="Usage Tracking" icon="chart-line">
    Measures how long each configured application has active browser focus. Only tracks domains your organization has explicitly configured.
  </Card>

  <Card title="Reporting" icon="paper-plane">
    Sends collected usage data back to June every 6 hours. Data older than 30 days is automatically discarded from the device.
  </Card>
</CardGroup>

## What It Tracks

| Data | Description |
|------|-------------|
| **Application** | Which configured SaaS app was in focus |
| **Duration** | Time spent actively using the app per day |
| **Date** | The calendar day the usage occurred |
| **Timezone** | The user's local timezone |

<Note>
The extension **only** tracks domains explicitly configured by your organization. It does not track browsing history, page content, keystrokes, or any activity on non-configured domains.
</Note>

## Permissions

The extension requests the following permissions, each for a specific purpose:

<AccordionGroup>
  <Accordion title="Storage" icon="hard-drive">
    Stores usage data locally on the device between reporting intervals. This ensures no data is lost if the device goes offline.
  </Accordion>

  <Accordion title="Alarms" icon="clock">
    Schedules regular tasks like refreshing the app configuration and sending usage reports on a recurring basis.
  </Accordion>

  <Accordion title="Tabs" icon="window-restore">
    Detects which browser tab is currently in focus so the extension can measure active time on configured applications.
  </Accordion>

  <Accordion title="Native Messaging" icon="message-dots">
    Communicates with the June Device Agent (if installed) to retrieve the device's serial number for hardware identification.
  </Accordion>

  <Accordion title="Idle Detection" icon="clock-rotate-left">
    Pauses tracking when you step away so only active usage is counted.
  </Accordion>

  <Accordion title="User Email" icon="envelope">
    Retrieves the browser profile email address to identify which user is associated with the usage data.
  </Accordion>

  <Accordion title="All URLs" icon="globe">
    Allows the extension to check whether the current page matches one of your organization's configured applications. No page content is read or collected.
  </Accordion>
</AccordionGroup>

## June Device Agent

The June Device Agent is a lightweight companion application that provides the device serial number to the browser extension. It is deployed via MDM alongside the extension.

The agent communicates locally only — it does not make any network requests. Its sole purpose is to read the device serial number and pass it to the extension for hardware-level identification.

## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="Does the extension track my browsing history?">
    No. The extension only measures how long configured applications are in focus. It does not record URLs, page content, keystrokes, or any activity on domains your organization hasn't configured.
  </Accordion>

  <Accordion title="What happens if I'm offline?">
    Usage data is stored locally on the device. Once connectivity returns, the extension sends the accumulated data on its next reporting cycle. Data older than 30 days is automatically discarded.
  </Accordion>

  <Accordion title="How often does it send data?">
    The extension reports usage data every 6 hours. It only sends data for previous days to avoid conflicts with ongoing tracking.
  </Accordion>

  <Accordion title="Can I see what's being tracked?">
    Your IT administrator configures which applications are tracked through June's dashboard. Contact your IT team if you'd like to know which apps are included.
  </Accordion>

  <Accordion title="Does it affect browser performance?">
    The extension has minimal impact on browser performance. It only checks whether the current domain matches a configured application — it does not scan or modify page content.
  </Accordion>
</AccordionGroup>

## Getting Started

<Card title="Deploy the Browser Extension" icon="rocket" href="https://app.juneops.com">
  Follow the step-by-step deployment guide in the June dashboard to roll out the extension to your organization.
</Card>
```

**Step 2: Verify the file renders valid MDX**

Visually inspect the file for syntax issues — balanced tags, proper frontmatter, no unclosed components.

**Step 3: Commit**

```bash
git add agents-extensions/browser-extension.mdx
git commit -m "feat: add browser extension documentation page"
```

---

### Task 3: Add the Agents & Extensions tab to navigation

**Files:**
- Modify: `docs.json` (navigation.tabs array, insert before the Changelog tab)

**Step 1: Add the new tab**

Insert the following tab object into the `navigation.tabs` array in `docs.json`, before the Changelog tab (which is currently the last entry):

```json
{
  "tab": "Agents & Extensions",
  "groups": [
    {
      "group": "Browser Extension",
      "pages": [
        "agents-extensions/browser-extension"
      ]
    }
  ]
}
```

This goes between the "Authentication & Security" tab and the "Changelog" tab.

**Step 2: Verify docs.json is valid JSON**

```bash
cat docs.json | python3 -m json.tool > /dev/null
```

Expected: no output (valid JSON).

**Step 3: Commit**

```bash
git add docs.json
git commit -m "feat: add Agents & Extensions tab to navigation"
```

---

### Task 4: Local preview verification

**Step 1: Start the Mintlify dev server**

```bash
npx mintlify dev
```

**Step 2: Verify in browser**

Check:
- [ ] "Agents & Extensions" tab appears in the navigation
- [ ] Browser Extension page loads without errors
- [ ] Chrome icon/badge renders at the top
- [ ] CardGroup displays 4 cards in a 2-column grid
- [ ] What It Tracks table renders correctly
- [ ] Note callout renders with correct styling
- [ ] All 6 permission accordions expand/collapse
- [ ] All 5 FAQ accordions expand/collapse
- [ ] Getting Started card links to the dashboard

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address browser extension page rendering issues"
```
