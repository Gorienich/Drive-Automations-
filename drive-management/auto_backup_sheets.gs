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
  var rootFolderName = "project_backup"; // root folder
  var rootFolders = DriveApp.getFoldersByName(rootFolderName);

  // Create root folder if not exists
  var rootFolder = rootFolders.hasNext() 
    ? rootFolders.next() 
    : DriveApp.createFolder(rootFolderName);

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth(); // 0 = Jan, 11 = Dec

  // If December → prepare next year
  if (month === 11) {
    year = year + 1;
  }

  var yearFolderName = year.toString();
  var yearFolders = rootFolder.getFoldersByName(yearFolderName);

  // Create year folder if not exists
  var yearFolder = yearFolders.hasNext()
    ? yearFolders.next()
    : rootFolder.createFolder(yearFolderName);

  var months = [
    "01_January", "02_February", "03_March",
    "04_April", "05_May", "06_June",
    "07_July", "08_August", "09_September",
    "10_October", "11_November", "12_December"
  ];

  // Create monthly sheets if not exist
  for (var i = 0; i < months.length; i++) {
    var fileName = months[i];
    var existingFiles = yearFolder.getFilesByName(fileName);

    if (!existingFiles.hasNext()) {
      var newSheet = SpreadsheetApp.create(fileName);
      var file = DriveApp.getFileById(newSheet.getId());
      yearFolder.addFile(file);
      DriveApp.getRootFolder().removeFile(file); // remove from My Drive root
    }
  }

  Logger.log("Year structure ready: " + year);
}