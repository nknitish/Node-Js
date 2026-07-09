# GitHub OAuth

> **Interview Definition:**  
> **GitHub OAuth** is GitHub's implementation of the OAuth 2.0 protocol that allows users to authenticate into your application using their GitHub account. Instead of creating a new username and password, users authorize your application, GitHub verifies their identity, and your backend receives an **Access Token** to retrieve the user's GitHub profile.

> **One-line Interview Answer:**  
> **GitHub OAuth enables users to securely sign in using their GitHub account without sharing their GitHub password with your application.**

---

# Table of Contents

1. What is GitHub OAuth?
2. Why Use GitHub OAuth?
3. GitHub OAuth Architecture
4. GitHub OAuth Flow
5. GitHub OAuth Components
6. Creating a GitHub OAuth App
7. OAuth Flow Step-by-Step
8. Express.js Implementation
9. Backend Flow
10. Frontend Flow
11. GitHub User API
12. Common GitHub Scopes
13. Google OAuth vs GitHub OAuth
14. Best Practices
15. Common Interview Questions
16. Quick Revision
17. Interview Answer

---

# 1. What is GitHub OAuth?

GitHub OAuth allows users to log into your application using their GitHub account.

Instead of

```text
Signup

↓

Username

↓

Password
```

Users simply click

```text
Continue with GitHub
```

GitHub authenticates the user.

---

# 2. Why Use GitHub OAuth?

Without GitHub OAuth

```text
Your App

↓

Store Password

↓

Password Reset

↓

Email Verification

↓

Authentication
```

With GitHub OAuth

```text
GitHub

↓

Authentication

↓

User Profile

↓

Login Complete
```

Benefits

- Faster login
- No password management
- Trusted authentication
- Better user experience
- Popular among developers

---

# 3. GitHub OAuth Architecture

```text
                 User

                   │

                   ▼

          React Frontend

                   │

                   ▼

          Express Backend

                   │

                   ▼

         GitHub OAuth Server

                   │

                   ▼

           GitHub REST API

                   │

                   ▼

             User Profile
```

---

# 4. GitHub OAuth Flow

```text
User

↓

Click

Continue with GitHub

↓

Frontend

↓

Backend

↓

Redirect to GitHub

↓

GitHub Login

↓

Approve Application

↓

Authorization Code

↓

Backend

↓

Exchange Code

↓

Access Token

↓

GitHub User API

↓

User Profile

↓

Create User

↓

Generate JWT

↓

Login Complete
```

---

# 5. GitHub OAuth Components

| Component          | Purpose               |
| ------------------ | --------------------- |
| Client ID          | Public identifier     |
| Client Secret      | Backend secret        |
| Authorization Code | Temporary code        |
| Access Token       | Access GitHub APIs    |
| Redirect URI       | Callback URL          |
| Scope              | Requested permissions |

---

# 6. Creating a GitHub OAuth App

GitHub

↓

```text
Settings

↓

Developer Settings

↓

OAuth Apps

↓

New OAuth App
```

Provide

- Application Name
- Homepage URL
- Callback URL

GitHub provides

```text
Client ID

+

Client Secret
```

Store

```env
GITHUB_CLIENT_ID=xxxxxxxx

GITHUB_CLIENT_SECRET=xxxxxxxx

GITHUB_CALLBACK=http://localhost:5000/auth/github/callback
```

---

# 7. OAuth Flow Step-by-Step

## Step 1

User clicks

```text
Continue with GitHub
```

---

## Step 2

Backend redirects user

```http
https://github.com/login/oauth/authorize
```

---

## Step 3

User logs into GitHub.

---

## Step 4

GitHub asks

```text
Authorize Application?
```

Example

```text
My Portfolio App

Would like to access

✔ Email

✔ Profile
```

---

## Step 5

User approves.

---

## Step 6

GitHub redirects

```http
GET

/auth/github/callback

?code=abc123
```

---

## Step 7

Backend exchanges code.

```http
POST

https://github.com/login/oauth/access_token
```

GitHub returns

```text
Access Token
```

---

## Step 8

Backend requests

```http
GET

https://api.github.com/user
```

Using

```http
Authorization:

Bearer ACCESS_TOKEN
```

---

## Step 9

GitHub returns

```json
{
  "id": 12345,

  "login": "nitish",

  "name": "Nitish Kumar",

  "avatar_url": "...",

  "email": "abc@gmail.com"
}
```

---

## Step 10

Backend

```text
Find User

↓

Create User

↓

Generate JWT

↓

Login Complete
```

---

# 8. Express.js Implementation

Install

```bash
pnpm add passport passport-github2 express-session
```

Configure Strategy

```javascript
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,

      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      callbackURL: "/auth/github/callback",
    },

    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);
```

Redirect

```javascript
app.get(
  "/auth/github",

  passport.authenticate(
    "github",

    {
      scope: ["user:email"],
    },
  ),
);
```

Callback

```javascript
app.get(
  "/auth/github/callback",

  passport.authenticate(
    "github",

    {
      session: false,
    },
  ),

  (req, res) => {
    res.json(req.user);
  },
);
```

