# Node.js Crypto Module (`crypto`)

> **Interview Definition:**
> The **`crypto`** module is a built-in Node.js module that provides cryptographic functionality such as hashing, encryption, decryption, digital signatures, secure random number generation, and key derivation. It is commonly used for authentication, password security, data integrity, and secure communication.

---

# Table of Contents

1. What is the Crypto Module?
2. Why Do We Need It?
3. Importing the Module
4. Hashing
5. Encryption & Decryption
6. Random Bytes
7. UUID Generation
8. Password Hashing
9. HMAC
10. Digital Signatures
11. Real-world Examples
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is the Crypto Module?

The **`crypto`** module provides cryptographic operations.

It is a **Core Module**, so no installation is required.

```js
import crypto from "node:crypto";

// CommonJS
// const crypto = require("crypto");
```

---

# 2. Why Do We Need It?

Applications need security.

Examples:

- Store passwords securely
- Verify file integrity
- Encrypt sensitive data
- Generate secure tokens
- Sign and verify data
- Generate random values

---

# Architecture

```text
Application

      │

      ▼

  crypto Module

      │

      ▼

OpenSSL Library

      │

      ▼

Encryption / Hashing / Randomness
```

Node.js uses **OpenSSL** internally for most cryptographic operations.

---

# 3. Hashing

Hashing converts data into a fixed-length value.

Characteristics:

- One-way operation
- Same input → Same output
- Small input change → Completely different hash

Example:

```js
import crypto from "node:crypto";

const hash = crypto.createHash("sha256").update("Hello World").digest("hex");

console.log(hash);
```

Output

```text
a591a6d40bf420404...
```

Common algorithms:

- SHA-256
- SHA-512
- SHA-1 (legacy, avoid for new applications)

---

# Hashing Flow

```text
Password

↓

SHA-256

↓

Hash

↓

Store Hash
```

---

# 4. Encryption & Decryption

Unlike hashing, encryption is **reversible**.

### Encryption

```js
import crypto from "node:crypto";

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);

let encrypted = cipher.update("Secret Message", "utf8", "hex");

encrypted += cipher.final("hex");

console.log(encrypted);
```

---

### Decryption

```js
const decipher = crypto.createDecipheriv(algorithm, key, iv);

let decrypted = decipher.update(encrypted, "hex", "utf8");

decrypted += decipher.final("utf8");

console.log(decrypted);
```

Output

```text
Secret Message
```

---

# Hashing vs Encryption

| Hashing                       | Encryption                       |
| ----------------------------- | -------------------------------- |
| One-way                       | Two-way                          |
| Cannot recover original value | Can decrypt with the correct key |
| Password storage              | Secure communication             |

---

# 5. Random Bytes

Generate cryptographically secure random data.

```js
import crypto from "node:crypto";

const token = crypto.randomBytes(16);

console.log(token.toString("hex"));
```

Example

```text
8fd32b8a19b5...
```

Used for:

- Password reset tokens
- API keys
- Session IDs

---

# 6. UUID Generation

```js
import crypto from "node:crypto";

console.log(crypto.randomUUID());
```

Output

```text
550e8400-e29b-41d4-a716-446655440000
```

---

# 7. Password Hashing

A common approach is to use a password hashing algorithm such as **bcrypt**, **scrypt**, or **Argon2**. The `crypto` module includes **scrypt**.

Example:

```js
import crypto from "node:crypto";

crypto.scrypt("myPassword", "randomSalt", 64, (err, key) => {
  if (err) throw err;

  console.log(key.toString("hex"));
});
```

---

# 8. HMAC

HMAC (Hash-based Message Authentication Code) verifies both data integrity and authenticity.

```js
import crypto from "node:crypto";

const hmac = crypto
  .createHmac("sha256", "secret-key")
  .update("Hello World")
  .digest("hex");

console.log(hmac);
```

Used for:

- API request signing
- Webhooks
- JWT signatures (conceptually)

---

# 9. Digital Signatures

Digital signatures allow one party to sign data with a private key and another party to verify it with the corresponding public key.

Typical use cases:

- Software distribution
- Document signing
- Secure communication

Node.js provides APIs such as:

```js
crypto.sign();

crypto.verify();
```

---

# Real-world Examples

## Verify File Integrity

```text
Download File

↓

Generate SHA-256 Hash

↓

Compare Expected Hash

↓

Valid or Tampered
```

---

## Password Storage

```text
Password

↓

Salt

↓

Hash

↓

Database
```

Never store plain-text passwords.

---

## Password Reset Token

```js
const token = crypto.randomBytes(32).toString("hex");
```

---

## Generate Unique IDs

```js
const id = crypto.randomUUID();
```

---

# Common Interview Questions

### What is the `crypto` module?

A built-in Node.js module providing cryptographic functionality such as hashing, encryption, random number generation, and key derivation.

---

### Difference between hashing and encryption?

| Hashing            | Encryption                            |
| ------------------ | ------------------------------------- |
| One-way            | Two-way                               |
| Used for passwords | Used for secure communication         |
| No decryption      | Can be decrypted with the correct key |

---

### Why use `randomBytes()` instead of `Math.random()`?

`randomBytes()` is cryptographically secure, while `Math.random()` is not suitable for security-sensitive data.

---

### Why shouldn't passwords be encrypted?

Passwords are generally **hashed**, not encrypted. During login, the entered password is hashed again and compared with the stored hash. This avoids needing to decrypt stored passwords.

---

### Which hashing algorithms are commonly used?

- SHA-256 (general hashing)
- bcrypt (password hashing)
- scrypt (password hashing)
- Argon2 (password hashing)

---

# Quick Revision

| Method               | Purpose                  |
| -------------------- | ------------------------ |
| `createHash()`       | Generate hash            |
| `createCipheriv()`   | Encrypt data             |
| `createDecipheriv()` | Decrypt data             |
| `randomBytes()`      | Secure random values     |
| `randomUUID()`       | Generate UUID            |
| `scrypt()`           | Password hashing         |
| `createHmac()`       | Generate HMAC            |
| `sign()`             | Create digital signature |
| `verify()`           | Verify digital signature |

---

# Interview Answer

> **The `crypto` module is a built-in Node.js module that provides cryptographic functionality for building secure applications. It supports hashing, encryption, decryption, secure random number generation, password hashing, HMACs, and digital signatures. Hashing is commonly used for password storage, while encryption is used to protect sensitive data during storage or transmission. The module also provides secure APIs such as `randomBytes()` for generating tokens and `scrypt()` for password hashing. Internally, Node.js relies on OpenSSL to implement most of these cryptographic operations.**
