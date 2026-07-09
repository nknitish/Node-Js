# Google OAuth

> **Interview Definition:**  
> **Google OAuth** is Google's implementation of the OAuth 2.0 protocol. It allows users to sign in to your application using their Google account without sharing their Google password. After the user grants permission, Google issues an **Authorization Code**, which your backend exchanges for an **Access Token**, **Refresh Token** (optional), and often an **ID Token**.

> **One-line Interview Answer:**  
> **Google OAuth allows users to securely log in using their Google account without sharing their password with your application.**

---

# Table of Contents

1. What is Google OAuth?
2. Why Use Google OAuth?
3. Google OAuth Architecture
4. Google OAuth Flow
5. Google OAuth Components
6. Google Cloud Setup
7. OAuth Consent Screen
8. Creating OAuth Credentials
9. Express.js Implementation
10. Backend Flow
11. Frontend Flow
12. ID Token vs Access Token
13. Common Scopes
14. Best Practices
15. Common Interview Questions
16. Quick Revision
17. Interview Answer

---

# 1. What is Google OAuth?

Google OAuth allows users to authenticate using their Google account.

Instead of

```text
Your App

↓

Email

↓

Password
```

Users click

```text
Continue with Google
```

Google authenticates the user.

---

# 2. Why Use Google OAuth?

Without Google OAuth

```text
Your App

↓

Store Password

↓

Reset Password

↓

Email Verification

↓

Security
```

With Google OAuth

```text
Google

↓

Authentication

↓

Your App Receives User Information
```

Benefits

- Better User Experience
- No Password Management
- Trusted Authentication
- Faster Signup
- Improved Security

---

# 3. Google OAuth Architecture

```text
                User

                  │

                  ▼

         React / Frontend

                  │

                  ▼

         Express Backend

                  │

                  ▼

        Google OAuth Server

                  │

                  ▼

          Google APIs

                  │

                  ▼

            User Profile
```

---

# 4. Google OAuth Flow

```text
User

↓

Click

Continue with Google

↓

Frontend

↓

Backend

↓

Redirect to Google

↓

User Login

↓

Permission Screen

↓

Authorization Code

↓

Backend

↓

Exchange Code

↓

Access Token

↓

ID Token

↓

Google User API

↓

User Information

↓

Create Local User

↓

Generate JWT

↓

Login Complete
```

---

# 5. Google OAuth Components

| Component          | Purpose                     |
| ------------------ | --------------------------- |
| Client ID          | Identifies your application |
| Client Secret      | Authenticates your backend  |
| Redirect URI       | Callback URL                |
| Authorization Code | Temporary Code              |
| Access Token       | Access Google APIs          |
| Refresh Token      | Get new Access Token        |
| ID Token           | User Identity               |

---

# 6. Google Cloud Setup

## Step 1

Create Project

```text
Google Cloud Console

↓

New Project
```

---

## Step 2

Enable APIs

```text
Google Identity API
```

or

```text
Google People API
```

depending on your requirements.

---

## Step 3

Configure OAuth Consent Screen

---

## Step 4

Create OAuth Client

```text
Credentials

↓

OAuth Client ID
```

---

You receive

```text
Client ID

+

Client Secret
```

Store them in

```env
GOOGLE_CLIENT_ID=xxxxxxxx

GOOGLE_CLIENT_SECRET=xxxxxxxx

GOOGLE_REDIRECT_URI=http://localhost:5000/auth/google/callback
```

---

# 7. OAuth Consent Screen

When users log in,

Google displays

```text
My Awesome App

Would like access to

✔ Email

✔ Profile

Allow?

```

The user decides whether to grant access.

---

# 8. Creating OAuth Credentials

Google provides

```text
Client ID

↓

Public
```

```text
Client Secret

↓

Private
```

Never expose

```text
Client Secret
```

to the frontend.

---

# 9. Express.js Implementation

Install

```bash
pnpm add passport passport-google-oauth20 express-session
```

---

Configure Passport

```javascript
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: "/auth/google/callback",
    },

    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);
```

---

Redirect User

```javascript
app.get(
  "/auth/google",

  passport.authenticate(
    "google",

    {
      scope: ["profile", "email"],
    },
  ),
);
```

---

Callback

```javascript
app.get(
  "/auth/google/callback",

  passport.authenticate(
    "google",

    {
      session: false,
    },
  ),

  (req, res) => {
    res.send(req.user);
  },
);
```

---

# 10. Backend Flow

