# Token Storage (Cookies vs localStorage)

> **Interview Definition:**  
> After a user logs in, the client must securely store the authentication token (usually a JWT). The two most common storage options are **Cookies** and **localStorage**. Choosing the right storage mechanism is important because it directly affects the application's security, especially against **XSS (Cross-Site Scripting)** and **CSRF (Cross-Site Request Forgery)** attacks.

---

# Table of Contents

1. Why Do We Need Token Storage?
2. Token Storage Options
3. localStorage
4. sessionStorage
5. Cookies
6. Cookies vs localStorage
7. Authentication Flow
8. Express.js Examples
9. Security Risks
10. Best Practices
11. Common Interview Questions
12. Quick Revision
13. Interview Answer

---

# 1. Why Do We Need Token Storage?

After login,

the server returns a JWT.

```text
User Login

↓

JWT Generated

↓

Client Stores Token

↓

Future API Requests
```

The client needs somewhere to store this token.

---

# 2. Token Storage Options

The most common options are:

- localStorage
- sessionStorage
- HttpOnly Cookies

Less common:

- Memory (React State)
- IndexedDB

---

# 3. localStorage

Stores data inside the browser.

```javascript
localStorage.setItem("accessToken", token);
```

Read

```javascript
const token = localStorage.getItem("accessToken");
```

Remove

```javascript
localStorage.removeItem("accessToken");
```

### Lifetime

```text
Browser Closed

↓

Still Exists
```

Until:

- User logs out
- User clears browser data

---

### API Request

```javascript
fetch("/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

### Advantages

✅ Easy to use

✅ Persists after browser restart

✅ Simple implementation

---

### Disadvantages

❌ Accessible by JavaScript

❌ Vulnerable to XSS attacks

---

# 4. sessionStorage

Works similarly to localStorage.

```javascript
sessionStorage.setItem("accessToken", token);
```

Difference

```text
Browser Tab Closed

↓

Token Deleted
```

Useful for temporary sessions.

---

# 5. Cookies

The server stores the token in a cookie.

```text
Server

↓

Set-Cookie

↓

Browser Stores Cookie
```

Express Example

```javascript
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
```

The browser automatically sends cookies.

```http
GET /profile

Cookie:
accessToken=eyJhbGc...
```

No need to manually attach the Authorization header.

---

## HttpOnly Cookie

```javascript
httpOnly: true;
```

Meaning

```text
JavaScript

↓

Cannot Read Cookie
```

This helps protect against XSS attacks.

---

# 6. Cookies vs localStorage

| Cookies                                                             | localStorage                           |
| ------------------------------------------------------------------- | -------------------------------------- |
| Can be HttpOnly                                                     | Always accessible via JavaScript       |
| Automatically sent with requests                                    | Must manually add Authorization header |
| Better protection against XSS (with HttpOnly)                       | Vulnerable to XSS                      |
| Can be vulnerable to CSRF (mitigated with SameSite/CSRF protection) | Not vulnerable to CSRF in the same way |
| Preferred for Refresh Tokens                                        | Sometimes used for Access Tokens       |

---

# 7. Authentication Flow

## localStorage

```text
Login

↓

Receive JWT

↓

Store in localStorage

↓

Read Token

↓

Authorization Header

↓

API Request
```

---

## Cookies

```text
Login

↓

Receive Cookie

↓

Browser Stores Cookie

↓

Browser Automatically Sends Cookie

↓

API Request
```

---

# 8. Express.js Examples

## Store Token in Cookie

```javascript
app.post("/login", (req, res) => {
  const token = jwt.sign(
    {
      userId: 123,
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
    },
  );

  res.json({
    message: "Login Successful",
  });
});
```

---

## Read Cookie

```javascript
import cookieParser from "cookie-parser";

app.use(cookieParser());

app.get("/profile", (req, res) => {
  console.log(req.cookies.accessToken);
});
```

---

## Using localStorage (Frontend)

```javascript
localStorage.setItem(
  "accessToken",

  token,
);
```

Request

```javascript
const token = localStorage.getItem("accessToken");

