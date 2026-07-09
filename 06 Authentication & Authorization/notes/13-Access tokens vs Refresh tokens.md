# Access Tokens vs Refresh Tokens

> **Interview Definition:**  
> **Access Tokens** are short-lived tokens used to authenticate API requests.  
> **Refresh Tokens** are long-lived tokens used to obtain new Access Tokens without requiring the user to log in again.

---

# Table of Contents

1. What are Access Tokens?
2. What are Refresh Tokens?
3. Why Do We Need Two Tokens?
4. Authentication Flow
5. Access Token Lifecycle
6. Refresh Token Lifecycle
7. Access Token vs Refresh Token
8. Express.js Implementation
9. Refresh Token Rotation
10. Logout Flow
11. Best Practices
12. Common Interview Questions
13. Quick Revision
14. Interview Answer

---

# 1. What is an Access Token?

An **Access Token** is a JWT used to access protected resources.

Example

```text
Client

↓

Access Token

↓

Protected API

↓

Server Verifies

↓

Response
```

Characteristics

- Short-lived
- Sent with every API request
- Contains user information (claims)
- Expires quickly

Example

```http
GET /profile

Authorization: Bearer <access_token>
```

---

# 2. What is a Refresh Token?

A **Refresh Token** is used to generate a new Access Token after it expires.

It is **NOT** used to access APIs directly.

Flow

```text
Access Token Expired

↓

Send Refresh Token

↓

Generate New Access Token

↓

Continue
```

Characteristics

- Long-lived
- Stored securely
- Sent only to refresh endpoint
- Not sent with every request

---

# 3. Why Do We Need Two Tokens?

Imagine Access Tokens never expired.

```text
Access Token

↓

Stolen

↓

Attacker

↓

Unlimited Access
```

Very dangerous.

Instead

```text
Access Token

↓

15 Minutes

↓

Expires

↓

Attack Window Ends
```

Refresh Token

```text
30 Days

↓

Generate New Access Token
```

This provides both security and good user experience.

---

# 4. Authentication Flow

```text
Login

      │

      ▼

Verify Credentials

      │

      ▼

Generate

Access Token

+

Refresh Token

      │

      ▼

Return Both Tokens

      │

      ▼

Client Stores Tokens

      │

      ▼

API Requests

      │

      ▼

Access Token Expires

      │

      ▼

Refresh Token

      │

      ▼

New Access Token
```

---

# 5. Access Token Lifecycle

```text
Login

↓

Generate Access Token

↓

Client Stores

↓

API Requests

↓

Expires

↓

Refresh Required
```

Typical expiration

```text
5 Minutes

15 Minutes

30 Minutes

1 Hour
```

---

# 6. Refresh Token Lifecycle

```text
Login

↓

Generate Refresh Token

↓

Store Securely

↓

Access Token Expires

↓

Request New Access Token

↓

Receive New Access Token
```

Typical expiration

```text
7 Days

15 Days

30 Days

90 Days
```

---

# 7. Access Token vs Refresh Token

| Access Token               | Refresh Token                      |
| -------------------------- | ---------------------------------- |
| Short-lived                | Long-lived                         |
| Used for API requests      | Used to generate new access tokens |
| Sent with every request    | Sent only to refresh endpoint      |
| Usually expires in minutes | Usually expires in days/weeks      |
| Higher exposure            | Lower exposure                     |

---

# 8. Express.js Implementation

## Login

```javascript
import jwt from "jsonwebtoken";

app.post("/login", async (req, res) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    },
  );

  res.json({
    accessToken,
    refreshToken,
  });
});
```

---

## Refresh Endpoint

```javascript
app.post("/refresh-token", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accessToken = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    res.json({
      accessToken,
    });
  } catch {
    res.sendStatus(403);
  }
});
```

---

# 9. Refresh Token Rotation

Instead of reusing the same refresh token forever,

many production systems rotate it.

```text
Login

↓

Refresh Token A

↓

Refresh

↓

Refresh Token B

↓

Refresh

↓

Refresh Token C
```

