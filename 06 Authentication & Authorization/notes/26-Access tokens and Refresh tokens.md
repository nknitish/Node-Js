# OAuth Access Tokens & Refresh Tokens

> **Interview Definition:**  
> In OAuth 2.0, an **Access Token** is a short-lived credential that allows an application to access protected resources (APIs) on behalf of a user. A **Refresh Token** is a long-lived credential used to obtain a new Access Token without requiring the user to log in again.

> **One-line Interview Answer:**  
> **Access Tokens access APIs, while Refresh Tokens generate new Access Tokens after they expire.**

---

# Table of Contents

1. What are OAuth Tokens?
2. Why Do We Need Two Tokens?
3. Access Token
4. Refresh Token
5. OAuth Token Flow
6. OAuth Access Token vs JWT Access Token
7. OAuth Refresh Flow
8. Token Scopes
9. Token Revocation
10. Token Introspection
11. Express Example
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What are OAuth Tokens?

After successful OAuth authentication,

the Authorization Server returns

```text
Access Token

+

Refresh Token
```

Example

```text
Google

↓

Access Token

↓

Your Backend
```

These tokens allow your application to access Google APIs.

---

# 2. Why Do We Need Two Tokens?

Suppose Access Tokens never expire.

```text
Access Token

↓

Stolen

↓

Unlimited API Access
```

Very dangerous.

Instead

```text
Access Token

↓

1 Hour

↓

Expires
```

Refresh Token

```text
↓

30 Days

↓

Generate New Access Token
```

---

# 3. Access Token

The Access Token is used to call protected APIs.

Example

```text
Backend

↓

Access Token

↓

Google API

↓

User Profile
```

Characteristics

- Short-lived
- Used with every API request
- Represents granted permissions
- Cannot usually be renewed directly

Example Request

```http
GET https://www.googleapis.com/oauth2/v3/userinfo

Authorization: Bearer ACCESS_TOKEN
```

---

# 4. Refresh Token

The Refresh Token is **never used to access APIs directly**.

Instead

```text
Refresh Token

↓

Token Endpoint

↓

New Access Token
```

Characteristics

- Long-lived
- Stored securely
- Used only when Access Token expires
- Usually issued only on the first user consent

---

# 5. OAuth Token Flow

```text
User Login

↓

Authorization Code

↓

Backend

↓

Token Endpoint

↓

Access Token

+

Refresh Token

↓

API Calls

↓

Access Token Expires

↓

Refresh Token

↓

New Access Token

↓

Continue
```

---

# 6. OAuth Access Token vs JWT Access Token

Many developers think they're the same.

They are not.

| OAuth Access Token                  | JWT Access Token           |
| ----------------------------------- | -------------------------- |
| Issued by Google, GitHub, Microsoft | Issued by your own backend |
| Used to access third-party APIs     | Used to access your APIs   |
| May be opaque or JWT                | Usually JWT                |
| Authorization Framework             | Authentication Token       |

Example

### OAuth

```text
Google

↓

Access Token

↓

Google Drive API
```

---

### JWT

```text
Your Backend

↓

JWT

↓

Your APIs
```

---

# 7. OAuth Refresh Flow

Suppose the Access Token expires.

```text
Access Token

↓

Expired
```

Backend sends

```http
POST

/oauth/token
```

Body

```text
client_id

client_secret

refresh_token

grant_type=refresh_token
```

Authorization Server

↓

```json
{
  "access_token": "...",

  "expires_in": 3600
}
```

New Access Token

↓

Continue API Requests

---

# 8. Token Scopes

Scopes define **what the Access Token is allowed to access**.

Example

```text
email

profile
```

Google Drive

```text
drive.readonly
```

GitHub

```text
repo

user
```

Example

```text
Access Token

↓

Scopes

↓

Read Email

✔

Read Profile

✔

Delete Drive Files

❌
```

Always request the minimum required scopes.

---

# 9. Token Revocation

Sometimes a user disconnects your application.

Flow

```text
User

↓

Disconnect Google Account

↓

Access Token

↓

Invalid

↓

API Fails
```

OAuth providers expose a **revocation endpoint** that invalidates tokens.

After revocation

