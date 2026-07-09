# Cookie-Based Authentication

> **Interview Definition:**  
> **Cookie-Based Authentication** is an authentication mechanism where the server stores the authentication token (or session ID) inside an HTTP cookie. The browser automatically sends the cookie with every request, allowing the server to authenticate the user without requiring the client to manually attach credentials.

---

# Table of Contents

1. What is Cookie-Based Authentication?
2. Why Do We Need Cookies?
3. How Cookie Authentication Works
4. Authentication Flow
5. Cookie Lifecycle
6. Session vs JWT Cookies
7. Express.js Implementation
8. Login Flow
9. Logout Flow
10. Cookie Authentication vs Bearer Token
11. Security Considerations
12. Best Practices
13. Common Interview Questions
14. Quick Revision
15. Interview Answer

---

# 1. What is Cookie-Based Authentication?

Cookie-Based Authentication stores authentication information inside an HTTP Cookie.

Instead of:

```text
Client

↓

Authorization Header

↓

Bearer Token
```

The browser automatically sends

```text
Cookie

↓

accessToken=eyJhbGc...
```

The server reads the cookie to identify the user.

---

# 2. Why Do We Need Cookies?

Imagine every request required manually attaching the JWT.

```text
Request

↓

Read Token

↓

Authorization Header

↓

API
```

With Cookies

```text
Login

↓

Server Sets Cookie

↓

Browser Stores Cookie

↓

Every Request

↓

Cookie Sent Automatically
```

This simplifies client-side code.

---

# 3. How Cookie Authentication Works

```text
Client

      │

Login Request

      ▼

Server

      │

Verify Credentials

      ▼

Generate JWT

      ▼

Set Cookie

      ▼

Browser Stores Cookie

      ▼

Future Requests

      ▼

Browser Sends Cookie

      ▼

Server Verifies JWT

      ▼

Authenticated
```

---

# 4. Authentication Flow

```text
User Login

↓

Verify Email & Password

↓

Generate JWT

↓

Set Cookie

↓

Browser Stores Cookie

↓

API Request

↓

Cookie Sent Automatically

↓

Server Verifies Cookie

↓

Authenticated
```

---

# 5. Cookie Lifecycle

```text
User Login

↓

Cookie Created

↓

Browser Stores Cookie

↓

Multiple Requests

↓

Logout

↓

Cookie Removed
```

---

# 6. Session vs JWT Cookies

Cookies can store either:

## Session ID

```text
Cookie

↓

connect.sid=abc123
```

Server

```text
Looks Up Session

↓

Authenticated
```

---

## JWT

```text
Cookie

↓

accessToken=eyJhbGc...
```

Server

```text
Verify JWT

↓

Authenticated
```

Cookies are only the **transport mechanism**.

They can carry:

- Session ID
- JWT
- Refresh Token

---

# 7. Express.js Implementation

Install

```bash
pnpm add cookie-parser
```

---

Import

```javascript
import cookieParser from "cookie-parser";

app.use(cookieParser());
```

---

## Login

```javascript
import jwt from "jsonwebtoken";

app.post("/login", async (req, res) => {
  const token = jwt.sign(
    {
      userId: user._id,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "15m",
    },
  );

  res.cookie(
    "accessToken",

    token,

    {
      httpOnly: true,

      secure: true,

      sameSite: "strict",

      maxAge: 15 * 60 * 1000,
    },
  );

  res.json({
    message: "Login Successful",
  });
});
```

---

## Authentication Middleware

```javascript
import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Authentication Required",
    });
  }

  try {
    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}
```

---

## Protected Route

```javascript
app.get(
  "/profile",

  authenticate,

  (req, res) => {
    res.json({
      user: req.user,
    });
  },
);
```

---

# 8. Login Flow

```text
User Login

↓

Verify Password

↓

Generate JWT

↓

Set Cookie

↓

Browser Stores Cookie

↓

Login Complete
```

---

# 9. Logout Flow

```javascript
app.post("/logout", (req, res) => {
  res.clearCookie("accessToken");

  res.json({
    message: "Logged Out",
  });
});
```

Flow

```text
Logout

↓

Clear Cookie

↓

Browser Deletes Cookie

↓

Future Requests

↓

401 Unauthorized
```

---

# 10. Cookie Authentication vs Bearer Token

