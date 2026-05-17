# 🚀 Installations Automation System (Google Apps Script)

A fully automated Google Apps Script system for managing installation/workspace data, archiving, reporting, and Drive structure generation.

Designed for real-world operations: stable, predictable, and fully hands-off after setup.

---

## 🧠 System Overview

This automation handles:

- 📦 Daily data archiving
- 🧹 Workspace cleanup & reset
- 📁 Monthly + yearly Google Drive structure
- 📊 Weekly & monthly reports via email
- ⚙️ Fully automated trigger-based execution

Everything runs inside Google Apps Script with Google Sheets + Drive integration.

---

## ⏱️ Automation Schedule

### 🌙 Daily (21:00 Israel Time)
- Archive completed/past rows into monthly sheets
- Reset workspace (keep 10 ready template rows)
- Ensure current & next month sheets exist

### 📊 Weekly (Friday 21:00)
- Sends weekly report via email

### 📅 Monthly (1st day of month)
- Sends previous month report

### 🗂️ Yearly (December 31)
- Creates next year folder
- Pre-generates 12 monthly spreadsheets

---

## 📂 Data Structure

### Workspace Sheet
Active working sheet where daily operations happen.

Columns:

A: Date
B: Day
C: ID
D: Status
E: Time
F: Name
G: MID


---

### Google Drive Structure


ROOT_FOLDER/
└── 2026/
├── 01_2026
├── 02_2026
├── .....
└── 12_2026


Each monthly file contains archived records.

---

## ⚙️ Setup Instructions

### 1. Open Apps Script
Go to:

Google Sheets → Extensions → Apps Script


### 2. Paste Script
Paste the full automation script into the editor.

### 3. Configure System
Fill in:

```js
CONFIG.WORKSPACE_SPREADSHEET_ID
CONFIG.ROOT_FOLDER_ID
CONFIG.REPORT_EMAIL
4. Set Timezone

Make sure your Google Sheet timezone is:

Asia/Jerusalem (UTC+3)
5. Create Triggers

Run once:

setupTriggers()
🔧 Manual Testing Tools

You can safely test the system anytime:

manualRunNow()                    // Full pipeline test
manualArchiveOnly()              // Only archive logic
manualSendWeeklyReport()         // Weekly email test
manualSendMonthlyReport()        // Monthly email test
manualCreateAllMonthsForYear()   // Pre-build yearly structure
🧩 Key Features
✔ Safe Execution
Try/catch error handling
No silent failures
Full logging system
✔ Smart Archiving
Automatically groups data by month
Removes processed rows safely (bottom-up delete logic)
✔ Workspace Optimization
Always keeps 10 ready template rows
Auto-prepares next working day entries
✔ Reporting System
Weekly + monthly aggregated stats
Email HTML report with styled dashboard
✔ Drive Auto Structure
Year folders auto-created
Monthly spreadsheets generated on demand
📊 Reporting Includes
Total installations
Breakdown by:
Status
Manager
Day of week
Clean HTML dashboard email (RTL support included)
🚀 Design Philosophy

This system is built on:

Stability over complexity
Predictable automation flow
Minimal manual intervention
Google-native tools only (Sheets + Drive + Apps Script)
🧪 Recommended Usage
Run manualRunNow() before first production activation
Verify Drive structure creation
Confirm email delivery
Then activate triggers
⚠️ Notes
Make sure Spreadsheet timezone is correct
Do not rename column structure without updating CONFIG
Do not delete _SYSTEM_LOGS sheet if added later
📌 Future Improvements (optional ideas)
Slack / Telegram notifications
Dashboard UI (Looker Studio)
Multi-workspace support
Role-based access control
⭐ Support

If this project helped you build a stable automation system, consider giving it a ⭐ on GitHub.

It helps a lot and keeps improvements coming.


