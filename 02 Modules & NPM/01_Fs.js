/**
 * ===========================================
 * Node.js File System (fs) Module Demo
 * ===========================================
 *
 * This file demonstrates the most commonly
 * used methods of the fs module.

 */

import fs from "fs";

const filePath = "./files/MyFile.txt";

/*----------------------------------------------------
1. Create / Overwrite a File (Synchronous)
-----------------------------------------------------*/

console.log("\n========== writeFileSync ==========");

fs.writeFileSync(filePath, "Hello World!");

console.log("✅ File created successfully.");

/*----------------------------------------------------
2. Create / Overwrite a File (Asynchronous)
-----------------------------------------------------*/

console.log("\n========== writeFile ==========");

fs.writeFile(filePath, "Hello from Async!", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("✅ Async write completed.");
});

/*----------------------------------------------------
3. Append Data (Synchronous)
-----------------------------------------------------*/

console.log("\n========== appendFileSync ==========");

fs.appendFileSync(filePath, "\nHow are you?");

console.log("✅ Text appended synchronously.");

/*----------------------------------------------------
4. Append Data (Asynchronous)
-----------------------------------------------------*/

console.log("\n========== appendFile ==========");

fs.appendFile(filePath, "\nI am good!", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("✅ Async append completed.");
});

/*----------------------------------------------------
5. Read File (Synchronous)
-----------------------------------------------------*/

console.log("\n========== readFileSync ==========");

const syncData = fs.readFileSync(filePath, "utf8");

console.log(syncData);

/*----------------------------------------------------
6. Read File (Asynchronous)
-----------------------------------------------------*/

console.log("\n========== readFile ==========");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(data);
});

/*----------------------------------------------------
7. Check if File Exists
-----------------------------------------------------*/

console.log("\n========== existsSync ==========");

if (fs.existsSync(filePath)) {
  console.log("✅ File Exists");
} else {
  console.log("❌ File Not Found");
}

/*----------------------------------------------------
8. Get File Information
-----------------------------------------------------*/

console.log("\n========== statSync ==========");

const stats = fs.statSync(filePath);

console.log({
  size: stats.size,
  isFile: stats.isFile(),
  isDirectory: stats.isDirectory(),
  createdAt: stats.birthtime,
  modifiedAt: stats.mtime,
});

/*----------------------------------------------------
9. Rename File
-----------------------------------------------------*/

// Uncomment to test

/*
fs.renameSync(
  "./files/MyFile.txt",
  "./files/MyRenamedFile.txt"
);

console.log("✅ File Renamed");
*/

/*----------------------------------------------------
10. Delete File
-----------------------------------------------------*/

// Uncomment only when you want to delete

/*
fs.unlinkSync(filePath);

console.log("✅ File Deleted");
*/

console.log("\n========== Program Finished ==========");
