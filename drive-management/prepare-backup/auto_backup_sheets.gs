/**
 * MAIN FUNCTION
 * This builds a simple backup system in Google Drive.
 *
 * Structure:
 * Project/
 *   └── data/
 *       └── YEAR/
 *           ├── 01-January_backup (Sheet)
 *           ├── 02-February_backup
 *           └── ...
 *
 * It also:
 * ✅ Creates missing folders
 * ✅ Creates missing sheets
 * ✅ In December → prepares next year automatically
 */

const CONFIG = {
  ROOT_FOLDER_NAME: "project_backup",
  MONTHS: [
    "01_January", "02_February", "03_March",
    "04_April", "05_May", "06_June",
    "07_July", "08_August", "09_September",
    "10_October", "11_November", "12_December"
  ],
  NOTIFY_EMAIL: Session.getActiveUser().getEmail()
};

/**
 * MAIN ENTRY POINT (safe for triggers)
 */
function createYearStructure() {
  const lock = LockService.getScriptLock();
  let rootFolder;

  try {
    lock.waitLock(30000); // wait max 30s

    logInfo("Starting backup structure creation");

    rootFolder = getOrCreateRootFolder();
    const { year, yearFolder } = getOrCreateYearFolder(rootFolder);

    createMonthlySheets(yearFolder);

    logInfo("Backup structure completed successfully for year: " + year);

  } catch (err) {
    logError("CRITICAL FAILURE in createYearStructure", err);
    notifyFailure(err);

  } finally {
    lock.releaseLock();
  }
}

/**
 * ROOT FOLDER HANDLING
 */
function getOrCreateRootFolder() {
  try {
    const folders = DriveApp.getFoldersByName(CONFIG.ROOT_FOLDER_NAME);

    if (folders.hasNext()) {
      return folders.next();
    }

    const folder = DriveApp.createFolder(CONFIG.ROOT_FOLDER_NAME);
    logInfo("Created root folder");
    return folder;

  } catch (e) {
    throw new Error("Root folder creation failed: " + e.message);
  }
}

/**
 * YEAR FOLDER HANDLING
 */
function getOrCreateYearFolder(rootFolder) {
  try {
    let year = new Date().getFullYear();

    // December pre-generation logic
    if (new Date().getMonth() === 11) {
      year += 1;
    }

    const yearName = String(year);
    const folders = rootFolder.getFoldersByName(yearName);

    let yearFolder;

    if (folders.hasNext()) {
      yearFolder = folders.next();
      logInfo("Year folder exists: " + yearName);
    } else {
      yearFolder = rootFolder.createFolder(yearName);
      logInfo("Created year folder: " + yearName);
    }

    return { year, yearFolder };

  } catch (e) {
    throw new Error("Year folder handling failed: " + e.message);
  }
}

/**
 * MONTHLY SHEETS CREATION
 */
function createMonthlySheets(yearFolder) {
  try {
    const existingFiles = {};
    const files = yearFolder.getFiles();

    // Cache existing files (optimization)
    while (files.hasNext()) {
      const f = files.next();
      existingFiles[f.getName()] = true;
    }

    CONFIG.MONTHS.forEach(name => {
      if (!existingFiles[name]) {
        createSheet(yearFolder, name);
      }
    });

  } catch (e) {
    throw new Error("Monthly sheet creation failed: " + e.message);
  }
}

/**
 * CREATE SINGLE SHEET
 */
function createSheet(folder, name) {
  try {
    const spreadsheet = SpreadsheetApp.create(name);
    const file = DriveApp.getFileById(spreadsheet.getId());

    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file); // clean root drive

    logInfo("Created sheet: " + name);

  } catch (e) {
    logError("Failed to create sheet: " + name, e);
  }
}

/**
 * LOGGING SYSTEM
 */
function logInfo(message) {
  Logger.log("[INFO] " + message);
  PropertiesService.getScriptProperties().setProperty(
    "last_log",
    new Date().toISOString() + " | INFO | " + message
  );
}

function logError(message, error) {
  Logger.log("[ERROR] " + message + " | " + (error?.message || error));

  PropertiesService.getScriptProperties().setProperty(
    "last_error",
    new Date().toISOString() + " | ERROR | " + message + " | " + (error?.message || error)
  );
}

/**
 * FAILURE NOTIFICATION SYSTEM
 */
function notifyFailure(error) {
  try {
    const subject = "🚨 Backup System Failure";
    const body =
      "Your Google Drive backup system failed.\n\n" +
      "Time: " + new Date() + "\n\n" +
      "Error:\n" + (error?.stack || error);

    MailApp.sendEmail(CONFIG.NOTIFY_EMAIL, subject, body);

  } catch (e) {
    Logger.log("Failed to send failure notification: " + e.message);
  }
}

/**
 * OPTIONAL: HEALTH CHECK FUNCTION
 */
function systemHealthCheck() {
  const lastError = PropertiesService.getScriptProperties().getProperty("last_error");
  const lastLog = PropertiesService.getScriptProperties().getProperty("last_log");

  Logger.log("=== SYSTEM HEALTH ===");
  Logger.log("Last Log: " + lastLog);
  Logger.log("Last Error: " + lastError);
}
