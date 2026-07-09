# Signed Cookies

> **Interview Definition:**  
> A **Signed Cookie** is a cookie whose value is digitally signed by the server using a secret key. The signature allows the server to detect whether the cookie has been modified by the client. Signed cookies **provide integrity**, but they **do not encrypt** the cookie value.

---

# Table of Contents

1. What are Signed Cookies?
2. Why Do We Need Signed Cookies?
3. How Signed Cookies Work
4. Signed vs Normal Cookies
5. Installing cookie-parser
6. Creating Signed Cookies
7. Reading Signed Cookies
8. Detecting Tampering
9. Signed Cookies vs Encrypted Cookies
10. Express.js Example
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What are Signed Cookies?

Normally,

a cookie looks like this

```text
theme=dark
```

The user can modify it.

```text
theme=light
```

The server cannot know whether it was changed.

With Signed Cookies

```text
theme=dark

↓

Signature Added

↓

Cookie Stored
```

If someone changes it,

the signature becomes invalid.

---

# 2. Why Do We Need Signed Cookies?

Imagine

```text
role=user
```

A malicious user changes it to

```text
role=admin
```

Without signing

```text
Server

↓

Cannot Detect Change
```

With signing

```text
Cookie Modified

↓

Signature Invalid

↓

Rejected
```

---

# 3. How Signed Cookies Work

```text
Server

↓

Cookie Value

↓

Secret Key

↓

Generate Signature

↓

Browser Stores Cookie

↓

Browser Sends Cookie

↓

Verify Signature

↓

Valid?

↓

Accept
```

The signature is generated using the server's secret.

---

# 4. Signed vs Normal Cookies

| Normal Cookie         | Signed Cookie                                   |
| --------------------- | ----------------------------------------------- |
| User can modify value | User can modify value but tampering is detected |
| No integrity check    | Integrity check                                 |
| No secret required    | Requires secret key                             |
| Easier to tamper with | Tampering is detected                           |

---

# 5. Installing cookie-parser

Install

```bash
pnpm add cookie-parser
```

Import

```javascript
import cookieParser from "cookie-parser";
```

Initialize

```javascript
app.use(cookieParser(process.env.COOKIE_SECRET));
```

The secret is used to sign and verify cookies.

---

# 6. Creating Signed Cookies

```javascript
app.get("/login", (req, res) => {
  res.cookie(
    "userId",

    "12345",

    {
      signed: true,

      httpOnly: true,
    },
  );

  res.send("Cookie Created");
});
```

Notice

```javascript
signed: true;
```

---

# 7. Reading Signed Cookies

Unsigned cookies

```javascript
req.cookies;
```

Signed cookies

```javascript
req.signedCookies;
```

Example

```javascript
app.get("/profile", (req, res) => {
  console.log(req.signedCookies.userId);
});
```

---

# 8. Detecting Tampering

Suppose

Browser Cookie

```text
userId=12345
```

User edits

```text
userId=99999
```

Server

```text
Verify Signature

↓

Failed

↓

Cookie Invalid
```

Express returns

```javascript
undefined;
```

for an invalid signed cookie.

---

# 9. Signed Cookies vs Encrypted Cookies

Many developers confuse these.

### Signed Cookie

```text
Readable

+

Tamper Detection
```

Example

```text
theme=dark
```

Anyone can read it.

---

### Encrypted Cookie

```text
Encrypted

↓

Cannot Read

↓

Cannot Modify
```

Express signed cookies **do not encrypt** values.

---

# 10. Express.js Example

```javascript
import express from "express";

import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/login", (req, res) => {
  res.cookie(
    "userId",

    "12345",

    {
      signed: true,

      httpOnly: true,
    },
  );

  res.send("Cookie Set");
});

app.get("/profile", (req, res) => {
  console.log(req.signedCookies.userId);

  res.send("Profile");
});
```

---

# 11. Best Practices

✅ Use a long random cookie secret.

✅ Store secrets in `.env`.

✅ Use HttpOnly.

✅ Use Secure in production.

✅ Use SameSite.

✅ Never store sensitive data in signed cookies.

Signed cookies detect modification—they **do not provide confidentiality**.

---

# 12. Common Interview Questions

### What is a Signed Cookie?

A cookie protected with a digital signature.

---

### Does signing encrypt the cookie?

No.

The value remains readable.

---

### What problem do Signed Cookies solve?

They detect tampering.

---

### Which middleware supports Signed Cookies?

```javascript
cookie - parser;
```

---

### Where are signed cookies stored?

```javascript
req.signedCookies;
```

---

# 13. Quick Revision

| Feature          | Signed Cookie |
| ---------------- | ------------- |
| Encrypted        | ❌            |
| Signed           | ✅            |
| Detect Tampering | ✅            |
| Readable         | ✅            |
| Uses Secret Key  | ✅            |

---

# 14. Interview Answer

> **A Signed Cookie is an HTTP cookie whose value is digitally signed using a server-side secret key. The signature allows the server to verify that the cookie has not been modified by the client. Signed cookies provide integrity but not confidentiality, meaning users can still read the cookie value, but any tampering can be detected. In Express.js, signed cookies are implemented using the `cookie-parser` middleware with a secret key, created using `signed: true`, and accessed through `req.signedCookies`.**

---

# ⭐ Interview Tips

## Signed Cookie Flow

```text
Server

↓

Cookie Value

↓

Secret Key

↓

Signature

↓

Browser

↓

Request

↓

Verify Signature

↓

Valid?

↓

Accept
```

---

## Cookie Types

```text
Normal Cookie

↓

Readable

↓

Modifiable


Signed Cookie

↓

Readable

↓

Modification Detected


Encrypted Cookie

↓

Unreadable

↓

Protected
```

---

# ⭐ Most Asked Interview Questions

### Q1. Can users still read Signed Cookies?

**Yes.**

Example

```text
theme=dark
```

The value is visible because signing is **not encryption**.

---

### Q2. Can users modify Signed Cookies?

Yes.

However,

```text
Modified Cookie

↓

Signature Check

↓

Fails

↓

Rejected
```

The server detects the change.

---

### Q3. Should JWTs be stored as Signed Cookies?

Not necessarily.

A JWT already contains its own cryptographic signature.

If stored in a cookie, you typically use security attributes such as:

- `HttpOnly`
- `Secure`
- `SameSite`

Signing the cookie itself is generally more useful for plain cookie values that don't already have integrity protection.

---

### Q4. When should Signed Cookies be used?

Use Signed Cookies when you want the browser to store data that **must not be modified** by the client, such as:

- User preferences
- Feature flags
- Shopping cart identifiers
- Lightweight state values

They are **not** a replacement for encryption or proper authentication.