```text
Receive Authorization Code

↓

Exchange Code

↓

Receive

Access Token

ID Token

↓

Fetch User Profile

↓

Find User

↓

Create User

(if not exists)

↓

Generate Your JWT

↓

Return JWT
```

Most production applications generate **their own JWT** after verifying the Google user.

---

# 11. Frontend Flow

```text
Click Google Login

↓

Redirect

↓

Google Login

↓

Callback

↓

Backend

↓

JWT

↓

Store JWT

↓

Authenticated
```

---

# 12. ID Token vs Access Token

Many developers confuse them.

| ID Token                  | Access Token             |
| ------------------------- | ------------------------ |
| Identity                  | API Access               |
| JWT                       | May be JWT or opaque     |
| Contains user information | Used to call Google APIs |
| Login                     | Authorization            |

Example

```text
ID Token

↓

Who is the user?
```

```text
Access Token

↓

Can access Google APIs
```

---

# 13. Common Scopes

Basic Login

```text
openid

email

profile
```

Google Drive

```text
drive.readonly
```

Calendar

```text
calendar.readonly
```

Always request only the permissions you need.

---

# 14. Best Practices

✅ Use Authorization Code Flow.

✅ Use PKCE when applicable.

✅ Use HTTPS.

✅ Store Client Secret securely.

✅ Validate the ID Token.

✅ Generate your own JWT after login.

✅ Store Refresh Tokens securely.

---

# 15. Common Interview Questions

### What is Google OAuth?

Google's implementation of OAuth 2.0.

---

### Does Google OAuth return JWT?

Usually,

Google returns an **ID Token**, which is a JWT.

The Access Token may be a JWT or an opaque token depending on Google's implementation.

---

### Why generate our own JWT?

Google's Access Token is intended for Google APIs.

Your own JWT is used to authenticate requests to **your application's APIs**.

---

### Where should Client Secret be stored?

Backend only.

Never expose it.

---

### Which OAuth flow does Google recommend?

Authorization Code Flow.

---

# 16. Quick Revision

| Component          | Purpose           |
| ------------------ | ----------------- |
| Client ID          | Public Identifier |
| Client Secret      | Backend Secret    |
| Authorization Code | Temporary Code    |
| Access Token       | Google APIs       |
| ID Token           | User Identity     |
| JWT                | Your APIs         |

---

# 17. Interview Answer

> **Google OAuth is Google's implementation of OAuth 2.0 that allows users to authenticate using their Google account without sharing their password with third-party applications. In the Authorization Code Flow, the user logs in on Google's website and grants permission. Google returns an Authorization Code, which the backend exchanges for an Access Token, Refresh Token, and often an ID Token. The application validates the user's identity, creates or updates the local user record, and typically generates its own JWT for authenticating requests to its own APIs. This approach provides secure authentication, improves user experience, and eliminates the need for password management.**

---

# ⭐ Interview Tips

## Google OAuth Flow

```text
User

↓

Google Login

↓

Authorization Code

↓

Backend

↓

Access Token

↓

Google Profile

↓

Generate JWT

↓

Frontend
```

---

## Production Architecture

```text
React

↓

Google Login

↓

Express

↓

Google OAuth

↓

User Profile

↓

MongoDB

↓

JWT

↓

Frontend
```

---

## Token Flow

```text
Authorization Code

↓

Access Token

↓

Google API

↓

User Profile

↓

JWT

↓

Your API
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why do we create our own JWT after Google OAuth?

Because:

```text
Google Access Token

↓

Access Google APIs
```

But your backend needs a token for:

```text
Your APIs

↓

JWT
```

A common production flow is:

```text
Google Login

↓

Google User Verified

↓

Create User

↓

Generate JWT

↓

Frontend Uses JWT
```

---

### Q2. What is the difference between ID Token and Access Token?

| ID Token             | Access Token             |
| -------------------- | ------------------------ |
| Proves identity      | Grants API access        |
| Used during login    | Used to call Google APIs |
| Contains user claims | Contains permissions     |

---

### Q3. Should the frontend store the Client Secret?

**Never.**

```text
Frontend

↓

Client Secret

❌
```

Only the backend should know the Client Secret.

---

### Q4. What happens when a user logs in with Google for the first time?

Typical backend flow:

```text
Google Login

↓

Receive User Profile

↓

User Exists?

↓

No

↓

Create User

↓

Generate JWT

↓

Login
```

On future logins:

```text
Google Login

↓

Find Existing User

↓

Generate JWT

↓

Login
```

This allows users to sign in seamlessly while your application maintains its own user database and authentication system.