| Cookie Authentication       | Bearer Token                                         |
| --------------------------- | ---------------------------------------------------- |
| Browser sends automatically | Client adds Authorization header                     |
| Simple frontend code        | Manual token management                              |
| Good for web apps           | Common for APIs & mobile apps                        |
| Supports HttpOnly           | Often stored in memory/localStorage                  |
| Requires CSRF protection    | Not automatically vulnerable to CSRF in the same way |

---

# 11. Security Considerations

## XSS

```text
HttpOnly Cookie

↓

JavaScript Cannot Read

↓

Better XSS Protection
```

---

## CSRF

Cookies are automatically sent.

```text
Browser

↓

Automatic Cookie

↓

Potential CSRF Attack
```

Mitigation

```text
SameSite

+

CSRF Token

+

HTTPS
```

---

# 12. Best Practices

✅ Store Refresh Tokens in HttpOnly Cookies.

✅ Use HTTPS.

✅ Enable Secure flag.

✅ Enable SameSite.

✅ Use short-lived Access Tokens.

✅ Clear cookies during logout.

✅ Validate cookies on every request.

---

# 13. Common Interview Questions

### What is Cookie-Based Authentication?

Authentication where the browser stores an authentication cookie and automatically sends it with requests.

---

### Does the browser automatically send cookies?

Yes.

Cookies matching the request domain and path are automatically included.

---

### Can cookies store JWT?

Yes.

Cookies can store:

- JWT
- Session ID
- Refresh Token

---

### Is Cookie Authentication Stateful?

Not necessarily.

If the cookie stores:

- Session ID → Stateful
- JWT → Stateless

The cookie itself doesn't determine whether the system is stateful or stateless.

---

### Which middleware reads cookies?

```javascript
cookie - parser;
```

---

# 14. Quick Revision

| Feature                   | Cookie Authentication |
| ------------------------- | --------------------- |
| Automatic Browser Support | ✅                    |
| Stores JWT                | ✅                    |
| Stores Session ID         | ✅                    |
| Supports HttpOnly         | ✅                    |
| Requires CSRF Protection  | ✅                    |

---

# 15. Interview Answer

> **Cookie-Based Authentication is an authentication mechanism where the server stores authentication information, such as a Session ID or JWT, inside an HTTP cookie. After a successful login, the server sends the cookie using the `Set-Cookie` header, and the browser automatically includes it with future requests. The server then validates the session or verifies the JWT to authenticate the user. Cookies support security features such as `HttpOnly`, `Secure`, and `SameSite`, making them a common choice for authentication in web applications. When JWTs are used with cookies, the authentication remains stateless because the server verifies the token instead of storing session data.**

---

# ⭐ Interview Tips

## Cookie Authentication Flow

```text
Client

      │

Login

      ▼

Server

      │

Verify User

      ▼

Generate JWT

      ▼

Set-Cookie

      ▼

Browser Stores Cookie

      ▼

Future Requests

      ▼

Automatic Cookie

      ▼

Verify JWT

      ▼

Authenticated
```

---

## Browser Behavior

```text
Browser

↓

Cookie Stored

↓

Every Request

↓

Cookie Sent Automatically
```

---

## Cookie Can Store

```text
Cookie

│

├── Session ID

├── Access Token

└── Refresh Token
```

---

# ⭐ Most Asked Interview Questions

### Q1. Does Cookie Authentication always mean Session Authentication?

**No.**

Many developers confuse these concepts.

```text
Cookie

↓

Transport Mechanism
```

A cookie can carry:

```text
Session ID

(Stateful)
```

or

```text
JWT

(Stateless)
```

The authentication model depends on **what is stored in the cookie**, not on the cookie itself.

---

### Q2. Why do companies store Refresh Tokens in cookies?

Because Refresh Tokens are **long-lived**.

```text
Refresh Token

↓

HttpOnly Cookie

↓

JavaScript Cannot Read

↓

Better Security
```

This reduces the risk of token theft through XSS.

---

### Q3. Why are cookies vulnerable to CSRF?

The browser automatically includes cookies with eligible requests.

```text
Malicious Website

↓

Victim Browser

↓

Automatic Cookie

↓

Your Server
```

Without protections such as `SameSite`, CSRF tokens, or origin validation, the server may process an unintended authenticated request.

---

### Q4. Should Access Tokens also be stored in cookies?

There is no single correct answer.

Common production approaches include:

```text
Access Token

↓

Memory

or

Short-lived HttpOnly Cookie
```

and

```text
Refresh Token

↓

HttpOnly Secure Cookie
```

The best choice depends on your application's architecture, client type, and security requirements.