```text
Access Token

↓

Rejected

↓

401 Unauthorized
```

---

# 10. Token Introspection

Some OAuth providers issue **opaque Access Tokens**.

Example

```text
asf89asd8f98asd98asd
```

You cannot decode them.

Instead

```text
Access Token

↓

Introspection Endpoint

↓

Valid?

↓

Yes / No
```

JWT-based Access Tokens often don't require introspection because they can be verified locally.

---

# 11. Express Example

Using Google OAuth

```javascript
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  // Exchange Authorization Code

  // Receive Access Token

  // Receive Refresh Token
});
```

Calling Google API

```javascript
fetch(
  "https://www.googleapis.com/oauth2/v3/userinfo",

  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  },
);
```

---

# 12. Best Practices

✅ Keep Access Tokens short-lived.

✅ Store Refresh Tokens securely.

✅ Request minimal scopes.

✅ Revoke tokens on disconnect.

✅ Use HTTPS.

✅ Never expose Client Secret.

✅ Refresh Access Tokens only when needed.

---

# 13. Common Interview Questions

### Which token accesses APIs?

Access Token.

---

### Which token generates new Access Tokens?

Refresh Token.

---

### Can Refresh Tokens access APIs?

No.

---

### Do all OAuth providers return JWTs?

No.

Some return opaque tokens.

---

### What are scopes?

Permissions granted to the application.

---

# 14. Quick Revision

| Token              | Purpose                   |
| ------------------ | ------------------------- |
| Authorization Code | Exchange for Tokens       |
| Access Token       | Access APIs               |
| Refresh Token      | Generate New Access Token |
| Scope              | Permission                |
| Revocation         | Invalidate Token          |
| Introspection      | Validate Opaque Token     |

---

# 15. Interview Answer

> **In OAuth 2.0, an Access Token is a short-lived credential that allows an application to access protected APIs on behalf of a user. A Refresh Token is a long-lived credential used to obtain new Access Tokens without requiring the user to log in again. After the Authorization Code is exchanged, the Authorization Server returns an Access Token and, in many cases, a Refresh Token. The application uses the Access Token in the `Authorization: Bearer` header to call APIs. When the Access Token expires, the Refresh Token is sent to the Token Endpoint to obtain a new Access Token. OAuth Access Tokens may be JWTs or opaque strings depending on the provider.**

---

# ⭐ Interview Tips

## OAuth Token Lifecycle

```text
Login

↓

Authorization Code

↓

Access Token

+

Refresh Token

↓

API Calls

↓

Access Token Expires

↓

Refresh Token

↓

New Access Token
```

---

## OAuth vs JWT

```text
OAuth

↓

Google Access Token

↓

Google API


JWT

↓

Your Backend

↓

Your API
```

---

## Token Usage

```text
Access Token

↓

API Access


Refresh Token

↓

New Access Token
```

---

# ⭐ Most Asked Interview Questions

### Q1. Are OAuth Access Tokens always JWTs?

No.

OAuth defines **how tokens are issued**, not their format.

Providers may issue:

- JWT
- Opaque Tokens

---

### Q2. Why are Refresh Tokens long-lived?

Because users shouldn't log in every hour.

```text
Access Token

↓

1 Hour

↓

Expires

↓

Refresh Token

↓

New Access Token
```

This provides both security and a good user experience.

---

### Q3. Why shouldn't Refresh Tokens be sent with every request?

Refresh Tokens are highly sensitive.

Their only purpose is

```text
Refresh Token

↓

Token Endpoint

↓

New Access Token
```

Sending them with every API request unnecessarily increases their exposure.

---

### Q4. What is the difference between OAuth Access Tokens and your application's JWT?

**OAuth Access Token**

```text
Google

↓

Access Google APIs
```

**Application JWT**

```text
Your Backend

↓

Access Your APIs
```

In many real-world applications, the flow is:

```text
User

↓

Login with Google

↓

OAuth Access Token

↓

Fetch Google Profile

↓

Your Backend

↓

Generate Your Own JWT

↓

Frontend Uses Your JWT
```

This is the architecture used by many production applications because your backend controls authentication and authorization for **your own APIs**, while OAuth is used only to verify the user's identity and access third-party resources.
