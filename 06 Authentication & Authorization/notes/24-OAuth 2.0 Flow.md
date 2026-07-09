# OAuth 2.0 Flow

> **Interview Definition:**  
> **OAuth 2.0** is an **authorization framework** that allows a third-party application to access a user's resources on another service **without sharing the user's password**. Instead of giving credentials, the user grants permission, and the application receives an **Access Token** to access approved resources.

> **One-line Interview Answer:**  
> **OAuth 2.0 lets users grant limited access to their data without sharing their login credentials.**

---

# Table of Contents

1. What is OAuth 2.0?
2. Why Do We Need OAuth?
3. Authentication vs Authorization
4. OAuth Terminology
5. OAuth 2.0 Flow
6. Step-by-Step OAuth Flow
7. Real Example (Google Login)
8. OAuth Tokens
9. OAuth Roles
10. OAuth Endpoints
11. Express Example
12. OAuth vs JWT
13. OAuth vs Session Authentication
14. Best Practices
15. Common Interview Questions
16. Quick Revision
17. Interview Answer

---

# 1. What is OAuth 2.0?

OAuth 2.0 is an **authorization protocol**.

It allows applications to access another application's resources **without knowing the user's password**.

Example

```text
Your App

↓

Google Login

↓

User Grants Permission

↓

Google Issues Access Token

↓

Your App Accesses Google Profile
```

---

# 2. Why Do We Need OAuth?

Without OAuth

```text
Your App

↓

Ask User

↓

Google Password

↓

Very Dangerous
```

The application would have access to the user's credentials.

---

With OAuth

```text
User

↓

Google Login

↓

Approve Permission

↓

Access Token

↓

Your App
```

Your application never sees the user's Google password.

---

# 3. Authentication vs Authorization

Many developers confuse these.

## Authentication

```text
Who are you?
```

Example

```text
Login

↓

Email

+

Password
```

---

## Authorization

```text
What are you allowed to access?
```

Example

```text
Google Photos

↓

Allow Access?

↓

Yes
```

OAuth primarily handles **authorization**. However, many providers (Google, GitHub, Microsoft) also use it as part of a login flow by providing identity information.

---

# 4. OAuth Terminology

| Term                 | Meaning              |
| -------------------- | -------------------- |
| Resource Owner       | User                 |
| Client               | Your Application     |
| Authorization Server | Google, GitHub       |
| Resource Server      | Google API           |
| Access Token         | Temporary permission |
| Refresh Token        | Get new Access Token |

---

# 5. OAuth 2.0 Flow

```text
           User

             │

             ▼

     Click "Login with Google"

             │

             ▼

        Your Application

             │

Redirect User to Google

             ▼

           Google

             │

User Logs In

             ▼

Permission Screen

             │

             ▼

User Approves

             │

             ▼

Authorization Code

             │

             ▼

Your Server

             │

Exchange Code

             ▼

Access Token

             │

             ▼

Google API

             │

             ▼

User Profile
```

---

# 6. Step-by-Step OAuth Flow

## Step 1

User clicks

```text
Continue with Google
```

---

## Step 2

Your application redirects

```text
accounts.google.com
```

---

## Step 3

User logs into Google

```text
Email

↓

Password
```

---

## Step 4

Google asks

```text
Allow access?

Name

Email

Profile Picture
```

---

## Step 5

User approves.

---

## Step 6

Google redirects back

```text
Your Server

↓

Authorization Code
```

Example

```text
GET /callback

?code=abc123
```

---

## Step 7

Your server exchanges the code.

```text
Authorization Code

↓

Access Token
```

---

## Step 8

Use Access Token

```text
Google API

↓

User Information
```

---

# 7. Real Example (Google Login)

```text
User

↓

Click Google Login

↓

Google Login Page

↓

User Approves

↓

Authorization Code

↓

Backend

↓

Access Token

↓

Google User API

↓

User Profile

↓

Login Successful
```

---

# 8. OAuth Tokens

## Access Token

```text
Short-lived

↓

Access APIs
```

---

## Refresh Token

```text
Long-lived

↓

Generate New Access Token
```

---

## ID Token (OpenID Connect)

Sometimes Google also returns an **ID Token**.

```text
ID Token

↓

Identity

↓

Who is the User?
```

Unlike an Access Token, an ID Token is used to verify the user's identity, not to call APIs.

---

# 9. OAuth Roles

```text
Resource Owner

↓

User


Client

↓

Your App


Authorization Server

↓

Google


Resource Server

↓

Google APIs
```

---

# 10. OAuth Endpoints

Typical OAuth URLs

```text
Authorization Endpoint

↓

User Login
```

