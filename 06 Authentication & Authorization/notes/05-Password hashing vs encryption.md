# Password Hashing vs Encryption

> **Interview Definition:**
> **Hashing** is a **one-way process** used to securely store passwords. Once a password is hashed, it **cannot be reversed** to its original form.
>
> **Encryption** is a **two-way process** used to protect sensitive data. Encrypted data **can be decrypted back** to its original form using a secret key.

---

# Table of Contents

1. What is Password Hashing?
2. What is Encryption?
3. Why Passwords Should Be Hashed
4. How Hashing Works
5. How Encryption Works
6. Hashing vs Encryption
7. Hashing Algorithms
8. Encryption Algorithms
9. Password Hashing with bcrypt
10. Password Verification
11. Real-world Examples
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is Password Hashing?

Hashing converts plain text into a fixed-length string called a **hash**.

```text id="hash001"
Password

↓

Hash Function

↓

Hash Value
```

Example

```text id="hash002"
Password

↓

hello123

↓

Hash

↓

9b74c9897bac770ffc029102a200c5de...
```

The original password **cannot be recovered** from the hash.

---

# 2. What is Encryption?

Encryption converts readable data into unreadable data.

```text id="hash003"
Plain Text

↓

Encryption Key

↓

Encrypted Data
```

Later

```text id="hash004"
Encrypted Data

↓

Decryption Key

↓

Original Text
```

Encryption is reversible.

---

# 3. Why Passwords Should Be Hashed

Imagine a database breach.

If passwords are stored like this:

```javascript id="hash005"
{
    email: "nitish@gmail.com",
    password: "hello123"
}
```

Anyone who gains access can read the password.

Instead

```javascript id="hash006"
{
    email: "nitish@gmail.com",
    password: "$2b$10$9cL2m8P..."
}
```

Even if the database is leaked, the original password isn't directly visible.

---

# 4. How Hashing Works

```text id="hash007"
Password

↓

Hash Function

↓

Hash

↓

Store in Database
```

During login

```text id="hash008"
Entered Password

↓

Hash Again

↓

Compare Hashes

↓

Match?

↓

Login Success
```

The original password is never stored.

---

# 5. How Encryption Works

```text id="hash009"
Message

↓

Encryption

↓

Cipher Text

↓

Store / Send

↓

Decrypt

↓

Original Message
```

Unlike hashing, encryption is designed to recover the original data.

---

# 6. Hashing vs Encryption

| Hashing            | Encryption                      |
| ------------------ | ------------------------------- |
| One-way            | Two-way                         |
| Cannot be reversed | Can be decrypted                |
| No decryption key  | Uses encryption/decryption keys |
| Used for passwords | Used for sensitive data         |
| Verification       | Data protection                 |

---

# 7. Common Hashing Algorithms

| Algorithm | Recommended for Passwords? |
| --------- | -------------------------- |
| MD5       | ❌ No                      |
| SHA-1     | ❌ No                      |
| SHA-256   | ❌ Not by itself           |
| bcrypt    | ✅ Yes                     |
| scrypt    | ✅ Yes                     |
| Argon2    | ✅ Recommended             |

> General-purpose hash functions like SHA-256 are excellent for integrity checks but are **too fast** for password storage unless combined with a dedicated password hashing scheme. Algorithms like bcrypt, scrypt, and Argon2 are intentionally slow to resist brute-force attacks.

---

# 8. Common Encryption Algorithms

| Algorithm | Usage                             |
| --------- | --------------------------------- |
| AES       | File & database encryption        |
| RSA       | Key exchange & digital signatures |
| ECC       | Modern public-key cryptography    |

Encryption is commonly used for:

- Credit card data
- API secrets
- Private documents
- Secure communication

---

# 9. Password Hashing with bcrypt

Install

```bash id="hash010"
pnpm add bcrypt
```

Hash password

```javascript id="hash011"
import bcrypt from "bcrypt";

const password = "hello123";

const hashedPassword = await bcrypt.hash(password, 10);

console.log(hashedPassword);
```

Output

```text id="hash012"
$2b$10$7lqY...
```

Notice

```text id="hash013"
hello123
```

is never stored.

---

# 10. Password Verification

User Login

```javascript id="hash014"
const isMatch = await bcrypt.compare(
  "hello123",

  hashedPassword,
);

console.log(isMatch);
```

Output

```text id="hash015"
true
```

Flow

```text id="hash016"
User Password

↓

bcrypt.compare()

↓

Stored Hash

↓

Match?

↓

Login
```

---

# 11. Real-world Examples

## Password

```text id="hash017"
Hash
```

---

## Credit Card Number

```text id="hash018"
Encrypt
```

---

## API Secret

```text id="hash019"
Encrypt
```

---

## File Storage

```text id="hash020"
Encrypt
```

---

## Login Password

```text id="hash021"
Hash
```

---

# 12. Best Practices

✅ Never store plain-text passwords.

✅ Use bcrypt, scrypt, or Argon2 for password hashing.

✅ Never try to decrypt a password.

✅ Use encryption only when the original data must be recovered.

✅ Use HTTPS to protect passwords while they are transmitted over the network.

---

# 13. Common Interview Questions

### What is Hashing?

A one-way transformation used for verification.

---

### What is Encryption?

A reversible transformation used to protect data.

---

### Why are passwords hashed instead of encrypted?

Because the application never needs to recover the original password. It only needs to verify whether the entered password matches the stored hash.

---

### Can hashed passwords be decrypted?

No.

Hashing is designed to be one-way.

---

### Which algorithm should be used for passwords?

bcrypt, scrypt, or Argon2.

---

### What does bcrypt compare?

It hashes the candidate password internally and checks whether it matches the stored hash.

---

# 14. Quick Revision

| Feature             | Hashing | Encryption |
| ------------------- | ------- | ---------- |
| One-way             | ✅      | ❌         |
| Reversible          | ❌      | ✅         |
| Uses Key            | ❌      | ✅         |
| Password Storage    | ✅      | ❌         |
| Credit Card Storage | ❌      | ✅         |
| API Secrets         | ❌      | ✅         |

---

# 15. Interview Answer

> **Hashing and encryption are both techniques for protecting data, but they serve different purposes. Hashing is a one-way process that converts data into a fixed-length hash and is primarily used for password storage because the original password cannot be recovered. During login, the entered password is hashed and compared with the stored hash. Encryption is a two-way process that transforms data using a cryptographic key, allowing it to be decrypted later. Encryption is appropriate for data such as credit card numbers, API keys, and confidential documents that must be recovered, whereas passwords should always be stored using dedicated password hashing algorithms such as bcrypt, scrypt, or Argon2.**
