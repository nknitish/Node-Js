/**
 * ===========================================
 * Node.js Crypto Module Demo
 * ===========================================
 *
 * This file demonstrates:
 *
 * 1. Creating a SHA-256 Hash
 * 2. Why Hashing is Used
 * 3. Different Hash Algorithms
 * 4. Random Bytes
 * 5. UUID Generation
 */

import crypto from "node:crypto";

console.log("\n=================================");
console.log("1. SHA-256 Hash");
console.log("=================================");

/**
 * createHash()
 * ------------------------
 * Creates a Hash object.
 *
 * "sha256" is the hashing algorithm.
 */

const hash = crypto
  .createHash("sha256")

  /**
   * update()
   * ------------------------
   * Adds data to be hashed.
   *
   * You can call update() multiple times.
   */
  .update("Hello World")

  /**
   * digest()
   * ------------------------
   * Finalizes the hash.
   *
   * "hex" converts the hash
   * into a hexadecimal string.
   */
  .digest("hex");

console.log("Original Text : Hello World");
console.log("SHA-256 Hash  :", hash);

console.log("\n=================================");
console.log("2. Same Input = Same Hash");
console.log("=================================");

const hash1 = crypto.createHash("sha256").update("Hello World").digest("hex");

const hash2 = crypto.createHash("sha256").update("Hello World").digest("hex");

console.log(hash1 === hash2); // true

console.log("\n=================================");
console.log("3. Small Change = Completely Different Hash");
console.log("=================================");

const h1 = crypto.createHash("sha256").update("Hello World").digest("hex");

const h2 = crypto.createHash("sha256").update("hello World").digest("hex");

console.log("Hash 1:", h1);
console.log("Hash 2:", h2);

console.log("\n=================================");
console.log("4. Generate Secure Random Bytes");
console.log("=================================");

const token = crypto.randomBytes(16);

console.log(token);
console.log(token.toString("hex"));

console.log("\n=================================");
console.log("5. Generate UUID");
console.log("=================================");

console.log(crypto.randomUUID());

console.log("\n=================================");
console.log("Program Finished");
console.log("=================================");