fetch("/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

# 9. Security Risks

## XSS

Malicious JavaScript

```javascript
const token = localStorage.getItem("accessToken");
```

↓

```text
Attacker Steals Token
```

This is why storing highly sensitive long-lived tokens in localStorage is discouraged.

---

## CSRF

Cookies are sent automatically.

```text
Browser

↓

Automatically Sends Cookie

↓

Potential CSRF Attack
```

Protection

```text
SameSite

+

CSRF Token
```

---

# 10. Best Practices

✅ Store **Refresh Tokens** in HttpOnly Secure Cookies.

✅ Use HTTPS.

✅ Set `SameSite`.

✅ Set `Secure`.

✅ Use short-lived Access Tokens.

✅ Never store passwords in browser storage.

✅ Consider storing Access Tokens in memory for SPAs if appropriate.

---

# 11. Common Interview Questions

### Which storage is more secure?

Generally,

**HttpOnly Cookies**.

---

### Why?

Because JavaScript cannot access them.

---

### Can localStorage be hacked?

It cannot be read by other websites due to the browser's same-origin policy, but if your application suffers from an **XSS vulnerability**, malicious JavaScript running on your page can read values stored in localStorage.

---

### Are Cookies vulnerable?

Yes.

Cookies can be vulnerable to **CSRF** if not configured properly.

Use:

- SameSite
- CSRF Tokens
- HTTPS

---

### Which one is used in production?

Many modern applications use:

- Access Token → Memory or short-lived HttpOnly Cookie
- Refresh Token → HttpOnly Secure Cookie

The exact choice depends on the application's architecture and security requirements.

---

# 12. Quick Revision

| Storage         | Pros                  | Cons                     |
| --------------- | --------------------- | ------------------------ |
| localStorage    | Easy                  | Vulnerable to XSS        |
| sessionStorage  | Clears on tab close   | Vulnerable to XSS        |
| HttpOnly Cookie | Better XSS protection | Requires CSRF protection |

---

# 13. Interview Answer

> **JWTs can be stored in localStorage, sessionStorage, or cookies. localStorage is simple to use and persists across browser sessions, but it is accessible to JavaScript, making it vulnerable if an XSS attack occurs. HttpOnly cookies cannot be accessed by JavaScript, which provides better protection against XSS. However, because cookies are automatically sent with requests, they require protections such as the `SameSite` attribute and, in some cases, CSRF tokens to defend against CSRF attacks. In many production applications, Refresh Tokens are stored in HttpOnly Secure Cookies, while Access Tokens are kept short-lived and may be stored in memory or another secure mechanism depending on the application's architecture.**

---

# ⭐ Interview Tips

## localStorage Flow

```text
Login

↓

JWT

↓

localStorage

↓

Read Token

↓

Authorization Header

↓

API Request
```

---

## Cookie Flow

```text
Login

↓

Set-Cookie

↓

Browser Stores Cookie

↓

Automatic Cookie

↓

API Request
```

---

## Security Comparison

```text
localStorage

↓

JavaScript Can Read

↓

XSS Risk


HttpOnly Cookie

↓

JavaScript Cannot Read

↓

Better XSS Protection
```

---

# ⭐ Most Asked Interview Questions

### Q1. Should JWT be stored in localStorage?

It depends.

For small projects,

```text
localStorage

↓

Acceptable
```

For production,

```text
Refresh Token

↓

HttpOnly Cookie

↓

Better Security
```

---

### Q2. Why do many companies use HttpOnly Cookies?

```text
JavaScript

↓

Cannot Access Cookie

↓

Token Theft Becomes Harder
```

Even if an attacker injects JavaScript through an XSS vulnerability, they cannot directly read an HttpOnly cookie.

---

### Q3. Why isn't HttpOnly Cookie a complete security solution?

Although it protects against JavaScript reading the cookie,

the browser still sends the cookie automatically.

```text
Browser

↓

Automatic Cookie

↓

CSRF Risk
```

Mitigation:

- SameSite=Lax or Strict
- CSRF Tokens (when needed)
- HTTPS
- Origin/Referer validation

---

### Q4. What is the recommended production approach?

A common architecture is:

```text
Access Token

↓

15 Minutes

↓

Memory (SPA)

or

Short-lived HttpOnly Cookie


Refresh Token

↓

30 Days

↓

HttpOnly Secure Cookie
```

This approach combines:

- Short-lived Access Tokens
- Better XSS protection
- Better user experience
- Secure session renewal