---

# 9. Backend Flow

```text
Authorization Code

↓

Exchange Code

↓

Access Token

↓

GitHub User API

↓

User Profile

↓

User Exists?

↓

No

↓

Create User

↓

Generate JWT

↓

Frontend
```

---

# 10. Frontend Flow

```text
User

↓

GitHub Login

↓

GitHub

↓

Authorization Code

↓

Backend

↓

JWT

↓

Frontend

↓

Authenticated
```

---

# 11. GitHub User API

Example Request

```http
GET https://api.github.com/user

Authorization:

Bearer ACCESS_TOKEN
```

Response

```json
{
  "login": "nitish",

  "id": 12345,

  "name": "Nitish Kumar",

  "avatar_url": "...",

  "html_url": "https://github.com/nitish"
}
```

---

# 12. Common GitHub Scopes

Basic Profile

```text
read:user
```

Email

```text
user:email
```

Repositories

```text
repo
```

Organizations

```text
read:org
```

Always request only the scopes you actually need.

---

# 13. Google OAuth vs GitHub OAuth

| Google OAuth       | GitHub OAuth                       |
| ------------------ | ---------------------------------- |
| Google Account     | GitHub Account                     |
| Google APIs        | GitHub APIs                        |
| ID Token available | No standard ID Token in OAuth flow |
| Profile API        | GitHub User API                    |
| Uses OAuth 2.0     | Uses OAuth 2.0                     |

---

# 14. Best Practices

✅ Use Authorization Code Flow.

✅ Use HTTPS.

✅ Store Client Secret securely.

✅ Request minimum scopes.

✅ Verify callback requests.

✅ Generate your own JWT.

✅ Store OAuth credentials in `.env`.

---

# 15. Common Interview Questions

### What is GitHub OAuth?

GitHub's OAuth 2.0 implementation.

---

### Does GitHub return JWT?

Typically, GitHub returns an OAuth Access Token. Unlike Google Sign-In with OpenID Connect, GitHub's standard OAuth flow does not return an ID Token.

---

### Should we store GitHub Access Tokens forever?

No.

Store them securely only if your application needs ongoing access to GitHub APIs.

---

### Why generate our own JWT?

GitHub Access Tokens authenticate against GitHub APIs.

Your own JWT authenticates users to your APIs.

---

### Can GitHub OAuth replace passwords?

Yes.

Many applications support GitHub OAuth as a passwordless login option.

---

# 16. Quick Revision

| Component          | Purpose           |
| ------------------ | ----------------- |
| Client ID          | Public identifier |
| Client Secret      | Backend secret    |
| Authorization Code | Temporary code    |
| Access Token       | GitHub APIs       |
| User API           | Profile           |
| JWT                | Your API          |

---

# 17. Interview Answer

> **GitHub OAuth is GitHub's implementation of OAuth 2.0 that allows users to sign in using their GitHub account without sharing their password with third-party applications. The user authenticates with GitHub, grants permission, and GitHub returns an Authorization Code. The backend exchanges this code for an Access Token, uses it to retrieve the user's profile from the GitHub API, creates or updates the local user record, and typically generates its own JWT for authenticating requests to its own APIs. This approach provides secure authentication and simplifies the login experience for users.**

---

# ⭐ Interview Tips

## GitHub OAuth Flow

```text
User

↓

GitHub Login

↓

Authorization Code

↓

Backend

↓

Access Token

↓

GitHub User API

↓

Profile

↓

JWT

↓

Frontend
```

---

## Authentication Flow

```text
GitHub

↓

Verify User

↓

Profile

↓

Your Backend

↓

Generate JWT

↓

Authenticated
```

---

## Production Architecture

```text
React

↓

GitHub Login

↓

Express

↓

GitHub OAuth

↓

MongoDB

↓

JWT

↓

Frontend
```

---

# ⭐ Most Asked Interview Questions

### Q1. Why do we create our own JWT after GitHub OAuth?

Because

```text
GitHub Access Token

↓

GitHub APIs
```

Your application needs

```text
JWT

↓

Your APIs
```

Most production applications exchange GitHub authentication for their own application session or JWT.

---

### Q2. What is the difference between GitHub OAuth and Google OAuth?

Both use OAuth 2.0 and the Authorization Code Flow.

Main differences:

- Google commonly supports OpenID Connect and returns an **ID Token**.
- GitHub's standard OAuth flow returns an **Access Token** for GitHub APIs.
- API endpoints and available scopes differ.

---

### Q3. Should we store the GitHub Access Token?

Only if your application needs to call GitHub APIs later (for example, reading repositories or commits).

If you're using GitHub OAuth **only for login**, many applications fetch the user profile, generate their own JWT, and discard the GitHub Access Token.

---

### Q4. How do most production applications implement GitHub login?

```text
User

↓

Login with GitHub

↓

Authorization Code

↓

Backend

↓

Access Token

↓

GitHub Profile

↓

Find/Create User

↓

Generate JWT

↓

Frontend
```

This keeps your application's authentication independent from GitHub while still providing a seamless social login experience.