↓

```text
Authorization Code
```

↓

```text
Token Endpoint

↓

Access Token
```

↓

```text
User Info Endpoint

↓

Profile Data
```

---

# 11. Express Example

Redirect User

```javascript
app.get("/login/google", (req, res) => {
  res.redirect("https://accounts.google.com/o/oauth2/v2/auth");
});
```

After successful login

```text
GET

/auth/google/callback

?code=abc123
```

Backend

```text
Authorization Code

↓

Access Token

↓

Google User API
```

> In production, libraries such as **Passport.js** or **Google's official OAuth client** are typically used instead of manually constructing requests.

---

# 12. OAuth vs JWT

| OAuth                     | JWT                     |
| ------------------------- | ----------------------- |
| Authorization Framework   | Token Format            |
| Grants permissions        | Stores claims           |
| Works with Google, GitHub | Used for authentication |
| Can issue Access Tokens   | Can be an Access Token  |

JWT and OAuth are **not competitors**.

OAuth may issue a JWT as an Access Token or ID Token.

---

# 13. OAuth vs Session Authentication

| OAuth                  | Session                         |
| ---------------------- | ------------------------------- |
| Third-party login      | Own login system                |
| Uses Access Tokens     | Uses Session IDs                |
| User grants permission | User logs into your application |
| Good for social login  | Good for traditional login      |

---

# 14. Best Practices

✅ Always use HTTPS.

✅ Use the Authorization Code Flow.

✅ Validate the `state` parameter to prevent CSRF.

✅ Store Client Secret securely.

✅ Use Refresh Tokens carefully.

✅ Request only the permissions (scopes) your application needs.

---

# 15. Common Interview Questions

### What is OAuth?

An authorization framework.

---

### Does OAuth authenticate users?

Not by itself.

OAuth provides authorization. User authentication is commonly achieved by combining OAuth with **OpenID Connect (OIDC)**.

---

### Does OAuth expose user passwords?

No.

Only the authorization server (e.g., Google) sees the user's password.

---

### Who issues the Access Token?

Authorization Server.

---

### Can OAuth work without JWT?

Yes.

OAuth defines the authorization process, not the token format. Tokens may be opaque strings or JWTs.

---

# 16. Quick Revision

| Concept            | Meaning                   |
| ------------------ | ------------------------- |
| OAuth              | Authorization Framework   |
| Access Token       | Access Resources          |
| Refresh Token      | Generate New Access Token |
| Authorization Code | Temporary Code            |
| Google             | Authorization Server      |

---

# 17. Interview Answer

> **OAuth 2.0 is an authorization framework that allows users to grant limited access to their resources without sharing their passwords with third-party applications. In the most common Authorization Code Flow, the user is redirected to an authorization server such as Google, authenticates there, and grants permission. The authorization server returns an authorization code, which the application's backend exchanges for an access token. The application then uses the access token to access approved APIs or retrieve user information. OAuth is primarily designed for authorization, while user authentication is typically handled by combining OAuth with OpenID Connect (OIDC).**

---

# ⭐ Interview Tips

## OAuth Flow

```text
User

↓

Click Login

↓

Google

↓

User Login

↓

Approve Permission

↓

Authorization Code

↓

Backend

↓

Access Token

↓

Google API
```

---

## OAuth Components

```text
User

↓

Client

↓

Authorization Server

↓

Resource Server
```

---

## OAuth Lifecycle

```text
Login

↓

Authorization Code

↓

Access Token

↓

API Access

↓

Refresh Token

↓

New Access Token
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why doesn't OAuth ask for the user's password?

Because the password is entered **only on the authorization server** (e.g., Google).

```text
Your App

↓

Redirect

↓

Google Login

↓

Password

↓

Google
```

Your application never receives the user's password.

---

### Q2. Is OAuth the same as JWT?

No.

```text
OAuth

↓

Authorization Framework


JWT

↓

Token Format
```

OAuth may use JWTs, but it doesn't require them.

---

### Q3. Why is the Authorization Code used instead of sending the Access Token directly?

The Authorization Code is a **short-lived, one-time code**.

```text
User

↓

Authorization Code

↓

Backend

↓

Access Token
```

This prevents exposing the Access Token in the browser and enables the backend to securely authenticate itself to the authorization server before receiving tokens.

---

### Q4. Why do companies use OAuth?

OAuth provides:

- Social login (Google, GitHub, Microsoft)
- Better security (no password sharing)
- Standardized authorization
- Controlled access through scopes
- Improved user experience (single sign-on)

This is why it is widely used for **"Sign in with Google"**, **"Continue with GitHub"**, and similar login experiences.
