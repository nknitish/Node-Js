# JWT Best Practices

> **Interview Definition:**  
> JWT (JSON Web Token) is a secure and scalable authentication mechanism, but **using JWT incorrectly can introduce serious security vulnerabilities**. JWT Best Practices are a set of guidelines that help developers securely generate, store, verify, and manage JWTs in production applications.

---

# Table of Contents

1. Why Do We Need JWT Best Practices?
2. Use HTTPS
3. Never Store Sensitive Data in JWT
4. Use Short-lived Access Tokens
5. Use Refresh Tokens
6. Store Tokens Securely
7. Always Verify JWT
8. Use Strong Secrets
9. Set Standard Claims
10. Handle Token Expiration
11. Logout & Token Revocation
12. Refresh Token Rotation
13. Secure JWT Algorithm
14. Complete Authentication Flow
15. Common Mistakes
16. Production Architecture
17. Best Practices Checklist
18. Common Interview Questions
19. Quick Revision
20. Interview Answer

---

# 1. Why Do We Need JWT Best Practices?

JWT itself is secure.

Most security problems happen because developers use it incorrectly.

Example

❌ Bad

```text
JWT

↓

30 Days

↓

Stored in localStorage

↓

Never Expires
```

Good

```text
Access Token

15 Minutes

+

Refresh Token

30 Days

↓

HttpOnly Cookie
```

---

# 2. Always Use HTTPS

JWT should **never** travel over HTTP.

Bad

```text
Browser

↓

HTTP

↓

JWT

↓

Network
```

Anyone on the network may intercept it.

Good

```text
Browser

↓

HTTPS

↓

Encrypted

↓

Server
```

Always use HTTPS in production.

---

# 3. Never Store Sensitive Data inside JWT

JWT Payload

```json
{
  "userId": "123",
  "role": "admin"
}
```

Good.

Never store

```json
{
  "password": "secret123",

  "creditCard": "4111....",

  "apiKey": "abc123"
}
```

Remember

> JWT is **signed**, not encrypted.

Anyone possessing the token can decode the payload.

---

# 4. Use Short-lived Access Tokens

Bad

```text
Access Token

↓

30 Days
```

If stolen

↓

30 Days of access.

Good

```text
Access Token

↓

15 Minutes
```

Typical values

| Token         | Expiration   |
| ------------- | ------------ |
| Access Token  | 5–30 Minutes |
| Refresh Token | 7–30 Days    |

---

# 5. Use Refresh Tokens

Instead of asking users to log in repeatedly,

use Refresh Tokens.

Flow

```text
Access Token

↓

Expires

↓

Refresh Token

↓

Generate New Access Token
```

---

# 6. Store Tokens Securely

Bad

```text
localStorage

↓

Long-lived Refresh Token
```

Good

```text
Refresh Token

↓

HttpOnly Cookie
```

Recommended

| Token         | Storage                               |
| ------------- | ------------------------------------- |
| Access Token  | Memory or Short-lived HttpOnly Cookie |
| Refresh Token | HttpOnly Secure Cookie                |

---

# 7. Always Verify JWT

Never trust incoming JWTs.

Always

```javascript
jwt.verify(
  token,

  process.env.JWT_SECRET,
);
```

Never

```javascript
jwt.decode(token);
```

`decode()` does **not** verify the signature.

---

# 8. Use Strong Secrets

Bad

```text
JWT_SECRET=password123
```

Good

```text
JWT_SECRET=

K82hd92KsjQ91jA92...

Long

Random

Complex
```

Store secrets in

```text
.env
```

Never commit secrets to Git.

Example

```env
JWT_SECRET=your-long-random-secret
JWT_REFRESH_SECRET=another-long-random-secret
```

---

# 9. Set Standard Claims

JWT supports built-in claims.

Example

```javascript
jwt.sign(
  {
    sub: user._id,

    role: "admin",
  },

  process.env.JWT_SECRET,

  {
    expiresIn: "15m",

    issuer: "MyApp",

    audience: "MyFrontend",
  },
);
```

Useful claims

| Claim | Purpose    |
| ----- | ---------- |
| sub   | User ID    |
| exp   | Expiration |
| iat   | Issued At  |
| iss   | Issuer     |
| aud   | Audience   |
| jti   | Token ID   |

---

# 10. Handle Token Expiration

Catch expiration errors.

```javascript
try {
  jwt.verify(
    token,

    process.env.JWT_SECRET,
  );
} catch (err) {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token Expired",
    });
  }
}
```

---

# 11. Logout & Token Revocation

JWT cannot simply be deleted on the server because it is stateless.

Recommended

```text
Logout

↓

Delete Refresh Token

↓

Delete Cookie

↓

Access Token Expires Soon
```

Some applications also maintain a token blocklist when immediate revocation is required.

---

# 12. Refresh Token Rotation

Instead of

```text
Refresh Token

↓

Same Token Forever
```

Use

```text
Token A

↓

Refresh

↓

Token B

↓

Refresh

↓

Token C
```

Old tokens become invalid.

---

# 13. Secure JWT Algorithm

Common algorithms

