# 📦 Yearly Backup Automation System (Google Apps Script)

A lightweight, production-safe automation system that builds and maintains a structured Google Drive backup hierarchy using Google Apps Script.

This system is designed for **idempotent execution, safe automation, and long-term scalability**.

---

## 🧭 System Purpose

This script ensures a persistent and predictable backup structure inside Google Drive.

It is designed for:

- Automated data organization
- Monthly reporting pipelines
- System-generated backups
- ETL staging structures
- Long-term archival systems

---

## 🏗 Architecture Overview

The system generates the following structure:


project_backup/
└── YEAR/
├── 01_January (Google Sheet)
├── 02_February (Google Sheet)
├── 03_March
├── ...
└── 12_December


### Key Design Principles

- **Idempotent execution** → safe to run unlimited times
- **Non-destructive logic** → never overwrites existing files
- **Self-healing structure** → recreates missing components
- **Time-aware behavior** → prepares next year in December
- **Zero manual maintenance required**

---

## ⚙️ Core Function

### Entry Point

```javascript
createYearStructure()

This is the only function required for execution.

It can be run:

manually
via time trigger
via external automation (e.g. n8n, webhook, etc.)
🔄 Execution Flow
Acquire execution lock (prevents parallel runs)
Verify or create root folder (project_backup)
Detect current year
If month = December → switch to next year
Verify or create year folder
Scan existing files (performance optimization)
Create missing monthly Google Sheets only
Log execution result
Send failure notification if needed
🛡 Reliability Model
Safe Execution Guarantees
Scenario	Behavior
Script re-run	No duplicates created
Partial failure	Only failed step is affected
Concurrent triggers	Blocked via LockService
Missing folder	Automatically recreated
Missing sheet	Automatically recreated
📊 Observability & Monitoring

The system includes built-in lightweight observability:

Logs

Stored via:

Logger.log()
Script Properties (last_log, last_error)
Failure Handling

On critical failure:

Execution is captured
Error stack is logged
Email notification is sent to script owner
📬 Notifications

If a failure occurs:

Email alert is sent automatically
Includes:
timestamp
error message
stack trace

This ensures zero-silent-failure behavior in production environments.

🚀 Deployment Guide
1. Setup
Open Google Apps Script:
https://script.google.com/
Create a new project
Paste the script file:
auto_backup_sheets.gs
2. Execution

Run manually:

createYearStructure();
3. Recommended Trigger Setup

Set a time-driven trigger:

Frequency: Monthly or Weekly
Function: createYearStructure
⚙️ Configuration

Edit only if necessary:

const CONFIG = {
  ROOT_FOLDER_NAME: "project_backup"
};
📅 Time-Based Behavior
Condition	Behavior
Normal month	Current year structure
December	Prepares next year automatically
📌 System Characteristics
Lightweight (no external dependencies)
Google-native (Drive + Sheets API only)
Stateless execution model
Safe for enterprise automation
Compatible with trigger-based pipelines
🔧 Extension Points (Recommended)

This system is intentionally minimal and extensible.

Future enhancements may include:

Observability Layer
Telegram / Slack notifications
Centralized log dashboard
Execution history tracking
Data Layer
Template-based sheet generation
Pre-filled monthly reports
Structured schema inside sheets
Automation Layer
n8n integration
Webhook triggers
Event-driven execution
Reliability Layer
Retry mechanism for Drive failures
Rate-limit protection
Batch processing mode
⚠️ Operational Notes
Requires Google Drive + Sheets permissions
Must be executed under authorized Google account
Subject to Google Apps Script quotas
Best used with scheduled triggers (not manual execution only)
⭐ Maintenance Philosophy

This system follows:

"Minimal logic, maximum reliability"

It is intentionally designed to be:

predictable
debuggable
safe under failure
easy to extend
🧠 Summary

This is not just a script.

It is a self-maintaining yearly data structure engine for Google Drive.


---

## If you want next upgrade (high level)

I can turn this into a full system package:

### 🚀 “Enterprise version”
- n8n integration flow
- Telegram alerts dashboard
- execution analytics
- retry queue system
- multi-drive support
- per-client isolation mode

Just say 👍