Old refresh tokens become invalid.

This reduces the impact of token theft.

---

# 10. Logout Flow

```text
Logout

↓

Delete Refresh Token

↓

Delete Access Token

↓

User Logged Out
```

If refresh tokens are stored in the database,

remove them during logout.

---

# 11. Best Practices

✅ Access Token should expire quickly.

✅ Refresh Token should be stored securely.

✅ Store Refresh Tokens in **HttpOnly Cookies** or secure server-side storage.

✅ Rotate Refresh Tokens.

✅ Invalidate Refresh Tokens during logout.

✅ Never store Refresh Tokens in localStorage if you can avoid it.

---

# 12. Common Interview Questions

### Why do we need Refresh Tokens?

To avoid asking users to log in repeatedly while still keeping Access Tokens short-lived.

---

### Which token is sent with every API request?

Access Token.

---

### Which token has a longer lifetime?

Refresh Token.

---

### Should Refresh Tokens access protected APIs?

No.

Only Access Tokens should authorize API requests.

---

### Can Refresh Tokens be revoked?

Yes.

A server can delete or invalidate stored refresh tokens.

---

# 13. Quick Revision

| Feature            | Access Token       | Refresh Token             |
| ------------------ | ------------------ | ------------------------- |
| Purpose            | API Authentication | Generate new Access Token |
| Lifetime           | Minutes            | Days/Weeks                |
| Sent Every Request | ✅                 | ❌                        |
| Can Access APIs    | ✅                 | ❌                        |
| Stored Securely    | Yes                | Yes                       |

---

# 14. Interview Answer

> **Access Tokens and Refresh Tokens are used together in modern authentication systems. An Access Token is a short-lived JWT used to authenticate API requests. Because it expires quickly, the damage caused by a stolen token is limited. A Refresh Token is a long-lived token used only to obtain a new Access Token after the current one expires, allowing users to stay logged in without re-entering their credentials. In production systems, Refresh Tokens are typically stored securely, rotated periodically, and invalidated on logout for improved security.**

---

# ⭐ Interview Tips

## Login Flow

```text
User Login

      │

      ▼

Generate

Access Token

+

Refresh Token

      │

      ▼

Return Both Tokens
```

---

## API Request

```text
Client

↓

Access Token

↓

Protected Route

↓

Response
```

---

## Token Refresh

```text
Access Token Expired

↓

POST /refresh-token

↓

Verify Refresh Token

↓

Generate New Access Token

↓

Continue Requests
```

---

## Authentication Lifecycle

```text
Login

↓

Access Token

↓

API Calls

↓

Expires

↓

Refresh Token

↓

New Access Token

↓

Continue
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why not use only one long-lived Access Token?

```text
Access Token

↓

30 Days

↓

Stolen

↓

Attacker Gets 30 Days Access
```

A long-lived access token increases the damage if it's stolen.

Instead:

```text
Access Token

15 Minutes

+

Refresh Token

30 Days
```

This limits exposure while keeping users logged in.

---

### Q2. Where should Access and Refresh Tokens be stored?

A common production approach is:

| Token         | Recommended Storage             |
| ------------- | ------------------------------- |
| Access Token  | Memory (SPA) or HttpOnly Cookie |
| Refresh Token | HttpOnly Secure Cookie          |

Using **HttpOnly** cookies helps protect tokens from JavaScript access and reduces the risk of XSS attacks.

---

### Q3. Why isn't the Refresh Token sent with every request?

The Refresh Token has only one job:

```text
Generate

↓

New Access Token
```

Sending it with every API request unnecessarily increases its exposure.

Only the Access Token should accompany normal API calls.

---

### Q4. Why do many applications store Refresh Tokens in the database?

Example:

```text
User

↓

Refresh Token

↓

MongoDB / Redis
```

This enables features such as:

- Logout from one device
- Logout from all devices
- Refresh token revocation
- Refresh token rotation
- Detection of reused or compromised refresh tokens

This is why many production authentication systems maintain server-side state for refresh tokens, even though access-token authentication itself is stateless.
