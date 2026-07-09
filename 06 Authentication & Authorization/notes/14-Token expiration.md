# Token Expiration

> **Interview Definition:**  
> **Token Expiration** is the process of assigning a limited lifetime to a JWT. After the expiration time is reached, the token becomes invalid and can no longer be used to access protected resources. Token expiration reduces the impact of stolen or leaked tokens.

---

# Table of Contents

1. What is Token Expiration?
2. Why Do We Need Token Expiration?
3. How Token Expiration Works
4. JWT Expiration Claim (`exp`)
5. Setting Expiration
6. Token Lifecycle
7. Access Token vs Refresh Token Expiration
8. Handling Expired Tokens
9. Express.js Example
10. Common Expiration Strategies
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is Token Expiration?

JWTs should not live forever.

Instead,

they are given an expiration time.

```text
JWT

↓

Valid

↓

Expires

↓

Invalid
```

After expiration,

the server rejects the token.

---

# 2. Why Do We Need Token Expiration?

Imagine a token never expires.

```text
User Login

↓

JWT

↓

Attacker Steals Token

↓

Unlimited Access
```

Very dangerous.

Instead,

```text
JWT

↓

15 Minutes

↓

Automatically Invalid
```

Even if stolen,

the attack window is limited.

---

# 3. How Token Expiration Works

```text
User Login

↓

Generate JWT

↓

Set Expiration

↓

Return JWT

↓

Client Sends JWT

↓

Server Checks exp

↓

Valid?

↓

Access Granted
```

Once expired,

```text
Request

↓

Expired JWT

↓

401 Unauthorized
```

---

# 4. JWT Expiration Claim (`exp`)

JWT has a built-in claim called:

```text
exp
```

Example Payload

```json
{
  "userId": "123",

  "role": "admin",

  "iat": 1783200000,

  "exp": 1783203600
}
```

Meaning

| Claim | Description     |
| ----- | --------------- |
| iat   | Issued At       |
| exp   | Expiration Time |

The values are stored as **Unix timestamps (seconds since January 1, 1970 UTC)**.

---

# 5. Setting Expiration

Using jsonwebtoken

```javascript
import jwt from "jsonwebtoken";

const token = jwt.sign(
  {
    userId: "123",
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "15m",
  },
);
```

Other examples

```javascript
expiresIn: "30s";

expiresIn: "10m";

expiresIn: "1h";

expiresIn: "7d";

expiresIn: "30d";
```

You can also specify seconds.

```javascript
expiresIn: 3600;
```

---

# 6. Token Lifecycle

```text
Login

↓

Generate JWT

↓

Store JWT

↓

API Requests

↓

JWT Expires

↓

401 Unauthorized

↓

Refresh Token

↓

New JWT
```

---

# 7. Access Token vs Refresh Token Expiration

| Token         | Typical Expiration |
| ------------- | ------------------ |
| Access Token  | 5–30 Minutes       |
| Refresh Token | 7–30 Days          |

Example

```text
Login

↓

Access Token

15 Minutes

↓

Refresh Token

30 Days
```

After 15 minutes,

the Refresh Token generates a new Access Token.

---

# 8. Handling Expired Tokens

When verifying

```javascript
try {
  jwt.verify(
    token,

    process.env.JWT_SECRET,
  );
} catch (err) {
  console.log(err.name);
}
```

Possible Output

```text
TokenExpiredError
```

Response

```javascript
res.status(401).json({
  message: "Token Expired",
});
```

---

# 9. Express.js Example

Generate JWT

```javascript
const accessToken = jwt.sign(
  {
    userId: user._id,
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "15m",
  },
);
```

Verify JWT

```javascript
try {
  const decoded = jwt.verify(
    token,

    process.env.JWT_SECRET,
  );

  req.user = decoded;

  next();
} catch (err) {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token Expired",
    });
  }

  return res.status(401).json({
    message: "Invalid Token",
  });
}
```

---

# 10. Common Expiration Strategies

### Short Access Token

```text
15 Minutes
```

↓

```text
Secure

↓

Requires Refresh
```

---

### Long Access Token

```text
30 Days
```

↓

```text
Convenient

↓

Less Secure
```

---

### Recommended

```text
Access Token

↓

15 Minutes


Refresh Token

↓

30 Days
```

---

# 11. Best Practices

✅ Use short-lived Access Tokens.

✅ Never create tokens without expiration.

✅ Use Refresh Tokens.

✅ Rotate Refresh Tokens.

✅ Use HTTPS.

✅ Verify expiration on every request.

---

# 12. Common Interview Questions

### Why do JWTs expire?

To reduce the damage if a token is stolen.

---

### Which claim stores expiration?

`exp`

---

### What happens after expiration?

The server rejects the token.

---

### Does jwt.verify() check expiration?

Yes.

It verifies both:

- Signature
- Expiration

---

### Can expiration be disabled?

Yes,

but it is **strongly discouraged** for authentication tokens.

---

# 13. Quick Revision

| Claim        | Purpose                         |
| ------------ | ------------------------------- |
| iat          | Issued At                       |
| exp          | Expiration                      |
| expiresIn    | Set expiration while signing    |
| jwt.verify() | Checks expiration automatically |

---

# 14. Interview Answer

> **Token Expiration is the process of limiting how long a JWT remains valid. When a JWT is created using `jwt.sign()`, an expiration time can be specified using the `expiresIn` option, which adds the `exp` claim to the token. Every time the server verifies the JWT using `jwt.verify()`, it checks both the signature and the expiration time. If the token has expired, verification fails and the server typically returns a 401 Unauthorized response. Short-lived Access Tokens combined with long-lived Refresh Tokens provide a good balance between security and user experience.**

---

# ⭐ Interview Tips

## JWT Lifecycle

```text
Login

      │

      ▼

Generate JWT

      │

      ▼

API Calls

      │

      ▼

Token Expires

      │

      ▼

401 Unauthorized

      │

      ▼

Refresh Token

      │

      ▼

New JWT
```

---

## JWT Claims

```text
JWT

│

├── iat

└── exp
```

---

## Token Verification

```text
Receive JWT

      │

      ▼

Verify Signature

      │

      ▼

Check exp

      │

 ┌──────────────┐
 │              │
 ▼              ▼

Valid      Expired

 │              │

 ▼              ▼

200         401
```

---

# ⭐ Most Asked Interview Questions

### Q1. What happens when a JWT expires?

```text
Client

↓

JWT

↓

Expired

↓

jwt.verify()

↓

TokenExpiredError

↓

401 Unauthorized
```

The client should request a **new Access Token** using a valid Refresh Token or ask the user to log in again.

---

### Q2. Why not make Access Tokens valid for 30 days?

```text
30-Day Token

↓

Stolen

↓

30 Days of Unauthorized Access
```

Instead,

```text
15-Minute Token

↓

Expires Quickly

↓

Lower Risk
```

Short-lived Access Tokens improve security.

---

### Q3. Does the server need to store expired JWTs?

No.

JWT expiration is **self-contained**.

The server checks the `exp` claim during verification.

Unlike sessions,

no database lookup is required just to determine whether the Access Token has expired.

---

### Q4. What happens if the user's system clock is incorrect?

The **server's clock** determines whether a JWT is expired during `jwt.verify()`, not the client's clock.

For distributed systems, servers should keep their clocks synchronized (for example, using NTP), and libraries often allow a small **clock tolerance** to account for minor time differences.

```

```
