# Authorization Code Flow (OAuth 2.0)

> **Interview Definition:**  
> The **Authorization Code Flow** is the most secure and widely used OAuth 2.0 flow for **server-side web applications**. Instead of sending an Access Token directly to the browser, the Authorization Server first returns a short-lived **Authorization Code**. The backend then exchanges this code for an **Access Token** (and optionally a Refresh Token), keeping sensitive tokens away from the browser.

> **One-line Interview Answer:**  
> **Authorization Code Flow securely authenticates users by exchanging a temporary authorization code for an access token on the backend.**

---

# Table of Contents

1. What is Authorization Code Flow?
2. Why Do We Need It?
3. Authorization Code Flow Overview
4. OAuth Participants
5. Step-by-Step Flow
6. Authorization Endpoint
7. Authorization Code
8. Token Endpoint
9. Access Token & Refresh Token
10. PKCE
11. State Parameter
12. Redirect URI
13. Express Example
14. Authorization Code Flow vs Implicit Flow
15. Best Practices
16. Common Interview Questions
17. Quick Revision
18. Interview Answer

---

# 1. What is Authorization Code Flow?

The Authorization Code Flow is the **recommended OAuth 2.0 flow** for web applications.

Instead of

```text
Google

↓

Access Token

↓

Browser
```

it uses

```text
Google

↓

Authorization Code

↓

Backend

↓

Access Token
```

This keeps the Access Token hidden from the browser during the exchange.

---

# 2. Why Do We Need It?

Imagine Google sends the Access Token directly to the browser.

```text
Browser

↓

Access Token

↓

JavaScript
```

If malicious JavaScript executes due to an XSS vulnerability,

the Access Token may be exposed.

Instead

```text
Browser

↓

Authorization Code

↓

Backend

↓

Access Token
```

The backend exchanges the code securely.

---

# 3. Authorization Code Flow Overview

```text
                User

                  │

                  ▼

         Click Google Login

                  │

                  ▼

           Your Application

                  │

                  ▼

 Redirect to Google Authorization Endpoint

                  │

                  ▼

               Google

                  │

                  ▼

          User Logs In

                  │

                  ▼

       User Grants Permission

                  │

                  ▼

      Authorization Code

                  │

                  ▼

      Redirect Back to Backend

                  │

                  ▼

 Exchange Code at Token Endpoint

                  │

                  ▼

     Access Token + Refresh Token

                  │

                  ▼

        Call Google APIs
```

---

# 4. OAuth Participants

| Component            | Description               |
| -------------------- | ------------------------- |
| Resource Owner       | User                      |
| Client               | Your Application          |
| Authorization Server | Google OAuth Server       |
| Resource Server      | Google APIs               |
| Authorization Code   | Temporary code            |
| Access Token         | Access APIs               |
| Refresh Token        | Generate new Access Token |

---

# 5. Step-by-Step Flow

## Step 1

User clicks

```text
Continue with Google
```

---

## Step 2

Backend redirects user to

```text
Google Authorization Endpoint
```

---

## Step 3

User logs into Google.

---

## Step 4

Google shows permission screen.

```text
Allow access to:

✔ Email

✔ Profile
```

---

## Step 5

User approves.

---

## Step 6

Google redirects back.

```http
GET

/auth/google/callback

?code=abc123
```

Notice

Google returns

```text
Authorization Code

NOT

Access Token
```

---

## Step 7

Backend exchanges the code.

```text
Authorization Code

↓

Token Endpoint

↓

Access Token

+

Refresh Token
```

---

## Step 8

Backend calls Google API.

```text
Access Token

↓

Google User API

↓

Profile
```

---

# 6. Authorization Endpoint

Purpose

```text
User Login

+

Permission
```

Example Request

```http
GET https://accounts.google.com/o/oauth2/v2/auth

?client_id=CLIENT_ID

&redirect_uri=https://example.com/auth/google/callback

&response_type=code

&scope=email profile

&state=random123
```

Important parameters

| Parameter     | Purpose               |
| ------------- | --------------------- |
| client_id     | Application ID        |
| redirect_uri  | Callback URL          |
| response_type | code                  |
| scope         | Requested permissions |
| state         | CSRF protection       |

---

# 7. Authorization Code

Example

```text
abc123xyz
```

Characteristics

- Temporary
- Short-lived
- Single use
- Exchanged by backend
- Cannot directly access APIs

---

# 8. Token Endpoint

Backend sends

```http
POST

https://oauth2.googleapis.com/token
```

Body

```text
client_id

client_secret

authorization_code

redirect_uri

grant_type=authorization_code
```

Google responds

```json
{
  "access_token": "...",

  "refresh_token": "...",

  "expires_in": 3600,

  "token_type": "Bearer"
}
```

---

# 9. Access Token & Refresh Token

Access Token

```text
Short-lived

↓

Access APIs
```

Refresh Token

```text
Long-lived

↓

New Access Token
```

Flow

```text
Access Token

↓

Expires

↓

Refresh Token

↓

New Access Token
```

