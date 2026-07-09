# JWT Signing and Verification

> **Interview Definition:**
> **JWT Signing** is the process of generating a signed JSON Web Token after successful user authentication. The server creates a token by combining the **Header**, **Payload**, and a **Secret Key** (or Private Key).
>
> **JWT Verification** is the process of validating the token's signature to ensure it has not been tampered with and extracting the payload for authentication.

---

# Table of Contents

1. What is JWT Signing?
2. What is JWT Verification?
3. Why Do We Need Signing?
4. JWT Signing Flow
5. JWT Verification Flow
6. Installing jsonwebtoken
7. Creating (Signing) a JWT
8. Verifying a JWT
9. Authentication Middleware
10. Common JWT Errors
11. Signing vs Verification
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is JWT Signing?

JWT Signing is the process of generating a secure JWT.

The server creates:

```text
Header

↓

Payload

↓

Secret Key

↓

Signature

↓

JWT
```

Only the server should know the secret key.

---

# 2. What is JWT Verification?

Whenever a client sends a JWT,

the server checks

- Is the signature valid?
- Has the token expired?
- Was the token issued by us?

If everything is valid,

the server trusts the payload.

---

# 3. Why Do We Need Signing?

Imagine this payload:

```json
{
  "userId": "123",
  "role": "user"
}
```

A malicious user changes it to

```json
{
  "userId": "123",
  "role": "admin"
}
```

Without signing,

the server cannot detect the modification.

With signing,

```text
Payload Modified

↓

Signature Invalid

↓

Reject Request
```

---

# 4. JWT Signing Flow

```text
User Login

      │

      ▼

Verify Password

      │

      ▼

Create Payload

      │

      ▼

Sign JWT

      │

      ▼

Return Token

      │

      ▼

Client Stores JWT
```

---

# 5. JWT Verification Flow

```text
Client Request

      │

Authorization Header

      ▼

Extract JWT

      ▼

Verify Signature

      ▼

Check Expiration

      ▼

Extract Payload

      ▼

Authenticated
```

---

# 6. Installing jsonwebtoken

Install

```bash
npm install jsonwebtoken
```

or

```bash
pnpm add jsonwebtoken
```

Import

```javascript
import jwt from "jsonwebtoken";
```

---

# 7. Creating (Signing) a JWT

Basic Example

```javascript
import jwt from "jsonwebtoken";

const payload = {
  userId: "123",
  role: "admin",
};

const token = jwt.sign(payload, process.env.JWT_SECRET);

console.log(token);
```

---

### Add Expiration

```javascript
const token = jwt.sign(
  {
    userId: "123",
    role: "admin",
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  },
);
```

Supported values

```text
30s

15m

1h

7d

30d
```

---

### Real Login Example

```javascript
app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const isMatch = await bcrypt.compare(
    req.body.password,

    user.password,
  );

  if (!isMatch) {
    return res.status(401).send("Invalid Credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,

      role: user.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "1h",
    },
  );

  res.json({
    token,
  });
});
```

---

# 8. Verifying a JWT

Example

```javascript
import jwt from "jsonwebtoken";

const decoded = jwt.verify(
  token,

  process.env.JWT_SECRET,
);

console.log(decoded);
```

Output

```javascript
{
    userId: "123",
    role: "admin",
    iat: 1783200000,
    exp: 1783203600
}
```

---

### Invalid Token

```javascript
try {
  jwt.verify(
    token,

    process.env.JWT_SECRET,
  );
} catch (err) {
  console.log("Invalid Token");
}
```

---

# 9. Authentication Middleware

```javascript
import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token Missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    req.user = decoded;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
}
```

Usage

```javascript
router.get(
  "/profile",

  authenticate,

  (req, res) => {
    res.json(req.user);
  },
);
```

---

# 10. Common JWT Errors

### Invalid Signature

```text
JWT Modified

↓

Signature Invalid

↓

401 Unauthorized
```

---

### Expired Token

```text
Login

↓

JWT

↓

1 Hour

↓

Expired

↓

401 Unauthorized
```

---

### Missing Token

```http
GET /profile

Authorization Header Missing
```

