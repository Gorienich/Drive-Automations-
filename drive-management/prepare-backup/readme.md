# 📦 Yearly Backup Flow

This flow automatically creates a structured backup system in Google Drive using Google Apps Script.

---

## 🚀 Overview

This script builds and maintains the following structure:

```
project_backup/
└── YEAR/
    ├── 01_January (Google Sheet)
    ├── 02_February
    ├── ...
    └── 12_December
```

It ensures your backup system is always ready and organized.

---

## ✅ Features

- 📁 Creates root folder (`project_backup`) if missing  
- 📂 Creates year folder dynamically (e.g., `2026`)  
- 📄 Creates 12 monthly Google Sheets  
- 🔁 Safe to run multiple times (no duplicates)  
- 📅 Automatically prepares next year in December  
- 🧠 Simple and scalable logic  

---

## 📜 Script

**File:** `auto_backup_sheets.gs`

### Main Function

```javascript
createYearStructure()
```

---

## ⚙️ How It Works

1. Checks if the root folder exists → creates if missing  
2. Detects current year  
3. If current month is December → switches to next year  
4. Creates a year folder if it doesn't exist  
5. Creates monthly sheets only if they are missing  

---

## 🧑‍💻 How to Use

1. Open [Google Apps Script](https://script.google.com/)
2. Create a new project  
3. Copy the script from this repository  
4. Run `createYearStructure()`  
5. Grant required permissions  

---

## 🔄 Behavior

| Condition        | Result                          |
|----------------|--------------------------------|
| Folder exists   | Reused                         |
| Sheet exists    | Skipped                        |
| December run    | Next year auto-created         |
| Re-run script   | No duplicates created          |

---

## 🛠 Configuration (Optional)

You can modify:

```javascript
var rootFolderName = "project_backup";
```

To change the root folder name.

---

## 📌 Use Cases

- Backup systems
- Monthly reporting workflows
- Data collection pipelines
- ETL staging storage

---

## 🔮 Future Improvements

- Add template data inside sheets  
- Add automated triggers (monthly run)  
- Add logging and monitoring  
- Integrate with ETL workflows  

---

## ⚠️ Notes

- Requires Google account permissions  
- Uses Google Drive and Google Sheets APIs  
- Best used with scheduled triggers for automation  

---

## ⭐ Support

If you found this useful, consider giving the project a star ⭐
