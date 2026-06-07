# 🚀 Installations Automation System (Google Apps Script)

A lightweight Google Apps Script automation for managing installation records, monthly archiving, workspace reset, and Google Drive structure management.

Designed for reliability, low maintenance, and long-term operation.

---

# 🧠 What This Automation Does

Every day at 21:00 (Israel time), the system automatically:

* Archives completed installation rows
* Moves records into monthly archive sheets
* Organizes data into year/month Drive structure
* Resets the workspace
* Creates 10 fresh working rows
* Verifies monthly archive files exist
* Logs all activity
* Sends email alerts only when errors occur

No daily, weekly, or monthly reports are generated.

Reporting is handled separately through Looker Studio.

---

# ⚙️ Automation Flow

## Daily Run (21:00)

1. Validate configuration
2. Lock execution (prevent duplicate runs)
3. Archive valid rows from workspace
4. Route rows to correct monthly archive file
5. Normalize statuses
6. Delete archived rows
7. Rebuild workspace with fresh template rows
8. Verify current and next month archive files exist
9. Write audit log
10. Send email only if an error occurs

---

# 📂 Google Drive Structure

Archive files are automatically organized by year and month.

Example:

```text
installations/
└── 2026/
    ├── 2026_01
    ├── 2026_02
    ├── 2026_03
    ├── ...
    └── 2026_12
```

Each monthly file contains a sheet:

```text
2026_06
└── 062026
```

---

# 📋 Workspace Structure

Active working sheet:

```text
Installations monitoring
```

Columns:

| Column | Description |
| ------ | ----------- |
| A      | Date        |
| B      | Day         |
| C      | ID          |
| D      | Status      |
| E      | Time        |
| F      | Name        |
| G      | MID         |

---

# 📦 Archive Structure

Monthly archive sheets contain:

| Column | Description       |
| ------ | ----------------- |
| A      | Installation Date |
| B      | Day               |
| C      | ID                |
| D      | Status            |
| E      | Time              |
| F      | Name              |
| G      | MID               |
| H      | Archived At       |

---

# 🧹 Workspace Reset

After archiving:

* The workspace is cleared
* 10 new rows are generated
* Dropdowns and validations are preserved
* All rows receive the next working day
* Saturday is automatically skipped

---

# 🔒 Reliability Features

## LockService

Prevents concurrent executions.

Only one archive process can run at a time.

---

## Validation

Before execution:

* Workspace spreadsheet is verified
* Workspace sheet is verified
* Root Drive folder is verified
* Timezone is verified

---

## Audit Log

Every run is written to:

```text
Audit Log
```

Including:

* Run ID
* Date
* Time
* Status
* Archived rows count
* Errors

---

## Error Notifications

Emails are sent ONLY when:

* Archive fails
* Monthly sheet creation fails
* Year folder creation fails
* Configuration validation fails
* Any unhandled exception occurs

No routine success emails are sent.

---

# 🛠 Manual Functions

Validate configuration:

```javascript
manualValidateConfig()
```

Create trigger:

```javascript
manualSetupTriggers()
```

Run full automation:

```javascript
manualRunNow()
```

Archive only:

```javascript
manualArchiveOnly()
```

Create all months for current year:

```javascript
manualCreateAllMonthsForCurrentYear()
```

Create all months for next year:

```javascript
manualCreateAllMonthsForNextYear()
```

---

# ⚙️ Initial Setup

## 1. Open Apps Script

```text
Google Sheets
→ Extensions
→ Apps Script
```

---

## 2. Paste Script

Replace the default code with the automation script.

---

## 3. Configure IDs

Update:

```javascript
WORKSPACE_SPREADSHEET_ID
ROOT_FOLDER_ID
ERROR_EMAIL
```

---

## 4. Set Project Timezone

```text
Asia/Jerusalem
```

---

## 5. Validate

Run:

```javascript
manualValidateConfig()
```

---

## 6. Create Trigger

Run:

```javascript
manualSetupTriggers()
```

---

# 📅 Year-End Behavior

On December 31:

* Next year's folder is created
* All 12 monthly archive files are generated automatically

Example:

```text
2027/
├── 2027_01
├── 2027_02
├── ...
└── 2027_12
```

---

# 🎯 Design Goals

* Stability first
* Minimal maintenance
* Google-native stack only
* Predictable execution
* Error visibility
* Simple recovery process

---

# 📄 License

Internal operational automation.

Use at your own risk and always test in a non-production copy before deployment.
