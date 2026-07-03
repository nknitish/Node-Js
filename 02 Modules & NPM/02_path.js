/**
 * ============================================
 * Node.js Path Module Demo
 * ============================================
 *
 * This file demonstrates:
 * 1. path.join()
 * 2. path.resolve()
 * 3. Reading a file using fs + path
 *
 * Folder Structure:
 *
 * project/
 * │
 * ├── path-demo.js
 * └── files/
 *      └── MyFile.txt
 */

import fs from "fs";
import path from "path";

console.log("\n==============================");
console.log("1. path.join()");
console.log("==============================");

/**
 * Joins path segments together.
 * Returns a platform-independent path.
 */
const filePath = path.join("files", "MyFile.txt");

console.log("Joined Path:");
console.log(filePath);

/*
Output (Windows)
files\MyFile.txt

Output (Linux/macOS)
files/MyFile.txt
*/

console.log("\n==============================");
console.log("2. Read File using fs");
console.log("==============================");

/**
 * Read the file using the joined path.
 */
const fileContent = fs.readFileSync(filePath, "utf8");

console.log(fileContent);

console.log("\n==============================");
console.log("3. path.resolve()");
console.log("==============================");

/**
 * Creates an absolute path.
 */
const absolutePath = path.resolve("files", "MyFile.txt");

console.log(absolutePath);

/*
Example Output:

/Users/nitish/project/files/MyFile.txt
*/

console.log("\n==============================");
console.log("4. Difference");
console.log("==============================");

console.log("path.join()    ->", filePath);
console.log("path.resolve() ->", absolutePath);

/*
path.join()
----------------
✓ Joins path segments
✓ Usually returns a relative path

Example:
files/MyFile.txt


path.resolve()
----------------
✓ Returns an absolute path

Example:
/Users/nitish/project/files/MyFile.txt
*/

console.log("\n==============================");
console.log("Program Finished");
console.log("==============================");

const url = `files/myFile.txt`;
console.log(path.basename(url)); //myFile.txt
console.log(path.dirname(url)); //files
console.log(path.resolve(url)); ///Users/nitish/Workspace/NodeJS/02 Modules & NPM/files/myFile.txt
console.log(path.extname(url)); //.txt
console.log(path.parse(url));