↓

```text
401 Unauthorized
```

---

# 11. Signing vs Verification

| Signing             | Verification                       |
| ------------------- | ---------------------------------- |
| Creates JWT         | Validates JWT                      |
| Uses `jwt.sign()`   | Uses `jwt.verify()`                |
| Happens after login | Happens on every protected request |
| Uses secret key     | Uses same secret/public key        |
| Generates signature | Validates signature                |

---

# 12. Best Practices

✅ Store `JWT_SECRET` in `.env`.

✅ Use long random secrets.

✅ Always set expiration.

✅ Verify every token.

✅ Never trust the payload without verification.

✅ Use HTTPS.

---

# 13. Common Interview Questions

### What does `jwt.sign()` do?

Creates a signed JWT.

---

### What does `jwt.verify()` do?

Verifies the signature and returns the decoded payload if valid.

---

### Why do we need a secret key?

To generate and verify the JWT signature.

---

### Can anyone create a valid JWT?

No.

Only someone with the correct signing secret (or private key, depending on the algorithm) can create a valid signature.

---

### What happens if the payload changes?

The signature becomes invalid, and verification fails.

---

# 14. Quick Revision

| Method               | Purpose          |
| -------------------- | ---------------- |
| `jwt.sign()`         | Generate JWT     |
| `jwt.verify()`       | Verify JWT       |
| `JWT_SECRET`         | Sign & Verify    |
| `expiresIn`          | Token expiration |
| Authorization Header | Send JWT         |

---

# 15. Interview Answer

> **JWT Signing is the process of creating a JSON Web Token by combining a header, payload, and a cryptographic signature generated using a secret key or private key. This signature ensures that the token cannot be modified without detection. After a user successfully logs in, the server signs a JWT using `jwt.sign()` and sends it to the client. For every protected request, the client sends the token back, typically in the Authorization header using the Bearer scheme. The server verifies the token using `jwt.verify()`. If the signature is valid and the token has not expired, the server trusts the payload and authenticates the user.**

---

# ⭐ Interview Tips

## JWT Signing

```text
User Login

      │

      ▼

Verify Credentials

      │

      ▼

Create Payload

      │

      ▼

jwt.sign()

      │

      ▼

JWT Token
```

---

## JWT Verification

```text
Client Request

      │

Bearer Token

      ▼

jwt.verify()

      │

 ┌───────────────┐
 │               │
 ▼               ▼

Valid        Invalid

 │               │

 ▼               ▼

Continue      401
```

---

## JWT Authentication Lifecycle

```text
Login

↓

Generate JWT

↓

Store JWT

↓

API Request

↓

Verify JWT

↓

Protected Route
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why can't an attacker change the JWT payload?

Example:

Original payload

```json
{
  "role": "user"
}
```

Attacker changes it to

```json
{
  "role": "admin"
}
```

Flow

```text
Payload Modified

↓

Signature Doesn't Match

↓

jwt.verify()

↓

Throws Error

↓

401 Unauthorized
```

The signature protects the payload from tampering.

---

### Q2. What is the difference between `jwt.decode()` and `jwt.verify()`?

| `jwt.decode()`                           | `jwt.verify()`                     |
| ---------------------------------------- | ---------------------------------- |
| Only decodes the token                   | Verifies the signature and decodes |
| Doesn't check authenticity               | Confirms token integrity           |
| Should not be trusted for authentication | Safe for authentication            |

**Never use `jwt.decode()` to authenticate users.**

---

### Q3. Why should every protected route call `jwt.verify()`?

Each HTTP request is independent.

```text
Request 1

↓

Verified


Request 2

↓

Must Verify Again
```

The server must verify every incoming JWT because it cannot assume a previously verified token is still valid.

---

### Q4. What happens if the JWT expires?

Suppose the token is valid for:

```text
1 Hour
```

After one hour:

```text
Request

↓

jwt.verify()

↓

TokenExpiredError

↓

401 Unauthorized

↓

Client Refreshes Token

or

User Logs In Again
```

A production application typically issues a new access token using a **refresh token**, which you'll learn in the next topics.