---

# 10. PKCE (Proof Key for Code Exchange)

PKCE protects the Authorization Code Flow against code interception attacks.

Flow

```text
Generate Code Verifier

↓

Generate Code Challenge

↓

Authorization Request

↓

Authorization Code

↓

Send Code Verifier

↓

Google Verifies

↓

Access Token
```

PKCE is **required** for public clients (mobile apps, SPAs) and increasingly recommended for confidential clients as well.

---

# 11. State Parameter

Example

```text
state=KJH892ABCD
```

Purpose

```text
Prevent CSRF
```

Flow

```text
Request

↓

Random State

↓

Google

↓

Returns Same State

↓

Verify
```

If the returned value doesn't match,

reject the request.

---

# 12. Redirect URI

Example

```text
https://example.com/auth/google/callback
```

Google redirects only to registered URIs.

This prevents attackers from stealing authorization codes by redirecting them elsewhere.

---

# 13. Express Example

Redirect

```javascript
app.get("/login/google", (req, res) => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" +
    process.env.CLIENT_ID +
    "&redirect_uri=" +
    process.env.REDIRECT_URI +
    "&response_type=code" +
    "&scope=email profile";

  res.redirect(url);
});
```

Callback

```javascript
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  // Exchange code for Access Token
});
```

In production, libraries such as **Passport.js** or Google's OAuth client are commonly used.

---

# 14. Authorization Code Flow vs Implicit Flow

| Authorization Code      | Implicit               |
| ----------------------- | ---------------------- |
| Backend exchanges code  | Browser receives token |
| More secure             | Less secure            |
| Supports Refresh Tokens | Usually doesn't        |
| Recommended             | Largely deprecated     |

---

# 15. Best Practices

✅ Use HTTPS.

✅ Always validate `state`.

✅ Use PKCE.

✅ Store Client Secret securely.

✅ Never expose Client Secret to frontend.

✅ Use Authorization Code Flow.

✅ Validate Redirect URI.

---

# 16. Common Interview Questions

### Why use Authorization Code instead of Access Token?

To keep Access Tokens away from the browser during the exchange.

---

### Why is the Authorization Code temporary?

To reduce the impact if it's intercepted.

---

### Why do we need PKCE?

To prevent authorization code interception attacks.

---

### Why use the state parameter?

To protect against CSRF attacks.

---

### Can the Authorization Code call APIs?

No.

Only the Access Token can.

---

# 17. Quick Revision

| Component          | Purpose                   |
| ------------------ | ------------------------- |
| Authorization Code | Temporary code            |
| Access Token       | Access APIs               |
| Refresh Token      | Generate new Access Token |
| State              | CSRF protection           |
| PKCE               | Prevent code interception |
| Redirect URI       | Callback URL              |

---

# 18. Interview Answer

> **The Authorization Code Flow is the recommended OAuth 2.0 flow for server-side applications. After a user logs in and grants permission, the Authorization Server returns a short-lived Authorization Code instead of an Access Token. The backend securely exchanges this code at the Token Endpoint using its Client ID, Client Secret, and Redirect URI. The Authorization Server then returns an Access Token and optionally a Refresh Token. The application uses the Access Token to call protected APIs. Security is improved through HTTPS, the `state` parameter for CSRF protection, registered Redirect URIs, and PKCE to prevent authorization code interception attacks.**

---

# ⭐ Interview Tips

## Complete Flow

```text
User

↓

Login with Google

↓

Authorization Endpoint

↓

User Login

↓

Permission Screen

↓

Authorization Code

↓

Backend

↓

Token Endpoint

↓

Access Token

↓

Google API

↓

User Profile
```

---

## Authorization Code Exchange

```text
Authorization Code

↓

Backend

↓

Token Endpoint

↓

Access Token
```

---

## Security Features

```text
HTTPS

↓

Encrypted Traffic


State

↓

CSRF Protection


PKCE

↓

Code Interception Protection


Redirect URI

↓

Prevent Redirect Attacks
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why doesn't Google return the Access Token directly?

Because the browser is less trusted.

```text
Browser

↓

Authorization Code

↓

Backend

↓

Access Token
```

This keeps sensitive tokens away from the client during the exchange.

---

### Q2. What is the difference between Client ID and Client Secret?

| Client ID                   | Client Secret              |
| --------------------------- | -------------------------- |
| Public identifier           | Confidential credential    |
| Safe to expose              | Must never be exposed      |
| Identifies your application | Authenticates your backend |

---

### Q3. What happens if someone steals the Authorization Code?

Without PKCE:

```text
Stolen Code

↓

Possible Token Exchange
```

With PKCE:

```text
Stolen Code

↓

Missing Code Verifier

↓

Token Request Rejected
```

---

### Q4. Why is Authorization Code Flow recommended?

Because it:

- Keeps Access Tokens off the browser during the exchange
- Supports Refresh Tokens
- Supports PKCE
- Is the OAuth 2.0 recommended flow for web applications
- Provides stronger security than the Implicit Flow