| Algorithm | Usage                   |
| --------- | ----------------------- |
| HS256     | Most Common             |
| RS256     | Large Systems           |
| ES256     | Public Key Cryptography |

Never allow clients to choose the signing algorithm.

Always specify it during verification.

Example

```javascript
jwt.verify(
  token,

  process.env.JWT_SECRET,

  {
    algorithms: ["HS256"],
  },
);
```

---

# 14. Complete Authentication Flow

```text
User Login

      │

      ▼

Verify Password

      │

      ▼

Generate

Access Token

+

Refresh Token

      │

      ▼

Access Token

15 Minutes

      │

Refresh Token

30 Days

      │

      ▼

API Request

      │

      ▼

Verify JWT

      │

      ▼

Access Granted
```

---

# 15. Common Mistakes

❌ Store passwords inside JWT

❌ Use localStorage for Refresh Tokens

❌ Never expire JWTs

❌ Use weak secrets

❌ Trust jwt.decode()

❌ Skip HTTPS

❌ Forget Refresh Token rotation

❌ Put excessive user data in the payload

---

# 16. Production Architecture

```text
                User

                  │

                  ▼

             Login API

                  │

                  ▼

         Verify Credentials

                  │

                  ▼

Generate Access Token (15m)

Generate Refresh Token (30d)

        │                    │

        ▼                    ▼

Memory / Cookie      HttpOnly Cookie

        │                    │

        ▼                    ▼

Protected API     Refresh Endpoint
```

---

# 17. Best Practices Checklist

✅ Use HTTPS

✅ Use Access Token + Refresh Token

✅ Keep Access Token short-lived

✅ Store Refresh Token in HttpOnly Cookie

✅ Rotate Refresh Tokens

✅ Verify every JWT

✅ Store secrets in `.env`

✅ Never store passwords in JWT

✅ Handle expiration

✅ Use strong signing secrets

---

# 18. Common Interview Questions

### Should JWT contain passwords?

No.

---

### Should JWT be encrypted?

Usually no.

JWT is signed.

If encryption is required, consider JWE (JSON Web Encryption), but it's much less common for authentication.

---

### Which token should expire faster?

Access Token.

---

### Should JWT be verified on every request?

Yes.

---

### Where should Refresh Tokens be stored?

HttpOnly Secure Cookies.

---

# 19. Quick Revision

| Practice                | Recommended |
| ----------------------- | ----------- |
| HTTPS                   | ✅          |
| Short Access Token      | ✅          |
| Refresh Token           | ✅          |
| HttpOnly Cookie         | ✅          |
| jwt.verify()            | ✅          |
| Rotate Refresh Token    | ✅          |
| Store Password in JWT   | ❌          |
| Long-lived Access Token | ❌          |

---

# 20. Interview Answer

> **JWT is secure when implemented correctly. In production, developers should always use HTTPS, keep Access Tokens short-lived, use Refresh Tokens for session renewal, and store Refresh Tokens in HttpOnly Secure Cookies. JWT payloads should contain only non-sensitive information because they are signed but not encrypted. Every incoming JWT should be validated using `jwt.verify()`, and secrets should be stored securely in environment variables. To improve security further, applications should rotate Refresh Tokens, handle token expiration correctly, and revoke Refresh Tokens during logout. These practices help build secure and scalable authentication systems.**

---

# ⭐ Interview Tips

## Secure JWT Flow

```text
Login

↓

Generate Access Token

↓

15 Minutes

↓

Expires

↓

Refresh Token

↓

New Access Token
```

---

## Production Token Storage

```text
Access Token

↓

Memory

or

Short-lived HttpOnly Cookie


Refresh Token

↓

HttpOnly

Secure

SameSite Cookie
```

---

## JWT Verification

```text
Client Request

↓

Bearer Token

↓

jwt.verify()

↓

Signature

↓

Expiration

↓

Authenticated
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why shouldn't passwords be stored inside JWT?

Because the payload is **Base64URL encoded**, not encrypted.

Anyone can decode it.

Store only identifiers like:

```json
{
  "sub": "123",

  "role": "admin"
}
```

---

### Q2. Why do companies use Access + Refresh Tokens?

Access Token

```text
15 Minutes
```

↓

If stolen,

damage is limited.

Refresh Token

```text
30 Days
```

↓

Provides a good user experience by allowing silent re-authentication.

---

### Q3. Why shouldn't Refresh Tokens be stored in localStorage?

If an application has an **XSS vulnerability**,

malicious JavaScript can read localStorage.

```text
JavaScript

↓

localStorage

↓

Refresh Token

↓

Account Compromise
```

Using an **HttpOnly Cookie** prevents JavaScript from directly reading the token.

---

### Q4. What is the ideal production authentication setup?

```text
User Login

↓

Verify Credentials

↓

Generate

Access Token (15 Minutes)

+

Refresh Token (30 Days)

↓

Access Token

Memory

↓

Refresh Token

HttpOnly Secure Cookie

↓

Every API

↓

Verify Access Token

↓

Expired?

↓

Refresh Endpoint

↓

New Access Token
```

This architecture is widely used in modern React, Next.js, Node.js, and microservice-based applications because it balances **security**, **performance**, and **user experience**.
