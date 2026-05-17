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

 function createYearStructure() {
  try {
    // === CONFIG ===
    var CONFIG = {
      ROOT_FOLDER: "project_backup",
      CREATE_NEXT_YEAR_IN_DECEMBER: true
    };

    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();

    // Handle December logic
    if (CONFIG.CREATE_NEXT_YEAR_IN_DECEMBER && month === 11) {
      year++;
      Logger.log("📅  detected → Preparing next year: " + year);
    }

    // === ROOT FOLDER ===
    var rootFolder = getOrCreateFolder(CONFIG.ROOT_FOLDER);

    // === YEAR FOLDER ===
    var yearFolder = getOrCreateFolder(year.toString(), rootFolder);

    var months = [
      "01_January", "02_February", "03_March",
      "04_April", "05_May", "06_June",
      "07_July", "08_August", "09_September",
      "10_October", "11_November", "12_December"
    ];

    // === CREATE SHEETS ===
    for (var i = 0; i < months.length; i++) {
      var fileName = months[i];

      if (!yearFolder.getFilesByName(fileName).hasNext()) {
        var sheet = SpreadsheetApp.create(fileName);
        var file = DriveApp.getFileById(sheet.getId());

        yearFolder.addFile(file);
        DriveApp.getRootFolder().removeFile(file);

        Logger.log("✅ Created: " + fileName);
      } else {
        Logger.log("⏭ Skipped (exists): " + fileName);
      }
    }

    Logger.log("🎉 Year ready: " + year);

  } catch (error) {
    Logger.log("❌ Error: " + error.message);
  }
}


/**
 * Helper: Get or create folder
 */
function getOrCreateFolder(name, parent) {
  var folders = parent 
    ? parent.getFoldersByName(name)
    : DriveApp.getFoldersByName(name);

  if (folders.hasNext()) {
    return folders.next();
  }

  return parent 
    ? parent.createFolder(name)
    : DriveApp.createFolder(name);
}
